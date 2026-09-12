import React from 'react';
import { ExternalLink, Calendar, Grid, RefreshCw, Layers } from 'lucide-react';

interface HeaderProps {
  onOpenDemo: () => void;
  onOpenModules: () => void;
  onResetChat: () => void;
  onRequestCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDemo,
  onOpenModules,
  onResetChat,
  onRequestCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 shrink-0">
            <span className="text-xl tracking-tight">V1</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
                VisionONE Access
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Official AI Consultant
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate">
              One Platform. Complete Business Visibility.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenModules}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Browse all 14 VisionONE ERP modules"
          >
            <Grid className="w-4 h-4 text-blue-600" />
            <span className="hidden md:inline">ERP Modules</span>
          </button>

          <a
            href="https://www.visionerpsolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Visit official website"
          >
            <span>Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <button
            onClick={onOpenDemo}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-600/25 transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Request Demo</span>
            {onRequestCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-blue-800 text-white font-bold">
                {onRequestCount}
              </span>
            )}
          </button>

          <button
            onClick={onResetChat}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Reset conversation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
