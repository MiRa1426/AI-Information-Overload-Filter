"""
Intelligent suggestion generation based on goal type and analysis
"""
from typing import List

# Suggestions mapped by goal type and score ranges
SUGGESTION_DATABASE = {
    "entertainment": {
        "high_distraction": [
            "Consider replacing entertainment time with learning sessions",
            "Set up content blockers for distracting websites",
            "Schedule entertainment as a reward after productive work",
            "Use app timers to limit daily entertainment consumption",
            "Try the Pomodoro technique: 25 mins work, 5 mins break",
            "Replace passive consumption with active learning platforms",
        ],
        "medium_distraction": [
            "Limit entertainment to specific time slots",
            "Use mindful entertainment consumption",
            "Combine learning with entertainment content",
            "Take strategic breaks with entertainment",
        ],
        "low_distraction": [
            "Maintain balanced leisure time",
            "Use entertainment as stress relief tool",
            "Continue your focused approach",
        ]
    },
    "social_media": {
        "high_distraction": [
            "Consider a social media detox period",
            "Disable push notifications from social apps",
            "Use app blockers during work hours",
            "Replace social scrolling with reading or learning",
            "Check social media only at scheduled times",
            "Unfollow accounts that trigger endless scrolling",
        ],
        "medium_distraction": [
            "Reduce social media check frequency",
            "Use muted notifications instead of active ones",
            "Set daily time limits on social apps",
            "Follow educational accounts instead",
        ],
        "low_distraction": [
            "Maintain healthy social media habits",
            "Use social networks for learning",
            "Network strategically on professional platforms",
        ]
    },
    "academic": {
        "high_focus": [
            "Create a structured learning roadmap with milestones",
            "Break your goal into weekly learning objectives",
            "Use spaced repetition for better retention",
            "Build projects to apply your knowledge",
            "Join study groups or communities",
            "Track your progress weekly",
        ],
        "medium_focus": [
            "Organize your learning materials",
            "Set daily learning time blocks",
            "Practice consistently with real-world problems",
            "Review and revise regularly",
        ],
        "low_focus": [
            "Start with fundamentals and basics",
            "Use visual learning resources",
            "Practice hands-on coding or projects",
        ]
    },
    "professional": {
        "high_focus": [
            "Create a professional development plan",
            "Identify key skills needed for your career goal",
            "Network with industry professionals",
            "Build a portfolio of your work",
            "Stay updated with industry trends",
            "Seek mentorship from experts",
        ],
        "medium_focus": [
            "Complete relevant certifications",
            "Attend industry conferences or webinars",
            "Contribute to open-source projects",
            "Document your achievements",
        ],
        "low_focus": [
            "Start with entry-level projects",
            "Build foundational skills first",
            "Connect with your professional community",
        ]
    },
    "health": {
        "high_focus": [
            "Create a realistic fitness schedule",
            "Track your health metrics regularly",
            "Find an accountability partner or group",
            "Combine nutrition and exercise planning",
            "Start small and build consistency",
            "Celebrate weekly milestones",
        ],
        "medium_focus": [
            "Schedule workouts at consistent times",
            "Track dietary improvements",
            "Get adequate sleep and recovery",
        ],
        "low_focus": [
            "Start with light daily activities",
            "Focus on building habits first",
            "Find activities you enjoy",
        ]
    },
    "creative": {
        "high_focus": [
            "Set daily creative practice time",
            "Study works by masters in your field",
            "Create portfolio pieces regularly",
            "Seek feedback from other creators",
            "Document your creative journey",
            "Collaborate with other artists",
        ],
        "medium_focus": [
            "Join creative communities",
            "Practice different techniques",
            "Maintain a creative journal",
        ],
        "low_focus": [
            "Start with simple projects",
            "Experiment with different mediums",
            "Draw inspiration from others",
        ]
    },
    "general": {
        "high_focus": [
            "Break your goal into smaller milestones",
            "Create a detailed action plan",
            "Track progress regularly",
            "Review and adjust your strategy",
            "Stay motivated with clear wins",
        ],
        "medium_focus": [
            "Set specific, measurable objectives",
            "Plan your weekly tasks",
            "Monitor your progress",
        ],
        "low_focus": [
            "Start with what you know",
            "Take one step at a time",
            "Build momentum gradually",
        ]
    }
}

# Distraction-specific suggestions
DISTRACTION_SUGGESTIONS = [
    "Focus on ONE goal at a time",
    "Eliminate multi-tasking to improve focus",
    "Use the Pomodoro technique for better concentration",
    "Create a distraction-free work environment",
    "Close unnecessary browser tabs and apps",
    "Silence notifications during work sessions",
]

# Noise reduction suggestions (high noise score)
NOISE_REDUCTION_SUGGESTIONS = [
    "Filter out non-essential information",
    "Use content blocking tools",
    "Create a focused content diet",
    "Schedule specific times for information intake",
    "Use curated learning resources",
    "Avoid information overload with quality over quantity",
]


def determine_focus_level(focus_score: int) -> str:
    """Determine focus level from score"""
    if focus_score >= 75:
        return "high_focus"
    elif focus_score >= 50:
        return "medium_focus"
    else:
        return "low_focus"


def generate_suggestions(goal: str, goal_type: str, relevance: int, noise: int, focus: int) -> List[str]:
    """
    Generate context-aware suggestions based on goal analysis
    """
    suggestions = []
    
    # Get appropriate suggestion bank
    if goal_type in SUGGESTION_DATABASE:
        focus_level = determine_focus_level(focus)
        type_suggestions = SUGGESTION_DATABASE[goal_type].get(focus_level, [])
        suggestions.extend(type_suggestions[:2])  # Add 2 type-specific suggestions
    
    # Add distraction-specific suggestions if needed
    if noise > 70:
        suggestions.append(NOISE_REDUCTION_SUGGESTIONS[noise % len(NOISE_REDUCTION_SUGGESTIONS)])
    
    if focus < 50:
        suggestions.append(DISTRACTION_SUGGESTIONS[focus % len(DISTRACTION_SUGGESTIONS)])
    
    # Add behavioral suggestions based on scores
    if focus < 40:
        suggestions.append("Start with a simple, focused mini-goal to build momentum")
    
    if noise > 75:
        suggestions.append("Design a minimal information diet to reduce overwhelm")
    
    if relevance < 50:
        suggestions.append("Clarify your goal to make it more specific and measurable")
    
    # Ensure we have at least 4 suggestions, max 6
    if len(suggestions) < 4:
        suggestions.extend([
            "Use the 2-minute rule: start with just 2 minutes daily",
            "Find an accountability partner or community",
            "Track your progress visually",
            "Create a vision board for motivation",
        ])
    
    return suggestions[:6]  # Return maximum 6 suggestions
