# System Architecture & Data Flow

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React + Vite)                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Home Page (User Interface)                 │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │ Input Form Component                           │  │   │
│  │  │ - Text input for goal                          │  │   │
│  │  │ - Analyze button (calls API)                   │  │   │
│  │  │ - Clear & History buttons                      │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │                      ↓                                │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │ API Utility (utils/api.js)                     │  │   │
│  │  │ - Makes POST request to backend                │  │   │
│  │  │ - Error handling                               │  │   │
│  │  │ - Returns { success, data|error }              │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │                      ↓                                │   │
│  │                  🔄 Loading Spinner                   │   │
│  │                  (3s animation)                       │   │
│  │                      ↓                                │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │ Dashboard Component (Results Display)          │  │   │
│  │  │ - Score cards with progress bars              │  │   │
│  │  │ - Pie & Bar charts                            │  │   │
│  │  │ - AI suggestions                              │  │   │
│  │  │ - Analysis history                            │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Storage Layer (utils/storage.js)                   │   │
│  │  - Saves to localStorage                           │   │
│  │  - Retrieves history                               │   │
│  │  - Timestamps each analysis                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Configuration (constants/config.js)               │   │
│  │  - Colors, emojis, endpoints                       │   │
│  │  - Goal types, animations                          │   │
│  │  - UI configuration                               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↕ (HTTP/JSON)
┌─────────────────────────────────────────────────────────────┐
│                 BACKEND (FastAPI + Python)                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Endpoint: POST /analyze                         │   │
│  │  - Receives: { goal: string }                        │   │
│  │  - Validates with Pydantic                          │   │
│  │  └──────────────────────────────────────────────────┘   │
│                        ↓                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Scoring Engine (scoring.py)                        │   │
│  │                                                       │   │
│  │  1. Goal Classification                             │   │
│  │     └─ 7 categories (academic, entertainment, etc)  │   │
│  │                                                       │   │
│  │  2. Keyword Analysis                                │   │
│  │     └─ Relevance, noise, focus base scores          │   │
│  │                                                       │   │
│  │  3. Adjustments                                      │   │
│  │     ├─ Goal length penalty/bonus                     │   │
│  │     ├─ Distraction keyword detection                │   │
│  │     ├─ Urgency indicator bonus                       │   │
│  │     └─ Vague language penalty                        │   │
│  │                                                       │   │
│  │  4. Normalization (0-100)                           │   │
│  │     └─ Final scores: relevance, noise, focus        │   │
│  │  └──────────────────────────────────────────────────┘   │
│                        ↓                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Suggestion Engine (suggestions.py)                 │   │
│  │                                                       │   │
│  │  1. Determine Focus Level                           │   │
│  │     └─ High (75+), Medium (50-74), Low (<50)        │   │
│  │                                                       │   │
│  │  2. Select from Goal-Type Database                  │   │
│  │     └─ Type-specific suggestions                    │   │
│  │                                                       │   │
│  │  3. Add Behavioral Tips                             │   │
│  │     └─ Based on scores & patterns                   │   │
│  │                                                       │   │
│  │  4. Ensure Quality (4-6 suggestions)                │   │
│  │     └─ Remove duplicates, finalize selection        │   │
│  │  └──────────────────────────────────────────────────┘   │
│                        ↓                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Response Assembly (models.py)                      │   │
│  │  {                                                  │   │
│  │    message: string,                                │   │
│  │    relevance: 0-100,                               │   │
│  │    noise: 0-100,                                   │   │
│  │    focus: 0-100,                                   │   │
│  │    suggestions: [6 strings],                       │   │
│  │    goal_type: string,                              │   │
│  │    confidence: 0-100                               │   │
│  │  }                                                 │   │
│  │  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Scoring Algorithm Detail

```
INPUT: "I want to learn machine learning for computer vision"

STEP 1: Goal Classification
═══════════════════════════
Keywords: "learn", "machine learning", "computer vision"
↓
MATCH: "academic" category
↓
BASE SCORES:
- Relevance: 90
- Noise: 20
- Focus: 85

STEP 2: Length Analysis
═══════════════════════
Word count: 9 words
- Not too short (5+ words) ✓
- Not too long (not >50) ✓
→ Length bonus: +5 to relevance

STEP 3: Keyword Analysis
════════════════════════
Positive keywords: "learn" = +5 to focus
Distraction keywords: NONE
→ No penalties applied

STEP 4: Urgency & Vagueness
═══════════════════════════
Urgency keywords: NONE
Vague keywords: NONE
→ No additional adjustments

STEP 5: Final Calculation
═════════════════════════
Relevance: 90 + 5 = 95
Noise: 20 + 0 = 20
Focus: 85 + 5 = 90

Confidence: max(95, 90) = 95

OUTPUT:
────────────────────────
{
  "message": "✨ Analyzed your academic goal successfully!",
  "relevance": 95,
  "noise": 20,
  "focus": 90,
  "goal_type": "academic",
  "confidence": 95,
  "suggestions": [
    "Create a structured learning roadmap with milestones",
    "Break your goal into weekly learning objectives",
    ...
  ]
}
```

---

## 🔄 Component Communication Flow

