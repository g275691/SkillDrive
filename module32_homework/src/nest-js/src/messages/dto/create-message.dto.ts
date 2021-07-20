import { ObjectId } from "mongoose";
import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
    _id;

    @IsNotEmpty()
    time;

    @IsNotEmpty()
    fromUser;

    @IsNotEmpty()
    toUser;

    @IsNotEmpty()
    message: string;

    @IsNotEmpty()
    isRead: boolean;

    @IsNotEmpty()
    emoji: Array<string>
}
