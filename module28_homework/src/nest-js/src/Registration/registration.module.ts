import { isMailInDb } from './Middleware/isMailInDb.middleware';
import { RegistrationController } from './Controllers/registration.controller';
import { RegistrationService } from './Services/registration.service';

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { RegistrationRepository } from './Repositories/registration.repository';

@Module({

    providers: [RegistrationService, RegistrationRepository],
    controllers: [RegistrationController]
})
export class RegistrationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(isMailInDb)
        .forRoutes('users/registration/step1')
    }
}