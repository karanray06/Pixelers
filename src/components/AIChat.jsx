import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hey! 👋 I'm your AI DSA Mentor. Ask me anything about Data Structures & Algorithms, problem-solving strategies, or interview prep!",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const generateChatResponse = async (userMessage) => {
        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) {
                throw new Error('Gemini API key not configured');
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

            const systemPrompt = `You are an expert DSA (Data Structures & Algorithms) mentor with years of experience in competitive programming and technical interviews. Your role is to:
1. Help students understand DSA concepts clearly
2. Provide problem-solving strategies and approaches
3. Explain time/space complexity analysis
4. Offer interview preparation tips
5. Suggest learning resources and practice patterns
6. Provide code hints and explanations (not full solutions, but guidance)
7. Be encouraging and supportive
8. Keep responses concise but informative (2-3 paragraphs max)

Focus on helping the student learn and grow. Use examples and analogies when helpful.`;

            const chatHistory = messages
                .filter(m => m.sender !== 'error')
                .map(m => ({
                    role: m.sender === 'user' ? 'user' : 'model',
                    parts: [{ text: m.text }]
                }));

            const chat = model.startChat({
                history: chatHistory.slice(0, -1),
                generationConfig: {
                    maxOutputTokens: 500,
                    temperature: 0.7,
                }
            });

            const result = await chat.sendMessage(`${systemPrompt}\n\nUser: ${userMessage}`);
            const response = await result.response;
            return response.text();
        } catch (err) {
            console.error('❌ Chat Error:', err);
            throw err;
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setError('');
        setLoading(true);

        try {
            const botResponse = await generateChatResponse(input);
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: botResponse,
                sender: 'bot',
                timestamp: new Date()
            }]);
        } catch (err) {
            const errorMessage = err.message || 'Failed to get response. Please try again.';
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: `⚠️ ${errorMessage}`,
                sender: 'error',
                timestamp: new Date()
            }]);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleClearChat = () => {
        setMessages([{
            id: 1,
            text: "Hey! 👋 I'm your AI DSA Mentor. Ask me anything about Data Structures & Algorithms, problem-solving strategies, or interview prep!",
            sender: 'bot',
            timestamp: new Date()
        }]);
        setError('');
        setInput('');
    };

    return (
        <>
            {/* Chat Button - Bottom Right */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/50 flex items-center justify-center cursor-pointer hover:shadow-xl hover:shadow-blue-500/70 transition-all group"
            >
                <span className="text-2xl group-hover:scale-110 transition-transform">💬</span>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-24 right-6 w-96 z-50 shadow-2xl rounded-2xl overflow-hidden"
                    >
                        {/* Chat Container */}
                        <div className="bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900 border border-slate-700/60 h-[600px] flex flex-col">
                            {/* Header */}
                            <motion.div
                                initial={{ y: -20 }}
                                animate={{ y: 0 }}
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">🤖</div>
                                    <div>
                                        <h3 className="text-white font-bold">AI DSA Mentor</h3>
                                        <p className="text-xs text-blue-100">Always here to help</p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
                                >
                                    ✕
                                </motion.button>
                            </motion.div>

                            {/* Messages Container */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700/30">
                                <AnimatePresence>
                                    {messages.map((msg, idx) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-xs px-4 py-3 rounded-xl text-sm leading-relaxed ${
                                                    msg.sender === 'user'
                                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none shadow-lg shadow-blue-500/20'
                                                        : msg.sender === 'error'
                                                        ? 'bg-red-500/20 text-red-300 border border-red-500/30 rounded-bl-none'
                                                        : 'bg-slate-700/60 text-gray-200 border border-slate-600/40 rounded-bl-none'
                                                }`}
                                            >
                                                {msg.text}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {loading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-slate-700/60 text-gray-200 border border-slate-600/40 px-4 py-3 rounded-xl rounded-bl-none flex items-center gap-2">
                                            <div className="flex gap-1">
                                                <motion.div
                                                    animate={{ y: [0, -8, 0] }}
                                                    transition={{ repeat: Infinity, duration: 0.6 }}
                                                    className="w-2 h-2 bg-cyan-400 rounded-full"
                                                />
                                                <motion.div
                                                    animate={{ y: [0, -8, 0] }}
                                                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
                                                    className="w-2 h-2 bg-cyan-400 rounded-full"
                                                />
                                                <motion.div
                                                    animate={{ y: [0, -8, 0] }}
                                                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                                    className="w-2 h-2 bg-cyan-400 rounded-full"
                                                />
                                            </div>
                                            <span className="text-xs text-gray-400">Thinking...</span>
                                        </div>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="border-t border-slate-700/60 p-4 bg-slate-800/80 backdrop-blur-sm">
                                <form onSubmit={handleSendMessage} className="space-y-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask anything about DSA..."
                                        disabled={loading}
                                        className="w-full bg-slate-700/30 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 disabled:opacity-50 text-sm transition-all"
                                    />
                                    <div className="flex gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="submit"
                                            disabled={loading || !input.trim()}
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg transition-all"
                                        >
                                            {loading ? '⏳ Sending...' : '✈️ Send'}
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="button"
                                            onClick={handleClearChat}
                                            disabled={loading}
                                            className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-gray-300 font-semibold rounded-lg transition-all disabled:opacity-50"
                                        >
                                            🔄
                                        </motion.button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
