import React, { useState } from "react";
import {
  Briefcase,
  Workflow,
  Zap,
  Mail,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
  Building2,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Play,
  Plus,
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
  Sliders,
  Bell,
  Users,
  Target,
  FileText,
  ShieldCheck,
  Bot
} from "lucide-react";

interface CrmWorkflowStudioProps {
  onClose?: () => void;
}

interface CrmDeal {
  id: string;
  opportunityName: string;
  companyName: string;
  sector: string;
  dealValue: string;
  confidenceScore: number;
  stage: "New Signal" | "Qualified Lead" | "Proposal Drafted" | "Outreach Sent" | "Closing";
  agencyOrPayer: string;
  crmPlatform: "Salesforce" | "HubSpot" | "Pipedrive";
  syncedAt: string;
  executiveBrief: string;
  keyStakeholders: string[];
  recommendedAction: string;
  outreachDraft: string;
}

interface WorkflowRule {
  id: string;
  name: string;
  triggerEvent: string;
  conditions: string;
  action: string;
  enabled: boolean;
  executionsCount: number;
  lastExecuted: string;
}

const INITIAL_DEALS: CrmDeal[] = [
  {
    id: "crm-101",
    opportunityName: "DARPA Autonomous Drone Swarm AI Procurement",
    companyName: "Anduril Industries Inc",
    sector: "Defense & Aerospace",
    dealValue: "$85,000,000",
    confidenceScore: 96,
    stage: "Qualified Lead",
    agencyOrPayer: "DARPA / SAM.gov",
    crmPlatform: "Salesforce",
    syncedAt: "10 mins ago",
    executiveBrief: "DARPA solicitation HR001126S0019 cross-referenced with Anduril edge AI patents. High probability of sole-source or competitive swarm control bidding.",
    keyStakeholders: ["Dr. Aris Thorne (DARPA Program Manager)", "Brian Schimpf (CEO, Anduril)", "VP Defense Sales"],
    recommendedAction: "Schedule priority briefing with Defense Sales Lead and dispatch automated capability deck.",
    outreachDraft: "Subject: Strategic Alignment: Swarm AI Control Networks for DARPA HR001126S0019\n\nDear Anduril Defense Team,\n\nOur predictive intelligence engine identified DARPA solicitation HR001126S0019 published today. Cross-referencing your recent autonomous edge computing patents (US2026-0911204), there is an immediate $85M strategic opportunity for sole-source integration.\n\nWe have prepared a preliminary compliance matrix and payload analysis ready for your review.\n\nBest regards,\nPredictive Business Intelligence Team"
  },
  {
    id: "crm-102",
    opportunityName: "Solid-State Electrolyte Battery DOE Grant Expansion",
    companyName: "Solid Power Inc",
    sector: "Clean Energy & Fusion",
    dealValue: "$42,500,000",
    confidenceScore: 89,
    stage: "Proposal Drafted",
    agencyOrPayer: "Department of Energy (DOE)",
    crmPlatform: "HubSpot",
    syncedAt: "1 hour ago",
    executiveBrief: "USPTO patent assignment US2026-088192 linked to DOE Grant DE-EE0009812. Pilot line scale-up budget allocation identified.",
    keyStakeholders: ["Chief Technology Officer", "Head of Federal Grants", "DOE Program Officer"],
    recommendedAction: "Trigger automated email outreach to CTO with customized commercialization roadmap.",
    outreachDraft: "Subject: DOE Grant DE-EE0009812: Scale-Up Commercialization & Battery Pilot Support\n\nDear Solid Power Engineering Team,\n\nCongratulations on the patent allowance for your solid-state membrane technology. Following DOE's recent clean energy manufacturing funding announcement, our models indicate high eligibility for Phase II $42.5M matching funds.\n\nLet's schedule 15 minutes to review our automated grant reporting and supply chain mapping."
  },
  {
    id: "crm-103",
    opportunityName: "Oncology mRNA Biologics Phase 3 Commercialization",
    companyName: "Moderna Therapeutics / Vertex",
    sector: "Biotech & Gene Therapy",
    dealValue: "$120,000,000",
    confidenceScore: 92,
    stage: "New Signal",
    agencyOrPayer: "BARDA / NIH",
    crmPlatform: "Salesforce",
    syncedAt: "2 hours ago",
    executiveBrief: "ClinicalTrials NCT06891204 phase change combined with BARDA pandemic preparedness solicitation.",
    keyStakeholders: ["SVP Clinical Development", "BARDA Alliance Director"],
    recommendedAction: "Assign task to Biotech Account Manager for stakeholder discovery.",
    outreachDraft: "Subject: BARDA Rapid Biologics Acceleration Partnership Opportunity\n\nDear Clinical Operations Team,\n\nFollowing the Phase 3 status update on ClinicalTrials.gov (NCT06891204), BARDA has opened priority funding for rapid mRNA surge manufacturing.\n\nOur team has generated an automated regulatory compliance dossier for your review."
  }
];

