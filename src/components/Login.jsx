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
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -ml-48 -mb-48"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md mx-4 z-10"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="mb-12">
                    <div className="inline-block mb-6 p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl border border-blue-200/50">
                        <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-3">DSA Mentor</h1>
                    <p className="text-lg text-gray-600 font-light">Master Data Structures with AI guidance</p>
                </motion.div>

                {/* Main Card */}
                <motion.div
                    variants={itemVariants}
                    className="card-premium p-8 mb-6"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
                    <p className="text-gray-600 text-sm mb-8 font-light">Sign in to start tracking your DSA journey</p>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Features List */}
                    <div className="space-y-4 mb-8">
                        {[
                            { icon: '🤖', text: 'AI-powered problem analysis' },
                            { icon: '📊', text: 'Real-time progress tracking' },
                            { icon: '💡', text: 'Personalized insights' }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="flex items-center gap-3 text-sm text-gray-700"
                            >
                                <span className="text-xl">{feature.icon}</span>
                                <span>{feature.text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Login Buttons */}
                    <div className="space-y-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="w-full btn-primary mb-3 flex items-center justify-center gap-3 group"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            {isLoading ? 'Signing in...' : 'Sign in with Google'}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleDemoLogin}
                            disabled={isLoading}
                            className="w-full btn-secondary"
                        >
                            Try Demo
                        </motion.button>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.p variants={itemVariants} className="text-center text-gray-500 text-xs font-light">
                    Secure authentication with Firebase • AI powered by Google Gemini
                </motion.p>
            </motion.div>
        </div>
    );
}
