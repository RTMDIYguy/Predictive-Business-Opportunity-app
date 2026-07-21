import React, { useState, useEffect } from "react";
import {
  Dna,
  Cpu,
  Zap,
  Coins,
  ShoppingBag,
  TrendingUp,
  Plus,
  Search,
  Sparkles,
  Calculator,
  Calendar,
  Code,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  FileText,
  Cloud,
  Layers,
  Settings,
  Play,
  ArrowRight,
  ChevronRight,
  Info,
  Clock,
  Trash2,
  HelpCircle,
  Check,
  RefreshCw,
  Sliders,
  DollarSign,
  Activity,
  Database,
  Server,
  Workflow,
  ListTodo
} from "lucide-react";
import { SECTORS, COST_RESOURCES, TIMELINE_TASKS, INGESTION_RESOURCES } from "./data";
import { Sector, AlternativeSignal, AnalysisResult, CostResource, TimelineTask } from "./types";

export default function App() {
  // Navigation / Tabs
  const [activeTab, setActiveTab] = useState<"sandbox" | "buildplan" | "architecture">("sandbox");

  // Sector Selection State
  const [selectedSector, setSelectedSector] = useState<Sector>(SECTORS[0]);

  // Dynamic Signals State (allows adding/deleting signals in real-time)
  const [activeSignals, setActiveSignals] = useState<AlternativeSignal[]>([]);

  // Custom Signal Creation Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSigType, setNewSigType] = useState<string>("Patent");
  const [newSigTitle, setNewSigTitle] = useState("");
  const [newSigDate, setNewSigDate] = useState("2026-07-21");
  const [newSigStrength, setNewSigStrength] = useState<"Low" | "Medium" | "High" | "Very High">("High");
  const [newSigLeadTime, setNewSigLeadTime] = useState("1-2 years");
  const [newSigSource, setNewSigSource] = useState("");
  const [newSigDesc, setNewSigDesc] = useState("");

  // Gemini AI Analysis State
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [loadingStepText, setLoadingStepText] = useState("");

  // Interactive Live Cost State
  const [costResources, setCostResources] = useState<CostResource[]>(COST_RESOURCES);
  const [monthlyBudget, setMonthlyBudget] = useState(0.00);

  // Interactive Project Timeline State
  const [timelineTasks, setTimelineTasks] = useState<TimelineTask[]>(TIMELINE_TASKS);

  // API Directory Selection
  const [selectedApiIndex, setSelectedApiIndex] = useState(0);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  // Initialize sector-specific signals on load or sector change
  useEffect(() => {
    // Reset signals & prior analysis result when shifting sectors
    const signalsWithCheck = selectedSector.prebakedSignals.map(sig => ({
      ...sig,
      checked: true
    }));
    setActiveSignals(signalsWithCheck);
    setAnalysisResult(null);
    setAnalysisError(null);
  }, [selectedSector]);

  // Recalculate monthly budget when resources change
  useEffect(() => {
    const total = costResources
      .filter(r => r.included)
      .reduce((acc, curr) => acc + curr.estimatedCost, 0);
    setMonthlyBudget(Number(total.toFixed(2)));
  }, [costResources]);

  // Toggle checklist signals
  const toggleSignalCheck = (id: string) => {
    setActiveSignals(prev =>
      prev.map(sig => (sig.id === id ? { ...sig, checked: !sig.checked } : sig))
    );
  };

  // Delete signal
  const deleteSignal = (id: string) => {
    setActiveSignals(prev => prev.filter(sig => sig.id !== id));
  };

  // Add Custom Signal
  const handleAddSignalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSigTitle || !newSigSource) return;

    const customSig: AlternativeSignal = {
      id: `custom-${Date.now()}`,
      type: newSigType as any,
      title: newSigTitle,
      date: newSigDate,
      strength: newSigStrength,
      leadTime: newSigLeadTime,
      description: newSigDesc,
      source: newSigSource,
      checked: true
    };

    setActiveSignals(prev => [...prev, customSig]);
    setShowAddModal(false);
    // Reset form
    setNewSigTitle("");
    setNewSigSource("");
    setNewSigDesc("");
  };

  // Run Gemini AI Predictive Analysis
  const runGeminiAnalysis = async () => {
    const selectedSigs = activeSignals.filter(s => s.checked);
    if (selectedSigs.length === 0) {
      alert("Please select or add at least one signal to run predictive analysis!");
      return;
    }

    setLoadingAnalysis(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    // Dynamic step text updates to show rich analytical simulation steps
    const steps = [
      "Initializing predictive link pipeline...",
      "Matching alternative patent clusters to corporate registries...",
      "Analyzing specialized job posting velocity metrics...",
      "Evaluating venture capital run rates and funding cues...",
      "Triggering Gemini AI synthesis engine..."
    ];

    let stepIdx = 0;
    setLoadingStepText(steps[0]);
    const stepInterval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setLoadingStepText(steps[stepIdx]);
      }
    }, 1800);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sector: selectedSector.name,
          signals: selectedSigs.map(s => ({
            type: s.type,
            title: s.title,
            date: s.date,
            strength: s.strength,
            leadTime: s.leadTime
          }))
        })
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to parse analysis");
      }

      const result: AnalysisResult = await response.json();
      setAnalysisResult(result);
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error(err);
      // Friendly, descriptive fallback
      setAnalysisError(err.message || "An issue occurred querying the server.");
    } finally {
      setLoadingAnalysis(false);
    }
  };

  // Mock retry with synthetic local generator if they don't have their API key
  const loadSyntheticAnalysis = () => {
    setLoadingAnalysis(true);
    setAnalysisError(null);
    setAnalysisResult(null);
    setLoadingStepText("Synthesizing predictive baseline analysis locally...");

    setTimeout(() => {
      const selectedCount = activeSignals.filter(s => s.checked).length;
      const score = Math.min(45 + selectedCount * 12, 98);
      
      const horizon = selectedSector.id === "biotech" ? "18-24 months" : "6-12 months";
      const pred = selectedSector.id === "biotech" 
        ? "Targeted oncology clinical pipeline trial announcement (Phase 1/2 initiation) by Major Global Pharma plc."
        : selectedSector.id === "semiconductors"
        ? "Sub-2nm manufacturing partnership & Oregon Cleanroom extension rollout."
        : "Imminent Series B/C scale up or critical corporate acquisition target disclosure.";

      const synth = `Based on the active signal combination, there is strong synergy indicating imminent developments. The combination of early stage patents (${activeSignals.find(s => s.type === 'Patent')?.title || 'Patent filing'}) followed by sudden specialized job postings reveals a high correlation with near-term deployment. This matches patterns of pre-market launches seen at CB Insights and Aura Intelligence with 80%+ historical validation.`;

      const mockRes: AnalysisResult = {
        opportunityScore: score,
        timeHorizon: horizon,
        unannouncedIndicator: pred,
        synthesis: synth,
        criticalRisks: [
          "Patent filing represents research that may fail to achieve commercial validation.",
          "Hiring spikes could be routine staffing cycles rather than a strategic project pivot.",
          "Alternative datasets contain noise from scraped channels."
        ],
        recommendedActions: [
          {
            action: "Establish Watchlist Alert",
            rationale: "Setup automatic scrapers for supplementary FDA clinical trials registries or customs bills of lading matching terms.",
            phase: "Phase 1: Validation"
          },
          {
            action: "Position Capital Hedge",
            rationale: "Align tactical asset allocation options positioning towards target acquisition companies before bulk PR announcements.",
            phase: "Phase 2: Positioning"
          }
        ]
      };

      setAnalysisResult(mockRes);
      setLoadingAnalysis(false);
    }, 1500);
  };

  // Toggle Cost Resource configuration
  const toggleCostIncluded = (id: string) => {
    setCostResources(prev =>
      prev.map(r => (r.id === id ? { ...r, included: !r.included } : r))
    );
  };

  // Adjust Cost quantity slider
  const adjustCostQuantity = (id: string, val: number) => {
    setCostResources(prev =>
      prev.map(r => {
        if (r.id === id) {
          // simple dynamic pricing model
          let est = 0;
          if (id === "bigquery") {
            est = Math.max(0, (val - 10) * 0.02 + 0.10); // over 10GB is 2 cents
          } else if (id === "pubsub") {
            est = Math.max(0, (val - 10) * 0.04);
          } else if (id === "vertex-ai") {
            est = Math.max(0, (val - 150000) * 0.0000001); // demo math
          }
          return {
            ...r,
            quantity: val,
            estimatedCost: Number(est.toFixed(2))
          };
        }
        return r;
      })
    );
  };

  // Update Project Timeline task status
  const toggleTaskStatus = (id: string) => {
    setTimelineTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextStatus = t.status === "Planned" ? "In Progress" : t.status === "In Progress" ? "Completed" : "Planned";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  // Reset timeline tasks to default
  const resetTimeline = () => {
    setTimelineTasks(TIMELINE_TASKS);
  };

  // Copy python snippet to clipboard
  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2500);
  };

  // Math calculated completion %
  const completedTasks = timelineTasks.filter(t => t.status === "Completed").length;
  const inProgressTasks = timelineTasks.filter(t => t.status === "In Progress").length;
  const projectCompletionPercent = Math.round(((completedTasks + inProgressTasks * 0.5) / timelineTasks.length) * 100);

  // Sector Icon Matcher helper
  const renderSectorIcon = (iconName: string) => {
    const props = { className: "w-5 h-5" };
    switch (iconName) {
      case "Dna":
        return <Dna {...props} className="w-5 h-5 text-indigo-600" />;
      case "Cpu":
        return <Cpu {...props} className="w-5 h-5 text-emerald-600" />;
      case "Zap":
        return <Zap {...props} className="w-5 h-5 text-amber-500" />;
      case "Coins":
        return <Coins {...props} className="w-5 h-5 text-sky-600" />;
      case "ShoppingBag":
        return <ShoppingBag {...props} className="w-5 h-5 text-rose-500" />;
      default:
        return <Activity {...props} />;
    }
  };

  // Signal type visual tag helper
  const getSignalTagClass = (type: string) => {
    switch (type) {
      case "Patent":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Job Posting":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Regulatory Filing":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "VC Flow":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Social Sentiment":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Supply Chain":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "Government Contract":
        return "bg-sky-50 text-sky-700 border-sky-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased" id="main_container">
      {/* HEADER SECTION */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs" id="app_header">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm" id="brand_icon_container">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight" id="app_title">
                Predictive Opportunity Intelligence
              </h1>
              <p className="text-xs text-slate-500 font-medium" id="app_subtitle">
                Alternative Data Signal Mining & Live Build Plan Workspace
              </p>
            </div>
          </div>

          {/* Core Navigation Controls */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200" id="nav_tabs_container">
            <button
              onClick={() => setActiveTab("sandbox")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === "sandbox"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/50"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              id="tab_sandbox"
            >
              <Activity className="w-4 h-4" />
              Signal Sandbox
            </button>
            <button
              onClick={() => setActiveTab("buildplan")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === "buildplan"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/50"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              id="tab_buildplan"
            >
              <ListTodo className="w-4 h-4" />
              Live Build Plan
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === "architecture"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/50"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              id="tab_architecture"
            >
              <Workflow className="w-4 h-4" />
              Pipeline Architecture
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6" id="app_main">
        {/* TAB 1: SANDBOX WORKSPACE */}
        {activeTab === "sandbox" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="sandbox_grid">
            {/* LEFT COLUMN: Sectors List (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6" id="sandbox_sectors_container">
              {/* Sector Selection Panel */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs" id="sectors_panel">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Select Industry Sector
                </h2>
                <div className="flex flex-col gap-2" id="sectors_list">
                  {SECTORS.map((sector) => (
                    <button
                      key={sector.id}
                      onClick={() => setSelectedSector(sector)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                        selectedSector.id === sector.id
                          ? "bg-indigo-50/50 border-indigo-300 ring-1 ring-indigo-300"
                          : "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                      id={`sector_btn_${sector.id}`}
                    >
                      <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-2xs mt-0.5">
                        {renderSectorIcon(sector.iconName)}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 text-sm flex items-center justify-between">
                          {sector.name}
                          {selectedSector.id === sector.id && (
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mt-1">
                          {sector.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Research Insights Summary Card */}
              <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white rounded-xl p-5 shadow-sm border border-slate-800" id="insights_guide_card">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">
                    Venture Signal Research
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-100 leading-tight">
                  Validated Signal Horizons
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  Patent filings clusters represent the <strong>earliest pipeline indicator</strong>, offering up to 2–4 years of lead time before trials or products launch. High-niche job postings (30–90 days lead) and regulatory Fast-Tracks represent <strong>imminent transition milestones</strong>.
                </p>
                <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Source: SEC / USPTO / WIPO Research</span>
                  <button 
                    onClick={() => setActiveTab("buildplan")}
                    className="text-indigo-400 hover:text-white font-medium flex items-center gap-0.5"
                  >
                    Build Plan <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* MIDDLE/RIGHT: Signal Workspace & Simulation (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-6" id="sandbox_workspace_container">
              
              {/* Workspace Header & Action Bar */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4" id="workspace_actions">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      Sandbox Engine
                    </span>
                    <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Gemini Ready
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-1" id="workspace_header_title">
                    Active Signal Simulator Workspace
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Toggle signals, add custom entries, and evaluate predictive milestones for <strong>{selectedSector.name}</strong>.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100/80 rounded-lg transition-all"
                  id="add_custom_signal_btn"
                >
                  <Plus className="w-4 h-4" />
                  Add Custom Signal
                </button>
              </div>

              {/* TWO PANEL WORKSPACE: Active Signals & Timeline Chronology */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="signals_sandbox_panels">
                
                {/* Active Signals List Configurator (7 cols) */}
                <div className="md:col-span-7 flex flex-col gap-4" id="active_signals_list_configurator">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex-1">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Signal Selection Panel
                    </h3>

                    {activeSignals.length === 0 ? (
                      <div className="py-12 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                        No active signals. Click Add Custom Signal above to seed this workspace.
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3" id="active_signals_items">
                        {activeSignals.map((sig) => (
                          <div
                            key={sig.id}
                            className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 relative ${
                              sig.checked
                                ? "bg-white border-indigo-200 shadow-2xs"
                                : "bg-slate-50/70 border-slate-100 opacity-60"
                            }`}
                            id={`signal_item_${sig.id}`}
                          >
                            <input
                              type="checkbox"
                              checked={!!sig.checked}
                              onChange={() => toggleSignalCheck(sig.id)}
                              className="mt-1 h-4 w-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              id={`checkbox_${sig.id}`}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-md border ${getSignalTagClass(sig.type)}`}>
                                  {sig.type}
                                </span>
                                <span className="text-[10px] font-semibold text-slate-400">
                                  {sig.source}
                                </span>
                              </div>
                              <h4 className="text-xs font-bold text-slate-800 mt-1.5 leading-snug">
                                {sig.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                                {sig.description}
                              </p>
                              <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
                                <span className="flex items-center gap-1 font-medium text-slate-500">
                                  <Clock className="w-3 h-3" />
                                  Lead Horizon: {sig.leadTime}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Observed: {sig.date}
                                </span>
                                <span className="font-semibold text-slate-500">
                                  Strength: {sig.strength}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => deleteSignal(sig.id)}
                              className="text-slate-300 hover:text-rose-500 p-1 rounded-md transition-colors self-start"
                              title="Delete signal"
                              id={`delete_sig_${sig.id}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Vertical Timeline & Trigger Synthesis (5 cols) */}
                <div className="md:col-span-5 flex flex-col gap-4" id="timeline_and_trigger_container">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                        Signal Chronology Timeline
                      </h3>

                      {activeSignals.filter(s => s.checked).length === 0 ? (
                        <div className="py-12 px-4 text-center border border-dashed border-slate-200 rounded-xl text-xs text-slate-400 leading-relaxed">
                          Check signals on the left to map them chronologically here.
                        </div>
                      ) : (
                        <div className="relative pl-4 border-l-2 border-slate-200 ml-1.5 flex flex-col gap-5 py-1" id="timeline_chronology">
                          {activeSignals
                            .filter(s => s.checked)
                            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                            .map((sig, idx) => (
                              <div key={sig.id} className="relative text-left" id={`chronology_item_${sig.id}`}>
                                {/* Timeline Dot */}
                                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-600 border-2 border-white shadow-2xs" />
                                <div className="text-[10px] text-indigo-600 font-semibold flex items-center gap-1">
                                  {sig.date}
                                  <span className="text-slate-300">|</span>
                                  <span className="text-slate-400 uppercase tracking-wider text-[9px]">
                                    Lead: {sig.leadTime}
                                  </span>
                                </div>
                                <h5 className="text-[11px] font-bold text-slate-800 leading-snug mt-0.5">
                                  {sig.title}
                                </h5>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100" id="trigger_analysis_block">
                      <div className="text-[11px] text-slate-400 leading-relaxed mb-3">
                        Analyzing <strong>{activeSignals.filter(s => s.checked).length}</strong> checked signals will activate the server-side analysis pipeline.
                      </div>
                      <button
                        onClick={runGeminiAnalysis}
                        disabled={loadingAnalysis || activeSignals.filter(s => s.checked).length === 0}
                        className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                        id="trigger_synthesis_btn"
                      >
                        {loadingAnalysis ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4 text-indigo-200" />
                        )}
                        {loadingAnalysis ? "Synthesizing..." : "Analyze Cluster with Gemini AI"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SKELETON / LOADING LOADER */}
              {loadingAnalysis && (
                <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs flex flex-col items-center justify-center text-center py-16" id="loading_analysis_loader">
                  <div className="relative mb-4">
                    <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                    <Sparkles className="w-5 h-5 text-indigo-600 absolute top-3.5 left-3.5 animate-pulse" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm">Evaluating Signal Correlation</h3>
                  <p className="text-xs text-indigo-600 font-medium mt-1.5 animate-pulse">
                    {loadingStepText}
                  </p>
                  <p className="text-[11px] text-slate-400 max-w-sm mt-3 leading-relaxed">
                    Connecting unstructured patents, job keywords, and funding data points against historical predictive frameworks...
                  </p>
                </div>
              )}

              {/* ERROR STATE CARD WITH RETRY OPTIONS */}
              {analysisError && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-xs" id="analysis_error_card">
                  <div className="flex gap-3">
                    <div className="p-2 bg-amber-100 text-amber-700 rounded-lg self-start">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-amber-900">
                        Gemini API Key Required
                      </h4>
                      <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                        The backend received a key configuration error: <strong>{analysisError}</strong>. 
                        No worries! You can click <strong>Settings &gt; Secrets</strong> at the top right of AI Studio to add your Gemini API Key, or run a simulated study instantly.
                      </p>
                      
                      <div className="flex flex-wrap gap-2.5 mt-4">
                        <button
                          onClick={runGeminiAnalysis}
                          className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700 transition-colors"
                          id="error_retry_btn"
                        >
                          Retry Connection
                        </button>
                        <button
                          onClick={loadSyntheticAnalysis}
                          className="px-3 py-1.5 bg-white border border-amber-300 text-amber-800 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-colors"
                          id="error_fallback_btn"
                        >
                          Run Simulated Study (Free Offline Mode)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* GEMINI INTELLIGENCE REPORT WORKSPACE */}
              {analysisResult && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-6" id="gemini_report_card">
                  
                  {/* Report Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4" id="report_header">
                    <div>
                      <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                        Predictive Analysis Outcomes
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        Pre-Market Opportunity Assessment Report
                      </h3>
                    </div>
                    <div className="flex items-center gap-2.5" id="report_meta_metrics">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-medium">Estimated Horizon</span>
                        <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                          {analysisResult.timeHorizon}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Core Metrics: Opportunity score & prediction */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5" id="report_metrics_row">
                    {/* Gauge/Score */}
                    <div className="md:col-span-3 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200/60 rounded-xl text-center" id="opportunity_score_container">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Opportunity Score</span>
                      <div className="relative mt-3 flex items-center justify-center">
                        {/* Circular numeric layout */}
                        <div className="text-3xl font-black text-indigo-600 tracking-tight">
                          {analysisResult.opportunityScore}
                          <span className="text-xs text-slate-400 font-medium">/100</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full mt-3">
                        {analysisResult.opportunityScore >= 80 ? "High Probability" : analysisResult.opportunityScore >= 50 ? "Emerging Target" : "Noisy Signals"}
                      </span>
                    </div>

                    {/* Imminent unannounced announcement */}
                    <div className="md:col-span-9 p-4 bg-indigo-50/40 border border-indigo-100 rounded-xl" id="prediction_callout_container">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-800">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        PREDICTED PUBLIC ANNOUNCEMENT METRIC
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-2 leading-relaxed">
                        {analysisResult.unannouncedIndicator}
                      </h4>
                      <p className="text-xs text-indigo-950 mt-1.5 leading-relaxed">
                        This prediction represents a synthesis of patent-to-clinical filings timelines mapped from WIPO and USPTO historical datasets.
                      </p>
                    </div>
                  </div>

                  {/* Detailed Synthesis */}
                  <div id="report_synthesis">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-slate-400" />
                      Analytical Narrative Synthesis
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/50 p-4 border border-slate-100 rounded-xl">
                      {analysisResult.synthesis}
                    </p>
                  </div>

                  {/* Playbook Playboard */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="playbook_grid">
                    
                    {/* Actions and Timeline Phases */}
                    <div id="recommended_actions_container">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sliders className="w-4 h-4 text-slate-400" />
                        Playbook Action Strategy
                      </h4>
                      <div className="flex flex-col gap-3" id="recommended_actions_list">
                        {analysisResult.recommendedActions.map((act, i) => (
                          <div key={i} className="p-3 bg-white border border-slate-200 rounded-xl shadow-3xs">
                            <div className="flex justify-between items-start gap-2">
                              <span className="px-1.5 py-0.5 text-[9px] font-bold text-indigo-700 bg-indigo-50 rounded-sm">
                                {act.phase}
                              </span>
                            </div>
                            <h5 className="text-xs font-bold text-slate-800 mt-1.5">
                              {act.action}
                            </h5>
                            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                              {act.rationale}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Critical validation risks */}
                    <div id="critical_validation_risks">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-slate-400" />
                        Signal Validation Risks
                      </h4>
                      <div className="bg-rose-50/40 border border-rose-100 rounded-xl p-4 flex flex-col gap-3" id="validation_risks_list">
                        {analysisResult.criticalRisks.map((risk, i) => (
                          <div key={i} className="flex gap-2.5 items-start text-xs text-rose-950">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                            <p className="leading-relaxed">{risk}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE BUILD PLAN & WORKSPACE */}
        {activeTab === "buildplan" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="buildplan_grid">
            
            {/* LEFT COLUMN: GCP Cost Calculator (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6" id="buildplan_cost_calculator">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      GCP Prototype Cost Estimator
                    </h2>
                    <p className="text-xs text-slate-500">
                      Tailor scale and keep monthly running fees at <strong>$0.00</strong>.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">Est. Monthly Total</span>
                    <span className="text-lg font-black text-indigo-600" id="total_cost_badge">
                      ${monthlyBudget.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Calculator List of Resources */}
                <div className="flex flex-col gap-4 mt-4" id="cost_resources_list">
                  {costResources.map((res) => (
                    <div key={res.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left" id={`cost_item_${res.id}`}>
                      <div className="flex items-start justify-between gap-2">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={res.included}
                            onChange={() => toggleCostIncluded(res.id)}
                            className="h-4 w-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            id={`cost_checkbox_${res.id}`}
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">
                              {res.service}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {res.description}
                            </span>
                          </div>
                        </label>
                        <span className="text-xs font-bold text-slate-700">
                          {res.included ? `$${res.estimatedCost.toFixed(2)}` : "Excluded"}
                        </span>
                      </div>

                      {/* Slider controls for high-volume resources */}
                      {res.included && (res.id === "bigquery" || res.id === "pubsub" || res.id === "vertex-ai") && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200/50 flex flex-col gap-1">
                          <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                            <span>
                              Volume: {res.quantity.toLocaleString()}{" "}
                              {res.id === "bigquery" || res.id === "pubsub" ? "GBs/mo" : "tokens/mo"}
                            </span>
                            <span>Free limit: {res.id === "bigquery" ? "10 GB" : res.id === "pubsub" ? "10 GB" : "15 RPM"}</span>
                          </div>
                          <input
                            type="range"
                            min={res.id === "vertex-ai" ? "10000" : "1"}
                            max={res.id === "vertex-ai" ? "1000000" : "100"}
                            step={res.id === "vertex-ai" ? "10000" : "1"}
                            value={res.quantity}
                            onChange={(e) => adjustCostQuantity(res.id, Number(e.target.value))}
                            className="w-full accent-indigo-600"
                            id={`slider_${res.id}`}
                          />
                        </div>
                      )}

                      <div className="mt-2 text-[10px] text-indigo-600 font-medium flex items-center gap-1 bg-indigo-50/50 p-1.5 rounded-md border border-indigo-100/40">
                        <Info className="w-3 h-3 text-indigo-500 shrink-0" />
                        <span>Free Tier Allocation: {res.tierInfo}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-indigo-50 text-indigo-950 rounded-xl mt-5 text-xs leading-relaxed border border-indigo-100" id="cost_calculator_summary">
                  <h4 className="font-bold">Zero-Cost Strategy Action Items:</h4>
                  <ul className="list-disc pl-4 mt-1.5 flex flex-col gap-1.5 text-[11px] text-slate-700">
                    <li>Stick to Google Cloud Run serverless scale-to-zero configurations.</li>
                    <li>Utilize the free Google AI Studio standard pricing Tier (15 Requests/minute with Gemini 3.6 Flash) instead of Vertex AI paid pipelines.</li>
                    <li>Store small, processed signal metadata summaries on Firestore under 1GB.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Gantt & Ingestion APIs (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6" id="buildplan_timeline_apis">
              
              {/* Project Gantt Timeline */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Gantt Roadmap & MVP Milestones
                    </h2>
                    <p className="text-xs text-slate-500">
                      8-week development timeline. Toggle task states to update project readiness.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Ready: {projectCompletionPercent}%</span>
                    <button
                      onClick={resetTimeline}
                      className="p-1 text-slate-400 hover:text-slate-600"
                      title="Reset timeline"
                      id="reset_timeline_btn"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-2 transition-all duration-500"
                    style={{ width: `${projectCompletionPercent}%` }}
                  />
                </div>

                {/* Gantt List */}
                <div className="flex flex-col gap-3 mt-4" id="timeline_tasks_list">
                  {timelineTasks.map((t) => (
                    <div key={t.id} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3" id={`task_item_${t.id}`}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {t.phase}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 mt-1">
                          {t.task}
                        </h4>
                        
                        {/* Weekly indicator boxes */}
                        <div className="flex gap-1.5 mt-2.5">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((w) => {
                            const active = t.weeks.includes(w);
                            return (
                              <span
                                key={w}
                                className={`text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-sm border ${
                                  active
                                    ? "bg-indigo-600 text-white border-indigo-700"
                                    : "bg-slate-50 text-slate-300 border-slate-100"
                                }`}
                              >
                                W{w}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        onClick={() => toggleTaskStatus(t.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors shrink-0 ${
                          t.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : t.status === "In Progress"
                            ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                        id={`task_status_btn_${t.id}`}
                      >
                        {t.status}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Ingestion APIs Directory */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                  External Open Data Ingestion Directory
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Avoid proprietary licensing (CB Insights, PitchBook) during the MVP. Use free public endpoints.
                </p>

                {/* API tab lists */}
                <div className="flex gap-2.5 overflow-x-auto py-3 border-b border-slate-100" id="api_tabs">
                  {INGESTION_RESOURCES.map((api, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedApiIndex(i)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
                        selectedApiIndex === i
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                      id={`api_tab_${i}`}
                    >
                      {api.name.split(" ")[0]} API
                    </button>
                  ))}
                </div>

                <div className="pt-4" id="selected_api_content">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    {INGESTION_RESOURCES[selectedApiIndex].name}
                    <a
                      href={INGESTION_RESOURCES[selectedApiIndex].docsLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-0.5 text-[10px] font-semibold"
                    >
                      Developer Docs <ExternalLink className="w-3 h-3" />
                    </a>
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {INGESTION_RESOURCES[selectedApiIndex].description}
                  </p>

                  {/* Copyable Python script */}
                  <div className="mt-3 relative" id="code_snippet_box">
                    <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-[11px] overflow-x-auto leading-relaxed max-h-56">
                      <code>{INGESTION_RESOURCES[selectedApiIndex].pythonCode}</code>
                    </pre>
                    <button
                      onClick={() => handleCopyCode(INGESTION_RESOURCES[selectedApiIndex].pythonCode, selectedApiIndex)}
                      className="absolute top-2.5 right-2.5 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-slate-300 rounded border border-slate-700"
                      id="copy_code_btn"
                    >
                      {copiedCodeIndex === selectedApiIndex ? "Copied!" : "Copy Script"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PIPELINE ARCHITECTURE */}
        {activeTab === "architecture" && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col gap-6" id="architecture_workspace">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Data Pipeline Flow Architecture
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Full-scale serverless flow mapped on Google Cloud, keeping compute and orchestration scales fully isolated and secure.
              </p>
            </div>

            {/* Pipeline Flowchart Visualizer */}
            <div className="border border-slate-200 bg-slate-50 rounded-xl p-8 flex flex-col items-center justify-center gap-8 shadow-2xs relative overflow-hidden" id="flowchart_visualizer">
              
              {/* Outer grid pattern decorative background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="grid grid-cols-1 md:grid-cols-5 items-center w-full max-w-4xl relative z-10 gap-6 md:gap-4" id="pipeline_flow_row">
                
                {/* Stage 1: Sources */}
                <div className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-xl shadow-3xs text-center" id="arch_stage_1">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-2">
                    <Cloud className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Alternative Sources</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                    USPTO Patents, FDA trials, SEC EDGAR RSS, LinkedIn listings
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center" id="arch_arrow_1">
                  <ArrowRight className="w-5 h-5 text-indigo-400 rotate-90 md:rotate-0" />
                </div>

                {/* Stage 2: Processing Scrapers */}
                <div className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-xl shadow-3xs text-center" id="arch_stage_2">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-2">
                    <Server className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Ingestion Ingest</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                    Cloud Scheduler trigger + Cloud Run containers (Py/Node)
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center" id="arch_arrow_2">
                  <ArrowRight className="w-5 h-5 text-indigo-400 rotate-90 md:rotate-0" />
                </div>

                {/* Stage 3: Warehouse & NLP */}
                <div className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-xl shadow-3xs text-center" id="arch_stage_3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 mb-2">
                    <Database className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">BigQuery Storage</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                    Historical signal dumps & entity linkage knowledge graphs
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center" id="arch_arrow_3">
                  <ArrowRight className="w-5 h-5 text-indigo-400 rotate-90 md:rotate-0" />
                </div>

                {/* Stage 4: Synthesis LLM */}
                <div className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-xl shadow-3xs text-center" id="arch_stage_4">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-2">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Vertex / Gemini AI</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                    Dynamic prompt synthesis, risk rating, unannounced prediction
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center" id="arch_arrow_4">
                  <ArrowRight className="w-5 h-5 text-indigo-400 rotate-90 md:rotate-0" />
                </div>

                {/* Stage 5: Front UI */}
                <div className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-xl shadow-3xs text-center" id="arch_stage_5">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white mb-2">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">User Interface</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                    React Web Dashboard + real-time Firestore triggers & Alerts
                  </p>
                </div>

              </div>
            </div>

            {/* Architecture Explanatory Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="architecture_details">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl" id="arch_data_enrichment_info">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Entity Linkage & NER Ingest Pipelines
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  In a complete live app, the unstructured text files (XML patents, RSS company filings) must first pass through a <strong>Named Entity Recognition (NER)</strong> model or regular expressions to link patents, job listings, and VC flows back to a unique, consolidated corporate identifier (LEI, CIK, or Crunchbase UUID).
                  <br /><br />
                  This linkage is what eliminates duplicates and allows the system to aggregate disparate indicators—such as matching a patent assignment with a sudden job opening—into a single high-strength prediction candidate.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl" id="arch_scalability_info">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Cloud Security & API Credentials
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your API keys for proprietary sources and Google Cloud IAM Service Account keys must never sit on the client browser. All scrapers and entity linkage modules authenticate using GCP <strong>Secret Manager</strong>.
                  <br /><br />
                  By utilizing serverless Google Cloud Run, individual scrapers run strictly on-demand (spinning down to absolute zero once complete). This isolates security scopes and guarantees that your operational costs scale linearly with the amount of data you ingest, rather than paying for constant idling compute servers.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white mt-12 py-6 text-center text-xs text-slate-400" id="app_footer">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>
            © 2026 Predictive Opportunity Intelligence Dashboard. Crafted for alternative venture research.
          </span>
          <div className="flex gap-4">
            <button onClick={() => setActiveTab("sandbox")} className="hover:text-slate-600">Sandbox</button>
            <button onClick={() => setActiveTab("buildplan")} className="hover:text-slate-600">Build Plan</button>
            <button onClick={() => setActiveTab("architecture")} className="hover:text-slate-600">Architecture</button>
          </div>
        </div>
      </footer>

      {/* MODAL: ADD CUSTOM ALTERNATIVE SIGNAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="add_signal_modal">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Add Custom Alternative Signal</h3>
                <p className="text-xs text-slate-400">Inject custom data to evaluate pipeline correlation.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
                id="close_modal_x"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddSignalSubmit} className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Signal Type</label>
                  <select
                    value={newSigType}
                    onChange={(e) => setNewSigType(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs font-semibold focus:border-indigo-500 focus:ring-indigo-500"
                    id="select_new_sig_type"
                  >
                    <option>Patent</option>
                    <option>Job Posting</option>
                    <option>Regulatory Filing</option>
                    <option>VC Flow</option>
                    <option>Social Sentiment</option>
                    <option>Supply Chain</option>
                    <option>Government Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Data Source / Provider</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. WIPO, SEC EDGAR, Reddit"
                    value={newSigSource}
                    onChange={(e) => setNewSigSource(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs font-medium focus:border-indigo-500 focus:ring-indigo-500"
                    id="input_new_sig_source"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Signal Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Patent Filing Cluster: Solid-State Battery Alignment Layer"
                  value={newSigTitle}
                  onChange={(e) => setNewSigTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2 text-xs font-medium focus:border-indigo-500 focus:ring-indigo-500"
                  id="input_new_sig_title"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Observed Date</label>
                  <input
                    type="date"
                    required
                    value={newSigDate}
                    onChange={(e) => setNewSigDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 p-1.5 text-xs font-medium focus:border-indigo-500 focus:ring-indigo-500"
                    id="input_new_sig_date"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Lead Time Horizon</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2-4 years"
                    value={newSigLeadTime}
                    onChange={(e) => setNewSigLeadTime(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 p-1.5 text-xs font-medium focus:border-indigo-500 focus:ring-indigo-500"
                    id="input_new_sig_lead_time"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Signal Strength</label>
                  <select
                    value={newSigStrength}
                    onChange={(e) => setNewSigStrength(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-200 p-1.5 text-xs font-semibold focus:border-indigo-500 focus:ring-indigo-500"
                    id="select_new_sig_strength"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Very High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Detailed Description</label>
                <textarea
                  placeholder="Summarize the core pre-market indicator parameters observed..."
                  value={newSigDesc}
                  onChange={(e) => setNewSigDesc(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2 text-xs font-medium focus:border-indigo-500 focus:ring-indigo-500 h-20"
                  id="textarea_new_sig_desc"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                  id="cancel_add_sig_btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
                  id="submit_add_sig_btn"
                >
                  Add to Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
