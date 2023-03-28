import { Entity } from "typeorm";


export class CreateContactDto {

    id: number;

    firstName: string;
  
    lastName: string;
  
    email: string;
  
    message: string;
}
