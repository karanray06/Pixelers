import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import ProblemLog from '../components/ProblemLog';
import MentorView from '../components/MentorView';

export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, 'users', currentUser.uid, 'problems'),
            orderBy('timestamp', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedProblems = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProblems(fetchedProblems);
            setLoading(false);
        });

        return unsubscribe;
    }, [currentUser]);

    return (
        <div className="p-6 max-w-7xl mx-auto pb-20">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                    <p className="text-gray-400">Welcome back, {currentUser?.displayName || 'User'}</p>
                </div>
                <button
                    onClick={logout}
                    className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                >
                    Sign Out
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-6"
                >
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">Problems Solved</h3>
                    <p className="text-4xl font-bold">{problems.length}</p>
                </motion.div>

                {/* Weakness Card (Placeholder / Summary) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel p-6"
                >
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Latest Activity</h3>
                    <p className="text-gray-400 text-sm">
                        {problems.length > 0 ? `Last: ${problems[0].topic}` : 'No activity yet'}
                    </p>
                </motion.div>

                {/* Action Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-6"
                >
                    <h3 className="text-xl font-semibold mb-4 text-cyan-400">Quick Actions</h3>
                    <p className="text-gray-400 text-sm mb-4">Focus on your weak topics!</p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ProblemLog />
                <MentorView problems={problems} />
            </div>

            {/* Recent History List */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-white">Recent Problems</h3>
                <div className="space-y-3">
                    {problems.map(problem => (
                        <div key={problem.id} className="bg-surface/30 p-4 rounded-lg border border-white/5 flex justify-between items-center">
                            <div>
                                <p className="font-medium text-white">{problem.title || 'Unknown Problem'}</p>
                                <p className="text-xs text-gray-400">{problem.topic} • {problem.difficulty}</p>
                            </div>
                            <span className="text-xs text-gray-500">
                                {problem.timestamp?.toDate().toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
