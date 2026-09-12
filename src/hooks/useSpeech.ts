import { useState, useEffect, useRef, useCallback } from 'react';

// SpeechRecognition type declarations for browsers
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => any) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEvent) => any) | null;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: {
      new (): SpeechRecognitionInstance;
    };
    webkitSpeechRecognition?: {
      new (): SpeechRecognitionInstance;
    };
  }
}

export type LiveVoiceState = 'idle' | 'listening' | 'processing' | 'speaking';

export function useSpeech(
  onTranscriptReceived?: (transcript: string) => void,
  isLiveVoiceActive: boolean = false
) {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(false);
  const [micPermissionError, setMicPermissionError] = useState<string | null>(null);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isLiveVoiceRef = useRef<boolean>(isLiveVoiceActive);
  const onTranscriptReceivedRef = useRef(onTranscriptReceived);

  // Keep refs up to date
  useEffect(() => {
    isLiveVoiceRef.current = isLiveVoiceActive;
  }, [isLiveVoiceActive]);

  useEffect(() => {
    onTranscriptReceivedRef.current = onTranscriptReceived;
  }, [onTranscriptReceived]);

  // Find the warmest and friendliest natural voice available in the browser
  const getWarmFriendlyVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Preference list for warmest, highest-fidelity natural voices
    const warmVoiceKeywords = [
      'Natural',
      'Jenny',
      'Aria',
      'Google UK English Female',
      'Google US English',
      'Samantha',
      'Karen',
      'Victoria',
      'Serena',
      'Moira',
      'Fiona',
      'Nora',
      'Zira',
    ];

    for (const keyword of warmVoiceKeywords) {
      const match = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          v.name.toLowerCase().includes(keyword.toLowerCase())
      );
      if (match) {
        return match;
      }
    }

    // Fallback to any high-quality English voice
    const anyEn = voices.find((v) => v.lang.startsWith('en'));
    return anyEn || voices[0] || null;
  }, []);

  // Initialize Speech Recognition & Synthesis on mount
  useEffect(() => {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionClass) {
      setSpeechSupported(true);
      try {
        const recognition = new SpeechRecognitionClass();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setInterimTranscript('');
          setMicPermissionError(null);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let currentText = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              currentText += transcript;
              setInterimTranscript('');
              setFinalTranscript(currentText.trim());
              if (onTranscriptReceivedRef.current) {
                onTranscriptReceivedRef.current(currentText.trim());
              }
            } else {
              currentText += transcript;
              setInterimTranscript(currentText);
            }
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.warn('Speech recognition event:', event.error);
          setIsListening(false);
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setMicPermissionError('Microphone permission was denied. Please allow microphone access in your browser.');
          } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
            setMicPermissionError(`Microphone notice: ${event.error}`);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('Could not initialize SpeechRecognition:', err);
      }
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setTtsSupported(true);

      const updateVoices = () => {
        const voice = getWarmFriendlyVoice();
        if (voice) {
          setSelectedVoiceName(voice.name);
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [getWarmFriendlyVoice]);

  // Clean Markdown & format text for fluid, natural spoken cadence
  const cleanMarkdownForWarmSpeech = (raw: string): string => {
    return raw
      .replace(/[*_#`~[\]]/g, '')
      .replace(/\((https?:\/\/[^\s)]+)\)/g, '')
      .replace(/\*\(Note:[^)]*\)\*/gi, '') // drop disclaimer from spoken audio to keep it warm and conversational
      .replace(/^\s*[-•]\s*/gm, ', ') // replace bullets with natural vocal pauses
      .replace(/\n\n+/g, '. ')
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setMicPermissionError('Voice input is not supported in this browser. You can still type your questions.');
      return;
    }

    // Stop speaking if currently speaking
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    try {
      setMicPermissionError(null);
      recognitionRef.current.start();
    } catch (err: any) {
      try {
        recognitionRef.current.abort();
        setTimeout(() => {
          try {
            recognitionRef.current?.start();
          } catch (_) {}
        }, 120);
      } catch (_) {}
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    setIsListening(false);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback(
    (text: string, onSpeechFinished?: () => void) => {
      if (!ttsSupported || !voiceEnabled || !text) return;

      try {
        window.speechSynthesis.cancel();

        const cleanText = cleanMarkdownForWarmSpeech(text);
        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);

        // Tuning for warm, friendly, natural human speech:
        // pitch: 1.04 gives a gentle, warm, upbeat tone
        // rate: 0.98 ensures clear, measured, friendly pacing
        utterance.rate = 0.98;
        utterance.pitch = 1.04;
        utterance.lang = 'en-US';

        const preferredVoice = getWarmFriendlyVoice();
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.onstart = () => {
          setIsSpeaking(true);
        };

        utterance.onend = () => {
          setIsSpeaking(false);
          if (onSpeechFinished) {
            onSpeechFinished();
          }
          // If in Live Voice Mode, automatically re-arm listening for a seamless live voice conversation!
          if (isLiveVoiceRef.current) {
            setTimeout(() => {
              if (isLiveVoiceRef.current) {
                startListening();
              }
            }, 500);
          }
        };

        utterance.onerror = (e) => {
          console.warn('Speech synthesis notice:', e);
          setIsSpeaking(false);
        };

        currentUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Text-to-speech error:', err);
        setIsSpeaking(false);
      }
    },
    [ttsSupported, voiceEnabled, getWarmFriendlyVoice, startListening]
  );

  const toggleVoiceOutput = useCallback(() => {
    setVoiceEnabled((prev) => {
      if (prev) {
        stopSpeaking();
      }
      return !prev;
    });
  }, [stopSpeaking]);

  return {
    isListening,
    interimTranscript,
    finalTranscript,
    isSpeaking,
    voiceEnabled,
    speechSupported,
    ttsSupported,
    micPermissionError,
    selectedVoiceName,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    toggleVoiceOutput,
  };
}
