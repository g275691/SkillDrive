import { Injectable } from '@nestjs/common';
import { TripEntity } from 'src/trip/entities/trip.entity';
import { getMongoManager } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesEntity } from './entities/message.entity';
import { MessagesRepository } from './Repositories/messages.repository';
const ObjectId = require('mongodb').ObjectId; 

@Injectable()
export class MessagesService {
  constructor(private messagesRepository: MessagesRepository
    
    ) {}

  async create(createMessageDto: CreateMessageDto) {
    const newMessage = new MessagesEntity();

    newMessage.time = createMessageDto.time;
    newMessage.message = createMessageDto.message;
    newMessage.isRead = createMessageDto.isRead;

    newMessage.fromUser = createMessageDto.fromUser;
    newMessage.toUser = createMessageDto.toUser;
    newMessage.emoji = createMessageDto.emoji;

    newMessage.chatBot = createMessageDto.chatBot;
    newMessage.lastTrip = createMessageDto.lastTrip;

    return await this.messagesRepository.create(newMessage);
  }

  async findAll(query) {
    const manager = getMongoManager();
    return await manager.find( MessagesEntity, query )
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  async findChat(query) {
    const manager = getMongoManager();
    const findChat = await manager.find( MessagesEntity,  {  
      where: {
        // fromUser: {
        //   $in: [query.fromUser, query.toUser]
        // },
        // toUser: {
        //   $in: [query.fromUser, query.toUser]
        // }
      },
     order: {time: 1}
    } )

    this.updateReadMessage(query)

    return findChat;
  }

  async update(messageTime, payload) {
    const manager = getMongoManager();
    let findMessage = await manager.findOne(MessagesEntity, {time: Number(messageTime)});
    
    if(payload.emoji) {
      let newEmojiArray = [...findMessage.emoji, payload.emoji];
      await manager.update(
        MessagesEntity, 
        { time: Number(messageTime) },
        { emoji: newEmojiArray }
      )
    } else {
      await manager.update(
        MessagesEntity, 
        { time: payload.messageTime },
        payload
      )
    }
  }

  async updateTrip(payload) {
    
    const manager = getMongoManager();
    let test = await manager.find(TripEntity, { dateRent: new Date(payload.tripTime) })

    await manager.update(
      TripEntity, 
      { dateRent: new Date(payload.tripTime) },
      payload.update
    )
  }

  async updateReadMessage(query) {
    const manager = getMongoManager();
    await manager.updateMany(
      MessagesEntity, {
      fromUser: query.toUser,
      toUser: query.fromUser
    }, 
    { $set: {  isRead: true }});
  }

  async remove(messageTime) {
    
    const manager = getMongoManager();
    return await manager.delete(MessagesEntity, {time: messageTime})
  }
}
