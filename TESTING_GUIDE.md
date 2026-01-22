# 🚀 DSA Mentor - AI-Powered Learning Platform

A sophisticated Data Structures & Algorithms learning platform with AI-driven insights, problem tracking, and personalized mentorship.

## ✨ Features Implemented

### 1. **Authentication** 🔐
- **Secure Google Sign-In** via Firebase
- Session persistence with `browserLocalPersistence`
- Automatic user document creation in Firestore
- Safe logout with session cleanup

### 2. **Problem Logging** 📝
- **Universal URL Support**: LeetCode, GeeksforGeeks, CodeChef, HackerRank, CodeForces, InterviewBit
- **Real-time Analysis**: Google Gemini AI extracts:
  - Topic (Arrays, Linked Lists, Trees, Graphs, etc.)
  - Difficulty (Easy/Medium/Hard)
  - Core Concepts
- **Instant Feedback**: Visual preview of analysis results

### 3. **AI-Powered Analysis** 🤖
- **Gemini Integration**: Advanced prompt engineering for accurate categorization
- **Error Handling**: Graceful fallbacks for API failures
- **Smart Parsing**: Handles various URL formats and platform variations

### 4. **Comprehensive Dashboard** 📊
- **Real-time Stats**:
  - Total problems solved
  - Difficulty breakdown (Easy/Medium/Hard)
  - Topic coverage metrics
- **Weakness Analysis**:
  - Auto-detection of least practiced topics
  - Ranked difficulty distribution
- **Progress Visualization**: Animated charts and progress bars

### 5. **Personalized Mentorship** 👨‍🏫
- **Smart Recommendations**:
  - Focus areas identification
  - Balanced difficulty suggestions
  - Customized study plans
- **Performance Insights**:
  - Strength recognition
  - Growth tracking
  - Next step guidance

### 6. **Beautiful Coding-Themed UI** 🎨
- **Design System**:
  - Cyberpunk gradient backgrounds
  - Terminal-style typography (Fira Code)
  - Neon color scheme (Cyan, Blue, Purple)
  - Glassmorphic components
- **Animations**:
  - Smooth framer-motion transitions
  - Blob animations for background
  - Loading states and spinners
  - Hover and tap effects
- **Responsive Design**: Mobile-first, works on all devices

---

## 🧪 How to Test

### **Prerequisites**
```bash
# Ensure you have Node.js 16+ installed
node --version

# Install dependencies
npm install
```

### **Setup Environment Variables**
Create a `.env.local` file in the project root:
```env
VITE_FIREBASE_API_KEY=AIzaSyBMZ3QxXOYGh6Tvz0A7FT77V8O8v_1O9K8
VITE_FIREBASE_AUTH_DOMAIN=pixelers-25003.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=pixelers-25003
VITE_FIREBASE_STORAGE_BUCKET=pixelers-25003.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=390374134874
VITE_FIREBASE_APP_ID=1:390374134874:web:9218db8a9c3298bbc5b463
VITE_FIREBASE_MEASUREMENT_ID=G-LKMBK24T0T
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### **Start Development Server**
```bash
npm run dev
```
The app runs on `http://localhost:5173/Pixelers`

---

## 📋 Testing Workflow

### **Step 1: Login** 🔓
1. Click "Sign in with Google"
2. Complete Google authentication
3. User document automatically created in Firestore
4. Redirected to Dashboard

**Alternative**: Click "Try Demo" to use test account

### **Step 2: Log Your First Problem** 📝
1. Navigate to **"Add Problem"** section
2. Paste a URL from:
   - **LeetCode**: `https://leetcode.com/problems/two-sum/`
   - **GeeksforGeeks**: `https://www.geeksforgeeks.org/two-sum/`
   - **CodeChef**: `https://www.codechef.com/problems/TWOSUM/`
3. Click **"Analyze Problem"**
4. Wait for AI analysis (2-3 seconds)
5. Review extracted data:
   - ✅ Topic: "Arrays" or "Hash Table"
   - ✅ Difficulty: "Easy"
   - ✅ Concept: "Using hash map for O(n) solution"

