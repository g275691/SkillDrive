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
    console.log(param)
    return await manager.find( RentCarEntity, param )
  }

  async find(param) {
    const manager = getMongoManager();

    console.log(typeof Number(param.startRent))

    let filterTrip = await manager.find(TripEntity, {where: {
      $or: [{
        startRent: {$lte: Number(param.startRent)},
        endRent: {$lt: Number(param.startRent)},
      },
    {
      startRent: {$gt: Number(param.endRent)},
      endRent: {$gte: Number(param.endRent)},
    }]

        
        // $or : [
        //   {startRent: "Tom"}, 
        //   {endRent: 22}]
      }
    })

    console.log(filterTrip)

    let filterLicense = filterTrip.map(el=>el.license);

    let findCars = await manager.find( RentCarEntity, {
      where: {
        city: param.city,
        category: param.category,
        license: {$in : filterLicense}
      },
      order: 
      param.sort == "price" && { price: 1 }
      || param.sort == "transmission" && { transmission: 1 }
      || param.sort == "driveUnit" && { driveUnit: 1 }
      || param.sort == "engine" && { engine: 1 }
    }  )
    
    return findCars;
  }

  async update(payload, param) {
    const manager = getMongoManager();
    console.log(payload)
    return await manager.update(
      RentCarEntity,
      {_id: ObjectId(param._id)}, 
      payload
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
    const findCar = await manager.find(RentCarEntity, {"_id": ObjectId(req.id)});

    const trips = await manager.find(TripEntity, {
      where: {
          ['car._id']: ObjectId(req.id)
      }
    })

    findCar[0]["trips"] = trips;

    console.log(findCar);

    return findCar;

  }

  remove(id: number) {
    return `This action removes a #${id} rentCar`;
  }
}
