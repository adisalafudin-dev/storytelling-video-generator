import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export type CharacterRole = "narrator" | "davinci" | "guard" | "lisa";
export type CharacterGesture = "explain" | "point" | "paint" | "shock" | "proud" | "idle";

export const NarratorCharacter: React.FC<{
  role?: CharacterRole;
  gesture?: CharacterGesture;
  position?: "left" | "right" | "center";
  flip?: boolean;
  scale?: number;
  isSpeaking?: boolean;
}> = ({
  role = "narrator",
  gesture = "explain",
  position = "right",
  flip = false,
  scale = 1.0,
  isSpeaking = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  // Natural idle breathing bobbing (torso & shoulders)
  const breathY = Math.sin(frame * 0.12) * 5;
  const breathScaleY = 1 + Math.sin(frame * 0.12) * 0.015;

  // Periodic eye blink (blinks every 85 frames for ~5 frames)
  const blinkCycle = frame % 95;
  const isBlinking = blinkCycle > 88 && blinkCycle < 94;

  // Talking mouth animation (open/close synced rhythm)
  const mouthOpen = isSpeaking ? Math.sin(frame * 0.65) > 0.15 : false;

  // Head tilt gesture
  const headAngle =
    gesture === "shock"
      ? Math.sin(frame * 0.5) * 4
      : gesture === "point"
      ? -5
      : gesture === "proud"
      ? 2
      : Math.sin(frame * 0.1) * 3;

  // Arm rhythm gestures
  const armAnim1 = Math.sin(frame * 0.22) * 10;
  const armAnim2 = Math.cos(frame * 0.22) * 8;
  const brushY = gesture === "paint" ? Math.sin(frame * 0.35) * 22 : 0;
  const brushX = gesture === "paint" ? Math.cos(frame * 0.35) * 14 : 0;

  // Horizontal position
  const posX =
    position === "left" ? "20%" : position === "right" ? "77%" : "50%";
  const translateY = (1 - enterSpring) * 60 + breathY;

  return (
    <div
      style={{
        position: "absolute",
        left: posX,
        bottom: "17%",
        transform: `translateX(-50%) translateY(${translateY}px) scale(${scale * enterSpring * (flip ? -1 : 1)}, ${scale * enterSpring * breathScaleY})`,
        transformOrigin: "bottom center",
        zIndex: 25,
        filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.5))",
        pointerEvents: "none",
      }}
    >
      <svg
        width="340"
        height="560"
        viewBox="0 0 340 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skinGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE0B2" />
            <stop offset="100%" stopColor="#FFCC80" />
          </linearGradient>
          <linearGradient id="davinciRobe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8D6E63" />
            <stop offset="50%" stopColor="#6D4C41" />
            <stop offset="100%" stopColor="#4E342E" />
          </linearGradient>
          <linearGradient id="narratorJacket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="60%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="guardCoat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="60%" stopColor="#172554" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* ============================================================== */}
        {/* LEGS & FEET                                                    */}
        {/* ============================================================== */}
        <g id="legs">
          {/* Left Leg */}
          <rect x="135" y="400" width="28" height="110" rx="14" fill="#0F172A" />
          <ellipse cx="145" cy="515" rx="24" ry="14" fill="#020617" />

          {/* Right Leg */}
          <rect x="180" y="400" width="28" height="110" rx="14" fill="#0F172A" />
          <ellipse cx="195" cy="515" rx="24" ry="14" fill="#020617" />
        </g>

        {/* ============================================================== */}
        {/* TORSO & BODY                                                   */}
        {/* ============================================================== */}
        <g id="body">
          {role === "davinci" ? (
            // Renaissance Artist Tunic & Belt
            <g>
              <path
                d="M 110 220 C 130 200, 210 200, 230 220 L 250 420 L 90 420 Z"
                fill="url(#davinciRobe)"
                stroke="#3E2723"
                strokeWidth="4"
              />
              {/* Robe Fold Shadows */}
              <path d="M 170 230 L 170 420" stroke="#3E2723" strokeWidth="3" opacity="0.4" />
              <path d="M 135 240 L 125 420" stroke="#3E2723" strokeWidth="2.5" opacity="0.3" />
              <path d="M 205 240 L 215 420" stroke="#3E2723" strokeWidth="2.5" opacity="0.3" />

              {/* Belt */}
              <rect x="95" y="340" width="150" height="18" rx="6" fill="#2E1B15" />
              <rect x="155" y="336" width="30" height="26" rx="4" fill="#FFD700" />
            </g>
          ) : role === "guard" ? (
            // 1911 Museum Guard Coat
            <g>
              <path
                d="M 115 220 C 130 205, 210 205, 225 220 L 245 420 L 95 420 Z"
                fill="url(#guardCoat)"
                stroke="#0F172A"
                strokeWidth="4"
              />
              {/* Gold Buttons */}
              <circle cx="170" cy="260" r="6" fill="#FACC15" />
              <circle cx="170" cy="295" r="6" fill="#FACC15" />
              <circle cx="170" cy="330" r="6" fill="#FACC15" />
              <circle cx="170" cy="365" r="6" fill="#FACC15" />
            </g>
          ) : role === "lisa" ? (
            // Mona Lisa Dark Green / Gold Renaissance Gown
            <g>
              <path
                d="M 110 220 C 135 205, 205 205, 230 220 L 260 440 L 80 440 Z"
                fill="#273629"
                stroke="#1B261C"
                strokeWidth="4"
              />
              <path
                d="M 125 225 Q 170 260 215 225"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </g>
          ) : (
            // Modern Sleek Editorial Narrator
            <g>
              <path
                d="M 115 220 C 135 205, 205 205, 225 220 L 245 420 L 95 420 Z"
                fill="url(#narratorJacket)"
                stroke="#334155"
                strokeWidth="4"
              />
              {/* Yellow Accent Inner Collar */}
              <path d="M 150 215 L 170 265 L 190 215 Z" fill="#FFD600" />
              {/* Pocket Square */}
              <rect x="195" y="260" width="22" height="6" rx="2" fill="#FFD600" />
            </g>
          )}
        </g>

        {/* ============================================================== */}
        {/* ARMS & PROPS (DYNAMIC GESTURES)                                */}
        {/* ============================================================== */}
        <g id="arms">
          {gesture === "paint" && role === "davinci" ? (
            // Da Vinci holding Palette in Left Hand, Moving Brush in Right Hand
            <g>
              {/* Left Arm holding Palette */}
              <path
                d="M 115 240 Q 80 290 100 330"
                fill="none"
                stroke="#6D4C41"
                strokeWidth="22"
                strokeLinecap="round"
              />
              {/* Wooden Palette */}
              <ellipse cx="90" cy="340" rx="36" ry="24" fill="#A1887F" stroke="#4E342E" strokeWidth="4" />
              <circle cx="75" cy="335" r="5" fill="#EF4444" />
              <circle cx="88" cy="328" r="5" fill="#3B82F6" />
              <circle cx="102" cy="332" r="5" fill="#EAB308" />
              <circle cx="95" cy="348" r="5" fill="#FFFFFF" />

              {/* Right Arm holding Brush extending to canvas */}
              <g transform={`translate(${brushX}, ${brushY})`}>
                <path
                  d="M 225 240 Q 270 260 300 240"
                  fill="none"
                  stroke="#6D4C41"
                  strokeWidth="22"
                  strokeLinecap="round"
                />
                <line x1="290" y1="240" x2="340" y2="210" stroke="#8D6E63" strokeWidth="6" strokeLinecap="round" />
                <polygon points="340,210 350,204 345,216" fill="#D97706" />
              </g>
            </g>
          ) : gesture === "point" ? (
            // Pointing to the left/target
            <g>
              {/* Left Arm pointing outward */}
              <g transform={`rotate(${armAnim1 * 0.4}, 115, 235)`}>
                <path
                  d="M 115 240 Q 60 220 20 200"
                  fill="none"
                  stroke={role === "davinci" ? "#6D4C41" : "#1E293B"}
                  strokeWidth="22"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="200" r="14" fill="#FFCC80" />
                <path d="M 20 200 L -15 190" stroke="#FFCC80" strokeWidth="8" strokeLinecap="round" />
              </g>
              {/* Right Arm resting / gesturing */}
              <g transform={`rotate(${armAnim2 * 0.5}, 225, 235)`}>
                <path
                  d="M 225 240 Q 255 310 240 360"
                  fill="none"
                  stroke={role === "davinci" ? "#6D4C41" : "#1E293B"}
                  strokeWidth="22"
                  strokeLinecap="round"
                />
                <circle cx="240" cy="360" r="14" fill="#FFCC80" />
              </g>
            </g>
          ) : gesture === "shock" ? (
            // Panicked hands on head
            <g>
              <path
                d="M 115 240 Q 70 170 110 130"
                fill="none"
                stroke={role === "guard" ? "#1E3A8A" : "#1E293B"}
                strokeWidth="22"
                strokeLinecap="round"
              />
              <circle cx="110" cy="130" r="15" fill="#FFCC80" />
              <path
                d="M 225 240 Q 270 170 230 130"
                fill="none"
                stroke={role === "guard" ? "#1E3A8A" : "#1E293B"}
                strokeWidth="22"
                strokeLinecap="round"
              />
              <circle cx="230" cy="130" r="15" fill="#FFCC80" />
            </g>
          ) : gesture === "proud" ? (
            // Confident folded arms / proud presenter pose
            <g>
              <path
                d="M 115 240 Q 150 320 210 290"
                fill="none"
                stroke={role === "davinci" ? "#6D4C41" : "#1E293B"}
                strokeWidth="22"
                strokeLinecap="round"
              />
              <path
                d="M 225 240 Q 190 320 130 290"
                fill="none"
                stroke={role === "davinci" ? "#6D4C41" : "#1E293B"}
                strokeWidth="22"
                strokeLinecap="round"
              />
              <circle cx="130" cy="290" r="14" fill="#FFCC80" />
              <circle cx="210" cy="290" r="14" fill="#FFCC80" />
            </g>
          ) : (
            // Expressive Explaining Gesture (Default)
            <g>
              {/* Left Arm explaining */}
              <g transform={`rotate(${armAnim1}, 115, 235)`}>
                <path
                  d="M 115 240 Q 75 285 85 330"
                  fill="none"
                  stroke={role === "davinci" ? "#6D4C41" : "#1E293B"}
                  strokeWidth="22"
                  strokeLinecap="round"
                />
                <circle cx="85" cy="330" r="14" fill="#FFCC80" />
              </g>
              {/* Right Arm raised explaining */}
              <g transform={`rotate(${-armAnim2 * 1.3}, 225, 235)`}>
                <path
                  d="M 225 240 Q 275 260 290 220"
                  fill="none"
                  stroke={role === "davinci" ? "#6D4C41" : "#1E293B"}
                  strokeWidth="22"
                  strokeLinecap="round"
                />
                <circle cx="290" cy="220" r="14" fill="#FFCC80" />
              </g>
            </g>
          )}
        </g>

        {/* ============================================================== */}
        {/* HEAD & EXPRESSIONS                                             */}
        {/* ============================================================== */}
        <g id="head" transform={`rotate(${headAngle}, 170, 150)`}>
          {/* Neck */}
          <rect x="154" y="170" width="32" height="36" rx="6" fill="#FFCC80" />

          {/* Face Base */}
          <ellipse cx="170" cy="140" rx="46" ry="52" fill="url(#skinGlow)" />

          {/* Hair / Headwear based on Role */}
          {role === "davinci" ? (
            <g>
              {/* Leonardo's Renaissance Velvet Cap */}
              <path
                d="M 115 125 C 115 70, 225 70, 225 125 Z"
                fill="#4E342E"
                stroke="#271813"
                strokeWidth="4"
              />
              <ellipse cx="170" cy="120" rx="60" ry="14" fill="#5D4037" />

              {/* Long White Wavy Hair & Beard */}
              <path
                d="M 120 130 C 110 180, 115 220, 130 250 C 150 275, 190 275, 210 250 C 225 220, 230 180, 220 130 C 205 170, 135 170, 120 130 Z"
                fill="#E2E8F0"
                stroke="#CBD5E1"
                strokeWidth="2"
              />
              {/* Flowing Moustache */}
              <path
                d="M 148 155 Q 170 162 192 155 Q 170 170 148 155 Z"
                fill="#F1F5F9"
              />
            </g>
          ) : role === "guard" ? (
            <g>
              {/* 1911 Gendarme Kepi Cap */}
              <path
                d="M 120 115 L 130 65 L 210 65 L 220 115 Z"
                fill="#1E3A8A"
                stroke="#0F172A"
                strokeWidth="3"
              />
              <path d="M 112 115 Q 170 128 228 115" stroke="#000" strokeWidth="8" strokeLinecap="round" />
              {/* French Guard Moustache */}
              <path
                d="M 146 156 Q 170 166 194 156 Q 204 148 200 142 Q 170 152 140 142 Z"
                fill="#334155"
              />
            </g>
          ) : role === "lisa" ? (
            <g>
              {/* Dark Flowing Long Renaissance Hair */}
              <path
                d="M 120 125 C 110 80, 230 80, 220 125 C 235 180, 245 250, 240 310 C 230 310, 225 240, 220 200 C 215 150, 125 150, 120 200 C 115 240, 110 310, 100 310 C 95 250, 105 180, 120 125 Z"
                fill="#1C1917"
              />
              <ellipse cx="170" cy="115" rx="52" ry="12" fill="rgba(255,255,255,0.2)" />
            </g>
          ) : (
            // Modern Sleek Hairstyle
            <path
              d="M 122 125 C 118 75, 218 65, 224 110 C 220 95, 200 80, 170 82 C 140 84, 126 100, 122 125 Z"
              fill="#0F172A"
            />
          )}

          {/* Eyes with Periodic Blinking Animation */}
          <g
            id="eyes"
            style={{
              transformOrigin: "170px 135px",
              transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)",
            }}
          >
            {gesture === "shock" ? (
              // Wide shock eyes
              <g>
                <circle cx="152" cy="134" r="9" fill="#FFFFFF" stroke="#000" strokeWidth="2" />
                <circle cx="152" cy="134" r="4.5" fill="#000" />
                <circle cx="188" cy="134" r="9" fill="#FFFFFF" stroke="#000" strokeWidth="2" />
                <circle cx="188" cy="134" r="4.5" fill="#000" />
              </g>
            ) : role === "lisa" ? (
              // Mysterious Mona Lisa Almond Eyes
              <g>
                <ellipse cx="152" cy="135" rx="7" ry="5" fill="#451A03" />
                <circle cx="150" cy="133" r="2" fill="#FFFFFF" />
                <ellipse cx="188" cy="135" rx="7" ry="5" fill="#451A03" />
                <circle cx="186" cy="133" r="2" fill="#FFFFFF" />
              </g>
            ) : (
              // Friendly Expressive Eyes
              <g>
                <ellipse cx="152" cy="135" rx="6.5" ry="7.5" fill="#0F172A" />
                <circle cx="150" cy="133" r="2.5" fill="#FFFFFF" />
                <ellipse cx="188" cy="135" rx="6.5" ry="7.5" fill="#0F172A" />
                <circle cx="186" cy="133" r="2.5" fill="#FFFFFF" />
              </g>
            )}
          </g>

          {/* Eyebrows */}
          {role !== "lisa" && (
            <g id="eyebrows">
              <path
                d={gesture === "shock" ? "M 140 118 Q 152 106 164 118" : "M 142 124 Q 152 120 162 126"}
                stroke="#0F172A"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d={gesture === "shock" ? "M 176 118 Q 188 106 200 118" : "M 178 126 Q 188 120 198 124"}
                stroke="#0F172A"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Nose */}
          <path d="M 170 136 L 166 148 L 174 148" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />

          {/* Mouth Synced to Voice Speaking */}
          <g id="mouth">
            {gesture === "shock" ? (
              // Big O mouth
              <ellipse cx="170" cy="163" rx="10" ry="14" fill="#7F1D1D" stroke="#000" strokeWidth="2" />
            ) : role === "lisa" ? (
              // The Legendary Subtle Smile
              <path
                d="M 158 158 Q 170 164 182 158"
                fill="none"
                stroke="#9A3412"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ) : mouthOpen ? (
              // Animated Talking Open Mouth
              <ellipse cx="170" cy="161" rx="10" ry="6.5" fill="#7F1D1D" stroke="#450A0A" strokeWidth="1.5" />
            ) : (
              // Friendly Smile
              <path
                d="M 160 160 Q 170 167 180 160"
                fill="none"
                stroke="#0F172A"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};
