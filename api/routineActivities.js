const express = require('express');
const router = express.Router();
const { requireUser } = require('./utils')
const { getRoutineById, updateRoutineActivity, destroyRoutineActivity, getRoutineActivityById, getUserById } = require('../db');

// PATCH /api/routine_activities/:routineActivityId

router.patch('/:routineActivityId', requireUser, async (req, res, next) => {
    const { count, duration } = req.body;
    const {routineActivityId} = req.params;
    const {id, username} = req.user;
    const routineToBeUpdated = await getRoutineActivityById(routineActivityId);
    const {routineId} = routineToBeUpdated
    const routine = await getRoutineById(routineId)
    console.log('ROUTINE', routine) 
    try {

        if (routineToBeUpdated && id === routine.creatorId) {
            const updatedRoutineActivity = await updateRoutineActivity({
                id: routineActivityId,
                count, 
                duration
            });
            res.send(updatedRoutineActivity)
        }  else {
            res.status(403);
            res.send({
                error: 'UnauthorizedUserError',
                name: 'UnauthorizedUserError',
                message: `User ${username} is not allowed to update ${routine.name}`
            })
        }
    } catch(error) {
        next(error);
    }
})


// DELETE /api/routine_activities/:routineActivityId

router.delete('/:routineActivityId', requireUser, async (req, res, next) => {
    const { routineActivityId } = req.params;
    const {id, username} = req.user
    const routineActivity = await getRoutineActivityById(routineActivityId)
    
    const {routineId} = routineActivity
    const routine = await getRoutineById(routineId)

    console.log('ROUTINESS IN API-RA',routineActivity )

    try {
        if (routineActivity && routine.creatorId === id) {
            const deletedActivity = await destroyRoutineActivity(routineActivityId)
            res.send(deletedActivity)
        }

        else {
            res.status(403);
            res.send({
                error: 'UnauthorizedUserError.',
                name: 'UnauthorizedUserError',
                message: `User ${username} is not allowed to delete ${routine.name}`
            })
        }        

    } catch ({ name, message }) {
        next ({ name, message })
    }
})




module.exports = router;
