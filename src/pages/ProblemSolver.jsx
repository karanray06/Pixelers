import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

export default function ProblemSolver() {
    const { problemId } = useParams();
    const [activeTab, setActiveTab] = useState('problem');
    const [code, setCode] = useState('def solution(nums):\n    # Write your solution here\n    pass');
    const [showHint, setShowHint] = useState(false);

    const problemData = {
        id: problemId || 1,
        title: 'Two Sum',
        difficulty: 'Easy',
        company: 'Google',
        acceptance: 92,
        problem: `Given an array of integers nums and an integer target, return the indices of the two numbers that add up to the target. 
        
You may assume that each input has exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        examples: [
            {
                input: 'nums = [2,7,11,15], target = 9',
                output: '[0,1]',
                explanation: 'nums[0] + nums[1] == 9, so we return [0, 1].'
            },
            {
                input: 'nums = [3,2,4], target = 6',
                output: '[1,2]',
                explanation: 'nums[1] + nums[2] == 6, so we return [1, 2].'
            }
        ],
        constraints: [
            '2 <= nums.length <= 10^4',
            '-10^9 <= nums[i] <= 10^9',
            '-10^9 <= target <= 10^9'
        ],
        hint: 'Try using a hash map to store the numbers you\'ve seen and check if the complement exists.',
        approaches: [
            {
                name: 'Brute Force',
                time: 'O(n²)',
                space: 'O(1)',
                desc: 'Nested loops to check all pairs'
            },
            {
                name: 'Hash Map (Optimal)',
                time: 'O(n)',
                space: 'O(n)',
                desc: 'Store elements in hash map for O(1) lookup'
            }
        ]
    };

    return (
        <div className="pt-20 pb-16 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
                    {/* Left Panel - Problem Statement */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-panel p-6 overflow-y-auto flex flex-col"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{problemData.title}</h1>
                                <div className="flex gap-3">
                                    <span className="px-3 py-1 bg-green-600/20 text-green-300 rounded-lg text-sm">
                                        {problemData.difficulty}
                                    </span>
                                    <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-lg text-sm">
                                        {problemData.company}
                                    </span>
                                    <span className="px-3 py-1 bg-slate-700/30 text-gray-300 rounded-lg text-sm">
                                        {problemData.acceptance}% AC
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-2 mb-6 border-b border-slate-700/30">
                            {['problem', 'hints', 'approaches'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 font-semibold transition-colors ${
                                        activeTab === tab
                                            ? 'text-blue-400 border-b-2 border-blue-500'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Problem Tab */}
                        {activeTab === 'problem' && (
                            <div className="flex-1">
                                <p className="text-gray-300 mb-6 leading-relaxed whitespace-pre-wrap">
                                    {problemData.problem}
                                </p>

                                <h3 className="text-xl font-bold mb-4">Examples:</h3>
                                <div className="space-y-4 mb-6">
                                    {problemData.examples.map((ex, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-slate-700/20 p-4 rounded-lg border border-slate-700/30"
                                        >
                                            <p className="text-sm text-gray-400 mb-2">
                                                <span className="text-gray-300 font-semibold">Input:</span> {ex.input}
                                            </p>
                                            <p className="text-sm text-gray-400 mb-2">
                                                <span className="text-gray-300 font-semibold">Output:</span> {ex.output}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                <span className="text-gray-300 font-semibold">Explanation:</span> {ex.explanation}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold mb-4">Constraints:</h3>
                                <ul className="space-y-2">
                                    {problemData.constraints.map((constraint, idx) => (
                                        <li key={idx} className="text-gray-300 flex gap-2">
                                            <span>•</span>
                                            <span>{constraint}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Hints Tab */}
                        {activeTab === 'hints' && (
                            <div className="flex-1 flex flex-col">
                                <button
                                    onClick={() => setShowHint(!showHint)}
                                    className="mb-4 px-4 py-2 bg-blue-600/20 text-blue-300 rounded-lg font-semibold hover:bg-blue-600/40 transition-all w-full"
                                >
                                    {showHint ? '🙈 Hide Hint' : '💡 Show Hint'}
                                </button>
                                {showHint && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-yellow-600/20 border border-yellow-500/30 p-4 rounded-lg"
                                    >
                                        <p className="text-yellow-200">{problemData.hint}</p>
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {/* Approaches Tab */}
                        {activeTab === 'approaches' && (
                            <div className="flex-1 space-y-4">
                                {problemData.approaches.map((approach, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-slate-700/20 p-4 rounded-lg border border-slate-700/30 hover:border-blue-500/30 transition-all"
                                    >
                                        <h4 className="text-lg font-bold mb-2">{approach.name}</h4>
                                        <p className="text-gray-300 mb-3">{approach.desc}</p>
                                        <div className="flex gap-4 text-sm">
                                            <span className="text-cyan-400">
                                                <span className="text-gray-400">Time:</span> {approach.time}
                                            </span>
                                            <span className="text-purple-400">
                                                <span className="text-gray-400">Space:</span> {approach.space}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Right Panel - Code Editor */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-panel p-6 flex flex-col overflow-hidden"
                    >
                        <h2 className="text-xl font-bold mb-4">Solution</h2>

                        {/* Code Editor */}
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="flex-1 font-mono text-sm bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 text-gray-100 resize-none focus:outline-none focus:border-blue-500/50 mb-4"
                            placeholder="Write your code here..."
                        />

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 px-4 py-3 bg-slate-700/40 text-white rounded-lg font-semibold hover:bg-slate-700/60 transition-all"
                            >
                                ▶️ Run Code
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 px-4 py-3 bg-green-600/30 text-green-300 rounded-lg font-semibold hover:bg-green-600/50 transition-all"
                            >
                                ✅ Submit
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-3 bg-blue-600/30 text-blue-300 rounded-lg font-semibold hover:bg-blue-600/50 transition-all"
                            >
                                🤖 Ask AI
                            </motion.button>
                        </div>

                        {/* Console Output */}
                        <div className="mt-4 bg-slate-900/50 border border-slate-700/50 rounded-lg p-3 h-24 overflow-y-auto">
                            <p className="text-xs text-gray-500">Console output will appear here...</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
