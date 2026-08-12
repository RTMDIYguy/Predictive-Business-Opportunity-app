import React from "react";

interface LogoProps {
  className?: string;
  height?: number;
}

export const AgentLabLogo: React.FC<LogoProps> = ({ className = "h-8", height = 32 }) => {
  return (
    <a
      href="https://agent-lab.tech"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-850 transition-all group ${className}`}
      title="Agent Lab — Driving Your Workplace (agent-lab.tech)"
    >
      <svg
        viewBox="0 0 320 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: `${height}px`, width: "auto" }}
        className="block"
      >
        {/* Circle Icon with Robot Motif */}
        <g transform="translate(10, 5)">
          <circle cx="40" cy="40" r="38" fill="#0f172a" stroke="#2dd4bf" strokeWidth="2.5" />
          {/* Top Robot */}
          <rect x="28" y="16" width="24" height="18" rx="4" stroke="#2dd4bf" strokeWidth="2" fill="none" />
          <circle cx="34" cy="23" r="2" fill="#2dd4bf" />
          <circle cx="46" cy="23" r="2" fill="#2dd4bf" />
          <line x1="34" y1="29" x2="46" y2="29" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="10" x2="40" y2="16" stroke="#2dd4bf" strokeWidth="2" />
          <circle cx="40" cy="8" r="2" fill="#2dd4bf" />
          
          {/* Left Bot with Heart */}
          <rect x="16" y="42" width="22" height="24" rx="5" stroke="#2dd4bf" strokeWidth="2" fill="none" />
          <circle cx="23" cy="50" r="2" fill="#2dd4bf" />
          <circle cx="31" cy="50" r="2" fill="#2dd4bf" />
          <path d="M22 58 C22 55, 27 55, 27 58 C27 55, 32 55, 32 58 C32 61, 27 63, 27 63 Z" fill="#2dd4bf" />

          {/* Right Bot / Tool */}
          <rect x="44" y="45" width="20" height="20" rx="4" stroke="#2dd4bf" strokeWidth="2" fill="none" />
          <line x1="48" y1="53" x2="60" y2="53" stroke="#2dd4bf" strokeWidth="2" />
          <circle cx="54" cy="60" r="2" fill="#2dd4bf" />
        </g>

        {/* Text: Agent Lab */}
        <text
          x="100"
          y="48"
          fill="#fef08a"
          fontSize="36"
          fontWeight="800"
          fontFamily="Serif, Georgia, serif"
          letterSpacing="-0.5"
        >
          Agent Lab
        </text>

        {/* Subtitle: DRIVING YOUR WORKPLACE */}
        <text
          x="102"
          y="70"
          fill="#2dd4bf"
          fontSize="11"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="3.5"
        >
          DRIVING YOUR WORKPLACE
        </text>
      </svg>
    </a>
  );
};

export const UncleRobertLogo: React.FC<LogoProps> = ({ className = "h-8", height = 32 }) => {
  return (
    <a
      href="https://unclerobertconsulting.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xs transition-all group ${className}`}
      title="Uncle Robert Consulting LLC (unclerobertconsulting.com)"
    >
      <svg
        viewBox="0 0 310 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: `${height}px`, width: "auto" }}
        className="block"
      >
        {/* Text: Uncle Robert */}
        <text
          x="10"
          y="42"
          fill="#1b365d"
          fontSize="38"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.5"
        >
          Uncle Robert
        </text>

        {/* Text: CONSULTING */}
        <text
          x="12"
          y="68"
          fill="#d97706"
          fontSize="18"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="7"
        >
          CONSULTING
        </text>
      </svg>
    </a>
  );
};
