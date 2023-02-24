import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image extends BaseEntity{
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    pseudoUser: string;

    @OneToOne(() => User, user => user.image)
    @JoinTable()
    user: User;

}

