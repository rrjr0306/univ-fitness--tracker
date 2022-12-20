/* eslint-disable no-useless-catch */
const express = require('express');
const { getAllRoutines, createRoutine, getRoutineActivityById, getRoutineById, updateRoutine, destroyRoutine, addActivityToRoutine } = require('../db');
const router = express.Router();
const { requireUser } = require('./utils');

// GET /api/routines

router.get('/', async (req, res, next) => {
    try {
        const allRoutines = await getAllRoutines();
        res.send(allRoutines);
    } catch ({ name, message }) {
        next ({ name, message }); 
    }

})


// POST /api/routines

router.post('/', requireUser, async (req, res, next) => {
    const { isPublic, name, goal } = req.body;
    const {id} = req.user;
    
    console.log("ID", req.user.id)
    try {
        const routine = await createRoutine({ 
            creatorId: id,
            isPublic: isPublic,
            name: name,
            goal: goal 
        });
        console.log('ROUTINE', routine)
        res.send(routine)

        
    } catch (error) {
        next (error); 
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
        } else {
            res.status(403);
            res.send({
                name: "UnauthorizedUserError",
                message: `User ${req.user.username} is not allowed to update ${routine.name}`,
                error: "User is not allowed to edit."
            })
        }
    } catch ({ error, name, message}) {
        next ({ error, name, message});
    }
    } 
)


// DELETE /api/routines/:routineId

router.delete('/:routineId', requireUser, async (req, res, next) => {
    const { routineId } = req.params;

    try {
        const routine = await getRoutineById(routineId)
       
        if (routine.creatorId === req.user.id) {
            const deletedRoutine = await destroyRoutine(routineId)
            console.log('DELETEDROUTINE!!', deletedRoutine)
            res.send(routine)
        } else {
            res.status(403)
            res.send({
                name: "UnauthorizedUserError",
                message: `User ${req.user.username} is not allowed to delete ${routine.name}`,
                error: "User is not allowed to delete."
            })
        }

    } catch ({ name, message }) {
        next ({ name, message })
    }

});

// POST /api/routines/:routineId/activities

router.post('/:routineId/activities', async (req, res, next) => {
    const { routineId } = req.params;
    const { activityId, count, duration } = req.body;

    try {
        const updatedActivity = await addActivityToRoutine({ routineId, activityId, count, duration })
        res.send(updatedActivity)
        console.log('UPDATED ACTIVITY', updatedActivity)
        if (!updatedActivity) {
            res.send({
                error: "Duplicates not allowed",
                message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`,
                name: "DuplicateError"
            })            
        } else {
            res.send(updatedActivity)

        }

    } catch ({ name, message }) { 
        next({
            error: "Duplicates not allowed",
            message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`,
            name: "DuplicateError"
        })          
    }
})



module.exports = router;