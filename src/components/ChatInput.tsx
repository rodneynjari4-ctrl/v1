import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Building, FileCheck, CreditCard, DollarSign, Package, Mic, MicOff, AlertCircle } from 'lucide-react';
import { VoiceWaveform } from './VoiceWaveform';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onSelectPrompt: (text: string) => void;
  isListening?: boolean;
  interimTranscript?: string;
  onStartListening?: () => void;
  onStopListening?: () => void;
  speechSupported?: boolean;
  micPermissionError?: string | null;
  isWidgetMode?: boolean;
}

const QUICK_ACTIONS = [
  {
    label: 'eTIMS & KRA',
    icon: <FileCheck className="w-3 h-3 text-emerald-600" />,
    query: 'How does VisionONE support eTIMS electronic invoicing and KRA automation in Kenya?',
  },
  {
    label: 'M-Pesa Flow',
    icon: <CreditCard className="w-3 h-3 text-blue-600" />,
    query: 'What M-Pesa capabilities are supported, like STK Push, PayBill reconciliation, and receipts?',
  },
  {
    label: 'Pricing & Demo',
    icon: <DollarSign className="w-3 h-3 text-amber-600" />,
    query: 'How is VisionONE priced, and how can we schedule a demo?',
  },
  {
    label: 'Multi-Warehouse',
    icon: <Package className="w-3 h-3 text-indigo-600" />,
    query: 'We have multi-location stock and purchasing workflows. How does VisionONE help?',
  },
  {
    label: 'Construction',
    icon: <Building className="w-3 h-3 text-orange-600" />,
    query: 'I run a construction firm managing multiple sites. How does project accounting work?',
  },
];

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  onSelectPrompt,
  isListening = false,
  interimTranscript = '',
  onStartListening,
  onStopListening,
  speechSupported = true,
  micPermissionError = null,
  isWidgetMode = false,
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isLoading && textareaRef.current && !isListening) {
      textareaRef.current.focus();
    }
  }, [isLoading, isListening]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isListening && onStopListening) {
      onStopListening();
    }
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleToggleVoice = () => {
    if (isListening) {
      onStopListening?.();
    } else {
      onStartListening?.();
    }
  };

  return (
    <div className={`border-t border-slate-200/80 bg-white ${isWidgetMode ? 'p-2' : 'p-3 sm:p-4 max-w-4xl mx-auto w-full'}`}>
      {/* Quick Action Chips */}
      {!isListening && (
        <div className="flex items-center gap-1 overflow-x-auto pb-1.5 mb-0.5 text-xs no-scrollbar">
          <span className="text-slate-400 text-[10px] font-medium flex items-center gap-0.5 shrink-0 pl-0.5 mr-0.5">
            <Sparkles className="w-2.5 h-2.5 text-blue-500" />
            <span>Topics:</span>
          </span>
          {QUICK_ACTIONS.map((action, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSelectPrompt(action.query)}
              disabled={isLoading || isListening}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 text-slate-700 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 disabled:opacity-50 cursor-pointer text-[10px]"
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Live Voice Recording Status */}
      {isListening && (
        <div className="mb-1.5">
          <VoiceWaveform
            state="listening"
            label={interimTranscript ? `"${interimTranscript}"` : 'Listening... Speak now'}
            onStop={onStopListening}
          />
        </div>
      )}

      {/* Mic Permission Warning */}
      {micPermissionError && (
        <div className="mb-1.5 p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[10px] flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="truncate">{micPermissionError}</span>
        </div>
      )}

      {/* Compact Input Box */}
      <div
        className={`relative flex items-center bg-slate-50/80 border rounded-xl transition-all px-1.5 py-1 ${
          isListening
            ? 'border-rose-400 ring-2 ring-rose-500/20 bg-rose-50/20'
            : 'border-slate-200 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15'
        }`}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isListening
              ? 'Listening to your voice...'
              : isWidgetMode
              ? 'Type or tap mic to speak...'
              : 'Ask a question about VisionONE ERP, eTIMS, M-Pesa...'
          }
          disabled={isLoading}
          className="w-full resize-none bg-transparent px-2 py-1 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden max-h-20 min-h-[32px] leading-relaxed"
          style={{ height: 'auto' }}
        />

        <div className="flex items-center gap-1 shrink-0">
          {/* Microphone Button */}
          {speechSupported && onStartListening && (
            <button
              type="button"
              onClick={handleToggleVoice}
              disabled={isLoading}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse shadow-xs ring-2 ring-rose-300'
                  : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50/80'
              }`}
              title={isListening ? 'Stop mic' : 'Speak using microphone'}
              aria-label={isListening ? 'Stop mic' : 'Speak using microphone'}
            >
              {isListening ? (
                <MicOff className="w-3.5 h-3.5" />
              ) : (
                <Mic className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          {/* Send Button */}
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={!input.trim() || isLoading}
            className={`p-1.5 rounded-lg font-semibold text-xs flex items-center justify-center transition-all cursor-pointer ${
              input.trim() && !isLoading
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                : 'text-slate-300 bg-slate-100 cursor-not-allowed'
            }`}
            title="Send message"
            aria-label="Send message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
