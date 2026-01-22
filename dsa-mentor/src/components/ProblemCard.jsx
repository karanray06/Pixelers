import React from 'react';
import { ExternalLink, Calendar, Code, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProblemCard = ({ problem }) => {
    return (
        <div className="glass-panel p-4 hover:bg-white/5 transition-colors group">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-semibold text-lg text-white mb-1 truncate max-w-md">
                        {problem.title || "Untitled Problem"}
                    </h3>
                    <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                        <ExternalLink size={12} /> {new URL(problem.url).hostname}
                    </a>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${problem.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                        'bg-green-500/10 text-green-400 border-green-500/20'
                    }`}>
                    {problem.difficulty}
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Code size={12} /> {problem.topic}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(problem.timestamp).toLocaleDateString()}</span>
                </div>

                <Link to="/solve" className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full border border-blue-500/20 hover:bg-blue-500/20 transition-colors flex items-center gap-1">
                    <PlayCircle size={12} /> Solve with AI
                </Link>
            </div>
        </div>
    );
};

export default ProblemCard;
