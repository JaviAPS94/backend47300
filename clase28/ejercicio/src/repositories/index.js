import { Contacts } from '../dao/factory.js';
import ContactsRepository from './contacts.repository.js';

const contactsRepository = new ContactsRepository(new Contacts());

export {
    contactsRepository
}