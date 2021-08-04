import { Injectable } from '@nestjs/common';
import { RegistrationEntity } from 'src/Registration/entities/registration.entity';
import { TripEntity } from 'src/trip/entities/trip.entity';
import { TripService } from 'src/trip/trip.service';
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

    let isEmptyBase = await manager.count(TripEntity);
    let filterTrip = [];
    !isEmptyBase
    ? filterTrip = await manager.find(TripEntity, {})
    : filterTrip = await manager.find(TripEntity, {where: {
      $or: [{
        startRent: {$lte: Number(param.endRent), $gte: Number(param.startRent)},
      },
      {
        startRent: {$lte: Number(param.startRent)},
        endRent: {$gte: Number(param.endRent)}
      },
      {
        endRent: {$lte: Number(param.endRent), $gte: Number(param.startRent)},
      }
  ]
      }
    })

    console.log(filterTrip);

    let filterLicense = filterTrip.map(el=>el.license);
    let findCars = await manager.find( RentCarEntity, {
      where: {
        city: param.city,
        category: param.category,
        license: !isEmptyBase ? { $exists: true } : {$nin : filterLicense}
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
    console.log(param)
    const manager = getMongoManager();
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


    let trips = await manager.find(TripEntity, {
      where: {
          ['car._id']: ObjectId(req.id)
      }
    })

    findCar[0]["trips"] = trips;
    findCar[0]["trips"].forEach(trip=> delete trip["car"])

    return findCar;

  }

  remove(id: number) {
    return `This action removes a #${id} rentCar`;
  }
}
