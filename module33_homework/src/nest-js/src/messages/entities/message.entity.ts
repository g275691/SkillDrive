import { Column, Entity, ObjectIdColumn, OneToMany } from "typeorm";
import { RegistrationEntity } from "src/Registration/entities/registration.entity";

@Entity("Messages")
export class MessagesEntity {
    @ObjectIdColumn()
    _id;

    @Column()
    time: Number;

    @Column()
    fromUser: string

    @Column()
    toUser: string

    @Column()
    message: string

    @Column()
    isRead: boolean

    @Column()
    emoji: Array<string>

    @Column()
    chatBot;

    @Column()
    lastTrip: object;
}
