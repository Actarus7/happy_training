
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article extends BaseEntity {
@PrimaryGeneratedColumn('uuid')
id:string;


@Column()
title: string;
@Column()
body: string;



@Column()
createdAt: Date;

@Column()
published: boolean;

@Column()
likes: number;//ajouter des likes



}

