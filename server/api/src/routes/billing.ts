/**
 * Billing Routes
 * 
 * Stripe subscription management.
 */

import { Router } from 'express';
import Stripe from 'stripe';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2023-10-16',
});

// Price IDs (configure in Stripe Dashboard)
const PRICE_IDS = {
    pro: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_placeholder',
    agency: process.env.STRIPE_AGENCY_PRICE_ID || 'price_agency_placeholder',
};

/**
 * POST /api/billing/create-checkout
 * Create Stripe Checkout session
 */
router.post('/create-checkout', async (req, res, next) => {
    try {
        const { priceId, userId } = req.body;

        if (!priceId || !['pro', 'agency'].includes(priceId)) {
            return res.status(400).json({ error: 'Invalid price ID' });
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: PRICE_IDS[priceId as keyof typeof PRICE_IDS],
                    quantity: 1,
                },
            ],
            success_url: `${process.env.FRONTEND_URL}/editor?success=true`,
            cancel_url: `${process.env.FRONTEND_URL}/pricing?canceled=true`,
            metadata: {
                userId,
            },
        });

        res.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/billing/create-portal
 * Create Stripe Customer Portal session
 */
router.post('/create-portal', async (req, res, next) => {
    try {
        const { customerId } = req.body;

        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.FRONTEND_URL}/editor`,
        });

        res.json({ url: session.url });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/billing/webhook
 * Stripe webhook handler
 */
router.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !endpointSecret) {
        return res.status(400).json({ error: 'Missing signature' });
    }

    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            endpointSecret
        );

        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                console.log('Subscription created:', session.metadata?.userId);
                // Update user plan in database
                break;

            case 'customer.subscription.deleted':
                const subscription = event.data.object;
                console.log('Subscription canceled:', subscription.id);
                // Downgrade user to free plan
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
    } catch (err) {
        console.error('Webhook error:', err);
        res.status(400).json({ error: 'Webhook error' });
    }
});

/**
 * GET /api/billing/plans
 * Get available plans
 */
router.get('/plans', (req, res) => {
    res.json({
        plans: [
            {
                id: 'free',
                name: 'Free',
                price: 0,
                features: ['1 video/day', 'Watermark', '720p'],
            },
            {
                id: 'pro',
                name: 'Pro',
                price: 9,
                features: ['10 videos/day', 'No watermark', '1080p', 'Priority render'],
            },
            {
                id: 'agency',
                name: 'Agency',
                price: 29,
                features: ['Unlimited videos', 'Custom branding', 'API access'],
            },
        ],
    });
});

export { router as billingRoutes };
