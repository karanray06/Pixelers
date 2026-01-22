import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const [selectedTopic, setSelectedTopic] = useState(null);

    const stats = {
        totalSolved: 156,
        streakDays: 21,
        successRate: 87,
        ranking: 542
    };

    const recentProblems = [
        { id: 1, name: 'Two Sum', difficulty: 'Easy', status: 'solved', time: '2 days ago' },
        { id: 2, name: 'Longest Substring', difficulty: 'Medium', status: 'solved', time: '4 days ago' },
        { id: 3, name: 'Word Ladder II', difficulty: 'Hard', status: 'attempted', time: '1 week ago' },
        { id: 4, name: 'Median of Two Arrays', difficulty: 'Hard', status: 'solving', time: 'Today' }
    ];

    const topicProgress = [
        { name: 'Arrays', solved: 45, total: 50, progress: 90 },
        { name: 'Strings', solved: 38, total: 40, progress: 95 },
        { name: 'Linked Lists', solved: 28, total: 35, progress: 80 },
        { name: 'Trees', solved: 35, total: 45, progress: 78 },
        { name: 'Graphs', solved: 12, total: 30, progress: 40 },
        { name: 'DP', solved: 18, total: 50, progress: 36 }
    ];

    const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

    return (
        <div className="pt-20 pb-16 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <h1 className="text-5xl font-bold mb-3">Your Dashboard</h1>
                    <p className="text-xl text-gray-400">Track your progress and master DSA</p>
                </motion.div>

                <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Problems Solved', value: stats.totalSolved, icon: '✅', color: 'from-green-600 to-emerald-600' },
                        { label: 'Current Streak', value: `${stats.streakDays} days`, icon: '🔥', color: 'from-orange-600 to-red-600' },
                        { label: 'Success Rate', value: `${stats.successRate}%`, icon: '📈', color: 'from-blue-600 to-violet-600' },
                        { label: 'Global Rank', value: `#${stats.ranking}`, icon: '🏆', color: 'from-yellow-600 to-amber-600' }
                    ].map((stat, idx) => (
                        <motion.div key={idx} variants={item} className="glass-panel p-6 hover:shadow-lg hover:shadow-blue-600/20 transition-all">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                                    <h3 className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</h3>
                                </div>
                                <span className="text-4xl">{stat.icon}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 glass-panel p-6">
                        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                        <div className="space-y-3">
                            {recentProblems.map((problem, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-center justify-between p-4 bg-slate-700/20 rounded-lg hover:bg-slate-700/40 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl">{problem.status === 'solved' ? '✅' : problem.status === 'attempted' ? '⏳' : '🔄'}</span>
                                        <div>
                                            <p className="font-semibold group-hover:text-blue-400 transition-colors">{problem.name}</p>
                                            <p className="text-sm text-gray-500">{problem.time}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${problem.difficulty === 'Easy' ? 'bg-green-600/20 text-green-300' : problem.difficulty === 'Medium' ? 'bg-yellow-600/20 text-yellow-300' : 'bg-red-600/20 text-red-300'}`}>{problem.difficulty}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-6">
                        <h2 className="text-2xl font-bold mb-6">Quick Tips</h2>
                        <div className="space-y-4">
                            {[
                                { icon: '💡', title: 'Solve Daily', desc: 'Maintain your streak!' },
                                { icon: '🎯', title: 'Focus Weak Areas', desc: 'Work on Graphs & DP' },
                                { icon: '🤖', title: 'Ask AI Mentor', desc: 'Get real-time help' },
                                { icon: '🎤', title: 'Mock Interview', desc: 'Practice interviewing' }
                            ].map((tip, idx) => (
                                <motion.div key={idx} whileHover={{ x: 5 }} className="flex gap-3 p-3 bg-slate-700/20 rounded-lg cursor-pointer">
                                    <span className="text-2xl">{tip.icon}</span>
                                    <div>
                                        <p className="font-semibold text-sm">{tip.title}</p>
                                        <p className="text-xs text-gray-500">{tip.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-12 glass-panel p-8">
                    <h2 className="text-2xl font-bold mb-8">Topic Progress</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {topicProgress.map((topic, idx) => (
                            <motion.div key={idx} whileHover={{ scale: 1.02 }} onHoverStart={() => setSelectedTopic(topic.name)} onHoverEnd={() => setSelectedTopic(null)} className="p-4 bg-slate-700/20 rounded-lg border border-slate-700/30 hover:border-blue-500/30 transition-all cursor-pointer">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-lg">{topic.name}</h3>
                                    <span className="text-sm font-semibold text-blue-400">{topic.solved}/{topic.total}</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="bg-slate-900/50 h-2 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${topic.progress}%` }} transition={{ duration: 0.8, delay: idx * 0.1 }} className="h-full bg-gradient-to-r from-blue-600 to-violet-600" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm font-semibold ${topic.progress >= 80 ? 'text-green-400' : topic.progress >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{topic.progress}%</span>
                                        <span className="text-xs text-gray-500">{topic.total - topic.solved} remaining</span>
                                    </div>
                                </div>
                                {selectedTopic === topic.name && (
                                    <motion.button initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="w-full mt-4 px-3 py-2 bg-blue-600/30 text-blue-300 rounded-lg font-semibold hover:bg-blue-600/50 transition-all text-sm">
                                        Continue Learning
                                    </motion.button>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
