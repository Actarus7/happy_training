import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
  
export class ImagesService {

  // création d'une image
  async create(user: User, createImageDto: CreateImageDto): Promise<Image> {
    const newImage = new Image();

    newImage.fileName = user.pseudo;

    await newImage.save()

    return newImage;

  }

  // récupération de toutes les images 
  async findAll(){
    return await Image.find();
  }

  // récupération de l'image par id
  async findOneById(id: number) {
    return await Image.findOneBy({ id });
  }

  async findByName(fileName: string): Promise<string[]> {
     await (Image.findOneBy( {fileName} ));
     return
  }

  //modification image
  async update(image: Image,): Promise<Image> {

    image.save()
    return image;

  }

  async remove(id: number): Promise<Image > {
    await Image.findBy({ id });
     return
  }
}

