import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Roadmap', path: '/roadmap' },
        { name: 'Practice', path: '/practice' },
        { name: 'Mock Interview', path: '/mock-interview' },
        { name: 'Dashboard', path: '/dashboard' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 w-full z-50 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-transparent backdrop-blur-xl border-b border-slate-700/30"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center"
                    >
                        <span className="text-white font-bold text-lg">⚡</span>
                    </motion.div>
                    <span className="text-xl font-bold text-white">DSA AI Mentor</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link key={item.path} to={item.path}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                    isActive(item.path)
                                        ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white'
                                        : 'text-gray-300 hover:text-white hover:bg-slate-700/30'
                                }`}
                            >
                                {item.name}
                            </motion.button>
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-violet-500/50 transition-all"
                    >
                        Start Free
                    </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-300"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Navigation */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden border-t border-slate-700/30 bg-slate-900/95 backdrop-blur-xl"
                >
                    <div className="flex flex-col gap-2 p-4">
                        {navItems.map((item) => (
                            <Link key={item.path} to={item.path}>
                                <button
                                    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${
                                        isActive(item.path)
                                            ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white'
                                            : 'text-gray-300 hover:text-white hover:bg-slate-700/30'
                                    }`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.name}
                                </button>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
