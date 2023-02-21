import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
// import { FavoriteTraining } from "src/favorite-trainings/entities/favorite-training.entity";
import { Friendship } from "src/friendships/entities/friendship.entity";
import { Training } from "src/trainings/entities/training.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity('users')
@Unique(['email', 'pseudo']) // rend les paramètres unique - renvoie une erreur serveur avec violation de la contrainte unique - obligation de gérer le cas dans le contrôleur
export class User extends BaseEntity {


    // Colonnes
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty()
    @Column({ type: 'varchar' })
    pseudo: string;


    @ApiProperty()
    @Exclude() // permet d'exclure une colonne du retour de données en ajoutant un interceptor sur les routes concernées
    @Column({ type: 'varchar' })
    password: string;


    @ApiProperty()
    @Column({ type: 'varchar' })
    email: string;


    @ApiProperty()
    @Column({ type: 'boolean', default: false })
    admin: number;


    @ApiProperty()
    @Column({ type: 'varchar', nullable: true })
    photo: string;


    @ApiProperty()
    @Column({ type: 'varchar' })
    city: string;


    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    registrationDate: Date;


    @ApiProperty()
    @Column({ type: 'varchar', nullable: true })
    description: string;


    // Relations
    @ApiProperty({ type: () => [Training] })
    @ManyToMany(() => Training, training => training.users, { cascade: true })
    @JoinTable()
    trainings: Training[];



    // /* @OneToMany(() => FavoriteTraining, (favoriteTraining) => favoriteTraining.user)
    // favoriteTrainings: FavoriteTraining[]; */



    @ApiProperty()
    @OneToMany(() => Friendship, friendship => friendship.userSender)
    sentFriendships: Friendship[];



    @ApiProperty()
    @OneToMany(() => Friendship, friendship => friendship.userReceiver)
    receivedFriendships: Friendship[];


    /* @OneToMany(() => Article, article => article.user)
    articles: Article[];



    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[]; */








};
