/**
 * Pricing Page
 * 
 * SaaS pricing plans with feature comparison.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const PricingPage = () => {
    return (
        <main className="pt-32 pb-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-bold mb-4">
                        Simple, Transparent <span className="text-gradient-bronze">Pricing</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                        Start free, upgrade when you need more. No hidden fees.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-8 rounded-2xl border ${plan.popular
                                    ? 'bg-gradient-to-b from-bronze-500/10 to-graphite-800 border-bronze-500/30 shadow-xl shadow-bronze-500/10'
                                    : 'bg-graphite-800/50 border-graphite-700/50'
                                }`}
                        >
                            {plan.popular && (
                                <div className="text-center mb-4">
                                    <span className="px-3 py-1 bg-bronze-500 text-white text-xs font-semibold rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <p className="text-gray-400 mb-6">{plan.description}</p>

                            <div className="mb-8">
                                <span className="text-5xl font-bold">${plan.price}</span>
                                {plan.price > 0 && <span className="text-gray-400">/month</span>}
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-gray-300">
                                        <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/editor"
                                className={`block text-center py-3 rounded-xl font-semibold transition-all ${plan.popular
                                        ? 'bg-gradient-to-r from-bronze-500 to-bronze-600 text-white hover:from-bronze-600 hover:to-bronze-700 shadow-lg shadow-bronze-500/25'
                                        : 'bg-graphite-700 text-white hover:bg-graphite-600'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">
                        {faqs.map((faq) => (
                            <div
                                key={faq.question}
                                className="p-6 bg-graphite-800/50 rounded-xl border border-graphite-700/50"
                            >
                                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                                <p className="text-gray-400">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

const plans = [
    {
        name: 'Free',
        description: 'Perfect for trying out CodeSnippet',
        price: 0,
        popular: false,
        cta: 'Start Free',
        features: [
            '1 video per day',
            'Watermark included',
            'Basic themes',
            '720p resolution',
            'MP4 export',
        ],
    },
    {
        name: 'Pro',
        description: 'For content creators who want more',
        price: 9,
        popular: true,
        cta: 'Upgrade to Pro',
        features: [
            '10 videos per day',
            'No watermark',
            'All premium themes',
            '1080p resolution',
            'MP4 & WebM export',
            'Priority rendering',
        ],
    },
    {
        name: 'Agency',
        description: 'For teams and businesses',
        price: 29,
        popular: false,
        cta: 'Contact Sales',
        features: [
            'Unlimited videos',
            'No watermark',
            'Custom branding',
            'All premium themes',
            'API access',
            'Priority support',
        ],
    },
];

const faqs = [
    {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.',
    },
    {
        question: 'What video formats are supported?',
        answer: 'We support MP4 and WebM formats. All videos are exported in vertical 9:16 aspect ratio (1080x1920) optimized for social media.',
    },
    {
        question: 'Can I use the videos commercially?',
        answer: 'Yes! All videos you create with CodeSnippet are yours to use however you like, including for commercial purposes.',
    },
    {
        question: 'Do you offer refunds?',
        answer: 'We offer a 7-day money-back guarantee for all paid plans. If you\'re not satisfied, contact us for a full refund.',
    },
];
