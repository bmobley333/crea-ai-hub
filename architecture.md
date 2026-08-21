# 🛡️ Security, Governance & Sovereign OT/IT Architecture

Critical infrastructure reliability requires non-negotiable security boundaries. This page details the **OT/IT Dual-Zone Topology**, the **4 Sovereign Invariants for Guardrailed OT AI**, the **5-Step Bounded Agent Loop**, the **7-Point Co-op AI Security Contract**, and **NERC CIP / ESP Regulatory Compliance Alignment**.

---

## 🛑 The Sacred Boundary: OT vs. IT Dual-Zone Topology

Electric cooperatives maintain two distinct operational environments with fundamentally different reliability mandates, cyber perimeters, and risk profiles: **Operational Technology (OT)** (substations, SCADA, grid protection) and **Enterprise Information Technology (IT)** (member billing, customer service, office systems).

```text
┌──────────────────────────────────────────────────────────┐   ║   ┌──────────────────────────────────────────────────────────┐
│           OPERATIONAL TECHNOLOGY (OT) DOMAIN             │   ║   │              ENTERPRISE IT WORKSPACE ZONE                │
├──────────────────────────────────────────────────────────┤   ║   ├──────────────────────────────────────────────────────────┤
│ • SCADA Telemetry & Active Control Loops                 │   ║   │ • CIS Billing & Member Web Portals (SmartHub)            │
│ • Substation Relays (SEL-751), RTUs & Reclosers          │   ║   │ • IT Ticketing, Helpdesk & Change Management             │
│ • Physical Transformers, Breakers & Grid Assets          │   ║   │ • General SOPs, Policy PDFs & Office Automation          │
├──────────────────────────────────────────────────────────┤   ║   ├──────────────────────────────────────────────────────────┤
│ 🛡️ SOVEREIGN AIR-GAPPED AI NODE ($3,500–$7,000)          │   ║   │ ⚡ ENTERPRISE AI LEVERAGE ZONE                           │
│ • 100% Offline Open-Weight LLM (Llama 3.3 / Qwen 2.5)   │   ║   │ • Cloud Frontier APIs / On-Prem IT Inference Node        │
│ • Read-Only Data Diode Mirror (Unidirectional Outbound)  │   ║   │ • Ingests Sanitized Read-Only Operational Telemetry      │
│ • Local SQLite & Vector Store (Zero Internet Egress)     │   ║   │ • Autonomous Ticket Triage & Documentation Engines       │
│ • Lineman Rugged Field Laptops (Transient Cyber Assets) │   ║   │ • Grounded RAG over Co-op Knowledge Vaults               │
├──────────────────────────────────────────────────────────┤   ║   ├──────────────────────────────────────────────────────────┤
│ 🛑 ZERO ACTIVE ACTUATION • NO WRITE TO SCADA LOOPS       │   ║   │ 🛡️ MANDATORY HUMAN APPROVAL GATES [AWAITING APPROVAL]    │
└──────────────────────────────────────────────────────────┘   ║   └──────────────────────────────────────────────────────────┘
                                                               ║
                                 ═══════════════════════════════════════════════════════
                                 🔒 HARDWARE-ENFORCED UNIDIRECTIONAL SECURITY GATEWAY
                                                   (DATA DIODE)
                                 OT SCADA Telemetry ────────────────────────► Enterprise IT
                                 (Physical Optical Egress Only • Zero Ingress Path into OT)
                                 ═══════════════════════════════════════════════════════
```

### 🔒 The Dual-Hardware Mandate (Zero Multi-Homing)
Under NERC CIP and basic utility cyber defense, a single computer, server, or virtual machine is **strictly prohibited from multi-homing across both IT and OT networks**. A server with dual network cards bridging both subnets creates an unacceptable lateral pivot path.

To deploy AI capabilities across both environments, cooperatives deploy **separate, dedicated physical hardware nodes ($3,500–$7,000 each)**:
* **Node 1 (Enterprise IT):** Dedicated to billing triage, office documentation, IT ticketing, and general employee copilots (Cloud or Local).
* **Node 2 (Substation / OT):** A physically isolated, air-gapped workstation installed inside the OT substation perimeter running 100% offline open-weight models.

---

## ⚡ Guardrailed AI on the OT Side: The 4 Sovereign Invariants

AI can provide immense operational leverage to substation technicians, protection engineers, and grid operators—provided it is governed by **4 strict architectural invariants**:

### 1. 100% Sovereign Open-Weight Inference (Zero Cloud Egress)
* OT AI workloads run exclusively on **quantized open-weight models** (e.g. Llama 3.3 70B, Qwen 2.5 72B, DeepSeek-R1) hosted on local on-premises hardware via offline runners (Ollama, vLLM).
* The hardware has **zero internet connectivity, zero default gateway to public IPs, zero cloud API subscriptions, and zero vendor telemetry**, eliminating cloud exfiltration risk and third-party SaaS downtime.

### 2. Hardware-Enforced Unidirectional Ingestion (Data Diodes)
* When live SCADA telemetry, transformer thermal logs, or breaker trip records are fed to AI analytical engines, data passes across a **physical, hardware-enforced Data Diode** (unidirectional optical security gateway).
* Light pulses transmit telemetry *out* of the OT network into an analytical database replica; no physical return path exists for packets, commands, or exploit payloads to travel *in* to the SCADA network.

### 3. Local-First Grounded Retrieval (Offline RAG & SQLite)
* Decades of legacy utility knowledge—SEL relay setting manuals, substation wiring schematics, transformer oil test histories, and storm emergency operating procedures—are embedded into a **local vector store and embedded SQLite database**.
* Substation technicians and linemen carry **offline rugged laptops and tablets (Transient Cyber Assets)** that execute cited, hallucination-free document lookups during mountain storm outages without requiring cellular or internet connections.

