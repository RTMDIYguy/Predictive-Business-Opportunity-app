import React, { useState, useEffect } from "react";
import {
  BrainCircuit,
  Sparkles,
  Play,
  CheckCircle2,
  BarChart3,
  Download,
  Terminal,
  Layers,
  Database,
  Building2,
  FileCode,
  Tag,
  Cpu,
  Zap,
  Activity,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Sliders,
  History,
  FileText,
  Clock,
  ArrowRight,
  Filter,
  Share2,
  Send,
  Check,
  PlusCircle,
  ExternalLink,
  Upload,
  PieChart,
  GitCompare,
  Workflow,
  Link2,
  Search,
  ZoomIn,
  ZoomOut,
  Eye,
  Compass,
  Info,
  X
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

interface LabelMetric {
  label: string;
  precision: number;
  recall: number;
  f1: number;
  support: number;
}

interface EpochProgress {
  epoch: number;
  trainLoss: number;
  valLoss: number;
  f1Score: number;
}

interface ExtractedEntity {
  text: string;
  label: "ORG" | "TECH" | "AGENCY" | "DOC_ID" | "AMOUNT" | "TIME" | "LOCATION" | "INDICATION" | string;
  category: string;
  confidence: number;
  resolvedEntity?: string;
  tickerOrCik?: string;
  linkageConfidence?: number;
}

export function EntityExtractionStudio() {
  // Studio Active Mode: "training" | "inference" | "dataset" | "resolution"
  const [activeStudioTab, setActiveStudioTab] = useState<"training" | "inference" | "dataset" | "resolution">("inference");

  // Entity Resolution & Disambiguation Engine State
  const [resolveInputText, setResolveInputText] = useState<string>("Anduril Corp Autonomous Swarm Systems");
  const [resolveSectorContext, setResolveSectorContext] = useState<string>("Defense & Aerospace");
  const [resolveResult, setResolveResult] = useState<any | null>(null);
  const [isResolving, setIsResolving] = useState<boolean>(false);
  const [canonicalEntities, setCanonicalEntities] = useState<any[]>([]);
  const [entitySearchFilter, setEntitySearchFilter] = useState<string>("");

  // Knowledge Graph & Cross-Domain Linkage State
  const [graphNodes, setGraphNodes] = useState<any[]>([]);
  const [graphEdges, setGraphEdges] = useState<any[]>([]);
  const [graphMetrics, setGraphMetrics] = useState<any | null>(null);
  const [isLoadingGraph, setIsLoadingGraph] = useState<boolean>(false);

  // Multi-Hop Graph Traversal State
  const [multiHopPath, setMultiHopPath] = useState<any[]>([]);
  const [isTracingHop, setIsTracingHop] = useState<boolean>(false);

  // BigQuery Distributed SQL Join & Firestore Sync State
  const [isSyncingBigQuery, setIsSyncingBigQuery] = useState<boolean>(false);
  const [bigquerySyncLogs, setBigquerySyncLogs] = useState<string[]>([]);
  const [bqSyncMetrics, setBqSyncMetrics] = useState<any | null>(null);

  // Automated Ingestion Graph Builder Engine State
  const [isAutoIngesting, setIsAutoIngesting] = useState<boolean>(false);
  const [autoIngestLogs, setAutoIngestLogs] = useState<string[]>([]);
  const [autoIngestResults, setAutoIngestResults] = useState<any | null>(null);

  // Interactive Knowledge Graph Studio UI Controls State
  const [selectedGraphNodeId, setSelectedGraphNodeId] = useState<string | null>(null);
  const [graphStudioMode, setGraphStudioMode] = useState<"canvas" | "triples" | "matrix">("canvas");
  const [graphNodeTypeFilter, setGraphNodeTypeFilter] = useState<string>("ALL");
  const [graphMinConfidence, setGraphMinConfidence] = useState<number>(0.7);
  const [graphSearchTerm, setGraphSearchTerm] = useState<string>("");
  const [canvasZoom, setCanvasZoom] = useState<number>(1);

  // Load Entity Registry and Knowledge Graph when Tab Active
  useEffect(() => {
    if (activeStudioTab === "resolution") {
      // Fetch Canonical Entities Directory
      fetch("/api/entities")
        .then(res => res.json())
        .then(data => {
          if (data.entities) setCanonicalEntities(data.entities);
        })
        .catch(err => console.error("Failed to load canonical entities:", err));

      // Fetch Knowledge Graph Nodes & Edges
      setIsLoadingGraph(true);
      fetch("/api/knowledge-graph")
        .then(res => res.json())
        .then(data => {
          if (data.nodes) setGraphNodes(data.nodes);
          if (data.edges) setGraphEdges(data.edges);
          if (data.metrics) setGraphMetrics(data.metrics);
        })
        .catch(err => console.error("Failed to load Knowledge Graph:", err))
        .finally(() => setIsLoadingGraph(false));
    }
  }, [activeStudioTab]);

  // Test Entity Disambiguation Handler
  const handleResolveEntityText = async (textToTest?: string) => {
    const text = textToTest || resolveInputText;
    if (!text.trim()) return;

    if (textToTest) setResolveInputText(textToTest);
    setIsResolving(true);
    try {
      const res = await fetch("/api/entities/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, sectorContext: resolveSectorContext })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Disambiguation failed");
      setResolveResult(data.linkage);
    } catch (err: any) {
      console.error("Entity Disambiguation Error:", err);
    } finally {
      setIsResolving(false);
    }
  };

  // Run Multi-Hop Graph Traversal Handler
  const handleRunMultiHopTraversal = async () => {
    setIsTracingHop(true);
    try {
      const res = await fetch("/api/knowledge-graph/multi-hop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startNodeId: "node_lithium_americas",
          endNodeId: "node_solicitation_darpa",
          maxHops: 3
        })
      });
      const data = await res.json();
      if (data.path) {
        setMultiHopPath(data.path);
      }
    } catch (err: any) {
      console.error("Multi-Hop Traversal Error:", err);
    } finally {
      setIsTracingHop(false);
    }
  };

  // Run BigQuery Distributed SQL Join & Firestore Sync Handler
  const handleRunBigQuerySync = async () => {
    setIsSyncingBigQuery(true);
    setBigquerySyncLogs(["[INIT] Connecting to GCP BigQuery & Firestore Knowledge Graph Sync..."]);
    try {
      const res = await fetch("/api/bigquery/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dataset: "premarket_intel",
          similarityThreshold: 0.85
        })
      });
      const data = await res.json();
      if (data.logs) setBigquerySyncLogs(data.logs);
      setBqSyncMetrics({
        bytesProcessed: data.bytesProcessed,
        queryDurationMs: data.queryDurationMs,
        triplesDiscovered: data.triplesDiscovered,
        status: data.firestoreCommitStatus
      });
    } catch (err: any) {
      console.error("BigQuery Sync Error:", err);
      setBigquerySyncLogs(prev => [...prev, `[ERROR] ${err.message}`]);
    } finally {
      setIsSyncingBigQuery(false);
    }
  };

  // Run Automated Graph Builder Engine Ingestion Handler
  const handleRunAutoIngest = async () => {
    setIsAutoIngesting(true);
    setAutoIngestLogs(["[INIT] Triggering Continuous Automated Graph Builder Ingestion Pipeline..."]);
    try {
      const res = await fetch("/api/graph/auto-ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sector: resolveSectorContext,
          autoCommitFirestore: true
        })
      });
      const data = await res.json();
      if (data.logs) setAutoIngestLogs(data.logs);
      setAutoIngestResults(data);

      // Append newly generated edges & nodes into view state
      if (data.newNodes && data.newNodes.length > 0) {
        setGraphNodes(prev => [...prev, ...data.newNodes.filter((nn: any) => !prev.some(p => p.id === nn.id))]);
      }
      if (data.newEdges && data.newEdges.length > 0) {
        setGraphEdges(prev => [...prev, ...data.newEdges.filter((ne: any) => !prev.some(p => p.id === ne.id))]);
      }
      if (data.updatedGraphMetrics) {
        setGraphMetrics(data.updatedGraphMetrics);
      }
    } catch (err: any) {
      console.error("Auto Ingestion Error:", err);
      setAutoIngestLogs(prev => [...prev, `[ERROR] ${err.message}`]);
    } finally {
      setIsAutoIngesting(false);
    }
  };

  // Run Cron Scheduler Ingestion Simulation Handler
  const handleRunCronScheduler = async () => {
    setIsAutoIngesting(true);
    setAutoIngestLogs(["[CRON_TRIGGER] Firing Cloud Scheduler Job '0 */1 * * *'..."]);
    try {
      const res = await fetch("/api/graph/cron-ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cronSchedule: "0 */1 * * *" })
      });
      const data = await res.json();
      if (data.logs) setAutoIngestLogs(data.logs);
    } catch (err: any) {
      console.error("Cron Ingestion Error:", err);
      setAutoIngestLogs(prev => [...prev, `[ERROR] ${err.message}`]);
    } finally {
      setIsAutoIngesting(false);
    }
  };

  // Training Form & Batch Fine-Tuning State
  const [modelType, setModelType] = useState<"gemini-flash-fewshot" | "spacy-ner-pipeline">("gemini-flash-fewshot");
  const [domainScope, setDomainScope] = useState<string>("all");
  const [epochs, setEpochs] = useState<number>(10);
  const [batchSize, setBatchSize] = useState<number>(8);
  const [learningRate, setLearningRate] = useState<number>(0.0005);
  const [batchSource, setBatchSource] = useState<"corpus" | "active_buffer" | "custom_file">("corpus");
  const [customBatchFile, setCustomBatchFile] = useState<string | null>(null);
  const [customBatchSamples, setCustomBatchSamples] = useState<any[]>([]);
  const [batchTrainingProgress, setBatchTrainingProgress] = useState<number>(0);
  const [activeMetricsView, setActiveMetricsView] = useState<"radar" | "loss" | "table">("radar");

  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [trainingLogs, setTrainingLogs] = useState<string[]>([]);
  const [trainingResults, setTrainingResults] = useState<{
    overallPrecision: number;
    overallRecall: number;
    overallF1: number;
    inferenceLatencyMs: number;
    checkpointUri: string;
    epochProgress: EpochProgress[];
    labelMetrics: LabelMetric[];
  } | null>(null);

  // Handle Custom Batch JSON File Upload
  const handleBatchFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCustomBatchFile(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          setCustomBatchSamples(json);
        } else if (json.samples && Array.isArray(json.samples)) {
          setCustomBatchSamples(json.samples);
        } else {
          setCustomBatchSamples([json]);
        }
      } catch (err) {
        console.error("Error parsing batch dataset file:", err);
      }
    };
    reader.readAsText(file);
  };

  // Inference Tester State
  const [samplePresetText, setSamplePresetText] = useState<string>(
    "Nevada Division of Environmental Protection (NDEP) issued draft approval WPCC-2026-004 for Lithium Americas Corp to expand $420M Thacker Pass Phase II lithium processing plant with an 18-month lead time in Humboldt County."
  );
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [extractionResult, setExtractionResult] = useState<{
    extractionSource: string;
    extractedCount: number;
    entities: ExtractedEntity[];
    performanceMetrics: {
      inferenceLatencyMs: number;
      tokenCount: number;
      modelAccuracyScore: number;
    };
  } | null>(null);

  // Filter & Active Learning / CRM Action States
  const [minConfidence, setMinConfidence] = useState<number>(0);
  const [selectedLabelFilter, setSelectedLabelFilter] = useState<string>("ALL");
  const [crmPushSuccess, setCrmPushSuccess] = useState<string | null>(null);
  const [activeLearningMsg, setActiveLearningMsg] = useState<string | null>(null);

  // Recent Extraction History State (Last 5 runs)
  const [recentExtractions, setRecentExtractions] = useState<Array<{
    id: string;
    fullText: string;
    snippet: string;
    domain: string;
    count: number;
    timestamp: string;
  }>>([
    {
      id: "ner-hist-1",
      fullText: "Nevada Division of Environmental Protection (NDEP) issued draft approval WPCC-2026-004 for Lithium Americas Corp to expand $420M Thacker Pass Phase II lithium processing plant with an 18-month lead time in Humboldt County.",
      snippet: "Nevada Division of Environmental Protection (NDEP) issued draft approval WPCC-2026-004 for Lithium Americas Corp $420M Thacker Pass...",
      domain: "Clean Energy",
      count: 7,
      timestamp: "5m ago"
    },
    {
      id: "ner-hist-2",
      fullText: "Anduril Industries was awarded a $185M U.S. Navy contract N00024-26-C-5210 for autonomous underwater vehicles (AUV) integration featuring edge AI target recognition.",
      snippet: "Anduril Industries was awarded a $185M U.S. Navy contract N00024-26-C-5210 for autonomous underwater vehicles (AUV)...",
      domain: "Defense AI",
      count: 6,
      timestamp: "22m ago"
    },
    {
      id: "ner-hist-3",
      fullText: "Moderna, Inc. filed FDA Fast-Track IND-168920 for mRNA-4157 personalized cancer vaccine combined with Keytruda for Stage III melanoma.",
      snippet: "Moderna, Inc. filed FDA Fast-Track IND-168920 for mRNA-4157 personalized cancer vaccine combined with Keytruda...",
      domain: "Biotech",
      count: 6,
      timestamp: "1h ago"
    },
    {
      id: "ner-hist-4",
      fullText: "ASML Holding N.V. granted USPTO Patent US-11928341-B2 for 2nm High-NA EUV Mirror Alignment Optics with 18-month lead time for TSMC fab delivery.",
      snippet: "ASML Holding N.V. granted USPTO Patent US-11928341-B2 for 2nm High-NA EUV Mirror Alignment Optics with 18-month lead time for TSMC...",
      domain: "Semiconductors",
      count: 6,
      timestamp: "3h ago"
    }
  ]);

  // Training Set State
  const [trainingSamples, setTrainingSamples] = useState<any[]>([]);

  // Fetch Dataset on Load
  useEffect(() => {
    fetch("/api/ner/dataset")
      .then(res => res.json())
      .then(data => {
        if (data.samples) {
          setTrainingSamples(data.samples);
        }
      })
      .catch(err => console.error("Failed to load NER dataset:", err));
  }, []);

  // Run Training Handler
  const handleRunTraining = async () => {
    setIsTraining(true);
    setBatchTrainingProgress(0);
    setTrainingLogs([
      "[INIT] Booting Entity Extraction Training Studio...",
      `[BATCH_CONFIG] Architecture: ${modelType} | Batch Size: ${batchSize} | Epochs: ${epochs} | Source: ${batchSource.toUpperCase()}`
    ]);
    setTrainingResults(null);

    // Progress simulation timer for smooth batch updates
    const progressInterval = setInterval(() => {
      setBatchTrainingProgress(prev => {
        if (prev >= 90) return 90;
        return prev + 15;
      });
    }, 200);

    try {
      const samplesToUse = batchSource === "custom_file"
        ? customBatchSamples
        : (batchSource === "active_buffer" ? trainingSamples.slice(0, 5) : trainingSamples);

      const res = await fetch("/api/ner/train", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelType,
          domainScope,
          epochs,
          batchSize,
          learningRate,
          customSamples: samplesToUse
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Training failed");

      clearInterval(progressInterval);
      setBatchTrainingProgress(100);

      if (data.logs) setTrainingLogs(data.logs);
      setTrainingResults({
        overallPrecision: data.trainingMetrics.overallPrecision,
        overallRecall: data.trainingMetrics.overallRecall,
        overallF1: data.trainingMetrics.overallF1,
        inferenceLatencyMs: data.trainingMetrics.inferenceLatencyMs,
        checkpointUri: data.trainingMetrics.checkpointUri,
        epochProgress: data.epochProgress || [],
        labelMetrics: data.labelMetrics || []
      });
    } catch (err: any) {
      clearInterval(progressInterval);
      setBatchTrainingProgress(0);
      console.error("NER Training Error:", err);
      setTrainingLogs(prev => [...prev, `[ERROR] ${err.message}`]);
    } finally {
      setIsTraining(false);
    }
  };

  // Run Extraction Handler
  const handleRunExtraction = async (textToExtract?: string) => {
    const text = textToExtract || samplePresetText;
    if (!text.trim()) return;

    if (textToExtract) {
      setSamplePresetText(textToExtract);
    }

    setIsExtracting(true);
    try {
      const res = await fetch("/api/ner/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, modelType })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Extraction failed");

      setExtractionResult({
        extractionSource: data.extractionSource,
        extractedCount: data.extractedCount,
        entities: data.entities || [],
        performanceMetrics: data.performanceMetrics
      });

      // Push to recent extractions
      const count = data.extractedCount || data.entities?.length || 0;
      const snippet = text.length > 100 ? text.substring(0, 100) + "..." : text;
      const detectedDomain = data.entities?.find((e: any) => e.label === "AGENCY") ? "Regulatory / Gov" :
                             data.entities?.find((e: any) => e.label === "TECH") ? "Emerging Tech" : "Filing / Patent";

      const newItem = {
        id: `ner-hist-${Date.now()}`,
        fullText: text,
        snippet,
        domain: detectedDomain,
        count,
        timestamp: "Just now"
      };

      setRecentExtractions(prev => [newItem, ...prev.filter(item => item.fullText !== text)].slice(0, 5));
    } catch (err: any) {
      console.error("NER Extraction Error:", err);
    } finally {
      setIsExtracting(false);
    }
  };

  // Preset text loader
  const loadPresetText = (preset: string) => {
    if (preset === "nevada") {
      setSamplePresetText("Nevada Division of Environmental Protection (NDEP) issued draft approval WPCC-2026-004 for Lithium Americas Corp to expand $420M Thacker Pass Phase II processing facility.");
    } else if (preset === "defense") {
      setSamplePresetText("Anduril Industries was awarded a $185M U.S. Navy contract N00024-26-C-5210 for autonomous underwater vehicles (AUV) integration featuring edge AI target recognition.");
    } else if (preset === "biotech") {
      setSamplePresetText("Moderna, Inc. filed FDA Fast-Track IND-168920 for mRNA-4157 personalized cancer vaccine combined with Keytruda for Stage III melanoma.");
    } else if (preset === "semiconductors") {
      setSamplePresetText("ASML Holding N.V. granted USPTO Patent US-11928341-B2 for 2nm High-NA EUV Mirror Alignment Optics with 18-month lead time for TSMC fab delivery.");
    }
  };

  // Export & Action Handlers
  const exportEntitiesJson = () => {
    if (!extractionResult) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(extractionResult, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `extracted_entities_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportEntitiesCsv = () => {
    if (!extractionResult) return;
    const headers = ["Text", "Label", "Category", "Confidence", "Canonical Entity", "Ticker/CIK"];
    const rows = extractionResult.entities.map(e => [
      `"${e.text.replace(/"/g, '""')}"`,
      `"${e.label}"`,
      `"${e.category}"`,
      `${(e.confidence * 100).toFixed(1)}%`,
      `"${(e.resolvedEntity || "").replace(/"/g, '""')}"`,
      `"${(e.tickerOrCik || "").replace(/"/g, '""')}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", encodeURI(csvContent));
    downloadAnchor.setAttribute("download", `extracted_entities_${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePushToCrm = () => {
    setCrmPushSuccess("Dispatched extracted entity briefing & metadata payload to broker CRM webhook pipeline!");
    setTimeout(() => setCrmPushSuccess(null), 5000);
  };

  const handleAddToCorpus = () => {
    if (!extractionResult) return;
    const newSample = {
      id: `sample-${Date.now()}`,
      text: samplePresetText,
      entities: extractionResult.entities,
      status: "Verified Annotation"
    };
    setTrainingSamples(prev => [newSample, ...prev]);
    setActiveLearningMsg("Sample & extracted entities added to fine-tuning training corpus!");
    setTimeout(() => setActiveLearningMsg(null), 5000);
  };

  // Filtered entities based on confidence and label selection
  const filteredEntities = extractionResult?.entities.filter(ent => {
    const passConf = (ent.confidence * 100) >= minConfidence;
    const passLabel = selectedLabelFilter === "ALL" || ent.label === selectedLabelFilter;
    return passConf && passLabel;
  }) || [];

  // Helper for entity label styling
  const getEntityBadgeStyle = (label: string) => {
    switch (label) {
      case "ORG":
        return "bg-blue-900/80 text-blue-200 border-blue-500/50";
      case "TECH":
        return "bg-amber-900/80 text-amber-200 border-amber-500/50";
      case "AGENCY":
        return "bg-purple-900/80 text-purple-200 border-purple-500/50";
      case "DOC_ID":
        return "bg-emerald-900/80 text-emerald-200 border-emerald-500/50";
      case "AMOUNT":
        return "bg-green-900/80 text-green-200 border-green-500/50";
      case "TIME":
        return "bg-sky-900/80 text-sky-200 border-sky-500/50";
      default:
        return "bg-slate-800 text-slate-200 border-slate-600";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6 text-slate-100">
      
      {/* HEADER BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl shadow-md">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Entity Extraction (NER) Model Training & Evaluation Studio</h2>
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Phase 2: Active
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              Fine-tune, evaluate, and test Gemini Flash & transformer token classifiers to extract corporate entities, patents, permits, and lead times.
            </p>
          </div>
        </div>

        {/* TAB CONTROLS */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveStudioTab("inference")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeStudioTab === "inference"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Tester</span>
          </button>
          <button
            onClick={() => setActiveStudioTab("training")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeStudioTab === "training"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Model Training & Fine-Tuning</span>
          </button>
          <button
            onClick={() => setActiveStudioTab("dataset")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeStudioTab === "dataset"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Annotated Dataset ({trainingSamples.length})</span>
          </button>
          <button
            onClick={() => setActiveStudioTab("resolution")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeStudioTab === "resolution"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Entity Resolution & Knowledge Graph</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE TESTER (INFERENCE) */}
      {activeStudioTab === "inference" && (
        <div className="flex flex-col gap-6">
          
          {/* MAIN INPUT & HISTORY SIDE-PANEL GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* LEFT: TEXTAREA INPUT FORM (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-indigo-400" />
                  <span>Unstructured Filing or Patent Abstract Input:</span>
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-semibold">Preset:</span>
                  <button
                    onClick={() => loadPresetText("nevada")}
                    className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded border border-emerald-500/30 cursor-pointer"
                  >
                    NDEP Lithium
                  </button>
                  <button
                    onClick={() => loadPresetText("defense")}
                    className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-sky-300 rounded border border-sky-500/30 cursor-pointer"
                  >
                    Anduril AUV
                  </button>
                  <button
                    onClick={() => loadPresetText("biotech")}
                    className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-purple-300 rounded border border-purple-500/30 cursor-pointer"
                  >
                    Moderna
                  </button>
                  <button
                    onClick={() => loadPresetText("semiconductors")}
                    className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 rounded border border-amber-500/30 cursor-pointer"
                  >
                    ASML
                  </button>
                </div>
              </div>

              <div className="relative">
                <textarea
                  rows={5}
                  value={samplePresetText}
                  onChange={(e) => setSamplePresetText(e.target.value)}
                  placeholder="Paste raw unstructured filing, grant notice, or patent text here..."
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs p-3.5 rounded-xl focus:outline-none focus:border-indigo-500 leading-relaxed font-mono"
                />
                <button
                  onClick={() => handleRunExtraction()}
                  disabled={isExtracting}
                  className="absolute bottom-3 right-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 ${isExtracting ? "animate-spin" : "fill-current"}`} />
                  <span>{isExtracting ? "Running NER Inference..." : "Extract Entities & Resolve Linkage"}</span>
                </button>
              </div>
            </div>

            {/* RIGHT: RECENT EXTRACTIONS HISTORY SIDE-PANEL (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Recent Extractions ({recentExtractions.length})</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Click item to re-execute</span>
              </div>

              <div className="space-y-2 max-h-52 overflow-y-auto pr-0.5">
                {recentExtractions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleRunExtraction(item.fullText)}
                    className="p-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800/90 hover:border-indigo-500/50 rounded-xl transition-all cursor-pointer flex flex-col gap-1.5 group"
                    title="Click to load text and extract entities"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-extrabold text-indigo-300 font-mono flex items-center gap-1">
                        <FileText className="w-3 h-3 text-indigo-400" />
                        <span>{item.domain}</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/30">
                          {item.count} Entities
                        </span>
                        <span className="text-slate-500">{item.timestamp}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 font-mono leading-snug line-clamp-2 group-hover:text-white">
                      "{item.snippet}"
                    </p>

                    <div className="flex justify-end pt-0.5">
                      <span className="text-[9px] font-bold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-0.5">
                        <span>Re-run Extraction</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* EXTRACTION RESULTS DISPLAY */}
          {extractionResult && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
              
              {/* TOP HEADER & ACTION BUTTONS */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-slate-800 pb-3 gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Extracted Entities ({extractionResult.extractedCount})</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                    Source: {extractionResult.extractionSource}
                  </span>
                  <div className="text-[10px] text-slate-400 flex items-center gap-2 font-mono ml-2">
                    <span>Latency: <strong className="text-slate-200">{extractionResult.performanceMetrics.inferenceLatencyMs}ms</strong></span>
                    <span>•</span>
                    <span>Accuracy: <strong className="text-slate-200">{(extractionResult.performanceMetrics.modelAccuracyScore * 100).toFixed(1)}%</strong></span>
                  </div>
                </div>

                {/* ACTION BUTTONS: EXPORT, CRM PUSH, ACTIVE LEARNING */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={exportEntitiesJson}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-[10px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    title="Download Extracted Entities as JSON"
                  >
                    <Download className="w-3 h-3 text-indigo-400" />
                    <span>JSON</span>
                  </button>

                  <button
                    onClick={exportEntitiesCsv}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-[10px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    title="Download Extracted Entities as CSV"
                  >
                    <Download className="w-3 h-3 text-emerald-400" />
                    <span>CSV</span>
                  </button>

                  <button
                    onClick={handlePushToCrm}
                    className="px-2.5 py-1 bg-indigo-950 hover:bg-indigo-900 text-indigo-200 border border-indigo-500/40 text-[10px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                    title="Push Briefing and Extracted Metadata directly into Broker CRM"
                  >
                    <Send className="w-3 h-3 text-indigo-400" />
                    <span>Push to CRM Briefing</span>
                  </button>

                  <button
                    onClick={handleAddToCorpus}
                    className="px-2.5 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/40 text-[10px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                    title="Append sample to Fine-Tuning Corpus for Active Learning"
                  >
                    <PlusCircle className="w-3 h-3 text-emerald-400" />
                    <span>Add to Training Corpus</span>
                  </button>
                </div>
              </div>

              {/* ACTION NOTIFICATION BANNERS */}
              {crmPushSuccess && (
                <div className="p-2.5 bg-indigo-950/80 border border-indigo-500/50 rounded-lg text-xs font-bold text-indigo-200 flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{crmPushSuccess}</span>
                </div>
              )}

              {activeLearningMsg && (
                <div className="p-2.5 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-xs font-bold text-emerald-200 flex items-center gap-2 animate-fadeIn">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{activeLearningMsg}</span>
                </div>
              )}

              {/* INTERACTIVE CONFIDENCE & LABEL FILTER BAR */}
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                
                {/* Confidence Slider */}
                <div className="flex items-center gap-3 min-w-[220px]">
                  <Filter className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-300">
                      <span>Min Confidence:</span>
                      <span className="text-indigo-400 font-mono">{minConfidence}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="95"
                      step="5"
                      value={minConfidence}
                      onChange={(e) => setMinConfidence(Number(e.target.value))}
                      className="w-full accent-indigo-500 h-1 mt-1 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Entity Label Type Tabs */}
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-bold mr-1">Label Filter:</span>
                  {["ALL", "ORG", "TECH", "AGENCY", "DOC_ID", "AMOUNT", "TIME"].map(label => (
                    <button
                      key={label}
                      onClick={() => setSelectedLabelFilter(label)}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedLabelFilter === label
                          ? "bg-indigo-600 text-white border-indigo-500"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Counter Badge */}
                <div className="text-[10px] font-mono font-bold text-slate-400 shrink-0">
                  Showing <span className="text-indigo-300">{filteredEntities.length}</span> of {extractionResult.entities.length}
                </div>
              </div>

              {/* EXTRACTED ENTITY CHIPS MATRIX */}
              {filteredEntities.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs font-mono">
                  No entities match the selected confidence threshold ({minConfidence}%) or label filter ({selectedLabelFilter}). Try adjusting the filters above.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {filteredEntities.map((ent, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex flex-col justify-between gap-2 shadow-sm ${getEntityBadgeStyle(ent.label)}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-extrabold font-mono tracking-tight">{ent.text}</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-950/60 border border-slate-700 shrink-0">
                          {ent.label}
                        </span>
                      </div>

                      <div className="text-[10px] opacity-90 flex items-center justify-between border-t border-slate-700/50 pt-1.5 mt-0.5">
                        <span>Category: <strong>{ent.category}</strong></span>
                        <span>Confidence: <strong>{(ent.confidence * 100).toFixed(0)}%</strong></span>
                      </div>

                      {/* Resolved Canonical Entity Linkage */}
                      {ent.resolvedEntity && (
                        <div className="mt-1 p-1.5 bg-slate-950/80 rounded-lg text-[10px] border border-slate-800 text-slate-200">
                          <div className="font-bold text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>Canonical: {ent.resolvedEntity}</span>
                          </div>
                          <div className="text-slate-400 mt-0.5">{ent.tickerOrCik}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: MODEL TRAINING & BATCH FINE-TUNING */}
      {activeStudioTab === "training" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: BATCH HYPERPARAMETERS & CONTROLS (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between gap-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <span>Batch Training Configuration</span>
                </h3>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  Batch Enabled
                </span>
              </div>

              {/* Architecture Selector */}
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Model Architecture</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setModelType("gemini-flash-fewshot")}
                    className={`p-2.5 rounded-lg border text-left transition-all text-xs cursor-pointer ${
                      modelType === "gemini-flash-fewshot"
                        ? "bg-indigo-950 border-indigo-500 text-white font-bold"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-bold text-indigo-300">Gemini 3.6 Flash Adapter</div>
                    <div className="text-[9px] text-slate-400 mt-0.5 leading-tight">Few-shot schema tuning with prompt constraints.</div>
                  </button>

                  <button
                    onClick={() => setModelType("spacy-ner-pipeline")}
                    className={`p-2.5 rounded-lg border text-left transition-all text-xs cursor-pointer ${
                      modelType === "spacy-ner-pipeline"
                        ? "bg-indigo-950 border-indigo-500 text-white font-bold"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-bold text-purple-300">spaCy / Transformer NER</div>
                    <div className="text-[9px] text-slate-400 mt-0.5 leading-tight">Token-level BiLSTM-CRF / RoBERTa span classifier.</div>
                  </button>
                </div>
              </div>

              {/* Batch Size Selector */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Batch Size (Per Step):</span>
                  <span className="text-indigo-400 font-mono">{batchSize} Spans / Batch</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[4, 8, 16, 32].map(b => (
                    <button
                      key={b}
                      onClick={() => setBatchSize(b)}
                      className={`py-1.5 px-2 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                        batchSize === b
                          ? "bg-indigo-600 text-white border-indigo-500 shadow-sm"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Training Dataset Source & Custom File Upload */}
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Batch Corpus Source</label>
                <div className="grid grid-cols-3 gap-1.5 mb-2">
                  <button
                    onClick={() => setBatchSource("corpus")}
                    className={`py-1.5 px-2 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                      batchSource === "corpus"
                        ? "bg-indigo-950 text-indigo-200 border-indigo-500"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    Corpus ({trainingSamples.length})
                  </button>
                  <button
                    onClick={() => setBatchSource("active_buffer")}
                    className={`py-1.5 px-2 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                      batchSource === "active_buffer"
                        ? "bg-indigo-950 text-indigo-200 border-indigo-500"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    Active Buffer
                  </button>
                  <button
                    onClick={() => setBatchSource("custom_file")}
                    className={`py-1.5 px-2 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                      batchSource === "custom_file"
                        ? "bg-indigo-950 text-indigo-200 border-indigo-500"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    Upload JSON
                  </button>
                </div>

                {batchSource === "custom_file" && (
                  <div className="p-3 bg-slate-900 border border-dashed border-slate-700 rounded-xl flex flex-col items-center gap-2">
                    <Upload className="w-5 h-5 text-indigo-400 animate-bounce" />
                    <span className="text-[11px] text-slate-300 font-bold">
                      {customBatchFile ? `Loaded: ${customBatchFile}` : "Upload Custom Batch JSON File"}
                    </span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleBatchFileUpload}
                      className="text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                    />
                    {customBatchSamples.length > 0 && (
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">
                        ✓ {customBatchSamples.length} annotated samples queued for batch training
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Epochs Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Training Epochs:</span>
                  <span className="text-indigo-400 font-mono">{epochs} Epochs</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="5"
                  value={epochs}
                  onChange={(e) => setEpochs(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Learning Rate Selector */}
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Learning Rate (AdamW Optimizer)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[0.001, 0.0005, 0.0001].map(lr => (
                    <button
                      key={lr}
                      onClick={() => setLearningRate(lr)}
                      className={`py-1.5 px-2 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                        learningRate === lr
                          ? "bg-indigo-600 text-white border-indigo-500 font-bold"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {lr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleRunTraining}
              disabled={isTraining}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              <Cpu className={`w-4 h-4 ${isTraining ? "animate-spin" : ""}`} />
              <span>{isTraining ? `Running Batch Fine-Tuning (${batchTrainingProgress}%)...` : "Execute Batch Fine-Tuning"}</span>
            </button>
          </div>

          {/* RIGHT: METRICS EVALUATION & RADAR CHART (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* TERMINAL LOG STREAM & BATCH PROGRESS BAR */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Batch Execution Stream</span>
                </span>
                <span className="text-[10px] text-slate-500">{trainingLogs.length} events logged</span>
              </div>

              {isTraining && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-indigo-300 font-mono">
                    <span>Processing Batch Epochs...</span>
                    <span>{batchTrainingProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300"
                      style={{ width: `${batchTrainingProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <pre className="bg-slate-900/90 text-emerald-300 text-[10px] font-mono p-3 rounded-lg max-h-36 overflow-y-auto leading-relaxed">
                {trainingLogs.length > 0 ? (
                  trainingLogs.map((log, i) => <div key={i}>{log}</div>)
                ) : (
                  <div className="text-slate-500">Select batch size and press "Execute Batch Fine-Tuning" to trigger training.</div>
                )}
              </pre>
            </div>

            {/* RADAR CHART & CONVERGENCE METRICS PANEL */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                  <h4 className="text-xs font-bold text-white">NER Precision & Recall Radar Evaluation</h4>
                </div>

                <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[10px] font-bold">
                  <button
                    onClick={() => setActiveMetricsView("radar")}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      activeMetricsView === "radar" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Radar Chart
                  </button>
                  <button
                    onClick={() => setActiveMetricsView("loss")}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      activeMetricsView === "loss" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Loss Curve
                  </button>
                  <button
                    onClick={() => setActiveMetricsView("table")}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      activeMetricsView === "table" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Class Table
                  </button>
                </div>
              </div>

              {/* OVERALL SCORES STAT BARS */}
              {trainingResults && (
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Precision</span>
                    <span className="text-sm font-black text-emerald-400">{trainingResults.overallPrecision}%</span>
                  </div>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Recall</span>
                    <span className="text-sm font-black text-sky-400">{trainingResults.overallRecall}%</span>
                  </div>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Micro F1</span>
                    <span className="text-sm font-black text-purple-400">{trainingResults.overallF1}%</span>
                  </div>
                </div>
              )}

              {/* VIEW 1: RADAR CHART VISUALIZATION */}
              {activeMetricsView === "radar" && (
                <div className="h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="75%"
                      data={(trainingResults?.labelMetrics || [
                        { label: "ORG", precision: 96.4, recall: 94.8, f1: 95.6 },
                        { label: "TECH", precision: 93.8, recall: 91.2, f1: 92.5 },
                        { label: "AGENCY", precision: 98.2, recall: 97.0, f1: 97.6 },
                        { label: "DOC_ID", precision: 97.5, recall: 96.1, f1: 96.8 },
                        { label: "AMOUNT", precision: 99.0, recall: 98.4, f1: 98.7 },
                        { label: "TIME", precision: 91.5, recall: 89.0, f1: 90.2 },
                        { label: "LOCATION", precision: 95.2, recall: 93.6, f1: 94.4 },
                        { label: "INDICATION", precision: 92.0, recall: 90.5, f1: 91.2 }
                      ]).map(m => ({
                        category: m.label.split(" ")[0],
                        Precision: m.precision,
                        Recall: m.recall,
                        F1: m.f1
                      }))}
                    >
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis
                        dataKey="category"
                        stroke="#cbd5e1"
                        tick={{ fill: "#cbd5e1", fontSize: 10, fontWeight: "bold" }}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[80, 100]}
                        stroke="#475569"
                        tick={{ fill: "#64748b", fontSize: 9 }}
                      />
                      <Radar
                        name="Precision (%)"
                        dataKey="Precision"
                        stroke="#34d399"
                        fill="#10b981"
                        fillOpacity={0.35}
                      />
                      <Radar
                        name="Recall (%)"
                        dataKey="Recall"
                        stroke="#38bdf8"
                        fill="#0284c7"
                        fillOpacity={0.35}
                      />
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "11px", color: "#f8fafc" }}
                      />
                      <RechartsLegend wrapperStyle={{ fontSize: "11px", color: "#cbd5e1" }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* VIEW 2: LOSS & CONVERGENCE LINE CHART */}
              {activeMetricsView === "loss" && (
                <div className="h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trainingResults?.epochProgress || [
                        { epoch: 1, trainLoss: 2.1, valLoss: 2.3, f1Score: 0.65 },
                        { epoch: 3, trainLoss: 1.4, valLoss: 1.6, f1Score: 0.78 },
                        { epoch: 5, trainLoss: 0.8, valLoss: 0.95, f1Score: 0.88 },
                        { epoch: 8, trainLoss: 0.35, valLoss: 0.42, f1Score: 0.93 },
                        { epoch: 10, trainLoss: 0.18, valLoss: 0.22, f1Score: 0.96 }
                      ]}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="epoch" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                      <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "11px" }}
                      />
                      <RechartsLegend wrapperStyle={{ fontSize: "11px" }} />
                      <Line type="monotone" dataKey="trainLoss" name="Train Loss" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="valLoss" name="Val Loss" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* VIEW 3: CLASS TABLE */}
              {activeMetricsView === "table" && (
                <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                  {(trainingResults?.labelMetrics || [
                    { label: "ORG (Company)", precision: 96.4, recall: 94.8, f1: 95.6, support: 142 },
                    { label: "TECH (Emerging Tech)", precision: 93.8, recall: 91.2, f1: 92.5, support: 188 },
                    { label: "AGENCY (Regulatory)", precision: 98.2, recall: 97.0, f1: 97.6, support: 96 },
                    { label: "DOC_ID (Permits/Patents)", precision: 97.5, recall: 96.1, f1: 96.8, support: 110 },
                    { label: "AMOUNT (Funding/Grants)", precision: 99.0, recall: 98.4, f1: 98.7, support: 82 },
                    { label: "TIME (Lead Horizon)", precision: 91.5, recall: 89.0, f1: 90.2, support: 64 },
                    { label: "LOCATION (Jurisdiction)", precision: 95.2, recall: 93.6, f1: 94.4, support: 78 },
                    { label: "INDICATION (Target Domain)", precision: 92.0, recall: 90.5, f1: 91.2, support: 52 }
                  ]).map((lm, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[10px] bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800">
                      <span className="font-bold text-slate-200 font-mono">{lm.label}</span>
                      <div className="flex items-center gap-3 font-mono">
                        <span>P: <strong className="text-emerald-400">{lm.precision}%</strong></span>
                        <span>R: <strong className="text-sky-400">{lm.recall}%</strong></span>
                        <span>F1: <strong className="text-purple-400">{lm.f1}%</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* VIEW 3: ANNOTATED TRAINING DATASET */}
      {activeStudioTab === "dataset" && (
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-400" />
                <span>Annotated Entity Training Corpus</span>
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Contains verified span annotations across filings, patents, and government regulatory grants.
              </p>
            </div>
            <button
              onClick={() => {
                const jsonStr = JSON.stringify(trainingSamples, null, 2);
                const blob = new Blob([jsonStr], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "ner_training_dataset.json";
                a.click();
              }}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Dataset (JSON)</span>
            </button>
          </div>

          <div className="space-y-3">
            {trainingSamples.map((sample, idx) => (
              <div key={idx} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="text-indigo-400 font-mono">#{sample.id} - {sample.domain}</span>
                  <span className="text-[10px] text-slate-500">{sample.annotations?.length || 0} span annotations</span>
                </div>
                <p className="text-xs text-slate-200 bg-slate-950 p-2.5 rounded-lg font-mono leading-relaxed border border-slate-800/80">
                  "{sample.rawText}"
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {sample.annotations?.map((ann: any, aIdx: number) => (
                    <span
                      key={aIdx}
                      className={`text-[9px] font-bold px-2 py-0.5 rounded border ${getEntityBadgeStyle(ann.label)}`}
                    >
                      {ann.span} <strong className="opacity-75">[{ann.label}]</strong>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: ENTITY RESOLUTION & CROSS-DOMAIN KNOWLEDGE GRAPH PIPELINE */}
      {activeStudioTab === "resolution" && (
        <div className="flex flex-col gap-6">

          {/* TOP METRICS & DISAMBIGUATION SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

            {/* LEFT: LIVE DISAMBIGUATION TESTER (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <GitCompare className="w-4 h-4 text-indigo-400" />
                    <span>Entity Disambiguation Engine</span>
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    Live Fuzzy & Alias Matcher
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Test alias resolution against canonical corporate entities, SEC CIK registry, ticker symbols, and agency abbreviations.
                </p>

                <div className="space-y-2.5 pt-1">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Raw Entity / Alias Text:</label>
                    <input
                      type="text"
                      value={resolveInputText}
                      onChange={(e) => setResolveInputText(e.target.value)}
                      placeholder="e.g. Anduril Corp, PLTR, MRNA, ASML Litho, NDEP"
                      className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-xs p-2.5 rounded-lg focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Domain Context Filter:</label>
                    <select
                      value={resolveSectorContext}
                      onChange={(e) => setResolveSectorContext(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-xs p-2 rounded-lg focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Defense & Aerospace">Defense & Aerospace</option>
                      <option value="Biotech & Gene Therapy">Biotech & Gene Therapy</option>
                      <option value="Semiconductors & Nanotech">Semiconductors & Nanotech</option>
                      <option value="Quantum & Advanced AI">Quantum & Advanced AI</option>
                      <option value="Clean Energy & Fusion">Clean Energy & Fusion</option>
                    </select>
                  </div>

                  {/* Preset Buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[10px] text-slate-400 font-semibold">Presets:</span>
                    <button
                      onClick={() => handleResolveEntityText("PLTR")}
                      className="px-2 py-0.5 text-[10px] font-bold bg-slate-900 hover:bg-slate-800 text-indigo-300 rounded border border-indigo-500/30 cursor-pointer"
                    >
                      PLTR
                    </button>
                    <button
                      onClick={() => handleResolveEntityText("Anduril Defense")}
                      className="px-2 py-0.5 text-[10px] font-bold bg-slate-900 hover:bg-slate-800 text-sky-300 rounded border border-sky-500/30 cursor-pointer"
                    >
                      Anduril Defense
                    </button>
                    <button
                      onClick={() => handleResolveEntityText("Moderna Therapeutics")}
                      className="px-2 py-0.5 text-[10px] font-bold bg-slate-900 hover:bg-slate-800 text-purple-300 rounded border border-purple-500/30 cursor-pointer"
                    >
                      Moderna Tx
                    </button>
                    <button
                      onClick={() => handleResolveEntityText("ASML Lithography")}
                      className="px-2 py-0.5 text-[10px] font-bold bg-slate-900 hover:bg-slate-800 text-amber-300 rounded border border-amber-500/30 cursor-pointer"
                    >
                      ASML Litho
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleResolveEntityText()}
                  disabled={isResolving}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  <Play className={`w-3.5 h-3.5 ${isResolving ? "animate-spin" : "fill-current"}`} />
                  <span>{isResolving ? "Resolving Linkage..." : "Resolve Entity Linkage"}</span>
                </button>
              </div>

              {/* RESOLUTION RESULT CARD */}
              {resolveResult && (
                <div className="p-3.5 bg-indigo-950/60 border border-indigo-500/50 rounded-xl space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{resolveResult.canonicalEntity}</span>
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-900/90 text-indigo-200 rounded border border-indigo-500/40 font-mono">
                      {resolveResult.matchType} Match
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 pt-1">
                    <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                      <span className="text-slate-500 block">Canonical ID:</span>
                      <strong className="font-mono text-indigo-300">{resolveResult.entityId}</strong>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                      <span className="text-slate-500 block">Confidence Score:</span>
                      <strong className="font-mono text-emerald-400">{(resolveResult.confidenceScore * 100).toFixed(0)}%</strong>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-300 bg-slate-900/90 p-2 rounded border border-slate-800 flex justify-between items-center">
                    <span>Ticker / CIK Mapping:</span>
                    <strong className="font-mono text-amber-300">{resolveResult.tickerOrCik}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: CANONICAL ENTITIES DIRECTORY (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-400" />
                    <span>Canonical Entity Registry ({canonicalEntities.length})</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Verified enterprise profiles with aliases, SEC CIKs, and domain sectors.
                  </p>
                </div>

                <div className="relative w-full sm:w-48">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={entitySearchFilter}
                    onChange={(e) => setEntitySearchFilter(e.target.value)}
                    placeholder="Search entities..."
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs pl-8 pr-2 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              {/* GRID OF CANONICAL ENTITIES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1">
                {canonicalEntities
                  .filter(ent => {
                    if (!entitySearchFilter.trim()) return true;
                    const q = entitySearchFilter.toLowerCase();
                    return ent.name.toLowerCase().includes(q) ||
                           ent.sector.toLowerCase().includes(q) ||
                           (ent.aliases && ent.aliases.some((a: string) => a.toLowerCase().includes(q)));
                  })
                  .map((ent) => (
                    <div key={ent.id} className="p-3 bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-xl flex flex-col justify-between gap-2 transition-all">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="text-xs font-bold text-slate-100">{ent.name}</h4>
                          <span className="text-[9px] font-extrabold text-indigo-400 font-mono block mt-0.5">{ent.sector}</span>
                        </div>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-300 font-mono shrink-0">
                          {ent.tickerOrCik ? ent.tickerOrCik.split("/")[0] : "UNLISTED"}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-800/80">
                        <span className="text-[9px] text-slate-500 font-mono self-center">Aliases:</span>
                        {ent.aliases?.map((alias: string, aIdx: number) => (
                          <button
                            key={aIdx}
                            onClick={() => handleResolveEntityText(alias)}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-indigo-500/50 cursor-pointer"
                            title="Click to test alias resolution"
                          >
                            {alias}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>

          {/* BOTTOM SECTION: CROSS-DOMAIN KNOWLEDGE GRAPH & MULTI-HOP LINKAGES */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-5">
            
            {/* HEADER & METRICS BAR */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-3 gap-3">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-purple-400" />
                  <span>Cross-Domain Knowledge Graph & Relationship Pipeline</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Extracted directed triples (Entity A &rarr; Relation &rarr; Entity B) synchronized between BigQuery and Firestore.
                </p>
              </div>

              {graphMetrics && (
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold flex-wrap">
                  <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-indigo-300">
                    Nodes: {graphNodes.length}
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-300">
                    Edges: {graphEdges.length}
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-amber-300">
                    Density: {graphMetrics.graphDensity}
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-purple-300">
                    Cross Triples: {graphMetrics.crossDomainTriples}
                  </span>
                </div>
              )}
            </div>

            {/* ACTION PIPELINE BUTTONS & TRAVERSAL SIMULATION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* BUTTON 1: RUN MULTI-HOP TRAVERSAL */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Link2 className="w-4 h-4 text-indigo-400" />
                      <span>Multi-Hop Graph Traversal</span>
                    </h4>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                      3-Hop Vector
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Traces hidden cross-domain paths linking commercial mining permits through DOE grants to DARPA defense solicitations.
                  </p>
                </div>

                <button
                  onClick={handleRunMultiHopTraversal}
                  disabled={isTracingHop}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 ${isTracingHop ? "animate-spin" : "fill-current"}`} />
                  <span>{isTracingHop ? "Tracing Path..." : "Simulate 3-Hop Traversal"}</span>
                </button>
              </div>

              {/* BUTTON 2: BIGQUERY DISTRIBUTED SQL JOIN & FIRESTORE SYNC */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-emerald-400" />
                      <span>BigQuery ETL & Firestore Sync</span>
                    </h4>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      Distributed SQL
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Executes BigQuery SQL joins across patents, grants, and NDEP permits, syncing new triples to Firestore.
                  </p>
                </div>

                <button
                  onClick={handleRunBigQuerySync}
                  disabled={isSyncingBigQuery}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingBigQuery ? "animate-spin" : ""}`} />
                  <span>{isSyncingBigQuery ? "Executing ETL..." : "Run BigQuery ETL Sync"}</span>
                </button>
              </div>

              {/* BUTTON 3: AUTOMATED GRAPH BUILDER & REAL-TIME INGESTION PIPELINE */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Auto Graph Ingestion Engine</span>
                    </h4>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                      Real-time Ingest
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Continuously ingests unstructured signal feeds, extracts entities & triples, and auto-commits directly to Firestore.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRunAutoIngest}
                    disabled={isAutoIngesting}
                    className="flex-1 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Play className={`w-3.5 h-3.5 ${isAutoIngesting ? "animate-spin" : "fill-current"}`} />
                    <span>{isAutoIngesting ? "Ingesting..." : "Run Auto Ingestion"}</span>
                  </button>
                  <button
                    onClick={handleRunCronScheduler}
                    disabled={isAutoIngesting}
                    className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg border border-slate-700 cursor-pointer"
                    title="Simulate Cloud Scheduler Cron"
                  >
                    Cron
                  </button>
                </div>
              </div>

            </div>

            {/* AUTOMATED INGESTION EXECUTION LOGS TERMINAL */}
            {autoIngestLogs.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 font-mono text-[11px] animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" />
                    <span>Graph Builder Ingestion Pipeline Logs</span>
                  </span>
                  {autoIngestResults && (
                    <span className="text-[10px] text-amber-300">
                      Ingested: {autoIngestResults.ingestedSignalCount} Signals | Nodes: +{autoIngestResults.nodesCreated} | Edges: +{autoIngestResults.edgesCreated}
                    </span>
                  )}
                </div>

                <div className="space-y-1 max-h-36 overflow-y-auto text-slate-400">
                  {autoIngestLogs.map((log, lIdx) => (
                    <div key={lIdx} className="leading-relaxed text-amber-300/90">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MULTI-HOP TRAVERSAL PATH DISPLAY */}
            {multiHopPath.length > 0 && (
              <div className="p-4 bg-indigo-950/40 border border-indigo-500/40 rounded-xl space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-200 border-b border-indigo-500/30 pb-2">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Discovered Multi-Hop Cross-Domain Traversal Path</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">4 Connected Hops</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
                  {multiHopPath.map((step, sIdx) => (
                    <div key={sIdx} className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex flex-col justify-between gap-1.5 relative">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="font-extrabold text-indigo-400">Hop {step.hop}</span>
                        <span className="text-slate-500">{step.domain}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-100">{step.node}</div>
                      {step.relation && (
                        <div className="text-[9px] font-extrabold text-amber-300 font-mono bg-slate-950 p-1 rounded border border-slate-800 text-center">
                          &rarr; {step.relation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BIGQUERY EXECUTION LOGS TERMINAL */}
            {bigquerySyncLogs.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 font-mono text-[11px] animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>BigQuery ETL & Firestore Sync Execution Logs</span>
                  </span>
                  {bqSyncMetrics && (
                    <span className="text-[10px] text-emerald-400">
                      Processed: {bqSyncMetrics.bytesProcessed} ({bqSyncMetrics.queryDurationMs}ms)
                    </span>
                  )}
                </div>

                <div className="space-y-1 max-h-36 overflow-y-auto text-slate-400">
                  {bigquerySyncLogs.map((log, lIdx) => (
                    <div key={lIdx} className="leading-relaxed text-emerald-300/90">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INTERACTIVE KNOWLEDGE GRAPH STUDIO TOOLBAR & CONTROLS */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* View Mode Switcher */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setGraphStudioMode("canvas")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      graphStudioMode === "canvas" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Workflow className="w-3.5 h-3.5" />
                    <span>Visual Network Canvas</span>
                  </button>
                  <button
                    onClick={() => setGraphStudioMode("triples")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      graphStudioMode === "triples" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Triples Feed</span>
                  </button>
                  <button
                    onClick={() => setGraphStudioMode("matrix")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      graphStudioMode === "matrix" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Adjacency Matrix</span>
                  </button>
                </div>

                {/* Search & Confidence Slider */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative w-44">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={graphSearchTerm}
                      onChange={(e) => setGraphSearchTerm(e.target.value)}
                      placeholder="Filter graph nodes..."
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs pl-8 pr-2 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                    <span className="text-slate-400 text-[10px]">Min Conf:</span>
                    <input
                      type="range"
                      min="0.5"
                      max="0.95"
                      step="0.05"
                      value={graphMinConfidence}
                      onChange={(e) => setGraphMinConfidence(parseFloat(e.target.value))}
                      className="w-20 accent-indigo-500 cursor-pointer"
                    />
                    <span className="text-indigo-400 font-bold">{Math.round(graphMinConfidence * 100)}%</span>
                  </div>

                  {graphStudioMode === "canvas" && (
                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                      <button
                        onClick={() => setCanvasZoom(prev => Math.max(0.7, prev - 0.1))}
                        className="p-1 text-slate-400 hover:text-white cursor-pointer"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] font-mono text-slate-400 px-1">{Math.round(canvasZoom * 100)}%</span>
                      <button
                        onClick={() => setCanvasZoom(prev => Math.min(1.5, prev + 0.1))}
                        className="p-1 text-slate-400 hover:text-white cursor-pointer"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Entity Type Filter Bar */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-mono font-bold mr-1">Node Domain:</span>
                {["ALL", "ORG", "PATENT", "PROJECT", "SOLICITATION", "GRANT", "PERMIT"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setGraphNodeTypeFilter(type)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded font-mono transition-all cursor-pointer ${
                      graphNodeTypeFilter === type
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* VIEW 1: VISUAL NETWORK CANVAS (SVG GRAPH MAP) */}
            {graphStudioMode === "canvas" && (() => {
              const filteredNodes = graphNodes.filter(node => {
                if (graphNodeTypeFilter !== "ALL" && node.type !== graphNodeTypeFilter) return false;
                if (graphSearchTerm && !node.name.toLowerCase().includes(graphSearchTerm.toLowerCase())) return false;
                return true;
              });

              const filteredEdges = graphEdges.filter(edge => {
                if (edge.confidence < graphMinConfidence) return false;
                const srcValid = filteredNodes.some(n => n.id === edge.sourceNodeId);
                const tgtValid = filteredNodes.some(n => n.id === edge.targetNodeId);
                return srcValid && tgtValid;
              });

              const canvasWidth = 840;
              const canvasHeight = 440;
              const centerX = canvasWidth / 2;
              const centerY = canvasHeight / 2;
              const radius = 175;

              const nodePosMap = new Map<string, { x: number; y: number; node: any }>();
              filteredNodes.forEach((node, idx) => {
                const angle = (idx / Math.max(1, filteredNodes.length)) * 2 * Math.PI - Math.PI / 2;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                nodePosMap.set(node.id, { x, y, node });
              });

              const selectedNodeObj = graphNodes.find(n => n.id === selectedGraphNodeId);
              const connectedEdges = filteredEdges.filter(e => e.sourceNodeId === selectedGraphNodeId || e.targetNodeId === selectedGraphNodeId);

              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* CANVAS CONTAINER (8 cols or 12 cols if no selection) */}
                  <div className={`${selectedGraphNodeId ? "lg:col-span-8" : "lg:col-span-12"} bg-slate-950 p-4 rounded-xl border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[460px]`}>
                    
                    {/* SVG CANVAS */}
                    <div className="w-full h-full flex items-center justify-center overflow-auto">
                      <svg
                        viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
                        className="w-full max-w-[840px] h-[420px] transition-transform duration-300"
                        style={{ transform: `scale(${canvasZoom})` }}
                      >
                        <defs>
                          <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
                          </marker>
                          <marker id="arrow-active" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                          </marker>
                        </defs>

                        {/* DRAW EDGES / CONNECTIONS */}
                        {filteredEdges.map((edge) => {
                          const srcPos = nodePosMap.get(edge.sourceNodeId);
                          const tgtPos = nodePosMap.get(edge.targetNodeId);
                          if (!srcPos || !tgtPos) return null;

                          const isConnected = selectedGraphNodeId === edge.sourceNodeId || selectedGraphNodeId === edge.targetNodeId;
                          const isDimmed = selectedGraphNodeId && !isConnected;

                          return (
                            <g key={edge.id} className="transition-opacity duration-300" opacity={isDimmed ? 0.2 : 1}>
                              <line
                                x1={srcPos.x}
                                y1={srcPos.y}
                                x2={tgtPos.x}
                                y2={tgtPos.y}
                                stroke={isConnected ? "#f59e0b" : "#475569"}
                                strokeWidth={isConnected ? 2.5 : 1.5}
                                strokeDasharray={isConnected ? "none" : "3 3"}
                                markerEnd={isConnected ? "url(#arrow-active)" : "url(#arrow)"}
                              />
                              {/* Edge Label on Midpoint */}
                              <text
                                x={(srcPos.x + tgtPos.x) / 2}
                                y={(srcPos.y + tgtPos.y) / 2 - 4}
                                fill={isConnected ? "#fef08a" : "#94a3b8"}
                                fontSize="9"
                                fontFamily="monospace"
                                fontWeight="bold"
                                textAnchor="middle"
                                className="pointer-events-none select-none"
                              >
                                {edge.relationType}
                              </text>
                            </g>
                          );
                        })}

                        {/* DRAW NODES */}
                        {Array.from(nodePosMap.values()).map(({ x, y, node }) => {
                          const isSelected = selectedGraphNodeId === node.id;
                          const isConnectedToSelected = connectedEdges.some(e => e.sourceNodeId === node.id || e.targetNodeId === node.id);
                          const isDimmed = selectedGraphNodeId && !isSelected && !isConnectedToSelected;

                          let fill = "#6366f1";
                          if (node.type === "PATENT") fill = "#f59e0b";
                          if (node.type === "PROJECT" || node.type === "SOLICITATION") fill = "#10b981";
                          if (node.type === "GRANT") fill = "#0284c7";
                          if (node.type === "PERMIT") fill = "#f43f5e";

                          return (
                            <g
                              key={node.id}
                              onClick={() => setSelectedGraphNodeId(isSelected ? null : node.id)}
                              className="cursor-pointer transition-all duration-300 hover:scale-110"
                              opacity={isDimmed ? 0.25 : 1}
                            >
                              {/* Halo Glow Ring on Selection */}
                              {isSelected && (
                                <circle cx={x} cy={y} r="24" fill="none" stroke="#f59e0b" strokeWidth="3" className="animate-pulse" />
                              )}

                              {/* Main Circle Node */}
                              <circle
                                cx={x}
                                cy={y}
                                r={isSelected ? 18 : 14}
                                fill={fill}
                                stroke="#1e293b"
                                strokeWidth="2.5"
                              />

                              {/* Node Label Text */}
                              <text
                                x={x}
                                y={y + 28}
                                fill={isSelected ? "#ffffff" : "#cbd5e1"}
                                fontSize="10"
                                fontWeight="bold"
                                textAnchor="middle"
                                className="pointer-events-none select-none font-sans"
                              >
                                {node.name.length > 20 ? node.name.slice(0, 18) + "..." : node.name}
                              </text>

                              <text
                                x={x}
                                y={y + 39}
                                fill="#64748b"
                                fontSize="8"
                                fontFamily="monospace"
                                textAnchor="middle"
                                className="pointer-events-none select-none uppercase"
                              >
                                {node.type}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>

                    {/* CANVAS FOOTER LEGEND */}
                    <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px] text-slate-400 font-mono">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" /> ORG
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> PATENT
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> PROJECT
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" /> GRANT
                        </span>
                      </div>
                      <span className="text-slate-500">Click any node to inspect relationships</span>
                    </div>

                  </div>

                  {/* RIGHT SIDE: SELECTED NODE INSPECTOR PANEL (4 cols) */}
                  {selectedNodeObj && (
                    <div className="lg:col-span-4 bg-slate-950 p-4 rounded-xl border border-indigo-500/40 flex flex-col justify-between gap-3 animate-fadeIn">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <div className="flex items-center gap-2">
                            <Info className="w-4 h-4 text-indigo-400" />
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Node Inspector</h4>
                          </div>
                          <button
                            onClick={() => setSelectedGraphNodeId(null)}
                            className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-3 space-y-2">
                          <h3 className="text-sm font-bold text-slate-100">{selectedNodeObj.name}</h3>
                          <div className="flex items-center gap-2 text-[10px] font-mono">
                            <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold border border-indigo-500/40">
                              {selectedNodeObj.type}
                            </span>
                            <span className="text-slate-400">{selectedNodeObj.domain}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-mono">
                            <div className="bg-slate-900 p-2 rounded border border-slate-800">
                              <span className="text-slate-500 block">Centrality Degree:</span>
                              <strong className="text-emerald-400 font-bold text-xs">{selectedNodeObj.degree || 4}</strong>
                            </div>
                            <div className="bg-slate-900 p-2 rounded border border-slate-800">
                              <span className="text-slate-500 block">Influence Score:</span>
                              <strong className="text-amber-400 font-bold text-xs">{selectedNodeObj.score || 88}</strong>
                            </div>
                          </div>

                          {/* CONNECTED EDGES LIST */}
                          <div className="pt-2">
                            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                              Active Linked Triples ({connectedEdges.length})
                            </h5>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                              {connectedEdges.map(edge => {
                                const isOutgoing = edge.sourceNodeId === selectedNodeObj.id;
                                const otherNodeId = isOutgoing ? edge.targetNodeId : edge.sourceNodeId;
                                const otherNode = graphNodes.find(n => n.id === otherNodeId);

                                return (
                                  <div key={edge.id} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-[10px] space-y-1">
                                    <div className="flex items-center justify-between font-mono">
                                      <span className="text-amber-300 font-bold">{isOutgoing ? "→ " + edge.relationType : "← " + edge.relationType}</span>
                                      <span className="text-emerald-400 font-bold">{Math.round(edge.confidence * 100)}%</span>
                                    </div>
                                    <div className="text-slate-200 font-bold">{otherNode?.name || otherNodeId}</div>
                                    <p className="text-[9px] text-slate-400 italic font-mono truncate">"{edge.evidenceSnippet}"</p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleRunMultiHopTraversal}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Trace Multi-Hop from this Node</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* VIEW 2: TRIPLES FEED VIEW */}
            {graphStudioMode === "triples" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {graphEdges
                  .filter(e => e.confidence >= graphMinConfidence)
                  .map((edge) => {
                    const srcNode = graphNodes.find(n => n.id === edge.sourceNodeId);
                    const tgtNode = graphNodes.find(n => n.id === edge.targetNodeId);

                    return (
                      <div key={edge.id} className="p-3.5 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl flex flex-col justify-between gap-2.5 transition-all">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-extrabold border border-indigo-500/30">
                            {edge.relationType}
                          </span>
                          <span className="text-emerald-400 font-bold">
                            {(edge.confidence * 100).toFixed(0)}% Conf
                          </span>
                        </div>

                        <div className="space-y-1.5 text-xs font-bold text-slate-200">
                          <div className="flex items-center gap-1 text-indigo-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                            <span>{srcNode?.name || edge.sourceNodeId}</span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 pl-3">&darr; {edge.relationType}</div>
                          <div className="flex items-center gap-1 text-emerald-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span>{tgtNode?.name || edge.targetNodeId}</span>
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-400 bg-slate-950 p-2 rounded-lg font-mono leading-relaxed border border-slate-800/80">
                          "{edge.evidenceSnippet}"
                        </p>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* VIEW 3: ADJACENCY MATRIX VIEW */}
            {graphStudioMode === "matrix" && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 overflow-x-auto space-y-3">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-indigo-400" />
                  <span>Cross-Domain Adjacency Relationship Matrix</span>
                </h4>

                <table className="w-full text-[10px] font-mono text-left text-slate-300 border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950">
                      <th className="p-2 text-slate-500 font-bold">Source Node \ Target</th>
                      {graphNodes.slice(0, 6).map(n => (
                        <th key={n.id} className="p-2 text-indigo-300 font-bold truncate max-w-[100px]">
                          {n.name.split(" ")[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {graphNodes.slice(0, 6).map(src => (
                      <tr key={src.id} className="border-b border-slate-800/60 hover:bg-slate-950/50">
                        <td className="p-2 text-slate-200 font-bold border-r border-slate-800/80 bg-slate-950/40">
                          {src.name}
                        </td>
                        {graphNodes.slice(0, 6).map(tgt => {
                          const matchingEdge = graphEdges.find(e => e.sourceNodeId === src.id && e.targetNodeId === tgt.id);
                          return (
                            <td key={tgt.id} className="p-2 text-center border-r border-slate-800/40">
                              {matchingEdge ? (
                                <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/30">
                                  {matchingEdge.relationType} ({Math.round(matchingEdge.confidence * 100)}%)
                                </span>
                              ) : (
                                <span className="text-slate-600">—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
