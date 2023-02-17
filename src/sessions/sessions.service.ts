import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  save: any;

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const session = new Session()
    session.id = createSessionDto.id;
    session.description = createSessionDto.description
    await session.save()
    return session
    //'This action adds a new session';
  }
 

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

  async remove(id: number){
    await Session.delete(id);
    
    //`This action removes a #${id} session`;
  }
}
