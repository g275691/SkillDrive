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
    price: Number
    owner: string
    city: string
    geo: string
    category: string
    rating: string
    photo: string

    dateAvailable: any
}
