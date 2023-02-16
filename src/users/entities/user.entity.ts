import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity('users')
@Unique(['email', 'pseudo'])
export class User extends BaseEntity {


    // Colonnes
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty()
    @Column({ type: 'varchar' })
    pseudo: string;


    @ApiProperty()
    @Exclude()
    @Column({ type: 'varchar' })
    password: string;


    @ApiProperty()
    @Column({ type: 'varchar' })
    email: string;


    @ApiProperty()
    @Column({type: 'boolean', default: false})
    admin: number;


    @ApiProperty()
    @Column({ type: 'string', nullable: true })
    photo: string;


    @ApiProperty()
    @Column({ type: 'varchar' })
    city: string;


    @ApiProperty()
    @Column()
    registrationDate: Date;


    @ApiProperty()
    @Column({ type: 'varchar' })
    description: string;


    @ApiProperty()
    @Column()
    friends: User[];


    @ApiProperty()
    @Column()
    trainings: Training[];



    // Relations
    @OneToMany(() => Article, (article) => article.user)
    articles: Article[];


    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];





};
