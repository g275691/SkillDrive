import { Module } from '@nestjs/common';
import { RentCarService } from './rent-car.service';
import { RentCarController } from './rent-car.controller';
import { RentCarRepository } from './repositories/rent-car.repository';

@Module({
  controllers: [RentCarController],
  providers: [RentCarService, RentCarRepository]
})
export class RentCarModule {}
