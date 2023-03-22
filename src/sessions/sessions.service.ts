import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Training } from 'src/trainings/entities/training.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {

  // création d'une nouvelle session
  async create(createSessionDto: CreateSessionDto, training: Training): Promise<Session> {
    const session = new Session();

    session.description = createSessionDto.description;
    session.time = createSessionDto.time;
    session.training = training;

    await session.save();

    return session;
  };

  //récupération de toutes les sessions
  async findAll() {
    return await Session.find();
  };

  //récupération de toutes les sessions d'un training
  async findAllSessionsByTrainingId(id: number) {
    return await Session.find({ where: { training: { id: id } } });
  };

  // récupération de la session par son id
  async findById(id: number) {
    return await Session.findOneBy({ id });
  };

  // modification session
  async update(session: Session, updateSessionDto: UpdateSessionDto) {

    session.time = updateSessionDto.time;
    session.description = updateSessionDto.description;

    await session.save();

    return await Session.findOneBy({ id: session.id });
  };

  // suppression session par son id
  async delete(id: number) {
    const session = await Session.findOneBy({ id });


    if (session) {
      await session.remove();
      return session;
    };

    throw new HttpException('session not found', HttpStatus.NOT_FOUND);
  };
}
