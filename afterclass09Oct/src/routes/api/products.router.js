import { Router } from 'express';
import ProductManager from '../../manager/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

//Servicio para agregar un producto
router.post('/', async (req, res) => {
    await productManager.guardar(req.body);

    //Emitir evento a show-products
    const io = req.app.get('socketio');

    io.emit('show-products', await productManager.listarAll());

    res.send({ status: 'success' });
});

router.delete('/:pid', async (req, res) => {
    await productManager.borrar(req.params.pid);

    //Emitir evento a show-products
    const io = req.app.get('socketio');

    io.emit('show-products', await productManager.listarAll());

    res.send({ status: 'success' });
});

export default router;