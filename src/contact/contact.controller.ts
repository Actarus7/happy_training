import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';


@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    const newContact = await this.contactService.create(createContactDto);
    if (!newContact) {
    throw new NotFoundException(`contact non créé`);
    }
   await this.contactService.create(createContactDto);
   return {
     statusCode: 201,
     message: 'contact envoyé',
     data: newContact
   }
  }

  @Get()
  async findAll() {
    return await this.contactService.findAll();
  }

  @Get(':email')
  async findOneByEmail(@Param('email') email: string) {
     //vérifie que l'email existe
     const isEmailExist = await this.contactService.findOneByEmail(email);
     if (!isEmailExist) {
     throw new NotFoundException(`l'email n'existe pas`);
     }
    await this.contactService.findOneByEmail(email);
    return {
      statusCode: 200,
      message: 'affichage du contact par email',
      data: isEmailExist
    }
  }

  @Get('name/:name')
  async findOneByName(@Param('name') firstName: string, lastName: string) {
   //vérifie que le nom existe
   const isContactExist = await this.contactService.findOneByName(firstName, lastName);
   if (!isContactExist) {
   throw new NotFoundException(`le contact n'existe pas`);
   }
    await this.contactService.findOneByName(firstName,lastName);
    return {
      statusCode: 200,
      message: 'affichage du contact par nom',
      data: isContactExist
    }
  }

  // modification d'un contact
  @Patch(':id')
  async update(@Param('id') id:number, @Body() updateContactDto: UpdateContactDto) {
    const isContactExist =  this.contactService.update(+id, updateContactDto);
   
    if (!isContactExist) {
      throw new NotFoundException(`le contact n'existe pas`);
      }
        
       return {
         statusCode: 200,
         message: 'affichage du contact modifié',
         data: isContactExist
       }
  }
 

  @Delete(':id')
  async remove(@Param('id') id: string,  @Body() updateContactDto: UpdateContactDto) {
    const isContactExist =  await this.contactService.remove(+id);
   
    if (!isContactExist) {
      throw new NotFoundException(`le contact n'existe pas`);
      }
        
       return {
         statusCode: 200,
         message: 'affichage du contact supprimé ',
         data: isContactExist
       }
  }
}
