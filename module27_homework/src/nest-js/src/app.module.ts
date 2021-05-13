import { RegistrationModule } from './Registration/registration.module';
import { LoginModule } from './Login/login.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: 
  [MongooseModule.forRoot('mongodb://localhost/skilldrive2'),
  MulterModule.register({
    dest: './files'
  }),
  RegistrationModule,
  LoginModule,

  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
