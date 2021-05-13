import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegistrationDocument } from 'src/Schemas/registration.schema';

@Injectable()
export class isMailInDb implements NestMiddleware {
  constructor ( @InjectModel('Users') private userModel: Model<RegistrationDocument> ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const {mail} = req.body;
    let findMail : any = await this.userModel.findOne( {mail} ).exec();
    if(findMail) return res.status(401).send("Такой почтовый ящик уже зарегистрирован");
    next();
  }
}