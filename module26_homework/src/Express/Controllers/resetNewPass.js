const bcrypt = require('bcrypt');
const User = require('../Models/users');
const getNewToken = require('../Config/getNewToken');

async function resetNewPass (req, res) {
    const {mail} = req.body;
    let findUser = await User.findOne( {mail} );
    if(!findUser) return res.status(401).send("Такая почта не зарегистрирована");
    if(findUser.idRecovery != req.query.id) return res.status(401).send("Запроса на сброс пароля от вас не поступало");
    bcrypt.compare(req.body.password, findUser.password, function(err, result) {
        if(result) return res.status(401).send("Новый пароль должен отличаться от старого")
        else {
            findUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
            findUser.save();
            getNewToken(req, res);
        }
    })
}

module.exports = resetNewPass;