import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    originalName: string;

    @Column()
    fileName: string;

    @Column()
    mimeType: string;

   
    }
    //Le byteatype de données permet le stockage de chaînes binaires
   /*  @Column({ type: "blob", nullable: true })
    data: Buffer; */

    /* @OneToOne(() => User, user => user.image, { cascade: true })
    user: User; */



