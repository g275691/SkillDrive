import { Injectable } from '@nestjs/common';
import { getMongoManager } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesEntity } from './entities/message.entity';
import { MessagesRepository } from './Repositories/messages.repository';

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
    const findChat = await manager.find( MessagesEntity, { 
      where: {
        fromUser: {
          $in: [query.fromUser, query.toUser]
        },
        toUser: {
          $in: [query.fromUser, query.toUser]
        }
      },
      order: {time: 1}
    } );
    return findChat
    // .length 
    // ? findChat 
    // : [{
    //   _id: Date.now(),
    //   toUser: query.toUser,
    //   fromUser: query.fromUser,
    //   message: "Приветствую! Интересуюсь крутыми тачками? Есть такие?"
    // }]
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
