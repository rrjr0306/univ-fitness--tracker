/* eslint-disable no-useless-catch */
const client = require("./client");
const bcrypt = require('bcrypt');

// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const SALT_COUNT = 10;

    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
  
    const {rows : user} = await client.query(
      `INSERT INTO users (username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
      `, [username, hashedPassword]);

      return user;
    } catch (error) {
      throw error;
    }
  }

async function getUser({ username, password}) {
  try {
const user = await getUserByUserName(username);
const hashedPassword = user.password;

const isValid = await bcrypt.compare(password, hashedPassword);

if (isValid) {
  return user;
} else {
  return null;
}
  } catch (error) {
    throw error;
  }
}


async function getUserById(userId) {
try {
  const { rows: [user] } = await client.query(
    `SELECT id, username
    FROM users
    WHERE id=$1
    `, [userId]
  );

    if (!user){
    return null;
    }
    return user;
} catch (error) {
  throw error;
  }
}

async function getUserByUsername(userName) {
try {
  const { rows: [user] } = await client.query(
    `SELECT *
    FROM users
    WHERE username=$1
    `,[userName]
  );

  return user;
} catch (error) {
  throw error;  
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
