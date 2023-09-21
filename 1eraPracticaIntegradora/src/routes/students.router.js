import { Router } from 'express';
import Students from '../dao/dbManagers/students.manager.js';

const router = Router();
const studentsManager = new Students();

//Obtener los estudiantes
router.get('/', async(req, res) => {
    try {
        const students = await studentsManager.getAll();
        res.send({ status: 'success', payload: students });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
});

//Guardar el estudiante
router.post('/', async(req, res) => {
    const { first_name, last_name, dni, email, birth_date, gender } = req.body;

    if(!first_name || !last_name || !dni || !email || !birth_date || !gender) {
        return res.status(400).send({ status: 'error', error: 'incomplete values' });
    }

    try {
        const result = await studentsManager.save({
            first_name,
            last_name,
            dni,
            email,
            birth_date,
            gender
        });

        res.status(201).send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
});

export default router;