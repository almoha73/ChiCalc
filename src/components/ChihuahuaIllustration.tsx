import React from 'react';
import { useThemeContext } from '../context/ThemeContext';

interface ChihuahuaIllustrationProps {
  className?: string;
}

const ChihuahuaIllustration: React.FC<ChihuahuaIllustrationProps> = ({ className = "" }) => {
  const { theme } = useThemeContext();
  
  // Colors adapt to theme
  const colors = theme === 'dark' ? {
    primary: '#a0c95e',    // palette-4
    secondary: '#a0dd98',   // palette-5
    accent: '#a49837',      // palette-3
    dark: '#321114',        // palette-1
    highlight: '#6b3f24'    // palette-2
  } : {
    primary: '#6b3f24',     // palette-2
    secondary: '#a49837',   // palette-3
    accent: '#a0c95e',      // palette-4
    dark: '#321114',        // palette-1
    highlight: '#a0dd98'    // palette-5
  };
  
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className} transition-all duration-300`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ears */}
      <ellipse cx="25" cy="35" rx="12" ry="20" fill={colors.primary} transform="rotate(-25 25 35)" />
      <ellipse cx="75" cy="35" rx="12" ry="20" fill={colors.primary} transform="rotate(25 75 35)" />
      <ellipse cx="27" cy="37" rx="6" ry="12" fill={colors.secondary} transform="rotate(-25 27 37)" />
      <ellipse cx="73" cy="37" rx="6" ry="12" fill={colors.secondary} transform="rotate(25 73 37)" />
      
      {/* Head */}
      <ellipse cx="50" cy="55" rx="28" ry="25" fill={colors.primary} />
      
      {/* Forehead marking */}
      <ellipse cx="50" cy="45" rx="15" ry="12" fill={colors.secondary} />
      
      {/* Eyes */}
      <ellipse cx="42" cy="50" rx="4" ry="5" fill={colors.dark} />
      <ellipse cx="58" cy="50" rx="4" ry="5" fill={colors.dark} />
      <ellipse cx="43" cy="48" rx="1.5" ry="2" fill={colors.highlight} />
      <ellipse cx="59" cy="48" rx="1.5" ry="2" fill={colors.highlight} />
      
      {/* Nose */}
      <ellipse cx="50" cy="60" rx="3" ry="2" fill={colors.dark} />
      
      {/* Mouth */}
      <path d="M47 65 Q50 68 53 65" stroke={colors.dark} strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* Tongue */}
      <ellipse cx="50" cy="68" rx="3" ry="2" fill={colors.accent} />
      
      {/* Chin marking */}
      <ellipse cx="50" cy="72" rx="8" ry="6" fill={colors.highlight} />
    </svg>
  );
};

export default ChihuahuaIllustration;