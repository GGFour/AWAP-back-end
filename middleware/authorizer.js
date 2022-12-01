//this middleware fucntion checks if the token is valid
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
    try {
        //1. destructing the token
        //token is sent inside a request header.
        const jwtToken = req.header()
        //2.checking if a token exists
        if (!jwtToken) {
            return res.status(403).json('Not Authorized')
        }
        //3. checking if a token is valid (if exists)
        const payload = jwt.verify(jwtToken, process.env.jwtSecret)
        //req.user = payload (data)
        req.user = payload.user
        next()
    } catch (err) {
        console.error(err.message)
        return res.status(403).json('Not Authorized')
    }
}
