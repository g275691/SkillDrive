import { Injectable } from "@nestjs/common";
import { MessagesEntity } from "src/messages/entities/message.entity";
import { MessagesRepository } from "src/messages/Repositories/messages.repository";
import { getMongoManager, Not } from "typeorm";
import { RegistrationEntity } from '../entities/registration.entity';

@Injectable()
export class UsersService {

    async getUser(param) {
    const manager = getMongoManager();
    
    let users = await manager.find( RegistrationEntity, {
        where: {
            mail: { $ne: param.mail }
        }
    } );

    let noReadMessage = await manager.find( MessagesEntity, {
        where: {
            toUser: param.mail,
            isRead: false
        }
    } )

    noReadMessage.length 
    ? users.forEach(elUsers => {
        noReadMessage.forEach(elMessage => {
            elUsers.mail == elMessage.fromUser 
            ? elUsers["isRead"] = false
            : elUsers["isRead"] = true
        })
    })
    : users.forEach(elUsers => elUsers["isRead"] = true)

    return users;
    }

    async getMessageForYou() {
        const manager = getMongoManager();
    }
}