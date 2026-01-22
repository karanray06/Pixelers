# DSA Master - AI-Powered Learning Platform

A modern, feature-rich DSA (Data Structures & Algorithms) learning platform with AI-powered mentorship, real-time problem analysis, and professional UI/UX design.

## 🚀 Features

### 🤖 AI Chatbot
- **Real-time AI Mentor**: Integrated Gemini AI chatbot for instant help
- **Smart Problem Analysis**: Detailed explanations without giving away solutions
- **Context-Aware Responses**: Understands your learning journey
- **Always Available**: 24/7 AI assistance for DSA doubts

### 📊 Dashboard
- **Real-time Stats**: Track problems solved by difficulty level
- **Progress Tracking**: Visual breakdown of Easy, Medium, Hard problems
- **Topic Analysis**: Identify strengths and areas for improvement
- **Recent Problems**: Quick access to your problem history

### 🔍 Problem Logger
- **One-Click Analysis**: Paste a problem link, get AI analysis
- **Platform Detection**: Works with LeetCode, GeeksforGeeks, Codeforces, HackerRank
- **AI Insights**: Topic, difficulty, and key concepts identification
- **Real-time Database**: All problems synced with Firebase Firestore

### 🎓 AI Mentor Insights
- **Personalized Recommendations**: Get actionable next steps
- **Difficulty Breakdown**: Visual progress charts
- **Topic Statistics**: Master the topics you're weak at
- **Smart Suggestions**: Data-driven learning paths

### 🔐 Authentication
- **Google OAuth**: Secure sign-in with Google
- **Demo Mode**: Try the platform without signing up
- **Persistent Sessions**: Your data is always saved

## 🎨 Design Highlights

