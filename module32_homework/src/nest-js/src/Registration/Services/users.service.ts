import { Injectable } from "@nestjs/common";
import { MessagesEntity } from "src/messages/entities/message.entity";
import { MessagesRepository } from "src/messages/Repositories/messages.repository";
import { TripEntity } from "src/trip/entities/trip.entity";
import { getMongoManager, Not } from "typeorm";
import { RegistrationEntity } from '../entities/registration.entity';

@Injectable()
export class UsersService {

    async getUser(param) {
    const manager = getMongoManager();
    
    let users = await manager.find( RegistrationEntity, {
        where: { mail: { $ne: param.mail } }
    } );

    let noReadMessage = await manager.find( MessagesEntity, {
        where: {
            toUser: param.mail,
            isRead: false
        }
    } )

    let trips = await manager.find(TripEntity, {
        // where: {
        //     client: param.mail
        // }
    });

    noReadMessage.length 
    ? users.forEach(elUsers => {
        
        noReadMessage.forEach(elMessage => {
            elUsers.mail == elMessage.fromUser 
            ? elUsers["isRead"] = false
            : elUsers["isRead"] = true
        })

    })
    : users.forEach(elUsers => elUsers["isRead"] = true);

    users.forEach(elUsers => {
        trips.forEach(elTrip => {
            console.log(elTrip)
            if(elTrip.client == elUsers.mail || elTrip.ownerCar == elUsers.mail) {
                console.log(elUsers.mail)
                elUsers["lastTrip"] = elTrip}; 
        })
    })
    
    return users;
    }

    async getMessageForYou() {
        const manager = getMongoManager();
    }
}