import { Injectable } from '@nestjs/common';
import { TripEntity } from 'src/trip/entities/trip.entity';
import { getMongoManager, LessThan, MoreThan, Not } from 'typeorm';
import { RentCar as RentCarEntity } from '../entities/rent-car.entity';
import { RentCarRepository } from '../repositories/rent-car.repository';
const ObjectId = require('mongodb').ObjectId; 

@Injectable()
export class RentCarService {
  constructor(private rentCarRepository: RentCarRepository
    
    ) {}
    
  async findStart(param) {
    /*Стартовый запрос*/
    const manager = getMongoManager();
    delete param["dateAvailable"];

    return await manager.find( RentCarEntity, param )
  }

  async find(param) {
    const manager = getMongoManager();
    console.log(new Date(param.endrent));
    let filterTrip = await manager.find(TripEntity, {
      where: {
        startRent: {$lte: new Date(param.startrent)}, 
        endRent: {$gte: new Date(param.endrent)}
      }
    })

    console.log(filterTrip);

    let filterLicense = filterTrip.map(el=>el.license);

    let findCars = await manager.find( RentCarEntity, {
      where: {
        city: param.city,
        category: param.category,
        license: {$nin : filterLicense}
      },
      order: 
      param.sort == "price" && { price: 1 }
      || param.sort == "transmission" && { transmission: 1 }
      || param.sort == "driveUnit" && { driveUnit: 1 }
      || param.sort == "engine" && { engine: 1 }
    }  )
    
    return findCars;
  }

  async update(req, param) {
    const manager = getMongoManager();

    return await manager.updateMany(
      RentCarEntity,
      {}, 
      { $set: {  geo: req.geo }}
  )
  }

  async getByOwner(req) {
    const manager = getMongoManager()
    return await manager.find(RentCarEntity, {
      where: {
        ['owner.mail']: req.mail
      }
    })
  }

  async getCar(req) {
    const manager = getMongoManager();
    console.log(req.id)
    return await manager.find(RentCarEntity, {"_id": ObjectId(req.id)})

  }

  remove(id: number) {
    return `This action removes a #${id} rentCar`;
  }
}
