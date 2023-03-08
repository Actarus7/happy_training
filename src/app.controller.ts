import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';




@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  
  
  
   /*  handleUpload(
      @Body() body: CreateImageDto,
      @UploadedFile() file: Express.Multer.File,
    )  {
      console.log('upload');
      
      return {
        body,
        file: file.buffer.toString(),
      };
    } */
   

  

  

}





