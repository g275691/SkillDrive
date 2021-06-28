import { RentCar as RentCarEntity} from "src/Rent-car/entities/rent-car.entity";
import { Column, Entity, ObjectIdColumn } from "typeorm";


@Entity("TripEntity")
export class TripEntity {
    @ObjectIdColumn()
    _id;

    @Column()
    license: string;

    @Column()
    owner: string;

    @Column()
    startRent: Date;

    @Column()
    endRent: Date;

    @Column()
    price: Number;

    @Column()
    comment: string;

    @Column()
    optionsDelivery: boolean;

    @Column()
    optionsBabyChair: boolean;

    @Column()
    optionsEndRentAnywhere: boolean;

    @Column()
    dateRent: Date;
}
