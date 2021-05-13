import { RegistrationModule } from './Registration/registration.module';
import { LoginModule } from './Login/login.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentCarModule } from './Rent-car/rent-car.module';

@Module({
  imports: 
  [
    TypeOrmModule.forRoot({
      name: "default",
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "skilldrive-db",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [
        `${__dirname}/**/*.entity.{ts,js}`
      ]
    }),
    MongooseModule.forRoot('mongodb://localhost/skilldrive2'),
    MulterModule.register({
      dest: './files'
    }),
    RegistrationModule,
    LoginModule,
    RentCarModule,

  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
