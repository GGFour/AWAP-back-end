//this middleware function checks if the form inputs are correct
module.exports = (req, res, next) => {
    const { username, password } = req.body

    let validUserName = (user) => {
        return /^[A-Za-z0-9]{3,15}$/.test(user)
    }
    let validPassword = (pwd) => {
        return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(
            pwd
        )
    }

    if (req.path === '/signup') {
        console.log(!username.length)
        if (![username, password].every(Boolean)) {
            return res.status(401).json('Missing Credentials')
        } else if (!validPassword(password)) {
            return res.status(401).json('Invalid password')
        } else if (!validUserName(username)) {
            return res.status(401).json('Invalid Username')
        }
    } else if (req.path === '/login') {
        if (![username, password].every(Boolean)) {
            return res.status(401).json('Missing Credentials')
        } else if (!validUserName(username)) {
            return res.status(401).json('Invalid Username')
        } else if (!validPassword(password)) {
            return res.status(401).json('Invalid password')
        }
    }
    next()
}
