const jwt = require('jsonwebtoken');
const constants = require('../constants.js')

function authTokenVerify (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    console.log(authHeader);

    if(!token) { return res.sendStatus(401) }
    jwt.verify(token, constants.ACCESS_TOKEN_SECRET, {}, (err, payload) => {
        if(err) { return res.sendStatus(403); }
        req.payload = payload;
        next();
    })
}

module.exports = authTokenVerify;