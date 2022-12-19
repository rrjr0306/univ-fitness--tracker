const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env
const { createUser, getUserByUsername, getAllRoutinesByUser, getPublicRoutinesByUser} = require('../db');
const { requireUser } = require("./utils")

// router.use((req, res, next) => {
//     console.log("request being made to /users");
    
//     next();
// });

// POST /api/users/login

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        next({
            error: 'IncorrectCredentialsError',
            name: 'IncorrectCredentialsError',
            message: "Sorry, your username or password is incorrect"
        });
    }

    try {
        const user = await getUserByUsername(username);
        const token = jwt.sign(user, JWT_SECRET)

        if (user) {

            res.send({ message: "you're logged in!", token, user: user });
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: ' Sorry, your username or password is incorrect'
            });
        }
    } catch(error) {
        console.log(error);
        next(error);
    }
});


// POST /api/users/register
router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
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
        const token= jwt.sign({
            id: user.id,
            username
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });
        res.send({
            message: 'Thank you for signing up!',
            token,
            user
        });
    } catch ({ error, name, message}) {
        next({ error, name, message})
    }
});


// GET /api/users/me
router.get('/me', requireUser, async (req, res, next) => {
    const {user} = req.user
    try {
        res.send(user)
    } catch (error) {
        next(error)
    }
});

// GET /api/users/:username/routines
router.get('/:username/routines', requireUser, async (req, res, next) => {
const { username } = req.params;
const user = await getUserByUsername(username);
const userOne = await getPublicRoutinesByUser({username});
const userTwo = await getAllRoutinesByUser({username});
try { 
    if (!username) {
        next({
            error: "PASSWORD TOO SHORT",
            message: "Password Too Short!",
            name: "PasswordIsTooShort",
        });
    } else if ( req.user && user.id === req.user.id) { res.send(userOne)
    } else { res.send(userTwo)}

    } catch (error) {
        next(error) 
    }
})

module.exports = router;
