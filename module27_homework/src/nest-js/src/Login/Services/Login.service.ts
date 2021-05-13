import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegistrationDocument } from '../../Schemas/registration.schema';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const sendMail = require("../config/sendMail");
const getNewToken = require("../../config/getNewToken")

@Injectable()
export class LoginService {
    constructor ( @InjectModel('Users') private registrationModel: Model<RegistrationDocument> ) {}

    async authorize(req, res) { 
        getNewToken(req, res); 
    }

    async sendMail(req) {
        const {mail} = req;
        let findMail : any = await this.registrationModel.findOne( {mail} ).exec();
        const uniqID = uuidv4();
        findMail.idRecovery = uniqID;
        await sendMail(findMail.name, `http://localhost:8080/reset-pass?id=${uniqID}`, req.mail)
        .then(()=> { findMail.save(); } ) }

    async resetNewPass(req, res, query) {
        const {mail} = req;
        const findUser : any = await this.registrationModel.findOne( {mail} ).exec();
        if(findUser.idRecovery != query.id) return res.status(401).send("От вас запроса не поступало");
        
        bcrypt.compare(req.password, findUser.password, function(err, result) {
            if(result) return res.status(401).send("Новый пароль должен отличаться от старого");
            findUser.password = bcrypt.hashSync(req.password, bcrypt.genSaltSync(10))
            return findUser.save()
            .then(() => {
                getNewToken(req, res);
                
                })
            .catch(err => console.log(err))
        }
        )
    }
}