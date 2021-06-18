import { ObjectId } from "mongoose";
import { IsNotEmpty } from 'class-validator';

export class CreateRentCarDto {
    _id: ObjectId;

    @IsNotEmpty()
    brand: string

    @IsNotEmpty()
    model: string

    @IsNotEmpty()
    year: string

    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    geo: Array<any>

    @IsNotEmpty()
    category: string

    @IsNotEmpty()
    license: string

    @IsNotEmpty()
    VIN: string

    @IsNotEmpty()
    color: string

    @IsNotEmpty()
    engine: string

    @IsNotEmpty()
    volume: string

    @IsNotEmpty()
    power: string

    @IsNotEmpty()
    transmission: string

    @IsNotEmpty()
    mileage: string

    @IsNotEmpty()
    PTS: string

    @IsNotEmpty()
    STS: string

    @IsNotEmpty()
    price: any

    @IsNotEmpty()
    price3: any

    @IsNotEmpty()
    price5: any

    @IsNotEmpty()
    OSAGO: string

    @IsNotEmpty()
    CASCO: string

    @IsNotEmpty()
    driveUnit: string

    @IsNotEmpty()
    options: Array<any>

    // @IsNotEmpty()
    // photosCars: Array<String>

    // @IsNotEmpty()
    // photosCarsDocs: Array<String>

    rating: number
    owner: string
}
