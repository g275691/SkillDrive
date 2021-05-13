import { RegistrationDocument } from '../../Schemas/registration.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const getNewToken = require("../../config/getNewToken")
const bcrypt = require('bcrypt');
const fs = require('fs'); 
const fsPromises = fs.promises;
const { v4: uuidv4 } = require('uuid');
const fsPromise = require('fs.promises');

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
        const uniqID = uuidv4();
        req._id = uniqID;
        const userFolder = `users/${uniqID}`;
        const newUser = new this.registrationModel(req);
        return newUser.save()
        .then(() => { 
            try {
                fsPromises.mkdir(userFolder)
                .then(()=> {
                    fsPromises.mkdir(`${userFolder}/avatar`)
                    .then(()=> {
                        fsPromises.rename(`uploads/avatar/${req.imgAvatar}`,`${userFolder}/avatar/${req.imgAvatar}`)
                        .then(()=> {
                            fsPromises.mkdir(`${userFolder}/docs`)
                            let photosDocArray = req.photosDoc;
                            if(typeof photosDocArray == "string") {
                                photosDocArray = photosDocArray.replace(/[\[\]]/g,"").split(",")
                            }
                            photosDocArray.forEach((el,i) => {
                                fsPromises.rename(`uploads/docs/${el}`,`${userFolder}/docs/${el}`)
                            })
                            fsPromises.mkdir(`${userFolder}/carPhotos`)
                            getNewToken(req, res)
                        })                 
                    })
     
                })
            } catch (err) {console.log(err)}
        })
        .catch(err => {
            console.log(err);
            res.status(500).send()})
    }
    
}