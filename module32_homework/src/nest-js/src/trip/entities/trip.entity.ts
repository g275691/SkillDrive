import { RentCar as RentCarEntity} from "src/Rent-car/entities/rent-car.entity";
import { Column, Entity, ObjectIdColumn } from "typeorm";


@Entity("TripEntity")
export class TripEntity {
    @ObjectIdColumn()
    _id;

    @Column()
    license: string;

    @Column()
    client: string;

    @Column()
    ownerCar: string;

    @Column()
    startRent: Date;

    @Column()
    endRent: Date;

    @Column()
    price: Number;

    @Column()
    review: Array<string>;

    @Column()
    optionsDelivery: boolean;

    @Column()
    optionsBabyChair: boolean;

    @Column()
    optionsEndRentAnywhere: boolean;

    @Column()
    dateRent: Date;

    @Column()
    rate: number;

    @Column()
    statusStartRent: boolean;

    @Column()
    statusStartTalkOwner: boolean;

    @Column()
    statusStartTalkClient: boolean;

    @Column()
    days: number;

    @Column()
    car: object;
}
