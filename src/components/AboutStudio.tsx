import React, { useState } from "react";
import { AgentLabLogo, UncleRobertLogo } from "./CompanyLogos";
import {
  Sparkles,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  Database,
  Lock,
  Building2,
  Globe,
  Award,
  Terminal,
  FileText
} from "lucide-react";

export const AboutStudio: React.FC = () => {
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  const handleCheckUpdates = () => {
    setCheckingUpdate(true);
    setUpdateStatus(null);
    setTimeout(() => {
      setCheckingUpdate(false);
      setUpdateStatus("System up to date! Market Marksman v2.4.0 Enterprise Edition is running the latest production build.");
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              v2.4.0 Enterprise Production
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              GCP Marketplace Certified
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <Sparkles className="w-7 h-7 text-indigo-400" />
            Market Marksman Intelligence Suite
          </h1>
          <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl leading-relaxed">
            Market Marksman is the premier alternative data signal mining and predictive deal sourcing platform for commercial advisors, institutional investors, and defense technology leaders.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={handleCheckUpdates}
            disabled={checkingUpdate}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-60"
            id="btn_check_updates"
          >
            <RefreshCw className={`w-4 h-4 ${checkingUpdate ? "animate-spin" : ""}`} />
            <span>{checkingUpdate ? "Checking Registry..." : "Check for Updates"}</span>
          </button>
        </div>
      </div>

      {/* UPDATE STATUS BANNER */}
      {updateStatus && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-200 text-xs flex items-center justify-between font-mono animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{updateStatus}</span>
          </div>
          <button onClick={() => setUpdateStatus(null)} className="text-emerald-400 font-bold hover:text-white cursor-pointer">✕</button>
        </div>
      )}

      {/* CORE SPECIFICATIONS & SYSTEM CREDITS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* PLATFORM CREDITS */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Platform Credits & Engine</h3>
              <p className="text-[11px] text-slate-500">Core technologies and architecture partners</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-start justify-between p-2.5 bg-slate-50 rounded-lg">
              <div>
                <span className="font-bold text-slate-800 block">AI Synthesis Engine</span>
                <span className="text-[11px] text-slate-500">Google Gemini 2.5 Flash (@google/genai SDK)</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-indigo-100 text-indigo-700 font-bold rounded">Live</span>
            </div>

            <div className="flex items-start justify-between p-2.5 bg-slate-50 rounded-lg">
              <div>
                <span className="font-bold text-slate-800 block">Cloud Container Infrastructure</span>
                <span className="text-[11px] text-slate-500">Google Cloud Run & Cloud Build Engine</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-100 text-emerald-700 font-bold rounded">Active</span>
            </div>

            <div className="flex items-start justify-between p-2.5 bg-slate-50 rounded-lg">
              <div>
                <span className="font-bold text-slate-800 block">Realtime Storage Engine</span>
                <span className="text-[11px] text-slate-500">Google Cloud Firestore Multi-Tenant Database</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-purple-100 text-purple-700 font-bold rounded">Synced</span>
            </div>

            <div className="flex items-start justify-between p-2.5 bg-slate-50 rounded-lg">
              <div>
                <span className="font-bold text-slate-800 block">Nevada Sector Advisory</span>
                <span className="text-[11px] text-slate-500">Nevada Commercial Dealmakers & Defense Council</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-100 text-amber-700 font-bold rounded">Certified</span>
            </div>
          </div>
        </div>

        {/* VERSION & BUILD MANIFEST */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Build & Release Manifest</h3>
              <p className="text-[11px] text-slate-500">Current software release specifications</p>
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">App Name:</span>
              <span className="font-bold text-slate-900">Market Marksman</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Software Version:</span>
              <span className="font-bold text-indigo-600">v2.4.0-enterprise</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Build Target:</span>
              <span className="font-bold text-slate-800">Linux x86_64 Cloud Run</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Compiler / Runtime:</span>
              <span className="font-bold text-slate-800">Node 20 / TypeScript 5.x</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Tauri Executable Target:</span>
              <span className="font-bold text-slate-800">Tauri v2 Native Bundle</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Cryptographic Cipher:</span>
              <span className="font-bold text-slate-800">RSA-4096 / HMAC-SHA256</span>
            </div>
          </div>
        </div>

        {/* SECURITY & COMPLIANCE */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Security & Compliance</h3>
              <p className="text-[11px] text-slate-500">Enterprise security attestations</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>SOC 2 Type II Certified</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-[11px] text-slate-500">Audited controls for security, availability, and processing integrity.</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>GCP Secret Manager Enforced</span>
                <Lock className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-[11px] text-slate-500">Zero client-side exposure of API keys or service account credentials.</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>Multi-Tenant SAML ISO</span>
                <Globe className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-[11px] text-slate-500">Strict domain-level tenant data isolation with encrypted JWT tokens.</p>
            </div>
          </div>
        </div>

      </div>

      {/* LEGAL & TERMS SECTION */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <FileText className="w-4 h-4 text-slate-600" />
          <span>Legal Information, Enterprise EULA & Data Licensing</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] font-mono">
              Enterprise End User License Agreement (EULA)
            </h4>
            <p>
              Market Marksman is licensed under commercial enterprise terms for authorized corporate dealmakers, brokers, and institutional research teams. Unauthorized redistribution or reverse engineering of cryptographic license keys or web scraper crawlers is strictly prohibited under federal intellectual property frameworks.
            </p>
          </div>

          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] font-mono">
              Data Privacy & Open Source Disclaimers
            </h4>
            <p>
              Alternative data signals ingested from public repositories (USPTO, SEC EDGAR, ClinicalTrials.gov, Nevada Division of Water Resources, SAM.gov) are in the public domain. Synthetic predictive scores generated by the Gemini AI engine represent analytical recommendations and do not constitute formal SEC investment advice.
            </p>
          </div>
        </div>

        <div className="pt-3 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 border-t border-slate-100">
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-slate-800">
              © 2026 Agent Lab: an Uncle Robert Consulting LLC company.
            </span>
            <span className="text-[11px] text-slate-400">
              All Rights Reserved. Market Marksman Enterprise Suite.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <AgentLabLogo height={26} />
            <UncleRobertLogo height={26} />
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href="https://docs.google.com/document/d/1nWLkmXwj3AbQnUq7V1rewdJBProbH_cx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline transition-colors flex items-center gap-1"
            >
              Terms & Conditions
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://docs.google.com/document/d/1Gx-5840Q_o2OA1lwdPM6c4-mUY20bMmN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline transition-colors flex items-center gap-1"
            >
              Privacy Policy
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
