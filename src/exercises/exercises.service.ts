import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Training } from 'src/trainings/entities/training.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercises.entity';
import { SearchExercisesDto } from './dto/search-exercises.dto';

@Injectable()
export class ExercisesService {

  // création d'un nouvel exercice
  async create(createExerciseDto: CreateExerciseDto, session: Session, training: Training): Promise<Exercise> {
    const newExercise = new Exercise();

    newExercise.title = createExerciseDto.title;
    newExercise.content = createExerciseDto.content;
    newExercise.time = createExerciseDto.time;
    newExercise.beginner = createExerciseDto.beginner;
    newExercise.medium = createExerciseDto.medium;
    newExercise.expert = createExerciseDto.expert;
    newExercise.rest_time = createExerciseDto.rest_time;
    newExercise.material = createExerciseDto.material;
    newExercise.video = createExerciseDto.video;
    newExercise.image = createExerciseDto.image;
    newExercise.training = training;
    newExercise.session = session;

    await newExercise.save();

    return newExercise;
  };


  // récupération de tous les exercices
  async findAll(): Promise<Exercise[]> {
    return await Exercise.find({ relations: { training: true, session: true } });
  };


  // Récupération de tous les Exercices d'une Session d'un Training
  async findAllExercisesBySessionTraining(searchExercisesDto: SearchExercisesDto) {
    // Récupération des exercices
    const exercises = await Exercise.find({
      where: {
        training: { id: searchExercisesDto.trainingId },
        session: { id: searchExercisesDto.sessionId }
      }
    });

    if (exercises.length === 0) throw new NotFoundException('Aucun exercice à afficher');

    return exercises;
  };


  // récupération de l'exercice par son id
  async findOne(id: number): Promise<Exercise> {
    return await Exercise.findOne({ relations: { training: true, session: true }, where: { id: id } });
    //`This action returns a #${id} exercice`;
  };

  
  // modification de l'exercice et mise à jour 
  async update(exercise: Exercise, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {

    exercise.title = updateExerciseDto.title;
    exercise.time = updateExerciseDto.time;
    exercise.content = updateExerciseDto.content;
    exercise.beginner = updateExerciseDto.beginner;
    exercise.medium = updateExerciseDto.medium;
    exercise.expert = updateExerciseDto.expert;
    exercise.rest_time = updateExerciseDto.rest_time;
    exercise.material = updateExerciseDto.material;
    exercise.video = updateExerciseDto.video;
    exercise.image = updateExerciseDto.image;

    await exercise.save();


    return await Exercise.findOneBy({ id: exercise.id });
  };


  // suppression exercice
  async remove(id: number): Promise<Exercise> {

    const exercise = await Exercise.findOneBy({ id });

    if (exercise) {
      return await exercise.remove();
    };

    throw new HttpException('training not found', HttpStatus.NOT_FOUND);
  };

};

