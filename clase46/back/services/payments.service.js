import Stripe from 'stripe'

export default class PaymentsService {
    constructor() {
        this.stripe = new Stripe('sk_test_51Oa49mI4WqoriJAqME2g5C9Ax1RzHZqv8lOtyPOPEe62teqW2LfTkJGkpdmtVjRNPe7KKJWfFMgyUPAaX6LPCYk100guLr2xyT');
    }

    createPaymentIntent = async (data) => {
        const paymentIntent = this.stripe.paymentIntents.create(data);
        return paymentIntent;
    }
}