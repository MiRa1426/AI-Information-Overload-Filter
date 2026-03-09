import { STORAGE_KEYS, UI_CONFIG } from "../constants/config";

/**
 * Get analysis history from localStorage
 */
export const getAnalysisHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.ANALYSIS_HISTORY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Error reading history:", error);
    return [];
  }
};

/**
 * Save analysis to history
 */
export const saveAnalysisToHistory = (analysis) => {
  try {
    const history = getAnalysisHistory();
    
    // Add timestamp
    const analysisWithTimestamp = {
      ...analysis,
      timestamp: new Date().toISOString(),
      id: Date.now(),
    };
    
    // Add to beginning
    history.unshift(analysisWithTimestamp);
    
    // Keep only max items
    const limitedHistory = history.slice(0, UI_CONFIG.MAX_HISTORY_ITEMS * 2);
    
    localStorage.setItem(STORAGE_KEYS.ANALYSIS_HISTORY, JSON.stringify(limitedHistory));
    return true;
  } catch (error) {
    console.error("Error saving history:", error);
    return false;
  }
};

/**
 * Clear analysis history
 */
export const clearAnalysisHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.ANALYSIS_HISTORY);
    return true;
  } catch (error) {
    console.error("Error clearing history:", error);
    return false;
  }
};

/**
 * Delete specific history item
 */
export const deleteHistoryItem = (id) => {
  try {
    const history = getAnalysisHistory();
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.ANALYSIS_HISTORY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Error deleting history item:", error);
    return false;
  }
};

/**
 * Export history as CSV
 */
export const exportHistoryAsCSV = () => {
  try {
    const history = getAnalysisHistory();
    const csv = [
      ["Goal", "Relevance", "Noise", "Focus", "Type", "Timestamp"],
      ...history.map(item => [
        item.message,
        item.relevance,
        item.noise,
        item.focus,
        item.goal_type || "N/A",
        new Date(item.timestamp).toLocaleString(),
      ]),
    ];
    
    const csvString = csv.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `analysis-history-${new Date().toISOString()}.csv`;
    link.click();
  } catch (error) {
    console.error("Error exporting history:", error);
  }
};
