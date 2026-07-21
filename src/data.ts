import { Sector, CostResource, TimelineTask } from "./types";

export const SECTORS: Sector[] = [
  {
    id: "biotech",
    name: "Biotechnology & Pharmaceuticals",
    description: "Characterized by long R&D cycles, high patent intensity, clear regulatory pathways (FDA), and clinical trials.",
    iconName: "Dna",
    prebakedSignals: [
      {
        id: "bio-1",
        type: "Patent",
        title: "Patent Filing Cluster: Lipid Nanoparticle mRNA Formulations",
        date: "2026-01-15",
        strength: "Very High",
        leadTime: "2-4 years",
        description: "Cluster of 4 newly published patent filings regarding novel target ligands on lipid membranes, indicating a next-generation oncology drug vehicle.",
        source: "WIPO / USPTO"
      },
      {
        id: "bio-2",
        type: "VC Flow",
        title: "Venture Round: $42M Series A into Targeted Therapeutics Inc",
        date: "2026-03-10",
        strength: "High",
        leadTime: "1-3 years",
        description: "Series A backed by Arch Venture Partners and OrbiMed. Focus is matching custom peptide ligands to mRNA lipid delivery systems.",
        source: "Crunchbase / SEC Form D"
      },
      {
        id: "bio-3",
        type: "Job Posting",
        title: "Hiring Spike: Senior Formulation Scientists (mRNA focus)",
        date: "2026-05-02",
        strength: "High",
        leadTime: "30-90 days",
        description: "A sudden jump of 12 job openings for cleanroom formulation experts and lipid conjugation researchers in South San Francisco.",
        source: "Indeed / LinkedIn"
      },
      {
        id: "bio-4",
        type: "Regulatory Filing",
        title: "FDA Expedited Review & Orphan Drug Request",
        date: "2026-06-20",
        strength: "Very High",
        leadTime: "Months to years",
        description: "Pre-clinical FDA interaction logged regarding synthetic peptide mRNA conjugation, aiming at fast-track designation.",
        source: "clinicaltrials.gov / FDA Portal"
      },
      {
        id: "bio-5",
        type: "Academic Research",
        title: "Preprint: Synergistic In-Vivo Delivery of mRNA using Ligand-3",
        date: "2026-07-05",
        strength: "Medium",
        leadTime: "Years",
        description: "Academic paper co-authored by Targeted Therapeutics co-founders proving a 400% increase in liver cell targeting efficiency.",
        source: "bioRxiv"
      }
    ]
  },
  {
    id: "semiconductors",
    name: "Semiconductors & Electronics",
    description: "Complex capital-intensive supply chains, massive lithography/fab development times, and extreme engineering niche hiring.",
    iconName: "Cpu",
    prebakedSignals: [
      {
        id: "semi-1",
        type: "Patent",
        title: "Patent Grant: 2nm Extreme Ultraviolet (EUV) Mirror Alignment Optic",
        date: "2025-11-20",
        strength: "Very High",
        leadTime: "2-4 years",
        description: "Patent granted for high-precision magnetic actuators used to stabilize lithography mirrors during sub-2nm chip manufacturing.",
        source: "USPTO"
      },
      {
        id: "semi-2",
        type: "Supply Chain",
        title: "Supply Chain Signal: ASML High-NA Lithography Subassembly Shipment Delay",
        date: "2026-02-14",
        strength: "High",
        leadTime: "Weeks to months",
        description: "Internal customs logs and port tracking indicate a significant increase in custom optical sub-units shipped from Germany to Oregon.",
        source: "Customs Manifests / ImportGenius"
      },
      {
        id: "semi-3",
        type: "Job Posting",
        title: "Hiring Spike: Quantum Optics Alignment Physicists",
        date: "2026-04-05",
        strength: "High",
        leadTime: "30-90 days",
        description: "A leading US semiconductor fab opens 8 niche roles for specialists experienced in high-energy gas laser alignment.",
        source: "LinkedIn"
      },
      {
        id: "semi-4",
        type: "Government Contract",
        title: "CHIPS Act Preliminary Memorandum of Terms ($140M)",
        date: "2026-06-01",
        strength: "Very High",
        leadTime: "Months to years",
        description: "Preliminary allocation under the CHIPS Act for cleanroom expansion focusing specifically on sub-2nm advanced packaging technologies.",
        source: "Federal Register / CHIPS.gov"
      }
    ]
  },
  {
    id: "cleantech",
    name: "Energy & Clean Tech",
    description: "Regulatory-driven markets, public policy incentives, large-scale infrastructure capital, and chemistry-based battery patents.",
    iconName: "Zap",
    prebakedSignals: [
      {
        id: "clean-1",
        type: "Patent",
        title: "Patent Filing: Sodium-Ion Solid State Dendrite Inhibition Layer",
        date: "2026-01-10",
        strength: "High",
        leadTime: "2-3 years",
        description: "Patent application for a ceramic electrolyte separator that prevents dendrite formation in low-cost sodium solid-state battery cells.",
        source: "EPO"
      },
      {
        id: "clean-2",
        type: "VC Flow",
        title: "Funding: $65M Series B for SaltGrid Energy",
        date: "2026-03-22",
        strength: "High",
        leadTime: "1-2 years",
        description: "Series B round with Breakthrough Energy Ventures leading, indicating commercial grid-scale battery pilot preparation.",
        source: "PitchBook"
      },
      {
        id: "clean-3",
        type: "Government Contract",
        title: "DOE Grid Innovation Grant: $25M Pilot",
        date: "2026-05-18",
        strength: "Very High",
        leadTime: "Months to years",
        description: "Department of Energy award for a 50MWh salt-based energy storage system deployment in Texas.",
        source: "SAM.gov"
      },
      {
        id: "clean-4",
        type: "Regulatory Filing",
        title: "EPA Fast-Track Environmental Assessment Permit",
        date: "2026-06-25",
        strength: "Medium",
        leadTime: "Weeks to months",
        description: "Environmental clearance requested for construction of an advanced battery assembly facility in a designated clean-energy hub.",
        source: "EPA Registry"
      }
    ]
  },
  {
    id: "fintech",
    name: "Financial Services & FinTech",
    description: "Highly digital, transaction-heavy, dependent on API connectivity and regulatory payment licenses.",
    iconName: "Coins",
    prebakedSignals: [
      {
        id: "fin-1",
        type: "Patent",
        title: "Patent Grant: Zero-Knowledge Multi-Party Ledger Reconciliation",
        date: "2026-02-01",
        strength: "High",
        leadTime: "1-2 years",
        description: "Patent for a high-throughput bank ledger settlement protocol using privacy-preserving zero-knowledge mathematical proofs.",
        source: "USPTO"
      },
      {
        id: "fin-2",
        type: "Job Posting",
        title: "Hiring Spike: Core Bank Settlement Engineers (COBOL + Rust)",
        date: "2026-04-12",
        strength: "Medium",
        leadTime: "30-90 days",
        description: "A prominent digital-first banking platform opens 15 engineering positions designed to bridge legacy mainframe books to modern Rust APIs.",
        source: "Indeed"
      },
      {
        id: "fin-3",
        type: "Regulatory Filing",
        title: "SEC Form S-1 Draft Amendment Filings",
        date: "2026-06-15",
        strength: "Very High",
        leadTime: "3-6 months",
        description: "Unpublished amendments to SEC draft registrations hinting at a major merger between two mid-tier payment processors.",
        source: "SEC EDGAR"
      }
    ]
  },
  {
    id: "retail",
    name: "Retail & Consumer Goods",
    description: "Rapidly shifting social sentiment, consumer viral loops, logistics signals, and real-time search trends.",
    iconName: "ShoppingBag",
    prebakedSignals: [
      {
        id: "ret-1",
        type: "Social Sentiment",
        title: "Social Sentiment: 450% Spike in Reddit discussions of Cold-Brew Protein",
        date: "2026-04-20",
        strength: "Medium",
        leadTime: "Weeks to months",
        description: "A sudden viral interest in r/Fitness and r/Coffee discussing a custom cold-brew formulation that preserves whey protein structure.",
        source: "Reddit / Google Trends"
      },
      {
        id: "ret-2",
        type: "Job Posting",
        title: "Hiring: Food & Beverage Formulation Specialists",
        date: "2026-05-15",
        strength: "Medium",
        leadTime: "30-90 days",
        description: "Monster Energy and Nestle concurrently post urgent listings in Austin and Seattle for beverage pasteurization and formulation specialists.",
        source: "Indeed"
      },
      {
        id: "ret-3",
        type: "Supply Chain",
        title: "Supply Chain Signal: High-grade Nitrogen Canning Valves order",
        date: "2026-06-10",
        strength: "High",
        leadTime: "Weeks to months",
        description: "Bill of Lading shipments show Targeted Canning Inc importing 50,000 units of custom nitrogen-infusion caps, implying rapid new beverage line packing.",
        source: "Panjiva / Port Logs"
      }
    ]
  }
];

