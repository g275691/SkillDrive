import { Injectable } from "@nestjs/common";
import { getMongoManager } from "typeorm";
import { RegistrationEntity } from '../entities/registration.entity';

@Injectable()
export class UsersService {
    async getUser(param) {
        const manager = getMongoManager();
        console.log(param);

       return await manager.find( RegistrationEntity, param )
    }
}