import { Injectable } from '@nestjs/common';
import { getMongoManager } from 'typeorm';
import { RentCar as RentCarEntity } from '../entities/rent-car.entity';
import { RentCarRepository } from '../repositories/rent-car.repository';
const ObjectId = require('mongodb').ObjectId; 

@Injectable()
export class RentCarService {
  constructor(private rentCarRepository: RentCarRepository
    
    ) {}
    
  async findStart(param) {
    /*Это тестовый запрос*/
    const manager = getMongoManager();
    delete param["dateAvailable"];

    return await manager.find( RentCarEntity, param )
  }

  async find(param) {
    const manager = getMongoManager();
    
    // if(param.dateAvailable) {
    //   param.dateAvailable = param.dateAvailable.split("|");
    //   param.dateAvailable[0] = param.dateAvailable[0].split(",");
    //   param.dateAvailable[1] = param.dateAvailable[1].split(",");
    // }
    // let findDate = param.dateAvailable;
    // let availableCars = [];
    
    /*Тут сначала фильтруются данные по городу и категории*/

    let findCars = await manager.find( RentCarEntity, {
      where: {
        city: param.city,
        category: param.category
      },
      order: 
      param.sort == "price" && { price: 1 }
      || param.sort == "transmission" && { transmission: 1 }
      || param.sort == "driveUnit" && { driveUnit: 1 }
      || param.sort == "engine" && { engine: 1 }
    }  )

    /*Перебор по доступным датам пока такой странный - в следующем модуле уже нормальный сделаю, в отдельную сущность переведу*/
    // findCars.forEach(car => {
    //   !car.dateAvailable.length
    //   ? availableCars.push(car)
    //   : car.dateAvailable.forEach((date,index) => {
    //     if((new Date(findDate[0]) < new Date(date[0]) 
    //     && new Date(findDate[1]) < new Date(date[0]))
    //     ||
    //     (new Date(findDate[0]) > new Date(date[1]) 
    //     && new Date(findDate[1]) > new Date(date[1]))) {
    //       availableCars.push(car);
    //       return availableCars;
    //     } else {
    //       console.log(`Автомобиль ${car.brand} ${car.model} занят в это время`)
    //     }
    //   })
    //   return availableCars;
    // }) 
    
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
