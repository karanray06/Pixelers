import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Homepage() {
    const [searchQuery, setSearchQuery] = useState('');

    const tutorials = [
        { title: 'Data Structures', icon: '📚', count: '45 Articles', color: 'bg-orange-50' },
        { title: 'Algorithms', icon: '⚡', count: '60 Articles', color: 'bg-blue-50' },
        { title: 'Data Structures', icon: '🎯', count: '45 Problems', color: 'bg-red-50' },
        { title: 'Algorithms', icon: '🔥', count: '60 Articles', color: 'bg-yellow-50' },
        { title: 'Graph Theory', icon: '🕸️', count: '12 Problems', color: 'bg-purple-50' },
        { title: 'Python Theory', icon: '🐍', count: '40 Problems', color: 'bg-green-50' },
        { title: 'Competitive Programming', icon: '🏆', count: '120 Problems', color: 'bg-indigo-50' },
        { title: 'Machine Learning', icon: '🤖', count: '20 Problems', color: 'bg-pink-50' },
        { title: 'Master Quantitative Aptit...', icon: '📊', count: '13 Problems', color: 'bg-gray-50' }
    ];

    return (
        <div className="pt-32 pb-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-[#e8f5ed] to-white py-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold text-gray-900 mb-10 tracking-tight"
                        style={{ fontFamily: 'Poppins, Inter, sans-serif' }}
                    >
                        Hello, What Do You Want To Learn?
                    </motion.h1>

                    {/* Large Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative max-w-3xl mx-auto mb-8"
                    >
                        <input
                            type="text"
                            placeholder="Search algorithms, problems..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-16 rounded-2xl px-6 text-lg shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2f8d46]/30 focus:border-[#2f8d46] transition-all"
                        />
                    </motion.div>

                    {/* Trending Tags */}
                    <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
                        <span className="text-gray-600 font-medium">Trending:</span>
                        <button className="px-4 py-2 bg-[#2f8d46] text-white rounded-full font-medium hover:bg-[#256f36] transition-colors shadow-sm">
                            Dynamic Programming
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:border-[#2f8d46] hover:text-[#2f8d46] transition-colors">
                            Graph Theory
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:border-[#2f8d46] hover:text-[#2f8d46] transition-colors">
                            System Design
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:border-[#2f8d46] hover:text-[#2f8d46] transition-colors">
                            Master Quantitative Aptitude
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content Container */}
            <div className="max-w-[1400px] mx-auto px-6 mt-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Explorer Tutorials */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explorer Tutorials</h2>
                        <div className="space-y-4">
                            {tutorials.slice(0, 6).map((tutorial, idx) => (
                                <Link key={idx} to="/roadmap">
                                    <div className={`${tutorial.color} border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all cursor-pointer group`}>
                                        <div className="flex items-start gap-4">
                                            <div className="text-3xl flex-shrink-0">{tutorial.icon}</div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 group-hover:text-[#2f8d46] transition-colors truncate">
                                                    {tutorial.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 font-medium mt-1">{tutorial.count}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* New Launch */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">New Launch</h2>
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all mb-12">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-[#e8f5ed] text-[#2f8d46] text-xs font-bold rounded-full mb-4">
                                        Three 90 Challenge
                                    </span>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                        Master Quantitative Aptitude for Interviews
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        Join over 50,000+ students already mastering logical reasoning and top tech giants.
                                    </p>
                                    <button className="px-6 py-3 bg-[#2f8d46] text-white font-semibold rounded-lg hover:bg-[#256f36] transition-all shadow-md">
                                        Explore Course
                                    </button>
                                </div>
                                <div className="flex justify-center">
                                    <div className="w-48 h-48 bg-gradient-to-br from-[#e8f5ed] to-[#2f8d46]/10 rounded-2xl flex items-center justify-center">
                                        <img src="/assets/mascot.png" alt="Course" className="w-40 h-40 object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Success Stories */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Stories</h2>
                        <div className="bg-white border border-gray-200 rounded-2xl p-8">
                            <div className="flex gap-2 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className="text-amber-400 text-xl">★</span>
                                ))}
                            </div>
                            <p className="text-gray-700 leading-relaxed italic">
                                "The structured practice and AI hints helped me clear my Google interview. The layout is intuitive and distraction-free."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-20 border-t border-gray-200 pt-12 pb-8">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-[#2f8d46] transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-[#2f8d46] transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-[#2f8d46] transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">Learn</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-[#2f8d46] transition-colors">Data Structures</a></li>
                                <li><a href="#" className="hover:text-[#2f8d46] transition-colors">Algorithms</a></li>
                                <li><a href="#" className="hover:text-[#2f8d46] transition-colors">Languages</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">Practice</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-[#2f8d46] transition-colors">Problem Sets</a></li>
                                <li><a href="#" className="hover:text-[#2f8d46] transition-colors">Mock Tests</a></li>
                                <li><a href="#" className="hover:text-[#2f8d46] transition-colors">Contests</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
