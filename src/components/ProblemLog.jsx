import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { analyzeProblem } from '../services/gemini';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

const ProblemLog = ({ userId, onProblemAdded }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    const handleAnalyze = async () => {
        if (!url.trim()) {
            setError('Please enter a valid URL');
            return;
        }

        try {
            setLoading(true);
            setError('');
            
            // Analyze the problem
            const result = await analyzeProblem(url);
            setAnalysis(result);
            setShowPreview(true);
        } catch (err) {
            setError('Failed to analyze problem. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProblem = async () => {
        if (!analysis || !userId) return;

        try {
            setLoading(true);
            
            const problem = {
                id: Date.now().toString(),
                url,
                ...analysis,
                timestamp: new Date(),
                solvedDate: new Date().toLocaleDateString()
            };

            // Update Firestore
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);
            
            if (userDoc.exists()) {
                const currentStats = userDoc.data().stats || {};
                const topicStats = currentStats.topicStats || {};
                const difficultyStats = currentStats.difficultyStats || {};

                // Update topic stats
                topicStats[analysis.topic] = (topicStats[analysis.topic] || 0) + 1;
                
                // Update difficulty stats
                difficultyStats[analysis.difficulty] = (difficultyStats[analysis.difficulty] || 0) + 1;

                await updateDoc(userRef, {
                    problems: arrayUnion(problem),
                    stats: {
                        totalProblems: (currentStats.totalProblems || 0) + 1,
                        topicStats,
                        difficultyStats
                    }
                });
            }

            // Reset form
            setUrl('');
            setAnalysis(null);
            setShowPreview(false);
            onProblemAdded?.();
            alert('Problem saved successfully!');
        } catch (err) {
            setError('Failed to save problem');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Input Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-slate-800 to-slate-700 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-colors"
            >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-cyan-400 font-mono">&gt;</span>
                    Add Problem
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-mono text-slate-300 mb-2">
                            Problem URL
                        </label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                            placeholder="https://leetcode.com/problems/two-sum/"
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono text-sm"
                        />
                        <p className="text-xs text-slate-400 mt-2 font-mono">
                            Supports: LeetCode, GeeksforGeeks, CodeChef, HackerRank
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-mono"
                        >
                            ✗ {error}
                        </motion.div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <span>🔍</span>
                                Analyze Problem
                            </>
                        )}
                    </motion.button>
                </div>
            </motion.div>

            {/* Analysis Preview */}
            {showPreview && analysis && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 border border-emerald-500/30 rounded-xl p-6"
                >
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-emerald-400">✓</span>
                        Analysis Results
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* Topic */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-900/40 border border-emerald-500/20 rounded-lg p-4"
                        >
                            <p className="text-xs font-mono text-slate-400 mb-1">TOPIC</p>
                            <p className="text-xl font-bold text-emerald-400">{analysis.topic}</p>
                        </motion.div>

                        {/* Difficulty */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-slate-900/40 border border-yellow-500/20 rounded-lg p-4"
                        >
                            <p className="text-xs font-mono text-slate-400 mb-1">DIFFICULTY</p>
                            <p className={`text-xl font-bold ${
                                analysis.difficulty === 'Easy' ? 'text-green-400' :
                                analysis.difficulty === 'Medium' ? 'text-yellow-400' :
                                'text-red-400'
                            }`}>
                                {analysis.difficulty}
                            </p>
                        </motion.div>

                        {/* Concept */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-900/40 border border-blue-500/20 rounded-lg p-4"
                        >
                            <p className="text-xs font-mono text-slate-400 mb-1">CONCEPT</p>
                            <p className="text-sm font-bold text-blue-400">{analysis.concept}</p>
                        </motion.div>
                    </div>

                    {/* Save Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSaveProblem}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition duration-300"
                    >
                        {loading ? 'Saving...' : '💾 Save to Dashboard'}
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
};

export default ProblemLog;
