import React, { useState } from 'react';
import { X, Search, ChevronRight, Check, Sparkles, Building, Landmark, Users, Smartphone, Package, FileCheck, ShieldCheck, CreditCard, Briefcase, Truck, Building2, BarChart3, Layers, Lock, FolderKanban } from 'lucide-react';
import { VISIONONE_ERP_MODULES } from '../data/visionOneKnowledge';
import { ERPModuleInfo } from '../types';

interface ModulesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModuleQuestion: (question: string) => void;
  onRequestDemoForModule: (moduleTitle: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Landmark: <Landmark className="w-5 h-5 text-blue-600" />,
  Users: <Users className="w-5 h-5 text-indigo-600" />,
  Smartphone: <Smartphone className="w-5 h-5 text-cyan-600" />,
  Package: <Package className="w-5 h-5 text-amber-600" />,
  FileCheck: <FileCheck className="w-5 h-5 text-emerald-600" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-teal-600" />,
  CreditCard: <CreditCard className="w-5 h-5 text-green-600" />,
  Briefcase: <Briefcase className="w-5 h-5 text-violet-600" />,
  Truck: <Truck className="w-5 h-5 text-orange-600" />,
  Building2: <Building2 className="w-5 h-5 text-rose-600" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-blue-700" />,
  Layers: <Layers className="w-5 h-5 text-purple-600" />,
  Lock: <Lock className="w-5 h-5 text-slate-700" />,
  FolderKanban: <FolderKanban className="w-5 h-5 text-sky-600" />
};

export const ModulesDrawer: React.FC<ModulesDrawerProps> = ({
  isOpen,
  onClose,
  onSelectModuleQuestion,
  onRequestDemoForModule,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState<ERPModuleInfo | null>(null);

  if (!isOpen) return null;

  const filteredModules = VISIONONE_ERP_MODULES.filter((m) => {
    const q = searchTerm.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.summary.toLowerCase().includes(q) ||
      m.capabilities.some((c) => c.toLowerCase().includes(q))
    );
  });

  const handleAsk = (mod: ERPModuleInfo) => {
    onSelectModuleQuestion(`Can you explain the capabilities of the ${mod.title} module and how it connects with the rest of VisionONE?`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>VisionONE ERP Modules</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                14 Connected Areas
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              One connected platform. No duplicate entries or disconnected data.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search capabilities (e.g. eTIMS, M-Pesa, Payroll, Biometric, Ledger)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        {/* Module Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredModules.map((mod) => {
            const isExpanded = selectedModule?.id === mod.id;
            return (
              <div
                key={mod.id}
                className={`rounded-2xl border transition-all ${
                  isExpanded
                    ? 'border-blue-500 bg-blue-50/30 ring-1 ring-blue-500/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div
                  onClick={() => setSelectedModule(isExpanded ? null : mod)}
                  className="p-4 flex items-start justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2 rounded-xl bg-slate-100 shrink-0">
                      {ICON_MAP[mod.icon] || <Building className="w-5 h-5 text-blue-600" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
                        {mod.summary}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isExpanded ? 'rotate-90 text-blue-600' : ''
                    }`}
                  />
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100/80 space-y-3 text-xs text-slate-700">
                    <div>
                      <div className="font-semibold text-slate-900 mb-1.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Included Capabilities</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-1">
                        {mod.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-slate-600">
                            <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {mod.guidanceNote && (
                      <div className="p-2.5 rounded-lg bg-slate-100/80 text-slate-600 italic">
                        {mod.guidanceNote}
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        onClick={() => handleAsk(mod)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium transition-colors"
                      >
                        Ask Assistant
                      </button>
                      <button
                        onClick={() => {
                          onRequestDemoForModule(mod.title);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-xs transition-colors"
                      >
                        Request Demo for this Module
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>VisionONE ERP Platform</span>
          <a
            href="https://www.visionerpsolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            visionerpsolutions.com
          </a>
        </div>
      </div>
    </div>
  );
};
