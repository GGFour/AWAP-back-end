//this middleware fucntion checks if the token is valid
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        // Get token from 'Authorization' header.
        // The format of the string in header is 'Bearer <token>'.
        const authHeader = req.get('Authorization')
        if (!authHeader) {
            throw Error('Authorization is being missing from request')
        }
        const jwtToken = authHeader.split(' ')[1]
        // checking if a token exists
        if (!jwtToken) {
            throw Error('Token in being missing')
        }
        // checking if a token is valid (if exists)
        const payload = jwt.verify(jwtToken, process.env.TOKEN_SECRET)
        req.user = payload.user
        next()
    } catch (err) {
        console.error(err.message)
        return res.status(403).json({ message: 'Not Authorized' })
    }
}
