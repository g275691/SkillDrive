import { RegistrationDocument } from './../../Schemas/registration.schema';
import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
const bcrypt = require('bcrypt');

@Injectable()
export class checkPasswordMiddleware implements NestMiddleware {
  constructor ( @InjectModel('Users') private userModel: Model<RegistrationDocument> ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const {mail} = req.body;
    let findMail : any = await this.userModel.findOne( {mail} ).exec();
    bcrypt.compare(req.body.password, findMail.password, function(err, result) {
      if(result) { next(); }
      else if(err) { console.log(err) }
      else { return res.status(401).send("Неправильный пароль") }
    });
  }
}