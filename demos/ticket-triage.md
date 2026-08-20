# 🧪 Use Case 2: IT Ticket Triage & Change Drafting
### From Vague Helpdesk Email to Staged PowerShell Remediation Package

<div style="margin: 1.5rem 0; padding: 1.25rem; background: linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(15, 23, 42, 0.95)); border: 1.5px solid #f59e0b; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
  <div>
    <h3 style="margin: 0; color: #f59e0b; font-size: 1.15rem; font-weight: 800;">🖼️ Standalone Visual Card</h3>
    <p style="margin: 0.25rem 0 0 0; color: #cbd5e1; font-size: 0.88rem;">Open the full-screen visual card presentation format in a new browser tab.</p>
  </div>
  <a href="/assets/demo_cards/card_use_case_2_triage.html" target="_blank" rel="noopener noreferrer" style="background: #f59e0b; color: #0f172a; font-weight: 800; font-size: 0.88rem; padding: 0.55rem 1.1rem; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
    Open Visual Card ↗
  </a>
</div>

---

## 🎯 The Operational Challenge
IT helpdesk tickets are notoriously vague:
> *"VPN keeps disconnecting every 20 minutes from the Meeker substation office laptop. Please fix."*

A systems administrator typically has to:
1. Lookup user and machine subnet in Active Directory / DHCP.
2. Cross-reference firewall VPN timeout policies.
3. Draft and verify a PowerShell or CLI remediation command.
4. Document the change ticket.

What normally takes 20–30 minutes of manual triage can be staged by a bounded agent in 15 seconds.

---

## ⚡ The 3-Step Bounded Execution Loop

```text
┌─────────────────────────┐      ┌─────────────────────────┐      ┌─────────────────────────┐
│    1. INGEST TICKET     │      │  2. AGENT LINT & STAGE  │      │  3. HUMAN APPROVAL GATE │
│  Raw user helpdesk      │ ──►  │  Agent isolates IP,     │ ──►  │  [AWAITING APPROVAL]    │
│  email with vague issue │      │  checks firewall SOP,   │      │  Admin clicks to execute│
│  description            │      │  and lints script diff  │      │  staged change package  │
└─────────────────────────┘      └─────────────────────────┘      └─────────────────────────┘
```

### Step 1: Ticket Ingestion
The incoming email or ticket is parsed. Key entity extraction identifies the affected user, device hostname, and substation site.

### Step 2: Agent Cross-Reference & Sandboxed Linting
1. **Network SOP Lookup:** The agent queries internal network runbooks to verify the VPN IP pool and timeout policy (`KeepAlive 3600`).
2. **Syntax Sandboxing:** The agent generates the exact PowerShell remediation command and tests it inside a read-only verification sandbox to ensure zero syntax errors.
3. **Change Documentation:** A standardized change record is automatically formatted.

### Step 3: The Mandatory Human Approval Gate
* **Zero Autonomous Execution:** The agent is strictly prohibited from running write/mutation commands automatically.
* **1-Click Review:** The staged command is presented to the sysadmin with a high-visibility badge: **`[AWAITING HUMAN APPROVAL]`**.
* **Sign-Off:** The administrator inspects the diff and clicks `Execute` or rejects the change.

---

## 💡 Key Architectural Takeaway
> **The agent prepares 100% of the research, script drafting, and change documentation — but the human administrator remains the sole execution authority.**
