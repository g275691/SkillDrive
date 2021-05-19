import { Injectable } from '@nestjs/common';
import { RegistrationEntity } from 'src/Registration/entities/registration.entity';
import { getMongoManager } from 'typeorm';
import { CreateRentCarDto } from './dto/create-rent-car.dto';
import { RentCar as RentCarEntity } from './entities/rent-car.entity';
import { RentCarRepository } from './repositories/rent-car.repository';
const fs = require('fs');

@Injectable()
export class RentCarService {
  constructor(private rentCarRepository: RentCarRepository
    
    ) {}

  async create(createRentCarDto: CreateRentCarDto) {
    
    const newRentCar = new RentCarEntity();

    newRentCar.brand = createRentCarDto.brand;
    newRentCar.model = createRentCarDto.model;
    newRentCar.year = createRentCarDto.year;
    newRentCar.engine = createRentCarDto.engine;
    newRentCar.power = createRentCarDto.power;
    newRentCar.transmission = createRentCarDto.transmission;
    newRentCar.driveUnit = createRentCarDto.driveUnit;
    newRentCar.price = createRentCarDto.price;
    newRentCar.city = createRentCarDto.city;
    newRentCar.category = createRentCarDto.category;
    newRentCar.rating = createRentCarDto.rating;
    newRentCar.photo = createRentCarDto.photo;
    
    newRentCar.owner = new RegistrationEntity();
    newRentCar.owner.mail = createRentCarDto.owner;

    return await this.rentCarRepository.create(newRentCar);
  }

  async find(param) {
    const manager = getMongoManager();
    console.log(param);

   return await manager.find( RentCarEntity, param )
  }

  async getByOwner(req) {
    const manager = getMongoManager()
    return await manager.find(RentCarEntity, {
      where: {
        ['owner.mail']: req.mail
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} rentCar`;
  }
}
