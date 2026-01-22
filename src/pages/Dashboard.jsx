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
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 p-6 max-w-7xl mx-auto pb-20">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center mb-12"
                >
                    <div>
                        <h1 className="text-4xl font-bold gradient-text mb-2">Learning Dashboard</h1>
                        <p className="text-gray-400 text-sm">
                            Welcome back, <span className="text-cyan-400 font-semibold">{currentUser?.displayName || 'User'}</span>
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={logout}
                        className="px-6 py-2 btn-secondary text-sm"
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
                    <div className="card-premium p-6 border-l-4 border-blue-500/60">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-400 text-sm font-semibold">PROBLEMS SOLVED</p>
                            <span className="text-2xl">📊</span>
                        </div>
                        <p className="text-4xl font-bold text-cyan-400">{stats.totalProblems}</p>
                        <p className="text-xs text-gray-500 mt-2">Total DSA problems</p>
                    </div>

                    {/* Easy Count */}
                    <div className="card-premium p-6 border-l-4 border-green-500/60">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-400 text-sm font-semibold">EASY</p>
                            <span className="text-2xl">✅</span>
                        </div>
                        <p className="text-4xl font-bold text-green-400">{difficultyStats.Easy || 0}</p>
                        <p className="text-xs text-gray-500 mt-2">Beginner level</p>
                    </div>

                    {/* Medium Count */}
                    <div className="card-premium p-6 border-l-4 border-yellow-500/60">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-400 text-sm font-semibold">MEDIUM</p>
                            <span className="text-2xl">⚡</span>
                        </div>
                        <p className="text-4xl font-bold text-yellow-400">{difficultyStats.Medium || 0}</p>
                        <p className="text-xs text-gray-500 mt-2">Intermediate level</p>
                    </div>

                    {/* Hard Count */}
                    <div className="card-premium p-6 border-l-4 border-red-500/60">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-400 text-sm font-semibold">HARD</p>
                            <span className="text-2xl">🔥</span>
                        </div>
                        <p className="text-4xl font-bold text-red-400">{difficultyStats.Hard || 0}</p>
                        <p className="text-xs text-gray-500 mt-2">Advanced level</p>
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
                        <div className="card-premium p-6 border border-slate-700/60">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span>🎯</span>
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
                                            className="flex items-center justify-between bg-orange-500/10 p-3 rounded-lg border border-orange-500/30 hover:border-orange-500/60 transition-colors"
                                        >
                                            <span className="text-gray-300 font-medium">{topic}</span>
                                            <span className="text-xs font-semibold text-orange-400 bg-orange-500/20 px-2 py-1 rounded">{count} problems</span>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm">Start solving problems to track weak areas</p>
                            )}
                        </div>

                        {/* Strengths */}
                        <div className="card-premium p-6 border border-slate-700/60">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span>⭐</span>
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
                                            className="flex items-center justify-between bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/30 hover:border-emerald-500/60 transition-colors"
                                        >
                                            <span className="text-gray-300 font-medium">{topic}</span>
                                            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded">{count} problems</span>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm">Topics will appear here as you solve problems</p>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* AI Mentor Insights */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 card-premium p-8 border border-slate-700/60"
                >
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span>🤖</span>
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
                            <span>📋</span>
                            Recent Problems
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {problems.slice(0, 6).map((problem) => (
                                <motion.div
                                    key={problem.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="card-premium p-4 border border-slate-700/60 hover:border-cyan-500/40 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h4 className="text-sm font-bold text-white flex-1 line-clamp-2">{problem.topic}</h4>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded ml-2 whitespace-nowrap ${
                                            problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                            problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                            'bg-red-500/20 text-red-400 border border-red-500/30'
                                        }`}>
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{problem.concept}</p>
                                    <p className="text-xs text-gray-500">{problem.solvedDate}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
