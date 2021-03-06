import { Controller, Get, Query, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RentCarService } from './rent-car.service';
import { CreateRentCarDto } from './dto/create-rent-car.dto';

@Controller('rent-car')
export class RentCarController {
  constructor(private readonly rentCarService: RentCarService) {}

  @Post()
  async create(@Body() createRentCarDto: CreateRentCarDto) {
    return this.rentCarService.create(createRentCarDto);
  }

  @Put(':model')
  async updateAll(@Body() createRentCarDto: CreateRentCarDto, @Param() param: string) {
    return this.rentCarService.update(createRentCarDto, param);
  }

  @Get()
  find(@Query() param: any) {
    return this.rentCarService.find(param);
  }

  @Get('start')
  findStart(@Query() param: any) {
    return this.rentCarService.findStart(param);
  }

  @Get(':mail')
  GetByOwner(@Param() param: string) {
    return this.rentCarService.getByOwner(param)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentCarService.remove(+id);
  }
}