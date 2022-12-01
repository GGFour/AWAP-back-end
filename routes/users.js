var express = require('express')
var router = express.Router()
const authorizer = require('../middleware/authorizer')

//users
router.post('/userprofile', authorizer, async (req, res) => {
    try {
        const user = await pool.query(
            'SELECT username FROM users WHERE id = $1',
            [req.id]
        )
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router
