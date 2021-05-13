const constants = require('../constants.js');

const jwt = require('jsonwebtoken');

const getNewToken = (req, res) => {

    const payload = {
        mail: req.body.mail,
        role: 'user'
    };
    const accessToken = jwt.sign(payload, constants.ACCESS_TOKEN_SECRET, { expiresIn: constants.ACCESS_TOKEN_LIFE })
    const refreshToken = jwt.sign({}, constants.REFRESH_TOKEN_SECRET, {expiresIn: constants.REFRESH_TOKEN_LIFE})
    
    return res.status(200).send({ accessToken, refreshToken }); 
}

module.exports = getNewToken;