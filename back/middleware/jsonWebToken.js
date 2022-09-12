const jwt = require('jsonwebtoken')

// Token recovery
const extractBearer = authorization => {

    if (typeof authorization !== 'string') {
        return false
    }
    // Isolate the token
    const matches = authorization.match(/(bearer)\s+(\S+)/i)

    return matches && matches[2]
}


// Verification presence of the token
const checkToken = (req, res, next) => {

    const token = req.headers.authorization && extractBearer(req.headers.authorization)

    if (!token) {
        return res.status(401).json({ message: 'Unauthenticated user'})
    }

    // Check the validity of the token
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            return res.status(401).json({message: 'Bad token'})
        }
        res.locals = jwt.decode(token);

        next()
    })
}
module.exports = checkToken
