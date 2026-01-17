import React from 'react';
import { motion } from 'framer-motion';

export default function MentorView({ problems = [] }) {
    // Simple client-side aggregation for MVP
    const topics = problems.reduce((acc, p) => {
        acc[p.topic] = (acc[p.topic] || 0) + 1;
        return acc;
    }, {});

    const weakAreas = Object.entries(topics)
        .sort(([, a], [, b]) => a - b) // Sort by count (assuming low count = weak/unpracticed)
        .slice(0, 3);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 mt-6"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white">AI Mentor Insights</h3>
                    <p className="text-gray-400 text-sm">Based on your recent activity</p>
                </div>
            </div>

            <div className="space-y-4">
                {problems.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                        Log some problems to get insights!
                    </div>
                ) : (
                    <>
                        <div className="bg-surface/50 p-4 rounded-lg border border-white/5">
                            <h4 className="text-sm font-medium text-gray-300 mb-2">Recommended Focus</h4>
                            <div className="flex flex-wrap gap-2">
                                {weakAreas.length > 0 ? weakAreas.map(([topic]) => (
                                    <span key={topic} className="px-3 py-1 bg-red-500/20 text-red-200 text-xs rounded-full border border-red-500/20">
                                        {topic}
                                    </span>
                                )) : (
                                    <span className="text-gray-500 text-xs">Keep practicing to find gaps!</span>
                                )}
                            </div>
                        </div>

                        <div className="bg-surface/50 p-4 rounded-lg border border-white/5">
                            <h4 className="text-sm font-medium text-gray-300 mb-2">Study Plan</h4>
                            <p className="text-sm text-gray-400">
                                Try solving 2 Medium problems on
                                <span className="text-white font-medium"> {weakAreas[0]?.[0] || 'Arrays'} </span>
                                today.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}
