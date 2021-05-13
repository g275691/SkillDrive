import { RegistrationService } from './../Services/registration.service';
import { registrationDto } from './../dto/registration.dto';
import { Body, Controller, Post, HttpCode, Response, UseInterceptors, UploadedFile, Get, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

const fs = require('fs'); 

const imgFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('Only image files are allowed!'), false);
    } 
    return cb(null, true);
    }

const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = path.extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

@Controller('users/registration')
export class RegistrationController  {
    constructor(private RegistrationService: RegistrationService) {}

    @Post('step1')
    @HttpCode(200)
    step1(@Body() registrationDto: registrationDto, @Response() res: any) {
      console.log(registrationDto)
      return this.RegistrationService.step1(registrationDto, res);
    }

    @Post('uploadAvatar')
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatar'
        , filename: editFileName
      }),
      fileFilter: imgFileFilter,
      limits: { fileSize: 3e+7 },
    }))
    step2(@UploadedFile() file: Express.Multer.File) {
      console.log(file);
      return {"img": file.filename};
    }
    @Get('toStep3')
    toStep3() {
      return;
    }

    @Post('uploadDocs')
    @UseInterceptors(FilesInterceptor('uploadDocs', 20, {
      storage: diskStorage({
        destination: ('./uploads/docs')
        , filename: editFileName
      }),

      fileFilter: imgFileFilter
    }))
    step3UploadDocs(@UploadedFiles() files: any) {
      console.log(files);
      return files.map(el => {
        return {
          "img": el.filename,
          "size": (el.size/1000000).toFixed(2),
          "extension": el.mimetype.slice(el.mimetype.indexOf("/")+1)
        }
      })
    }
    @Post('removePhoto')
    removeDoc(@Body() registrationDto: registrationDto, @Response() res: any) {
      return this.RegistrationService.step3removeDoc(registrationDto, res)
    }

    @Post('toSuccess')
    toSuccess(@Body() registrationDto: registrationDto, @Response() res: any) {
      console.log(registrationDto);
      return this.RegistrationService.step3registration(registrationDto, res);
    }
}