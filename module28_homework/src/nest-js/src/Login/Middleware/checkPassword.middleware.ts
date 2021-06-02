import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { getMongoManager } from 'typeorm';
import { RegistrationEntity } from 'src/Registration/entities/registration.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class checkPasswordMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const manager = getMongoManager();

    let findMail = await manager.findOne( RegistrationEntity, {mail: req.body.mail} )
    bcrypt.compare(req.body.password, findMail.password, function(err, result) {
      if(result) { next(); }
      else if(err) { console.log(err) }
      else { 
        console.log("wrong pass")
        return res.status(401).send("Неправильный пароль") }
    });
  }
}