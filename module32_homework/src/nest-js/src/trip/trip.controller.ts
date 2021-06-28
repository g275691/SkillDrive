import { Controller, Get, Post, Body, Put, Param, Delete, Response, Request, HttpCode } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Controller('rent-car/trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  create(@Body() createTripDto: CreateTripDto, @Response() res: any) {
    return this.tripService.create(createTripDto, res);
  }

  @Get()
  findAll() {
    return this.tripService.findAll();
  }

  @Get(':license')
  findOne(@Param('license') license: string) {
    console.log(license)
    return this.tripService.findOne(license);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripService.remove(+id);
  }
}
