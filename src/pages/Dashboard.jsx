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
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-pink-200/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 p-6 max-w-7xl mx-auto pb-20">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center mb-12"
                >
                    <div>
                        <h1 className="text-5xl font-bold text-gray-900 mb-2">
                            Dashboard
                        </h1>
                        <p className="text-gray-600 text-sm font-light">
                            Welcome back, <span className="font-semibold text-gray-900">{currentUser?.displayName || 'User'}</span>
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
                    <div className="card-premium p-6">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-600 text-sm font-semibold">TOTAL PROBLEMS</p>
                            <span className="text-2xl">📊</span>
                        </div>
                        <p className="text-4xl font-bold text-blue-600">{stats.totalProblems}</p>
                        <p className="text-xs text-gray-500 mt-2">Problems solved</p>
                    </div>

                    {/* Easy Count */}
                    <div className="card-premium p-6 border-b-4 border-green-500">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-600 text-sm font-semibold">EASY</p>
                            <span className="text-2xl">✅</span>
                        </div>
                        <p className="text-4xl font-bold text-green-600">{difficultyStats.Easy || 0}</p>
                        <p className="text-xs text-gray-500 mt-2">Easy problems</p>
                    </div>

                    {/* Medium Count */}
                    <div className="card-premium p-6 border-b-4 border-yellow-500">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-600 text-sm font-semibold">MEDIUM</p>
                            <span className="text-2xl">⚡</span>
                        </div>
                        <p className="text-4xl font-bold text-yellow-600">{difficultyStats.Medium || 0}</p>
                        <p className="text-xs text-gray-500 mt-2">Medium problems</p>
                    </div>

                    {/* Hard Count */}
                    <div className="card-premium p-6 border-b-4 border-red-500">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-600 text-sm font-semibold">HARD</p>
                            <span className="text-2xl">🔥</span>
                        </div>
                        <p className="text-4xl font-bold text-red-600">{difficultyStats.Hard || 0}</p>
                        <p className="text-xs text-gray-500 mt-2">Hard problems</p>
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
                        <div className="card-premium p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
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
                                            className="flex items-center justify-between bg-orange-50 p-3 rounded-lg border border-orange-100"
                                        >
                                            <span className="text-gray-700 font-medium">{topic}</span>
                                            <span className="text-sm font-semibold text-orange-600">{count} problems</span>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">Start solving problems to track weak areas</p>
                            )}
                        </div>

                        {/* Strengths */}
                        <div className="card-premium p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
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
                                            className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-100"
                                        >
                                            <span className="text-gray-700 font-medium">{topic}</span>
                                            <span className="text-sm font-semibold text-green-600">{count} problems</span>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">Topics will appear here as you solve problems</p>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* AI Mentor Insights */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 card-premium p-8"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
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
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span>📋</span>
                            Recent Problems
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {problems.slice(0, 6).map((problem) => (
                                <motion.div
                                    key={problem.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="card-premium p-4 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h4 className="text-sm font-bold text-gray-900 flex-1 line-clamp-2">{problem.topic}</h4>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded ml-2 whitespace-nowrap ${
                                            problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{problem.concept}</p>
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
