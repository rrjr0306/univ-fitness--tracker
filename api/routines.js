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

    try {
            const routine = await createRoutine({ 
                creatorId: id,
                isPublic: isPublic,
                name: name,
                goal: goal 
            });
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
       
        if (routine && routine.creatorId === req.user.id) {
            const deletedRoutine = await destroyRoutine(routineId)
            res.send(deletedRoutine)
        } else {
            next(routine ? {
                name: "UnauthorizedUserError",
                message: "You cannot delete a routine which is not yours"
            } : {
                name: "RoutineNotFoundError",
                message: "That routine does not exist"
            });
        }

    } catch ({ name, message }) {
        next ({ name, message })
    }

});

// POST /api/routines/:routineId/activities

router.post('/:routineId/activities', async (req, res, next) => {
    const { routineId } = req.params;
    const { activityId, count, duration } = req.body;
    const calledActivity = await getRoutineActivityById(activityId)
    const routine = await getRoutineById(routineId)
    
    try {
        if (routine.creatorId !== req.user.id) {
            res.status(403)
            next({
                name: "UnauthorizedUserError",
                message: "You cannot this activity"
            })

        
        const updatedActivity = await addActivityToRoutine({ routineId, activityId, count, duration })

        res.send(updatedActivity);
        }

    } catch ({ name, message }) {
        next ({ name, message })
    }
})



module.exports = router;