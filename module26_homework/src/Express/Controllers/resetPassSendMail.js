const sendMail = require("../Config/sendMail");
const User = require('../Models/users');
const { v4: uuidv4 } = require('uuid');

async function resetPassSendMail(req, res) {
    const {mail} = req.body;
    let findUser = await User.findOne( {mail} );
    if(!findUser) return res.status(401).send("Такая почта не зарегистрирована");
    const uniqID = uuidv4();
    findUser.idRecovery = uniqID;
    sendMail(findUser.name, 
        `http://localhost:8080/reset-pass?id=${uniqID}`, 
        req.body.mail)
    .then(()=> {
        res.status(200).send();
        findUser.save();
    } )
    .catch(()=>res.status(401).send("Неправильная почта"))
}

module.exports = resetPassSendMail;