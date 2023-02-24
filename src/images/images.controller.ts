import { Controller, Get, Post, Body, Patch, Param, Delete, Request,Response } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { UsersService } from 'src/users/users.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { Inject, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { User } from 'src/users/entities/user.entity';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('images')
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createImageDto: CreateImageDto, @Request() req) {

    // Récupération du User connecté
    const userLogged = await this.usersService.findOneById(req.user.id);


    const newImage = await this.imagesService.create(userLogged, createImageDto);


    return newImage;

  }
  
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Body() body: CreateImageDto,
    @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    
    return {
      body,
      file: file.buffer.toString(),
    };
    
  }

  @UseGuards(JwtAuthGuard)
  @Get('images/:files')
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.imagesService.findAll();
  
  }

  @UseGuards(JwtAuthGuard)
  @Get('images:id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.imagesService.findOneById(+id);
  }


  @UseGuards(JwtAuthGuard)
  @Patch('images:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id') imageId: string, @Request() req) {

    // Vérifie que l'Image existe
    const updateImage = await this.imagesService.findOneById(+imageId);

    if (!updateImage) {
      throw new NotFoundException("Image Id inconnu");
    };

    // Vérifie le User connecté est propriétaire de la photo
    const userLogged = await this.usersService.findOneById(req.user.id);

    if (userLogged.id !== updateImage.user.id) {
      throw new ForbiddenException("Cette photo ne vous appartient pas!")
    };


    return this.imagesService.update(updateImage);
  }


  @UseGuards(JwtAuthGuard)
  @Delete('images:id')
  @UseInterceptors(ClassSerializerInterceptor)
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
