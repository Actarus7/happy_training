import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Response, ParseFilePipe } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { UsersService } from 'src/users/users.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { User } from 'src/users/entities/user.entity';
import { ParseFilePipeBuilder, ParseIntPipe } from '@nestjs/common/pipes';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import multer, { diskStorage } from 'multer';
import { extname } from 'path';
import { DataSource } from 'typeorm';
import { FileSizeValidationPipe } from './fileSizeValidator';


@Controller('images')
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly usersService: UsersService) { }


  //////////////////////////////////////////////////////
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    // stockage de l'image dans le dossier upload
    storage: diskStorage({
      destination: './upload',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
  }))
  async uploadFile(@UploadedFile(
    //   new ParseFilePipe({
    //   validators: [
    //     new FileSizeValidationPipe({ maxSize: 1000 }) // validation bug
    //   ]
    // })
  ) file: Express.Multer.File, @Request() req) {

    // console.log('test1')
    // stockage des infos de l'image en bdd
    const user = await this.usersService.findOneById(req.user.id);
    // console.log('test2', user);

    const newImage = await this.imagesService.create(user, file);

    return newImage;
  }




  // l'utilisateur doit être authentifié pour
  //recupérer toutes les images enregistrées dans la base de données et les renvoie.
  @UseGuards(JwtAuthGuard)
  @Get('upload')
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    const images = await this.imagesService.findAll();
    return images.map(image => image.save());

  };



  @UseInterceptors(FileInterceptor('file'))
  @Post('file/pass-validation')
  uploadFileAndPassValidation(
    @Body() body: CreateImageDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'json',
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    return {
      body,
      file: file?.buffer.toString(),
    };
  };

  @UseInterceptors(FileInterceptor('file'))
  @Post('file/fail-validation')
  uploadFileAndFailValidation(
    @Body() body: CreateImageDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpg',
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  };

};






















































// INUTILE
/* constructor(
  private readonly imagesService: ImagesService,
  private readonly usersService: UsersService) { }

@UseGuards(JwtAuthGuard)
@Post('upload')
@UseInterceptors(ClassSerializerInterceptor, (FileInterceptor('image')))
async create(@Body() createImageDto: CreateImageDto, @Request() req) {

  // Récupération du User connecté et crée une nouvelle image
  const userLogged = await this.usersService.findOneById(req.user.id);

  const newImage = await this.imagesService.create(userLogged, createImageDto);

console.log('test', newImage);

  return newImage;

}


// l'image sera interceptée et stockée en mémoire avant d'être traitée. 
//La méthode renvoie un objet contenant les informations envoyées dans le corps de la requête ainsi que les données de l'image téléchargée.

@Post('upload-image')
@UseInterceptors(FileInterceptor('file'))
async uploadImage(
  @Request() req,
  @Body() body: CreateImageDto,
  @UploadedFile() file: Express.Multer.File,

){ 
 //récupération informations User, création d'une nouvelle image
  //et vérification données du body et type de fichier.
  const user = await this.usersService.findOneById(req.user.id);
  const image= await this.imagesService.create(user, body);
  if(!body.fileName || typeof body.fileName!=='string')
  return {
    body,
    file: file.buffer.toString(),
}
  console.log(image);
  
  }; 


// l'utilisateur doit être authentifié pour
//recupérer toutes les images enregistrées dans la base de données et les renvoie.
@UseGuards(JwtAuthGuard)
@Get('upload')
@UseInterceptors(ClassSerializerInterceptor)
async findAll() {
  const images = await this.imagesService.findAll();
  return images.map(image => image.save());

}

// l'utilisateur doit être authentifié
//pour récupérer une image par son id
//Ajout de l'instruction ParseUUIDPipe pour valider l'ID de l'image.

@UseGuards(JwtAuthGuard)
@Get('images:id')
@UseInterceptors(ClassSerializerInterceptor)
async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
  const image = await this.imagesService.findOneById(+id);
  if (!image) {
    throw new NotFoundException(`image avec cet  "${id}" non trouvée`);
  }
  return this.imagesService.findOneById(+id);
}


@UseGuards(JwtAuthGuard)
@Patch('images:id')
@UseInterceptors(ClassSerializerInterceptor)
async update(
  
  @Param('id', new ParseUUIDPipe())
  @Body() imageId: string, updateImageDto: UpdateImageDto,
  @Request() req,

) {

  // Vérifie que l'Image existe
  const updateImage = await this.imagesService.update(+imageId, updateImageDto);
    
  if (!updateImage) {
    throw new NotFoundException("Image Id inconnu");
  };



  // Vérifie le User connecté est propriétaire de la photo
  const userLogged = await this.usersService.findOneById(req.user.id);

  if (userLogged.id !== updateImage.user.id) {
    throw new ForbiddenException("Cette photo ne vous appartient pas!");
  };


   return await this.imagesService.update(+imageId, updateImage);
  
  
}

// suppression de l'image existante en fonction de son id
// et renvoie l'image supprimée
// l'User doit être authentifié

@UseGuards(JwtAuthGuard)
@Delete('images:id')
@UseInterceptors(ClassSerializerInterceptor)
async remove(@Param('id', new ParseUUIDPipe()) id: string, @Request() req) {
  const image = await this.imagesService.findOneById(+id);

  if (!image) {
    throw new NotFoundException('image avec cet "${id} non trouvé');
  };

  if (image.user.id! == req.user.id) {
    throw new ForbiddenException(`User avec id "${req.user.id} n'est pas autorisé à supprimer cette image avec  "${id}"`
    );
  };
  await this.imagesService.remove(+id)
  return {success: true};
} */
