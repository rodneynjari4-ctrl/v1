import React from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageSquare,
  PhoneOff,
  Sparkles,
  Radio,
  Square,
} from 'lucide-react';

interface LiveVoiceViewProps {
  isListening: boolean;
  isSpeaking: boolean;
  isLoading: boolean;
  interimTranscript: string;
  lastUserSpeech: string;
  lastAssistantSpeech: string;
  selectedVoiceName?: string;
  voiceEnabled: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onStopSpeaking: () => void;
  onToggleVoiceOutput: () => void;
  onSwitchToText: () => void;
  onEndLiveVoice: () => void;
  onQuickPrompt: (text: string) => void;
}

const VOICE_TOPICS = [
  'How does M-Pesa match to invoices?',
  'Tell me about eTIMS compliance in Kenya.',
  'How does multi-warehouse inventory work?',
];

export const LiveVoiceView: React.FC<LiveVoiceViewProps> = ({
  isListening,
  isSpeaking,
  isLoading,
  interimTranscript,
  lastUserSpeech,
  lastAssistantSpeech,
  selectedVoiceName,
  voiceEnabled,
  onStartListening,
  onStopListening,
  onStopSpeaking,
  onToggleVoiceOutput,
  onSwitchToText,
  onEndLiveVoice,
  onQuickPrompt,
}) => {
  let currentState: 'listening' | 'speaking' | 'thinking' | 'idle' = 'idle';
  if (isLoading) {
    currentState = 'thinking';
  } else if (isSpeaking) {
    currentState = 'speaking';
  } else if (isListening) {
    currentState = 'listening';
  }

  const handleToggleMic = () => {
    if (isListening) {
      onStopListening();
    } else {
      if (isSpeaking) {
        onStopSpeaking();
      }
      onStartListening();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-3.5 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white select-none relative overflow-hidden text-xs">
      {/* Subtle ambient blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-20 bg-blue-500 transition-all duration-500" />
      {currentState === 'listening' && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none blur-3xl opacity-25 bg-emerald-500 animate-pulse" />
      )}
      {currentState === 'speaking' && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none blur-3xl opacity-25 bg-indigo-500 animate-pulse" />
      )}

      {/* Top Bar */}
      <div className="w-full flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-semibold text-slate-200">
            Voice Call Active
          </span>
        </div>

        <button
          type="button"
          onClick={onSwitchToText}
          className="text-[10px] font-medium text-slate-300 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <MessageSquare className="w-3 h-3 text-blue-400" />
          <span>Text View</span>
        </button>
      </div>

      {/* Center Voice Orb Section */}
      <div className="my-auto flex flex-col items-center justify-center space-y-4 z-10 w-full max-w-xs">
        <div className="relative flex items-center justify-center my-2">
          {/* Ripple Waves */}
          <div
            className={`absolute rounded-full transition-all duration-700 ${
              currentState === 'speaking'
                ? 'w-32 h-32 bg-blue-500/15 animate-ping'
                : currentState === 'listening'
                ? 'w-32 h-32 bg-emerald-500/15 animate-ping'
                : 'w-24 h-24 bg-blue-500/5'
            }`}
          />
          <div
            className={`absolute rounded-full transition-all duration-500 ${
              currentState === 'speaking'
                ? 'w-28 h-28 border border-blue-400/30 animate-pulse'
                : currentState === 'listening'
                ? 'w-28 h-28 border border-emerald-400/30 animate-pulse'
                : 'w-22 h-22 border border-slate-700/50'
            }`}
          />

          {/* Compact Interactive Glowing Orb */}
          <button
            type="button"
            onClick={handleToggleMic}
            className={`relative w-20 h-20 rounded-full shadow-xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
              currentState === 'speaking'
                ? 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-blue-500/40 ring-3 ring-blue-400/30 scale-105'
                : currentState === 'listening'
                ? 'bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 shadow-emerald-500/40 ring-3 ring-emerald-400/30 scale-105'
                : currentState === 'thinking'
                ? 'bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 shadow-purple-500/40 ring-3 ring-purple-400/30 animate-pulse'
                : 'bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-800 shadow-slate-900 ring-1 ring-slate-600 hover:scale-105'
            }`}
            title={isListening ? 'Click to pause' : 'Click to talk'}
          >
            {currentState === 'speaking' ? (
              <Volume2 className="w-6 h-6 text-white animate-bounce" />
            ) : currentState === 'listening' ? (
              <Mic className="w-6 h-6 text-white animate-pulse" />
            ) : currentState === 'thinking' ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Mic className="w-6 h-6 text-slate-300" />
            )}
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-200 mt-1">
              {currentState === 'speaking'
                ? 'Speaking'
                : currentState === 'listening'
                ? 'Listening'
                : currentState === 'thinking'
                ? 'Thinking'
                : 'Tap to Talk'}
            </span>
          </button>
        </div>

        {/* Live Subtitle Area */}
        <div className="w-full text-center space-y-1 min-h-[50px] flex flex-col items-center justify-center px-2">
          {currentState === 'listening' && (
            <div className="space-y-0.5">
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
                <Radio className="w-2.5 h-2.5 animate-pulse" />
                <span>Listening to your voice...</span>
              </span>
              <p className="text-xs font-medium text-slate-100 line-clamp-2 italic">
                {interimTranscript ? `"${interimTranscript}"` : 'Speak naturally anytime'}
              </p>
            </div>
          )}

          {currentState === 'speaking' && (
            <div className="space-y-0.5">
              <span className="text-[10px] text-blue-400 font-semibold flex items-center justify-center gap-1">
                <Volume2 className="w-2.5 h-2.5" />
                <span>VisionONE is answering:</span>
              </span>
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                {lastAssistantSpeech || 'Explaining VisionONE capabilities...'}
              </p>
            </div>
          )}

          {currentState === 'thinking' && (
            <span className="text-[11px] text-purple-300 font-medium flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Consulting VisionONE ERP knowledge...</span>
            </span>
          )}

          {currentState === 'idle' && (
            <div className="space-y-0.5">
              <p className="text-[11px] font-semibold text-slate-200">
                Ready to speak
              </p>
              <p className="text-[10px] text-slate-400">
                Tap the microphone or choose a question below.
              </p>
            </div>
          )}
        </div>

        {/* Compact Voice Topics */}
        <div className="w-full flex flex-col gap-1 pt-1">
          {VOICE_TOPICS.map((topic, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onQuickPrompt(topic)}
              disabled={isLoading}
              className="text-[10px] py-1 px-2.5 rounded-lg bg-slate-800/80 hover:bg-blue-600/30 text-slate-300 hover:text-blue-100 border border-slate-700/80 hover:border-blue-500/40 transition-colors cursor-pointer text-left truncate"
            >
              💬 {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Compact Bottom Controls */}
      <div className="w-full z-10 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2 shrink-0">
        {/* Interrupt / Mute */}
        {isSpeaking ? (
          <button
            type="button"
            onClick={onStopSpeaking}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            title="Interrupt speaking"
          >
            <Square className="w-3 h-3 text-rose-400 fill-current" />
            <span>Interrupt</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onToggleVoiceOutput}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              voiceEnabled
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-rose-900/40 text-rose-300 border border-rose-700'
            }`}
            title={voiceEnabled ? 'Mute audio' : 'Unmute audio'}
          >
            {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        )}

        {/* Center Mic Button */}
        <button
          type="button"
          onClick={handleToggleMic}
          className={`px-3.5 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
            isListening
              ? 'bg-rose-600 hover:bg-rose-700 text-white'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-3.5 h-3.5" />
              <span>Pause Mic</span>
            </>
          ) : (
            <>
              <Mic className="w-3.5 h-3.5" />
              <span>Speak Now</span>
            </>
          )}
        </button>

        {/* End Call */}
        <button
          type="button"
          onClick={onEndLiveVoice}
          className="px-2.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 transition-colors text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
          title="End voice session"
        >
          <PhoneOff className="w-3 h-3" />
          <span>End</span>
        </button>
      </div>
    </div>
  );
};
