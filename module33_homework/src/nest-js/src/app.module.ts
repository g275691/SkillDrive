import { RegistrationModule } from './Registration/registration.module';
import { LoginModule } from './Login/login.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentCarModule } from './Rent-car/rent-car.module';
import { TripModule } from './trip/trip.module';
import { MessagesModule } from './messages/messages.module';

import { RenderModule } from 'nest-next';
import Next from 'next';

@Module({
  imports: 
  [
    RenderModule.forRootAsync(Next({ dev: true }), { viewsDir: null }),
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
    RegistrationModule,
    LoginModule,
    RentCarModule,
    TripModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
