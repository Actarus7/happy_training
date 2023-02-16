import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Friendship } from "src/friendships/entities/friendship.entity";
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
    @Column({ type: 'boolean', default: false })
    admin: number;


    @ApiProperty()
    @Column({ type: 'string', nullable: true })
    photo: string;


    @ApiProperty()
    @Column({ type: 'varchar' })
    city: string;


    @ApiProperty()
    @Column({ type: 'timestamp with local time zone', default: () => 'CURRENT_TIMESTAMP' })
    registrationDate: Date;


    @ApiProperty()
    @Column({ type: 'varchar', nullable: true })
    description: string;


    @ApiProperty()
    @Column({ nullable: true })
    friends: User[];


    /* @ApiProperty()
    @Column({nullable: true})
    trainings: Training[];



    // Relations
    @OneToMany(() => Article, article => article.user)
    articles: Article[];


    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[]; */


    @OneToMany(() => Friendship, friendship => friendship.userSender)
    sentFriendships: Friendship[];


    @OneToMany(() => Friendship, friendship => friendship.userReceiver)
    receivedFriendships: Friendship[];






};
