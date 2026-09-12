export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  suggestions?: string[];
  suggestDemo?: boolean;
}

export interface DemoLeadInfo {
  name: string;
  email: string;
  phone?: string;
  company: string;
  industry: string;
  companySize: string;
  currentSystem: string;
  mainChallenge: string;
  modulesOfInterest: string[];
  additionalNotes?: string;
}

export interface ERPModuleInfo {
  id: string;
  title: string;
  icon: string;
  summary: string;
  capabilities: string[];
  industryFit: string[];
  guidanceNote?: string;
}

export interface IndustryInfo {
  id: string;
  name: string;
  focusAreas: string[];
  sampleQuestion: string;
}