export const COST_RESOURCES: CostResource[] = [
  {
    id: "cloud-run",
    service: "Google Cloud Run (Serverless Web/API)",
    description: "Hosts the Express backend server and serves React static assets.",
    tierInfo: "First 2 Million requests/month free",
    unitCost: "$0.00002400 per CPU-second beyond free tier",
    quantity: 1,
    maxFreeAllocation: "2M requests, 360k vCPU-seconds, 180k GiB-seconds",
    estimatedCost: 0.00,
    included: true
  },
  {
    id: "firestore",
    service: "Cloud Firestore (NoSQL Database)",
    description: "Stores ingested signals metadata, active alerts, and generated opportunity analyses.",
    tierInfo: "First 1 GB storage & 50,000 reads / 20,000 writes daily free",
    unitCost: "$0.18 per GB/month beyond free",
    quantity: 1,
    maxFreeAllocation: "1 GB, 50k reads/day, 20k writes/day",
    estimatedCost: 0.00,
    included: true
  },
  {
    id: "cloud-scheduler",
    service: "Cloud Scheduler (Cron Orchestrator)",
    description: "Triggers Cloud Run endpoints periodically to poll USPTO, FDA, and jobs APIs.",
    tierInfo: "First 3 jobs per month free",
    unitCost: "$0.10 per job/month beyond free",
    quantity: 3,
    maxFreeAllocation: "3 jobs fully free",
    estimatedCost: 0.00,
    included: true
  },
  {
    id: "vertex-ai",
    service: "Vertex AI / Gemini 3.6 Flash (LLM Server)",
    description: "Runs entity extraction (NER) and synthesizes multi-source opportunity intelligence.",
    tierInfo: "Free tier allocations on Google AI Studio",
    unitCost: "$0.075 per 1M input tokens, $0.30 per 1M output tokens",
    quantity: 150000, // input tokens simulated
    maxFreeAllocation: "15 RPM (Requests Per Minute) free on AI Studio standard tier",
    estimatedCost: 0.00,
    included: true
  },
  {
    id: "bigquery",
    service: "BigQuery (Data Warehouse & Analytics)",
    description: "Stores historical alternative data streams (years of patent and funding dumps).",
    tierInfo: "First 10 GB storage & 1 TB query processing free per month",
    unitCost: "$0.02 per GB, $5.00 per TB query",
    quantity: 15, // GBs
    maxFreeAllocation: "10 GB storage free",
    estimatedCost: 0.10, // low cost
    included: false
  },
  {
    id: "pubsub",
    service: "Cloud Pub/Sub (Event Messaging)",
    description: "Decouples scrapers and API ingestion from the core processing pipeline.",
    tierInfo: "First 10 GB of data throughput per month free",
    unitCost: "$40.00 per TB beyond free tier",
    quantity: 5, // GBs
    maxFreeAllocation: "10 GB data throughput free",
    estimatedCost: 0.00,
    included: true
  }
];

