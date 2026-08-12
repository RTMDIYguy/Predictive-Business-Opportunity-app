import React, { useState } from "react";
import {
  BookOpen,
  Compass,
  FileText,
  Target,
  Zap,
  CheckCircle2,
  Code2,
  Terminal,
  Building2,
  Pickaxe,
  Plane,
  Sun,
  MapPin,
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Lightbulb,
  ShieldCheck,
  Layers,
  Database,
  Search,
  Cloud,
  Server,
  Workflow
} from "lucide-react";

interface BrokerFieldGuideProps {
  onClose?: () => void;
}

export const BrokerFieldGuide: React.FC<BrokerFieldGuideProps> = () => {
  const [activeTab, setActiveTab] = useState<"quickstart" | "playbooks" | "pipeline_guide" | "ner_guide" | "api_guide" | "crm_guide">("quickstart");
  const [activeSector, setActiveSector] = useState<"gaming" | "mining" | "defense" | "industrial" | "cre">("gaming");
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  
  // Interactive Broker Progress Tracker
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    step1: true,
    step2: false,
    step3: false,
    step4: false
  });

  const toggleStep = (stepKey: string) => {
    setCompletedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(label);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl space-y-6">
      
      {/* HEADER BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-950 border border-amber-500/40 rounded-xl text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Nevada Broker Field Guide & Tactical Playbook</span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/30 rounded-md">
                  Nevada Commercial & Advisory Edition
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Comprehensive step-by-step operating guide and sector playbooks for Nevada brokers, advisors, and dealmakers.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 font-mono text-xs">
          <button
            onClick={() => setActiveTab("quickstart")}
            className={`px-3 py-1.5 font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "quickstart" ? "bg-amber-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Broker Quick Start</span>
          </button>
          <button
            onClick={() => setActiveTab("playbooks")}
            className={`px-3 py-1.5 font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "playbooks" ? "bg-amber-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>5 Sector Playbooks</span>
          </button>
          <button
            onClick={() => setActiveTab("pipeline_guide")}
            className={`px-3 py-1.5 font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "pipeline_guide" ? "bg-amber-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Data Flow Architecture</span>
          </button>
          <button
            onClick={() => setActiveTab("ner_guide")}
            className={`px-3 py-1.5 font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "ner_guide" ? "bg-amber-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>NER Studio How-To</span>
          </button>
          <button
            onClick={() => setActiveTab("api_guide")}
            className={`px-3 py-1.5 font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "api_guide" ? "bg-amber-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>API Integration</span>
          </button>
          <button
            onClick={() => setActiveTab("crm_guide")}
            className={`px-3 py-1.5 font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "crm_guide" ? "bg-amber-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>CRM Workflows</span>
          </button>
        </div>
      </div>

      {/* TAB 1: BROKER QUICK START & CHECKLIST */}
      {activeTab === "quickstart" && (
        <div className="space-y-6">
          
          {/* WELCOME BANNER */}
          <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950/80 border border-amber-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Welcome Nevada Commercial Brokers & Advisory Leaders</span>
            </div>
            <h3 className="text-base font-bold text-white">
              How to Turn Unannounced Public Data Signals into Closed Deals
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              As a Nevada broker operating across Clark County, Washoe County, Apex Industrial Park, or the Elko Mining District, timing is everything. 
              This platform scans government solicitations (SAM.gov), patent filings (USPTO), land use permits, and clinical trial records to predict multi-million dollar business opportunities 3 to 12 months before they hit public commercial listings.
            </p>
          </div>

          {/* INTERACTIVE BROKER CHECKLIST */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Interactive Broker Onboarding Roadmap</span>
                </h4>
                <p className="text-xs text-slate-400">Complete these 4 steps to master predictive deal sourcing in Nevada.</p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-lg">
                {Object.values(completedSteps).filter(Boolean).length} / 4 Completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              
              {/* STEP 1 */}
              <div
                onClick={() => toggleStep("step1")}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  completedSteps.step1
                    ? "bg-slate-950 border-emerald-500/50 text-slate-200"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 text-[11px]">STEP 1: Signal Discovery Sandbox</span>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${completedSteps.step1 ? "bg-emerald-600 border-emerald-500 text-white" : "border-slate-700 bg-slate-900"}`}>
                    {completedSteps.step1 && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <p className="font-sans text-slate-300 text-xs">
                  Filter by sector (Defense, Mining, Gaming, Clean Energy) and adjust the <strong>Match Score Threshold</strong> slider to isolate high-conviction leads.
                </p>
              </div>

              {/* STEP 2 */}
              <div
                onClick={() => toggleStep("step2")}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  completedSteps.step2
                    ? "bg-slate-950 border-emerald-500/50 text-slate-200"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 text-[11px]">STEP 2: Extract Entities with NER Studio</span>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${completedSteps.step2 ? "bg-emerald-600 border-emerald-500 text-white" : "border-slate-700 bg-slate-900"}`}>
                    {completedSteps.step2 && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <p className="font-sans text-slate-300 text-xs">
                  Paste raw Nevada land permits or press release text into the <strong>NER Studio</strong> tab to automatically isolate corporate buyers, CIK numbers, and aliases.
                </p>
              </div>

              {/* STEP 3 */}
              <div
                onClick={() => toggleStep("step3")}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  completedSteps.step3
                    ? "bg-slate-950 border-emerald-500/50 text-slate-200"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 text-[11px]">STEP 3: Connect API to CRM or Sheets</span>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${completedSteps.step3 ? "bg-emerald-600 border-emerald-500 text-white" : "border-slate-700 bg-slate-900"}`}>
                    {completedSteps.step3 && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <p className="font-sans text-slate-300 text-xs">
                  Use the <strong>API Studio</strong> tab to copy GraphQL queries or REST cURL commands directly into your team's custom dashboard or Google Sheets.
                </p>
              </div>

              {/* STEP 4 */}
              <div
                onClick={() => toggleStep("step4")}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  completedSteps.step4
                    ? "bg-slate-950 border-emerald-500/50 text-slate-200"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 text-[11px]">STEP 4: Automate Outreach in CRM Workflows</span>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${completedSteps.step4 ? "bg-emerald-600 border-emerald-500 text-white" : "border-slate-700 bg-slate-900"}`}>
                    {completedSteps.step4 && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <p className="font-sans text-slate-300 text-xs">
                  Set rules in <strong>CRM & Workflows</strong> to auto-create Salesforce/HubSpot deals and synthesize tailored C-Suite email outreach.
                </p>
              </div>

            </div>
          </div>

          {/* NEVADA REGIONAL MAP & SOURCING HIGHLIGHTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold font-mono">
                <MapPin className="w-4 h-4" />
                <span>Southern Nevada (Clark County)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Apex Industrial Park, Henderson Tech Corridor, Las Vegas Strip Resort expansions, North Las Vegas logistics spurs, Creech AFB drone contracts.
              </p>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
                <MapPin className="w-4 h-4" />
                <span>Northern Nevada (Washoe / Storey)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Tahoe-Reno Industrial Center (TRIC), Fallon Naval Air Station defense solicitations, geothermal energy grants, rail distribution hubs.
              </p>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold font-mono">
                <MapPin className="w-4 h-4" />
                <span>Rural Nevada (Elko / Humboldt)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Thacker Pass Lithium processing plant grants, BLM mining exploration permits, gold & battery mineral extraction rights, solar array leases.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: 5 SECTOR PLAYBOOKS */}
      {activeTab === "playbooks" && (
        <div className="space-y-5">
          
          {/* SECTOR SELECTOR */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveSector("gaming")}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSector === "gaming" ? "bg-amber-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>1. Gaming & Hospitality</span>
            </button>
            <button
              onClick={() => setActiveSector("mining")}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSector === "mining" ? "bg-amber-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Pickaxe className="w-4 h-4" />
              <span>2. Clean Energy & Mining</span>
            </button>
            <button
              onClick={() => setActiveSector("defense")}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSector === "defense" ? "bg-amber-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>3. Defense & Aerospace</span>
            </button>
            <button
              onClick={() => setActiveSector("industrial")}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSector === "industrial" ? "bg-amber-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>4. Industrial & Logistics</span>
            </button>
            <button
              onClick={() => setActiveSector("cre")}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSector === "cre" ? "bg-amber-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>5. CRE & Land Acquisition</span>
            </button>
          </div>

          {/* SECTOR DETAILS CONTENT */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 font-sans text-xs">
            {activeSector === "gaming" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 font-mono">
                      <Building2 className="w-4 h-4" />
                      <span>Nevada Gaming & Resort Hospitality Playbook</span>
                    </h3>
                    <p className="text-slate-400 text-xs">Targeting Strip resort operator expansions, concession licensing, and entertainment venue tech upgrades.</p>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-950 text-amber-300 font-mono font-bold text-[10px] rounded border border-amber-500/30">
                    Est. Lead Window: 6-9 Months Pre-Listing
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="text-indigo-400 font-bold block">Key Unannounced Signal Sources</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-1 font-sans text-xs">
                      <li>Clark County Zoning Variance filings for high-density resort land blocks</li>
                      <li>Nevada Gaming Control Board (NGCB) preliminary licensing petitions</li>
                      <li>USPTO patent filings for cashless wagering and AI casino floor surveillance</li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="text-emerald-400 font-bold block">Tactical Broker Action</span>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">
                      Cross-reference CIK filings of operators (e.g. MGM, Caesars, Wynn) with adjacent land parcel ownership in North Las Vegas and Henderson to identify site assembly plays before master plan announcements.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSector === "mining" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 font-mono">
                      <Pickaxe className="w-4 h-4" />
                      <span>Clean Energy & Lithium Mining Playbook</span>
                    </h3>
                    <p className="text-slate-400 text-xs">Sourcing lithium processing plants, geothermal leases, and solar array industrial acreage.</p>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-950 text-amber-300 font-mono font-bold text-[10px] rounded border border-amber-500/30">
                    Est. Lead Window: 9-14 Months Pre-Permit
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="text-indigo-400 font-bold block">Key Unannounced Signal Sources</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-1 font-sans text-xs">
                      <li>Bureau of Land Management (BLM) exploration notices in Humboldt/Esmeralda</li>
                      <li>Department of Energy (DOE) Title 17 Loan Program milestone grants</li>
                      <li>USPTO patents assigned to Solid Power, Lithium Americas, or Tesla supplier ecosystem</li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="text-emerald-400 font-bold block">Tactical Broker Action</span>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">
                      When a DOE matching grant is ingested, auto-synthesize outreach to the lead engineer proposing heavy rail-adjacent industrial property in Winnemucca or Fernley.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSector === "defense" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 font-mono">
                      <Plane className="w-4 h-4" />
                      <span>Defense & Aerospace (Apex / Fallon / Creech) Playbook</span>
                    </h3>
                    <p className="text-slate-400 text-xs">Autonomous drone swarms, electronic warfare, and specialized defense contractor facility leases.</p>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-950 text-amber-300 font-mono font-bold text-[10px] rounded border border-amber-500/30">
                    Est. Lead Window: 4-8 Months Pre-Contract
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="text-indigo-400 font-bold block">Key Unannounced Signal Sources</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-1 font-sans text-xs">
                      <li>SAM.gov Broad Agency Announcements (BAA) from DARPA and NAVAIR</li>
                      <li>Department of Defense (DoD) Small Business Innovation Research (SBIR) Phase II awards</li>
                      <li>Apex Industrial Park infrastructure extension solicitations</li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="text-emerald-400 font-bold block">Tactical Broker Action</span>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">
                      Filter for DARPA/NAVAIR solicitations cross-referenced with prime defense contractors (Anduril, Palantir, Skunk Works). Pitch secured hangar space and land in Apex or North Las Vegas.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSector === "industrial" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 font-mono">
                      <Sun className="w-4 h-4" />
                      <span>Industrial Logistics & Data Center Hubs Playbook</span>
                    </h3>
                    <p className="text-slate-400 text-xs">Hyperscale data center power allocations and Class-A distribution warehousing.</p>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-950 text-amber-300 font-mono font-bold text-[10px] rounded border border-amber-500/30">
                    Est. Lead Window: 6-12 Months Pre-Break
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="text-indigo-400 font-bold block">Key Unannounced Signal Sources</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-1 font-sans text-xs">
                      <li>NV Energy utility interconnection requests (100MW+ load requests)</li>
                      <li>Storey County / TRIC industrial water utility expansions</li>
                      <li>US DOT INFRA freight rail upgrade grants in Washoe and Clark</li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="text-emerald-400 font-bold block">Tactical Broker Action</span>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">
                      When a 100MW+ utility interconnection request is detected, locate adjacent uncommitted land parcels along the I-80 corridor or Apex and pitch master developer site acquisition.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSector === "cre" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 font-mono">
                      <MapPin className="w-4 h-4" />
                      <span>Commercial Real Estate & Land Acquisition Playbook</span>
                    </h3>
                    <p className="text-slate-400 text-xs">Speculative land assembly, mixed-use redevelopment, and water rights transfers.</p>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-950 text-amber-300 font-mono font-bold text-[10px] rounded border border-amber-500/30">
                    Est. Lead Window: 3-6 Months Pre-Closing
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="text-indigo-400 font-bold block">Key Unannounced Signal Sources</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-1 font-sans text-xs">
                      <li>Nevada Division of Water Resources (NDWR) water permit transfer filings</li>
                      <li>Clark County Comprehensive Planning agenda items & preliminary plat submissions</li>
                      <li>Fuzzy entity resolution linking cryptic LLCs back to national developers</li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="text-emerald-400 font-bold block">Tactical Broker Action</span>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">
                      Run raw land permit applicant names through the <strong>NER Studio</strong> tab to uncover parent entity aliases and reach out to decision makers before competing brokerage firms are aware.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB: DATA FLOW & PIPELINE ARCHITECTURE */}
      {activeTab === "pipeline_guide" && (
        <div className="space-y-6 font-sans text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                <Workflow className="w-4 h-4 text-amber-400" />
                <span>Full-Scale Data Flow & Pipeline Architecture</span>
              </h3>
              <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                Understand how alternative data flows from open sources, scrapers, and state agency registers through serverless enrichment, BigQuery warehousing, Gemini AI synthesis, and live client dashboards.
              </p>
            </div>

            {/* Pipeline Flowchart Visualizer */}
            <div className="border border-slate-800 bg-slate-950 rounded-xl p-6 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5 items-center w-full relative z-10 gap-4">
                
                {/* Stage 1: Sources */}
                <div className="flex flex-col items-center p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-center">
                  <div className="w-9 h-9 rounded-lg bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-2">
                    <Cloud className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white font-mono">1. Raw Data Sources</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                    USPTO Patents, FDA trials, SEC EDGAR RSS, LinkedIn listings, Nevada State Agencies
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-amber-500 rotate-90 md:rotate-0" />
                </div>

                {/* Stage 2: Processing Scrapers */}
                <div className="flex flex-col items-center p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-center">
                  <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
                    <Server className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white font-mono">2. Ingestion Engine</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                    Cloud Scheduler triggers + serverless Cloud Run container crawlers
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-amber-500 rotate-90 md:rotate-0" />
                </div>

                {/* Stage 3: Warehouse & NLP */}
                <div className="flex flex-col items-center p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-center">
                  <div className="w-9 h-9 rounded-lg bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-2">
                    <Database className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white font-mono">3. Entity Linkage & Graph</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                    BigQuery data warehouse & canonical entity disambiguation
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-amber-500 rotate-90 md:rotate-0" />
                </div>

                {/* Stage 4: Synthesis LLM */}
                <div className="flex flex-col items-center p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-center">
                  <div className="w-9 h-9 rounded-lg bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-2">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white font-mono">4. Gemini AI Engine</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                    Prompt synthesis, conviction scoring, unannounced deal predictions
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-amber-500 rotate-90 md:rotate-0" />
                </div>

                {/* Stage 5: Front UI */}
                <div className="flex flex-col items-center p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-center">
                  <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center text-white mb-2">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white font-mono">5. Client Dashboards</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                    React Web UI + real-time Firestore sync & webhook triggers
                  </p>
                </div>

              </div>
            </div>

            {/* Architecture Explanatory Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider">
                  Entity Linkage & Disambiguation Pipelines
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs">
                  In a complete live app, unstructured text files (XML patents, RSS company filings) pass through a <strong>Named Entity Recognition (NER)</strong> model to link patents, job listings, and VC flows back to a unique corporate identifier (LEI, CIK, or Crunchbase UUID). This linkage eliminates duplicates and matches disparate indicators into a single high-strength prediction candidate.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider">
                  Cloud Security & Isolation
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs">
                  API keys for proprietary sources and Google Cloud IAM Service Account keys authenticate using GCP <strong>Secret Manager</strong>. Serverless Google Cloud Run containers run strictly on-demand, isolating security scopes and ensuring operational compute scales linearly with data ingested.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NER STUDIO HOW-TO */}
      {activeTab === "ner_guide" && (
        <div className="space-y-4 font-sans text-xs">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Step-by-Step Guide: Named Entity Recognition (NER) Studio</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              When reviewing raw Nevada land permit agendas, SEC 10-K filings, or press releases, entities are often obscured behind cryptic LLC names or trade aliases. The NER Studio parses unstructured text into structured entity profiles.
            </p>

            <div className="space-y-3 font-mono pt-2">
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">1. Select Input Text Source</span>
                <p className="text-slate-300 font-sans text-xs">
                  Choose from built-in Nevada sample documents (e.g. Clark County Land Variance, DARPA Swarm Notice) or paste your own raw text in the left panel.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">2. Click 'Execute NER Extraction Pipeline'</span>
                <p className="text-slate-300 font-sans text-xs">
                  The model extracts Organizations (ORG), Government Solicitations (SOLICITATION), Patents (PATENT), Tickers/CIK, and confidence scores.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">3. Review Disambiguation Engine Results</span>
                <p className="text-slate-300 font-sans text-xs">
                  The bottom panel runs fuzzy string matching (Levenshtein distance) to automatically link raw text like <em>"Anduril Tech"</em> to canonical profiles like <code>ANDURIL_INDUSTRIES_INC</code>.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: API INTEGRATION GUIDE */}
      {activeTab === "api_guide" && (
        <div className="space-y-4 font-mono text-xs">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>API Integration Cheat Sheet for Brokers & Analysts</span>
            </h3>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              Connect our predictive backend API directly to your team's internal tools, Excel spreadsheets, or custom CRM dashboards.
            </p>

            {/* CURL EXAMPLE */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-bold">1. Fetch Live Defense & Energy Signals (REST API)</span>
                <button
                  onClick={() => handleCopy(`curl -X GET "https://YOUR_APP_URL/api/v1/signals" -H "Authorization: Bearer pred_live_sk_demo"`, "rest_curl")}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded flex items-center gap-1 cursor-pointer"
                >
                  {copiedSnippet === "rest_curl" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet === "rest_curl" ? "Copied!" : "Copy cURL"}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300 overflow-x-auto text-[11px]">
                <code>curl -X GET "https://YOUR_APP_URL/api/v1/signals" -H "Authorization: Bearer pred_live_sk_demo"</code>
              </pre>
            </div>

            {/* GRAPHQL EXAMPLE */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-indigo-400 font-bold">2. GraphQL Query for Predicted Opportunities</span>
                <button
                  onClick={() => handleCopy(`query FetchOpportunities {\n  opportunities {\n    id\n    title\n    value\n    stage\n    matchScore\n  }\n}`, "gql_query")}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded flex items-center gap-1 cursor-pointer"
                >
                  {copiedSnippet === "gql_query" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet === "gql_query" ? "Copied!" : "Copy GraphQL"}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-indigo-300 overflow-x-auto text-[11px]">
                <code>{`query FetchOpportunities {\n  opportunities {\n    id\n    title\n    value\n    stage\n    matchScore\n  }\n}`}</code>
              </pre>
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: CRM WORKFLOWS HOW-TO */}
      {activeTab === "crm_guide" && (
        <div className="space-y-4 font-sans text-xs">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>CRM & Workflow Automation Setup</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Never miss a lead. Automatically route high-conviction deal signals directly into Salesforce, HubSpot, or Pipedrive.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs pt-2">
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-amber-400 font-bold block">1. Define Trigger Event</span>
                <p className="text-slate-300 font-sans text-xs">
                  E.g. Signal Match Score &ge; 85% AND Value &gt; $10,000,000.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-amber-400 font-bold block">2. Configure Automated Action</span>
                <p className="text-slate-300 font-sans text-xs">
                  Create Opportunity record in Salesforce + assign task to Account Executive + push Slack alert.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-amber-400 font-bold block">3. AI Outreach Synthesis</span>
                <p className="text-slate-300 font-sans text-xs">
                  Gemini 3.6 Flash automatically writes a personalized email proposal referencing the exact patent/solicitation metrics.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
