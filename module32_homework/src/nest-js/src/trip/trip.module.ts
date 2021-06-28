import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TripRepository } from './repositories/trip.repository';

@Module({
  controllers: [TripController],
  providers: [TripService, TripRepository]
})
export class TripModule {}
