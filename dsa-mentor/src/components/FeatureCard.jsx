import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FeatureCard = ({ title, description, icon: Icon, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="glass-panel p-6 hover:bg-white/5 transition-colors cursor-pointer group"
        >
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="text-slate-400 mb-4 text-sm leading-relaxed">{description}</p>

            <div className="flex items-center text-sm font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                Learn more <ArrowRight size={16} className="ml-1" />
            </div>
        </motion.div>
    );
};

export default FeatureCard;
