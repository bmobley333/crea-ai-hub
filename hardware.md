# 💻 On-Premises Hardware Bill of Materials (BoM)

Running state-of-the-art open-weight AI models locally is no longer an exotic datacenter luxury. This page details the **Hardware Bill of Materials (BoM)**, memory requirements, and cost benchmarks for rural electric utility IT budgets.

---

## 📋 Hardware Tier Matrix

| Hardware Tier | Platform & Specs | Model Sizing Capability | Estimated Cost | Best Utility IT Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Entry Local Host** | Apple Mac Studio (M-Series, 64–128GB Unified Memory) | 32B–70B Quantized (Llama 3.3, Qwen 2.5) | **$2,500 – $4,500** | Private document search, sensitive script drafting, zero cloud leak. |
| **Dedicated Local Node** | NVIDIA DGX Spark / Compact Workstation (128GB Memory) | 70B Quantized Swarms | **~$4,700** | Departmental inference server, continuous log RAG, internal API. |
| **High-Throughput Node** | Dual RTX 4090 / RTX 6000 Ada (48GB–96GB VRAM) | 70B+ FP16 High Concurrency | **$8,000 – $18,000** | High-volume document OCR pipelines, multi-agent swarms. |

---

## ⚡ Deployment Model Comparison

| Feature / Dimension | Frontier Cloud (Claude / GPT / Gemini) | On-Premises Local (Ollama / vLLM) | Hybrid Orchestration (Recommended) |
| :--- | :--- | :--- | :--- |
| **DATA LOCALITY** | Cloud API (Zero-retention agreements) | 100% On-Prem / Air-Gapped | Sensitive local; General cloud |
| **REASONING TIER** | S-Tier (Massive complex logic) | A-Tier (32B/70B high competence) | Best model selected per task sensitivity |
| **COST PROFILE** | $50 – $200 / month API tokens | Upfront hardware investment | Controlled monthly OPEX + Local CAPEX |
| **BEST CO-OP FIT** | Complex systems architecture & coding | Member PII, payroll, network maps | **The Utility IT Standard** |

---

## 📊 Open-Weight Model Landscape for Utility IT

| Model Family | Quantized Size | VRAM Footprint | Generation Speed | Primary IT Strengths |
| :--- | :--- | :--- | :--- | :--- |
| **Llama 3.3** | 70B (4-bit) | ~40 GB | 25–35 tok/sec | Broad enterprise reasoning, general IT documentation. |
| **Qwen 2.5** | 32B / 72B | 20 GB / 44 GB | 30–50 tok/sec | Superb coding, JSON schema adherence, tabular data analysis. |
| **DeepSeek Coder V2** | 16B / 236B MoE | 16 GB / 64 GB | 35–60 tok/sec | Fast syntax fixing, PowerShell/Python script generation. |
| **Mistral Small 3** | 24B (4-bit) | ~14 GB | 45–70 tok/sec | Ultra-fast latency, compact memory, edge utility nodes. |

---

## 💰 Token Economics & 5-Year TCO Profile

| Architecture | Monthly Workload | Monthly OPEX | 5-Year Total Cost of Ownership |
| :--- | :--- | :--- | :--- |
| **Pure Cloud APIs** | 500 tickets + 1,000 SOP queries | $35 – $95 / mo | $2,100 – $5,700 (Variable OPEX) |
| **Entry Local Host** | Unlimited local queries (Mac Studio) | ~$15 / mo (Power) | $3,500 CAPEX + $900 Power = **$4,400** |
| **Dedicated DGX Host** | Multi-department agent swarms | ~$45 / mo (Power) | $4,700 CAPEX + $2,700 Power = **$7,400** |
| **Hybrid Enterprise** | Local PII triage + Cloud architecture | ~$60 / mo (Tokens + Pwr) | **Optimal balance of privacy & burst reasoning** |

> [!TIP]
> **Key Rule of Thumb:** Utility AI operating costs are negligible compared to standard commercial enterprise software licensing. A single $3,500 workstation in your server closet can power local inference for your entire IT team for years.
