require('dotenv').config();

const { Pool } = require('pg');

// Log out the DB_PASSWORD to check if it's being read correctly
// console.log("Database password:", process.env.DB_PASSWORD);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

module.exports = pool;