```
┌─────────────────┐
│   User Input    │
│   "Goal Text"   │
└────────┬────────┘
         │
         ↓
┌─────────────────────────────┐
│  Home.jsx                   │
│  - Manages state            │
│  - Validates input          │
│  - Shows loading state      │
└────────┬────────────────────┘
         │
         ↓ (analyzeGoal)
┌─────────────────────────────┐
│  utils/api.js               │
│  - Calls backend            │
│  - Handles errors           │
│  - Returns formatted data   │
└────────┬────────────────────┘
         │
         ↓ (HTTP POST)
    BACKEND PROCESSING
         ↓
┌─────────────────────────────┐
│  Response received          │
│  { scores, suggestions,     │
│    goal_type, confidence }  │
└────────┬────────────────────┘
         │
         ↓ (saveAnalysisToHistory)
┌─────────────────────────────┐
│  utils/storage.js           │
│  - Adds timestamp           │
│  - Saves to localStorage    │
└────────┬────────────────────┘
         │
         ↓ (setData)
┌─────────────────────────────┐
│  Dashboard.jsx              │
│  - Renders scores           │
│  - Shows charts             │
│  - Displays suggestions     │
│  - Lists history            │
└─────────────────────────────┘
```

---

## 🎨 Data Models

### Request Model (Pydantic)
```python
AnalysisRequest:
  goal: str
```

### Response Model (Pydantic)
```python
AnalysisResponse:
  message: str
  relevance: int (0-100)
  noise: int (0-100)
  focus: int (0-100)
  suggestions: List[str] (max 6)
  goal_type: str
  confidence: int (0-100)
```

### History Item (LocalStorage)
```javascript
{
  id: number (timestamp),
  message: string,
  relevance: number,
  noise: number,
  focus: number,
  suggestions: string[],
  goal_type: string,
  confidence: number,
  timestamp: ISO string
}
```

---

## 🔐 Data Flow Sequence

```
User                Frontend              Backend           Storage
 │                    │                      │                 │
 ├─ Enter goal ─────→ │                      │                 │
 │                    ├─ Validate input      │                 │
 │                    ├─ Show loading ──┐    │                 │
 │                    │                 │    │                 │
 │                    ├─ POST /analyze ─┼───→│                 │
 │                    │                 │    ├─ Classify goal  │
 │                    │                 │    ├─ Calculate scores
 │                    │                 │    ├─ Generate tips  │
 │                    │                 │    ├─ Format response│
 │                    │←─ JSON response ─┼───┤                 │
 │                    │                 │    │                 │
 │                    ├─ Hide loading   │    │                 │
 │                    ├─ Save to history ────┼────→ localStorage
 │                    │                 │    │                 │
 │←─ Display results ─┤                 │    │                 │
 │  (scores, charts,  │                 │    │                 │
 │   suggestions)     │                 │    │                 │
```

---

## 🎯 Key Design Patterns

### 1. **Service Layer Pattern**
```
Components → Utilities → Backend
  UI        API Client   Business Logic
```

### 2. **Configuration Pattern**
```
Centralized Constants
├─ Colors
├─ Endpoints
├─ Goal Types
└─ All other static values
```

### 3. **Error Handling Pattern**
```
Try-Catch
├─ Validation errors
├─ Network errors
├─ Parse errors
└─ User-friendly messages
```

### 4. **State Management**
```
React Hooks (useState)
├─ goal (input)
├─ data (results)
├─ loading (UI state)
└─ error (messages)
```

---

## 📈 Performance Considerations

### Frontend Optimizations
- ✅ Component memoization
- ✅ Lazy loading
- ✅ Efficient re-renders
- ✅ Optimized chart rendering

### Backend Optimizations
- ✅ Keyword matching (O(n) within reason)
- ✅ No database queries (in-memory)
- ✅ Fast string operations
- ✅ Pre-initialized data structures

### Network Optimization
- ✅ Single API call per analysis
- ✅ Minimal JSON payload
- ✅ LocalStorage caching
- ✅ No unnecessary requests

---

## 🔄 Extension Points

### Add New Goal Type
1. Edit `GOAL_KEYWORDS` in `backend/scoring.py`
2. Add suggestion bank in `backend/suggestions.py`
3. Add emoji in `frontend/constants/config.js`

### Add New Metrics
1. Update `AnalysisResponse` in `backend/models.py`
2. Calculate in `backend/scoring.py`
3. Display in `Dashboard.jsx`

### Customize Animations
1. Edit keyframes in CSS files
2. Modify timing constants
3. Update component styles

---

## 🚀 Scalability

### Current Capacity
- Single user per browser session
- LocalStorage: ~5-10 analyses
- Real-time processing: <100ms

### Future Scaling Options
- Add user authentication
- Use database backend
- Implement caching layer
- Add API rate limiting
- Implement job queues

---

## 📚 File Dependencies

```
Frontend:
  Home.jsx
    ├─ Dashboard.jsx
    ├─ LoadingSpinner.jsx
    ├─ utils/api.js
    ├─ utils/storage.js
    └─ constants/config.js

Backend:
  main.py
    ├─ models.py
    ├─ scoring.py
    └─ suggestions.py
```

---

## ✅ Verification Checklist

- [x] Architecture is modular and scalable
- [x] No circular dependencies
- [x] Clear data flow
- [x] Error handling at each layer
- [x] Configuration centralized
- [x] APIs are RESTful
- [x] Components are reusable
- [x] Performance is optimized

---

This architecture ensures:
✨ **Maintainability** - Easy to understand and modify
✨ **Scalability** - Can grow with future requirements
✨ **Reliability** - Error handling at all levels
✨ **Performance** - Optimized for speed
✨ **Testability** - Each layer can be tested independently

