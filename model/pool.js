/**
 * This file creates connection Pool to database
 */
const { Pool } = require('pg')

const pool = new Pool({
    host: process.env.POSTGRES_HOST || 'localhost',
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    max: 10,
})

module.exports = pool
