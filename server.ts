import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Shared Gemini client with telemetry header
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  }) : null;

  // API endpoint for Opportunity analysis
  app.post("/api/analyze", async (req: any, res: any) => {
    try {
      if (!ai) {
        return res.status(400).json({
          error: "Gemini API Key is not configured. Please set GEMINI_API_KEY in Settings > Secrets."
        });
      }

      const { sector, signals } = req.body;
      if (!sector || !signals || !Array.isArray(signals)) {
        return res.status(400).json({ error: "Missing required fields: sector and signals array." });
      }

      const prompt = `Perform a predictive business intelligence analysis for the following sector and combination of pre-market signals:
Sector: ${sector}
Signals:
${signals.map((s, i) => `${i+1}. [${s.type}] ${s.title} (Observed: ${s.date}, Strength: ${s.strength || 'Medium'}, Lead Time: ${s.leadTime || 'Unknown'})`).join('\n')}

Based on our academic and industry research regarding predicting business announcements before they happen, analyze this signal cluster and output your predictive synthesis in structured JSON format. Provide detailed, concrete, realistic analysis.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a professional Alternative Data Venture Analyst and Predictive Intelligence Specialist. Your job is to analyze pre-market leading indicator signals (patents, job postings, VC flows, SEC filings, regulatory approvals, etc.) to identify hidden, unannounced business opportunities (M&A, new product lines, major expansions, clinical milestones) before public announcements occur. Provide realistic, data-driven, non-hype assessments.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              opportunityScore: {
                type: Type.INTEGER,
                description: "A predictive confidence score from 0 (noise) to 100 (high confidence imminent announcement)."
              },
              timeHorizon: {
                type: Type.STRING,
                description: "Estimated lead time until official market announcement (e.g., '3-6 months', '2-3 years')."
              },
              unannouncedIndicator: {
                type: Type.STRING,
                description: "Specific business opportunity/action this cluster predicts (e.g., 'An unannounced phase-II nanomedicine trial initiation or acquisition of Nanotech Biotech Ltd by a major pharma tier-1 player')."
              },
              synthesis: {
                type: Type.STRING,
                description: "Detailed narrative synthesis of how the signals connect logically. Cite patent trends, VC round indications, and hiring velocity changes."
              },
              criticalRisks: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of key validation failures, noise factors, or structural regulations that could invalidate this prediction."
              },
              recommendedActions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    action: { type: Type.STRING },
                    rationale: { type: Type.STRING },
                    phase: { type: Type.STRING, description: "e.g., 'Phase 1: Validation', 'Phase 2: Positioning', 'Phase 3: Execution'" }
                  },
                  required: ["action", "rationale", "phase"]
                },
                description: "Actionable playbook for an investor or corporate strategist to capitalize on or hedge against this prediction."
              }
            },
            required: ["opportunityScore", "timeHorizon", "unannouncedIndicator", "synthesis", "criticalRisks", "recommendedActions"]
          }
        }
      });

      const responseText = response.text || "{}";
      const parsedData = JSON.parse(responseText.trim());
      res.json(parsedData);
    } catch (err: any) {
      console.error("Gemini API Error in server.ts:", err);
      res.status(500).json({ error: err.message || "An error occurred during Gemini analysis." });
    }
  });

  // Serve static assets or use Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: any, res: any) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
