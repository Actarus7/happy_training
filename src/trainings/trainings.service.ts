import { Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './entities/training.entity';

@Injectable()
export class TrainingsService {

  constructor(private readonly trainingsService: TrainingsService) { }
  
 async create(createTrainingDto: CreateTrainingDto): Promise<Training> {
  return await this.trainingsService.create(createTrainingDto);
   //'This action adds a  training';
  }

  async findAll() : Promise <Training> {
    return await this.trainingsService.findAll();
    //`This action returns all trainings`;
  }
  async findById(id: number): Promise<Training> {
    return await this.trainingsService.findById(id);
  }

   async update(id: number, training: Training):Promise<Training> {
     await this.trainingsService.update(id, training)
     return this.trainingsService.findById(id)
    //`This action updates a #${id} training`;
  }

  async remove(id: number): Promise<void> {
    return await this.trainingsService.remove(id)
    //`This action removes a #${id} training`;
  }
}
