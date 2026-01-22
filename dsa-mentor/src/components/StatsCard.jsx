import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ icon: Icon, value, label, color }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-panel p-6 flex items-center justify-between relative overflow-hidden group"
        >
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${color}-500`}>
                <Icon size={64} />
            </div>

            <div>
                <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
                <p className="text-slate-400 text-sm font-medium">{label}</p>
            </div>

            <div className={`w-12 h-12 rounded-full bg-${color}-500/20 flex items-center justify-center text-${color}-400`}>
                <Icon size={24} />
            </div>
        </motion.div>
    );
};

export default StatsCard;
