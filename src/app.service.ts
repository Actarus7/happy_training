import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express/multer/interfaces/files-upload-module.interface';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  };
};