- **Enterprise Dark Theme**: Professional slate-900 base with cyan/blue accents
- **Smooth Animations**: Powered by Framer Motion
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Glass Morphism**: Modern backdrop blur effects
- **Gradient Accents**: Beautiful gradient buttons and cards

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Animation**: Framer Motion
- **Authentication**: Firebase Auth (Google OAuth)
- **Database**: Firestore (Real-time)
- **AI**: Google Gemini API
- **Deployment**: GitHub Pages

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/karanray06/Pixelers.git
   cd Pixelers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env` file in root:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Live Demo

Visit the live website: [DSA Master](https://karanray06.github.io/Pixelers/)

Or use **Demo Mode** to try the platform without signing up!

## 📁 Project Structure

```
src/
├── components/
│   ├── Login.jsx              # Authentication page
│   ├── AIChat.jsx             # AI chatbot component
│   ├── ProblemLog.jsx         # Problem input & analysis
│   ├── MentorView.jsx         # AI insights display
│   └── ProtectedRoute.jsx     # Route protection
├── pages/
│   └── Dashboard.jsx          # Main dashboard
├── contexts/
│   └── AuthContext.jsx        # Authentication state
├── services/
│   └── gemini.js              # Gemini AI integration
├── App.jsx                    # Main app component
├── main.jsx                   # React entry point
└── index.css                  # Global styles
```

## 🎯 How to Use

1. **Sign In**
   - Use Google Sign-in or Demo Mode
   - No credit card required

2. **Log a Problem**
   - Paste a problem link from LeetCode, GeeksforGeeks, etc.
   - Click "Analyze with AI"
   - Get instant AI analysis with difficulty and concepts

3. **Track Progress**
   - View your dashboard for stats
   - See your strengths and focus areas
   - Track problems solved by difficulty

4. **Get AI Help**
   - Click the 💬 button (bottom-right)
   - Ask anything about DSA
   - Get guidance, hints, and explanations

5. **Review Insights**
   - Check AI mentor recommendations
   - Follow personalized learning paths
   - Master weak areas systematically

## 🔗 Supported Platforms

- ✅ LeetCode
- ✅ GeeksforGeeks
- ✅ Codeforces
- ✅ HackerRank
- ✅ CodeChef
- ✅ Any problem URL (will analyze based on content)

## 💡 AI Features

### Smart Problem Analysis
The AI analyzes:
- Problem topic (Arrays, Linked Lists, Trees, etc.)
- Difficulty level (Easy, Medium, Hard)
- Key concepts needed
- Approach recommendations
- Time/Space complexity insights

### Personalized Mentorship
The AI provides:
- Learning suggestions based on your progress
- Difficulty recommendations
- Topic-specific guidance
- Interview preparation tips
- Motivation and encouragement

## 🚀 Performance

- ⚡ Lightning-fast builds with Vite
- 📦 Optimized bundle size (~200KB gzipped)
- 🎯 Smooth 60fps animations
- 🔄 Real-time Firebase updates
- 🌐 Mobile-optimized responsive design

## 🔒 Security

- 🔐 Google OAuth for secure authentication
- 🛡️ Firebase security rules
- 🔑 No passwords stored locally
- 🎯 Private user data in Firestore
- ✨ No ads or tracking

## 🤝 Contributing

Contributions are welcome! Please feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Gemini AI** for intelligent problem analysis
- **Firebase** for real-time backend
- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling
- **React** and **Vite** for the amazing DX

## 📞 Support

- 📧 Email: support@dsamentor.com
- 🐛 Found a bug? Open an issue
- 💡 Have a feature request? Let me know!

---

**Made with ❤️ for DSA learners worldwide**

Start your DSA journey today and master data structures with AI! 🚀

---

## 📖 Documentation Files

### Quick Start Files
| File | Purpose | Time |
|------|---------|------|
| [QUICK_START.md](QUICK_START.md) | 5-minute setup | 5 min ⚡ |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | Quick lookup | 2 min 📋 |

### Detailed Guides
| File | Purpose | Time |
|------|---------|------|
| [TESTING_GUIDE.md](TESTING_GUIDE.md) | Complete testing workflow | 15 min 🧪 |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | What was built | 10 min 🏗️ |
| [FEATURES.md](FEATURES.md) | Technical documentation | 20 min 💻 |

### Completion & Status
| File | Purpose | Time |
|------|---------|------|
| [COMPLETION_REPORT.md](COMPLETION_REPORT.md) | Project completion status | 10 min ✅ |

---

## 🎯 Documentation by Use Case

### **For First-Time Users**
1. Start: [QUICK_START.md](QUICK_START.md) (5 min)
2. Test: [TESTING_GUIDE.md](TESTING_GUIDE.md) → "Testing Workflow" section (5 min)
3. Explore: Click around the app!

### **For QA/Testers**
1. Start: [TESTING_GUIDE.md](TESTING_GUIDE.md) (15 min)
2. Verify: Use the testing checklist
3. Report: Issues found

### **For Developers**
1. Start: [QUICK_START.md](QUICK_START.md) (5 min)
2. Understand: [FEATURES.md](FEATURES.md) (20 min)
3. Code: Implement your features
4. Reference: [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

### **For Project Managers**
1. Overview: [COMPLETION_REPORT.md](COMPLETION_REPORT.md) (5 min)
2. Status: Check implementation checklist (2 min)
3. Timeline: Review metrics section (3 min)

### **For Deployers**
1. Check: [QUICK_REFERENCE.md](QUICK_REFERENCE.md) → "Production Commands" (2 min)
2. Setup: [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) → "How to Use" (5 min)
3. Deploy: `npm run build` then upload dist/

---

## 📂 Project Structure

```
DSA Mentor/
├── 📄 README.md (this file)
├── 📄 QUICK_START.md              👈 Start here!
├── 📄 TESTING_GUIDE.md            👈 How to test
├── 📄 QUICK_REFERENCE.md          👈 Quick lookup
├── 📄 IMPLEMENTATION_SUMMARY.md    👈 What was built
├── 📄 FEATURES.md                 👈 Technical details
├── 📄 COMPLETION_REPORT.md        👈 Project status
│
├── src/
│   ├── components/
│   │   ├── Login.jsx              (Google Sign-In)
│   │   ├── ProblemLog.jsx         (Problem input & analysis)
│   │   ├── MentorView.jsx         (AI insights)
│   │   └── ProtectedRoute.jsx     (Route protection)
│   │
│   ├── contexts/
│   │   └── AuthContext.jsx        (Authentication)
│   │
│   ├── pages/
│   │   └── Dashboard.jsx          (Main dashboard)
│   │
│   ├── services/
│   │   └── gemini.js              (AI analysis)
│   │
│   ├── utils/
│   │   └── dataManager.js         (Helper functions)
│   │
│   ├── firebase.js                (Firebase config)
│   ├── App.jsx                    (Router)
│   ├── main.jsx                   (Entry point)
│   └── index.css                  (Styles)
│
├── package.json                   (Dependencies)
├── vite.config.js                 (Build config)
├── tailwind.config.js             (Tailwind config)
└── index.html                     (HTML entry)
```

---

## 🎯 Key Features at a Glance

### ✨ Feature Summary
1. **Authentication** 🔐 - Google Sign-In
2. **Problem Logging** 📝 - URL-based problem input
3. **AI Analysis** 🤖 - Gemini extracts topic/difficulty
4. **Dashboard** 📊 - Real-time stats
5. **Mentorship** 👨‍🏫 - AI-powered insights
6. **Beautiful UI** 🎨 - Coding-themed design

### 🔧 Tech Stack
- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Backend**: Firebase (Auth + Firestore)
- **AI**: Google Gemini API
- **Animations**: Framer Motion

---

## 🚀 Quick Commands

```bash
# Setup
npm install

