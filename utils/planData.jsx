import { duration } from "moment";

export default[
    {
        link:'https://buy.stripe.com/test_14kbMdaAH6OWe8ocMN',
        price:7.99,
        price_id:'price_1R5KRcRGQqj5vbipIRFOBOOw',
        duration:'Month',
        name: 'Standard',
        features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
        featured: false,
        
    },

    {
        link:'https://buy.stripe.com/test_3cs7vX9wD2yG3tK9AA',
        price:50.00,
        price_id:'price_1R5K9ORGQqj5vbipMBjTQ9G5',
        duration:'Yearly',
        name: 'Premium',
        features: [
            'Unlimited products',
            'Unlimited subscribers',
            'Advanced analytics',
            'Dedicated support representative',
            'Marketing automations',
            'Custom integrations',
          ],
          featured: true,
    },
]