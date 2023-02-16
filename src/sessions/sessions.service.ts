import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  save: any;

  constructor(private readonly sessionsService: SessionsService) { }
  
  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    return await this.sessionsService.save(createSessionDto)
    //'This action adds a new session';
  }
 

  async findAll(){
    return await this.sessionsService.findAll()
    //`This action returns all sessions`;
  }

  async findById(id: number) {
    return await this.sessionsService.findById(id);
    //`This action returns a #${id} session`;
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    await this.sessionsService.update(id, updateSessionDto);
    return this.sessionsService.findById(id)
    //`This action updates a #${id} session`;
  }

  async remove(id: number) {
    return await this.sessionsService.remove(id);
    //`This action removes a #${id} session`;
  }
}
