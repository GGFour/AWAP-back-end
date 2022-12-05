const jwt = require('jsonwebtoken')

function jwtGenerator(user) {
    const payload = {
        user: {
            username: user.username,
        },
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '5hr' })
}

module.exports = jwtGenerator
