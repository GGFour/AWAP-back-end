//Authentication System

const router = require('express').Router()
const pool = require('../model/pool')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')
const validator = require('../middleware/validator')
const authorizer = require('../middleware/authorizer')

// route for sigup
router.post('/signup', validator, async (req, res) => {
    try {
        // 1. step: destructuring the req.body
        const { username, password } = req.body
        //2. step: check if the user exist? throw an error.
        const user = await pool.query('SELECT * FROM users WHERE username=$1', [
            username,
        ])
        if (user.rows.length !== 0) {
            return res.status(401).send('User already exists')
        }
        //3. step: bcrypt the user password
        // look at the documentation of this one
        const salt = await bcrypt.genSalt(10)
        const bcryptPassword = await bcrypt.hash(password, salt)
        // 4. step: store the new user into dstabase
        let newUser = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, bcryptPassword]
        )
        // res.json(newUser.rows[0]) //testing
        //5. step: generating jwt token
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

// route for login
router.post('/login', validator, async (req, res) => {
    try {
        //1. step: destructuring the body.req
        const { username, password } = req.body
        //2. step:  check if user does not esxit? throw error.
        const user = await pool.query('SELECT * FROM users WHERE username=$1', [
            username,
        ])
        if (user.rows.length === 0) {
            return res.status(401).json('Wrong password or username')
        }

        //3. step: check if incoming password is the same as the one in the database
        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        )
        if (!validPassword) {
            return res.status(401).json('Wrong password or username')
        }
        //4. give them the jwt token
        const token = jwtGenerator(newUser.row[0])
        res.json({ token }) //testing
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

/**
 * The endpoint for debug purpusess that would be removed in prod.
 */
router.post('/isAuthorized', authorizer, (req, res) => {
    try {
        res.json(true)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router
