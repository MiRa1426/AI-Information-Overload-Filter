# Quick Start Guide - AI Information Overload Filter

## 🚀 One-Command Setup

### Windows Users

**Terminal 1 - Backend:**
```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm install
npm run dev
```

### Mac/Linux Users

**Terminal 1 - Backend:**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing the New Features

### 1. **Advanced Scoring Algorithm**
Try these goals and see how scores change:

```
✅ Good Examples:
"I want to learn machine learning focusing on computer vision"
→ Academic goal, high relevance, low noise, high focus

"Maybe learn Python or JavaScript"
→ Vague language detected, lower relevance & focus

"I need to reduce YouTube addiction ASAP"
→ Entertainment, urgency detected, higher focus bonus

"Build a profitable startup before end of year"
→ Professional goal, deadline, urgency bonus applied
```

### 2. **Smart Suggestions**
Each goal type generates context-specific tips:

```
Entertainment Goals → Distraction reduction strategies
Social Media Goals → App limitation techniques
Academic Goals → Learning roadmap suggestions
Professional Goals → Career development tips
Health Goals → Fitness & wellness strategies
Creative Goals → Artistic progression tips
```

### 3. **Loading Spinner Animation**
- Triple-ring rotating animation
- Bouncing dots with color gradient
- Pulsing inner circle
- Blinking subtitle text
- Total animation time: ~1-2 seconds

### 4. **Goal Type Detection**
The system automatically detects:
- Goal category (7 types)
- Confidence score (0-100%)
- Appropriate suggestion bank
- Customized score baseline

### 5. **History with Timestamps**
- Each analysis saves automatically
- Shows timestamp of when analyzed
- Stores up to 10 analyses
- Can export as CSV (in code)

---

## 🎯 Test Scenarios

### Test 1: Academic Goal
**Input:** "I want to master Python and build ML models for healthcare"
**Expected:**
- Goal Type: Academic
- Relevance: 85-90 (specific, technical)
- Noise: 15-25 (focused)
- Focus: 80-85 (clear objective)
- Suggestions: Study roadmap, project-based learning, etc.

### Test 2: Distracted Goal
**Input:** "Maybe learn some coding but also keep scrolling Instagram"
**Expected:**
- Goal Type: Academic
- Relevance: 60-70 (vague + distracted)
- Noise: 65-75 (multi-tasking detected)
- Focus: 40-50 (lacks commitment)
- Suggestions: Focus improvement, app blocking, etc.

### Test 3: Entertainment Goal
**Input:** "Reduce my gaming addiction"
**Expected:**
- Goal Type: Entertainment
- Relevance: 60-70
- Noise: 65-75
- Focus: 50-60
- Suggestions: Gaming hour limits, alternatives, etc.

### Test 4: Professional Goal
**Input:** "I need to get promoted within 6 months"
**Expected:**
- Goal Type: Professional
- Relevance: 90+ (clear, urgent)
- Noise: 10-20 (focused)
- Focus: 85-90 (deadline + urgency)
- Suggestions: Skill development, networking, etc.

---

## 📊 Files to Explore

### Backend Intelligence:
- `backend/scoring.py` - See the keyword classification and scoring logic
- `backend/suggestions.py` - Review the 200+ suggestion database
- `backend/main.py` - Check the API structure

### Frontend Features:
- `frontend/src/components/LoadingSpinner.jsx` - Animation code
- `frontend/src/constants/config.js` - Configuration and constants
- `frontend/src/utils/api.js` - API client implementation
- `frontend/src/utils/storage.js` - LocalStorage utilities

---

## 🎨 Customization Tips

### Change Color Scheme
Edit `frontend/src/constants/config.js`:
```javascript
COLORS = {
  primary: "#3b82f6",      // Change blue
  secondary: "#8b5cf6",    // Change purple
  success: "#10b981",       // Change green
  // ... etc
}
```

### Add New Goal Keywords
Edit `backend/scoring.py`:
```python
GOAL_KEYWORDS = {
    "your_category": {
        "keywords": ["word1", "word2", "word3"],  # Add here
        "base_relevance": 80,
        "base_noise": 30,
        "base_focus": 75,
    }
}
```

### Customize Suggestions
Edit `backend/suggestions.py`:
```python
SUGGESTION_DATABASE = {
    "your_category": {
        "high_focus": ["suggestion1", "suggestion2"],
        "medium_focus": ["suggestion3", "suggestion4"],
    }
}
```

---

## 🔍 API Testing

### Using cURL:

```bash
# Health check
curl http://127.0.0.1:8000/

# Analyze a goal
curl -X POST http://127.0.0.1:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"goal": "I want to learn machine learning"}'
```

### Using Postman:
1. Create POST request to `http://127.0.0.1:8000/analyze`
2. Set body as JSON:
```json
{
  "goal": "I want to learn machine learning"
}
```
3. Send and view response

---

## 📈 Performance Testing

### Check Response Time:
```javascript
// In browser console:
console.time("API Call");
fetch("http://127.0.0.1:8000/analyze", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ goal: "Learn Python" })
}).then(r => r.json()).then(d => {
  console.timeEnd("API Call");
  console.log("Response:", d);
});
```

### Expected Times:
- API Response: < 100ms
- Loading Animation: 1-2 seconds (smooth UX)
- Page Render: < 500ms

---

## 🐛 Troubleshooting

### Backend Issues

**Error: "ModuleNotFoundError"**
```bash
pip install -r requirements.txt
```

**Error: "Port 8000 already in use"**
```bash
python -m uvicorn main:app --reload --port 8001
```

**Error: "CORS error"**
- Check backend is running on `http://127.0.0.1:8000`
- Verify `API_BASE_URL` in `frontend/src/constants/config.js`

### Frontend Issues

**Error: "Cannot find module"**
```bash
npm install
rm -rf node_modules package-lock.json
npm install
```

**API calls failing**
- Ensure backend server is running
- Check Network tab in DevTools
- Verify API endpoint in constants

---

## 💡 Code Examples

### Using the API Utility:
```javascript
import { analyzeGoal } from "../utils/api";

const result = await analyzeGoal("My goal here");
if (result.success) {
  console.log(result.data); // { relevance, noise, focus, suggestions, ... }
} else {
  console.error(result.error);
}
```

### Using Storage Utilities:
```javascript
import { 
  getAnalysisHistory, 
  saveAnalysisToHistory,
  clearAnalysisHistory 
} from "../utils/storage";

// Get history
const history = getAnalysisHistory();

// Save new analysis
saveAnalysisToHistory(analysisData);

// Clear all
clearAnalysisHistory();
```

### Using Constants:
```javascript
import { COLORS, GOAL_TYPES, EMOJIS } from "../constants/config";

console.log(COLORS.primary);        // "#3b82f6"
console.log(GOAL_TYPES.academic);   // "Academic"
console.log(EMOJIS.relevance);      // "🎯"
```

---

## 🎯 Next Steps

1. **Test all features** - Try different goal types
2. **Check mobile responsiveness** - Test on different screen sizes
3. **Verify animations** - Ensure smooth performance
4. **Test data persistence** - Refresh page, check history remains
5. **Export CSV** - Test history export functionality (in storage.js)

---

## 📚 Useful Links

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Pydantic Docs](https://docs.pydantic.dev/)
- [React Docs](https://react.dev/)
- [Axios Docs](https://axios-http.com/)
- [Recharts Docs](https://recharts.org/)

---

## 🎉 You're All Set!

Your project is now ready for:
- ✅ Local development
- ✅ Testing new features
- ✅ Hackathon submission
- ✅ Production deployment

Happy coding! 🚀
