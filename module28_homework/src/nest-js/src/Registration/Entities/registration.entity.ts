import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("RegistrationEntity")
export class RegistrationEntity {
    @ObjectIdColumn()
    _id;

    @Column()
    name: string;
    
    @Column()
    birthday: number;

    @Column()
    mail: string;

    @Column()
    phone: string;

    @Column()
    passport: number;

    @Column()
    passportDate: string

    @Column()
    passportOrgan: number;

    @Column()
    passportCode: string;

    @Column()
    driver: string;

    @Column()
    driverDate: number;

    @Column()
    password: string
}
