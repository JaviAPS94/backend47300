import { Router } from 'express';
import PaymentsService from '../services/payments.service.js';

const router = Router();

const products = [
    { id: 1, name: "papas", price: 1000 },
    { id: 2, name: "queso", price: 500 },
    { id: 3, name: "hamburguesa", price: 1500 },
    { id: 4, name: "soda", price: 1000 },
    { id: 5, name: "golosinas", price: 800 }
];

router.post('/payment-intents', async (req, res) => {
    const productToBuy = products.find(product => product.id === +req.query.id);

    if(!productToBuy) return res.status(404).send({ status: 'error', error: 'product not found' });

    // 100.50
    // 10050
    const paymentIntentInfo = {
        amount: productToBuy.price, // el amount solo recibe valores enteros
        currency: 'usd',
        metadata: {
            userId: 'Id del usuario generado por mongo',
            orderDetails: JSON.stringify({
                [productToBuy.name]: 2
            }, null, '\t'),
            address: JSON.stringify({
                street: 'Calle de prueba',
                postalCode: '1234',
                externalNumber: '4565'
            }, null, '\t')
        }
    };

    const paymentsService = new PaymentsService();
    const result = await paymentsService.createPaymentIntent(paymentIntentInfo);
    console.log(result);
    res.send({ status: 'success', payload: result})
});

export default router;