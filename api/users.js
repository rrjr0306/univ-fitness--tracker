const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET="neverTell"} = process.env
const { createUser, getUserByUsername, getAllRoutinesByUser, getPublicRoutinesByUser, getUser} = require('../db');
const { requireUser } = require("./utils")

// POST /api/users/login

router.post('/login', async (req, res, next) => {

    const { username, password } = req.body.user;

    if (!username || !password) {

        res.status(400).send({
            error: 'IncorrectCredentialsError',
            name: 'IncorrectCredentialsError',
            message: "Sorry, your username or password is incorrect"
        });
    }

    try {
        
        const user = await getUserByUsername(username);

        if (user) {
            const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, {expiresIn: '1y'})
            res.send({user: user, message: "you're logged in!", token});
        } else {
            res.status(401).send({
                name: 'IncorrectCredentialsError',
                message: ' Sorry, your username or password is incorrect'
            });
        }
    } catch(error) {
        next(error)
    }
});


// POST /api/users/register
router.post('/register', async (req, res, next) => {
    
    const { username, password } = req.body.user;

    try {
        const _user = await getUserByUsername(username);
        
        if (_user) {
            next({
                error: 'UserExistsError',
                name: 'UserExistsError',
                message: `User ${_user.username} is already taken.`
            });
        }
        

        if (password.length < 8) {
            next({
                error: 'PasswordError',
                name: 'PasswordError',
                message: 'Password Too Short!'
            })
        }
        const user = await createUser({
            username,
            password
        });
        const token = jwt.sign({
            id: user.id,
            username: user.username
        }, JWT_SECRET, {
            expiresIn: '1y'
        });
        res.send({
            message: 'Thank you for signing up!',
            token: token,
            user: user
        });
    } catch ({ error, name, message}) {
        next({ error, name, message})
    }
});


// GET /api/users/me
router.get('/me', requireUser, async (req, res, next) => {
        
    const user = req.user
    
    try{
        res.send(user)
    } catch (error) {
        next(error)
    }
});

// GET /api/users/:username/routines
router.get('/:username/routines', requireUser, async (req, res, next) => {

const {username} = req.params;

const user = await getUserByUsername(username)

const publicRoutine = await getPublicRoutinesByUser({username: username});
const allRoutines = await getAllRoutinesByUser({username: username});

try { 
    if (!username) {
        next({
            error: "PASSWORD TOO SHORT",
            message: "Password Too Short!",
            name: "PasswordIsTooShort",
        });
    } 
    
    if ( req.user && user.id === req.user.id) {
        res.send(publicRoutine)
    } else {
        res.send(allRoutines)
    }

    } catch (error) {
        next(error) 
    }
})

module.exports = router;
