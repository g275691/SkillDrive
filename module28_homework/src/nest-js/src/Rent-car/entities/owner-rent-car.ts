import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class OwnerRentCar {
    @ObjectIdColumn()
    _id;

    @Column()
    name: string
}
