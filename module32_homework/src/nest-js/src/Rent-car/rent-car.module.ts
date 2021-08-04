import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RentCarService } from './Services/rent-car.service';
import { RentCarController } from './rent-car.controller';
import { RentCarRepository } from './repositories/rent-car.repository';
import { checkMailMiddleware } from 'src/Login/Middleware/checkMail.middleware';
import { authVerifyMiddleware } from 'src/config/authVerifyMiddleware';
import { CreateCarService } from './Services/create-car.service';

@Module({
  controllers: [RentCarController],
  providers: [RentCarService, CreateCarService, RentCarRepository]
})

export class RentCarModule {


}
