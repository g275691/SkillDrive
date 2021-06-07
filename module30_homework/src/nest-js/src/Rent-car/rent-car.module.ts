import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RentCarService } from './rent-car.service';
import { RentCarController } from './rent-car.controller';
import { RentCarRepository } from './repositories/rent-car.repository';
import { checkMailMiddleware } from 'src/Login/Middleware/checkMail.middleware';
import { authVerifyMiddleware } from 'src/config/authVerifyMiddleware';

@Module({
  controllers: [RentCarController],
  providers: [RentCarService, RentCarRepository]
})

export class RentCarModule {


}
