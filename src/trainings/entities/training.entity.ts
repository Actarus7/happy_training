import { Exercise } from "src/exercises/entities/exercises.entity";
// import { FavoriteTraining } from "src/favorite-trainings/entities/favorite-training.entity";
import { Session } from "src/sessions/entities/session.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Training extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;



  // Relations
  @OneToMany(() => Session, session => session.training)
  sessions: Session[];


  @OneToMany(() => Exercise, exercise => exercise.training)
  exercises: Exercise[];


  @ManyToMany(() => User, (user) => user.trainings)
  users: User[];


  /* @OneToMany(() => FavoriteTraining, (favoriteTraining => favoriteTraining.training))
  favoriteTrainings: FavoriteTraining[]; */


  /*  @OneToMany(() => Comment, comment => comment.training)
    comments: Comment[];
    */
}
