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
            console.log("Starting Google Sign-In...");
            await loginWithGoogle();
            console.log("Google Sign-In successful, navigating to dashboard");
            navigate('/dashboard');
        } catch (err) {
            const errorMsg = err.code === 'auth/popup-closed-by-user' 
                ? 'Sign-in was cancelled. Please try again.' 
                : err.message || 'Failed to sign in. Please check your internet connection.';
            setError(errorMsg);
            console.error("Sign-in error:", err.code, err.message);
        } finally {
            setIsLoading(false);
        }
    }

    // Demo login for testing
    function handleDemoLogin() {
        try {
            setIsLoading(true);
            console.log("Starting demo login...");
            localStorage.setItem('demoUser', JSON.stringify({
                uid: 'demo-user',
                displayName: 'Demo User',
                email: 'demo@dsamentor.com'
            }));
            console.log("Demo login successful, navigating to dashboard");
            setTimeout(() => navigate('/dashboard'), 300);
        } catch (err) {
            console.error("Demo login error:", err);
            setError('Failed to start demo mode');
        } finally {
            setIsLoading(false);
        }
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ y: [0, 50, 0] }}
                    transition={{ repeat: Infinity, duration: 8 }}
                    className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ y: [0, -50, 0] }}
                    transition={{ repeat: Infinity, duration: 10 }}
                    className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md mx-auto z-10"
            >
                {/* Logo Section */}
                <motion.div variants={itemVariants} className="mb-12 text-center">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 rounded-3xl mb-6 shadow-2xl shadow-blue-500/40 relative"
                    >
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-xl"></div>
                        <svg className="w-10 h-10 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </motion.div>
                    <h1 className="text-5xl font-bold mb-3">
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            DSA Master
                        </span>
                    </h1>
                    <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto">
                        Master Data Structures & Algorithms with AI-powered guidance and real-time analysis
                    </p>
                </motion.div>

                {/* Main Card */}
                <motion.div
                    variants={itemVariants}
                    className="relative group"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative card-premium p-8 border border-slate-700/80">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome</h2>
                            <p className="text-cyan-400 text-sm font-semibold tracking-wide">✨ COMPLETELY FREE</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-red-500/10 border border-red-500/40 rounded-xl text-red-300 text-sm font-medium flex items-start gap-3"
                            >
                                <span className="text-lg flex-shrink-0">⚠️</span>
                                <span>{error}</span>
                            </motion.div>
                        )}

                        {/* Features List */}
                        <div className="space-y-4 mb-8">
                            {[
                                { icon: '🤖', text: 'AI Mentor powered by Gemini AI' },
                                { icon: '📊', text: 'Real-time progress tracking' },
                                { icon: '💡', text: 'Smart problem analysis & hints' }
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={{
                                        hidden: { opacity: 0, x: -20 },
                                        visible: { opacity: 1, x: 0, transition: { delay: idx * 0.1 } }
                                    }}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/20 hover:bg-slate-700/40 transition-colors"
                                >
                                    <div className="flex-shrink-0 text-xl">{feature.icon}</div>
                                    <span className="text-sm text-gray-300 font-medium">{feature.text}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="mb-8 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>

                        {/* Login Buttons */}
                        <div className="space-y-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50"
                            >
                                {isLoading ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white"/>
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white"/>
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white"/>
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white"/>
                                        </svg>
                                        <span>Continue with Google</span>
                                    </>
                                )}
                            </motion.button>

                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-3 bg-slate-800/80 text-gray-500 text-xs font-medium">or try demo</span>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleDemoLogin}
                                disabled={isLoading}
                                className="w-full bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/60 hover:border-slate-500/60 text-white font-bold py-3 rounded-xl transition-all"
                            >
                                {isLoading ? '⏳ Starting...' : '🎮 Demo Mode'}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Footer Info */}
                <motion.p
                    variants={itemVariants}
                    className="text-center text-xs text-gray-500 mt-8"
                >
                    Secure. Private. AI-Powered. No ads ever.
                </motion.p>
            </motion.div>
        </div>
    );
}
