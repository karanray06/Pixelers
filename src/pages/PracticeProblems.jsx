import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PracticeProblems() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDifficulty, setFilterDifficulty] = useState('All');

    const problems = [
        { id: 1, title: 'Two Sum', topic: 'Arrays', difficulty: 'Easy', status: 'Solved', points: 100 },
        { id: 2, title: 'Reverse Linked List', topic: 'Linked Lists', difficulty: 'Easy', status: 'In Progress', points: 100 },
        { id: 3, title: 'Longest Substring', topic: 'Strings', difficulty: 'Medium', status: 'New', points: 200 },
        { id: 4, title: 'Median of Sorted Arrays', topic: 'Arrays', difficulty: 'Hard', status: 'New', points: 300 },
        { id: 5, title: 'Validate BST', topic: 'Trees', difficulty: 'Medium', status: 'Solved', points: 200 },
        { id: 6, title: 'Merge Intervals', topic: 'Sorting', difficulty: 'Medium', status: 'New', points: 200 },
    ];

    const filteredProblems = problems.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSimilarity = filterDifficulty === 'All' || p.difficulty === filterDifficulty;
        return matchesSearch && matchesSimilarity;
    });

    return (
        <div className="pt-28 pb-20 bg-[#f7f7f7] min-h-screen">
            <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Sidebar: Categories */}
                <aside className="hidden lg:block space-y-6">
                    <div className="edu-panel p-6">
                        <h3 className="font-black text-slate-800 mb-6 uppercase tracking-widest text-xs">Categories</h3>
                        <div className="space-y-2">
                            {['Arrays', 'Strings', 'Linked Lists', 'Trees', 'DP', 'Searching'].map(cat => (
                                <button key={cat} className="w-full text-left px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-[#2f8d46]/5 hover:text-[#2f8d46] rounded-md transition-all">
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content: Problem List */}
                <main className="lg:col-span-2 space-y-6">
                    <div className="edu-panel p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                            <div>
                                <h1 className="text-3xl font-black text-slate-800">Practice Problems</h1>
                                <p className="text-sm font-bold text-slate-500 mt-1">Curated challenges for elite engineers.</p>
                            </div>
                        </div>

                        {/* Filters Row */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Search problems..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input-edu pl-12"
                                />
                                <span className="absolute left-4 top-3.5 text-slate-400">🔍</span>
                            </div>
                            <select
                                value={filterDifficulty}
                                onChange={(e) => setFilterDifficulty(e.target.value)}
                                className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold text-slate-700 outline-none focus:border-[#2f8d46]"
                            >
                                {['All', 'Easy', 'Medium', 'Hard'].map(d => <option key={d}>{d}</option>)}
                            </select>
                        </div>

                        {/* Problem Table style */}
                        <div className="divide-y divide-gray-100 border-t border-gray-100">
                            {filteredProblems.map(p => (
                                <div key={p.id} className="py-6 flex items-center justify-between group">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-2 h-2 rounded-full ${p.difficulty === 'Easy' ? 'bg-emerald-500' :
                                                p.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-rose-500'
                                            }`} />
                                        <div>
                                            <Link to={`/problem/${p.id}`} className="text-lg font-bold text-[#333333] hover:text-[#2f8d46] transition-colors">
                                                {p.title}
                                            </Link>
                                            <div className="flex gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                <span>{p.topic}</span>
                                                <span>•</span>
                                                <span>{p.difficulty}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${p.status === 'Solved' ? 'text-[#2f8d46]' : 'text-slate-400'}`}>
                                            {p.status}
                                        </span>
                                        <Link to={`/problem/${p.id}`}>
                                            <button className="text-[10px] font-black uppercase tracking-widest text-[#2f8d46] border border-[#2f8d46] px-4 py-2 rounded hover:bg-[#2f8d46] hover:text-white transition-all">
                                                Solve
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Right Sidebar: Trending */}
                <aside className="space-y-6">
                    <div className="edu-panel p-6 bg-[#2f8d46]/5 border-[#2f8d46]/10">
                        <h3 className="font-black text-[#2f8d46] mb-4 uppercase tracking-widest text-xs">Trending Topics</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Recursion', 'Backtracking', 'Graphs'].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white border border-[#2f8d46]/20 rounded-full text-xs font-bold text-[#2f8d46]">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="edu-panel p-6">
                        <h3 className="font-black text-slate-800 mb-4 uppercase tracking-widest text-xs">Daily Goal</h3>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#2f8d46] w-2/3" />
                        </div>
                        <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-widest text-right">2/3 Solved</p>
                    </div>
                </aside>
            </div>
        </div>
    );
}
