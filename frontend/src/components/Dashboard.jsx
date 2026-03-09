import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { COLORS, GOAL_TYPES, EMOJIS, UI_CONFIG } from "../constants/config";
import { getAnalysisHistory } from "../utils/storage";

function Dashboard({ data }) {
  // Helper function to get color based on score
  const getScoreColor = (score) => {
    if (score >= 75) return COLORS.success;
    if (score >= 50) return COLORS.warning;
    return COLORS.danger;
  };

  // Helper function to get score interpretation
  const getScoreInterpretation = (score) => {
    if (score >= 75) return "Excellent";
    if (score >= 50) return "Good";
    return "Needs Improvement";
  };

  // Score Card Component with enhanced animations
  const ScoreCard = ({ label, score, emoji }) => (
    <div
      style={{
        background: `linear-gradient(135deg, rgba(92, 39, 81, 0.15) 0%, rgba(212, 175, 55, 0.1) 100%)`,
        border: `2px solid ${COLORS.border}`,
        borderRadius: "16px",
        padding: "2rem",
        margin: "1rem 0",
        textAlign: "center",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        animation: "slideInUp 0.6s ease-out forwards",
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
        e.currentTarget.style.boxShadow = "0 20px 50px rgba(92, 39, 81, 0.3), 0 0 30px rgba(212, 175, 55, 0.2)";
        e.currentTarget.style.borderColor = COLORS.secondary;
        e.currentTarget.style.background = `linear-gradient(135deg, rgba(92, 39, 81, 0.25) 0%, rgba(212, 175, 55, 0.2) 100%)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(92, 39, 81, 0.15)";
        e.currentTarget.style.borderColor = COLORS.border;
        e.currentTarget.style.background = `linear-gradient(135deg, rgba(92, 39, 81, 0.15) 0%, rgba(212, 175, 55, 0.1) 100%)`;
      }}
    >
      <p style={{ color: COLORS.textMuted, fontSize: "0.9em", marginBottom: "0.75rem", fontWeight: "500", margin: "0 0 0.75rem 0", textTransform: "uppercase", letterSpacing: "1px" }}>
        {label}
      </p>
      <div style={{ fontSize: "3.5em", fontWeight: "800", marginBottom: "0.5rem", background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "countUp 0.8s ease-out 0.3s backwards", textShadow: "0 0 30px rgba(92, 39, 81, 0.3)" }}>
        {score}%
      </div>
      <p style={{ color: COLORS.secondary, fontSize: "0.85em", fontWeight: "700", margin: "0.75rem 0 1.25rem 0", letterSpacing: "0.5px", textShadow: "0 2px 8px rgba(212, 175, 55, 0.2)" }}>
        {getScoreInterpretation(score).toUpperCase()}
      </p>

      {/* Animated Progress Bar */}
      <div
        style={{
          width: "100%",
          height: "8px",
          backgroundColor: `rgba(92, 39, 81, 0.2)`,
          borderRadius: "4px",
          marginTop: "1.5rem",
          overflow: "hidden",
          boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 10px rgba(92, 39, 81, 0.2)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${score}%`,
            background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
            transition: "width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
            borderRadius: "4px",
            boxShadow: `0 0 15px ${COLORS.primary}, 0 0 8px ${COLORS.secondary}`,
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      {/* Main Analysis Card - Enhanced */}
      <div className="card" style={{ marginBottom: "2.5rem", animation: "slideInUp 0.7s ease-out" }}>
        {/* Header with Goal Type and Confidence */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2.5rem",
            paddingBottom: "2rem",
            borderBottom: `2px solid ${COLORS.border}`,
            gap: "2rem",
            flexWrap: "wrap",
            animation: "fadeInDown 0.7s ease-out 0.1s backwards",
          }}
        >
          <div style={{ flex: 1, minWidth: "250px" }}>
            <h2 style={{ marginTop: 0, marginBottom: "0.5rem", color: COLORS.secondary, fontSize: "1.8em", fontWeight: "800", letterSpacing: "0.5px", textShadow: "0 4px 15px rgba(212, 175, 55, 0.2)" }}>Analysis Results</h2>
            <div style={{ 
              display: "inline-block",
              background: `linear-gradient(135deg, rgba(92, 39, 81, 0.2) 0%, rgba(212, 175, 55, 0.15) 100%)`,
              padding: "0.75rem 1.5rem",
              borderRadius: "10px",
              border: `2px solid ${COLORS.secondary}`,
              marginTop: "0.75rem",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 16px rgba(212, 175, 55, 0.15)",
              transition: "all 0.3s ease",
            }}>
              <p style={{ margin: 0, color: COLORS.textMuted, fontSize: "0.8em", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>
                Goal Type
              </p>
              <p style={{ margin: 0, color: COLORS.secondary, fontSize: "1.4em", fontWeight: "900", letterSpacing: "0.5px", textShadow: "0 2px 10px rgba(212, 175, 55, 0.3)" }}>
                {GOAL_TYPES[data.goal_type] || data.goal_type}
              </p>
            </div>
          </div>
          <div
            style={{
              textAlign: "right",
              background: `linear-gradient(135deg, rgba(92, 39, 81, 0.2) 0%, rgba(212, 175, 55, 0.15) 100%)`,
              padding: "1.5rem 2rem",
              borderRadius: "14px",
              border: `2px solid ${COLORS.accent}`,
              minWidth: "160px",
              animation: "scaleIn 0.7s ease-out 0.2s backwards",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 24px rgba(212, 175, 55, 0.15), 0 0 20px rgba(212, 175, 55, 0.1)",
              transition: "all 0.3s ease",
            }}
          >
            <p style={{ margin: 0, color: COLORS.textMuted, fontSize: "0.85em", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>
              Accuracy Score
            </p>
            <div style={{ fontSize: "2.8em", fontWeight: "900", background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.secondary} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", textShadow: "0 0 30px rgba(212, 175, 55, 0.3)" }}>
              {data.confidence || 85}%
            </div>
          </div>
        </div>

        {/* Main Message - Enhanced with Real-time Stats */}
        <div
          style={{
            fontSize: "1.05em",
            color: COLORS.text,
            lineHeight: "1.8",
            marginBottom: "2.75rem",
            padding: "2rem",
            background: `linear-gradient(135deg, rgba(92, 39, 81, 0.15) 0%, rgba(212, 175, 55, 0.1) 100%)`,
            borderRadius: "14px",
            borderLeft: `5px solid ${COLORS.secondary}`,
            fontWeight: "500",
            animation: "fadeInUp 0.7s ease-out 0.2s backwards",
            boxShadow: "0 8px 20px rgba(92, 39, 81, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: `2px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p style={{ margin: "0 0 0.5rem 0", color: COLORS.textMuted, fontSize: "0.9em", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Analysis Result
                </p>
                <p style={{ margin: 0, color: COLORS.text, fontSize: "1em", fontWeight: "600" }}>
                  {data.message ? data.message.split('\n')[0] : "Analysis Complete"}
                </p>
              </div>
              <div style={{
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "0.95em",
                boxShadow: `0 4px 12px rgba(212, 175, 55, 0.3)`,
              }}>
                ✓ {data.confidence || 85}% Accuracy
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ padding: "0.75rem", background: `rgba(92, 39, 81, 0.1)`, borderRadius: "8px", borderLeft: `3px solid ${COLORS.primary}` }}>
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.85em", color: COLORS.textMuted, fontWeight: "600" }}>Signal Quality</p>
              <p style={{ margin: 0, fontSize: "1.2em", color: COLORS.primary, fontWeight: "700" }}>{100 - (data.noise || 40)}% Pure</p>
            </div>
            <div style={{ padding: "0.75rem", background: `rgba(212, 175, 55, 0.1)`, borderRadius: "8px", borderLeft: `3px solid ${COLORS.secondary}` }}>
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.85em", color: COLORS.textMuted, fontWeight: "600" }}>Goal Type</p>
              <p style={{ margin: 0, fontSize: "1.2em", color: COLORS.secondary, fontWeight: "700" }}>{(data.goal_type || "general").replace('_', ' ').toUpperCase()}</p>
            </div>
            {data.timestamp && (
              <div style={{ padding: "0.75rem", background: `rgba(212, 175, 55, 0.1)`, borderRadius: "8px", borderLeft: `3px solid ${COLORS.accent}` }}>
                <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.85em", color: COLORS.textMuted, fontWeight: "600" }}>Real-Time Analysis</p>
                <p style={{ margin: 0, fontSize: "0.9em", color: COLORS.accent, fontWeight: "600" }}>{new Date(data.timestamp).toLocaleTimeString()}</p>
              </div>
            )}
          </div>
        </div>

        {/* Score Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            marginTop: "2.5rem",
          }}
        >
          <ScoreCard label="Relevance" score={data.relevance} emoji={EMOJIS.relevance} />
          <ScoreCard label="Noise Reduction" score={data.noise} emoji={EMOJIS.noise} />
          <ScoreCard label="Focus" score={data.focus} emoji={EMOJIS.focus} />
        </div>

        {/* Enhanced Charts Section - Pie Chart Only */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3rem",
            padding: "2.5rem 0",
            borderTop: `1px solid ${COLORS.border}`,
            animation: "fadeInUp 0.8s ease-out 0.4s backwards",
          }}
        >
          {/* Pie Chart */}
          <div style={{ textAlign: "center", width: "100%", maxWidth: "500px" }}>
            <h3 style={{ marginTop: 0, marginBottom: "2rem", color: COLORS.text, fontSize: "1.3em", fontWeight: "700", letterSpacing: "0.5px" }}>Score Distribution</h3>
            <div style={{ position: "relative", animation: "scaleIn 0.8s ease-out 0.5s backwards" }}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Relevance", value: data.relevance, fill: COLORS.primary },
                      { name: "Noise Reduction", value: data.noise, fill: COLORS.secondary },
                      { name: "Focus", value: data.focus, fill: COLORS.success },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={6}
                    dataKey="value"
                    animationBegin={600}
                    animationDuration={800}
                    animationEasing="ease-out"
                  >
                    <Cell fill={COLORS.primary} />
                    <Cell fill={COLORS.secondary} />
                    <Cell fill={COLORS.success} />
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: `2px solid ${COLORS.primary}`,
                      borderRadius: "12px",
                      color: "#ffffff",
                      boxShadow: "0 12px 30px rgba(16, 185, 129, 0.35), 0 0 20px rgba(52, 211, 153, 0.2)",
                      padding: "14px 18px",
                      backdropFilter: "blur(10px)",
                      fontSize: "1.05em",
                      fontWeight: "700",
                      textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                    }}
                    labelStyle={{ color: "#ffffff" }}
                    itemStyle={{ color: "#ffffff" }}
                    formatter={(value) => `${value}%`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginTop: "2.5rem", animation: "fadeInUp 0.8s ease-out 0.6s backwards" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem 1.5rem", background: `rgba(${parseInt(COLORS.primary.slice(1,3), 16)}, ${parseInt(COLORS.primary.slice(3,5), 16)}, ${parseInt(COLORS.primary.slice(5,7), 16)}, 0.15)`, borderRadius: "8px", border: `1.5px solid ${COLORS.primary}` }}>
                <div style={{ width: "16px", height: "16px", backgroundColor: COLORS.primary, borderRadius: "3px" }} />
                <span style={{ fontSize: "1.05em", color: "#ffffff", fontWeight: "700", textShadow: `0 2px 4px ${COLORS.primary}80` }}>Relevance</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem 1.5rem", background: `rgba(${parseInt(COLORS.secondary.slice(1,3), 16)}, ${parseInt(COLORS.secondary.slice(3,5), 16)}, ${parseInt(COLORS.secondary.slice(5,7), 16)}, 0.15)`, borderRadius: "8px", border: `1.5px solid ${COLORS.secondary}` }}>
                <div style={{ width: "16px", height: "16px", backgroundColor: COLORS.secondary, borderRadius: "3px" }} />
                <span style={{ fontSize: "1.05em", color: "#ffffff", fontWeight: "700", textShadow: `0 2px 4px ${COLORS.secondary}80` }}>Noise</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem 1.5rem", background: `rgba(${parseInt(COLORS.focus.slice(1,3), 16)}, ${parseInt(COLORS.focus.slice(3,5), 16)}, ${parseInt(COLORS.focus.slice(5,7), 16)}, 0.15)`, borderRadius: "8px", border: `1.5px solid ${COLORS.focus}` }}>
                <div style={{ width: "16px", height: "16px", backgroundColor: COLORS.focus, borderRadius: "3px" }} />
                <span style={{ fontSize: "1.05em", color: "#ffffff", fontWeight: "700", textShadow: `0 2px 4px ${COLORS.focus}80` }}>Focus</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestions - Enhanced */}
      <div className="card" style={{ marginBottom: "2rem", animation: "fadeInUp 0.8s ease-out 0.7s backwards" }}>
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <h2 style={{ marginTop: 0, marginBottom: 0, color: COLORS.secondary, fontSize: "1.4em", fontWeight: "800", letterSpacing: "0.5px", textShadow: `0 2px 10px ${COLORS.secondary}40` }}>
              🤖 AI-Powered Recommendations
            </h2>
            <span style={{
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
              color: "#ffffff",
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              fontSize: "0.85em",
              fontWeight: "700",
              whiteSpace: "nowrap",
            }}>
              Personalized{data.confidence && ` • ${data.confidence}% Match`}
            </span>
          </div>
          <p style={{ color: COLORS.textMuted, marginBottom: "1.75rem", margin: 0, fontSize: "0.95em" }}>
            Smart strategies tailored to your goal type and current situation
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {data.suggestions && data.suggestions.length > 0 ? (
              data.suggestions.map((item, index) => {
                // Determine priority indicator
                let indicator = "◆";
                let indicatorColor = COLORS.primary;
                if (index === 0) {
                  indicator = "★";
                  indicatorColor = "#FFD700";
                } else if (index === 1) {
                  indicator = "⬤";
                  indicatorColor = COLORS.secondary;
                }
                
                return (
                  <li
                    key={index}
                    style={{
                        background: `linear-gradient(135deg, rgba(92, 39, 81, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)`,
                        border: `1.5px solid ${COLORS.border}`,
                        borderRadius: "12px",
                        padding: "1.25rem",
                        marginBottom: "1rem",
                        color: COLORS.text,
                        lineHeight: "1.7",
                        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "1.25rem",
                        position: "relative",
                        overflow: "hidden",
                        animation: `slideInLeft 0.6s ease-out ${0.15 + index * 0.1}s backwards`,
                        backdropFilter: "blur(5px)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = COLORS.secondary;
                        e.currentTarget.style.background = `linear-gradient(135deg, rgba(92, 39, 81, 0.2) 0%, rgba(212, 175, 55, 0.15) 100%)`;
                        e.currentTarget.style.transform = "translateX(8px)";
                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(92, 39, 81, 0.2), 0 0 15px rgba(212, 175, 55, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = COLORS.border;
                        e.currentTarget.style.background = `linear-gradient(135deg, rgba(92, 39, 81, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)`;
                        e.currentTarget.style.transform = "translateX(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <span style={{ fontSize: "1.3em", flexShrink: 0, color: indicatorColor, fontWeight: "800", textShadow: `0 0 8px ${indicatorColor}40`, marginTop: "0.2rem" }}>
                        {indicator}
                      </span>
                      <span style={{ fontSize: "0.95em", fontWeight: "500", flex: 1 }}>
                        {item}
                      </span>
                    </li>
                );
              })
            ) : (
              <p style={{ color: COLORS.textMuted }}>No suggestions available</p>
            )}
          </ul>
        </div>
      </div>

      {/* Previous Analysis History - Enhanced */}
      <div className="card" style={{ animation: "fadeInUp 0.8s ease-out 0.85s backwards" }}>
        <div style={{ textAlign: "left" }}>
          <h2 style={{ marginTop: 0, marginBottom: "0.25rem", color: COLORS.secondary, fontSize: "1.4em", fontWeight: "800", letterSpacing: "0.5px", textShadow: `0 2px 10px ${COLORS.secondary}40` }}>Analysis History</h2>
          <p style={{ color: COLORS.textMuted, marginBottom: "1.75rem", margin: 0, fontSize: "0.95em" }}>
            Last 5 goal analyses
          </p>
          <div className="history-container" style={{ borderTop: "none", marginTop: 0, paddingTop: 0 }}>
            {getAnalysisHistory().length > 0 ? (
              getAnalysisHistory()
                .slice(0, 5)
                .map((item, index) => (
                  <div 
                    key={item.id || index} 
                    className="history-item"
                    style={{
                      background: `linear-gradient(135deg, rgba(92, 39, 81, 0.1) 0%, rgba(92, 39, 81, 0.8) 100%)`,
                      border: `1.5px solid ${COLORS.border}`,
                      borderLeft: `4px solid ${COLORS.secondary}`,
                      borderRadius: "12px",
                      padding: "1.5rem",
                      marginBottom: "1rem",
                      transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      animation: `slideInLeft 0.6s ease-out ${0.3 + index * 0.08}s backwards`,
                      backdropFilter: "blur(5px)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderLeftColor = COLORS.secondary;
                      e.currentTarget.style.borderColor = `rgba(212, 175, 55, 0.5)`;
                      e.currentTarget.style.transform = "translateX(8px)";
                      e.currentTarget.style.boxShadow = "0 12px 30px rgba(92, 39, 81, 0.25), 0 0 20px rgba(212, 175, 55, 0.15)";
                      e.currentTarget.style.background = `linear-gradient(135deg, rgba(92, 39, 81, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderLeftColor = COLORS.secondary;
                      e.currentTarget.style.borderColor = COLORS.border;
                      e.currentTarget.style.transform = "translateX(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(92, 39, 81, 0.15)";
                      e.currentTarget.style.background = `linear-gradient(135deg, rgba(92, 39, 81, 0.1) 0%, rgba(92, 39, 81, 0.8) 100%)`;
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "1rem" }}>
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <p style={{ marginBottom: "0.75rem", color: COLORS.text, fontWeight: "600", fontSize: "0.95em" }}>
                          {item.message}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            gap: "2rem",
                            fontSize: "0.85em",
                            flexWrap: "wrap",
                          }}
                        >
                          <span style={{ color: COLORS.textMuted, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <strong style={{ color: COLORS.primary }}>Relevance: {item.relevance}%</strong>
                          </span>
                          <span style={{ color: COLORS.textMuted, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <strong style={{ color: COLORS.secondary }}>Noise: {item.noise}%</strong>
                          </span>
                          <span style={{ color: COLORS.textMuted, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <strong style={{ color: COLORS.success }}>Focus: {item.focus}%</strong>
                          </span>
                        </div>
                        {item.timestamp && (
                          <p style={{ marginTop: "0.75rem", color: COLORS.textMuted, fontSize: "0.75em", fontStyle: "italic" }}>
                            {new Date(item.timestamp).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p style={{ color: COLORS.textMuted, animation: "fadeIn 0.8s ease-out 0.4s backwards" }}>
                No history yet. Analyze your first goal!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
