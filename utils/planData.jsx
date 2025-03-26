import { duration } from "moment";

export default[
    {
        link:'https://buy.stripe.com/test_14kbMdaAH6OWe8ocMN',
        price:7.99,
        price_id:'price_1R5KRcRGQqj5vbipIRFOBOOw',
        duration:'Month',
        name: 'Standard',
        features: ['20 Interview', 
            'No Discount in courses', 
            'Limited Carrer Counseling', 
            '12-hour support response time'],
        featured: false,
        
    },

    {
        link:'https://buy.stripe.com/test_3cs7vX9wD2yG3tK9AA',
        price:50.00,
        price_id:'price_1R5K9ORGQqj5vbipMBjTQ9G5',
        duration:'Yearly',
        name: 'Premium',
        features: [
            'Unlimited interview',
            '20% Discount in Courses',
            'Unlimited Carreer Counseling',
            '24-hour support response time',
            'Marketing automations',
            'Custom integrations',
          ],
          featured: true,
    },
]