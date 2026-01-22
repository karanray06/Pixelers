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
                className="card-premium p-6"
            >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>📝</span>
                    Log a Problem
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Problem URL
                        </label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                            placeholder="https://leetcode.com/problems/two-sum/"
                            className="input-premium w-full"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Supports LeetCode, GeeksforGeeks, CodeChef, HackerRank
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm font-medium flex items-start gap-3"
                        >
                            <span>⚠️</span>
                            <span>{error}</span>
                        </motion.div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                />
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
                    className="card-premium p-6"
                >
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <span>✨</span>
                        Analysis Results
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* Topic */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
                        >
                            <p className="text-xs font-semibold text-blue-300 mb-2">TOPIC</p>
                            <p className="text-xl font-bold text-blue-400">{analysis.topic}</p>
                        </motion.div>

                        {/* Difficulty */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className={`p-4 rounded-xl border ${
                                analysis.difficulty === 'Easy' 
                                    ? 'bg-green-500/10 border-green-500/30' :
                                analysis.difficulty === 'Medium' 
                                    ? 'bg-yellow-500/10 border-yellow-500/30' :
                                    'bg-red-500/10 border-red-500/30'
                            }`}
                        >
                            <p className={`text-xs font-semibold mb-2 ${
                                analysis.difficulty === 'Easy' ? 'text-green-300' :
                                analysis.difficulty === 'Medium' ? 'text-yellow-300' :
                                'text-red-300'
                            }`}>
                                DIFFICULTY
                            </p>
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
                            className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl"
                        >
                            <p className="text-xs font-semibold text-purple-300 mb-2">CONCEPT</p>
                            <p className="text-sm font-bold text-purple-300 line-clamp-2">{analysis.concept}</p>
                        </motion.div>
                    </div>

                    {/* Save Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSaveProblem}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition duration-300"
                    >
                        {loading ? 'Saving...' : '💾 Save to Dashboard'}
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
};

export default ProblemLog;