### 4. The Zero-Actuation Invariant (Decision Support Only)
* AI systems on the OT side are classified strictly as **Decision Support Systems (DSS)**.
* **The Anti-Mutation Rule:** AI has **zero credentials, zero API access, and zero physical path** to actuate breaker trip coils, alter voltage regulator tap settings, or inject DNP3/Modbus commands into the closed control loop.
* The AI drafts, checks, and highlights anomalies; **human licensed protection engineers and operators remain the sole execution authority**.

---

## ⚙️ The Guardrail Bounded Agent Operating Loop

Whether operating in Enterprise IT or an isolated OT engineering subnet, all agentic task execution is governed by the **5-Step Guardrail Bounded Loop**:

```text
[Human Intent & Constraints] ──► [AI Orchestrator (Plans & Builds SoT)]
                                               │
               ┌───────────────────────────────┴───────────────────────────────┐
               ▼                               ▼                               ▼
       [Internal SoT / RAG]             [Tools & Linters]              [Local/Cloud LLM]
               │                               │                               │
               └───────────────────────────────┬───────────────────────────────┘
                                               ▼
                                    [Verification Sandbox]
                                   (Runs Diffs & Unit Tests)
                                               ▼
                                  ╔═════════════════════════╗
                                  ║   HUMAN APPROVAL GATE   ║ ◄── Mandatory Sign-Off
                                  ║   [AWAITING APPROVAL]   ║     (Zero Autonomous Writes)
                                  ╚════════════╦════════════╝
                                               ▼
                                 [Executed Result & Git Rollback]
```

### The 5 Execution Stages:
1. **Human Intent & Constraints:** The human administrator specifies the exact goal, target subnet, and operational constraints in natural language.
2. **AI Orchestrator:** The agent parses the request, queries grounded documentation (SoT/RAG), and plans the multi-step execution path.
3. **Verification Sandbox:** The agent generates the required script (PowerShell, Python, SQL) and executes syntax checks and static linting inside an isolated sandbox.
4. **Human Approval Gate 🔥 `[REQUIRED]`:** Execution halts automatically. The sysadmin or engineer inspects the exact code diff and signs off with an explicit approval click.
5. **Executed Result & Audit Ledger:** The approved change executes, is written to an immutable local audit log, and is backed by instant version-control rollback (Git).

---

## 🛡️ The Co-op AI Security Contract (7 Governance Guardrails)

| Guardrail | Implementation Standard | Utility Security & Compliance Benefit |
| :--- | :--- | :--- |
| **1. Data Locality & Air-Gap Enforcement** | 100% open-weight local inference for sensitive subnets; zero internet egress. | Prevents member PII, employee records, and grid topologies from leaving premises. |
| **2. Dual-Hardware Mandate** | Separate physical workstations for IT vs. OT; zero multi-homed bridge servers. | Preserves physical air-gap integrity and prevents lateral network compromise. |
| **3. Unidirectional Data Diode Ingestion** | Hardware optical diodes relay SCADA telemetry to read-only analytical mirrors. | Enables deep AI log analysis without creating inbound attack surfaces into SCADA. |
| **4. Zero SCADA Control Loop Actuation** | AI is strictly Decision Support (DSS); zero write credentials to breaker circuits. | Eliminates rogue actuation, prompt injection risks, and unauthorized grid mutations. |
| **5. Sandboxed Verification & Linting** | All scripts validated in isolated sandbox containers prior to human review. | Traps code hallucinations, syntax errors, and invalid parameters before staging. |
| **6. Mandatory Human Approval Gates** | All high-impact actions pause at `[AWAITING APPROVAL]` for human sign-off. | Guarantees that certified utility personnel retain 100% operational authority. |
| **7. Immutable Audit Logs & 1-Click Rollback** | Every prompt, response, tool call, and file diff tracked in Git / local ledgers. | Delivers full compliance audit trails and instant recovery to the last known good state. |

---

## 🏛️ NERC CIP & Regulatory Scope Containment

### 1. Electronic Security Perimeter (ESP) Isolation (CIP-005-7)
Under NERC CIP-005, any device communicating across a routable network with High or Medium Impact BES Cyber Systems must reside within the **Electronic Security Perimeter (ESP)**. 
* By deploying AI analytical workloads on **standalone, non-routable physical nodes** or on the receiving side of a **hardware Data Diode**, electric cooperatives ensure that AI servers **do not expand the ESP or trigger additional NERC CIP compliance burdens**.

### 2. Transient Cyber Asset (TCA) Compliance (CIP-010-4)
Rugged field laptops used by linemen and substation technicians for offline documentation search qualify as **Transient Cyber Assets (TCAs)**. When equipped with local vector embeddings and offline SQLite databases:
* They require no wireless/cellular connection during field operations.
* They adhere to CIP-010-4 patch and vulnerability baseline verification prior to substation entry.

### 3. NERC CIP Low Impact Realities (CIP-003-8)
The majority of distribution cooperatives operate under **NERC CIP Low Impact** categorization (CIP-003-8 Attachment 1). The sovereign, local-first architecture satisfies Low Impact electronic access control, physical security, and cyber awareness requirements without introducing cloud vendor dependencies.

---

> [!TIP]
> **Executive Rule of Thumb:** Protect the grid by keeping the control loop 100% human-actuated, protect data privacy by running open-weight models on dedicated local hardware, and empower field teams by giving them instant, offline search over decades of utility wisdom.
