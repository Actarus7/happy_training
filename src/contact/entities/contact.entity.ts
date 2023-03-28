import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('contacts')
export class Contact extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column()
    email: string;
  
    @Column() 
    message: string;
}
