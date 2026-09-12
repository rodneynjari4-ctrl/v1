import React, { useState } from 'react';
import { X, Copy, Check, Code, Globe, CheckCircle2, Laptop, ShieldCheck, ChevronRight } from 'lucide-react';

interface WordPressEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl: string;
}

export const WordPressEmbedModal: React.FC<WordPressEmbedModalProps> = ({
  isOpen,
  onClose,
  appUrl,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [widgetPosition, setWidgetPosition] = useState<'right' | 'left'>('right');
  const [activeTab, setActiveTab] = useState<'wordpress' | 'html' | 'iframe'>('wordpress');

  if (!isOpen) return null;

  const rawUrl =
    appUrl ||
    (typeof window !== 'undefined' ? window.location.origin : 'https://your-visionone-assistant.run.app');
  // Convert private dev container URL (ais-dev-) to publicly accessible shared URL (ais-pre-)
  const currentUrl = rawUrl.replace('ais-dev-', 'ais-pre-');

  // Single-line loader script snippet for website or WordPress footer
  const scriptSnippet = `<!-- VisionONE AI Assistant Widget -->
<script
  id="visionone-widget"
  src="${currentUrl}/widget-loader.js"
  data-app-url="${currentUrl}"
  data-position="${widgetPosition}"
  async
></script>`;

  // Standard iFrame Embed for dedicated support or consulting page
  const iframeSnippet = `<iframe
  src="${currentUrl}?widget=true&embedded=true"
  title="VisionONE ERP Assistant"
  width="100%"
  height="560px"
  style="max-width: 400px; border: none; border-radius: 16px; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.15);"
  allow="microphone; clipboard-write;"
></iframe>`;

  const copyToClipboard = (text: string, typeKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(typeKey);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Install VisionONE Assistant on Your Website
              </h2>
              <p className="text-[11px] text-slate-500">
                Sleek, compact floating widget with live voice & text ERP assistance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[78vh] overflow-y-auto text-xs">
          {/* Platform Switcher Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('wordpress')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'wordpress'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>WordPress (Easiest)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'html'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Any Website / HTML</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('iframe')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'iframe'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Page Embed (iFrame)</span>
            </button>
          </div>

          {/* Position Selector */}
          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
            <span className="font-semibold text-[11px]">Widget Placement:</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setWidgetPosition('right')}
                className={`py-1 px-2.5 rounded-lg font-semibold text-[11px] transition-all cursor-pointer ${
                  widgetPosition === 'right'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Bottom Right (Recommended)
              </button>
              <button
                type="button"
                onClick={() => setWidgetPosition('left')}
                className={`py-1 px-2.5 rounded-lg font-semibold text-[11px] transition-all cursor-pointer ${
                  widgetPosition === 'left'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Bottom Left
              </button>
            </div>
          </div>

          {/* Code Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                {activeTab === 'iframe' ? 'iFrame Embed Code' : 'JavaScript Embed Snippet'}
              </span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    activeTab === 'iframe' ? iframeSnippet : scriptSnippet,
                    activeTab
                  )
                }
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                {copiedType === activeTab ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[11px] font-mono overflow-x-auto selection:bg-blue-500 leading-relaxed border border-slate-800">
              {activeTab === 'iframe' ? iframeSnippet : scriptSnippet}
            </pre>
          </div>

          {/* Step-by-Step Instructions based on active tab */}
          {activeTab === 'wordpress' && (
            <div className="space-y-3 p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl text-slate-800">
              <h3 className="font-bold text-xs text-blue-900 flex items-center gap-1">
                <span>Exact Steps for WordPress (Takes under 2 minutes):</span>
              </h3>

              <div className="space-y-2 text-[11px] leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong>Copy the code snippet above</strong> by clicking the blue <strong>"Copy Code"</strong> button.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    Log in to your <strong>WordPress Admin Dashboard</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    Go to <strong>Plugins → Add New</strong> and install the free plugin <strong>"WPCode"</strong> (or <em>"Insert Headers and Footers"</em>).
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    In the left sidebar, click <strong>Code Snippets → Header & Footer</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    5
                  </span>
                  <div>
                    Paste the copied code directly into the <strong>Footer</strong> box, then click <strong>Save Changes</strong>.
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-200/80 flex items-center gap-1.5 text-[10px] text-blue-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>That's it! Visit your website and you will see the sleek VisionONE Voice & Text bubble floating in the corner.</span>
              </div>
            </div>
          )}

          {activeTab === 'html' && (
            <div className="space-y-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800">
              <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1">
                <span>Implementation on Any HTML, Webflow, Shopify, or Custom Site:</span>
              </h3>

              <div className="space-y-2 text-[11px] leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    Copy the JavaScript embed snippet above.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    Open your website's template or HTML file (e.g. <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[10px]">index.html</code>, <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[10px]">footer.html</code>, or Shopify's <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[10px]">theme.liquid</code>).
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    Paste the snippet right before the closing <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[10px]">&lt;/body&gt;</code> tag.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    Publish or deploy your changes. The widget will automatically initialize and load.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'iframe' && (
            <div className="space-y-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800">
              <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1">
                <span>Dedicated Page Embed (e.g. Contact, Support, or Consultation Page):</span>
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                If you prefer embedding the assistant directly inside a section or page rather than a floating corner bubble (for instance using <strong>Elementor Custom HTML</strong>, <strong>Divi Code Module</strong>, or <strong>Gutenberg HTML Block</strong>), use the iFrame snippet above. It already includes the necessary <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[10px]">allow="microphone"</code> attribute for voice interaction.
              </p>
            </div>
          )}

          {/* Security & Microphone note */}
          <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 flex items-center gap-2 text-[10px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <strong>HTTPS Requirement:</strong> Web browser microphone security requires your website to have an SSL certificate (<code className="font-mono">https://</code>), which all modern WordPress hosts provide automatically.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
