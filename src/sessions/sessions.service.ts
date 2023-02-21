import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {


  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const session = new Session();

    session.description = createSessionDto.description;
    session.time = createSessionDto.time;

    await session.save();

    return session;
    //'This action adds a new session';
  };


  async findAll() {
    return await Session.find();
  };


  async findById(id: number) {
    return await Session.findOneBy({ id });
  };


  async update(session: Session, updateSessionDto: UpdateSessionDto) {

    session.time = updateSessionDto.time;
    session.description = updateSessionDto.description;

    await session.save();

    return await Session.findOneBy({ id: session.id });
  };


  async delete(id: number) {
    const session = await Session.findOneBy({ id });


    if (session) {
      await session.remove();
      return session;
    };

    throw new HttpException('session not found', HttpStatus.NOT_FOUND);
  };
}
