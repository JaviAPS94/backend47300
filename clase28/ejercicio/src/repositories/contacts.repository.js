import ContactsDto from "../DTOs/contacts.dto.js";

export default class ContactsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getContacts = async () => {
        const result = await this.dao.get();
        return result;
    }

    createContact = async (contact) => {
        const contactToInsert = new ContactsDto(contact);
        const result = await this.dao.create(contactToInsert);
        return result;
    }

    updateContact = async (id, contact) => {
        const contactToUpdate = new ContactsDto(contact);
        const result = await this.dao.modify(id, contactToUpdate);
        return result;
    }

    deleteContact = async (id) => {
        const result = await this.dao.delete(id);
        return result;
    }
}