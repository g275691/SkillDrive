const bcrypt = require('bcrypt');
const User = require('../Models/users');
const getNewToken = require('../Config/getNewToken');

async function registration (req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    console.log(req.body);
    const newUser = new User(req.body);
    await newUser.save()
    .then(() => getNewToken(req, res))
    .catch(err => res.status(400).send(err))
}

module.exports = registration;