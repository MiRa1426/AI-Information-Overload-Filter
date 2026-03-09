import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // backend URL
});

export const analyzeGoal = (goal) =>
  API.post("/analyze", { goal });