const INITIAL_WORKFLOWS: WorkflowRule[] = [
  {
    id: "wf-1",
    name: "High-Conviction Defense Lead Auto-CRM Sync",
    triggerEvent: "Signal Confidence >= 85%",
    conditions: "Sector = Defense & Aerospace AND Deal Value > $10M",
    action: "Create Salesforce Opportunity + Assign Priority Task + Send Slack Alert",
    enabled: true,
    executionsCount: 42,
    lastExecuted: "10 mins ago"
  },
  {
    id: "wf-2",
    name: "Patent Assignment Commercial Outreach Trigger",
    triggerEvent: "USPTO Patent Published",
    conditions: "Fuzzy Entity Match = Known Enterprise",
    action: "Draft Personalized C-Suite Outreach Email in HubSpot",
    enabled: true,
    executionsCount: 128,
    lastExecuted: "1 hour ago"
  },
  {
    id: "wf-3",
    name: "Federal Grant & Procurement Alerting",
    triggerEvent: "SAM.gov / DOE Solicitation Ingested",
    conditions: "Budget >= $20M",
    action: "Generate Executive Brief via Gemini 3.6 Flash + Push Webhook",
    enabled: true,
    executionsCount: 89,
    lastExecuted: "2 hours ago"
  },
  {
    id: "wf-4",
    name: "Automated Stale Deal Re-engagement",
    triggerEvent: "Deal Stage = Qualified Lead > 14 Days",
    conditions: "No Contact Activity Logged",
    action: "Schedule Follow-up Task for Account Executive",
    enabled: false,
    executionsCount: 15,
    lastExecuted: "Yesterday"
  }
];

