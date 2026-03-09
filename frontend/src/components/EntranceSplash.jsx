import React, { useState } from "react";
import { COLORS } from "../constants/config";

function EntranceSplash() {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `linear-gradient(135deg, #000a1f 0%, #0a1f42 30%, #001a4d 60%, #002366 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        animation: clicked ? "fadeOut 0.8s ease-in forwards" : "none",
        pointerEvents: clicked ? "none" : "auto",
      }}
    >
      {/* Animated Background Grid */}
      <GridBackground />

      {/* Floating Particles */}
      <ParticleField />

      {/* Main Interactive Element */}
      <div
        onClick={() => setClicked(true)}
        style={{
          textAlign: "center",
          zIndex: 10,
          cursor: "pointer",
          animation: clicked ? "none" : "slideInCenter 0.9s ease-out",
        }}
      >
        {/* Animated Geometric Shape Container */}
        <div
          style={{
            position: "relative",
            width: "300px",
            height: "300px",
            margin: "0 auto 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Rotating Ring 1 */}
          <div
            style={{
              position: "absolute",
              width: "280px",
              height: "280px",
              border: `2px solid ${COLORS.secondary}40`,
              borderRadius: "50%",
              animation: "spin 8s linear infinite",
              top: "10px",
              left: "10px",
            }}
          />

          {/* Rotating Ring 2 */}
          <div
            style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              border: `2px dashed ${COLORS.primary}60`,
              borderRadius: "50%",
              animation: "spinReverse 12s linear infinite",
              top: "50px",
              left: "50px",
            }}
          />

          {/* Central Pulsing Element */}
          <div
            style={{
              position: "relative",
              width: "120px",
              height: "120px",
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "pulseScale 2s ease-in-out infinite",
              boxShadow: `0 0 40px ${COLORS.secondary}80, 0 0 80px ${COLORS.primary}40`,
              zIndex: 11,
              transform: "rotate(45deg)",
            }}
          >
            <div
              style={{
                fontSize: "3.5em",
                animation: "float 3s ease-in-out infinite",
                transform: "rotate(-45deg)",
              }}
            >
              ⚡
            </div>
          </div>

          {/* Corner Accents */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "20px",
                height: "20px",
                background: COLORS.secondary,
                animation: `cornerPulse 1.5s ease-in-out infinite ${i * 0.375}s`,
                fontSize: "10px",
                ...getCornerPosition(i),
              }}
            />
          ))}
        </div>

        {/* Main Title */}
        <h1
          style={{
            fontSize: "2.5em",
            fontWeight: "900",
            color: COLORS.secondary,
            margin: "1.5rem 0 0.5rem 0",
            animation: "slideInDown 0.8s ease-out 0.1s backwards",
            textShadow: `0 0 20px ${COLORS.secondary}80, 0 4px 15px rgba(0,0,0,0.5)`,
            letterSpacing: "1px",
          }}
        >
          AI Filter
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "1.1em",
            color: COLORS.textMuted,
            margin: "0.5rem 0 2rem 0",
            animation: "slideInUp 0.8s ease-out 0.2s backwards",
            fontWeight: "500",
            letterSpacing: "0.5px",
          }}
        >
          Eliminate Information Overload
        </p>

        {/* Interactive Button/Text */}
        <div
          style={{
            fontSize: "1em",
            color: COLORS.secondary,
            marginBottom: "1.5rem",
            animation: "pulse 1.5s ease-in-out infinite 0.5s",
            fontWeight: "700",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          ← Click to Enter ↓
        </div>

        {/* Animated Underline */}
        <div
          style={{
            width: "200px",
            height: "2px",
            background: `linear-gradient(90deg, transparent 0%, ${COLORS.secondary} 50%, transparent 100%)`,
            margin: "1.5rem auto",
            animation: "slideWidth 1.5s ease-in-out infinite",
          }}
        />

        {/* Feature Badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
            marginTop: "2rem",
            animation: "slideInUp 0.8s ease-out 0.3s backwards",
          }}
        >
          {["🤖 AI Powered", "⚡ Real-Time", "🏆 Gamified"].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "0.5rem 1rem",
                border: `1px solid ${COLORS.secondary}50`,
                borderRadius: "20px",
                fontSize: "0.85em",
                color: COLORS.secondary,
                backdropFilter: "blur(10px)",
                animation: `badgeBounce 2s ease-in-out infinite ${i * 0.2}s`,
                fontWeight: "600",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeOut {
          to {
            opacity: 0;
            pointer-events: none;
          }
        }

        @keyframes slideInCenter {
          from {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes pulseScale {
          0%, 100% {
            transform: rotate(45deg) scale(1);
            opacity: 1;
          }
          50% {
            transform: rotate(45deg) scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: rotate(-45deg) translateY(0);
          }
          50% {
            transform: rotate(-45deg) translateY(-10px);
          }
        }

        @keyframes cornerPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes slideWidth {
          0%, 100% {
            width: 100px;
          }
          50% {
            width: 250px;
          }
        }

        @keyframes badgeBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}

// Grid Background Component
function GridBackground() {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.1,
        zIndex: 0,
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(255, 213, 0, 0.1) 25%, rgba(255, 213, 0, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 213, 0, 0.1) 75%, rgba(255, 213, 0, 0.1) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(255, 213, 0, 0.1) 25%, rgba(255, 213, 0, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 213, 0, 0.1) 75%, rgba(255, 213, 0, 0.1) 76%, transparent 77%, transparent)
        `,
        backgroundSize: "50px 50px",
        animation: "gridShift 20s linear infinite",
      }}
    >
      <style>{`
        @keyframes gridShift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 50px 50px;
          }
        }
      `}</style>
    </div>
  );
}

// Particle Field Component
function ParticleField() {
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: 1 }}>
      {[...Array(50)].map((_, i) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDuration = 5 + Math.random() * 10;
        const randomDelay = Math.random() * 2;
        const randomSize = 2 + Math.random() * 4;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: randomSize + "px",
              height: randomSize + "px",
              backgroundColor: ["#FFD500", "#002366", "#00D4FF"][Math.floor(Math.random() * 3)],
              borderRadius: "50%",
              left: randomX + "%",
              top: randomY + "%",
              opacity: 0.3 + Math.random() * 0.4,
              animation: `float${i} ${randomDuration}s ease-in-out ${randomDelay}s infinite`,
              pointerEvents: "none",
            }}
            key={`particle-${i}`}
          >
            <style>{`
              @keyframes float${i} {
                0%, 100% {
                  transform: translateY(0) translateX(0);
                }
                25% {
                  transform: translateY(-30px) translateX(${Math.random() * 20 - 10}px);
                }
                50% {
                  transform: translateY(-60px) translateX(${Math.random() * 30 - 15}px);
                }
                75% {
                  transform: translateY(-30px) translateX(${Math.random() * 20 - 10}px);
                }
              }
            `}</style>
          </div>
        );
      })}
    </div>
  );
}

// Helper function for corner positions
function getCornerPosition(index) {
  const positions = [
    { top: "0px", left: "0px" },
    { top: "0px", right: "0px" },
    { bottom: "0px", left: "0px" },
    { bottom: "0px", right: "0px" },
  ];
  return positions[index];
}

export default EntranceSplash;

