import { Injectable } from '@nestjs/common';
import { writeFile, ensureDir } from 'fs-extra';
import { RegistrationEntity } from 'src/Registration/entities/registration.entity';
import { getMongoManager } from 'typeorm';
import { CreateRentCarDto } from './dto/create-rent-car.dto';
import { RentCar as RentCarEntity } from './entities/rent-car.entity';
import { RentCarRepository } from './repositories/rent-car.repository';
import { createUniqName } from './config/createUniqName';
var ObjectId = require('mongodb').ObjectId; 
var mongoose = require('mongoose');

@Injectable()
export class RentCarService {
  constructor(private rentCarRepository: RentCarRepository
    
    ) {}

  async create(createRentCarDto: CreateRentCarDto, img) {
    const id = mongoose.Types.ObjectId();
    const uploadFolderCar = `users/${createRentCarDto.owner}/${id}/imgCar/`;
    const uploadForlderDocs = `users/${createRentCarDto.owner}/${id}/imgDocs/`
    
    await ensureDir(uploadFolderCar);
    await ensureDir(uploadForlderDocs);

    const carPhotos = [];
    const carDocs = [];

    const newRentCar = new RentCarEntity();
    for(const file of img) {
      if(file.fieldname == "imgCar") {
        const newName = createUniqName(file);
        await writeFile(`${uploadFolderCar}/${newName}`, file.buffer);
        carPhotos.push(`http://localhost:8000/img-car/${createRentCarDto.owner}/${id}/imgCar/${newName}`)
      } else if(file.fieldname == "imgDoc") {
        const newName = createUniqName(file);
        await writeFile(`${uploadForlderDocs}/${newName}`, file.buffer);
        carDocs.push(`http://localhost:8000/img-car/${createRentCarDto.owner}/${id}/imgDocs/${newName}`)
      }
    }
    
    newRentCar._id = id
    newRentCar.brand = createRentCarDto.brand;
    newRentCar.model = createRentCarDto.model;
    newRentCar.year = createRentCarDto.year;
    newRentCar.city = createRentCarDto.city;
    newRentCar.geo = createRentCarDto.geo.split(",");
    newRentCar.category = createRentCarDto.category;
    newRentCar.license = createRentCarDto.license;
    newRentCar.VIN = createRentCarDto.VIN;
    newRentCar.color = createRentCarDto.color;
    newRentCar.engine = createRentCarDto.engine;
    newRentCar.volume = createRentCarDto.volume;
    newRentCar.power = createRentCarDto.power;
    newRentCar.transmission = createRentCarDto.transmission;
    newRentCar.mileage = createRentCarDto.mileage;
    newRentCar.PTS = createRentCarDto.PTS;
    newRentCar.STS = createRentCarDto.STS;
    newRentCar.price = Number(createRentCarDto.price);
    newRentCar.price3 = Number(createRentCarDto.price3);
    newRentCar.price5 = Number(createRentCarDto.price5);
    newRentCar.OSAGO = createRentCarDto.OSAGO;
    newRentCar.CASCO = createRentCarDto.CASCO;
    newRentCar.driveUnit = createRentCarDto.driveUnit + " привод";
    newRentCar.options = createRentCarDto.options.split(",");
    newRentCar.photosCars = carPhotos;
    newRentCar.photosCarsDocs = carDocs;

    newRentCar.rating = 0;

    newRentCar.owner = new RegistrationEntity();
    newRentCar.owner.mail = createRentCarDto.owner;

    return await this.rentCarRepository.create(newRentCar);
  }

  async findStart(param) {
    /*Это тестовый запрос*/
    const manager = getMongoManager();
    delete param["dateAvailable"];

    return await manager.find( RentCarEntity, param )
  }

  async find(param) {
    const manager = getMongoManager();
    
    if(param.dateAvailable) {
      param.dateAvailable = param.dateAvailable.split("|");
      param.dateAvailable[0] = param.dateAvailable[0].split(",");
      param.dateAvailable[1] = param.dateAvailable[1].split(",");
    }
    let findDate = param.dateAvailable;
    let availableCars = [];
    
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

  async getCar(req) {
    const manager = getMongoManager();
    console.log(req.id)
    return await manager.find(RentCarEntity, {"_id": ObjectId(req.id)})

  }

  remove(id: number) {
    return `This action removes a #${id} rentCar`;
  }
}
