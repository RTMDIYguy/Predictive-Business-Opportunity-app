# Predictive Opportunity Intelligence Dashboard

> An interactive full-stack dashboard for predicting and identifying real business and government contracting opportunities from alternative data sources (SAM.gov, openFDA, ClinicalTrials.gov, USASpending.gov, arXiv, SEC EDGAR, USPTO), powered by Gemini AI synthesis.

---

## 🌟 Key Features

- **Multi-Source Federal Data Ingestion**: Direct integration with ClinicalTrials.gov, openFDA, USASpending.gov, SAM.gov, arXiv, SEC EDGAR, and USPTO open data.
- **Signal Processing & Sandbox**: Filter, toggle, and analyze weak signals across technology, regulatory, grant, and commercialization vectors.
- **Interactive UI with Smooth Transitions**: Powered by React, Tailwind CSS, and Framer Motion for interactive signal card toggling, deletion animations, and dynamic charts.
- **Gemini AI Strategic Synthesis**: Generates instant predictive intelligence reports, technology readiness levels (TRL), market timing horizon predictions, and recommended actionable steps.
- **Zero-Config Public APIs**: Access major federal datasets out-of-the-box without required API key registration. Optional API keys unlock higher rate limits for openFDA and direct SAM.gov access.

---

## 🏛️ Federal & Public Open Data Matrix

| Federal Data Endpoint | Auth Required | Key Purpose / Output |
| :--- | :---: | :--- |
| **ClinicalTrials.gov** | ❌ No | Phase I-IV study registrations, sponsor funding, pipeline progress |
| **USASpending.gov** | ❌ No | Prime contracts, grant awards, federal obligations |
| **arXiv Repository** | ❌ No | Scientific pre-prints in AI, biotech, quantum computing & robotics |
| **USPTO Patents & PatentsView** | ❌ No | Patent applications, granted claims, emerging innovation filings |
| **SEC EDGAR Filings** | ❌ No | 10-K/10-Q disclosures, material corporate R&D investments |
| **openFDA** | ⚡ Optional | Adverse events, drug approvals, medical device recalls (*240 req/min with free key*) |
| **SAM.gov Solicitations** | ⚡ Optional | Solicitations and contract opportunities (*Fallback signals included; optional key for direct API*) |

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React Icons, Framer Motion
- **Backend / Server**: Express Node.js server with Vite development middleware
- **AI Engine**: Google GenAI SDK (`@google/genai`) using Gemini models for cross-domain signal synthesis
- **Build & Bundling**: Vite, `esbuild` for production CommonJS server compilation (`dist/server.cjs`)

---

## 🚀 Quickstart & Local Development

### Prerequisites

- Node.js 18+ or Bun
- A Google Gemini API Key (`GEMINI_API_KEY`)

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.NAME.git
   cd YOUR_REPO_NAME
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (based on `.env.example`):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

---

## 📄 License & Maintenance

This repository is maintained as an open-source predictive analytics tool for federal contracting and market intelligence.
