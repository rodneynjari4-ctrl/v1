import React, { useState } from 'react';
import { X, CheckCircle2, Send, Building, Mail, User, Phone, Briefcase, Database, AlertCircle } from 'lucide-react';
import { DemoLeadInfo } from '../types';
import { VISIONONE_ERP_MODULES } from '../data/visionOneKnowledge';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: (lead: DemoLeadInfo) => void;
  initialIndustry?: string;
  initialModules?: string[];
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  onSubmitted,
  initialIndustry = '',
  initialModules = [],
}) => {
  const [formData, setFormData] = useState<DemoLeadInfo>({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: initialIndustry || 'Manufacturing',
    companySize: '11-50 employees',
    currentSystem: 'Excel / Spreadsheets',
    mainChallenge: '',
    modulesOfInterest: initialModules.length > 0 ? initialModules : ['Finance & Accounting', 'Inventory & Procurement'],
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleModule = (moduleTitle: string) => {
    setFormData((prev) => {
      const exists = prev.modulesOfInterest.includes(moduleTitle);
      return {
        ...prev,
        modulesOfInterest: exists
          ? prev.modulesOfInterest.filter((m) => m !== moduleTitle)
          : [...prev.modulesOfInterest, moduleTitle],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
      setErrorMsg('Please complete your name, work email, and company name.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit demo request');
      }

      setIsSuccess(true);
      onSubmitted(formData);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Request a VisionONE Walkthrough
            </h2>
            <p className="text-xs text-slate-500">
              Personalized demo tailored to your operational and financial workflows
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Demo Request Received
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>! Our VisionONE specialist team will review your business requirements for <span className="font-semibold text-slate-800">{formData.company}</span> and reach out to schedule your personalized session.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs text-slate-600 space-y-1 max-w-md mx-auto">
              <div><span className="font-medium text-slate-700">Industry:</span> {formData.industry}</div>
              <div><span className="font-medium text-slate-700">Current System:</span> {formData.currentSystem}</div>
              <div><span className="font-medium text-slate-700">Selected Modules:</span> {formData.modulesOfInterest.join(', ') || 'All Modules'}</div>
            </div>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                Back to Assistant
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Jane Mwangi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Work Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Work Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="jane@company.co.ke"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Organization *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Manufacturing Ltd"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    placeholder="+254 7..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                >
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Construction">Construction</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Distribution">Distribution & Wholesale</option>
                  <option value="Property">Property Management</option>
                  <option value="Professional and Business Services">Professional & Business Services</option>
                  <option value="Other">Other Industry</option>
                </select>
              </div>

              {/* Company Size */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Size
                </label>
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                >
                  <option value="1-10 employees">1 - 10 employees</option>
                  <option value="11-50 employees">11 - 50 employees</option>
                  <option value="51-200 employees">51 - 200 employees</option>
                  <option value="201-500 employees">201 - 500 employees</option>
                  <option value="500+ employees">500+ employees</option>
                </select>
              </div>

              {/* Current System */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current System / Software
                </label>
                <div className="relative">
                  <Database className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="e.g. Excel spreadsheets, QuickBooks, Sage, Odoo, manual paperwork"
                    value={formData.currentSystem}
                    onChange={(e) => setFormData({ ...formData, currentSystem: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Modules of Interest */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Modules of Primary Interest (Select all that apply)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {VISIONONE_ERP_MODULES.map((mod) => {
                  const isSelected = formData.modulesOfInterest.includes(mod.title);
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => toggleModule(mod.title)}
                      className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="truncate">{mod.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Business Challenge */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Main Business Challenge or Question
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Disconnected inventory between warehouse and sales, eTIMS invoicing delays, biometric attendance sync..."
                value={formData.mainChallenge}
                onChange={(e) => setFormData({ ...formData, mainChallenge: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Demo Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
