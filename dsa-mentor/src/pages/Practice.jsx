import React, { useState } from 'react';
import ProblemInput from '../components/ProblemInput';
import ProblemCard from '../components/ProblemCard';
import { Filter } from 'lucide-react';

const Practice = () => {
    const [problems, setProblems] = useState([
        // Mock data for initial view
        {
            url: 'https://leetcode.com/problems/two-sum',
            title: 'Two Sum', // Usually AI analysis returns this too, I should update prompt but OK for now
            topic: 'Arrays',
            difficulty: 'Easy',
            timestamp: Date.now() - 10000000
        }
    ]);

    const handleProblemAdded = (newProblem) => {
        // Add title logic if missing from AI, or just use ID
        const problemWithTitle = {
            ...newProblem,
            title: newProblem.url.split('/').pop().replace(/-/g, ' ').toUpperCase()
        };
        setProblems([problemWithTitle, ...problems]);
    };

    return (
        <div className="container mx-auto px-4 py-24 min-h-screen">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Practice Arena</h1>
                    <p className="text-slate-400">Log problems, analyze them with AI, and track your history.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Input & Filters */}
                <div className="lg:col-span-2">
                    <ProblemInput onProblemAdded={handleProblemAdded} />

                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">Your Log ({problems.length})</h3>
                        <button className="flex items-center gap-2 text-slate-400 text-sm hover:text-white">
                            <Filter size={14} /> Filter
                        </button>
                    </div>

                    <div className="space-y-4">
                        {problems.map((prob, idx) => (
                            <ProblemCard key={idx} problem={prob} />
                        ))}
                        {problems.length === 0 && (
                            <p className="text-center text-slate-500 py-10">No problems logged yet. Start by pasting a URL above.</p>
                        )}
                    </div>
                </div>

                {/* Right Col: Smart Recommendations (Mock for now) */}
                <div className="lg:col-span-1">
                    <div className="glass-panel p-6 sticky top-24">
                        <h3 className="text-lg font-bold mb-4">AI Recommendations</h3>
                        <p className="text-sm text-slate-400 mb-4">Based on your recent logs, focusing on <span className="text-blue-400">Arrays</span> and <span className="text-violet-400">Hash Maps</span>.</p>

                        <div className="space-y-3">
                            <div className="p-3 rounded bg-white/5 border border-white/5 cursor-pointer hover:border-blue-500/30 transition-colors">
                                <div className="text-xs text-green-400 mb-1">Easy • Arrays</div>
                                <div className="font-medium text-sm">Best Time to Buy and Sell Stock</div>
                            </div>
                            <div className="p-3 rounded bg-white/5 border border-white/5 cursor-pointer hover:border-blue-500/30 transition-colors">
                                <div className="text-xs text-yellow-400 mb-1">Medium • DP</div>
                                <div className="font-medium text-sm">Longest Increasing Subsequence</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Practice;
