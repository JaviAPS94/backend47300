import { Router } from 'express';
import { addProductToCart } from '../controllers/carts.controller.js'

const router = Router();

router.post('/:cid/products/:pid', addProductToCart);

export default router;