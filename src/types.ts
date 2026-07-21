export type SignalType =
  | "Patent"
  | "Job Posting"
  | "Regulatory Filing"
  | "VC Flow"
  | "Social Sentiment"
  | "Supply Chain"
  | "Government Contract"
  | "Academic Research";

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
