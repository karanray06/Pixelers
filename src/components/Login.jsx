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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md mx-4 z-10"
            >
                {/* Logo Section */}
                <motion.div variants={itemVariants} className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold gradient-text mb-2">Learn DSA with AI</h1>
                    <p className="text-gray-400 text-sm">Master data structures and algorithms with intelligent guidance</p>
                </motion.div>

                {/* Main Card */}
                <motion.div
                    variants={itemVariants}
                    className="card-premium p-8 mb-6"
                >
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white mb-1">Get Started</h2>
                        <p className="text-gray-400 text-sm">COMPLETELY FREE 🎉</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm font-medium flex items-start gap-3"
                        >
                            <span className="text-lg">⚠️</span>
                            <span>{error}</span>
                        </motion.div>
                    )}

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                        {[
                            { icon: '🤖', text: 'AI Trainer with real-time guidance' },
                            { icon: '📊', text: 'Track progress and master concepts' },
                            { icon: '💡', text: 'Hints, not full answers - learn by thinking' }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="flex items-center gap-3 text-sm text-gray-300"
                            >
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-xs">
                                    {feature.icon}
                                </div>
                                <span>{feature.text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="mb-6 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

                    {/* Login Buttons */}
                    <div className="space-y-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="w-full btn-primary flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white"/>
                                    </svg>
                                    Continue with Google
                                </>
                            )}
                        </motion.button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-slate-800/80 text-gray-400">or try demo</span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleDemoLogin}
                            disabled={isLoading}
                            className="w-full btn-secondary"
                        >
                            {isLoading ? 'Starting Demo...' : 'Try Demo - No Sign-up Required'}
                        </motion.button>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div variants={itemVariants} className="text-center text-xs text-gray-500">
                    <p>AI Trainer has real-time eyes on your code</p>
                    <p className="mt-1">Learn by thinking, not copying. Helpful hints, not full answers.</p>
                </motion.div>
            </motion.div>
        </div>
    );
}
