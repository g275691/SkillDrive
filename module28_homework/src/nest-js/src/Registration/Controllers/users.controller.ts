import { testDto } from '../dto/testDto';
import { UsersService } from '../Services/users.service';
import { Body, Controller, Post, HttpCode, Response, UseInterceptors, UploadedFile, Get, UploadedFiles } from '@nestjs/common';

@Controller('users')
export class UsersController  {
    constructor(private UsersService: UsersService
      ) {}

      @Get()
      getUser(@Body() req: testDto) {
        return this.UsersService.getUser(req);
      }

}