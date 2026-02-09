/**
 * Navbar Component
 * 
 * Main navigation bar with branding and links.
 * Free version - no sign in required.
 */

import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Navbar = () => {
    const location = useLocation();

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-graphite-900/80 border-b border-graphite-800/50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bronze-400 to-bronze-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">&lt;/&gt;</span>
                        </div>
                        <span className="font-semibold text-lg">CodeSnippet</span>
                    </Link>

                    {/* Center Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            to="/"
                            className={`text-sm transition-colors ${location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/editor"
                            className={`text-sm transition-colors ${location.pathname === '/editor' ? 'text-white' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Create Video
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/editor"
                            className="px-4 py-2 bg-gradient-to-r from-bronze-500 to-bronze-600 text-white rounded-lg text-sm font-medium hover:from-bronze-600 hover:to-bronze-700 transition-all shadow-lg shadow-bronze-500/25"
                        >
                            Create Free Video
                        </Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};
