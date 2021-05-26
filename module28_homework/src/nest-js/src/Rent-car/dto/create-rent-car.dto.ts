import { ObjectId } from "mongoose";


export class CreateRentCarDto {
    _id: ObjectId;
    brand: string
    model: string
    year: string
    engine: string
    power: string
    transmission: string
    driveUnit: string
    price: string
    owner: string
    city: string
    category: string
    rating: string
    photo: string

    dateAvailable: any
}
