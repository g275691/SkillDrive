const jwt = require('jsonwebtoken');
const constants = require('../constants.js');

function refreshTokenVerify (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, constants.REFRESH_TOKEN_SECRET, {}, (err) => {
        if(err) { return res.sendStatus(405); }
        else { next() }
    })
}

module.exports = refreshTokenVerify;