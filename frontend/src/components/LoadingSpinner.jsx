import React from "react";
import { COLORS } from "../constants/config";

export function LoadingSpinner({ text = "Analyzing..." }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        padding: "4rem 2rem",
        animation: "fadeIn 0.5s ease-out",
      }}
    >
      {/* Enhanced Animated Spinner */}
      <div
        style={{
          position: "relative",
          width: "80px",
          height: "80px",
        }}
      >
        {/* Outer glowing ring */}
        <div
          style={{
            position: "absolute",
            width: "80px",
            height: "80px",
            border: `3px solid transparent`,
            borderTop: `3px solid ${COLORS.primary}`,
            borderRight: `3px solid ${COLORS.secondary}`,
            borderRadius: "50%",
            animation: "spin 2s linear infinite",
            boxShadow: `0 0 20px ${COLORS.primary}40`,
          }}
        />

        {/* Middle ring */}
        <div
          style={{
            position: "absolute",
            width: "55px",
            height: "55px",
            top: "12.5px",
            left: "12.5px",
            border: `3px solid transparent`,
            borderBottom: `3px solid ${COLORS.success}`,
            borderLeft: `3px solid ${COLORS.warning}`,
            borderRadius: "50%",
            animation: "spin 3s linear infinite reverse",
            boxShadow: `0 0 15px ${COLORS.success}40`,
          }}
        />

        {/* Inner pulsing core */}
        <div
          style={{
            position: "absolute",
            width: "30px",
            height: "30px",
            top: "25px",
            left: "25px",
            backgroundColor: COLORS.primary,
            borderRadius: "50%",
            animation: "pulse 2s ease-in-out infinite",
            boxShadow: `0 0 15px ${COLORS.primary}`,
          }}
        />
      </div>

      {/* Loading Text */}
      <div style={{ textAlign: "center", animation: "fadeInUp 0.6s ease-out 0.2s backwards" }}>
        <p
          style={{
            fontSize: "1.2em",
            color: COLORS.text,
            fontWeight: "700",
            margin: 0,
            marginBottom: "0.75rem",
            letterSpacing: "0.5px",
            textShadow: `0 4px 15px ${COLORS.primary}60`,
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {text}
        </p>
        <p
          style={{
            fontSize: "0.95em",
            color: COLORS.textMuted,
            margin: 0,
            animation: "fadeInUp 0.6s ease-out 0.3s backwards",
          }}
        >
          Processing your goal analysis...
        </p>
      </div>

      {/* Animated progress dots */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginTop: "1rem",
          animation: "fadeInUp 0.6s ease-out 0.4s backwards",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: COLORS.primary,
            animation: "bounce 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) infinite 0s",
            boxShadow: `0 0 8px ${COLORS.primary}`,
          }}
        />
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: COLORS.secondary,
            animation: "bounce 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) infinite 0.2s",
            boxShadow: `0 0 8px ${COLORS.secondary}`,
          }}
        />
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: COLORS.success,
            animation: "bounce 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) infinite 0.4s",
            boxShadow: `0 0 8px ${COLORS.success}`,
          }}
        />
      </div>

      <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-15px);
            opacity: 0.6;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingSpinner;
