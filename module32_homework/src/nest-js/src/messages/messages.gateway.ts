import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
 } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { TripService } from 'src/trip/trip.service';
 
 @WebSocketGateway(5000)
 export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
 
  @SubscribeMessage('msgToServer')
  handleMessage(
    @MessageBody() payload: CreateMessageDto,
    @ConnectedSocket() client: Socket,
    ): void {
    this.messagesService.findChat({})
      .then(data=>{
        this.server.emit('msgToClient', data);
      })
  }

  // @SubscribeMessage('emojiToServer')
  // handleEmoji(
  //   @MessageBody() payload,
  //   @ConnectedSocket() client: Socket,
  //   ): void {
  //   console.log(payload);
  //   this.messagesService.update(payload)
  //   .then(()=>{
  //     this.messagesService.findChat({})
  //     .then(data=>{
  //       this.server.emit('msgToClient', data);
  //     })
  //   })
  // }

  @SubscribeMessage('updateTrip')
  updateTrip(
    @MessageBody() payload,
    @ConnectedSocket() client: Socket,
    ): void {
      console.log(payload);
      this.messagesService.updateTrip(payload)
      .then(()=>{
        this.messagesService.remove(payload)
        .then(()=>{
        this.messagesService.findChat({})
        .then(data=>{
          this.server.emit('msgToClient', data);
        })
      })
    })

    }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string ) {
    client.leave(room);
    client.emit('leftRoom', room);
    
  }

  afterInit(server: Server) {
   this.logger.log('Init');
  }
 
  handleDisconnect(client: Socket) {
   //this.logger.log(`Client disconnected: ${client.id}`);
  }
 
  handleConnection(client: Socket, ...args: any[]) {
   //this.logger.log(`Client connected: ${client.id}`);
   
  }
 }