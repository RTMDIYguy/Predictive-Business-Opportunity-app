export type SignalType =
  | "Patent"
  | "Job Posting"
  | "Regulatory Filing"
  | "VC Flow"
  | "Social Sentiment"
  | "Supply Chain"
  | "Government Contract"
  | "Academic Research";

export interface EntityLinkage {
  canonicalEntity: string;
  entityId: string;
  tickerOrCik?: string;
  confidenceScore: number; // 0.0 to 1.0 (e.g. 0.95)
  matchType: "Exact Alias" | "Fuzzy Token" | "Domain Pattern" | "Sector Context";
  matchedAlias?: string;
}

export interface AlternativeSignal {
  id: string;
  type: SignalType;
  title: string;
  date: string;
  strength: "Low" | "Medium" | "High" | "Very High";
  leadTime: string;
  description: string;
  source: string;
  checked?: boolean; // For selection in our simulator workspace
  // Entity linkage metadata
  linkedEntity?: EntityLinkage;
  company?: string;
  growthMetric?: string;
  openRequisitions?: number;
}

export interface Sector {
  id: string;
  name: string;
  description: string;
  iconName: string;
  prebakedSignals: AlternativeSignal[];
}

export interface AnalysisResult {
  opportunityScore: number;
  timeHorizon: string;
  unannouncedIndicator: string;
  synthesis: string;
  criticalRisks: string[];
  recommendedActions: {
    action: string;
    rationale: string;
    phase: string;
  }[];
  // Cross-industry comparative analysis fields
  comparisonSector?: string;
  crossIndustryScore?: number;
  sector1Score?: number;
  sector2Score?: number;
  crossIndustrySynergies?: string[];
}

export interface CostResource {
  id: string;
  service: string;
  description: string;
  tierInfo: string;
  unitCost: string;
  quantity: number;
  maxFreeAllocation: string;
  estimatedCost: number;
  included: boolean;
}

export interface TimelineTask {
  id: string;
  task: string;
  phase: string;
  weeks: number[]; // e.g. [1, 2]
  status: "Completed" | "In Progress" | "Planned";
  dependencies: string[];
}
