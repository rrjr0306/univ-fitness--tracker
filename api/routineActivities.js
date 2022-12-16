const express = require('express');
const router = express.Router();
const { requireUser } = require('./utils')
const { getRoutineById, updateRoutineActivity, destroyRoutineActivity, getRoutineActivityById } = require('../db');

// PATCH /api/routine_activities/:routineActivityId

router.patch('/:routineActivityId', requireUser, async (req, res, next) => {
    const { count, duration } = req.body;
    const routine = await getRoutineById(id);
    const id = req.params.routineActivityId;

    try {
        if (routine.creatorId !== req.user.id) {
            next({
                name: 'UnauthorizedUserError',
                message: 'You are not the owner of this routine'
            })
        }

        const updatedRoutineActivity = await updateRoutineActivity({ id, count, duration})
        res.send(updatedRoutineActivity)
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
