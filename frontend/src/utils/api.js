import axios from "axios";
import { API_ENDPOINTS } from "../constants/config";

const apiClient = axios.create({
  baseURL: API_ENDPOINTS.ANALYZE,
  timeout: 10000,
});

export const analyzeGoal = async (goal) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.ANALYZE, {
      goal: goal.trim(),
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      error: error.response?.data?.detail || "Failed to analyze goal. Please try again.",
    };
  }
};

export default apiClient;
