/* import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { FavoriteTrainingsService } from './favorite-trainings.service';
import { CreateFavoriteTrainingDto } from './dto/create-favorite-training.dto';
import { UpdateFavoriteTrainingDto } from './dto/update-favorite-training.dto';
import { TrainingsService } from 'src/trainings/trainings.service';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('favorite-trainings')
export class FavoriteTrainingsController {
  constructor(
    private readonly favoriteTrainingsService: FavoriteTrainingsService,
    private readonly trainingsService: TrainingsService,
    private readonly usersService: UsersService) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  async create(@Body() createFavoriteTrainingDto: CreateFavoriteTrainingDto, @Request() req) {

    // Récupère le User connecté 
    const userLogged = await this.usersService.findOneById(req.user.id);
    


    // Récupère le Training à ajouter à partir de l'id donnée dans le body
    const trainingToAdd = await this.trainingsService.findById(createFavoriteTrainingDto.training);



    return await this.favoriteTrainingsService.create(userLogged, trainingToAdd);
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
 */