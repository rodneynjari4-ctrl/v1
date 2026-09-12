import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Calendar, ArrowRight, ShieldCheck, Volume2, VolumeX } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatMessageItemProps {
  message: ChatMessage;
  onSelectSuggestion: (text: string) => void;
  onRequestDemo: () => void;
  onSpeak?: (text: string) => void;
  isSpeakingThis?: boolean;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onSelectSuggestion,
  onRequestDemo,
  onSpeak,
  isSpeakingThis,
}) => {
  const isAssistant = message.role === 'assistant';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex w-full mb-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex gap-2 max-w-[94%] sm:max-w-[88%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        {isAssistant ? (
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-2xs mt-0.5">
            V1
          </div>
        ) : (
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-800 flex items-center justify-center text-white text-[10px] font-semibold shrink-0 shadow-2xs mt-0.5">
            You
          </div>
        )}

        {/* Bubble */}
        <div className="space-y-1.5 min-w-0 flex-1">
          <div
            className={`rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] transition-all relative ${
              isAssistant
                ? 'bg-white text-slate-800 border border-slate-200/90 shadow-2xs'
                : 'bg-blue-600 text-white shadow-2xs'
            }`}
          >
            {isAssistant ? (
              <div className="prose-visionone text-slate-800 leading-relaxed break-words text-xs sm:text-[13px]">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            ) : (
              <div className="whitespace-pre-wrap leading-relaxed break-words text-xs sm:text-[13px]">
                {message.content}
              </div>
            )}

            {/* Message Action Bar (Copy & Timestamp) */}
            <div
              className={`flex items-center justify-between gap-2 mt-1.5 pt-1 border-t text-[10px] ${
                isAssistant
                  ? 'border-slate-100 text-slate-400'
                  : 'border-blue-500/50 text-blue-100'
              }`}
            >
              <div className="flex items-center gap-1">
                {isAssistant && (
                  <span className="flex items-center gap-1 text-[9px] text-emerald-600 font-medium">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    <span>VisionONE Verified</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                {isAssistant && onSpeak && (
                  <button
                    type="button"
                    onClick={() => onSpeak(message.content)}
                    className={`p-0.5 rounded hover:bg-slate-100 transition-colors cursor-pointer ${
                      isSpeakingThis
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title={isSpeakingThis ? 'Stop speaking' : 'Read message aloud'}
                  >
                    {isSpeakingThis ? (
                      <VolumeX className="w-3 h-3 text-blue-600 animate-pulse" />
                    ) : (
                      <Volume2 className="w-3 h-3" />
                    )}
                  </button>
                )}
                <span>
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`p-0.5 rounded transition-colors cursor-pointer ${
                    isAssistant ? 'hover:bg-slate-100 text-slate-400 hover:text-slate-600' : 'hover:bg-blue-700 text-blue-200 hover:text-white'
                  }`}
                  title="Copy message"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Demo Suggestion Card */}
          {isAssistant && message.suggestDemo && (
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-200/70 flex items-center justify-between gap-2 shadow-2xs">
              <div className="space-y-0.5 min-w-0">
                <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-600 shrink-0" />
                  <span className="truncate">Explore VisionONE for your team</span>
                </div>
                <p className="text-[10px] text-slate-600 truncate">
                  Speak with the VisionONE team for a tailored walkthrough.
                </p>
              </div>
              <button
                type="button"
                onClick={onRequestDemo}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[10px] transition-colors shrink-0 shadow-2xs cursor-pointer"
              >
                <span>Demo</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>
          )}

          {/* Follow-up Suggestion Chips */}
          {isAssistant && message.suggestions && message.suggestions.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-0.5">
              {message.suggestions.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSelectSuggestion(sug)}
                  className="px-2 py-0.5 rounded-full text-[10px] bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 transition-all shadow-2xs cursor-pointer text-left"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
