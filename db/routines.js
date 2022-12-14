/* eslint-disable no-useless-catch */
const { attachActivitiesToRoutines } = require('./activities');
const client = require('./client');

async function getRoutineById(id){
  // eslint-disable-next-line no-useless-catch
  try {
    const { rows: [routine]} = await client.query(`
      SELECT *
      FROM routines
      WHERE id=$1;
      `,
      [id]
    );

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
  try {
    const { rows: routines} = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON users.id = routines."creatorId";
    `);

    const result = await attachActivitiesToRoutines(routines);

    return result
    
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser({username}) {
  try {
    const { rows: routines } = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON users.id = routines."creatorId"
        WHERE users.username=$1;
    `, [ username ]);

    return await attachActivitiesToRoutines(routines)

  } catch (error) {
    throw error
  }
}

async function getPublicRoutinesByUser({username}) {
  try {
    const { rows: routines } = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON users.id = routines."creatorId"
        WHERE "isPublic"=true
        AND users.username=$1;
    `, [ username ]);

    const result = attachActivitiesToRoutines(routines)
    return result;
  } catch (error) {
    throw error
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows: routines } = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON users.id = routines."creatorId"
        WHERE "isPublic"=true;
    `);

    const result = attachActivitiesToRoutines(routines)
    return result;
  } catch (error) {
    throw error
  }

}

async function getPublicRoutinesByActivity({id}) {
  try {
    const { rows: routines } = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON users.id = routines."creatorId"
        JOIN routine_activities ON routine_activities."routineId" = routines.id
        WHERE routines."isPublic"=true
        AND routine_activities."activityId"=${id};
    `);

    const result = attachActivitiesToRoutines(routines)

    return result;
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
  const setString = Object.keys(fields).map((key,index) => 
    `"${key}"=$${index + 1}`).join(', ');

  if (setString.length === 0) {
    return;
  }

  try {
    if (setString.length > 0) {
      await client.query(`
        UPDATE routines
        SET ${setString}
        WHERE id=${id}
        RETURNING *;  
      `,
        Object.values(fields)
      );
    }
    
    return await getRoutineById(id);

  } catch (error) {
    throw error
  }
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

//attachActivities working? check puppies db...

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