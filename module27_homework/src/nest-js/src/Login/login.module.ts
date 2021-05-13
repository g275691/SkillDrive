import { checkMailMiddleware } from './Middleware/checkMail.middleware.js';
import { checkPasswordMiddleware } from './Middleware/checkPassword.middleware';

import { MongooseModule } from '@nestjs/mongoose';
import { LoginController } from './Controllers/login.controller';
import { LoginService } from 'src/Login/Services/Login.service';
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { registrationSchema } from '../Schemas/registration.schema.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Users', schema: registrationSchema}
        ])
    ],
    providers: [LoginService],
    controllers: [LoginController]
})
export class LoginModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(checkMailMiddleware, checkPasswordMiddleware)
        .forRoutes('users/auth/access')

        consumer
        .apply(checkMailMiddleware)
        .forRoutes('users/auth/pass-recovery', 'users/auth/pass-reset')
    }
}