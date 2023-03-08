const jwt = require('jsonwebtoken');
require('dotenv').config()


const authMiddleware = (req, res, next) => {

    const { token } = req.headers;

    try {
        if (!token) return res.status(403).send('Token unavailable!')

        let verify = jwt.verify(token, process.env.TOKEN)
        if(!verify) return res.status(403).send('Invalid token!');
        req.userDetails = verify;
        next() 
    } catch (e) {
        console.log(e.message);
        return res.status(403).send(e.message)
    }

}

module.exports = authMiddleware;