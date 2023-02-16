import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Friendship extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty()
    @Column({ type: 'boolean', default: false })
    status: boolean;


    @ManyToOne(() => User, user => user.sentFriendships)
    userSender: User;


    @ManyToOne(() => User, user => user.receivedFriendships)
    userReceiver: User;

};
