import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';



// création d'un contact utilisateur

@Injectable()
export class ContactService {
  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const newContact = new Contact();

    newContact.id = createContactDto.id;
    newContact.firstName = createContactDto.firstName;
    newContact.lastName = createContactDto.lastName;
    newContact.email = createContactDto.email;
    newContact.message = createContactDto.message;

    await newContact.save()

    return newContact;
  }

  // récupération tous les contacts

  async findAll() {
    const contacts = await Contact.find();
    if (contacts.length > 0) {
      return contacts;
    }

  }

  /** Récupère un contact par son email */
  async findOneByEmail(email: string) {
    const contact = await Contact.findOne({ where: { email: email } });

    if (contact) {
      return contact;
    };

    return undefined;
  };

  async findOneByName(firstName: string, lastName: string) {
    const contact = await Contact.findOneBy({ firstName, lastName });

    if (contact) {
      return contact;
    }
    return undefined;
  }

  //modification d'un contact
  async update(id: number, updateContactDto: UpdateContactDto) {
    const contactUpdate = await Contact.findOneBy({ id });

    contactUpdate.id = updateContactDto.id;
    contactUpdate.firstName = updateContactDto.firstName;
    contactUpdate.lastName = updateContactDto.lastName;
    contactUpdate.email = updateContactDto.email;
    contactUpdate.message = updateContactDto.message;

    const contact = await contactUpdate.save();

    if (contact) {
      return contact;
    }

  }

  //suppression contact
  async remove(id: number) {
    const deleteContact = await Contact.findOneBy({id});
    await deleteContact.remove();

    if (deleteContact) {
      return deleteContact;
    }
  }
}
