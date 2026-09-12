import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessageItem } from './components/ChatMessageItem';
import { ChatInput } from './components/ChatInput';
import { DemoModal } from './components/DemoModal';
import { ModulesDrawer } from './components/ModulesDrawer';
import { WordPressEmbedModal } from './components/WordPressEmbedModal';
import { VoiceWaveform } from './components/VoiceWaveform';
import { LiveVoiceView } from './components/LiveVoiceView';
import { useSpeech } from './hooks/useSpeech';
import { ChatMessage, DemoLeadInfo } from './types';
import {
  Calendar,
  Layers,
  Code,
  RotateCcw,
  Volume2,
  VolumeX,
  MessageSquare,
  Radio,
  Check,
} from 'lucide-react';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  role: 'assistant',
  content: `Hello and welcome to **VisionONE Access**.

**"One Platform. Complete Business Visibility."**

I am your official VisionONE AI consultant. Whether you are managing multi-location inventory, navigating Kenya **eTIMS** compliance, automating **M-Pesa** reconciliations, or streamlining **Finance & HR/Payroll**, I'm here to help.

You can speak to me using **Voice** (tap the microphone or switch to Call mode above) or type below. What would you like to explore?`,
  timestamp: Date.now(),
  suggestions: [
    'How does VisionONE connect Finance, eTIMS, and M-Pesa?',
    'We run a construction business with multiple project sites.',
    'Tell me about HR, biometric attendance, and payroll controls.',
    'How is VisionONE priced?',
  ],
  suggestDemo: false,
};

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isModulesDrawerOpen, setIsModulesDrawerOpen] = useState(false);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [demoRequestsCount, setDemoRequestsCount] = useState(0);
  const [selectedDemoModule, setSelectedDemoModule] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLiveVoiceMode, setIsLiveVoiceMode] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const history = messages.slice(-8).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok) {
        throw new Error(`Server returned error code ${res.status}`);
      }

      const data = await res.json();
      const replyContent =
        data.reply ||
        'I am glad to help. Please let me know what specific areas of your business operations you would like to explore with VisionONE.';

      // Dynamic suggestion chips
      let dynamicSuggestions: string[] = [];
      const lower = text.toLowerCase();
      if (lower.includes('etims') || lower.includes('kra') || lower.includes('tax')) {
        dynamicSuggestions = [
          'Can VisionONE auto-transmit invoices to KRA?',
          'What happens during internet connectivity downtime?',
          'Can we book a compliance walkthrough demo?',
        ];
      } else if (lower.includes('mpesa') || lower.includes('m-pesa') || lower.includes('payment')) {
        dynamicSuggestions = [
          'How does STK Push work for customer billing?',
          'Tell me about automatic PayBill matching to accounts receivable.',
          'Schedule an integration demo for finance.',
        ];
      } else if (lower.includes('inventory') || lower.includes('stock') || lower.includes('warehouse')) {
        dynamicSuggestions = [
          'How does multi-warehouse transfer approval work?',
          'Does it support batch/serial tracking and barcode scanning?',
          'Can we see a walkthrough of purchasing & stock reorder levels?',
        ];
      } else if (lower.includes('construction') || lower.includes('project')) {
        dynamicSuggestions = [
          'How do project job costing and subcontractor claims work?',
          'Can we track site materials versus budgeted quantities?',
          'Book a construction ERP demo.',
        ];
      } else {
        dynamicSuggestions = [
          'What ERP modules does VisionONE include?',
          'How does implementation and training work?',
          'Can we schedule an online walkthrough demo?',
        ];
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: Date.now(),
        suggestions: dynamicSuggestions,
        suggestDemo:
          data.suggestDemo ||
          lower.includes('demo') ||
          lower.includes('pricing') ||
          lower.includes('quote') ||
          lower.includes('cost') ||
          lower.includes('buy'),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Read aloud via voice if enabled
      voiceHook.speak(replyContent);
    } catch (err) {
      console.error('Error in chat request:', err);
      const fallbackMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content:
          'VisionONE connects finance, operations, inventory, and compliance into one platform. What area of your business would you like to explore?',
        timestamp: Date.now(),
        suggestions: [
          'Tell me about eTIMS integration',
          'How does M-Pesa integration work?',
          'Can we schedule a demo?',
        ],
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceTranscript = useCallback(
    (transcript: string) => {
      if (transcript.trim() && !isLoading) {
        handleSendMessage(transcript.trim());
      }
    },
    [isLoading]
  );

  const voiceHook = useSpeech(handleVoiceTranscript, isLiveVoiceMode);

  const handleResetChat = () => {
    voiceHook.stopSpeaking();
    voiceHook.stopListening();
    setMessages([INITIAL_MESSAGE]);
    setIsLiveVoiceMode(false);
    showToast('Conversation reset');
  };

  const handleDemoSubmitted = (lead: DemoLeadInfo) => {
    setDemoRequestsCount((prev) => prev + 1);
    setIsDemoModalOpen(false);
    showToast(`Thank you ${lead.name}! Your demo request has been received.`);

    const followUpMsg: ChatMessage = {
      id: `system-${Date.now()}`,
      role: 'assistant',
      content: `Thank you **${lead.name}**! Your walkthrough request for **${lead.company}** has been received by the VisionONE team. A senior solutions consultant will reach out via **${lead.email}** or **${lead.phone || 'phone'}** to coordinate your personalized session.
      
In the meantime, feel free to ask me any further questions about our modules, eTIMS, or M-Pesa integrations!`,
      timestamp: Date.now(),
      suggestions: [
        'What should our team prepare for the demo?',
        'How long does standard implementation take?',
        'What ERP modules are recommended for our sector?',
      ],
      suggestDemo: false,
    };
    setMessages((prev) => [...prev, followUpMsg]);
  };

  useEffect(() => {
    if (!isLiveVoiceMode) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isLiveVoiceMode]);

  const currentAppUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === 'assistant');

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-900/5 sm:bg-slate-100 overflow-hidden font-sans select-none sm:p-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 z-50 bg-slate-900 text-white px-3.5 py-2 rounded-xl shadow-lg text-xs font-medium flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* The ONE Sole Widget */}
      <div className="w-full h-full sm:max-w-[380px] sm:h-[580px] sm:max-h-[calc(100vh-32px)] bg-white sm:rounded-2xl sm:shadow-2xl sm:border sm:border-slate-200/90 flex flex-col overflow-hidden transition-all duration-200">
        {/* Sleek Widget Header */}
        <div className="bg-slate-900 text-white px-3.5 py-2.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          {/* Brand Identity */}
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

          {/* Mode Switcher Pill (Chat vs Call) */}
          <div className="flex items-center bg-slate-800/90 p-0.5 rounded-lg border border-slate-700/60 text-[11px]">
            <button
              type="button"
              onClick={() => setIsLiveVoiceMode(false)}
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
                setIsLiveVoiceMode(true);
                if (!voiceHook.isListening) {
                  voiceHook.startListening();
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

          {/* Action Icons */}
          <div className="flex items-center gap-0.5 text-slate-400 shrink-0">
            {/* Voice Mute/Unmute */}
            {voiceHook.ttsSupported && (
              <button
                type="button"
                onClick={voiceHook.toggleVoiceOutput}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  voiceHook.voiceEnabled ? 'text-blue-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-800'
                }`}
                title={voiceHook.voiceEnabled ? 'Voice readout is ON' : 'Voice readout is MUTED'}
              >
                {voiceHook.voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Modules Drawer */}
            <button
              type="button"
              onClick={() => setIsModulesDrawerOpen(true)}
              className="p-1.5 rounded-md hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="View ERP Modules"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>

            {/* Book Walkthrough Demo */}
            <button
              type="button"
              onClick={() => {
                setSelectedDemoModule(undefined);
                setIsDemoModalOpen(true);
              }}
              className="p-1.5 rounded-md hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Request a Walkthrough"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-300" />
            </button>

            {/* Embed Code Modal */}
            <button
              type="button"
              onClick={() => setIsEmbedModalOpen(true)}
              className="p-1.5 rounded-md hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Get Website Embed Code"
            >
              <Code className="w-3.5 h-3.5" />
            </button>

            {/* Reset Chat */}
            <button
              type="button"
              onClick={handleResetChat}
              className="p-1.5 rounded-md hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Reset conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Widget Body */}
        {isLiveVoiceMode ? (
          <LiveVoiceView
            isListening={voiceHook.isListening}
            isSpeaking={voiceHook.isSpeaking}
            isLoading={isLoading}
            interimTranscript={voiceHook.interimTranscript}
            lastUserSpeech={lastUserMsg ? lastUserMsg.content : ''}
            lastAssistantSpeech={lastAssistantMsg ? lastAssistantMsg.content : ''}
            selectedVoiceName={voiceHook.selectedVoiceName}
            voiceEnabled={voiceHook.voiceEnabled}
            onStartListening={voiceHook.startListening}
            onStopListening={voiceHook.stopListening}
            onStopSpeaking={voiceHook.stopSpeaking}
            onToggleVoiceOutput={voiceHook.toggleVoiceOutput}
            onSwitchToText={() => setIsLiveVoiceMode(false)}
            onEndLiveVoice={() => setIsLiveVoiceMode(false)}
            onQuickPrompt={(text) => handleSendMessage(text)}
          />
        ) : (
          <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
            {/* Active Voice Speaking Waveform */}
            {voiceHook.isSpeaking && (
              <div className="bg-blue-50/90 border-b border-blue-100 px-3 py-1 text-xs">
                <VoiceWaveform
                  state="speaking"
                  label="Speaking response aloud..."
                  onStop={voiceHook.stopSpeaking}
                />
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 min-h-0 text-xs">
              {messages.map((msg) => (
                <ChatMessageItem
                  key={msg.id}
                  message={msg}
                  onSelectSuggestion={handleSendMessage}
                  onRequestDemo={() => {
                    setSelectedDemoModule(undefined);
                    setIsDemoModalOpen(true);
                  }}
                  onSpeak={voiceHook.speak}
                  isSpeakingThis={voiceHook.isSpeaking}
                />
              ))}

              {/* Loading Indicator */}
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

            {/* Sticky Compact Chat Input */}
            <div className="shrink-0 bg-white border-t border-slate-200/80">
              <ChatInput
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                onSelectPrompt={handleSendMessage}
                isListening={voiceHook.isListening}
                interimTranscript={voiceHook.interimTranscript}
                onStartListening={voiceHook.startListening}
                onStopListening={voiceHook.stopListening}
                speechSupported={voiceHook.speechSupported}
                micPermissionError={voiceHook.micPermissionError}
                isWidgetMode={true}
              />
            </div>
          </div>
        )}
      </div>

      {/* Demo Walkthrough Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSubmitted={handleDemoSubmitted}
        initialModules={selectedDemoModule ? [selectedDemoModule] : []}
      />

      {/* ERP Modules Drawer */}
      <ModulesDrawer
        isOpen={isModulesDrawerOpen}
        onClose={() => setIsModulesDrawerOpen(false)}
        onSelectModuleQuestion={handleSendMessage}
        onRequestDemoForModule={(moduleTitle) => {
          setSelectedDemoModule(moduleTitle);
          setIsDemoModalOpen(true);
        }}
      />

      {/* Website & WordPress Embed Code Modal */}
      <WordPressEmbedModal
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
        appUrl={currentAppUrl}
      />
    </div>
  );
}
