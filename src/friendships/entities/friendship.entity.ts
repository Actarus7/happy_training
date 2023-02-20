import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

@Entity()
export class Friendship extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty()
    @Column({ type: 'boolean', default: false })
    status: boolean;


    @ApiProperty()
    @ManyToOne(() => User, user => user.sentFriendships)
    userSender: User;


    @ApiProperty()
    @ManyToOne(() => User, user => user.receivedFriendships)
    userReceiver: User;


    @ManyToMany(() => User, user => user.friends)
    @JoinTable()
    users: User[];

};
