import { Injectable } from '@nestjs/common';
import { RegistrationEntity } from 'src/Registration/entities/registration.entity';
import { getMongoManager, ObjectID } from 'typeorm';
import { CreateRentCarDto } from './dto/create-rent-car.dto';
import { RentCar as RentCarEntity } from './entities/rent-car.entity';
import { RentCarRepository } from './repositories/rent-car.repository';
const fs = require('fs');
const ObjectId = require('mongodb').ObjectID;

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
    newRentCar.dateAvailable = createRentCarDto.dateAvailable;

    newRentCar.owner = new RegistrationEntity();
    newRentCar.owner.mail = createRentCarDto.owner;

    return await this.rentCarRepository.create(newRentCar);
  }

  async find(param) {
    const manager = getMongoManager();

    if(param.dateAvailable) {
      param.dateAvailable = param.dateAvailable.split("|");
      param.dateAvailable[0] = param.dateAvailable[0].split(",");
      param.dateAvailable[1] = param.dateAvailable[1].split(",");
    }
    let findParam = param;
    let findDate = param.dateAvailable;
    delete param["dateAvailable"];
    
    // console.log(param);

    // let findCar = await manager.find( RentCarEntity, findParam )
    // console.log(findDate[0])

    // let findUser;
    // findCar.forEach(el => {
    //   if(el.dateAvailable != null) {
    //     el.dateAvailable.forEach(async(date) => {
    //       if(new Date(findDate[0]) >= new Date(date[0])) {
    //         findUser = await manager.find( RentCarEntity, param )
    //         console.log(findUser)
    //       }
    //     })
    //   }
    // }) 
    // console.log(findUser)

    //return await manager.find( RentCarEntity, {dateAvailable: "undefined"} )
    // findUser.dateAvailable.forEach(el => {
    //   console.log("dssdsd")
    // })
    
    return await manager.find( RentCarEntity, param );
   
  }

  async update(req, param) {
    const manager = getMongoManager();

    if(req.dateAvailable) {
      req.dateAvailable = req.dateAvailable.split("|");
      req.dateAvailable[0] = req.dateAvailable[0].split(",");
      req.dateAvailable[1] = req.dateAvailable[1].split(",");
      req.dateAvailable = [req.dateAvailable];
    }

    let findUser = await manager.findOne( RentCarEntity, param );
    let newDate = findUser.dateAvailable.concat(req.dateAvailable);

    return await manager.update(RentCarEntity, param, {dateAvailable: newDate});
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
