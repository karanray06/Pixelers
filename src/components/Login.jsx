import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
    const { loginWithGoogle } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleGoogleLogin() {
        try {
            setIsLoading(true);
            setError('');
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Failed to sign in. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    // Demo login for testing
    function handleDemoLogin() {
        setIsLoading(true);
        localStorage.setItem('demoUser', JSON.stringify({
            uid: 'demo-user',
            displayName: 'Demo User',
            email: 'demo@pixelers.com'
        }));
        setTimeout(() => navigate('/dashboard'), 500);
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Animated Background Gradients */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md mx-4 z-10"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <div className="inline-block mb-6 p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-400/30">
                        <svg className="w-12 h-12 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.5 1.5H5.75A2.75 2.75 0 003 4.25v11.5A2.75 2.75 0 005.75 18.5h8.5A2.75 2.75 0 0017 15.75V8.75M10.5 1.5v5.5h5.5M10.5 1.5L17 8.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                        Pixelers
                    </h1>
                    <p className="text-lg text-blue-300 font-semibold">DSA Mastery with AI Mentor</p>
                </motion.div>

                {/* Main Card */}
                <motion.div
                    variants={itemVariants}
                    className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl"
                >
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-300 text-sm mb-8">Master Data Structures & Algorithms with personalized AI guidance</p>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/20 border border-red-500/30 text-red-200 p-4 rounded-lg mb-6 text-sm flex items-start gap-3"
                        >
                            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                        </motion.div>
                    )}

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                        {[
                            { icon: '🤖', text: 'AI-Powered Problem Analysis' },
                            { icon: '📊', text: 'Track Your Progress' },
                            { icon: '💡', text: 'Get Personalized Insights' }
                        ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                                <span className="text-lg">{feature.icon}</span>
                                <span>{feature.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Login Buttons */}
                    <div className="space-y-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            {isLoading ? 'Signing in...' : 'Sign in with Google'}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleDemoLogin}
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-purple-600/40 to-cyan-600/40 hover:from-purple-600/60 hover:to-cyan-600/60 text-white font-semibold py-3 px-4 rounded-lg transition-all border border-purple-400/30 hover:border-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Try Demo
                        </motion.button>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.p variants={itemVariants} className="text-center text-gray-400 text-xs mt-6">
                    By signing in, you agree to our Terms & Privacy Policy
                </motion.p>
            </motion.div>
        </div>
    );
}
