import React from 'react';

interface VoiceWaveformProps {
  state: 'listening' | 'speaking' | 'idle';
  label?: string;
  onStop?: () => void;
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ state, label, onStop }) => {
  if (state === 'idle') return null;

  const isListening = state === 'listening';

  return (
    <div
      className={`px-3 py-2 rounded-xl flex items-center justify-between gap-3 text-xs transition-all ${
        isListening
          ? 'bg-rose-50 border border-rose-200 text-rose-800'
          : 'bg-blue-50 border border-blue-200 text-blue-800'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Animated Soundwave bars */}
        <div className="flex items-center gap-0.5 h-4 shrink-0">
          <span
            className={`w-0.5 rounded-full animate-pulse ${
              isListening ? 'bg-rose-600' : 'bg-blue-600'
            }`}
            style={{ height: '8px', animationDuration: '0.4s' }}
          />
          <span
            className={`w-0.5 rounded-full animate-pulse ${
              isListening ? 'bg-rose-600' : 'bg-blue-600'
            }`}
            style={{ height: '14px', animationDuration: '0.6s' }}
          />
          <span
            className={`w-0.5 rounded-full animate-pulse ${
              isListening ? 'bg-rose-600' : 'bg-blue-600'
            }`}
            style={{ height: '16px', animationDuration: '0.5s' }}
          />
          <span
            className={`w-0.5 rounded-full animate-pulse ${
              isListening ? 'bg-rose-600' : 'bg-blue-600'
            }`}
            style={{ height: '10px', animationDuration: '0.7s' }}
          />
          <span
            className={`w-0.5 rounded-full animate-pulse ${
              isListening ? 'bg-rose-600' : 'bg-blue-600'
            }`}
            style={{ height: '15px', animationDuration: '0.45s' }}
          />
        </div>

        <div className="truncate font-medium text-xs">
          {label || (isListening ? 'Listening to your voice...' : 'VisionONE AI Speaking...')}
        </div>
      </div>

      {onStop && (
        <button
          type="button"
          onClick={onStop}
          className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition-colors cursor-pointer ${
            isListening
              ? 'bg-rose-100 hover:bg-rose-200 text-rose-800 border-rose-300'
              : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300'
          }`}
        >
          Stop
        </button>
      )}
    </div>
  );
};
