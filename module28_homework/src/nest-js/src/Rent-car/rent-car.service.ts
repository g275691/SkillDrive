import { Injectable } from '@nestjs/common';
import { CreateRentCarDto } from './dto/create-rent-car.dto';
import { RentCar as RentCarEntity } from './entities/rent-car.entity';
import { RentCarRepository } from './repositories/rent-car.repository';
const fs = require('fs');

@Injectable()
export class RentCarService {
  constructor(private rentCarRepository: RentCarRepository) {

  }

  async create(createRentCarDto: CreateRentCarDto) {
    
    const newRentCar = new RentCarEntity();

    newRentCar.name = createRentCarDto.name;
    
    console.log(typeof RentCarEntity);
    // newRentCar.name = createRentCarDto.name;
    // newRentCar.price = createRentCarDto.price;

    return await this.rentCarRepository.create(newRentCar);
  }

  findAll() {
    return `This action returns all rentCar`;
  }

  findOne(id: number) {
    //return `This action retu2rns a #${id} rentCar`;
    let carsList = [];
    let test = fs.readdir('./uploads/cars', (err, files) => {
      if(err) { console.log(err) }
      else {files.forEach(el=>carsList.push(`http://localhost:8000/static/cars/${el}`))}
    });
    
    console.log(carsList);
  }

  remove(id: number) {
    return `This action removes a #${id} rentCar`;
  }

  testAll() {
    fs.readdir('../uploads/cars', (err, items)=>console.log(items))
    console.log("yes")
    return {
      1: ""
    }
  }
}
