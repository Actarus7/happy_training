import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express/multer';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()


/* export class ParseIntPipe implements PipeTransform<string, number> {

  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
} */




export class ImagesService {

  // création d'une image à partir des informations de l'image, les données binaires de l'image et l'identifiant de l'utilisateur .
  async create(user: User, file: Express.Multer.File): Promise<Image> {
    console.log('test3', file);

    const newImage = new Image();

    newImage.fileName = file.filename;
    newImage.originalName = file.originalname;
    newImage.mimeType = file.mimetype;
    
    //newImage.user = user;

    const img = await newImage.save();

    user.image = img;
    await user.save();


    console.log('test4', newImage);

    return img;

  }



  // récupération de toutes les images 
  async findAll(): Promise<Image[]> {
    return await Image.find();
  }

  // récupération de l'image en les filtrant "where" par id en ajoutant la relation avec l'utilisateur, l'image et pseudo user associé avec la méthode "select"
  async findOneById(id: number): Promise<Image> {
    return await Image.createQueryBuilder('image') // return await Image.findOne(id, { relations: ['user'] });
      .leftJoinAndSelect('image.user', 'user')
      .where('image.id =id', { id })
      .select(['image', 'user.id', 'user.pseudo'])
      .getOne();
  };


  //modification image, ajout de la validation pour vérifier si l'image existe avant de la mettre à jour. Maj des propriétées 'orignalName', 'fileName' et 'mimetype'
  async update(id: number, updateImageDto: UpdateImageDto): Promise<Image> {
    const image = await Image.findOneBy({ id });
    const user = await User.findOneBy({ id });

    image.originalName = updateImageDto.originalName || image.fileName;
    image.fileName = updateImageDto.fileName || image.fileName;
    image.mimeType = updateImageDto.mimeType || image.mimeType;
    image.save()

    if (!user) {
      throw new Error('User with id ${userId} not found.')
    }

    if (image.id !== user.id) {
      throw new Error(`User with id ${user.id} is not authorized to update image with id ${image.id}.`);
    }
    if (!image) {
      throw new BadRequestException('image non trouvée');
    }

    const updateImage = await Image.save({ ...image });
    console.log('test', updateImage);
    return updateImage;


  }

  //suppression  image: ajout validation pour vérifier si l'image existe avant de la supprimer.
  async remove(id: number): Promise<Image> {
    const image = await Image.findOneBy({ id });
    if (!image) {
      throw new BadRequestException('image non trouvée')
    }
    await image.remove();
    return image;

  }
}



export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: './upload',
    };
  };
};

export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    };
    return val;
  };
};

