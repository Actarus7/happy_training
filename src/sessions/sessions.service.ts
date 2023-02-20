import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  save: any;

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const session = new Session();

    session.description = createSessionDto.description;
    session.time = createSessionDto.time;

    await session.save();

    return session;
    //'This action adds a new session';
  };
 

  async findAll(){
    return await Session.find()
    //`This action returns all sessions`;
  }

  async findById(id: number) {
    return await Session.findOneBy({id});
    //`This action returns a #${id} session`;
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    await Session.update(id, updateSessionDto);
    return Session.findOneBy({id})
    //`This action updates a #${id} session`;
  }

  async delete(id: number){
   const session = await Session.findOneBy({id});
   {
     
      if (session)
      {
        return await session.remove();
      }
  
      throw new HttpException('training not found', HttpStatus.NOT_FOUND);
    };
    //`This action removes a #${id} session`;
  }
}
