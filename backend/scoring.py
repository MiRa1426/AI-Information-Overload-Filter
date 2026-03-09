"""
Advanced scoring logic with keyword analysis and dynamic calculation
"""
from typing import Tuple

# Keyword mappings for different goal types
GOAL_KEYWORDS = {
    "entertainment": {
        "keywords": ["youtube", "Netflix", "gaming", "games", "free fire", "gaming hours", "twitch", "streaming", "watch"],
        "base_relevance": 45,
        "base_noise": 75,
        "base_focus": 40,
    },
    "social_media": {
        "keywords": ["instagram", "tiktok", "facebook", "twitter", "x", "snapchat", "whatsapp", "discord", "social"],
        "base_relevance": 50,
        "base_noise": 80,
        "base_focus": 35,
    },
    "academic": {
        "keywords": ["study", "learn", "course", "python", "javascript", "machine learning", "algorithms", "data science", "coding", "programming", "school", "university", "exam", "project"],
        "base_relevance": 90,
        "base_noise": 20,
        "base_focus": 85,
    },
    "professional": {
        "keywords": ["career", "job", "resume", "interview", "promotion", "skill", "leadership", "management", "business", "startup"],
        "base_relevance": 85,
        "base_noise": 25,
        "base_focus": 80,
    },
    "health": {
        "keywords": ["fitness", "exercise", "workout", "meditation", "health", "wellness", "diet", "nutrition", "sleep"],
        "base_relevance": 80,
        "base_noise": 30,
        "base_focus": 75,
    },
    "creative": {
        "keywords": ["art", "music", "writing", "design", "drawing", "creative", "painting", "graphics", "photography"],
        "base_relevance": 75,
        "base_noise": 35,
        "base_focus": 70,
    }
}

# Intensity keywords (increase noise/decrease focus)
DISTRACTION_KEYWORDS = ["but", "however", "also", "meanwhile", "instead", "or maybe", "want to also", "plus"]
POSITIVE_KEYWORDS = ["dedicate", "focus", "commit", "serious", "important", "priority", "goal", "objective", "target"]


def classify_goal_type(goal: str) -> str:
    """Classify the goal into a category"""
    goal_lower = goal.lower()
    
    for goal_type, data in GOAL_KEYWORDS.items():
        if any(keyword in goal_lower for keyword in data["keywords"]):
            return goal_type
    
    return "general"


def calculate_goal_length_score(goal: str) -> int:
    """Penalize very short or very long goals"""
    words = len(goal.split())
    
    if words < 5:
        return -10  # Too vague
    elif words > 50:
        return -15  # Too complex/unfocused
    else:
        return 5    # Well-described goal


def calculate_distraction_score(goal: str) -> Tuple[int, int]:
    """Detect distractions and multi-tasking patterns"""
    goal_lower = goal.lower()
    distraction_count = sum(1 for keyword in DISTRACTION_KEYWORDS if keyword in goal_lower)
    positive_count = sum(1 for keyword in POSITIVE_KEYWORDS if keyword in goal_lower)
    
    # Calculate noise increase and focus decrease
    noise_increase = distraction_count * 8
    focus_decrease = distraction_count * 10
    
    # Bonus for positive commitment
    focus_bonus = positive_count * 5
    noise_decrease = positive_count * 5
    
    return (noise_increase - noise_decrease, focus_decrease - focus_bonus)


def calculate_scores(goal: str) -> Tuple[int, int, int, str]:
    """
    Calculate relevance, noise, and focus scores based on goal analysis
    Returns: (relevance, noise, focus, goal_type)
    """
    goal_type = classify_goal_type(goal)
    
    # Get base scores from goal type
    if goal_type == "general":
        base_relevance = 70
        base_noise = 50
        base_focus = 65
    else:
        data = GOAL_KEYWORDS[goal_type]
        base_relevance = data["base_relevance"]
        base_noise = data["base_noise"]
        base_focus = data["base_focus"]
    
    # Adjust scores based on goal length
    length_adjustment = calculate_goal_length_score(goal)
    base_relevance += length_adjustment
    
    # Adjust scores based on distraction keywords
    noise_adjustment, focus_adjustment = calculate_distraction_score(goal)
    base_noise += noise_adjustment
    base_focus += focus_adjustment
    
    # Additional adjustments based on specific patterns
    goal_lower = goal.lower()
    
    # Detect urgency indicators (increases focus)
    urgency_keywords = ["asap", "urgent", "deadline", "immediately", "before", "until"]
    if any(keyword in goal_lower for keyword in urgency_keywords):
        base_focus += 10
        base_relevance += 5
    
    # Detect vague language (decreases relevance and focus)
    vague_keywords = ["maybe", "probably", "might", "could", "try"]
    if any(keyword in goal_lower for keyword in vague_keywords):
        base_relevance -= 10
        base_focus -= 8
    
    # Ensure scores are within 0-100 range
    relevance = max(0, min(100, base_relevance))
    noise = max(0, min(100, base_noise))
    focus = max(0, min(100, base_focus))
    
    return relevance, noise, focus, goal_type
