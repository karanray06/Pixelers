import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function DSARoadmap() {
    const [expandedTopic, setExpandedTopic] = useState(null);

    const roadmapData = [
        {
            id: 1,
            title: 'Basics & Logic',
            difficulty: 'Easy',
            completion: 100,
            problems: 25,
            topics: ['Variables', 'Loops', 'Conditionals', 'Functions']
        },
        {
            id: 2,
            title: 'Arrays & Strings',
            difficulty: 'Easy-Medium',
            completion: 75,
            problems: 45,
            topics: ['Sliding Window', 'Two Pointers', 'Sorting', 'Hashing']
        },
        {
            id: 3,
            title: 'Recursion & Backtracking',
            difficulty: 'Medium',
            completion: 40,
            problems: 35,
            topics: ['Base Cases', 'Tree Recursion', 'Permutations', 'Combinations']
        },
        {
            id: 4,
            title: 'Linked Lists',
            difficulty: 'Medium',
            completion: 30,
            problems: 30,
            topics: ['Traversal', 'Reversal', 'Cycles', 'Merge']
        },
        {
            id: 5,
            title: 'Stacks & Queues',
            difficulty: 'Medium',
            completion: 20,
            problems: 25,
            topics: ['Stack Operations', 'Queue Operations', 'Monotonic Stack', 'Deque']
        },
        {
            id: 6,
            title: 'Trees & BSTs',
            difficulty: 'Medium-Hard',
            completion: 15,
            problems: 50,
            topics: ['Traversals', 'BST', 'AVL Trees', 'Segment Trees']
        },
        {
            id: 7,
            title: 'Graphs',
            difficulty: 'Hard',
            completion: 5,
            problems: 55,
            topics: ['DFS/BFS', 'Dijkstra', 'Topological Sort', 'Minimum Spanning Tree']
        },
        {
            id: 8,
            title: 'Dynamic Programming',
            difficulty: 'Hard',
            completion: 0,
            problems: 60,
            topics: ['Memoization', '0/1 Knapsack', 'LCS', 'Matrix Chain']
        }
    ];

    const getDifficultyColor = (difficulty) => {
        if (difficulty === 'Easy') return 'from-green-600 to-emerald-600';
        if (difficulty === 'Easy-Medium') return 'from-blue-600 to-cyan-600';
        if (difficulty === 'Medium') return 'from-yellow-600 to-orange-600';
        if (difficulty === 'Medium-Hard') return 'from-orange-600 to-red-600';
        return 'from-red-600 to-pink-600';
    };

    const getDifficultyLabel = (difficulty) => {
        if (difficulty === 'Easy') return 'badge-success';
        if (difficulty === 'Medium') return 'badge-warning';
        return 'badge-danger';
    };

    return (
        <div className="pt-24 pb-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="gradient-text">DSA Learning Roadmap</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        A structured path from fundamentals to mastery. Master each topic progressively with AI guidance.
                    </p>
                </motion.div>

                {/* Roadmap Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {roadmapData.map((topic, idx) => (
                        <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-panel p-6 cursor-pointer hover:border-blue-500/50 transition-all"
                            onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-2">{topic.title}</h3>
                                    <div className={`badge-${getDifficultyLabel(topic.difficulty)} inline-block mb-4`}>
                                        {topic.difficulty}
                                    </div>
                                </div>
                                <span className="text-3xl">{topic.id === 1 ? '✅' : topic.completion > 0 ? '⏳' : '🔒'}</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-400">Progress</span>
                                    <span className="text-sm font-semibold text-blue-400">{topic.completion}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${topic.completion}%` }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2, duration: 0.8 }}
                                        className={`h-full bg-gradient-to-r ${getDifficultyColor(topic.difficulty)}`}
                                    />
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-4 mb-4 text-sm text-gray-400">
                                <span>📊 {topic.problems} problems</span>
                                <span>⏱️ ~{Math.ceil(topic.problems / 5)} hours</span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                {topic.completion === 100 && (
                                    <button className="flex-1 px-4 py-2 bg-green-600/20 text-green-300 rounded-lg font-semibold">
                                        ✅ Completed
                                    </button>
                                )}
                                {topic.completion > 0 && topic.completion < 100 && (
                                    <Link to="/practice" className="flex-1">
                                        <button className="w-full px-4 py-2 bg-blue-600/20 text-blue-300 rounded-lg font-semibold">
                                            📚 Resume
                                        </button>
                                    </Link>
                                )}
                                {topic.completion === 0 && topic.id <= 2 && (
                                    <Link to="/practice" className="flex-1">
                                        <button className="w-full px-4 py-2 bg-slate-700/30 text-gray-300 rounded-lg font-semibold">
                                            🚀 Start
                                        </button>
                                    </Link>
                                )}
                                {topic.completion === 0 && topic.id > 2 && (
                                    <button className="flex-1 px-4 py-2 bg-slate-700/30 text-gray-400 rounded-lg font-semibold cursor-not-allowed">
                                        🔒 Locked
                                    </button>
                                )}
                            </div>

                            {/* Expandable Topics */}
                            {expandedTopic === topic.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 pt-4 border-t border-slate-700/30"
                                >
                                    <p className="text-sm text-gray-400 mb-3">Topics in this section:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {topic.topics.map((t, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-slate-700/30 text-gray-300 text-xs rounded-full"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Info Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel p-8 mt-12 border-blue-500/30"
                >
                    <div className="flex gap-4">
                        <span className="text-4xl">💡</span>
                        <div>
                            <h4 className="text-lg font-bold mb-2">Pro Tip</h4>
                            <p className="text-gray-300">
                                Don't just memorize solutions. Practice each problem, understand the approach, and learn to optimize. 
                                Use our AI Mentor to get hints when stuck. Remember: the goal is to understand, not to rush through problems.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
