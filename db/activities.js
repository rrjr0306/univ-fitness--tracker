/* eslint-disable no-useless-catch */
const client = require("./client")

// database functions
async function getAllActivities() {
  try {
    const {rows: activities} = await client.query(`
      SELECT * FROM activities;
    `);
    
    return activities;
  } catch(error) {
    throw error;
  }
}

async function getActivityById(id) {
  const {rows: [activity]} = await client.query(`
    SELECT * FROM activities
    WHERE id=$1;
  `, [id]);
  return activity;
}

async function getActivityByName(name) {
  const {rows: [activity]} = await client.query(`
    SELECT * FROM activities
    WHERE name=$1;
  `, [name]);

  return activity;
}

// select and return an array of all activities
// async function attachActivitiesToRoutines(routines) {
// }

// return the new activity
async function createActivity({ name, description }) {
  const {rows: [activities]} = await client.query(`
    INSERT INTO activities (name, description)
    VALUES ($1, $2)
    RETURNING *;
  `, [name, description]);

  return activities;
}

// don't try to update the id
// do update the name and description
// return the updated activity
async function updateActivity({ id, ...fields }) {

  const fieldIndex = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`).join(', ')

  try {
    const {rows: [activities]} = await client.query(`
      UPDATE activities
      SET ${fieldIndex}
      WHERE id=${id}
      RETURNING *;
    `, Object.values(fields));
    
    return activities;

  } catch(error) {
    throw error;
  }
}


module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  createActivity,
  updateActivity
}
