import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteTrainingsService } from './favorite-trainings.service';
import { CreateFavoriteTrainingDto } from './dto/create-favorite-training.dto';
import { UpdateFavoriteTrainingDto } from './dto/update-favorite-training.dto';

@Controller('favorite-trainings')
export class FavoriteTrainingsController {
  constructor(private readonly favoriteTrainingsService: FavoriteTrainingsService) { }

  @Post()
  create(@Body() createFavoriteTrainingDto: CreateFavoriteTrainingDto) {
    
    return this.favoriteTrainingsService.create(createFavoriteTrainingDto);
  };

  @Get()
  findAll() {
    return this.favoriteTrainingsService.findAll();
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteTrainingsService.findOne(+id);
  };

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteTrainingDto: UpdateFavoriteTrainingDto) {
    return this.favoriteTrainingsService.update(+id, updateFavoriteTrainingDto);
  };

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteTrainingsService.remove(+id);
  };
};
