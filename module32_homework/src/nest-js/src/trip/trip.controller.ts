import { Controller, Get, Post, Body, Put, Param, Delete, Response, Request, HttpCode, Query } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  create(@Body() createTripDto: CreateTripDto, @Response() res: any) {
    return this.tripService.create(createTripDto, res);
  }

  // @Get()
  // findOne(@Body() data) {
  //   console.log(data);
  //   return '2222'
  //   return this.tripService.findOne(data);
  // }

  @Get()
  find(@Query() data: string) {
    return this.tripService.find(data);
  }

  @Put()
  update(@Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripService.remove(+id);
  }
}
