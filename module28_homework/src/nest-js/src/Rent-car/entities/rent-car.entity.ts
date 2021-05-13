import { Column, Entity, ObjectIdColumn } from "typeorm";
import { OwnerRentCar } from "./owner-rent-car";
import { Document } from 'mongoose';

export type RegistrationDocument = typeof RentCar & Document;

@Entity("RentCar")
export class RentCar {
    @ObjectIdColumn()
    _id;

    @Column()
    name: string;
    
    // @Column()
    // price: number;

    // // @Column(()=>OwnerRentCar)
    // // owner: OwnerRentCar;

    // @Column()
    // city: string;

    // @Column()
    // category: string;

    // @Column()
    // power: number;

    // @Column()
    // photo: string
}
