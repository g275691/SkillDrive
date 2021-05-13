import { RegistrationDocument } from './../../Schemas/registration.schema';
import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class checkMailMiddleware implements NestMiddleware {
  constructor ( @InjectModel('Users') private userModel: Model<RegistrationDocument> ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const {mail} = req.body;
    let findMail : any = await this.userModel.findOne( {mail} ).exec();
    if(!findMail) return res.status(400).send();
    next();
  }
}