export const TIMELINE_TASKS: TimelineTask[] = [
  {
    id: "t1",
    task: "API Integration & Data Ingestion (USPTO, SEC EDGAR, clinicaltrials.gov)",
    phase: "Phase 1: Ingestion & Pipelines",
    weeks: [1, 2],
    status: "In Progress",
    dependencies: []
  },
  {
    id: "t2",
    task: "Serverless Scrapers & Cloud Scheduler Setup (Reddit, LinkedIn niche roles)",
    phase: "Phase 1: Ingestion & Pipelines",
    weeks: [2, 3],
    status: "Planned",
    dependencies: ["t1"]
  },
  {
    id: "t3",
    task: "Entity Extraction (NER) Model training using spaCy or Gemini flash proxy",
    phase: "Phase 2: Signal Engineering",
    weeks: [3, 4],
    status: "Planned",
    dependencies: ["t1"]
  },
  {
    id: "t4",
    task: "Cross-domain Linkage & Knowledge Graph builder in BigQuery/Firestore",
    phase: "Phase 2: Signal Engineering",
    weeks: [4, 5],
    status: "Planned",
    dependencies: ["t2", "t3"]
  },
  {
    id: "t5",
    task: "Gemini Synthesis Orchestrator (Express API + prompt engineering)",
    phase: "Phase 3: Intelligence & Core AI",
    weeks: [5, 6],
    status: "Planned",
    dependencies: ["t4"]
  },
  {
    id: "t6",
    task: "Interactive User Dashboard & Alerting System UI (React + Tailwind)",
    phase: "Phase 3: Intelligence & Core AI",
    weeks: [6, 7],
    status: "Planned",
    dependencies: ["t5"]
  },
  {
    id: "t7",
    task: "Production Deployment on Google Cloud Run & Security Hardening",
    phase: "Phase 4: Deployment & Scale",
    weeks: [8],
    status: "Planned",
    dependencies: ["t6"]
  }
];

