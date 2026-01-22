import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import ProblemLog from '../components/ProblemLog';
import MentorView from '../components/MentorView';

export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        if (!currentUser) return;

        const userRef = doc(db, 'users', currentUser.uid);
        const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setUserData(data);
                setProblems(data.problems || []);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, [currentUser]);

    const stats = userData?.stats || { totalProblems: 0, topicStats: {}, difficultyStats: {} };
    const topicStats = stats.topicStats || {};
    const difficultyStats = stats.difficultyStats || {};

    const weakestTopics = Object.entries(topicStats)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 3);

    const strongestTopics = Object.entries(topicStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute -bottom-8 right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 p-6 max-w-7xl mx-auto pb-20">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center mb-12"
                >
                    <div>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                            DSA Mentor Dashboard
                        </h1>
                        <p className="text-slate-400 font-mono text-sm">
                            &gt; Welcome back, <span className="text-cyan-400">{currentUser?.displayName || 'User'}</span>
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={logout}
                        className="px-6 py-2 bg-red-500/10 border border-red-500/30 hover:border-red-500/60 text-red-400 rounded-lg transition-all duration-300 font-mono text-sm"
                    >
                        Sign Out
                    </motion.button>
                </motion.header>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                >
                    {/* Total Problems */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-slate-400 font-mono text-sm">TOTAL PROBLEMS</p>
                            <span className="text-2xl">📊</span>
                        </div>
                        <p className="text-3xl font-bold text-cyan-400">{stats.totalProblems}</p>
                        <p className="text-xs text-slate-500 mt-2">Problems solved</p>
                    </div>

                    {/* Easy Count */}
                    <div className="bg-gradient-to-br from-green-900/30 to-slate-700 border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-slate-400 font-mono text-sm">EASY</p>
                            <span className="text-2xl">✅</span>
                        </div>
                        <p className="text-3xl font-bold text-green-400">{difficultyStats.Easy || 0}</p>
                        <p className="text-xs text-slate-500 mt-2">Easy problems</p>
                    </div>

                    {/* Medium Count */}
                    <div className="bg-gradient-to-br from-yellow-900/30 to-slate-700 border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-500/40 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-slate-400 font-mono text-sm">MEDIUM</p>
                            <span className="text-2xl">⚡</span>
                        </div>
                        <p className="text-3xl font-bold text-yellow-400">{difficultyStats.Medium || 0}</p>
                        <p className="text-xs text-slate-500 mt-2">Medium problems</p>
                    </div>

                    {/* Hard Count */}
                    <div className="bg-gradient-to-br from-red-900/30 to-slate-700 border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-slate-400 font-mono text-sm">HARD</p>
                            <span className="text-2xl">🔥</span>
                        </div>
                        <p className="text-3xl font-bold text-red-400">{difficultyStats.Hard || 0}</p>
                        <p className="text-xs text-slate-500 mt-2">Hard problems</p>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Problem Logger */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <ProblemLog userId={currentUser?.uid} onProblemAdded={handleRefresh} />
                    </motion.div>

                    {/* Right Column - Focus Areas & Insights */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Focus Areas (Weak Topics) */}
                        <div className="bg-gradient-to-br from-orange-900/20 to-slate-800 border border-orange-500/20 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-orange-400">🎯</span>
                                Focus Areas
                            </h3>
                            {weakestTopics.length > 0 ? (
                                <div className="space-y-3">
                                    {weakestTopics.map(([topic, count], idx) => (
                                        <motion.div
                                            key={topic}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + idx * 0.1 }}
                                            className="flex items-center justify-between bg-slate-900/40 p-3 rounded-lg"
                                        >
                                            <span className="text-slate-300">{topic}</span>
                                            <span className="text-sm font-mono text-orange-400">{count} problems</span>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-400 text-sm">Start solving problems to track weak areas</p>
                            )}
                        </div>

                        {/* Strengths */}
                        <div className="bg-gradient-to-br from-emerald-900/20 to-slate-800 border border-emerald-500/20 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-emerald-400">⭐</span>
                                Your Strengths
                            </h3>
                            {strongestTopics.length > 0 ? (
                                <div className="space-y-3">
                                    {strongestTopics.map(([topic, count], idx) => (
                                        <motion.div
                                            key={topic}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + idx * 0.1 }}
                                            className="flex items-center justify-between bg-slate-900/40 p-3 rounded-lg"
                                        >
                                            <span className="text-slate-300">{topic}</span>
                                            <span className="text-sm font-mono text-emerald-400">{count} problems</span>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-400 text-sm">Topics will appear here as you solve problems</p>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* AI Mentor Insights */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 border border-blue-500/20 rounded-xl p-8"
                >
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="text-blue-400">🤖</span>
                        AI Mentor Insights
                    </h3>
                    <MentorView problems={problems} userId={currentUser?.uid} />
                </motion.div>

                {/* Recent Problems List */}
                {problems.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8"
                    >
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="font-mono text-cyan-400">&gt;</span>
                            Recent Problems
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {problems.slice(0, 6).map((problem) => (
                                <motion.div
                                    key={problem.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 hover:border-slate-600 transition-all"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h4 className="text-sm font-bold text-white flex-1 line-clamp-2">{problem.topic}</h4>
                                        <span className={`text-xs font-mono px-2 py-1 rounded ml-2 ${
                                            problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                                            problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-red-500/20 text-red-400'
                                        }`}>
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">{problem.concept}</p>
                                    <p className="text-xs text-slate-500">{problem.solvedDate}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
