const express = require('express');
const router = express.Router();
const { requireUser } = require('./utils')
const { getRoutineById, updateRoutineActivity } = require('../db');

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

module.exports = router;
