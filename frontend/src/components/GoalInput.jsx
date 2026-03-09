import { useState } from "react";
import { COLORS } from "../constants/config";

function GoalInput({ onAnalyze, loading = false }) {
  const [goal, setGoal] = useState("");

  const handleSubmit = () => {
    if (!goal.trim()) {
      alert("Please enter a goal");
      return;
    }
    onAnalyze(goal);
  };

  const handleClear = () => {
    setGoal("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "1rem",
        background: `linear-gradient(135deg, #ffffff 0%, #ffffff 100%)`,
        borderRadius: "12px",
        border: `1px solid rgba(15,23,42,0.04)`,
      }}
    >
      <label htmlFor="goalInput" style={{ textAlign: "left", color: COLORS.textMuted, fontWeight: 600 }}>
        Describe your learning goal
      </label>
      <textarea
        id="goalInput"
        rows={4}
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="e.g., Learn Python for data science and machine learning projects..."
        className="input-field"
        style={{ resize: "vertical" }}
        disabled={loading}
      />

      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
        <button onClick={handleClear} className="btn btn-secondary" disabled={loading}>
          Clear
        </button>
        <button onClick={handleSubmit} className="btn btn-primary" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Goal"}
        </button>
      </div>

      {/* Decorative chips to match original look */}
      <div style={{ display: "flex", gap: 16, marginTop: 18, justifyContent: "flex-start" }}>
        <div style={{ padding: "12px 28px", borderRadius: 10, background: "#ffffff", boxShadow: "0 12px 30px rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.06)", color: "#2563eb" }}>⚡</div>
        <div style={{ padding: "12px 28px", borderRadius: 10, background: "#ffffff", boxShadow: "0 12px 30px rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.04)", color: "#ef4444" }}>🗑️</div>
        <div style={{ padding: "12px 28px", borderRadius: 10, background: "#ffffff", boxShadow: "0 12px 30px rgba(124,58,237,0.04)", border: "1px solid rgba(124,58,237,0.04)", color: "#7c3aed" }}>🔁</div>
      </div>
    </div>
  );
}

export default GoalInput;
