import { RegistrationDocument } from '../../Schemas/registration.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const getNewToken = require("../../config/getNewToken")
const bcrypt = require('bcrypt');
const fs = require('fs'); 
const fsPromises = fs.promises;

@Injectable()
export class RegistrationService {
    constructor ( @InjectModel('Users') private registrationModel: Model<RegistrationDocument> ) {}

    async step1(req, res) {
        const newUser = new this.registrationModel(req);
        return newUser.validate(function(err) {
            if (err) { res.status(500).send() }   
            else {
                res.status(200).send()
            }    
        });
    }
    async step3removeDoc(req, res) {
        fsPromises
        .rm(`uploads/${req.fileType=="doc" ? "docs" : "avatar"}/${req.fileName}`)
        .then(()=>res.status(200).send())
        .catch(err=> console.log(err))
    }
    async step3registration(req, res) {
        req.password = bcrypt.hashSync(req.password, bcrypt.genSaltSync(10));
        const newUser = new this.registrationModel(req);
        return newUser.save()
        .then(() => { getNewToken(req, res); })
        .catch(err => {
            console.log(err);
            res.status(500).send()})
    }
    
}