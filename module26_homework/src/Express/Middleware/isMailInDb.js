const User = require('../Models/users');

async function isMailInDB (req, res, next) {
    let {mail} = req.body;
    let findMail = await User.findOne( {mail} );
    if(findMail) return res.status(401).send("Такой почтовый ящик уже зарегистрирован");
    next();
}

module.exports = isMailInDB;

