import { TripEntity } from "src/trip/entities/trip.entity";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { RegistrationEntity as owner} from "../../Registration/Entities/registration.entity";

@Entity("RentCar")
export class RentCar {
    @ObjectIdColumn()
    _id;

    @Column()
    brand: string;
    
    @Column()
    model: string;

    @Column()
    year: string;

    @Column()
    city: string;

    @Column()
    geo: Array<any>;

    @Column()
    category: string;

    @Column()
    license: string;

    @Column()
    VIN: string;

    @Column()
    color: string;

    @Column()
    engine: string;

    @Column()
    volume: string;

    @Column()
    power: string;

    @Column()
    transmission: string;

    @Column()
    mileage: string;

    @Column()
    PTS: string;

    @Column()
    STS: string;

    @Column()
    price: Number;

    @Column()
    price3: Number;

    @Column()
    price5: Number;

    @Column()
    OSAGO: string;

    @Column()
    CASCO: string;

    @Column()
    driveUnit: string;

    @Column()
    options: Array<any>;

    @Column()
    photosCars: Array<any>;

    @Column()
    photosCarsDocs: Array<any>;

    @Column(()=> owner )
    owner: owner;

    @Column()
    rating: any;

    @Column()
    photo: string
}
