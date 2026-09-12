import React from 'react';
import { Building2, Factory, HardHat, Wheat, ShoppingBag, Briefcase, ArrowRight, ShieldCheck, CheckCircle, Calendar } from 'lucide-react';
import { VISIONONE_INDUSTRIES } from '../data/visionOneKnowledge';

interface WelcomeCardProps {
  onSelectPrompt: (prompt: string) => void;
  onRequestDemo: () => void;
  onOpenModules: () => void;
}

const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
  manufacturing: <Factory className="w-4 h-4 text-amber-600" />,
  construction: <HardHat className="w-4 h-4 text-orange-600" />,
  agriculture: <Wheat className="w-4 h-4 text-emerald-600" />,
  distribution: <ShoppingBag className="w-4 h-4 text-blue-600" />,
  property: <Building2 className="w-4 h-4 text-rose-600" />,
  services: <Briefcase className="w-4 h-4 text-indigo-600" />,
};

export const WelcomeCard: React.FC<WelcomeCardProps> = ({
  onSelectPrompt,
  onRequestDemo,
  onOpenModules,
}) => {
  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      {/* Intro Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Official VisionONE Access AI Consultant</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          One Platform. Complete Business Visibility.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          VisionONE Access simplifies and connects your core operations—unifying Finance, HR & Payroll, Inventory, eTIMS, M-Pesa, and Reporting into one connected system.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> eTIMS & KRA Workflows
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> M-Pesa STK & PayBill
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Biometric HR & Payroll
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Multi-Company & Branches
          </span>
        </div>
      </div>

      {/* Select Industry Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Tailor VisionONE to Your Industry
            </h3>
            <p className="text-xs text-slate-500">
              Select your sector to discover how connected workflows fit your specific operations:
            </p>
          </div>
          <button
            onClick={onOpenModules}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Browse all 14 modules →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {VISIONONE_INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              onClick={() => onSelectPrompt(ind.sampleQuestion)}
              className="text-left p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-300 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1">
                {INDUSTRY_ICONS[ind.id] || <Building2 className="w-4 h-4 text-blue-600" />}
                <span className="text-xs font-bold text-slate-800 group-hover:text-blue-900">
                  {ind.name}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2">
                {ind.focusAreas.slice(0, 3).join(', ')}...
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Direct CTA Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md shadow-blue-600/15">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-sm font-bold tracking-tight">
            Ready to see VisionONE in action?
          </div>
          <p className="text-xs text-blue-100 max-w-md">
            Request a personalized walkthrough with our ERP specialists or ask our AI consultant any product questions.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onRequestDemo}
            className="px-4 py-2 rounded-xl bg-white text-blue-700 font-semibold text-xs hover:bg-blue-50 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Request a Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
