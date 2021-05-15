import { Injectable } from "@nestjs/common";
import { getMongoManager } from "typeorm";
import { RegistrationEntity } from '../entities/registration.entity';

@Injectable()
export class UsersService {
    async getUser(param) {
        const { mail } = param;
        const manager = getMongoManager();
        console.log(param);

       return await manager.find( RegistrationEntity, param )

        // return Object.values(param).length
        // ? await manager.find( RegistrationEntity,
        //      {
        //         "mail": { $exists: false },
        //         "phone": param.phone
        // }
        
        // )



        // : await manager.find( RegistrationEntity, {} );
    }
}