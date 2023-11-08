import { Router } from 'express';
import { contactsRepository } from '../repositories/index.js';

const router = Router();

router.get('/', async (req, res) => {
    // const data = await contactsDao.get();
    const data = await contactsRepository.getContacts();
    res.json(data);
});

router.post('/', async (req, res) => {
    const { name, lastname, phone } = req.body;
    // const contact = new ContactsDto({ name, lastname, phone });
    // const data = await contactsDao.create(contact);
    const data = await contactsRepository.createContact({ name, lastname, phone });
    res.json(data);
});

router.put('/:id', async (req, res) => {
    const { name, lastname, phone } = req.body;
    // const data = await contactsDao.modify(req.params.id, { name, phone });
    const data = await contactsRepository.updateContact(req.params.id, { name, lastname, phone });
    res.json(data);
});

router.delete('/:id', async (req, res) => {
    // const data = await contactsDao.delete(req.params.id);
    const data = await contactsRepository.delete(req.params.id);
    res.json(data);
});

export default router;

//Capa de repositorios esta mas centrada en manejar entidades o modelos del Dominio
// {
//     nombre: ''
//     descripcion: '',
//     price: asdf
// }
// //Capa de daos pues centra en manejar las entidades de manera directa ccon la fuente de información

// {
//     _id: 'asdasd',
//     nombre: 'asdasd',
//     descripcion: '',
//     price: asdf
//     v: 0
// }