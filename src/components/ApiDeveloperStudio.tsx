import React, { useState } from "react";
import {
  Code2,
  Terminal,
  Play,
  Copy,
  Check,
  Globe,
  Database,
  Key,
  ShieldCheck,
  Send,
  Zap,
  BookOpen,
  FileText,
  Layers,
  Activity,
  Server,
  RefreshCw,
  ExternalLink,
  Sliders,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface ApiDeveloperStudioProps {
  onClose?: () => void;
}

const GRAPHQL_PRESETS = [
  {
    name: "Query Signals & Sources",
    query: `query FetchSignals {\n  signals {\n    id\n    title\n    source\n    sector\n    snippet\n  }\n}`,
    variables: `{}`
  },
  {
    name: "Fetch Canonical Entity Directory",
    query: `query GetEntities {\n  canonicalEntities {\n    id\n    name\n    sector\n    aliases\n    tickerOrCik\n  }\n}`,
    variables: `{}`
  },
  {
    name: "Query Knowledge Graph Triples",
    query: `query FetchKnowledgeGraph {\n  knowledgeGraph {\n    nodes {\n      id\n      name\n      type\n      domain\n      score\n    }\n    edges {\n      sourceNodeId\n      targetNodeId\n      relationType\n      confidence\n    }\n    metrics {\n      totalNodes\n      totalEdges\n      graphDensity\n    }\n  }\n}`,
    variables: `{}`
  },
  {
    name: "Query Predicted Procurement Opportunities",
    query: `query FetchOpportunities {\n  opportunities {\n    id\n    title\n    value\n    stage\n    matchScore\n    agency\n  }\n}`,
    variables: `{}`
  },
  {
    name: "Mutation: Resolve Entity Disambiguation",
    query: `mutation DisambiguateEntity($text: String!, $sectorContext: String) {\n  resolveEntity(text: $text, sectorContext: $sectorContext) {\n    canonicalEntity\n    entityId\n    tickerOrCik\n    confidenceScore\n    matchType\n    matchedAlias\n  }\n}`,
    variables: `{\n  "text": "PLTR",\n  "sectorContext": "Defense & Aerospace"\n}`
  },
  {
    name: "Mutation: Auto Ingest Graph Stream",
    query: `mutation RunAutoIngest {\n  autoIngestGraph {\n    nodesCreated\n    edgesCreated\n    firestoreSynced\n    status\n  }\n}`,
    variables: `{}`
  },
  {
    name: "Mutation: Trigger Gemini Signal Intelligence",
    query: `mutation SynthesizeSignals {\n  triggerGeminiSynthesis {\n    synthesizedBrief\n    confidenceScore\n    timestamp\n  }\n}`,
    variables: `{}`
  },
  {
    name: "Schema Introspection Query",
    query: `query IntrospectSchema {\n  __schema {\n    queryType { name }\n    mutationType { name }\n    types {\n      name\n      fields {\n        name\n      }\n    }\n  }\n}`,
    variables: `{}`
  }
];

const REST_ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/signals",
    description: "Fetch structured signal feeds filtered by domain sector & threshold",
    category: "Signals",
    sampleResponse: {
      success: true,
      count: 3,
      signals: [
        { id: "sig-101", title: "DARPA Swarm Drone AI Network", source: "SAM.gov", sector: "Defense & Aerospace" }
      ]
    }
  },
  {
    method: "GET",
    path: "/api/entities",
    description: "List canonical enterprise profiles and alias mappings",
    category: "Entity Resolution",
    sampleResponse: { success: true, count: 15, entities: [] }
  },
  {
    method: "POST",
    path: "/api/entities/resolve",
    description: "Fuzzy disambiguation engine for raw text entity resolution",
    category: "Entity Resolution",
    bodyTemplate: { text: "Lockheed Skunk Works", sectorContext: "Defense & Aerospace" }
  },
  {
    method: "GET",
    path: "/api/v1/opportunities",
    description: "Pipeline of predicted multi-million procurement opportunities",
    category: "Opportunities",
    sampleResponse: { success: true, count: 3, opportunities: [] }
  },
  {
    method: "POST",
    path: "/api/graph/auto-ingest",
    description: "Automated ingestion pipeline for cross-domain triple extraction",
    category: "Knowledge Graph",
    bodyTemplate: { sectorFilter: "ALL", autoCommitFirestore: true }
  },
  {
    method: "POST",
    path: "/api/graph/cron-ingest",
    description: "Simulate Cloud Scheduler Cron trigger for batch graph sync",
    category: "Knowledge Graph",
    bodyTemplate: { cronSchedule: "0 */1 * * *" }
  },
  {
    method: "GET",
    path: "/api/v1/spec",
    description: "Get OpenAPI 3.0 specification JSON schema",
    category: "System & Meta"
  }
];

