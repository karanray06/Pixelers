import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { name: 'DSA', path: '/practice', isActive: true },
        { name: 'Data Structures', path: '/roadmap' },
        { name: 'Algorithms', path: '/practice' },
        { name: 'Competitive Programming', path: '/practice' },
        { name: 'Java', path: '/practice' },
        { name: 'Python', path: '/practice' },
        { name: 'JavaScript', path: '/practice' },
        { name: 'Data Science', path: '/practice' },
        { name: 'Machine Learning', path: '/practice' },
        { name: 'Courses', path: '/practice' }
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white">
            {/* Top Header */}
            <div className="border-b border-gray-200">
                <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8 bg-[#2f8d46] rounded flex items-center justify-center">
                            <span className="text-white text-lg font-bold">P</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">Pixelers</span>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400">
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="8" cy="8" r="6" />
                                    <path d="M12 12l4 4" strokeLinecap="round" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#2f8d46] focus:ring-1 focus:ring-[#2f8d46]/20 transition-all"
                            />
                        </div>
                    </div>

                    {/* Navigation Dropdowns */}
                    <div className="hidden lg:flex items-center gap-6">
                        {['Courses', 'Tutorials', 'Practice', 'Jobs'].map((item) => (
                            <button key={item} className="text-sm font-medium text-gray-700 hover:text-[#2f8d46] transition-colors flex items-center gap-1">
                                {item}
                                <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Dark Mode Toggle */}
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        </button>

                        {/* Notifications */}
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>

                        {/* Sign In Button */}
                        <Link to="/dashboard">
                            <button className="px-5 py-2 bg-[#2f8d46] text-white text-sm font-semibold rounded-lg hover:bg-[#256f36] transition-all shadow-sm">
                                Sign In
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Category Bar */}
            <div className="bg-[#2f8d46] overflow-x-auto scrollbar-hide">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex items-center gap-1">
                        {categories.map((cat) => (
                            <Link
                                key={cat.name}
                                to={cat.path}
                                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${cat.isActive
                                        ? 'bg-white/20 text-white'
                                        : 'text-white/90 hover:bg-white/10'
                                    }`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
