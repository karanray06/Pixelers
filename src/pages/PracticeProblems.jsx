import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PracticeProblems() {
    const [difficulty, setDifficulty] = useState('All');
    const [topic, setTopic] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const problems = [
        { id: 1, title: 'Two Sum', difficulty: 'Easy', topic: 'Arrays', company: 'Google', acceptance: 92, status: 'completed' },
        { id: 2, title: 'Contains Duplicate', difficulty: 'Easy', topic: 'Arrays', company: 'Meta', acceptance: 88, status: 'completed' },
        { id: 3, title: 'Best Time to Buy Stock', difficulty: 'Easy', topic: 'Arrays', company: 'Amazon', acceptance: 85, status: 'in-progress' },
        { id: 4, title: 'Valid Parentheses', difficulty: 'Easy', topic: 'Stacks', company: 'Apple', acceptance: 90, status: 'completed' },
        { id: 5, title: 'Merge Sorted Array', difficulty: 'Easy', topic: 'Arrays', company: 'Microsoft', acceptance: 87, status: 'pending' },
        { id: 6, title: 'Remove Duplicates', difficulty: 'Easy', topic: 'Arrays', company: 'Google', acceptance: 91, status: 'pending' },
        { id: 7, title: '3Sum', difficulty: 'Medium', topic: 'Arrays', company: 'Amazon', acceptance: 72, status: 'pending' },
        { id: 8, title: 'Longest Substring', difficulty: 'Medium', topic: 'Strings', company: 'Meta', acceptance: 68, status: 'pending' },
        { id: 9, title: 'Add Two Numbers', difficulty: 'Medium', topic: 'Linked Lists', company: 'Google', acceptance: 75, status: 'pending' },
        { id: 10, title: 'Binary Tree Traversal', difficulty: 'Medium', topic: 'Trees', company: 'Apple', acceptance: 70, status: 'pending' },
        { id: 11, title: 'Trapping Rain Water', difficulty: 'Hard', topic: 'Arrays', company: 'Amazon', acceptance: 45, status: 'pending' },
        { id: 12, title: 'Word Ladder', difficulty: 'Hard', topic: 'Graphs', company: 'Meta', acceptance: 42, status: 'pending' }
    ];

    const topics = ['All', 'Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Trees', 'Graphs', 'Dynamic Programming'];
    const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

    const filteredProblems = useMemo(() => {
        return problems.filter((p) => {
            const matchDifficulty = difficulty === 'All' || p.difficulty === difficulty;
            const matchTopic = topic === 'All' || p.topic === topic;
            const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
            return matchDifficulty && matchTopic && matchSearch;
        });
    }, [difficulty, topic, searchTerm]);

    const getDifficultyColor = (diff) => {
        if (diff === 'Easy') return 'bg-green-600/20 text-green-300 border-green-500/30';
        if (diff === 'Medium') return 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30';
        return 'bg-red-600/20 text-red-300 border-red-500/30';
    };

    const getStatusIcon = (status) => {
        if (status === 'completed') return '✅';
        if (status === 'in-progress') return '⏳';
        return '🔲';
    };

    return (
        <div className="pt-24 pb-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-5xl font-bold mb-2">Practice Problems</h1>
                    <p className="text-gray-400">Master DSA through targeted practice. {filteredProblems.length} problems found.</p>
                </motion.div>

                {/* Filters */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search problems..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="md:col-span-1"
                    />

                    {/* Difficulty Filter */}
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="rounded-xl bg-slate-700/30 border border-slate-600/50 text-white px-4 py-2"
                    >
                        {difficulties.map((d) => (
                            <option key={d} value={d}>
                                {d === 'All' ? 'All Difficulties' : d}
                            </option>
                        ))}
                    </select>

                    {/* Topic Filter */}
                    <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="rounded-xl bg-slate-700/30 border border-slate-600/50 text-white px-4 py-2"
                    >
                        {topics.map((t) => (
                            <option key={t} value={t}>
                                {t === 'All' ? 'All Topics' : t}
                            </option>
                        ))}
                    </select>

                    {/* Reset Button */}
                    <button
                        onClick={() => {
                            setDifficulty('All');
                            setTopic('All');
                            setSearchTerm('');
                        }}
                        className="btn-secondary"
                    >
                        Reset Filters
                    </button>
                </div>

                {/* Problems List */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                >
                    {filteredProblems.length > 0 ? (
                        filteredProblems.map((problem, idx) => (
                            <motion.div
                                key={problem.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="glass-panel p-4 flex items-center justify-between hover:border-blue-500/30 transition-all group cursor-pointer"
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    {/* Status Icon */}
                                    <span className="text-2xl flex-shrink-0">{getStatusIcon(problem.status)}</span>

                                    {/* Problem Info */}
                                    <div className="flex-1 min-w-0">
                                        <Link to={`/problem/${problem.id}`}>
                                            <h3 className="font-semibold text-white hover:text-blue-400 transition truncate">
                                                {problem.title}
                                            </h3>
                                        </Link>
                                        <div className="flex gap-2 flex-wrap mt-1">
                                            <span className="text-xs text-gray-400">{problem.company}</span>
                                            <span className="text-xs text-gray-500">•</span>
                                            <span className="text-xs text-gray-400">{problem.acceptance}% AC</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tags and Action */}
                                <div className="flex items-center gap-3 ml-4">
                                    <div className="flex gap-2">
                                        <span className="text-xs px-3 py-1 bg-slate-700/30 text-gray-300 rounded-full">
                                            {problem.topic}
                                        </span>
                                        <span
                                            className={`text-xs px-3 py-1 rounded-full border ${getDifficultyColor(
                                                problem.difficulty
                                            )}`}
                                        >
                                            {problem.difficulty}
                                        </span>
                                    </div>

                                    <Link to={`/problem/${problem.id}`}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-lg font-semibold hover:bg-blue-600/40 transition-all"
                                        >
                                            Solve
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="glass-panel p-8 text-center">
                            <p className="text-gray-400 text-lg">No problems match your filters. Try adjusting them.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
