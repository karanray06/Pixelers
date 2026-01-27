import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function DSARoadmap() {
    const [expandedTopic, setExpandedTopic] = useState(null);

    const roadmapData = [
        {
            id: 1,
            title: 'Foundations',
            difficulty: 'Easy',
            icon: '01',
            completion: 100,
            problems: 25,
            topics: ['Variables', 'Loops', 'Conditionals', 'Complexity'],
            color: 'bg-emerald-500'
        },
        {
            id: 2,
            title: 'Linear structures',
            difficulty: 'Easy-Medium',
            icon: '02',
            completion: 75,
            problems: 45,
            topics: ['Arrays', 'Strings', 'Linked Lists', 'Stacks'],
            color: 'bg-cyan-500'
        },
        {
            id: 3,
            title: 'Hierarchical logic',
            difficulty: 'Medium',
            icon: '03',
            completion: 40,
            problems: 80,
            topics: ['Trees', 'Heaps', 'Graphs', 'Tries'],
            color: 'bg-indigo-500'
        },
        {
            id: 4,
            title: 'Optimization',
            difficulty: 'Hard',
            icon: '04',
            completion: 10,
            problems: 120,
            topics: ['DP', 'Greedy', 'Backtracking', 'Flow'],
            color: 'bg-rose-500'
        }
    ];

    return (
        <div className="pt-28 pb-20 bg-[#f7f7f7] min-h-screen">
            <div className="max-w-[1000px] mx-auto px-6">
                <header className="mb-16">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">DSA Learning Path</h1>
                    <p className="text-sm font-bold text-slate-500 mt-2 uppercase tracking-widest">A structured sequence to technical mastery.</p>
                </header>

                <div className="space-y-6">
                    {roadmapData.map((topic, idx) => (
                        <div key={topic.id} className="relative group">
                            {/* Connector Line */}
                            {idx !== roadmapData.length - 1 && (
                                <div className="absolute left-10 top-20 w-0.5 h-full bg-gray-200 -z-10" />
                            )}

                            <div
                                onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                                className={`edu-panel p-8 cursor-pointer transition-all duration-300 hover:border-[#2f8d46]/30 flex flex-col md:flex-row items-center gap-10 ${expandedTopic === topic.id ? 'border-[#2f8d46]/40 shadow-md' : ''}`}
                            >
                                <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xl shrink-0">
                                    {topic.icon}
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-black text-[#333333] group-hover:text-[#2f8d46] transition-colors uppercase tracking-tight">{topic.title}</h3>
                                    <div className="flex gap-4 justify-center md:justify-start items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                                        <span className="text-[#2f8d46]">{topic.difficulty}</span>
                                        <span>•</span>
                                        <span>{topic.problems} Units</span>
                                    </div>
                                </div>

                                <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden shrink-0">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${topic.completion}%` }}
                                        className="h-full bg-[#2f8d46]"
                                    />
                                </div>
                                <span className="text-sm font-black text-slate-800 shrink-0">{topic.completion}%</span>
                            </div>

                            <AnimatePresence>
                                {expandedTopic === topic.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden bg-white mt-1 edu-panel border-t-0 rounded-t-none"
                                    >
                                        <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                                            {topic.topics.map((t, i) => (
                                                <div key={i} className="bg-[#f7f7f7] p-4 rounded-lg">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Subject {i + 1}</p>
                                                    <p className="text-sm font-bold text-slate-800">{t}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="px-8 pb-8 flex justify-end">
                                            <Link to="/practice">
                                                <button className="btn-edu-primary h-12 px-8 text-xs uppercase tracking-widest">
                                                    Start Learning
                                                </button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
