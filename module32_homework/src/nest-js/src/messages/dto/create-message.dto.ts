import { ObjectId } from "mongoose";
import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
    id;

    @IsNotEmpty()
    fromUser;

    @IsNotEmpty()
    toUser;

    @IsNotEmpty()
    message: string;

    @IsNotEmpty()
    isRead: boolean;
}