export const CrmWorkflowStudio: React.FC<CrmWorkflowStudioProps> = () => {
  const [activeTab, setActiveTab] = useState<"deals" | "workflows" | "outreach">("deals");
  const [deals, setDeals] = useState<CrmDeal[]>(INITIAL_DEALS);
  const [workflows, setWorkflows] = useState<WorkflowRule[]>(INITIAL_WORKFLOWS);
  const [selectedDealId, setSelectedDealId] = useState<string>("crm-101");
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Manual Trigger Simulation State
  const [simulatingWorkflowId, setSimulatingWorkflowId] = useState<string | null>(null);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);
  const [isSynthesizingEmail, setIsSynthesizingEmail] = useState<boolean>(false);

  // Filter State
  const [crmFilter, setCrmFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const selectedDeal = deals.find(d => d.id === selectedDealId) || deals[0];

  // Toggle Workflow State
  const handleToggleWorkflow = (id: string) => {
    setWorkflows(prev =>
      prev.map(w => (w.id === id ? { ...w, enabled: !w.enabled } : w))
    );
  };

  // Run Workflow Simulation
  const handleRunSimulation = async (rule: WorkflowRule) => {
    setSimulatingWorkflowId(rule.id);
    setSimulationLog([]);

    const steps = [
      `[TRIGGER_FIRED] Event: ${rule.triggerEvent}`,
      `[EVALUATING_CONDITIONS] Matching: ${rule.conditions}`,
      `[CONDITION_PASSED] Rule evaluated to TRUE. Executing action pipeline...`,
      `[GEMINI_SYNTHESIS] Generating executive brief & outreach draft...`,
      `[CRM_DISPATCH] Executing '${rule.action}'`,
      `[WEBHOOK_ACK] 200 OK received from ${selectedDeal.crmPlatform} API. Record created.`
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 280));
      setSimulationLog(prev => [...prev, steps[i]]);
    }

    setWorkflows(prev =>
      prev.map(w =>
        w.id === rule.id
          ? { ...w, executionsCount: w.executionsCount + 1, lastExecuted: "Just now" }
          : w
      )
    );
    setSimulatingWorkflowId(null);
  };

  // Re-Synthesize Outreach with Gemini
  const handleSynthesizeEmailWithGemini = async () => {
    setIsSynthesizingEmail(true);
    await new Promise(r => setTimeout(r, 1200));

    const updatedOutreach = `Subject: Executive Proposal: ${selectedDeal.opportunityName} Solutions

Dear ${selectedDeal.companyName} Executive Leadership,

Our predictive market intelligence engine identified a strategic cross-domain alignment regarding your recent ${selectedDeal.sector} initiatives and ${selectedDeal.agencyOrPayer} requirements.

Key Opportunity Metrics:
- Predicted Value: ${selectedDeal.dealValue}
- Match Conviction Score: ${selectedDeal.confidenceScore}%
- Primary Stakeholder Contact: ${selectedDeal.keyStakeholders[0] || "Program Director"}

We have generated an automated executive briefing and compliance matrix ready for review. Reply to this email to receive the direct download link.

Best regards,
Automated Business Development System`;

    setDeals(prev =>
      prev.map(d => (d.id === selectedDeal.id ? { ...d, outreachDraft: updatedOutreach } : d))
    );
    setIsSynthesizingEmail(false);
  };

  const filteredDeals = deals.filter(d => {
    if (crmFilter !== "ALL" && d.crmPlatform !== crmFilter) return false;
    if (searchQuery && !d.opportunityName.toLowerCase().includes(searchQuery.toLowerCase()) && !d.companyName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-950 border border-indigo-500/30 rounded-xl text-indigo-400">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Context-Aware CRM Task & Workflow Automation</span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-500/30 rounded-md">
                  Active Sync
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically convert high-conviction intelligence signals into CRM deals, AI outreach drafts, and task assignments.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("deals")}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "deals" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>CRM Deals & Pipeline ({deals.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("workflows")}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "workflows" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Automated Rules ({workflows.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("outreach")}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "outreach" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>AI Outreach Generator</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CRM DEALS & PIPELINE */}
      {activeTab === "deals" && (
        <div className="space-y-5">
          
          {/* FILTER & SEARCH BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 font-bold shrink-0">CRM Platform:</span>
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                {["ALL", "Salesforce", "HubSpot", "Pipedrive"].map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setCrmFilter(platform)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      crmFilter === platform
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search deals & companies..."
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs pl-3 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* TWO-COLUMN GRID: DEALS LIST + DEAL INSPECTOR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* LEFT COLUMN: DEALS LIST (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>Synchronized Opportunities</span>
                <span className="text-emerald-400">{filteredDeals.length} Active Records</span>
              </h4>

              <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
                {filteredDeals.map((deal) => {
                  const isSelected = deal.id === selectedDealId;
                  return (
                    <div
                      key={deal.id}
                      onClick={() => setSelectedDealId(deal.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2.5 ${
                        isSelected
                          ? "bg-slate-900 border-indigo-500/80 shadow-lg"
                          : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold border border-indigo-500/30">
                          {deal.crmPlatform}
                        </span>
                        <span className="text-emerald-400 font-bold">
                          {deal.confidenceScore}% Match
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-slate-100 line-clamp-1">{deal.opportunityName}</h3>
                        <p className="text-[11px] text-slate-400 font-bold mt-0.5">{deal.companyName}</p>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px] font-mono">
                        <span className="text-amber-400 font-bold">{deal.dealValue}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-bold border border-slate-800">
                          {deal.stage}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: DEAL INSPECTOR & ACTION PANEL (7 cols) */}
            {selectedDeal && (
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5 animate-fadeIn">
                
                {/* DEAL HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block">
                      Synced Record • {selectedDeal.syncedAt}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{selectedDeal.opportunityName}</h3>
                    <p className="text-xs text-slate-300 font-semibold mt-0.5">{selectedDeal.companyName} • {selectedDeal.sector}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-slate-400 font-mono block">Estimated Deal Value</span>
                    <span className="text-base font-extrabold text-amber-400 font-mono">{selectedDeal.dealValue}</span>
                  </div>
                </div>

                {/* EXECUTIVE BRIEF & RECOMMENDATIONS */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-2">
                    <span className="text-indigo-400 font-bold flex items-center gap-1 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Gemini Intelligence Executive Brief</span>
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px] font-sans">
                      {selectedDeal.executiveBrief}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-2">
                    <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                      <Target className="w-3.5 h-3.5" />
                      <span>Recommended Next Best Action</span>
                    </span>
                    <p className="text-slate-200 font-bold text-[11px] font-sans">
                      {selectedDeal.recommendedAction}
                    </p>
                  </div>

                  {/* KEY STAKEHOLDERS */}
                  <div>
                    <span className="text-slate-400 font-bold block mb-1 text-[11px]">Identified Decision-Maker Stakeholders</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDeal.keyStakeholders.map((sh, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded bg-slate-950 text-slate-300 text-[10px] font-bold border border-slate-800 flex items-center gap-1">
                          <Users className="w-3 h-3 text-indigo-400" />
                          <span>{sh}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab("outreach")}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Generate Outreach Draft</span>
                    </button>
                    <button
                      onClick={() => alert(`Synced updated record for '${selectedDeal.opportunityName}' to ${selectedDeal.crmPlatform} API.`)}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Sync to {selectedDeal.crmPlatform}</span>
                    </button>
                  </div>

                  <span className="text-[10px] text-slate-500 font-mono">
                    ID: {selectedDeal.id}
                  </span>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

      {/* TAB 2: AUTOMATED WORKFLOW RULES ENGINE */}
      {activeTab === "workflows" && (
        <div className="space-y-5">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Context-Aware Workflow Automation Rules</h3>
              <p className="text-xs text-slate-400">Rules continuously monitor incoming open data signals to automate CRM actions.</p>
            </div>

            <button
              onClick={() => {
                const newRule: WorkflowRule = {
                  id: `wf-${Date.now().toString().slice(-3)}`,
                  name: "New Custom Signal Automation Rule",
                  triggerEvent: "Custom Signal Ingestion",
                  conditions: "Confidence >= 80%",
                  action: "Send Slack Alert & Create CRM Task",
                  enabled: true,
                  executionsCount: 0,
                  lastExecuted: "Never"
                };
                setWorkflows(prev => [newRule, ...prev]);
              }}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Workflow Rule</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflows.map((rule) => (
              <div
                key={rule.id}
                className={`p-4 rounded-xl border transition-all space-y-3 ${
                  rule.enabled
                    ? "bg-slate-900 border-slate-800"
                    : "bg-slate-950/60 border-slate-800/60 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${rule.enabled ? "text-amber-400" : "text-slate-600"}`} />
                    <h4 className="text-xs font-bold text-slate-100">{rule.name}</h4>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    onClick={() => handleToggleWorkflow(rule.id)}
                    className={`w-9 h-5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                      rule.enabled ? "bg-indigo-600" : "bg-slate-800"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        rule.enabled ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="space-y-1.5 font-mono text-[11px] bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                  <div className="flex items-center gap-2 text-indigo-300">
                    <span className="text-slate-500 font-bold shrink-0">WHEN:</span>
                    <span className="font-bold">{rule.triggerEvent}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-300">
                    <span className="text-slate-500 font-bold shrink-0">IF:</span>
                    <span className="font-bold">{rule.conditions}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300">
                    <span className="text-slate-500 font-bold shrink-0">THEN:</span>
                    <span className="font-bold">{rule.action}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-400">
                  <span>Executions: <strong className="text-white">{rule.executionsCount}</strong> | Last: {rule.lastExecuted}</span>
                  <button
                    onClick={() => handleRunSimulation(rule)}
                    disabled={simulatingWorkflowId === rule.id}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 text-emerald-400 fill-current" />
                    <span>Test Run Rule</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SIMULATION LIVE OUTPUT LOG */}
          {simulationLog.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 font-mono text-xs animate-fadeIn">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Bot className="w-4 h-4" />
                <span>Workflow Rule Live Execution Simulation Output</span>
              </span>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1 text-[11px] text-emerald-300">
                {simulationLog.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">{log}</div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 3: AI OUTREACH GENERATOR */}
      {activeTab === "outreach" && selectedDeal && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>AI-Synthesized Context-Aware Outreach Draft</span>
              </h3>
              <p className="text-xs text-slate-400">Custom tailored email draft addressing deal metrics for {selectedDeal.companyName}.</p>
            </div>

            <button
              onClick={handleSynthesizeEmailWithGemini}
              disabled={isSynthesizingEmail}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isSynthesizingEmail ? "animate-spin" : ""}`} />
              <span>{isSynthesizingEmail ? "Re-Synthesizing..." : "Re-Synthesize with Gemini"}</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-mono text-slate-300">
              <span className="text-indigo-400 font-bold">Target Deal: {selectedDeal.opportunityName}</span>
              <span className="text-emerald-400 font-bold">Format: C-Suite Executive Email</span>
            </div>

            <textarea
              value={selectedDeal.outreachDraft}
              onChange={(e) => {
                const val = e.target.value;
                setDeals(prev =>
                  prev.map(d => (d.id === selectedDeal.id ? { ...d, outreachDraft: val } : d))
                );
              }}
              className="w-full h-64 bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs p-3.5 rounded-lg focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
              spellCheck={false}
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-slate-500 font-mono">
                Auto-populated with key metrics: {selectedDeal.dealValue} value • {selectedDeal.confidenceScore}% confidence
              </span>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedDeal.outreachDraft);
                  setCopiedEmail(true);
                  setTimeout(() => setCopiedEmail(false), 2000);
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? "Copied Draft!" : "Copy Outreach Text"}</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
