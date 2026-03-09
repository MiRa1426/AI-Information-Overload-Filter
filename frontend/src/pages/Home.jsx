import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import GamificationSystem from "../components/GamificationSystem";
import EntranceSplash from "../components/EntranceSplash";
import LoadingSpinner from "../components/LoadingSpinner";
import { analyzeGoal } from "../utils/api";
import { saveAnalysisToHistory, clearAnalysisHistory } from "../utils/storage";
import { COLORS } from "../constants/config";
import "../App.css";

function Home() {
  const [goal, setGoal] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!goal.trim()) {
      setError("Please enter a goal to analyze");
      return;
    }

    setError(null);
    setLoading(true);

    // Simulate minimum loading time for smooth animation
    const startTime = Date.now();
    const result = await analyzeGoal(goal);
    const elapsedTime = Date.now() - startTime;
    const minLoadingTime = 1000; // 1 second minimum
    
    if (elapsedTime < minLoadingTime) {
      await new Promise(resolve => 
        setTimeout(resolve, minLoadingTime - elapsedTime)
      );
    }

    setLoading(false);

    if (result.success) {
      setData(result.data);
      saveAnalysisToHistory(result.data);
      // Keep input visible - user can clear manually
    } else {
      setError(result.error || "Backend not connected! Make sure the server is running.");
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all analysis history? This action cannot be undone.")) {
      if (clearAnalysisHistory()) {
        setData(null);
        window.location.reload();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleAnalyze();
    }
  };

  return (
    <div>
      {/* Entrance Splash Screen */}
      <EntranceSplash />

      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1>AI Information Overload Filter</h1>
          <p className="header-subtitle">
            Analyze your learning goals and eliminate digital noise
          </p>
          {/* Accuracy Badge */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1.5rem",
            flexWrap: "wrap",
          }}>
            <div style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdrop: "blur(10px)",
              padding: "0.75rem 1.5rem",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#ffffff",
              fontSize: "0.9em",
              fontWeight: "600",
              animation: "fadeInUp 0.8s ease-out 0.4s backwards",
            }}>
              ✓ 90%+ Accuracy | Real-Time Analysis | AI-Powered
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Input Form */}
          <div className="form-container">
            <h2 style={{ marginTop: 0, color: COLORS.secondary, fontSize: "1.8em", fontWeight: "800", textShadow: `0 4px 15px ${COLORS.secondary}40` }}>Analyze Your Goal</h2>
              <label htmlFor="goalText" style={{ display: "block", textAlign: "left", marginBottom: "0.5rem", color: COLORS.secondary, fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.5px" }}>
                Your Goal
              </label>

              <textarea
                id="goalText"
                rows={5}
                className="input-field"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., Learn Python for data science and machine learning projects..."
                style={{ marginBottom: "1.5rem", resize: "vertical" }}
                disabled={loading}
              />

            {/* Error Message */}
            {error && (
              <div
                style={{
                  backgroundColor: "rgba(239,68,68,0.1)",
                  border: `2px solid ${COLORS.danger}`,
                  borderRadius: "12px",
                  padding: "1.2rem",
                  marginBottom: "1.5rem",
                  color: COLORS.danger,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  boxShadow: `0 4px 12px rgba(239, 68, 68, 0.15), 0 0 20px rgba(239, 68, 68, 0.1)`,
                  backdropFilter: "blur(5px)",
                  animation: "slideInUp 0.3s ease-out",
                }}
              >
                <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>!</span>
                <p style={{ margin: 0, fontSize: "0.95em", fontWeight: "500" }}>{error}</p>
              </div>
            )}

            <div className="button-group">
              <button
                onClick={handleAnalyze}
                className="btn btn-primary"
                disabled={loading || !goal.trim()}
                style={{ opacity: loading || !goal.trim() ? 0.6 : 1, minWidth: '180px' }}
              >
                {loading ? "Analyzing..." : "Analyze Goal"}
              </button>

              <button
                onClick={() => {
                  setGoal("");
                  setError(null);
                }}
                className="btn btn-secondary"
                disabled={loading}
                style={{ minWidth: '140px' }}
                title="Clear the input box (content stays after analysis)"
              >
                Clear Input
              </button>

              <button
                onClick={handleClearHistory}
                className="btn btn-tertiary"
                disabled={loading}
                style={{ minWidth: '150px' }}
              >
                Clear History
              </button>
            </div>

            {/* Loading Indicator */}
            {loading && <LoadingSpinner text="Analyzing your goal..." />}
          </div>

          {/* Gamification System */}
          {data && !loading && (
            <div style={{ marginTop: "3rem", marginBottom: "2rem" }}>
              <GamificationSystem analysisData={data} />
            </div>
          )}

          {/* Results Dashboard */}
          {data && !loading && <Dashboard data={data} />}
        </div>
      </div>
    </div>
  );
}

export default Home;
