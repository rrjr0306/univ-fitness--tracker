const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = process.env
const { createUser, getUserByUsername } = require('../db');

router.use((req, res, next) => {
    console.log("request being made to /users");
    
    next();
});

// POST /api/users/login

router.post('/login', async (req, res, next) => {
    const { username, password } = (req.body);

    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please provide both a username and password"
        });
    }

    try {
        const user = await getUserByUsername(username);

        if ( user && user.password == password) {
            const token = jwt.sign({
                id:user.id,
                username
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({ messge: "You're logged in!", token });
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: ' Sorry, your username or password is incorrect'
            });
        }
    } catch(error) {
        console.log(error);
        next(error)
    }
});


// POST /api/users/register

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
