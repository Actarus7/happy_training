/* import { Training } from "src/trainings/entities/training.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from "typeorm";


@Entity()
export class FavoriteTraining extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.favoriteTrainings)
    user: User;

    @ManyToOne(() => Training, (training) => training.favoriteTrainings)
    training: Training;

}; */