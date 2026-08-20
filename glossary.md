# 📖 Utility IT & AI Glossary

A plain-English dictionary of artificial intelligence and cybersecurity terms tailored specifically for rural electric cooperative IT directors and systems administrators.

---

### Air-Gap
A network security measure that ensures a secure computer network is physically isolated from unsecured networks, such as the public internet or an unsecured enterprise LAN. In electric utilities, Operational Technology (SCADA) is strictly air-gapped from Enterprise IT.

### Bounded Agent Loop
An automated AI execution workflow that allows an AI model to use tools, write scripts, and query databases in a sandbox, but strictly halts at a **Human Approval Gate** before applying any changes to production systems.

### Context Window
The total volume of text (tokens) a language model can process in a single interaction. Modern frontier models feature context windows from 128,000 to 2,000,000 tokens, allowing an entire repository or 500-page manual to be ingested simultaneously.

### Electronic Security Perimeter (ESP)
In NERC CIP standards, the logical border surrounding all Critical Cyber Assets (CCAs). Keeping enterprise AI inference servers outside the ESP prevents triggering additional compliance audit scopes.

### Grounding
The technique of restricting an AI model's answers exclusively to verified, provided source documents (such as utility SOPs, wiring diagrams, and vendor specs) to eliminate hallucinations.

### Human-in-the-Loop (HITL)
A system design pattern where automated processes require explicit human review and authorization at critical decision gates before executing real-world actions.

### Mixture of Experts (MoE)
A neural network architecture (e.g. DeepSeek Coder V2, Mixtral) that routes different types of queries to specialized sub-networks, achieving high reasoning capability with lower active compute and memory requirements.

### NERC CIP
North American Electric Reliability Corporation Critical Infrastructure Protection standards. A set of regulatory requirements designed to secure the assets that support the bulk electric power system in North America.

### Open-Weight Model
An AI model whose underlying weights and architecture are freely downloadable and executable on local hardware (e.g. Llama 3.3, Qwen 2.5, Mistral), ensuring 100% data locality with zero external API dependencies.

### Quantization
A compression technique that reduces the numerical precision of model weights (e.g. from 16-bit float to 4-bit integer), allowing 70-billion-parameter models to run efficiently on standard workstation memory (VRAM) with virtually zero loss in reasoning quality.

### RAG (Retrieval-Augmented Generation)
An architecture that dynamically retrieves relevant snippets from private document stores (vector databases, Second Brain vaults, PDFs) and feeds them into the model's prompt to generate cited, source-grounded answers.

### Source of Truth (SoT)
A single, authoritative document or repository (typically written in clean Markdown) that defines the exact specifications, boundaries, and expected behavior of a system or process.

### Unified Memory Architecture (UMA)
A hardware architecture (notably Apple Silicon M-Series) where the CPU and GPU share a single, ultra-high-bandwidth memory pool (up to 128GB–192GB), enabling large open-weight models to run without dedicated enterprise GPU server racks.
