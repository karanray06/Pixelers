import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Homepage() {
    const stats = [
        { label: 'Problems Solved', value: '50K+', icon: '📊' },
        { label: 'Success Rate', value: '94%', icon: '✅' },
        { label: 'Active Users', value: '25K+', icon: '👥' },
        { label: 'Interview Ready', value: '87%', icon: '🎯' }
    ];

    const features = [
        {
            icon: '🤖',
            title: 'AI DSA Mentor',
            desc: 'Personal AI assistant that guides you through problems with hints, not full solutions'
        },
        {
            icon: '🗺️',
            title: 'Personalized Roadmap',
            desc: 'Adaptive learning path based on your strengths and weak areas'
        },
        {
            icon: '💡',
            title: 'Smart Recommendations',
            desc: 'Get problems tailored to your learning level and interview prep'
        },
        {
            icon: '📈',
            title: 'Code Analysis',
            desc: 'Real-time feedback on complexity, optimization, and best practices'
        },
        {
            icon: '🎤',
            title: 'Mock Interviews',
            desc: 'Practice under pressure with realistic interview scenarios'
        },
        {
            icon: '📊',
            title: 'Progress Tracking',
            desc: 'Detailed analytics to monitor your DSA mastery journey'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="pt-20 pb-16">
            {/* Hero Section */}
            <section className="px-6 py-20 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                            <span className="gradient-text">Master DSA</span>
                            <br />
                            with Your AI Mentor
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Learn, practice, analyze, and crack FAANG interviews faster with personalized AI guidance. No more confusion—just clear path to mastery.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/practice">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-violet-500/50 transition-all"
                                >
                                    Start Learning Free →
                                </motion.button>
                            </Link>
                            <Link to="/roadmap">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 border-2 border-slate-600 text-white font-bold rounded-xl hover:bg-slate-700/30 transition-all"
                                >
                                    View Roadmap
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right side animation */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-96 hidden md:block"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-violet-600/20 rounded-3xl blur-3xl"></div>
                        <div className="relative h-full rounded-3xl bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 flex items-center justify-center overflow-hidden">
                            <div className="text-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 20 }}
                                    className="text-8xl mb-4"
                                >
                                    🧠
                                </motion.div>
                                <p className="text-gray-400 font-semibold">AI-Powered Learning</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="px-6 py-16 max-w-7xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="glass-panel p-6 text-center"
                        >
                            <div className="text-4xl mb-3">{stat.icon}</div>
                            <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-20 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold mb-4">
                        Everything you need to <span className="gradient-text">crack interviews</span>
                    </h2>
                    <p className="text-xl text-gray-400">Comprehensive tools designed for serious coders</p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="glass-panel p-8 hover:border-blue-500/30 transition-all"
                        >
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-20 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-violet-600/30 blur-3xl rounded-3xl"></div>
                    <div className="relative glass-panel p-12 text-center border-blue-500/30">
                        <h2 className="text-4xl font-bold mb-4">Ready to Master DSA?</h2>
                        <p className="text-xl text-gray-300 mb-8">Join thousands of students preparing for their dream roles at FAANG companies.</p>
                        <Link to="/practice">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-violet-500/50"
                            >
                                Start Learning Now - It's Free
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 border-t border-slate-700/30 text-center text-gray-400 mt-20">
                <p>Built for serious coders • No ads • Always free</p>
                <div className="mt-4 flex justify-center gap-6">
                    <a href="#" className="hover:text-white transition">GitHub</a>
                    <a href="#" className="hover:text-white transition">Twitter</a>
                    <a href="#" className="hover:text-white transition">Discord</a>
                </div>
            </footer>
        </div>
    );
}
