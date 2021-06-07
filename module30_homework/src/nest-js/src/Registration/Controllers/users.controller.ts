import { testDto } from '../dto/testDto';
import { UsersService } from '../Services/users.service';
import { Body, Controller, Query, Post, HttpCode, Response, UseInterceptors, UploadedFile, Get, UploadedFiles } from '@nestjs/common';

@Controller('users')
export class UsersController  {
    constructor(private UsersService: UsersService
      ) {}

      @Get()
      getUser(@Query() param: string) {
        return this.UsersService.getUser(param);
      }
}