export const INGESTION_RESOURCES = [
  {
    name: "Patents (USPTO & EPO Bulk Data API)",
    description: "Official public database of patents, grants, and citations. USPTO offers daily XML bulk downloads.",
    docsLink: "https://developer.uspto.gov/api-catalog",
    pythonCode: `import requests
import zipfile
import io

def download_daily_patents(date_str="20260721"):
    # USPTO daily grants bulk download endpoint
    url = f"https://bulkdata.uspto.gov/data/patent/grant/redbook/2026/ipg{date_str}.zip"
    print(f"Fetching USPTO Daily Patent grants for {date_str}...")
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        z = zipfile.ZipFile(io.BytesIO(response.content))
        # Extract files to parse grant xml
        z.extractall("./raw_patents")
        print("Grants extracted successfully!")
    else:
        print("No daily file released yet or API error.")`
  },
  {
    name: "Regulatory Filings (FDA Clinical Trials & SEC EDGAR)",
    description: "SEC offers RSS feeds of real-time company filings. ClinicalTrials.gov offers complete structured JSON API access for research registries.",
    docsLink: "https://clinicaltrials.gov/data-api/api",
    pythonCode: `import requests

def fetch_recent_clinical_trials(keyword="lipid nanoparticle"):
    url = "https://clinicaltrials.gov/api/v2/studies"
    params = {
        "query.term": keyword,
        "filter.overallStatus": "RECRUITING",
        "pageSize": 5
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        for study in data.get("studies", []):
            protocol = study.get("protocolSection", {})
            title = protocol.get("identificationModule", {}).get("officialTitle")
            sponsor = protocol.get("sponsorCollaboratorsModule", {}).get("leadSponsor", {}).get("name")
            print(f"Sponsor: {sponsor} | Study: {title}")`
  },
  {
    name: "Procurement & Contracts (USASpending.gov API)",
    description: "Direct real-time API access to all federal contract awards, sub-contracts, and spending accounts.",
    docsLink: "https://api.usaspending.gov/",
    pythonCode: `import requests

def search_federal_contracts(recipient_duns="001234567"):
    url = "https://api.usaspending.gov/api/v2/search/spending_by_award/"
    payload = {
        "filters": {
            "keywords": ["Quantum Computing", "Advanced Packaging"],
            "award_ids": []
        },
        "fields": ["Award ID", "Recipient Name", "Award Amount", "Description"],
        "limit": 10,
        "page": 1
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        return response.json().get("results", [])
    return []`
  },
  {
    name: "Job Postings Scraper (Free Python Alternative)",
    description: "Since premium LinkedIn/Indeed API keys are expensive, use standard search results scraping via free lightweight libraries or BeautifulSoup.",
    docsLink: "https://github.com/BullsEye-Web-Services-Ltd/jobsprocessor",
    pythonCode: `import requests
from bs4 import BeautifulSoup

def scrape_indeed_jobs(title="Formulation Scientist", location="San Francisco"):
    # Target search query for indeed or other job boards
    query_url = f"https://www.indeed.com/jobs?q={title.replace(' ', '+')}&l={location.replace(' ', '+')}"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    r = requests.get(query_url, headers=headers)
    soup = BeautifulSoup(r.text, 'html.parser')
    
    # Extract titles and companies
    job_cards = soup.find_all('div', class_='job_seen_beacon')
    results = []
    for card in job_cards:
        title_element = card.find('h2', class_='jobTitle')
        company_element = card.find('span', class_='companyName')
        results.append({
            "title": title_element.text if title_element else "N/A",
            "company": company_element.text if company_element else "N/A"
        })
    return results`
  }
];
