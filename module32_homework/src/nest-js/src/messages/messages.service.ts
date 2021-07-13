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

    newMessage._id = createMessageDto.id;
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
    console.log(query);
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
      order: {_id: 1}
    } );
    console.log(findChat)
    return findChat
    // .length 
    // ? findChat 
    // : [{
    //   id: Date.now(),
    //   toUser: query.toUser,
    //   fromUser: query.fromUser,
    //   message: "Приветствую! Желаете немедленно арендовать машину?"
    // }]
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
