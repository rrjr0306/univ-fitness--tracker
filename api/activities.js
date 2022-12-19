/* eslint-disable no-useless-catch */
const express = require('express');
const { request } = require('../app');
const router = express.Router();
const {
    getAllActivities, 
    createActivity, 
    getActivityByName, 
    updateActivity, 
    getActivityById,
    getAllPublicRoutines,
    getPublicRoutinesByActivity
} = require('../db')

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async (req, res, next) => {
    
    const {activityId} = req.params

    try {
        const publicActivity = await getPublicRoutinesByActivity({
            id: activityId
        });

        const activities = await getActivityById(activityId);

        if(!publicActivity || !activities) {
            res.status(401);
            next({
                name: "Activity not found",
                message: `Activity ${activityId} not found`
            });
        } else {
            const publicRoutines = await getAllPublicRoutines();
            res.send(publicRoutines);
        }
    } catch(error) {
        next(error);
    }
})

// GET /api/activities
router.get('/', async (req, res, next) => {
    try {
        const allActivities = await getAllActivities();

        console.log("HELP", allActivities)

        res.send(allActivities)
    } catch(error) {
        next(error);
    }
})

// POST /api/activities
router.post('/', async (req, res, next) => {
    const {name, description} = req.body;

    try {
        let existingActivity = await getActivityByName(name);
        console.log('EXISTING', existingActivity)
        if(existingActivity) {
            next({
                error: "An activity with this name already exists",
                name: "An activity with this name already exists",
                message: `An activity with name ${name} already exists`
            });
        } else {
            let newActivity = await createActivity({
                name: name,
                description: description
            });

            if(newActivity) {
                res.send(newActivity)
            } else {
                next({
                    name: "ActivityError",
                    message: "Unable to send Activity"
                });
            }
        }
    } catch(error) {
        next(error)
    }
})
// PATCH /api/activities/:activityId
router.patch('/:activityId', async (req, res, next) => {
    const {name, description} = req.body;
    const {activityId} = req.params

    try {

        const actName = await getActivityByName(name);
        const activityFromId = await getActivityById(activityId);

        console.log("activityId", activityFromId)

        if(!activityFromId) {
            res.status(401);
            res.send({
                error: "ActivityIdError",
                name: "Activity by that id does not exist",
                message: `Activity ${activityId} not found`
            });
        } else if(actName) {
            res.status(401);
            res.send({
                error: "AcitivityNameError",
                name: "Activity by that name already exists",
                message: `An activity with name ${name} already exists`
            })
        } else {
            const updatedActivity = await updateActivity({
                id: activityId,
                name: name,
                description: description
            });
            res.send(updatedActivity);
        }
    } catch(error) {
        next(error);
    }
})

module.exports = router;
