const bcrypt = require('bcrypt');
const User = require('../Models/users');
const getNewToken = require('../Config/getNewToken');

async function authorization (req, res) {
    const {mail} = req.body;
    let findMail = await User.findOne( {mail} );
    if(!findMail) return res.status(401).send("Такая почта не зарегистрирована");
    
    bcrypt.compare(req.body.password, findMail.password, function(err, result) {
        if(result) { getNewToken(req, res); }
        else if(err) { console.log(err) }
        else { return res.status(401).send("Неправильный пароль") }
    });
}

module.exports = authorization;