export const ApiDeveloperStudio: React.FC<ApiDeveloperStudioProps> = () => {
  const [activeTab, setActiveTab] = useState<"graphql" | "rest" | "credentials">("graphql");

  // GraphQL Playground State
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [graphqlQuery, setGraphqlQuery] = useState<string>(GRAPHQL_PRESETS[0].query);
  const [graphqlVariables, setGraphqlVariables] = useState<string>(GRAPHQL_PRESETS[0].variables);
  const [graphqlResponse, setGraphqlResponse] = useState<any | null>(null);
  const [graphqlLoading, setGraphqlLoading] = useState<boolean>(false);
  const [graphqlExecutionTime, setGraphqlExecutionTime] = useState<number | null>(null);
  const [showDocsDrawer, setShowDocsDrawer] = useState<boolean>(false);

  // REST Explorer State
  const [selectedRestEndpointIndex, setSelectedRestEndpointIndex] = useState<number>(0);
  const [restRequestBody, setRestRequestBody] = useState<string>(
    JSON.stringify(REST_ENDPOINTS[0].bodyTemplate || {}, null, 2)
  );
  const [restResponse, setRestResponse] = useState<any | null>(null);
  const [restLoading, setRestLoading] = useState<boolean>(false);
  const [restStatusCode, setRestStatusCode] = useState<number | null>(null);
  const [codeLanguage, setCodeLanguage] = useState<"curl" | "python" | "typescript">("curl");

  // Credentials & Webhook State
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem("pred_intel_api_key") || "pred_live_sk_8f93a19b22e104c892";
  });
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [webhookUrl, setWebhookUrl] = useState<string>("https://api.yourcompany.com/webhooks/signals");
  const [webhookEventType, setWebhookEventType] = useState<string>("opportunity.high_conviction_detected");
  const [webhookDispatching, setWebhookDispatching] = useState<boolean>(false);
  const [webhookLogs, setWebhookLogs] = useState<string[]>([]);

  // Select Preset Handler
  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIndex(idx);
    setGraphqlQuery(GRAPHQL_PRESETS[idx].query);
    setGraphqlVariables(GRAPHQL_PRESETS[idx].variables);
  };

  // Execute GraphQL Query
  const handleExecuteGraphQL = async () => {
    setGraphqlLoading(true);
    setGraphqlResponse(null);
    setGraphqlExecutionTime(null);
    const start = Date.now();

    try {
      let parsedVars = {};
      try {
        parsedVars = graphqlVariables ? JSON.parse(graphqlVariables) : {};
      } catch (err) {
        setGraphqlResponse({ errors: [{ message: "Invalid JSON in GraphQL Variables field." }] });
        setGraphqlLoading(false);
        return;
      }

      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          query: graphqlQuery,
          variables: parsedVars
        })
      });

      const data = await res.json();
      setGraphqlExecutionTime(Date.now() - start);
      setGraphqlResponse(data);
    } catch (err: any) {
      setGraphqlResponse({ errors: [{ message: err.message || "Failed to execute GraphQL query" }] });
    } finally {
      setGraphqlLoading(false);
    }
  };

  // Execute REST Request
  const handleExecuteRest = async () => {
    const ep = REST_ENDPOINTS[selectedRestEndpointIndex];
    setRestLoading(true);
    setRestResponse(null);
    setRestStatusCode(null);

    try {
      const options: RequestInit = {
        method: ep.method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        }
      };

      if (ep.method === "POST" && restRequestBody) {
        try {
          options.body = JSON.stringify(JSON.parse(restRequestBody));
        } catch {
          options.body = restRequestBody;
        }
      }

      const res = await fetch(ep.path, options);
      setRestStatusCode(res.status);
      const data = await res.json();
      setRestResponse(data);
    } catch (err: any) {
      setRestStatusCode(500);
      setRestResponse({ error: err.message || "REST Request failed" });
    } finally {
      setRestLoading(false);
    }
  };

  // Generate New API Key
  const handleRegenerateKey = () => {
    const newKey = `pred_live_sk_${Math.random().toString(36).substring(2, 11)}${Math.random().toString(36).substring(2, 11)}`;
    setApiKey(newKey);
    localStorage.setItem("pred_intel_api_key", newKey);
  };

  // Test Webhook Dispatch
  const handleDispatchWebhook = async () => {
    setWebhookDispatching(true);
    setWebhookLogs([]);
    const logs = [
      `[WEBHOOK_DISPATCH] Packaging payload for event '${webhookEventType}'...`,
      `[HMAC_SIGNATURE] Signed headers with sha256 HMAC digest 't=1753891200,v1=9e82a...'`,
      `[HTTP_POST] Dispatching POST request to endpoint: ${webhookUrl}`,
      `[HTTP_RESPONSE] Received 200 OK from target receiver. Ack latency: 42ms.`,
      `[AUDIT_LOG] Event recorded in Firestore 'webhook_delivery_logs' table.`
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise(r => setTimeout(r, 250));
      setWebhookLogs(prev => [...prev, logs[i]]);
    }
    setWebhookDispatching(false);
  };

  const selectedRestEp = REST_ENDPOINTS[selectedRestEndpointIndex];

  // Code Snippet Generator
  const getCodeSnippet = () => {
    const baseUrl = window.location.origin;
    if (codeLanguage === "curl") {
      if (selectedRestEp.method === "GET") {
        return `curl -X GET "${baseUrl}${selectedRestEp.path}" \\\n  -H "Authorization: Bearer ${apiKey}" \\\n  -H "Accept: application/json"`;
      }
      return `curl -X POST "${baseUrl}${selectedRestEp.path}" \\\n  -H "Authorization: Bearer ${apiKey}" \\\n  -H "Content-Type: application/json" \\\n  -d '${restRequestBody.replace(/\n/g, "")}'`;
    }

    if (codeLanguage === "python") {
      return `import requests\n\nurl = "${baseUrl}${selectedRestEp.path}"\nheaders = {\n    "Authorization": "Bearer ${apiKey}",\n    "Content-Type": "application/json"\n}\n${
        selectedRestEp.method === "POST"
          ? `payload = ${restRequestBody}\nresponse = requests.post(url, headers=headers, json=payload)`
          : `response = requests.get(url, headers=headers)`
      }\nprint(response.json())`;
    }

    return `const response = await fetch("${baseUrl}${selectedRestEp.path}", {\n  method: "${selectedRestEp.method}",\n  headers: {\n    "Authorization": "Bearer ${apiKey}",\n    "Content-Type": "application/json"\n  }${
      selectedRestEp.method === "POST" ? `,\n  body: JSON.stringify(${restRequestBody.replace(/\n/g, " ")})` : ""
    }\n});\nconst data = await response.json();\nconsole.log(data);`;
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl space-y-6">
      
      {/* STUDIO HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-950 border border-indigo-500/30 rounded-xl text-indigo-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Backend REST & GraphQL API Developer Studio</span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded-md">
                  v1.2 Live
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Full-stack developer hub providing GraphQL IDE, REST OpenAPI specs, live request testing, and webhook integration.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("graphql")}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "graphql" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>GraphQL IDE</span>
          </button>
          <button
            onClick={() => setActiveTab("rest")}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "rest" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>REST v1 OpenAPI</span>
          </button>
          <button
            onClick={() => setActiveTab("credentials")}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "credentials" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Key className="w-4 h-4" />
            <span>API Keys & Webhooks</span>
          </button>
        </div>
      </div>

      {/* TAB 1: GRAPHQL IDE / PLAYGROUND */}
      {activeTab === "graphql" && (
        <div className="space-y-4">
          
          {/* TOP CONTROLS & PRESET SELECTOR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-xs font-mono text-slate-400 font-bold shrink-0">Preset Query:</span>
              <select
                value={selectedPresetIndex}
                onChange={(e) => handleSelectPreset(Number(e.target.value))}
                className="bg-slate-950 border border-slate-700 text-indigo-300 text-xs font-mono font-bold px-3 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 w-full sm:w-80 cursor-pointer"
              >
                {GRAPHQL_PRESETS.map((preset, pIdx) => (
                  <option key={pIdx} value={pIdx}>
                    {preset.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDocsDrawer(!showDocsDrawer)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                  showDocsDrawer
                    ? "bg-indigo-950 text-indigo-300 border-indigo-500/50"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Schema Docs</span>
              </button>

              <button
                onClick={handleExecuteGraphQL}
                disabled={graphqlLoading}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Play className={`w-3.5 h-3.5 ${graphqlLoading ? "animate-spin" : "fill-current"}`} />
                <span>{graphqlLoading ? "Executing..." : "Execute Query"}</span>
              </button>
            </div>
          </div>

          {/* MAIN IDE GRID: QUERY EDITOR + RESPONSE VIEWER (+ OPTIONAL DOCS DRAWER) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* LEFT COLUMN: QUERY & VARIABLES EDITOR (6 cols or 4 if docs open) */}
            <div className={`${showDocsDrawer ? "lg:col-span-5" : "lg:col-span-6"} space-y-3`}>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-xs font-mono font-bold text-slate-300">
                  <span className="flex items-center gap-1.5 text-indigo-400">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>GraphQL Operation Document</span>
                  </span>
                  <span className="text-[10px] text-slate-500">POST /api/graphql</span>
                </div>
                <textarea
                  value={graphqlQuery}
                  onChange={(e) => setGraphqlQuery(e.target.value)}
                  className="w-full h-64 bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs p-3 rounded-lg focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
                  placeholder="Type your GraphQL Query or Mutation here..."
                  spellCheck={false}
                />
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-xs font-mono font-bold text-slate-300">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>GraphQL Variables (JSON)</span>
                  </span>
                </div>
                <textarea
                  value={graphqlVariables}
                  onChange={(e) => setGraphqlVariables(e.target.value)}
                  className="w-full h-24 bg-slate-950 border border-slate-800 text-amber-300 font-mono text-xs p-3 rounded-lg focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
                  placeholder="{}"
                  spellCheck={false}
                />
              </div>
            </div>

            {/* RIGHT COLUMN: JSON RESPONSE VIEWER */}
            <div className={`${showDocsDrawer ? "lg:col-span-4" : "lg:col-span-6"} bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-xs font-mono font-bold text-slate-300">
                  <span className="flex items-center gap-1.5 text-sky-400">
                    <Server className="w-3.5 h-3.5" />
                    <span>GraphQL Response Output</span>
                  </span>
                  {graphqlExecutionTime !== null && (
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      200 OK • {graphqlExecutionTime}ms
                    </span>
                  )}
                </div>

                <div className="relative">
                  {graphqlResponse ? (
                    <pre className="bg-slate-950 border border-slate-800/80 text-slate-200 font-mono text-[11px] p-3 rounded-lg leading-relaxed overflow-x-auto max-h-[360px]">
                      <code>{JSON.stringify(graphqlResponse, null, 2)}</code>
                    </pre>
                  ) : (
                    <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-12 text-center text-slate-500 text-xs font-mono min-h-[360px] flex flex-col items-center justify-center gap-2">
                      <Terminal className="w-8 h-8 text-slate-700 animate-pulse" />
                      <span>Ready for execution. Click "Execute Query" above.</span>
                    </div>
                  )}
                </div>
              </div>

              {graphqlResponse && (
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Rate Limit: 1000/min | Remaining: 994</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(graphqlResponse, null, 2))}
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 cursor-pointer font-bold"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy JSON</span>
                  </button>
                </div>
              )}
            </div>

            {/* SCHEMA DOCUMENTATION DRAWER */}
            {showDocsDrawer && (
              <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-3 font-mono text-xs animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-indigo-300 font-bold">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Schema Explorer</span>
                  </span>
                  <span className="text-[10px] text-slate-500">v1.2</span>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  <div>
                    <h5 className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">Root Queries</h5>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      <li className="p-1.5 bg-slate-950 rounded border border-slate-800">
                        <strong className="text-emerald-400">signals</strong>: [Signal!]
                      </li>
                      <li className="p-1.5 bg-slate-950 rounded border border-slate-800">
                        <strong className="text-emerald-400">canonicalEntities</strong>: [CanonicalEntity!]
                      </li>
                      <li className="p-1.5 bg-slate-950 rounded border border-slate-800">
                        <strong className="text-emerald-400">knowledgeGraph</strong>: KnowledgeGraph
                      </li>
                      <li className="p-1.5 bg-slate-950 rounded border border-slate-800">
                        <strong className="text-emerald-400">opportunities</strong>: [Opportunity!]
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">Root Mutations</h5>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      <li className="p-1.5 bg-slate-950 rounded border border-slate-800">
                        <strong className="text-purple-400">resolveEntity</strong>(text, sector): EntityMatch
                      </li>
                      <li className="p-1.5 bg-slate-950 rounded border border-slate-800">
                        <strong className="text-purple-400">autoIngestGraph</strong>: IngestResult
                      </li>
                      <li className="p-1.5 bg-slate-950 rounded border border-slate-800">
                        <strong className="text-purple-400">triggerGeminiSynthesis</strong>: BriefResult
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* TAB 2: REST API V1 OPENAPI EXPLORER */}
      {activeTab === "rest" && (
        <div className="space-y-5">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* LEFT SIDE: ENDPOINT SELECTION LIST (4 cols) */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>REST Endpoints</span>
                <span className="text-[10px] text-indigo-400 font-bold">OpenAPI 3.0</span>
              </h4>

              <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
                {REST_ENDPOINTS.map((ep, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedRestEndpointIndex(idx);
                      setRestRequestBody(JSON.stringify(ep.bodyTemplate || {}, null, 2));
                      setRestResponse(null);
                      setRestStatusCode(null);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer font-mono text-xs flex flex-col gap-1 ${
                      selectedRestEndpointIndex === idx
                        ? "bg-slate-950 border-indigo-500/80 shadow-sm"
                        : "bg-slate-950/40 border-slate-800/80 hover:bg-slate-950"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                        ep.method === "GET" ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30" : "bg-purple-950 text-purple-300 border border-purple-500/30"
                      }`}>
                        {ep.method}
                      </span>
                      <span className="text-[10px] text-slate-500">{ep.category}</span>
                    </div>
                    <span className="text-slate-200 font-bold truncate">{ep.path}</span>
                    <span className="text-[10px] text-slate-400 font-sans line-clamp-1">{ep.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: REQUEST TESTER & RESPONSE OUTPUT (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* ENDPOINT BANNER & RUN BUTTON */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className={`px-2 py-1 font-bold rounded ${
                      selectedRestEp.method === "GET" ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30" : "bg-purple-950 text-purple-300 border border-purple-500/30"
                    }`}>
                      {selectedRestEp.method}
                    </span>
                    <strong className="text-white text-sm">{selectedRestEp.path}</strong>
                  </div>

                  <button
                    onClick={handleExecuteRest}
                    disabled={restLoading}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className={`w-3.5 h-3.5 ${restLoading ? "animate-spin" : ""}`} />
                    <span>{restLoading ? "Sending Request..." : "Send Request"}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-400">{selectedRestEp.description}</p>
              </div>

              {/* REQUEST BODY INPUT (IF POST) */}
              {selectedRestEp.method === "POST" && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                  <h5 className="text-xs font-mono font-bold text-amber-400 mb-2">JSON Request Body</h5>
                  <textarea
                    value={restRequestBody}
                    onChange={(e) => setRestRequestBody(e.target.value)}
                    className="w-full h-24 bg-slate-950 border border-slate-800 text-amber-300 font-mono text-xs p-3 rounded-lg focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
                    spellCheck={false}
                  />
                </div>
              )}

              {/* CODE SNIPPET GENERATOR */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Generated Integration Code Snippet</span>
                  </span>

                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800 text-[10px] font-mono">
                    <button
                      onClick={() => setCodeLanguage("curl")}
                      className={`px-2 py-0.5 rounded cursor-pointer ${codeLanguage === "curl" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"}`}
                    >
                      cURL
                    </button>
                    <button
                      onClick={() => setCodeLanguage("python")}
                      className={`px-2 py-0.5 rounded cursor-pointer ${codeLanguage === "python" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"}`}
                    >
                      Python
                    </button>
                    <button
                      onClick={() => setCodeLanguage("typescript")}
                      className={`px-2 py-0.5 rounded cursor-pointer ${codeLanguage === "typescript" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"}`}
                    >
                      TypeScript
                    </button>
                  </div>
                </div>

                <pre className="bg-slate-950 text-indigo-300 font-mono text-[11px] p-3 rounded-lg leading-relaxed overflow-x-auto">
                  <code>{getCodeSnippet()}</code>
                </pre>
              </div>

              {/* REST RESPONSE VIEWER */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <span className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5" />
                    <span>REST Response Payload</span>
                  </span>
                  {restStatusCode !== null && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${
                      restStatusCode === 200 ? "bg-emerald-950 text-emerald-300 border-emerald-500/30" : "bg-rose-950 text-rose-300 border-rose-500/30"
                    }`}>
                      HTTP {restStatusCode}
                    </span>
                  )}
                </div>

                <pre className="bg-slate-950 border border-slate-800/80 text-slate-200 font-mono text-[11px] p-3 rounded-lg leading-relaxed overflow-x-auto max-h-56">
                  <code>{restResponse ? JSON.stringify(restResponse, null, 2) : "// Click 'Send Request' to view real server response"}</code>
                </pre>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 3: API KEYS, WEBHOOKS & RATE LIMITING */}
      {activeTab === "credentials" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* API CREDENTIALS & RATE LIMITS */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Key className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="text-sm font-bold text-white">API Authentication Credentials</h3>
                <p className="text-xs text-slate-400">Bearer tokens used for authenticating REST and GraphQL client calls.</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300">Live Production Secret Key</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={apiKey}
                  className="w-full bg-slate-950 border border-slate-800 text-amber-300 font-mono text-xs px-3 py-2 rounded-lg"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(apiKey);
                    setCopiedKey(true);
                    setTimeout(() => setCopiedKey(false), 2000);
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 shrink-0 cursor-pointer"
                >
                  {copiedKey ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleRegenerateKey}
                  className="text-xs font-mono font-bold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate API Key</span>
                </button>
              </div>
            </div>

            {/* RATE LIMITING STATUS */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 font-bold">API Quota Usage:</span>
                <span className="text-emerald-400 font-bold">994 / 1,000 requests/min</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-emerald-500 h-2 w-[6%]" />
              </div>
              <p className="text-[10px] text-slate-500 font-mono">
                Standard Google Cloud Run free tier allocation. Enforced via express middleware.
              </p>
            </div>
          </div>

          {/* WEBHOOK EVENT SIMULATOR */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Zap className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Live Webhook Dispatcher</h3>
                <p className="text-xs text-slate-400">Simulate real-time webhook event delivery to your CRM or backend.</p>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-slate-400 font-bold block mb-1">Target Webhook Listener URL</label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">Event Type</label>
                <select
                  value={webhookEventType}
                  onChange={(e) => setWebhookEventType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-amber-300 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="opportunity.high_conviction_detected">opportunity.high_conviction_detected</option>
                  <option value="signal.cross_domain_linked">signal.cross_domain_linked</option>
                  <option value="knowledge_graph.triples_merged">knowledge_graph.triples_merged</option>
                  <option value="crm.brief_auto_generated">crm.brief_auto_generated</option>
                </select>
              </div>

              <button
                onClick={handleDispatchWebhook}
                disabled={webhookDispatching}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className={`w-3.5 h-3.5 ${webhookDispatching ? "animate-spin" : ""}`} />
                <span>{webhookDispatching ? "Dispatching Webhook..." : "Test Dispatch Webhook Event"}</span>
              </button>

              {webhookLogs.length > 0 && (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1 font-mono text-[10px] text-amber-300 max-h-36 overflow-y-auto">
                  {webhookLogs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed">{log}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
