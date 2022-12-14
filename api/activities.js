/* eslint-disable no-useless-catch */
const express = require('express');
const activitiesRouter = express.Router();
const {getAllActivities, createActivity} = require('../db')

// GET /api/activities/:activityId/routines

// GET /api/activities
activitiesRouter.get('/', (req, res) => {
    const allActivities = getAllActivities();

    console.log("HELP", allActivities)

    const activities = allActivities.filter((activity) => {
        return activity;
    })

    res.send({
        activities
    })
})

// POST /api/activities
activitiesRouter.post('/', (req, res) => {
    const {name, description} = req.body;

    const activityData = {};

    try {
        activityData.name = name;
        activityData.description = description;
        
        const activity = createActivity(activityData);

        
        res.send({activity})

    } catch(error) {
        throw error;
    }
})
// PATCH /api/activities/:activityId

module.exports = activitiesRouter;
