import React from 'react';
import { useTextToSpeech } from '../utils/audioUtils';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({ text, size = 'md', label, className = '' }) => {
  const { speak, isSpeaking } = useTextToSpeech();

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(text);
  };

  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  const padding = size === 'sm' ? 'p-1.5' : 'p-2';

  return (
    <button
      onClick={handlePlay}
      disabled={isSpeaking}
      className={`inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors disabled:opacity-50 ${padding} ${className}`}
      aria-label="Play audio"
      title="Play audio"
    >
      {isSpeaking ? (
        <svg className={`${iconSize} animate-pulse`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      ) : (
        <svg className={iconSize} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
      {label && <span className="ml-2 font-medium">{label}</span>}
    </button>
  );
};

export default AudioButton;
