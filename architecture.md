# 🛡️ Security & Guardrail Bounded Architecture

Critical infrastructure reliability requires non-negotiable security boundaries. This page details the **OT/IT Air-Gap Topology**, the **5-Step Guardrail Bounded Agent Loop**, and the **6-Point AI Security Contract**.

---

## 🛑 The Sacred Boundary: OT vs. IT

```text
┌─────────────────────────────────┐   ║   ┌─────────────────────────────────┐
│   OPERATIONAL TECHNOLOGY (OT)   │   ║   │     ENTERPRISE IT WORKSPACE     │
├─────────────────────────────────┤   ║   ├─────────────────────────────────┤
│ • SCADA Telemetry & Controls    │   ║   │ • CIS & Member Billing (SmartHub│
│ • Substation Reclosers & RTUs   │   ║   │ • IT Ticketing & Change Control │
│ • Physical Generation & Grid    │   ║   │ • SOPs, Runbooks & Vendor PDFs  │
├─────────────────────────────────┤   ║   ├─────────────────────────────────┤
│ 🛑 STRICT AIR-GAP: NO AI ACCESS │   ║   │ ⚡ AI OPERATIONAL LEVERAGE ZONE  │
└─────────────────────────────────┘   ║   └─────────────────────────────────┘
```

### Core Security Principles:
1. **Zero OT Read/Write:** AI models have no direct access, APIs, or credentials to SCADA loops, substation automation, or physical breaker controls.
2. **Audit Scope Containment (NERC CIP):** Keeping AI workloads strictly on Enterprise IT subnets prevents expanding the Electronic Security Perimeter (ESP) or triggering unnecessary CIP audit scope.
3. **Unidirectional Data Relays:** Operational data (e.g. outage dispatch logs) is relayed into IT via unidirectional data paths or sanitized read-only copies.

---

## ⚙️ The Guardrail Bounded Agent Operating Loop

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
                                  ║   HUMAN APPROVAL GATE   ║ ◄── Required Before Apply
                                  ╚════════════╦════════════╝
                                               ▼
                                 [Production Result + Git Recovery]
```

### The 5 Execution Stages:
1. **Human Intent & Constraints:** Sysadmin defines the goal and explicit system boundaries.
2. **Orchestrator:** Plans steps, queries ground-truth documentation, and drafts the Source of Truth (SoT).
3. **Verification Sandbox:** Executes syntax checks, lints scripts, and verifies diffs in isolation.
4. **Human Approval Gate 🔥 `[REQUIRED]`:** Execution halts. The sysadmin reviews the change package and signs off with a single click.
5. **Executed Result & Audit Ledger:** Production change is applied, recorded in an immutable ledger, and backed by instantaneous Git rollback.

---

## 🛡️ The AI Security Contract (6 Governance Guardrails)

| Guardrail | Implementation Standard | Utility Security Benefit |
| :--- | :--- | :--- |
| **1. Data Classification** | Tag and filter data prior to ingestion (Public vs. Restricted). | Prevents customer PII, payroll, or passwords from entering cloud APIs. |
| **2. Least Privilege Tooling** | Default read-only tool access; write actions strictly scoped. | Eliminates rogue system mutations or unauthorized database overwrites. |
| **3. Verification Sandboxing** | All scripts linted & syntax-checked before presentation. | Catches code hallucinations or syntax errors prior to human review. |
| **4. Human Approval Gates** | High-risk mutations require explicit admin sign-off. | Ensures the human sysadmin remains in complete command. |
| **5. Immutable Audit Logs** | Every prompt, tool call, and diff recorded in local ledger. | Provides 100% compliance audit trail for management & regulators. |
| **6. One-Click Rollback** | Version control (Git) backing every file modification. | Guarantees instant recovery to the last known good state. |