### **Step 3: Save Problem** 💾
1. Click **"💾 Save to Dashboard"**
2. Problem added to database
3. Stats automatically updated
4. See real-time changes in:
   - Total Problems counter
   - Difficulty breakdown
   - Topic statistics

### **Step 4: View Dashboard Insights** 📊
After logging 3-5 problems:
1. **Stats Cards** show:
   - Total problems: 3
   - Easy: 1, Medium: 1, Hard: 1
2. **Focus Areas** identifies weak topics
3. **Your Strengths** highlights mastered areas
4. **AI Mentor Insights** provides:
   - Key recommendations
   - Difficulty breakdown chart
   - Next steps guide

### **Step 5: Test Full Workflow** 🔄
Log multiple problems with variety:

| URL | Expected Topic | Difficulty |
|-----|---|---|
| `https://leetcode.com/problems/two-sum/` | Arrays/Hash Table | Easy |
| `https://leetcode.com/problems/merge-k-sorted-lists/` | Linked Lists | Hard |
| `https://leetcode.com/problems/longest-substring-without-repeating-characters/` | Strings/Sliding Window | Medium |
| `https://www.geeksforgeeks.org/binary-tree-level-order-traversal/` | Trees | Medium |
| `https://leetcode.com/problems/course-schedule/` | Graphs | Medium |

---

## 🎯 Key Features to Verify

### **Authentication** ✅
- [x] Google Sign-In works
- [x] Firestore user creation
- [x] Session persistence
- [x] Safe logout clears data

### **Problem Analysis** ✅
- [x] URL validation
- [x] Gemini API integration
- [x] Accurate topic extraction
- [x] Difficulty classification
- [x] Concept summarization
- [x] Error handling

### **Data Management** ✅
- [x] Problems saved to Firestore
- [x] Stats updated automatically
- [x] Real-time database sync
- [x] Topic aggregation

### **Dashboard** ✅
- [x] Stats cards updated
- [x] Difficulty breakdown visible
- [x] Focus areas identified
- [x] Strengths highlighted
- [x] Recent problems displayed

### **AI Mentor** ✅
- [x] Recommendations generated
- [x] Performance insights accurate
- [x] Study plan personalized
- [x] Next steps actionable

### **UI/UX** ✅
- [x] Responsive design
- [x] Smooth animations
- [x] Coding theme consistent
- [x] Color accessibility
- [x] Error messaging clear

---

## 🛠️ Technical Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 18 + Vite |
| **Styling** | Tailwind CSS + Custom CSS |
| **Authentication** | Firebase Auth (Google) |
| **Database** | Firestore (Real-time) |
| **AI Analysis** | Google Gemini API |
| **Animations** | Framer Motion |
| **Routing** | React Router v6 |
| **Deployment** | Vite Build |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Login.jsx              # Google Sign-In interface
│   ├── ProblemLog.jsx         # Problem URL input & analysis
│   ├── MentorView.jsx         # AI insights & recommendations
│   └── ProtectedRoute.jsx     # Route protection
├── contexts/
│   └── AuthContext.jsx        # Auth state management
├── pages/
│   └── Dashboard.jsx          # Main dashboard
├── services/
│   └── gemini.js              # Gemini API integration
├── utils/
│   └── dataManager.js         # Helper functions
├── firebase.js                # Firebase config
├── App.jsx                    # Main app router
├── main.jsx                   # Entry point
└── index.css                  # Global styles
```

---

## 🚀 Deployment

```bash
# Build for production
npm run build

# Output: dist/ directory
# Deploy to GitHub Pages or Vercel
npm run deploy  # if configured
```

---

## 🔒 Security Notes

- ✅ Firebase security rules configured
- ✅ API keys in environment variables
- ✅ No sensitive data in client code
- ✅ HTTPS enforced
- ✅ User data isolated per UID

---

## 📞 Support & Issues

- Check browser console for errors
- Verify Firebase configuration
- Ensure Gemini API key is valid
- Check Firestore rules for read/write access

---

## 🎓 Learning Outcomes

After using this platform, users will:
- ✨ Track their DSA problem-solving progress
- 🎯 Identify weak areas and focus on them
- 📈 Visualize growth over time
- 💡 Get AI-powered learning recommendations
- 🚀 Build consistent coding habits

**Happy Coding! 🚀**
