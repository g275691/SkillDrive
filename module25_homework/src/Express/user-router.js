const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('./users')

router.post('/', async(req, res) => {
    const {mail} = req.body;

    let findMail = await User.findOne( {mail} );
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    console.log(req.body);
    if(findMail) return res.status(401).send("Такой почтовый ящик уже зарегистрирован");
    const newUser = new User(req.body);

    await newUser.save()
    .then(() => {
        console.log("Успешно");
        res.send("Success");
    })
    .catch(err => res.status(400).send(err))
});

module.exports = { usersRouter: router }