const express = require('express');
const router = express.Router();
const { requireUser } = require('./utils')
const { getRoutineById, updateRoutineActivity, destroyRoutineActivity, getRoutineActivityById, getUserById } = require('../db');

// PATCH /api/routine_activities/:routineActivityId

router.patch('/:routineActivityId', requireUser, async (req, res, next) => {
    const { count, duration } = req.body;
    const {routineAcitivityId} = req.params;
    const {id, username} = req.user;
    const routineToBeUpdated = await getRoutineActivityById(routineAcitivityId);
    const routineId = await getUserById(routineAcitivityId)
    try {
        if (routineToBeUpdated.id !== id) {
            res.status(403);
            res.send({
                error: 'User is not allowed to update this routine.',
                name: 'User is not allowed to update this routine.',
                message: `User ${username} is not allowed to update ${routineId.name}`
            })
        } else {
            const updatedRoutineActivity = await updateRoutineActivity({
                id: id,
                count: count, 
                duration: duration
            });
            res.send(updatedRoutineActivity)
        }
    } catch(error) {
        next(error);
    }
})


// DELETE /api/routine_activities/:routineActivityId

router.delete('/:routineActivityId', requireUser, async (req, res, next) => {
    const { routineActivityId } = req.params;
    const routineActivity = await getRoutineActivityById(routineActivityId)
    const routine = await getRoutineById(routineActivity.routineId)

    try {
        if (routine.creatorId === req.user.id) {
            const deletedActivity = await destroyRoutineActivity(routineActivityId)
            res.send(deletedActivity)
        }

        else {
            next({
                name: 'UnauthorizedUserError',
                message: 'You are not the owner of this routine'
            })
        }        

    } catch ({ name, message }) {
        next ({ name, message })
    }
})



module.exports = router;
