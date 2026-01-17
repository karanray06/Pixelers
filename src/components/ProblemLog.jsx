import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

import { analyzeProblem } from '../services/gemini';

export default function ProblemLog({ onProblemAdded }) {
    const { currentUser } = useAuth();
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setMessage('Analyzing problem with AI...');

        try {
            const analysis = await analyzeProblem(url);

            await addDoc(collection(db, 'users', currentUser.uid, 'problems'), {
                url,
                timestamp: serverTimestamp(),
                title: analysis.topic + " Challenge",
                topic: analysis.topic,
                difficulty: analysis.difficulty,
                concept: analysis.concept,
                status: 'analyzed'
            });

            setMessage(`Logged: ${analysis.topic} (${analysis.difficulty})`);
            setUrl('');
            if (onProblemAdded) onProblemAdded();
        } catch (err) {
            console.error(err);
            setMessage('Error logging problem.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 mt-6"
        >
            <h3 className="text-xl font-semibold mb-4 text-white">Log Solved Problem</h3>
            <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                    type="url"
                    placeholder="Paste LeetCode or GFG link..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 bg-surface border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                >
                    {loading ? 'Logging...' : 'Analyze'}
                </button>
            </form>
            {message && <p className="mt-3 text-sm text-cyan-300">{message}</p>}
        </motion.div>
    );
}
