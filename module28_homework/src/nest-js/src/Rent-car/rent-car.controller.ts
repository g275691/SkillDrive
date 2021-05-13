import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RentCarService } from './rent-car.service';
import { CreateRentCarDto } from './dto/create-rent-car.dto';

@Controller('rent-car')
export class RentCarController {
  constructor(private readonly rentCarService: RentCarService) {}

  @Post()
  async create(@Body() createRentCarDto: CreateRentCarDto) {
    return this.rentCarService.create(createRentCarDto);
  }

  @Get()
  findAll() {
    return this.rentCarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentCarService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentCarService.remove(+id);
  }

  @Get('/test')
  testAll() {
    return this.rentCarService.testAll();
  }
}
