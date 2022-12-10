/* eslint-disable no-useless-catch */
const { attachActivitiesToRoutines } = require('./activities');
const client = require('./client');

async function getRoutineById(id){
  // eslint-disable-next-line no-useless-catch
  try {
    const { rows: [routine]} = await client.query(`
      SELECT id, "creatorId", "isPublic", name, goal
      FROM routines
      WHERE id=$1;
      `,
      [id]
    );

    if(!routine) {
      throw {
        name: "RoutineNotFoundError",
        message: "Could not find a routine with that id"
      };
    }

    return routine;

  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities(){
  try {
    const { rows: routines } = await client.query(`
      SELECT *
      FROM routines;
    `);

    return routines
  } catch (error) {
    throw error
  }
}

async function getAllRoutines() {
  console.log("testing getAllRoutines...");
  try {
    const { rows: routines } = await client.query(`
      SELECT routines.*, u.username AS "creatorName"
      FROM routines
      JOIN users AS u
      ON routines."creatorId"=u.id;
    `);

    const routinesWithActivities = await attachActivitiesToRoutines(routines);

    return routinesWithActivities

  } catch (error) {
    throw error
  }
}

async function getAllRoutinesByUser({username}) {
  try {
    const { rows: routines } = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      INNER JOIN users
      ON routines."creatorId"=users.id
      WHERE users.username=$1
    `,
    [username]
    );

    const routinesWithActivities = await attachActivitiesToRoutines(routines);

    return routinesWithActivities;

  } catch (error) {
    throw error
  }
}

async function getPublicRoutinesByUser({username}) {
  try {
    const {rows: routines } = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      INNER JOIN users
      on routines."creatorId"=users.id
      WHERE routines."isPublic"=true
      AND users.username=$1;
    `,
      [username]
    );

    const routinesWithActivities = await attachActivitiesToRoutines(routines);

    return routinesWithActivities
  } catch (error) {
    throw error
  }
}

async function getAllPublicRoutines() {
  try {
    const {rows: routines} = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      INNER JOIN users
      ON routines."creatorId"=users.id
      WHERE "isPublic"=true;
    `);
  
    const routinesWithActivities = await attachActivitiesToRoutines(routines);
    return routinesWithActivities;
  } catch (error) {
    throw error
  }

}

async function getPublicRoutinesByActivity({id}) {
  try {
    const {rows: routines} = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId"=users.id
      JOIN routine_activities ON routine_activities."routineId"=routines.id
      WHERE routines."isPublic"=true
      AND routine_activities."activityId"=$1
    `,
      [id]
    );

    const routinesWithActivities = await attachActivitiesToRoutines(routines);

    return routinesWithActivities
  } catch (error) {
    throw error
  }
}

async function createRoutine({creatorId, isPublic, name, goal}) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        INSERT INTO routines ("creatorId", "isPublic", name, goal)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `,
      [creatorId, isPublic, name, goal]
    );  
    return routine
  } catch (error) {
    throw error;
  }
}

async function updateRoutine({id, ...fields}) {
}

async function destroyRoutine(id) {
  try {
    await client.query(`
      DELETE FROM routine_activities
      WHERE "routineId"=$1;
    `,
      [id]
    )
    const {rows: deletedRoutine} = await client.query(`
      DELETE FROM routines
      WHERE id=$1
      RETURNING *;
    `,
    [id]);
    return deletedRoutine
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
}