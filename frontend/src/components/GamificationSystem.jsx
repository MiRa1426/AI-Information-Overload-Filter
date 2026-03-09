import React, { useState, useEffect } from "react";
import { COLORS } from "../constants/config";

function GamificationSystem({ analysisData }) {
  const [userStats, setUserStats] = useState(() => {
    const saved = localStorage.getItem("userGameStats");
    return saved ? JSON.parse(saved) : {
      totalAnalyzed: 0,
      currentStreak: 0,
      totalXP: 0,
      badges: [],
      lastAnalysisDate: null,
    };
  });

  const [confetti, setConfetti] = useState(false);
  const [newBadge, setNewBadge] = useState(null);

  // Badge definitions
  const badges = {
    firstAnalysis: { name: "First Step", icon: "🚀", xp: 50, condition: (stats) => stats.totalAnalyzed >= 1 },
    focusMaster: { name: "Focus Master", icon: "🎯", xp: 100, condition: (stats) => stats.totalAnalyzed >= 3 },
    goalCrusher: { name: "Goal Crusher", icon: "💪", xp: 150, condition: (stats) => stats.totalAnalyzed >= 10 },
    streakwarrior: { name: "Streak Warrior", icon: "🔥", xp: 200, condition: (stats) => stats.currentStreak >= 7 },
    perfectionSeeker: { name: "Perfection Seeker", icon: "⭐", xp: 250, condition: (stats) => stats.totalAnalyzed >= 25 },
    analysisAlchemist: { name: "Analysis Alchemist", icon: "🧪", xp: 300, condition: (stats) => stats.totalAnalyzed >= 50 },
    legendaryFocus: { name: "Legendary Focus", icon: "👑", xp: 500, condition: (stats) => stats.currentStreak >= 30 },
  };

  useEffect(() => {
    if (analysisData) {
      // Update stats
      const today = new Date().toDateString();
      const wasStreakToday = userStats.lastAnalysisDate === today;

      const newStats = {
        ...userStats,
        totalAnalyzed: userStats.totalAnalyzed + 1,
        currentStreak: wasStreakToday ? userStats.currentStreak : userStats.currentStreak + 1,
        lastAnalysisDate: today,
      };

      // Calculate XP based on goal quality
      let xpGain = 10; // Base XP
      if (analysisData.relevance > 80) xpGain += 20;
      if (analysisData.focus > 80) xpGain += 20;
      if (analysisData.noise < 30) xpGain += 15;

      newStats.totalXP += xpGain;

      // Check for new badges
      let earnedBadges = [];
      Object.entries(badges).forEach(([key, badge]) => {
        if (
          badge.condition(newStats) &&
          !userStats.badges.includes(key)
        ) {
          earnedBadges.push({ key, ...badge });
          newStats.totalXP += badge.xp;
        }
      });

      if (earnedBadges.length > 0) {
        newStats.badges = [...userStats.badges, ...earnedBadges.map(b => b.key)];
        setNewBadge(earnedBadges[0]); // Show first new badge
        setConfetti(true);
        setTimeout(() => setConfetti(false), 2000);
      }

      setUserStats(newStats);
      localStorage.setItem("userGameStats", JSON.stringify(newStats));
    }
  }, [analysisData]);

  // Calculate XP for next badge
  const xpForNextLevel = Math.ceil(userStats.totalXP / 100 + 1) * 100;
  const xpProgress = (userStats.totalXP % 100) / 100;

  const earnedBadgesList = userStats.badges.map(badgeKey => {
    const badgeData = badges[badgeKey];
    return badgeData ? { key: badgeKey, ...badgeData } : null;
  }).filter(Boolean);

  return (
    <div style={{ animation: "slideInDown 0.8s ease-out" }}>
      {/* Confetti Effect */}
      {confetti && <Confetti />}

      {/* New Badge Notification */}
      {newBadge && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
          padding: "1.5rem 2rem",
          borderRadius: "12px",
          color: "#ffffff",
          boxShadow: "0 8px 32px rgba(0, 35, 102, 0.4)",
          animation: "slideInRight 0.6s ease-out",
          zIndex: 1000,
          textAlign: "center",
          maxWidth: "280px",
        }}>
          <div style={{ fontSize: "2.5em", marginBottom: "0.5rem" }}>{newBadge.icon}</div>
          <div style={{ fontWeight: "700", fontSize: "1.1em" }}>🎉 New Badge!</div>
          <div style={{ fontSize: "0.95em", marginTop: "0.5rem" }}>{newBadge.name}</div>
          <div style={{ fontSize: "0.85em", marginTop: "0.3rem", opacity: 0.9 }}>+{newBadge.xp} XP</div>
        </div>
      )}

      {/* Gamification Cards Container */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
        animation: "fadeInUp 0.8s ease-out 0.2s backwards",
      }}>
        {/* XP Card */}
        <div className="card" style={{
          background: `linear-gradient(135deg, ${COLORS.primary}20 0%, ${COLORS.secondary}20 100%)`,
          border: `1px solid ${COLORS.secondary}`,
          textAlign: "center",
        }}>
          <div style={{ fontSize: "2.5em", marginBottom: "0.5rem" }}>⚡</div>
          <div style={{ fontSize: "0.85em", color: COLORS.textMuted, marginBottom: "0.5rem" }}>Total Experience</div>
          <div style={{ fontSize: "2em", fontWeight: "800", color: COLORS.secondary, marginBottom: "0.75rem" }}>
            {userStats.totalXP} XP
          </div>
          <div style={{
            height: "8px",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${xpProgress * 100}%`,
              background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
              transition: "width 0.5s ease",
            }} />
          </div>
          <div style={{ fontSize: "0.7em", color: COLORS.textMuted, marginTop: "0.5rem" }}>
            {userStats.totalXP % 100}/100 to level {Math.floor(userStats.totalXP / 100) + 1}
          </div>
        </div>

        {/* Streak Card */}
        <div className="card" style={{
          background: `linear-gradient(135deg, #FF6B6B20 0%, #FFD50020 100%)`,
          border: `1px solid #FFD500`,
          textAlign: "center",
        }}>
          <div style={{ fontSize: "2.5em", marginBottom: "0.5rem" }}>🔥</div>
          <div style={{ fontSize: "0.85em", color: COLORS.textMuted, marginBottom: "0.5rem" }}>Current Streak</div>
          <div style={{ fontSize: "2em", fontWeight: "800", color: "#FFD500", marginBottom: "0.5rem" }}>
            {userStats.currentStreak} days
          </div>
          <div style={{ fontSize: "0.75em", color: COLORS.textMuted }}>Keep it going! 💪</div>
        </div>

        {/* Analyzed Card */}
        <div className="card" style={{
          background: `linear-gradient(135deg, ${COLORS.primary}20 0%, ${COLORS.secondary}20 100%)`,
          border: `1px solid ${COLORS.primary}`,
          textAlign: "center",
        }}>
          <div style={{ fontSize: "2.5em", marginBottom: "0.5rem" }}>📊</div>
          <div style={{ fontSize: "0.85em", color: COLORS.textMuted, marginBottom: "0.5rem" }}>Goals Analyzed</div>
          <div style={{ fontSize: "2em", fontWeight: "800", color: COLORS.primary, marginBottom: "0.5rem" }}>
            {userStats.totalAnalyzed}
          </div>
          <div style={{ fontSize: "0.75em", color: COLORS.textMuted }}>On your journey 🚀</div>
        </div>
      </div>

      {/* Badges Section */}
      {earnedBadgesList.length > 0 && (
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.primary}10 0%, ${COLORS.secondary}10 100%)`,
          border: `1px solid ${COLORS.secondary}50`,
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem",
          animation: "slideInUp 0.8s ease-out 0.3s backwards",
        }}>
          <h3 style={{ marginTop: 0, marginBottom: "1.5rem", color: COLORS.secondary, textAlign: "center" }}>
            🏆 Your Achievements
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gap: "1rem",
          }}>
            {earnedBadgesList.map((badge, idx) => (
              <div
                key={badge.key}
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  borderRadius: "8px",
                  background: `lin-gradient(135deg, ${COLORS.primary}20 0%, ${COLORS.secondary}20 100%)`,
                  border: `1px solid ${COLORS.secondary}`,
                  animation: `popIn 0.5s ease-out ${idx * 0.1}s backwards`,
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <div style={{ fontSize: "2em", marginBottom: "0.3rem" }}>{badge.icon}</div>
                <div style={{ fontSize: "0.75em", fontWeight: "600", color: COLORS.text }}>{badge.name}</div>
                <div style={{ fontSize: "0.65em", color: COLORS.textMuted, marginTop: "0.2rem" }}>+{badge.xp} XP</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Unlockable Badges Preview */}
      {earnedBadgesList.length < Object.keys(badges).length && (
        <div style={{
          background: "rgba(0, 0, 0, 0.2)",
          borderRadius: "12px",
          padding: "1.5rem",
          animation: "fadeInUp 0.8s ease-out 0.4s backwards",
        }}>
          <p style={{ margin: "0 0 1rem 0", color: COLORS.textMuted, fontSize: "0.9em", textAlign: "center" }}>
            🔓 Unlock more badges by completing more goals!
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
            gap: "0.75rem",
          }}>
            {Object.entries(badges)
              .filter(([key]) => !userStats.badges.includes(key))
              .slice(0, 4)
              .map(([key, badge]) => (
                <div
                  key={key}
                  style={{
                    textAlign: "center",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px dashed rgba(255, 213, 0, 0.3)",
                    opacity: 0.5,
                  }}
                >
                  <div style={{ fontSize: "1.5em", opacity: 0.5 }}>{badge.icon}</div>
                  <div style={{ fontSize: "0.6em", color: COLORS.textMuted, marginTop: "0.2rem" }}>
                    {badge.name}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Confetti Component
function Confetti() {
  const confettiColors = ["#002366", "#FFD500", "#FF6B6B", "#00D4FF"];
  
  return (
    <>
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            left: Math.random() * 100 + "%",
            top: "-10px",
            width: "10px",
            height: "10px",
            background: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            borderRadius: "50%",
            animation: `confettiFall 2s ease-out forwards`,
            animationDelay: Math.random() * 0.2 + "s",
            pointerEvents: "none",
            zIndex: 999,
          }}
        />
      ))}
    </>
  );
}

export default GamificationSystem;
