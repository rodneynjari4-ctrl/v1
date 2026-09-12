import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Landmark, Smartphone, FileCheck, Layers, ExternalLink, Calendar } from 'lucide-react';

interface WordPressSitePreviewProps {
  onRequestDemo: () => void;
  onOpenWidget: () => void;
}

export const WordPressSitePreview: React.FC<WordPressSitePreviewProps> = ({
  onRequestDemo,
  onOpenWidget,
}) => {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* WordPress Navigation Bar */}
      <nav className="border-b border-slate-100 bg-white/95 sticky top-0 z-10 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-700 text-white font-bold flex items-center justify-center text-lg shadow-sm">
              V1
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                VisionONE Access
              </span>
              <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider block">
                Enterprise ERP Platform
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#modules" className="hover:text-blue-600 transition-colors">ERP Modules</a>
            <a href="#compliance" className="hover:text-blue-600 transition-colors">eTIMS & KRA</a>
            <a href="#mpesa" className="hover:text-blue-600 transition-colors">M-Pesa Integration</a>
            <a href="#industries" className="hover:text-blue-600 transition-colors">Industries</a>
            <a
              href="https://www.visionerpsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <span>visionerpsolutions.com</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRequestDemo}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Demo</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>One Platform. Complete Business Visibility.</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Connect Operations, Finance, Inventory & Compliance.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              VisionONE Access eliminates disconnected systems and duplicate data entry. Built for growing businesses requiring unified General Ledger, eTIMS electronic invoicing, M-Pesa reconciliation, and biometric workforce management.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenWidget}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Talk to VisionONE AI (Voice & Text)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onRequestDemo}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Request Walkthrough
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div>
                <div className="text-lg font-bold text-slate-900">14+</div>
                <div className="text-slate-500">Connected Modules</div>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">eTIMS & KRA</div>
                <div className="text-slate-500">Integrated Workflows</div>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">M-Pesa STK</div>
                <div className="text-slate-500">Automated Reconciliations</div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <span className="text-xs font-semibold text-blue-300">Live Executive Dashboard</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Consolidated
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Landmark className="w-4 h-4 text-blue-400" />
                    <span>General Ledger & Cash Flow</span>
                  </div>
                  <span className="font-semibold text-emerald-400">Reconciled</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileCheck className="w-4 h-4 text-teal-400" />
                    <span>eTIMS Electronic Invoicing</span>
                  </div>
                  <span className="font-semibold text-teal-300">Synchronized</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                    <span>M-Pesa PayBill & STK Push</span>
                  </div>
                  <span className="font-semibold text-cyan-300">Auto-Matched</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>Multi-Warehouse Inventory</span>
                  </div>
                  <span className="font-semibold text-purple-300">Real-time Stock</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/50 text-[11px] text-blue-200">
                👉 <strong>Try the Voice Assistant widget</strong> floating on the bottom-right corner to ask questions hands-free!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="modules" className="py-12 bg-slate-50 border-t border-slate-200 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Why Kenyan & Regional Enterprises Choose VisionONE
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Eliminate software silos. Give management real-time operational clarity across branches and entities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">eTIMS & Tax Automation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect electronic invoicing workflows and KRA tax reconciliation directly to sales and accounting, preventing audit headaches.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Seamless M-Pesa Reconciliation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatically capture PayBill/Till receipts, trigger STK Push collections, match incoming payments to invoices, and flag exceptions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Full Inventory & Procurement Control</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Requisition-to-purchase workflows, multi-location stock valuations, and approval matrices to stop inventory leakage and guesswork.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
