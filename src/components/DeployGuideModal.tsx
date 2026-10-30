'use client';

import React, { useState } from 'react';
import { X, Globe, Database, GitBranch, CheckCircle2, Copy, Check } from 'lucide-react';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeployGuideModal({ isOpen, onClose }: DeployGuideModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-amber-100 flex items-center justify-between bg-amber-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-amber-950 font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900">
                Go Live Checklist: eggcellent.fun
              </h2>
              <p className="text-xs text-neutral-500">
                How to connect your Cloudflare domain, Vercel hosting, and Supabase database
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-200/70 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {/* Step 1: Push to GitHub */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
              1
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-neutral-900 text-sm">Push Code to GitHub</h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Create a private or public repository on <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-amber-600 underline font-semibold">GitHub</a>, then push this local project folder to it:
              </p>
              <div className="relative bg-neutral-900 text-neutral-200 rounded-xl p-3 font-mono text-xs overflow-x-auto">
                <code>
                  git add .<br />
                  git commit -m "Launch Eggcellent"<br />
                  git branch -M main<br />
                  git remote add origin https://github.com/YOUR_USERNAME/eggcellent.git<br />
                  git push -u origin main
                </code>
              </div>
            </div>
          </div>

          {/* Step 2: Deploy to Vercel */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
              2
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-neutral-900 text-sm">Deploy on Vercel</h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Log into <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-amber-600 underline font-semibold">Vercel</a> with your GitHub account, click <strong>"Add New... &gt; Project"</strong>, and import your <code className="bg-neutral-100 px-1 py-0.5 rounded">eggcellent</code> repository. Vercel automatically builds and hosts it for free!
              </p>
            </div>
          </div>

          {/* Step 3: Link eggcellent.fun in Cloudflare */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
              3
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-neutral-900 text-sm">Connect eggcellent.fun in Cloudflare DNS</h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                In your Vercel Project Settings &gt; <strong>Domains</strong>, add <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-bold">eggcellent.fun</code>.
                Then open your <strong>Cloudflare Dashboard &gt; eggcellent.fun &gt; DNS Records</strong>, and add:
              </p>
              
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-neutral-800">Type A:</span> @ &rarr; <code className="font-mono text-amber-800">76.76.21.21</code> (Proxy: DNS Only)
                  </div>
                  <button
                    onClick={() => handleCopy('76.76.21.21', 1)}
                    className="p-1.5 hover:bg-neutral-200 rounded-lg text-neutral-500"
                  >
                    {copiedIndex === 1 ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-neutral-800">Type CNAME:</span> www &rarr; <code className="font-mono text-amber-800">cname.vercel-dns.com</code> (Proxy: DNS Only)
                  </div>
                  <button
                    onClick={() => handleCopy('cname.vercel-dns.com', 2)}
                    className="p-1.5 hover:bg-neutral-200 rounded-lg text-neutral-500"
                  >
                    {copiedIndex === 2 ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Supabase Database Setup */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
              4
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-neutral-900 text-sm">Supabase Setup (Database & Real-time)</h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Create a free project at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-amber-600 underline font-semibold">Supabase.com</a>.
                Open the <strong>SQL Editor</strong>, paste the ready-made script in <code className="bg-neutral-100 px-1 py-0.5 rounded">supabase/schema.sql</code>, and click <strong>Run</strong>.
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Finally, copy your <strong>Project URL</strong> and <strong>anon key</strong> into your Vercel Project Settings &gt; <strong>Environment Variables</strong>:
              </p>
              <div className="bg-neutral-900 text-neutral-200 rounded-xl p-3 font-mono text-xs">
                NEXT_PUBLIC_SUPABASE_URL=...<br />
                NEXT_PUBLIC_SUPABASE_ANON_KEY=...
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Site is fully functional offline & online!</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs sm:text-sm font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
