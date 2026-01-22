import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { analyzeProblem } from '../services/gemini';

export default function MentorView({ problems = [], userId }) {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (problems.length > 0) {
            generateInsights();
        }
    }, [problems]);

    const generateInsights = async () => {
        try {
            setLoading(true);

            // Calculate stats
            const topicCount = problems.reduce((acc, p) => {
                acc[p.topic] = (acc[p.topic] || 0) + 1;
                return acc;
            }, {});

            const difficultyCount = problems.reduce((acc, p) => {
                acc[p.difficulty] = (acc[p.difficulty] || 0) + 1;
                return acc;
            }, {});

            const weakAreas = Object.entries(topicCount)
                .sort((a, b) => a[1] - b[1])
                .slice(0, 3)
                .map(([topic]) => topic);

            const strongAreas = Object.entries(topicCount)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([topic]) => topic);

            // Generate recommendations
            let recommendations = [];
            if (weakAreas.length > 0) {
                recommendations.push(`📌 Focus more on ${weakAreas.join(', ')} topics to strengthen weak areas`);
            }

            const totalProblems = problems.length;
            if (totalProblems < 10) {
                recommendations.push(`💪 Keep practicing! Aim for at least 10 problems to get better insights`);
            }

            if (difficultyCount.Hard && difficultyCount.Hard > difficultyCount.Easy) {
                recommendations.push(`🎯 Great job tackling hard problems! Balance with medium difficulty to improve speed`);
            } else if (difficultyCount.Easy && difficultyCount.Easy > difficultyCount.Hard) {
                recommendations.push(`⬆️  Ready for a challenge? Try more Hard problems to push your limits`);
            }

            if (strongAreas.length > 0) {
                recommendations.push(`⭐ You're strong in ${strongAreas.join(', ')} - maintain momentum!`);
            }

            setInsights({
                topicCount,
                difficultyCount,
                weakAreas,
                strongAreas,
                recommendations: recommendations.slice(0, 4),
                totalProblems
            });
        } catch (error) {
            console.error('Error generating insights:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!insights && problems.length > 0) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="animate-pulse text-gray-400 flex items-center gap-2">
                    <span className="text-2xl animate-spin">⚙️</span>
                    <span className="text-gray-300">Analyzing your progress...</span>
                </div>
            </div>
        );
    }

    if (problems.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="text-4xl mb-4">📚</div>
                <p className="text-gray-400">No problems logged yet. Start by adding your first problem!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Key Recommendations */}
            <div className="space-y-3">
                {insights.recommendations.map((rec, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="card-premium p-4 border-l-4 border-cyan-500/60 text-gray-300 text-sm font-medium hover:border-cyan-400/80 transition-all"
                    >
                        {rec}
                    </motion.div>
                ))}
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card-premium p-4 border border-slate-700/60 border-l-4 border-l-blue-500/60"
                >
                    <p className="text-xs font-semibold text-blue-400 mb-2">TOTAL PROBLEMS</p>
                    <p className="text-3xl font-bold text-blue-300">{insights.totalProblems}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="card-premium p-4 border border-slate-700/60 border-l-4 border-l-purple-500/60"
                >
                    <p className="text-xs font-semibold text-purple-400 mb-2">TOPICS COVERED</p>
                    <p className="text-3xl font-bold text-purple-300">{Object.keys(insights.topicCount).length}</p>
                </motion.div>
            </div>

            {/* Detailed Breakdown */}
            <div className="card-premium border border-slate-700/60 p-4">
                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <span>📊</span>
                    Difficulty Breakdown
                </h4>
                <div className="space-y-4">
                    {Object.entries(insights.difficultyCount).map(([difficulty, count]) => (
                        <div key={difficulty} className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm font-medium">{difficulty}</span>
                            <div className="flex items-center gap-3 flex-1 ml-4">
                                <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(count / insights.totalProblems) * 100}%` }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                        className={`h-full transition-colors ${
                                            difficulty === 'Easy' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                            difficulty === 'Medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                            'bg-gradient-to-r from-red-500 to-pink-500'
                                        }`}
                                    />
                                </div>
                                <span className="text-sm font-bold text-gray-300 w-8 text-right">{count}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Items */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-premium border border-slate-700/60 p-4 bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60"
            >
                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <span>✅</span>
                    Next Steps
                </h4>
                <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3 p-2 rounded-lg bg-slate-700/20 hover:bg-slate-700/40 transition-colors">
                        <span className="text-cyan-400 mt-0.5 font-bold">→</span>
                        <span className="text-gray-300">Practice <span className="text-cyan-400 font-semibold">{insights.weakAreas[0] || 'Arrays'}</span> problems - your weakest area</span>
                    </li>
                    <li className="flex items-start gap-3 p-2 rounded-lg bg-slate-700/20 hover:bg-slate-700/40 transition-colors">
                        <span className="text-cyan-400 mt-0.5 font-bold">→</span>
                        <span className="text-gray-300">Aim to solve at least 3 <span className="text-cyan-400 font-semibold">{
                            insights.difficultyCount.Hard > insights.difficultyCount.Easy ? 'Easy' : 'Hard'
                        }</span> problems this week</span>
                    </li>
                    <li className="flex items-start gap-3 p-2 rounded-lg bg-slate-700/20 hover:bg-slate-700/40 transition-colors">
                        <span className="text-cyan-400 mt-0.5 font-bold">→</span>
                        <span className="text-gray-300">Review solutions and understand edge cases</span>
                    </li>
                </ul>
            </motion.div>
        </div>
    );
}
