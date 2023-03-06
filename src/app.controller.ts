import { Controller, Post, Get, Body, ParseFilePipeBuilder, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AppService } from './app.service';
import { CreateImageDto } from './images/dto/create-image.dto';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';




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





