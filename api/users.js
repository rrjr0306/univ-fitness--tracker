const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET="neverTell"} = process.env
const { createUser, getUserByUsername, getAllRoutinesByUser, getPublicRoutinesByUser} = require('../db');
const { requireUser } = require("./utils")

// router.use((req, res, next) => {
//     console.log("request being made to /users");
    
//     next();
// });

// POST /api/users/login

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body.user;
    console.log("UM", username, password)
    if (!username || !password) {
        next({
            error: 'IncorrectCredentialsError',
            name: 'IncorrectCredentialsError',
            message: "Sorry, your username or password is incorrect"
        });
    }

    try {
        const user = await getUserByUsername(username);

        const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, {expiresIn: '1y'})

        if (user) {

            res.send({ user, message: "you're logged in!", token});
        } else {
            next({
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

    console.log("UNMMMM", username, password)
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
    const {user} = req;
    
    try{
        res.send(user)
    } catch (error) {
        next(error)
    }
});

// GET /api/users/:username/routines
router.get('/:username/routines', requireUser, async (req, res, next) => {
const { username } = req.params;
console.log("UN", username)
const user = await getUserByUsername(username);
console.log("USER", user)
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
