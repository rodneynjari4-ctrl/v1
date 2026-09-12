import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Calendar,
  Layers,
  Code,
  RotateCcw,
  Mic,
  Radio,
  Sparkles,
} from 'lucide-react';
import { ChatMessageItem } from './ChatMessageItem';
import { ChatInput } from './ChatInput';
import { VoiceWaveform } from './VoiceWaveform';
import { LiveVoiceView } from './LiveVoiceView';
import { ChatMessage } from '../types';

interface VisionOneWidgetProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onResetChat: () => void;
  onRequestDemo: (module?: string) => void;
  onOpenModules: () => void;
  onOpenEmbedModal: () => void;
  // Voice integration
  isListening: boolean;
  interimTranscript: string;
  isSpeaking: boolean;
  voiceEnabled: boolean;
  speechSupported: boolean;
  ttsSupported: boolean;
  micPermissionError: string | null;
  selectedVoiceName?: string;
  isLiveVoiceMode: boolean;
  onToggleLiveVoiceMode: (active: boolean) => void;
  onStartListening: () => void;
  onStopListening: () => void;
  onSpeak: (text: string) => void;
  onStopSpeaking: () => void;
  onToggleVoiceOutput: () => void;
  position?: 'right' | 'left';
}

export const VisionOneWidget: React.FC<VisionOneWidgetProps> = ({
  isOpen,
  onToggleOpen,
  messages,
  isLoading,
  onSendMessage,
  onResetChat,
  onRequestDemo,
  onOpenModules,
  onOpenEmbedModal,
  isListening,
  interimTranscript,
  isSpeaking,
  voiceEnabled,
  speechSupported,
  ttsSupported,
  micPermissionError,
  selectedVoiceName,
  isLiveVoiceMode,
  onToggleLiveVoiceMode,
  onStartListening,
  onStopListening,
  onSpeak,
  onStopSpeaking,
  onToggleVoiceOutput,
  position = 'right',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasNewMessagePing, setHasNewMessagePing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isLiveVoiceMode) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setHasNewMessagePing(false);
    } else if (messages.length > 1) {
      setHasNewMessagePing(true);
    }
  }, [messages, isOpen, isLoading, isLiveVoiceMode]);

  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === 'assistant');

  return (
    <div
      className={`fixed z-50 transition-all ${
        position === 'left' ? 'left-3 sm:left-5' : 'right-3 sm:right-5'
      } bottom-3 sm:bottom-5`}
    >
      {/* Sleek Floating Chat Window */}
      {isOpen && (
        <div
          className={`flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/20 overflow-hidden transition-all duration-200 ease-out ${
            isExpanded
              ? 'w-[calc(100vw-24px)] sm:w-[540px] h-[calc(100vh-70px)] max-h-[720px]'
              : 'w-[calc(100vw-24px)] sm:w-[360px] h-[min(520px,calc(100vh-90px))]'
          } mb-2.5`}
        >
          {/* Streamlined Minimalist Header */}
          <div className="bg-slate-900 text-white px-3.5 py-2.5 flex items-center justify-between border-b border-slate-800 shrink-0 select-none">
            {/* Left Brand Identity */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  V1
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 border border-slate-900 rounded-full" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-white tracking-tight truncate">
                    VisionONE
                  </span>
                  <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.2 rounded-full">
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Center Pill: Mode Switcher (Chat vs Live Call) */}
            <div className="flex items-center bg-slate-800/90 p-0.5 rounded-lg border border-slate-700/60 text-[11px]">
              <button
                type="button"
                onClick={() => onToggleLiveVoiceMode(false)}
                className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                  !isLiveVoiceMode
                    ? 'bg-slate-700 text-white shadow-2xs font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to text chat"
              >
                <MessageSquare className="w-3 h-3 text-blue-400" />
                <span>Chat</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onToggleLiveVoiceMode(true);
                  if (!isListening) {
                    onStartListening();
                  }
                }}
                className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                  isLiveVoiceMode
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xs font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to hands-free voice call"
              >
                <Radio className={`w-3 h-3 ${isLiveVoiceMode ? 'text-emerald-300 animate-pulse' : 'text-slate-400'}`} />
                <span>Call</span>
              </button>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-0.5 text-slate-400 shrink-0">
              {/* Voice Mute/Unmute */}
              {ttsSupported && (
                <button
                  type="button"
                  onClick={onToggleVoiceOutput}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    voiceEnabled ? 'text-blue-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-800'
                  }`}
                  title={voiceEnabled ? 'Voice readout is ON' : 'Voice readout is MUTED'}
                >
                  {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
              )}

              {/* Demo Modal */}
              <button
                type="button"
                onClick={() => onRequestDemo()}
                className="p-1.5 rounded-md hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Request a Walkthrough"
              >
                <Calendar className="w-3.5 h-3.5" />
              </button>

              {/* Embed Code Modal */}
              <button
                type="button"
                onClick={onOpenEmbedModal}
                className="p-1.5 rounded-md hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Get WordPress Code"
              >
                <Code className="w-3.5 h-3.5" />
              </button>

              {/* Expand Toggle */}
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:inline-flex p-1.5 rounded-md hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title={isExpanded ? 'Restore size' : 'Expand widget'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              {/* Close (X) */}
              <button
                type="button"
                onClick={onToggleOpen}
                className="p-1.5 rounded-md hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-0.5"
                title="Close widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body: Live Voice Mode vs Text Messages */}
          {isLiveVoiceMode ? (
            <LiveVoiceView
              isListening={isListening}
              isSpeaking={isSpeaking}
              isLoading={isLoading}
              interimTranscript={interimTranscript}
              lastUserSpeech={lastUserMsg ? lastUserMsg.content : ''}
              lastAssistantSpeech={lastAssistantMsg ? lastAssistantMsg.content : ''}
              selectedVoiceName={selectedVoiceName}
              voiceEnabled={voiceEnabled}
              onStartListening={onStartListening}
              onStopListening={onStopListening}
              onStopSpeaking={onStopSpeaking}
              onToggleVoiceOutput={onToggleVoiceOutput}
              onSwitchToText={() => onToggleLiveVoiceMode(false)}
              onEndLiveVoice={() => onToggleLiveVoiceMode(false)}
              onQuickPrompt={(text) => onSendMessage(text)}
            />
          ) : (
            <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
              {/* Speaking notification banner if speaking aloud */}
              {isSpeaking && (
                <div className="bg-blue-50/90 border-b border-blue-100 px-3 py-1 text-xs">
                  <VoiceWaveform
                    state="speaking"
                    label="Speaking response aloud..."
                    onStop={onStopSpeaking}
                  />
                </div>
              )}

              {/* Messages Scroll Area */}
              <div className="flex-1 p-3 overflow-y-auto space-y-2.5 min-h-0 text-xs">
                {messages.map((msg) => (
                  <ChatMessageItem
                    key={msg.id}
                    message={msg}
                    onSelectSuggestion={onSendMessage}
                    onRequestDemo={() => onRequestDemo()}
                    onSpeak={onSpeak}
                    isSpeakingThis={isSpeaking}
                  />
                ))}

                {/* Compact Loading Indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                      V1
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-2xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                      <span className="text-[10px] text-slate-400 font-medium ml-1">
                        Thinking...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Compact Bottom Chat Input */}
              <div className="shrink-0 bg-white border-t border-slate-200/80">
                <ChatInput
                  onSendMessage={onSendMessage}
                  isLoading={isLoading}
                  onSelectPrompt={onSendMessage}
                  isListening={isListening}
                  interimTranscript={interimTranscript}
                  onStartListening={onStartListening}
                  onStopListening={onStopListening}
                  speechSupported={speechSupported}
                  micPermissionError={micPermissionError}
                  isWidgetMode={true}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Compact, Sleek Launcher Button */}
      <div className="flex items-center gap-2 justify-end">
        {/* Subtle Tooltip Chip when closed */}
        {!isOpen && (
          <button
            type="button"
            onClick={onToggleOpen}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-800 text-[11px] font-semibold shadow-md border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Voice & Chat with VisionONE</span>
          </button>
        )}

        <button
          type="button"
          onClick={onToggleOpen}
          className={`relative p-3 rounded-full text-white shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center ${
            isOpen
              ? 'bg-slate-800 hover:bg-slate-900 rotate-90 scale-95'
              : 'bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-700 hover:scale-105 shadow-blue-600/30'
          }`}
          title={isOpen ? 'Close assistant' : 'Open VisionONE Voice Assistant'}
          aria-label={isOpen ? 'Close assistant' : 'Open VisionONE Voice Assistant'}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-blue-700" />
            </div>
          )}

          {/* New Message Indicator Ping */}
          {!isOpen && hasNewMessagePing && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
