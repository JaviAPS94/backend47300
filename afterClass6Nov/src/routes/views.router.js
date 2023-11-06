import { Router } from 'express';

const router = Router();

router.get('/products', getProductsPaginated);

export default router;