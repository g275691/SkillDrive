import { Injectable } from '@nestjs/common';
import { RegistrationEntity } from 'src/Registration/entities/registration.entity';
import { RentCar } from 'src/Rent-car/entities/rent-car.entity';
import { getMongoManager } from 'typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripEntity } from './entities/trip.entity';
import { TripRepository } from './repositories/trip.repository';

@Injectable()
export class TripService {
  constructor(private tripRepository: TripRepository
    
    ) {}
  async create(createTripDto: CreateTripDto, res) {
    const manager = getMongoManager();

    const license = await manager.find(RentCar, {
      where: {
        license: createTripDto.license
      }
    })
    if(!license.length) return res.status(400).send("Такая машина не зарегистрирована");
   
    const newTrip = new TripEntity();
    newTrip.license = license[0].license;
    newTrip.owner = license[0].owner.mail;

    newTrip.startRent = new Date(createTripDto.startRent);
    newTrip.endRent = new Date(createTripDto.endRent);
    newTrip.price = createTripDto.price;
    newTrip.comment = createTripDto.comment;
    newTrip.optionsDelivery = createTripDto.optionsDelivery;
    newTrip.optionsBabyChair = createTripDto.optionsBabyChair;
    newTrip.optionsEndRentAnywhere = createTripDto.optionsEndRentAnywhere;

    newTrip.dateRent = new Date();
    res.status(200).send("Поездка забронирована");
    return await this.tripRepository.create(newTrip);
  }

  findAll() {
    return `This action returns all trip`;
  }

  async findOne(license) {
    const manager = getMongoManager();
    return await manager.find(TripEntity, {
      where: {
        ['owner.license']: license
      }
    })
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return `This action updates a #${id} trip`;
  }

  remove(id: number) {
    return `This action removes a #${id} trip`;
  }
}
