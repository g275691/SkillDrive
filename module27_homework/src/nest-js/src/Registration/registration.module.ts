import { isMailInDb } from './Middleware/isMailInDb.middleware';
import { RegistrationController } from './Controllers/registration.controller';
import { RegistrationService } from './Services/registration.service';
import { registrationSchema } from './../Schemas/registration.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Users', schema: registrationSchema}
        ])
    ],
    providers: [RegistrationService],
    controllers: [RegistrationController]
})
export class RegistrationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(isMailInDb)
        .forRoutes('users/registration/step1')
    }
}