# Development
npm run dev              # Start dev server

# Production
npm run build           # Build for production
npm run preview         # Preview build
npm run deploy          # Deploy to GitHub Pages (if configured)

# Code Quality
npm run lint            # Check code style
```

---

## ✅ Implementation Status

| Component | Status | Notes |
|-----------|--------|-------|
| Authentication | ✅ Complete | Google Sign-In + Firestore |
| Problem Analysis | ✅ Complete | Gemini AI integration |
| Dashboard | ✅ Complete | Real-time stats |
| AI Mentor | ✅ Complete | Smart insights |
| UI/UX | ✅ Complete | Coding theme |
| Documentation | ✅ Complete | 5+ guides |
| Testing | ✅ Ready | Full guide provided |
| Deployment | ✅ Ready | Production optimized |

---

## 🎓 Learning Path

### Beginner
1. [QUICK_START.md](QUICK_START.md) - Get it running
2. Test the app manually
3. Read [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

### Intermediate
1. [TESTING_GUIDE.md](TESTING_GUIDE.md) - Understand features
2. [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Learn architecture
3. Explore the code

### Advanced
1. [FEATURES.md](FEATURES.md) - Deep dive
2. Review source code
3. Implement enhancements

---

## 🐛 Troubleshooting

### Issue: App won't start
**Solution**: Check [TESTING_GUIDE.md](TESTING_GUIDE.md) → "Troubleshooting"

### Issue: Analysis fails
**Solution**: Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md) → "Quick Troubleshooting"

### Issue: Don't understand feature
**Solution**: Check [FEATURES.md](FEATURES.md) → Find your feature

### Issue: Want to extend app
**Solution**: Check [FEATURES.md](FEATURES.md) → "Future Enhancements"

---

## 📞 Getting Help

1. **Quick answer?** → [QUICK_REFERENCE.md](QUICK_REFERENCE.md) (2 min)
2. **Setup help?** → [QUICK_START.md](QUICK_START.md) (5 min)
3. **Testing help?** → [TESTING_GUIDE.md](TESTING_GUIDE.md) (15 min)
4. **Technical help?** → [FEATURES.md](FEATURES.md) (20 min)
5. **Big picture?** → [COMPLETION_REPORT.md](COMPLETION_REPORT.md) (10 min)

---

## 🎉 You're Ready!

Choose your starting point above and begin your DSA Mentor journey!

### Next Steps:
1. Read [QUICK_START.md](QUICK_START.md) (5 minutes)
2. Run `npm install && npm run dev`
3. Open browser to test
4. Log some problems
5. See insights in action!

---

## 🌟 What Makes This Special

✨ **AI-Powered** - Google Gemini analyzes problems instantly
🎨 **Beautiful** - Cyberpunk design with smooth animations
📊 **Smart** - Real-time stats and personalized insights
🚀 **Fast** - Optimized performance, instant database sync
🔒 **Secure** - Google OAuth + Firestore security
📱 **Responsive** - Works on all devices perfectly
📚 **Documented** - 5+ comprehensive guides included

---

## 📝 File Guide

| File | Read If You Want To... |
|------|------------------------|
| [QUICK_START.md](QUICK_START.md) | Get running in 5 minutes |
| [TESTING_GUIDE.md](TESTING_GUIDE.md) | Thoroughly test the app |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | Quick lookup of commands/files |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | Understand what was built |
| [FEATURES.md](FEATURES.md) | Deep technical details |
| [COMPLETION_REPORT.md](COMPLETION_REPORT.md) | See project completion status |

---

## 🚀 Ready to Get Started?

**→ Go to [QUICK_START.md](QUICK_START.md) now!**

---

*Welcome to DSA Mentor! Happy coding! 🚀*

**Last Updated**: January 22, 2025  
**Status**: ✅ Production Ready  
**Version**: 1.0.0
