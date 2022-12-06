//Authentication System

const router = require('express').Router()
const pool = require('../model/pool')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')
const validator = require('../middleware/validator')
const authorizer = require('../middleware/authorizer')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,
})

router.use(limiter)

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
        return res.status(200).json({ message: 'OK' })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

// route for login
router.post('/login', validator, async (req, res) => {
    try {
        const { username, password } = req.body
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
        const token = jwtGenerator(user.rows[0])
        res.json({ token }) //testing
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

/**
 *  Route for deleting a user
 */
router.delete('/user', authorizer, async (req, res) => {
    try {
        const username = req.user.username
        await pool.query('DELETE FROM users WHERE username=$1', [username])
        res.status(200).send(`User deleted with Name: ${username}`)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

/**
 * The endpoint for debug purpusess that would be removed in prod.
 */
router.get('/isAuthorized', authorizer, (req, res) => {
    try {
        res.json(req.user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router
