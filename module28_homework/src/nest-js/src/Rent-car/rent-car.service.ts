import { Injectable } from '@nestjs/common';
import { RegistrationEntity } from 'src/Registration/entities/registration.entity';
import { getMongoManager, ObjectID } from 'typeorm';
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
    newRentCar.price = Number(createRentCarDto.price);
    newRentCar.city = createRentCarDto.city;
    newRentCar.geo = createRentCarDto.geo;
    newRentCar.category = createRentCarDto.category;
    newRentCar.rating = createRentCarDto.rating;
    newRentCar.photo = createRentCarDto.photo;
    newRentCar.dateAvailable = createRentCarDto.dateAvailable;

    newRentCar.owner = new RegistrationEntity();
    newRentCar.owner.mail = createRentCarDto.owner;

    return await this.rentCarRepository.create(newRentCar);
  }

  async findStart(param) {
    /*Это тестовый запрос*/
    const manager = getMongoManager();
    delete param["dateAvailable"];

    let cars = await manager.find( RentCarEntity, param );
    return cars;
  }

  async find(param) {
    const manager = getMongoManager();
    console.log(param);
    if(param.dateAvailable) {
      param.dateAvailable = param.dateAvailable.split("|");
      param.dateAvailable[0] = param.dateAvailable[0].split(",");
      param.dateAvailable[1] = param.dateAvailable[1].split(",");
    }
    let findDate = param.dateAvailable;
    delete param["dateAvailable"];
    let availableCars = [];
    
    /*Тут сначала фильтруются данные по городу и категории*/
    /*Сообственно здесь и должна быть сортировка, как я полагаю
    let findCars = await manager.find( RentCarEntity, param ).sort({"price": -1})
    но это не работает
    */
    let findCars = await manager.find( RentCarEntity, param ); 
  

    /*Тут идёт перебор по доступным датам (пока без mongo, тоже не понимаю как иначе (хотя работает))*/
    findCars.forEach(car => {
      !car.dateAvailable.length
      ? availableCars.push(car)
      : car.dateAvailable.forEach((date,index) => {
        if((new Date(findDate[0]) < new Date(date[0]) 
        && new Date(findDate[1]) < new Date(date[0]))
        ||
        (new Date(findDate[0]) > new Date(date[1]) 
        && new Date(findDate[1]) > new Date(date[1]))) {
          availableCars.push(car);
          return availableCars;
        } else {
          console.log(`Автомобиль ${car.brand} ${car.model} занят в это время`)
        }
      })
      return availableCars;
    }) 
    
    return availableCars;
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

  remove(id: number) {
    
    return `This action removes a #${id} rentCar`;
  }
}
