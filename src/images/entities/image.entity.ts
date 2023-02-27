import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image extends BaseEntity{
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    originalName: string;

    @Column()
    fileName: string;

    @Column()
    mimeType: string;

    @OneToOne(() => User, user => user.image)
    @JoinTable()
    user: User;

}

