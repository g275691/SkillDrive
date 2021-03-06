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
    engine: string;

    @Column()
    power: string;

    @Column()
    transmission: string;

    @Column()
    driveUnit: string;

    @Column()
    price: Number;

    @Column(()=> owner )
    owner: owner;

    @Column()
    city: string;

    @Column()
    geo: string;

    @Column()
    category: string;

    @Column()
    rating: string;

    @Column()
    photo: string

    @Column()
    dateAvailable: any
}
