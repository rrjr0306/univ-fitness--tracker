/* eslint-disable no-useless-catch */
const express = require('express');
const { getAllRoutines, createRoutine, getRoutineActivityById, getRoutineById, updateRoutine } = require('../db');
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
        const routine = await createRoutine({ creatorId, isPublic, name, goal });
        res.send(routine)
    } catch ({ name, message }) {
        next ({ name, message }); 
    }
})



// PATCH /api/routines/:routineId

router.patch('/:routineId', requireUser, async (req, res, next) => {
    const { routineId } = req.params;
    const { isPublic, name, goal } = req.body;
    const routine = await getRoutineById(routineId)
    const id = routine.creatorId
    try {
        if(id === req.user.id) {
            const updatedRoutine = await updateRoutine({id:routineId, name, goal, isPublic});
            res.send(updatedRoutine)
        }
    } catch ({ name, message}) {
        next ({ name, message});
    }
    } 
)


// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = router;