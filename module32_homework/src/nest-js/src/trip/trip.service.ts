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
    newTrip.ownerCar = license[0].owner.mail;
    newTrip.client = createTripDto.client;
    newTrip.car = license[0];

    newTrip.startRent = new Date(createTripDto.startRent);
    newTrip.endRent = new Date(createTripDto.endRent);
    newTrip.price = createTripDto.price;
    newTrip.review = [];
    newTrip.optionsDelivery = Boolean(createTripDto.optionsDelivery);
    newTrip.optionsBabyChair = Boolean(createTripDto.optionsBabyChair);
    newTrip.optionsEndRentAnywhere = Boolean(createTripDto.optionsEndRentAnywhere);
    newTrip.rate = 0;
    newTrip.statusStartRent = createTripDto.statusStartRent;
    newTrip.statusStartTalkOwner = createTripDto.statusStartTalkOwner;
    newTrip.statusStartTalkClient = createTripDto.statusStartTalkClient;
    newTrip.days = createTripDto.days;
    newTrip.dateRent = new Date();

    res.status(200).send(newTrip);
    return await this.tripRepository.create(newTrip);
  }

  async findOne(data) {
    console.log(data)
    const manager = getMongoManager();
    // return await manager.find(TripEntity, {
    //   where: {
    //     ['owner.license']: license
    //   }
    // })
    return await manager.find(TripEntity, data)
  }

  async find(data) {
    
    const manager = getMongoManager();
    return await manager.find(TripEntity, data)
  }

  async update(tripTime, payload) {
    const manager = getMongoManager();
    return await manager.update(
      TripEntity, 
      { dateRent: new Date(tripTime) },
      payload
    )
  }

  remove(id: number) {
    return `This action removes a #${id} trip`;
  }
}
