import { Router } from 'express';

const router = Router();

router.get('/realtime-products', async (req, res) => {
    res.render('realTimeProducts');
});

export default router;