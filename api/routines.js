/* eslint-disable no-useless-catch */
const express = require('express');
const { getAllRoutines } = require('../db');
const router = express.Router();
const { requireUser } = require('./utils');

// GET /api/routines

router.get('/', async (req, res, next) => {
    try {
        const allRoutines = await getAllRoutines();
        res.send(allRoutines);
    } catch (error) {
        next (error)
    }

})


// POST /api/routines

router.post('/', requireUser, async (req, res, next) => {
    const { isPublic, name, goal } = req.body;
    const creatorId = req.user.id;

    try {
        const 
    } catch (error) {
        next (error)
    }
})



// PATCH /api/routines/:routineId

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = router;