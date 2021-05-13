const express = require('express');
const router = express.Router();

const isMailInDB = require("./Middleware/isMailInDB");
const refreshTokenVerify = require("./Middleware/refreshTokenVerify");
const authTokenVerify = require("./Middleware/authTokenVerify");

const registration = require("./controllers/registration");
const authorization = require("./controllers/authorization");
const resetPassSendMail = require("./controllers/resetPassSendMail");
const resetNewPass = require("./controllers/resetNewPass");

const getNewToken = require('./Config/getNewToken');

router.post('/registration/step1', isMailInDB, registration);
router.post('/auth/access', authorization);
router.post('/auth/pass-recovery', resetPassSendMail);
router.post('/auth/pass-reset?:id', resetNewPass);
router.post('/auth/refresh', refreshTokenVerify, getNewToken);

router.post('/test', authTokenVerify, (req, res) => {
    res.send("Not good");
});

module.exports = { usersRouter: router }