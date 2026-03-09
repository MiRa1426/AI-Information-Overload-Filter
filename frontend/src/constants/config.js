// API Configuration
export const API_BASE_URL = "http://127.0.0.1:8000";
export const API_ENDPOINTS = {
  ANALYZE: `${API_BASE_URL}/analyze`,
  HEALTH: `${API_BASE_URL}/`,
};

// Colors - Premium Teal & Rose Gold theme
export const COLORS = {
  // Primary palette
  primary: "#0D3B66",      // Deep Teal
  secondary: "#F18F01",    // Rose Gold
  success: "#F18F01",      // Rose Gold (positive)
  focus: "#EAE2B7",        // Cream (focus/highlight)
  warning: "#FFB703",      // Warm Amber
  danger: "#E76F51",       // Terracotta Red
  accent: "#2A9D8F",       // Teal Accent
  // Background and surface shades
  bg: "#0D3B66",           // Deep Teal Background
  bgLight: "#1B5E8F",      // Lighter Teal for layering
  bgMid: "#EAE2B7",        // Cream mid tone
  surface: "#051E2D",      // Very dark teal surface
  surfaceLight: "#1B5E8F", // Lighter teal
  surfaceSoft: "rgba(241, 143, 1, 0.12)",
  // Text
  textLight: "#EAE2B7",
  text: "#EAE2B7",
  textMuted: "rgba(234, 226, 183, 0.75)",
  // Accents / borders
  border: "rgba(241, 143, 1, 0.3)",
  borderSoft: "rgba(241, 143, 1, 0.15)",
};

// Score Ranges and Interpretations
export const SCORE_CONFIG = {
  excellent: { min: 75, label: "Excellent", color: COLORS.success },
  good: { min: 50, max: 74, label: "Good", color: COLORS.warning },
  needsImprovement: { max: 49, label: "Needs Improvement", color: COLORS.danger },
};

// Goal Types
export const GOAL_TYPES = {
  entertainment: "Entertainment",
  social_media: "Social Media",
  academic: "Academic",
  professional: "Professional",
  health: "Health",
  creative: "Creative",
  general: "General",
};

// Emojis
export const EMOJIS = {
  relevance: "🎯",
  noise: "🔇",
  focus: "🔍",
  loading: "⚡",
  success: "✨",
  suggestions: "💡",
  history: "🕒",
  chart: "📊",
  distribution: "📈",
  comparison: "📊",
};

// Animation timing (milliseconds)
export const ANIMATION_TIMING = {
  loading: 500,
  fadeIn: 500,
  slideDown: 500,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  ANALYSIS_HISTORY: "analysisHistory",
  USER_PREFERENCES: "userPreferences",
};

// UI Constants
export const UI_CONFIG = {
  MAX_HISTORY_ITEMS: 5,
  MOBILE_BREAKPOINT: 768,
  CARD_BORDER_RADIUS: "12px",
  SHADOW_LIGHT: "0 4px 15px rgba(0, 0, 0, 0.1)",
  SHADOW_MEDIUM: "0 10px 40px rgba(0, 0, 0, 0.3)",
  SHADOW_HEAVY: "0 15px 50px rgba(59, 130, 246, 0.15)",
};
