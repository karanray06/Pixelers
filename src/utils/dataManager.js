// Data management utilities for DSA Mentor

export const getTopicEmoji = (topic) => {
    const emojiMap = {
        'Arrays': '📋',
        'Strings': '🔤',
        'Linked Lists': '⛓️',
        'Trees': '🌳',
        'Graphs': '🕸️',
        'Hash Tables': '#️⃣',
        'Stacks': '📚',
        'Queues': '📦',
        'Heaps': '⛺',
        'Sorting': '🔀',
        'Searching': '🔍',
        'Dynamic Programming': '📊',
        'Binary Search': '⚡',
        'Greedy': '🎯',
        'Backtracking': '↩️',
        'Bit Manipulation': '🔢',
        'Math': '📐',
        'General DSA': '🎓'
    };
    return emojiMap[topic] || '💡';
};

export const getDifficultyColor = (difficulty) => {
    const colorMap = {
        'Easy': 'text-green-400',
        'Medium': 'text-yellow-400',
        'Hard': 'text-red-400'
    };
    return colorMap[difficulty] || 'text-slate-400';
};

export const getDifficultyBgColor = (difficulty) => {
    const colorMap = {
        'Easy': 'bg-green-500/10 border-green-500/20',
        'Medium': 'bg-yellow-500/10 border-yellow-500/20',
        'Hard': 'bg-red-500/10 border-red-500/20'
    };
    return colorMap[difficulty] || 'bg-slate-500/10 border-slate-500/20';
};

export const calculateStreak = (problems) => {
    if (!problems || problems.length === 0) return 0;
    
    const sortedProblems = [...problems].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const problem of sortedProblems) {
        const problemDate = new Date(problem.timestamp);
        problemDate.setHours(0, 0, 0, 0);
        
        const dayDiff = Math.floor((currentDate - problemDate) / (1000 * 60 * 60 * 24));
        
        if (dayDiff === streak) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
};

export const getSuggestedTopic = (topicStats = {}) => {
    const sortedTopics = Object.entries(topicStats)
        .sort((a, b) => a[1] - b[1]);
    
    return sortedTopics.length > 0 ? sortedTopics[0][0] : 'Arrays';
};

export const generateMentorMessage = (stats, problems) => {
    if (!problems || problems.length === 0) {
        return '🚀 Start your DSA journey by logging your first problem!';
    }
    
    const totalProblems = problems.length;
    const topicStats = stats.topicStats || {};
    const difficultyStats = stats.difficultyStats || {};
    
    const messages = [];
    
    if (totalProblems < 5) {
        messages.push('Keep grinding! 💪');
    } else if (totalProblems < 20) {
        messages.push('You\'re building momentum! 🔥');
    } else if (totalProblems < 50) {
        messages.push('Impressive progress! 🎯');
    } else {
        messages.push('You\'re a DSA master! 👑');
    }
    
    if (difficultyStats.Hard && difficultyStats.Hard > difficultyStats.Easy) {
        messages.push('Love challenging yourself! 🏔️');
    }
    
    const uniqueTopics = Object.keys(topicStats).length;
    if (uniqueTopics > 5) {
        messages.push('Diverse problem-solving skills! 🌈');
    }
    
    return messages.join(' ');
};

export const formatDate = (date) => {
    if (!date) return 'N/A';
    
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (d.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (d.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
};

export const validateURL = (url) => {
    try {
        new URL(url);
        const lowerUrl = url.toLowerCase();
        return lowerUrl.includes('leetcode') || 
               lowerUrl.includes('geeksforgeeks') || 
               lowerUrl.includes('codechef') || 
               lowerUrl.includes('hackerrank') ||
               lowerUrl.includes('codeforces') ||
               lowerUrl.includes('interviewbit');
    } catch (e) {
        return false;
    }
};

export const extractProblemName = (url) => {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        
        // Extract problem name from URL path
        const parts = pathname.split('/').filter(p => p);
        if (parts.length > 0) {
            return parts[parts.length - 1]
                .replace(/[-_]/g, ' ')
                .replace(/^\d+/, '')
                .trim();
        }
    } catch (e) {
        console.error('Error extracting problem name:', e);
    }
    
    return 'Unknown Problem';
};
