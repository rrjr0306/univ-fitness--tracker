/* eslint-disable no-useless-catch */
const express = require('express');
const router = express.Router();
const {getAllActivities, createActivity, getActivityByName, updateActivity, getActivityById} = require('../db')

// GET /api/activities/:activityId/routines

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

    const {activityId} = req.params;

    try {
        const id = await getActivityById(activityId);
        const actName = await getActivityByName(name);

        if(!id) {
            next({
                error: 
            })
        } else {
            next({
                error: "UpdateError",
                name: "UpdateError",
                message: "Unable to update activity"
            })
        }
    } catch({name, message}) {
        next({name, message});
    }
})

module.exports = router;
