/**
 * Landing Page
 * 
 * Hero section with value proposition and CTA.
 * Free version for all users.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const LandingPage = () => {
    return (
        <main className="pt-16">
            {/* Hero Section */}
            <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-radial from-bronze-500/10 via-transparent to-transparent" />

                <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bronze-500/10 border border-bronze-500/20 mb-8">
                            <span className="text-bronze-400 text-sm font-medium">🎉 100% Free - No Sign Up Required</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Turn Your Code Into
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze-400 to-bronze-600">
                                Viral Videos
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Create stunning animated code videos for TikTok, Reels, and YouTube Shorts.
                            Paste your code, pick a style, and download in seconds.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/editor"
                                className="px-8 py-4 bg-gradient-to-r from-bronze-500 to-bronze-600 text-white rounded-xl font-semibold text-lg hover:from-bronze-600 hover:to-bronze-700 transition-all shadow-xl shadow-bronze-500/25 hover:shadow-bronze-500/40"
                            >
                                Create Your Video - It's Free!
                            </Link>
                        </div>
                    </motion.div>

                    {/* Preview mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-16"
                    >
                        <div className="relative mx-auto max-w-md">
                            {/* Phone frame */}
                            <div className="aspect-[9/16] rounded-[2rem] bg-graphite-800 border-4 border-graphite-700 overflow-hidden shadow-2xl">
                                {/* Code preview */}
                                <div className="h-full flex items-center justify-center p-6">
                                    <div className="w-full bg-graphite-900 rounded-xl p-4 font-mono text-sm">
                                        <div className="flex gap-2 mb-3">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                        </div>
                                        <pre className="text-left text-xs text-gray-300">
                                            <code>{`const greet = (name) => {
  return \`Hello, \${name}!\`;
};

console.log(greet("World"));`}</code>
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            {/* Glow effect */}
                            <div className="absolute -inset-4 bg-bronze-500/20 blur-3xl rounded-full -z-10" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-graphite-800/30">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
                        <p className="text-gray-400 text-lg">Create professional code videos in seconds</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "🎨",
                                title: "Beautiful Themes",
                                description: "Premium themes with syntax highlighting and macOS-style window chrome"
                            },
                            {
                                icon: "✨",
                                title: "Smooth Animations",
                                description: "Typing, entrance, and glow effects to make your code come alive"
                            },
                            {
                                icon: "📱",
                                title: "Social Ready",
                                description: "Perfect 9:16 vertical format for TikTok, Reels, and Shorts"
                            },
                            {
                                icon: "⚡",
                                title: "Lightning Fast",
                                description: "Generate videos in under a minute with our optimized renderer"
                            },
                            {
                                icon: "🆓",
                                title: "Completely Free",
                                description: "No sign up, no watermark, no limits. Just create and download!"
                            },
                            {
                                icon: "💾",
                                title: "MP4 & WebM",
                                description: "Download in the format you need for any platform"
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-graphite-800/50 border border-graphite-700/50 hover:border-bronze-500/30 transition-colors"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Ready to Create Amazing Videos?
                        </h2>
                        <p className="text-xl text-gray-400 mb-10">
                            Start creating beautiful code videos for free. No account needed.
                        </p>
                        <Link
                            to="/editor"
                            className="inline-flex px-10 py-5 bg-gradient-to-r from-bronze-500 to-bronze-600 text-white rounded-2xl font-semibold text-xl hover:from-bronze-600 hover:to-bronze-700 transition-all shadow-xl shadow-bronze-500/25 hover:shadow-bronze-500/40"
                        >
                            Start Creating Now →
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-graphite-800">
                <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
                    <p>© 2026 CodeSnippet. Made with ❤️ for developers.</p>
                </div>
            </footer>
        </main>
    );
};
