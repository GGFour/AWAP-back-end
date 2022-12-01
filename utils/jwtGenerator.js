const jwt = require('jsonwebtoken')
//allow access to all environment variables
require('dotenv').config()

function jwtGenerator(id) {
    const payload = {
        user: {
            id: id,
            username: user.username,
        },
        // username: user.username,
        // id: user.id,
    }
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '5hr' })
}

module.exports = jwtGenerator
