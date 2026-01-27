import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
    const stats = {
        totalSolved: 156,
        streakDays: 21,
        successRate: 87,
        globalRank: 542,
        xp: 12450,
        level: 24
    };

    const recentActivity = [
        { id: 1, name: 'Two Sum', difficulty: 'Easy', status: 'Solved', time: '2h ago', xp: 100 },
        { id: 2, name: 'Merge Intervals', difficulty: 'Medium', status: 'Solved', time: '1d ago', xp: 200 },
        { id: 3, name: 'Valid BST', difficulty: 'Medium', status: 'Solved', time: '2d ago', xp: 200 }
    ];

    return (
        <div className="pt-28 pb-20 bg-[#f7f7f7] min-h-screen">
            <div className="max-w-[1440px] mx-auto px-6">
                <header className="mb-12">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">User Dashboard</h1>
                    <p className="text-sm font-bold text-slate-500 mt-2 uppercase tracking-widest">Tracking your cognitive footprint and technical growth.</p>
                </header>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Solved', value: stats.totalSolved, icon: '✅', color: 'text-emerald-500' },
                        { label: 'Current Streak', value: stats.streakDays, icon: '🔥', color: 'text-orange-500' },
                        { label: 'Success Rate', value: `${stats.successRate}%`, icon: '📊', color: 'text-cyan-500' },
                        { label: 'Global Rank', value: stats.globalRank, icon: '🏆', color: 'text-amber-500' }
                    ].map((s, i) => (
                        <div key={i} className="edu-panel p-8 text-center bg-white hover:border-[#2f8d46]/30 transition-all">
                            <span className={`text-4xl block mb-4 ${s.color}`}>{s.icon}</span>
                            <h3 className="text-3xl font-black text-[#333333] tracking-tighter">{s.value}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Activity Feed */}
                    <div className="lg:col-span-2 edu-panel p-8">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-[#2f8d46] rounded-full" />
                                Recent Activity
                            </h2>
                            <button className="text-[10px] font-black uppercase tracking-widest text-[#2f8d46] hover:underline">View History</button>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {recentActivity.map((a, i) => (
                                <div key={i} className="py-6 flex items-center justify-between group">
                                    <div className="flex items-center gap-6">
                                        <span className="text-xs font-bold text-slate-400 w-16">{a.time}</span>
                                        <div>
                                            <h4 className="text-lg font-bold text-[#333333] group-hover:text-[#2f8d46] transition-colors">{a.name}</h4>
                                            <p className="text-[10px] font-bold text-[#2f8d46] uppercase tracking-widest mt-1">{a.difficulty}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-black text-slate-800">+{a.xp} XP</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mastery Indicators */}
                    <div className="edu-panel p-8 bg-white h-full">
                        <h2 className="text-2xl font-black text-slate-800 mb-10 flex items-center gap-3 text-center md:text-left">
                            <span className="w-1.5 h-6 bg-[#2f8d46] rounded-full" />
                            Skill Mastery
                        </h2>
                        <div className="space-y-8">
                            {[
                                { name: 'Arrays & Strings', progress: 85 },
                                { name: 'Linked Lists', progress: 60 },
                                { name: 'Trees & Graphs', progress: 40 },
                                { name: 'Dynamic Programming', progress: 20 }
                            ].map((skill, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{skill.name}</span>
                                        <span className="text-xs font-bold text-slate-400">{skill.progress}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.progress}%` }}
                                            className="h-full bg-[#2f8d46]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-100 text-center md:text-left">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Neural Maturity</p>
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <span className="text-5xl font-black text-slate-800">24</span>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-700">Level Rank</p>
                                    <p className="text-[10px] font-bold text-[#2f8d46] uppercase tracking-widest">Master Engineer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
