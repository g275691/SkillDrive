import { Injectable } from "@nestjs/common";
import { getMongoManager } from "typeorm";
import { RegistrationEntity } from '../entities/registration.entity';

@Injectable()
export class UsersService {
    async getUser(req) {
        const { mail } = req;
        const manager = getMongoManager();
        return await manager.findOne( RegistrationEntity, { mail } );
    }
}