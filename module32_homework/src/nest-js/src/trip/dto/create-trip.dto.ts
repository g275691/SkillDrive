import { ObjectId } from "mongoose";
import { IsNotEmpty } from 'class-validator';

export class CreateTripDto {
    _id: ObjectId;

    @IsNotEmpty()
    license: string;

    @IsNotEmpty()
    client: string;

    ownerCar;

    @IsNotEmpty()
    startRent: Date;

    @IsNotEmpty()
    endRent: Date;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    comment: string;

    @IsNotEmpty()
    optionsDelivery: boolean;

    @IsNotEmpty()
    optionsBabyChair: boolean;

    @IsNotEmpty()
    optionsEndRentAnywhere: boolean;

    rate: number;

    @IsNotEmpty()
    statusStartRent: boolean;

    @IsNotEmpty()
    statusStartTalkOwner: boolean;

    @IsNotEmpty()
    statusStartTalkClient: boolean;

    days;

    car;
}
