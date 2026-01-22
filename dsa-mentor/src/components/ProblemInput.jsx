import React, { useState } from 'react';
import { Search, Loader2, Plus, Sparkles } from 'lucide-react';
import { analyzeProblem } from '../services/gemini';
import { motion, AnimatePresence } from 'framer-motion';

const ProblemInput = ({ onProblemAdded }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [analysis, setAnalysis] = useState(null);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const result = await analyzeProblem(url);
            if (result) {
                setAnalysis(result);
                if (onProblemAdded) onProblemAdded({ url, ...result, timestamp: Date.now() });
            } else {
                setError("Failed to analyze. Ensure the URL is valid.");
            }
        } catch (err) {
            setError("An error occurred during analysis.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel p-6 mb-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Sparkles size={100} />
            </div>

            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Plus className="text-blue-400" /> Log New Problem
            </h2>

            <form onSubmit={handleAnalyze} className="relative z-10">
                <div className="flex gap-4 flex-col md:flex-row">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Paste LeetCode or GeeksForGeeks URL..."
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <Search className="absolute left-3 top-3.5 text-slate-500" size={18} />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !url}
                        className="btn btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <><Loader2 className="animate-spin" size={18} /> Analyzing...</> : 'Analyze w/ AI'}
                    </button>
                </div>
            </form>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 mt-3 text-sm"
                    >
                        {error}
                    </motion.div>
                )}

                {analysis && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                {analysis.topic}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs border ${analysis.difficulty === 'Hard' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                                    analysis.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                                        'bg-green-500/20 text-green-300 border-green-500/30'
                                }`}>
                                {analysis.difficulty}
                            </span>
                        </div>

                        <h4 className="text-sm font-semibold text-slate-300 mb-2">Core Concepts:</h4>
                        <div className="flex gap-2 mb-3 flex-wrap">
                            {analysis.coreConcepts?.map((concept, i) => (
                                <span key={i} className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
                                    {concept}
                                </span>
                            ))}
                        </div>

                        <h4 className="text-sm font-semibold text-slate-300 mb-2">AI Focus Advice:</h4>
                        <ul className="list-disc list-inside text-sm text-slate-400">
                            {analysis.focusAreas?.map((area, i) => (
                                <li key={i}>{area}</li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProblemInput;
