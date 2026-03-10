import { useState } from "react";

const G = {
  bg: "#06060F",
  bg2: "#0A0A18",
  panel: "#0E0E1E",
  panelHi: "#131328",
  border: "#1A1A30",
  borderHi: "#252545",
  gold: "#F5B700",
  goldDim: "#6A4F00",
  goldGlow: "#F5B70025",
  cyan: "#00D9F5",
  cyanDim: "#00404D",
  green: "#00E676",
  greenDim: "#004D1F",
  red: "#FF3B3B",
  redDim: "#5C0000",
  purple: "#B87BFF",
  orange: "#FF6B35",
  blue: "#3D9EFF",
  pink: "#FF5FA0",
  text: "#EEEEFF",
  mid: "#7A7A9E",
  dim: "#2E2E52",
  white: "#FFFFFF",
};

const TABS = [
  { id: "roadmap", label: "ROADMAP", icon: "◈" },
  { id: "env", label: "ENV SETUP", icon: "⬡" },
  { id: "w1", label: "WEEK 1", icon: "①" },
  { id: "w2", label: "WEEK 2", icon: "②" },
  { id: "pitfalls", label: "PITFALLS", icon: "⚠" },
  { id: "scripts", label: "SCRIPTS", icon: "✎" },
  { id: "tech", label: "TECH REF", icon: "⌥" },
  { id: "outreach", label: "OUTREACH", icon: "◎" },
  { id: "close", label: "CLOSE", icon: "◆" },
];

// ─── ATOMS ────────────────────────────────────────────────────────────
function Tag({ children, color = G.gold }) {
  return (
    <span style={{
      fontSize: 9, fontWeight: 800, letterSpacing: 1.5, padding: "2px 8px",
      borderRadius: 2, background: color + "18", color, border: `1px solid ${color}30`,
      textTransform: "uppercase", flexShrink: 0, fontFamily: "'Courier New', monospace",
    }}>{children}</span>
  );
}

function Panel({ children, accent, style = {} }) {
  return (
    <div style={{
      background: G.panel, border: `1px solid ${accent ? accent + "28" : G.border}`,
      borderLeft: `3px solid ${accent || G.border}`, borderRadius: 6,
      padding: "18px 20px", ...style,
    }}>{children}</div>
  );
}

function SectionTitle({ children, accent = G.gold }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <div style={{ width: 2, height: 16, background: accent, borderRadius: 1, boxShadow: `0 0 6px ${accent}` }} />
      <span style={{ fontSize: 9, fontWeight: 900, color: accent, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>{children}</span>
    </div>
  );
}

function Expand({ title, children, accent = G.gold, badge, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: `1px solid ${open ? accent + "35" : G.border}`, borderRadius: 6, overflow: "hidden", marginBottom: 8 }}>
      <div onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 16px", cursor: "pointer", background: open ? G.panelHi : G.panel,
        transition: "background 0.1s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: G.text }}>{title}</span>
          {badge && <Tag color={accent}>{badge}</Tag>}
        </div>
        <span style={{ color: G.mid, fontSize: 10, transform: open ? "rotate(180deg)" : "none", transition: "0.15s" }}>▾</span>
      </div>
      {open && <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${accent}18` }}><div style={{ marginTop: 14 }}>{children}</div></div>}
    </div>
  );
}

function CodeBlock({ code, label, lang = "bash" }) {
  const [copied, setCopied] = useState(false);
  const colors = { bash: G.green, json: G.cyan, yaml: G.purple, js: G.gold, python: G.orange };
  const c = colors[lang] || G.green;
  return (
    <div style={{ marginTop: 10 }}>
      {label && <div style={{ fontSize: 9, fontWeight: 700, color: c, letterSpacing: 2, marginBottom: 6, fontFamily: "'Courier New', monospace" }}>{label}</div>}
      <div style={{ position: "relative", background: "#030308", border: `1px solid ${G.borderHi}`, borderRadius: 5, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${c}60, transparent)` }} />
        <button onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          style={{ position: "absolute", top: 10, right: 10, background: copied ? G.green + "20" : G.borderHi, border: `1px solid ${copied ? G.green : G.dim}`, color: copied ? G.green : G.mid, fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 3, cursor: "pointer", fontFamily: "monospace" }}>
          {copied ? "✓ COPIED" : "COPY"}
        </button>
        <pre style={{ margin: 0, padding: "16px 16px 14px", fontSize: 11, color: "#C8D4E8", overflowX: "auto", lineHeight: 1.75, fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace" }}>{code}</pre>
      </div>
    </div>
  );
}

function Pitfall({ problem, cause, fix, severity = "warn" }) {
  const colors = { warn: G.orange, error: G.red, info: G.cyan };
  const icons = { warn: "⚠", error: "✗", info: "ℹ" };
  const c = colors[severity];
  return (
    <div style={{ border: `1px solid ${c}30`, borderLeft: `3px solid ${c}`, borderRadius: 5, padding: "12px 14px", marginBottom: 10, background: c + "08" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
        <span style={{ color: c, fontWeight: 900, fontSize: 12, flexShrink: 0 }}>{icons[severity]}</span>
        <div style={{ fontSize: 12, fontWeight: 700, color: G.text }}>{problem}</div>
      </div>
      <div style={{ fontSize: 11, color: G.mid, marginBottom: 6, paddingLeft: 20 }}><span style={{ color: c + "CC", fontWeight: 700 }}>Root Cause: </span>{cause}</div>
      <div style={{ fontSize: 11, color: G.text, paddingLeft: 20, lineHeight: 1.7 }}><span style={{ color: G.green, fontWeight: 700 }}>Fix: </span>{fix}</div>
    </div>
  );
}

function StepRow({ num, title, detail, time, cmd, deliverable, accent = G.cyan }) {
  return (
    <div style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: `1px solid ${G.border}` }}>
      <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${accent}50`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
        <span style={{ fontSize: 9, fontWeight: 900, color: accent }}>{num}</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: G.text, marginBottom: 3 }}>{title}</div>
        {detail && <div style={{ fontSize: 11, color: G.mid, lineHeight: 1.65, marginBottom: 4 }}>{detail}</div>}
        {cmd && <div style={{ fontSize: 10, fontFamily: "'Courier New',monospace", color: accent, background: G.bg, border: `1px solid ${G.border}`, borderRadius: 4, padding: "4px 8px", marginTop: 5, display: "inline-block" }}>{cmd}</div>}
        {time && <div style={{ fontSize: 10, color: G.dim, marginTop: 5 }}>⏱ {time}</div>}
        {deliverable && <div style={{ fontSize: 10, marginTop: 6, padding: "4px 10px", background: accent + "0A", border: `1px solid ${accent}20`, borderRadius: 3, color: accent }}>✓ {deliverable}</div>}
      </div>
    </div>
  );
}

function DayBlock({ label, accent = G.cyan, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 9, fontWeight: 900, color: accent, letterSpacing: 3, padding: "6px 12px", background: accent + "10", border: `1px solid ${accent}20`, borderRadius: "4px 4px 0 0", display: "inline-block" }}>{label}</div>
      <div style={{ background: G.panelHi, border: `1px solid ${G.border}`, borderTop: `1px solid ${accent}20`, borderRadius: "0 4px 4px 4px", padding: "4px 0 4px 0" }}>
        {children}
      </div>
    </div>
  );
}

function VerifyBox({ items, accent = G.green }) {
  return (
    <div style={{ padding: "12px 16px", background: accent + "08", border: `1px solid ${accent}25`, borderRadius: 5, marginTop: 14 }}>
      <div style={{ fontSize: 9, fontWeight: 900, color: accent, letterSpacing: 2, marginBottom: 10 }}>VERIFICATION CHECKPOINT</div>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 10, fontSize: 11, color: G.text, padding: "5px 0", borderBottom: i < items.length - 1 ? `1px solid ${accent}15` : "none" }}>
          <span style={{ color: accent, fontWeight: 900, flexShrink: 0 }}>□</span>{item}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════
// ROADMAP
// ═══════════════════════════════════════════════
function Roadmap() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ padding: "22px 26px", background: `linear-gradient(135deg, ${G.gold}0C, ${G.cyan}08, ${G.purple}06)`, border: `1px solid ${G.gold}30`, borderRadius: 8 }}>
        <div style={{ fontSize: 9, fontWeight: 900, color: G.gold, letterSpacing: 3, marginBottom: 10 }}>THE MISSION · POP!_OS EDITION</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: G.white, lineHeight: 1.4, marginBottom: 10 }}>
          Build an AI Cold-Calling Service for Real Estate Agents.<br />
          <span style={{ color: G.gold }}>First client in 7–8 weeks. $1,500–$3,000/mo. Recurring revenue.</span>
        </div>
        <div style={{ fontSize: 12, color: G.mid, lineHeight: 1.85 }}>
          You are not building a custom voice engine. You are using <span style={{ color: G.cyan }}>Vapi</span> as AI telephony infrastructure and <span style={{ color: G.purple }}>n8n</span> as your automation brain — then selling the <em>outcome</em> to real estate agents: qualified seller leads delivered on autopilot. This plan is built for Pop!_OS with a CLI-first approach. Every command is copy-pasteable.
        </div>
      </div>

      <Panel accent={G.gold}>
        <SectionTitle accent={G.gold}>8-Week Execution Timeline</SectionTitle>
        {[
          { week: "Week 1", title: "Environment. Vapi. First working voice agent. Real estate script v1.", milestone: "AI answers your call and holds a 2-min scripted conversation", color: G.cyan, phase: "LEARN" },
          { week: "Week 2", title: "n8n automation. Webhook pipeline. Call ends → data logs automatically.", milestone: "Call ends → CRM row created with zero manual work", color: G.purple, phase: "LEARN" },
          { week: "Week 3", title: "Real estate agent config. Twilio number. Scrape 200 free leads. Skip trace.", milestone: "200 leads with phone numbers in CRM, ready to dial", color: G.green, phase: "BUILD" },
          { week: "Week 4", title: "Full outbound pipeline. DNC scrub. Time zone gating. Voicemail drop.", milestone: "Legally compliant campaign pipeline, tested end-to-end", color: G.gold, phase: "BUILD" },
          { week: "Weeks 5–6", title: "Run first 100-call campaign on real leads. Analyze. Refine. Dashboard.", milestone: "3–10 booked appointments. Real case study numbers.", color: G.orange, phase: "LAUNCH" },
          { week: "Weeks 7–8", title: "Pitch 20 real estate agents. Use campaign proof. Close first client.", milestone: "First paying client signed: $1,500–3,000/mo", color: G.green, phase: "SELL" },
        ].map((row, i) => (
          <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "11px 0", borderBottom: i < 5 ? `1px solid ${G.border}` : "none" }}>
            <div style={{ width: 75, flexShrink: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: row.color }}>{row.week}</div>
              <Tag color={row.color}>{row.phase}</Tag>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: G.text, marginBottom: 4 }}>{row.title}</div>
              <div style={{ fontSize: 11, color: G.gold }}>✓ {row.milestone}</div>
            </div>
          </div>
        ))}
      </Panel>

      <Panel accent={G.cyan}>
        <SectionTitle accent={G.cyan}>The Tech Stack — Every Component's Job</SectionTitle>
        {[
          { tool: "Pop!_OS + CLI", job: "Your dev environment. Docker CE, Vapi CLI, n8n, ngrok, Python scraper — all CLI-managed. No GUI overhead. Faster iteration.", cost: "$0", color: G.cyan },
          { tool: "Vapi", job: "Makes the actual AI phone calls. Manages STT (Deepgram), LLM (GPT-4o-mini), TTS (ElevenLabs). You write the system prompt — Vapi handles real-time audio orchestration.", cost: "~$0.07/min", color: G.purple },
          { tool: "Twilio", job: "PSTN bridge. Provides real US phone numbers. Vapi routes outbound calls through it. One number per client keeps campaigns clean.", cost: "$1/num + $0.013/min", color: G.green },
          { tool: "n8n (Docker, local)", job: "Automation brain. Receives Vapi webhooks, parses call data, logs to CRM, fires SMS alerts, runs DNC checks, triggers bulk campaigns. Self-hosted = free.", cost: "$0 (or $20/mo VPS)", color: G.gold },
          { tool: "ngrok / cloudflared", job: "Tunnels localhost:5678 to a public HTTPS URL during development so Vapi webhooks can reach your local n8n. Critical for Week 1-2 testing.", cost: "$0 free tier", color: G.orange },
          { tool: "Python + BeautifulSoup", job: "Free lead scraper. Pulls FSBO listings from Zillow, Craigslist, Facebook Marketplace into CSV. Runs from CLI.", cost: "$0", color: G.blue },
          { tool: "BatchSkipTracing", job: "Name + address → phone number. Automated via n8n HTTP node. Required to dial scraped leads.", cost: "$0.15–0.18/record", color: G.orange },
          { tool: "DNC.com / TCPA guard", job: "Scrubs every number against National DNC Registry before dialing. Non-negotiable. $500–1,500 fine per illegal call.", cost: "$25–50/mo", color: G.red },
          { tool: "Google Sheets", job: "Free CRM for weeks 1–6. Every call result logged here via n8n. Upgrade to GoHighLevel when you have a paying client.", cost: "$0", color: G.green },
          { tool: "Calendly", job: "AI books into agent's calendar during qualified calls. Booking link fires via SMS automatically after hot lead detected.", cost: "$0 free tier", color: G.cyan },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "9px 0", borderBottom: i < 9 ? `1px solid ${G.border}` : "none" }}>
            <div style={{ minWidth: 130 }}><span style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.tool}</span></div>
            <div style={{ flex: 1, fontSize: 11, color: G.mid, lineHeight: 1.6 }}>{s.job}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: G.gold, minWidth: 85, textAlign: "right" }}>{s.cost}</div>
          </div>
        ))}
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Panel accent={G.red}>
          <SectionTitle accent={G.red}>⚠ Legal Non-Negotiables</SectionTitle>
          {[
            "TCPA compliance review by a lawyer before live campaigns ($200–500)",
            "DNC scrub EVERY lead list before calling — zero exceptions",
            "Call only 8am–9pm in the RECIPIENT'S local time zone, not yours",
            "AI must disclose it is AI at the start of every call",
            "Include 'Press 2 to be removed' + honor all opt-outs immediately",
            "Never spoof or falsify caller ID — federal violation",
            "Record retention: keep call logs + transcripts for 4 years",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: i < 6 ? `1px solid ${G.border}` : "none", fontSize: 11, color: G.mid }}>
              <span style={{ color: G.red, fontWeight: 900, flexShrink: 0 }}>!</span>{item}
            </div>
          ))}
        </Panel>
        <Panel accent={G.gold}>
          <SectionTitle accent={G.gold}>✦ What You're Actually Selling</SectionTitle>
          {[
            "RESULTS — not technology. Agents don't care how it works",
            "One real estate deal = $5K–15K commission. $3,500/mo is cheap insurance",
            "Your first 100 calls are market research, not sales",
            "Script v1 will underperform. Script v10 will convert. Iterate weekly",
            "Target: one paying client by week 8. Not ten — one",
            "Case study format: '100 calls → 3 appointments → $48 cost'",
            "Human callers charge $100–300 per qualified lead. You charge $8",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: i < 6 ? `1px solid ${G.border}` : "none", fontSize: 11, color: G.mid }}>
              <span style={{ color: G.gold, fontWeight: 900, flexShrink: 0 }}>→</span>{item}
            </div>
          ))}
        </Panel>
      </div>

      <Panel accent={G.green}>
        <SectionTitle accent={G.green}>Revenue Path — Realistic Month-by-Month</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {[
            { period: "Weeks 1–4", rev: "$0", note: "Building. Zero revenue. This is normal and expected.", color: G.mid },
            { period: "Weeks 5–6", rev: "$0–500", note: "Test run. Offer free pilot to one agent for case study.", color: G.orange },
            { period: "Week 7–8", rev: "$1,500+", note: "First paying client. Business is real. Break-even hit.", color: G.green },
            { period: "Month 3", rev: "$4,000–8K", note: "2–3 clients. Referrals. You're running an actual agency.", color: G.gold },
          ].map((s, i) => (
            <div key={i} style={{ padding: "14px 16px", background: G.panelHi, border: `1px solid ${s.color}25`, borderRadius: 6, textAlign: "center" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: G.dim, letterSpacing: 1.5, marginBottom: 6 }}>{s.period}</div>
              <div style={{ fontFamily: "'Courier New',monospace", fontSize: 22, fontWeight: 800, color: s.color, marginBottom: 6 }}>{s.rev}</div>
              <div style={{ fontSize: 10, color: G.mid, lineHeight: 1.5 }}>{s.note}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

// ═══════════════════════════════════════════════
// ENVIRONMENT SETUP (POP!_OS)
// ═══════════════════════════════════════════════
function EnvSetup() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.cyan + "0A", border: `1px solid ${G.cyan}25`, borderRadius: 6, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.cyan, fontWeight: 700 }}>Environment Goal: </span>
        Complete Pop!_OS dev environment with Docker, n8n (PostgreSQL backend), Vapi CLI, MCP integration, and ngrok tunnel. Do this ONCE before Week 1 begins. Estimated time: 2–3 hours.
      </div>

      <Expand title="Phase 1 — System Prerequisites & Docker CE Installation" accent={G.cyan} badge="DO FIRST" defaultOpen={true}>
        <div style={{ fontSize: 12, color: G.mid, marginBottom: 12, lineHeight: 1.7 }}>
          Pop!_OS ships without Docker. Install Docker CE (Community Edition) — NOT Docker Desktop. CE is the pure CLI engine and is what you want for a server-like development workflow.
        </div>
        <CodeBlock lang="bash" label="STEP 1 — SYSTEM UPDATE + DEPENDENCIES" code={`# Always start with a clean system
sudo apt update && sudo apt upgrade -y

# Install required dependencies for Docker's GPG key setup
sudo apt install -y \\
  ca-certificates curl gnupg lsb-release apt-transport-https

# Verify kernel version (Docker CE requires 4.x+, Pop!_OS 22.04 ships 5.x+)
uname -r`} />
        <CodeBlock lang="bash" label="STEP 2 — ADD DOCKER'S OFFICIAL GPG KEY & REPOSITORY" code={`# Create keyring directory
sudo install -m 0755 -d /etc/apt/keyrings

# Download and store Docker's GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \\
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add Docker repository (Pop!_OS is Ubuntu-based, use ubuntu focal/jammy)
echo \\
  "deb [arch=$(dpkg --print-architecture) \\
  signed-by=/etc/apt/keyrings/docker.gpg] \\
  https://download.docker.com/linux/ubuntu \\
  $(. /etc/os-release && echo "$UBUNTU_CODENAME") stable" | \\
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`} />
        <CodeBlock lang="bash" label="STEP 3 — INSTALL DOCKER ENGINE + COMPOSE PLUGIN" code={`# Refresh package index with new Docker repo
sudo apt update

# Install Docker CE, CLI, containerd, and Compose plugin (v2)
sudo apt install -y \\
  docker-ce docker-ce-cli containerd.io \\
  docker-buildx-plugin docker-compose-plugin

# Verify Docker engine is running
sudo systemctl status docker

# Test installation
sudo docker run hello-world`} />
        <CodeBlock lang="bash" label="STEP 4 — ADD YOUR USER TO DOCKER GROUP (AVOID SUDO)" code={`# Add current user to docker group — critical for non-root usage
sudo usermod -aG docker ${USER}

# Apply group change immediately (or log out/in)
newgrp docker

# Verify: this should run without sudo now
docker run hello-world

# Verify Compose v2 (syntax: docker compose, not docker-compose)
docker compose version`} />
        <Pitfall severity="warn" problem="'Permission denied' when running docker without sudo" cause="User was added to docker group but the session wasn't refreshed." fix="Run 'newgrp docker' or fully log out and back into your Pop!_OS session. The group change requires a new login session to take effect." />
        <Pitfall severity="warn" problem="'Cannot connect to the Docker daemon' error" cause="Docker service is not running or was not started after install." fix="Run: sudo systemctl enable docker && sudo systemctl start docker — then verify with: sudo systemctl status docker" />
        <VerifyBox accent={G.cyan} items={["docker run hello-world succeeds WITHOUT sudo", "docker compose version shows v2.x", "docker ps shows empty table (no permission errors)"]} />
      </Expand>

      <Expand title="Phase 2 — n8n with Docker Compose + PostgreSQL Backend" accent={G.purple} badge="PRODUCTION GRADE">
        <div style={{ fontSize: 12, color: G.mid, marginBottom: 12, lineHeight: 1.7 }}>
          Run n8n with PostgreSQL as the backend database. This ensures your workflows, credentials, and execution history survive container restarts and updates. Using plain SQLite (the default) loses data if the container is recreated.
        </div>
        <CodeBlock lang="bash" label="CREATE PROJECT DIRECTORY STRUCTURE" code={`# Create your project home — all your work lives here
mkdir -p ~/vapi-agency
cd ~/vapi-agency

# Create n8n subdirectory with data folders
mkdir -p n8n/{n8n_data,postgres_data,local_files}

# Create your environment variables file
touch .env

# Set correct permissions on data dirs
chmod 700 n8n/n8n_data n8n/postgres_data`} />
        <CodeBlock lang="bash" label="POPULATE .ENV FILE — RUN THIS BLOCK" code={`# Generate secure random strings for your secrets
N8N_KEY=$(openssl rand -hex 32)
PG_PASS=$(openssl rand -hex 16)

# Write to .env file
cat > ~/vapi-agency/.env << EOF
# PostgreSQL
POSTGRES_USER=n8n_user
POSTGRES_PASSWORD=${PG_PASS}
POSTGRES_DB=n8n

# n8n
N8N_ENCRYPTION_KEY=${N8N_KEY}
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=changeme123

# Your Vapi API key (fill this in after creating Vapi account)
VAPI_API_KEY=your_vapi_api_key_here

# Webhook base URL (update when using ngrok)
WEBHOOK_URL=http://localhost:5678/
EOF

echo ".env created. Review with: cat ~/vapi-agency/.env"`} />
        <CodeBlock lang="yaml" label="DOCKER-COMPOSE.YML — SAVE AS ~/vapi-agency/docker-compose.yml" code={`version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: n8n_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: \${POSTGRES_USER}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
      POSTGRES_DB: \${POSTGRES_DB}
    volumes:
      - ./n8n/postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER} -d \${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5

  n8n:
    image: n8nio/n8n:latest
    container_name: n8n_app
    restart: unless-stopped
    environment:
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=\${POSTGRES_DB}
      - DB_POSTGRESDB_USER=\${POSTGRES_USER}
      - DB_POSTGRESDB_PASSWORD=\${POSTGRES_PASSWORD}
      - N8N_ENCRYPTION_KEY=\${N8N_ENCRYPTION_KEY}
      - N8N_BASIC_AUTH_ACTIVE=\${N8N_BASIC_AUTH_ACTIVE}
      - N8N_BASIC_AUTH_USER=\${N8N_BASIC_AUTH_USER}
      - N8N_BASIC_AUTH_PASSWORD=\${N8N_BASIC_AUTH_PASSWORD}
      - WEBHOOK_URL=\${WEBHOOK_URL}
      - GENERIC_TIMEZONE=America/New_York
      - N8N_LOG_LEVEL=info
    ports:
      - "5678:5678"
    volumes:
      - ./n8n/n8n_data:/home/node/.n8n
      - ./n8n/local_files:/files
    depends_on:
      postgres:
        condition: service_healthy`} />
        <CodeBlock lang="bash" label="START N8N STACK" code={`# Navigate to project dir
cd ~/vapi-agency

# Start the stack in detached mode
docker compose up -d

# Watch startup logs (Ctrl+C to stop watching, containers keep running)
docker compose logs -f

# Verify both containers are healthy
docker compose ps

# n8n UI is now at:
# http://localhost:5678
# Login with: admin / changeme123 (set in .env)`} />
        <CodeBlock lang="bash" label="USEFUL MANAGEMENT COMMANDS" code={`# Stop n8n (data preserved in volumes)
docker compose stop

# Start again
docker compose start

# Restart after config change
docker compose restart n8n

# View n8n logs only
docker compose logs n8n -f --tail=50

# Update n8n to latest version
docker compose pull && docker compose up -d

# Full teardown (KEEPS data in volumes)
docker compose down

# Nuclear option — removes containers AND volumes (loses all workflows!)
# docker compose down -v  ← NEVER run this unless you mean it`} />
        <Pitfall severity="error" problem="n8n container exits immediately on startup" cause="PostgreSQL health check hasn't passed yet — n8n started before DB was ready." fix="Check logs: 'docker compose logs postgres'. If DB is starting fine, just wait 30s and run 'docker compose restart n8n'. The healthcheck in docker-compose.yml prevents this but timing can vary on slow disks." />
        <Pitfall severity="warn" problem="Workflows disappear after 'docker compose down'" cause="You ran 'docker compose down -v' which destroys named volumes, or the volume paths are wrong." fix="Always use 'docker compose down' (no -v flag). Verify the volumes section in docker-compose.yml uses relative paths like './n8n/n8n_data'. Check that the directory exists with correct permissions." />
        <VerifyBox accent={G.purple} items={["http://localhost:5678 loads the n8n login page", "Login succeeds with admin credentials from .env", "docker compose ps shows both containers as 'running'", "docker compose logs n8n shows no error messages"]} />
      </Expand>

      <Expand title="Phase 3 — Vapi CLI + MCP Integration" accent={G.gold} badge="CLI ADVANTAGE">
        <div style={{ fontSize: 12, color: G.mid, marginBottom: 12, lineHeight: 1.7 }}>
          The Vapi CLI lets you manage assistants, trigger test calls, tail call logs, and set up MCP (Model Context Protocol) for AI-native IDE integration — all from your terminal. This is your edge as a Pop!_OS user.
        </div>
        <CodeBlock lang="bash" label="INSTALL VAPI CLI" code={`# Install via official shell script
curl -sSL https://vapi.ai/install.sh | bash

# Reload shell to pick up PATH changes
source ~/.bashrc
# or if using zsh:
source ~/.zshrc

# Verify installation
vapi --version

# Login with your Vapi API key (get from vapi.ai → Settings → API Keys)
vapi login

# Test: list your assistants (empty at first)
vapi assistants list`} />
        <CodeBlock lang="bash" label="VAPI MCP SETUP (FOR CURSOR / VSCODE WITH COPILOT)" code={`# Set up MCP server — gives your AI IDE real Vapi API knowledge
# This eliminates hallucinated parameter names in code generation
vapi mcp setup

# Test MCP is working
vapi mcp test

# For Cursor: add to .cursor/mcp.json in your project root
# For VSCode: add to .vscode/mcp.json
cat > ~/vapi-agency/.cursor/mcp.json << 'EOF'
{
  "mcpServers": {
    "vapi": {
      "command": "vapi",
      "args": ["mcp", "serve"]
    }
  }
}
EOF`} />
        <CodeBlock lang="bash" label="QUICK REFERENCE — VAPI CLI COMMANDS YOU'LL USE DAILY" code={`# List all assistants
vapi assistants list

# Get details of a specific assistant
vapi assistants get <assistant-id>

# Trigger a test call from CLI (Week 1 Day 2)
vapi call create \\
  --assistant-id <id> \\
  --phone-number-id <phone-id> \\
  --customer-number +15551234567 \\
  --customer-name "Test Owner"

# Tail live call logs (watch what's happening in real time)
vapi calls list --limit 10

# Get full details of a specific call (including transcript)
vapi calls get <call-id>

# List phone numbers connected to Vapi
vapi phone-numbers list

# Test a webhook locally (sends sample payload to your n8n)
vapi webhooks test --event end-of-call-report --url http://localhost:5678/webhook/vapi`} />
        <Pitfall severity="warn" problem="'vapi: command not found' after install" cause="The install script adds vapi to ~/.local/bin or ~/bin, which may not be in your PATH." fix="Run: echo 'export PATH=$PATH:$HOME/.local/bin' >> ~/.bashrc && source ~/.bashrc — then try 'vapi --version' again." />
      </Expand>

      <Expand title="Phase 4 — ngrok Tunnel (Webhook Development Gateway)" accent={G.orange} badge="CRITICAL FOR WEBHOOKS">
        <div style={{ fontSize: 12, color: G.mid, marginBottom: 12, lineHeight: 1.7 }}>
          Vapi needs to send webhooks to a public HTTPS URL. During development, your n8n is at localhost:5678 — not reachable from the internet. ngrok creates a secure tunnel so Vapi can reach it. You need this from Day 1.
        </div>
        <CodeBlock lang="bash" label="INSTALL NGROK ON POP!_OS" code={`# Install via snap (easiest on Pop!_OS)
sudo snap install ngrok

# OR via apt:
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | \\
  sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && \\
  echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | \\
  sudo tee /etc/apt/sources.list.d/ngrok.list && \\
  sudo apt update && sudo apt install ngrok

# Sign up at ngrok.com (free) → get your authtoken
ngrok config add-authtoken YOUR_AUTHTOKEN_HERE

# Start tunnel to n8n (run this in a dedicated terminal or tmux pane)
ngrok http 5678

# Your public URL will look like:
# https://abc123.ngrok-free.app
# This is your VAPI SERVER URL during development`} />
        <CodeBlock lang="bash" label="PRO TIP — PERSISTENT NGROK IN TMUX" code={`# Install tmux for persistent terminal sessions
sudo apt install tmux -y

# Start a tmux session named 'tunnel'
tmux new-session -d -s tunnel

# Start ngrok in that session
tmux send-keys -t tunnel 'ngrok http 5678' Enter

# Check the URL anytime with:
curl -s http://localhost:4040/api/tunnels | python3 -m json.tool | grep public_url

# Attach to see the ngrok dashboard
tmux attach -t tunnel

# Detach without stopping: Ctrl+B then D`} />
        <div style={{ padding: "12px 14px", background: G.orange + "0A", border: `1px solid ${G.orange}25`, borderRadius: 5, marginTop: 12, fontSize: 11, color: G.mid, lineHeight: 1.7 }}>
          <span style={{ color: G.orange, fontWeight: 700 }}>Important: </span>
          The free ngrok URL changes every time you restart ngrok. You must update the Server URL in your Vapi assistant each time. For persistent URLs, upgrade ngrok free plan or use <span style={{ color: G.cyan }}>cloudflared tunnel</span> (Cloudflare Zero Trust — permanent free subdomain).
        </div>
        <Pitfall severity="warn" problem="ngrok tunnel URL changes and Vapi webhooks stop firing" cause="Free ngrok generates a new random URL on every restart." fix="Either (a) use a paid ngrok account for a static domain, or (b) use Cloudflare Tunnel: 'cloudflared tunnel create vapi-dev' for a permanent free URL, or (c) deploy n8n to a $5/mo Hetzner VPS and use that as your permanent webhook URL." />
      </Expand>

      <Expand title="Phase 5 — Python Environment for Lead Scraping" accent={G.blue} badge="WEEK 3+">
        <CodeBlock lang="bash" label="PYTHON SETUP FOR SCRAPING PIPELINE" code={`# Pop!_OS ships with Python 3. Verify version:
python3 --version

# Install pip if missing
sudo apt install python3-pip -y

# Install virtual environment tool
sudo apt install python3-venv -y

# Create isolated venv for the scraper (good practice)
cd ~/vapi-agency
python3 -m venv scraper-env
source scraper-env/bin/activate

# Install scraping dependencies
pip install requests beautifulsoup4 pandas lxml selenium webdriver-manager

# Verify
python3 -c "import requests, bs4, pandas; print('All imports OK')"

# To activate this env in future sessions:
# source ~/vapi-agency/scraper-env/bin/activate`} />
      </Expand>

      <VerifyBox accent={G.green} items={[
        "docker run hello-world succeeds without sudo",
        "http://localhost:5678 shows n8n login page",
        "vapi --version outputs a version number",
        "ngrok http 5678 produces a public HTTPS URL",
        "python3 -c 'import requests, bs4, pandas' runs without errors",
        "~/vapi-agency/.env file exists with all variables set",
      ]} />
    </div>
  );
}

// ═══════════════════════════════════════════════
// WEEK 1
// ═══════════════════════════════════════════════
function Week1() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.cyan + "0A", border: `1px solid ${G.cyan}25`, borderRadius: 6, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.cyan, fontWeight: 700 }}>Week 1 Goal: </span>
        Understand the Vapi object model. Create a working voice agent with your real estate script. Connect a phone number. By Friday: call your own phone and have the AI hold a natural 2-minute conversation — AND have n8n installed with a working first workflow.
      </div>

      <DayBlock label="DAY 1 — Vapi Account + Object Model + First Assistant" accent={G.cyan}>
        <StepRow num="1" accent={G.cyan} title="Create Vapi Account at vapi.ai" detail="Sign up free — no credit card required for trial minutes. Navigate the dashboard. Locate: Assistants, Phone Numbers, Calls, API Keys sections. Get your Private API Key from Settings → API Keys." cmd="# After getting API key, test it immediately:" deliverable="API key copied. Dashboard understood." time="20 min" />
        <StepRow num="2" accent={G.cyan} title="Set VAPI_API_KEY in your .env and test via CLI" detail="This validates your key and connects your CLI to your account." cmd={`sed -i 's/your_vapi_api_key_here/YOUR_ACTUAL_KEY/' ~/vapi-agency/.env\nvapi login  # paste key when prompted\nvapi assistants list  # should return empty array []`} deliverable="vapi CLI authenticated" time="10 min" />
        <StepRow num="3" accent={G.cyan} title="Read Vapi docs — the 4 core objects (60 min)" detail="Read these in order. Take notes on paper. This context makes everything else easier." cmd="# Open in browser:\n# https://docs.vapi.ai/quickstart/introduction\n# https://docs.vapi.ai/assistants/quickstart\n# https://docs.vapi.ai/prompting-guide\n# https://docs.vapi.ai/server-url/events" deliverable="You understand: Assistant, Phone Number, Call, Webhook objects and how they relate" time="60 min" />
        <StepRow num="4" accent={G.cyan} title="Create your first Assistant via Dashboard UI (no code)" detail="Dashboard → Assistants → New Assistant. Voice: ElevenLabs or OpenAI Nova. Model: GPT-4o-mini. System prompt: 'You are a helpful assistant. Greet the user warmly and ask how you can help them today.' Save and note the Assistant ID." deliverable="First assistant created. ID saved in a text file." time="30 min" />
      </DayBlock>

      <Panel accent={G.purple}>
        <SectionTitle accent={G.purple}>The Vapi Object Model — Mental Map</SectionTitle>
        <div style={{ fontSize: 12, color: G.mid, lineHeight: 1.85 }}>
          Everything in Vapi revolves around 4 objects. Misunderstanding these causes most beginner confusion:
        </div>
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { obj: "Assistant", desc: "The AI brain. Contains: system prompt (the script), LLM config (GPT-4o-mini), voice (ElevenLabs), hooks (silence handling), tools (functions it can call), and analysisPlan (structured data extraction from transcript).", color: G.cyan },
            { obj: "Phone Number", desc: "The phone number the AI calls from/to. Can be Vapi-managed or imported from Twilio (BYOC = Bring Your Own Carrier). Each number can have a default assistant assigned. Think of it as the 'phone line'.", color: G.gold },
            { obj: "Call", desc: "A single call instance. Has a status (ringing, active, ended), duration, transcript, recording URL, and endedReason. Every call is logged — you can query them via API.", color: G.green },
            { obj: "Webhook / Server URL", desc: "The URL Vapi sends events to. Set on the Assistant object. Events include: call.started, speech.update, transcript.update, end-of-call-report. Your n8n webhook URL goes here.", color: G.purple },
          ].map((o, i) => (
            <div key={i} style={{ padding: "11px 14px", background: G.bg, border: `1px solid ${o.color}25`, borderLeft: `3px solid ${o.color}`, borderRadius: 5 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: o.color, marginBottom: 5 }}>{o.obj}</div>
              <div style={{ fontSize: 11, color: G.mid, lineHeight: 1.6 }}>{o.desc}</div>
            </div>
          ))}
        </div>
      </Panel>

      <DayBlock label="DAY 2 — Phone Number + First Test Call" accent={G.cyan}>
        <StepRow num="1" accent={G.cyan} title="Create Twilio account + buy a trial phone number" detail="Go to twilio.com → Sign up free. You get $15 trial credit. Console → Phone Numbers → Manage → Buy a Number. Choose a local area code in your target city. The number costs $1/mo, covered by trial credit." deliverable="Twilio SID + Auth Token + a real US phone number" time="30 min" />
        <StepRow num="2" accent={G.cyan} title="Import Twilio number into Vapi" detail="Vapi Dashboard → Phone Numbers → Add → Import from Twilio. Enter: Twilio Account SID, Auth Token, Phone Number (E.164 format: +15551234567). Vapi will validate and register it." deliverable="Phone number visible in Vapi Phone Numbers list" time="20 min" />
        <StepRow num="3" accent={G.cyan} title="Make your first outbound test call via Vapi CLI" detail="This calls YOUR phone using your first assistant. Answer it. Listen. The AI should greet you with the system prompt you wrote yesterday." cmd={`vapi call create \\
  --assistant-id YOUR_ASSISTANT_ID \\
  --phone-number-id YOUR_PHONE_NUMBER_ID \\
  --customer-number YOUR_PERSONAL_PHONE \\
  --customer-name "Test Owner"`} deliverable="Your phone rings. AI greets you with the script. First call logs visible in Vapi dashboard." time="15 min" />
        <StepRow num="4" accent={G.cyan} title="Tail call logs to understand what happened" cmd={`# Get the call ID from the Vapi dashboard or last CLI output
vapi calls get CALL_ID

# Review: transcript, endedReason, duration
# Look for: did the AI understand you? Any latency issues?`} deliverable="You read your first call transcript and understand what worked and what didn't" time="10 min" />
        <Pitfall severity="error" problem="Call triggers but phone doesn't ring" cause="Phone number not properly linked to Vapi, or Twilio credentials are wrong. Also check: your personal phone isn't on DND." fix="In Vapi Dashboard → Phone Numbers → click your number → verify 'Calls' tab shows it as active. In Twilio: Console → Phone Numbers → verify the number appears. Re-import if needed." />
        <Pitfall severity="warn" problem="AI sounds robotic or has long pauses" cause="Default TTS provider (OpenAI) is decent but ElevenLabs sounds much more natural. Latency issues from provider choice." fix="In your Assistant settings, switch TTS to ElevenLabs Turbo v2.5. Add a custom voiceId. For STT, switch to Deepgram Nova-2. This alone reduces perceived latency by ~200ms." />
      </DayBlock>

      <DayBlock label="DAY 3–4 — Write Real Estate Script v1" accent={G.gold}>
        <StepRow num="1" accent={G.gold} title="Read the Scripts tab fully — understand the structure" detail="Before writing, understand why each section exists. The script isn't a rigid dialogue — it's rules for a language model. Read the full system prompt in the Scripts tab 3 times before customizing." time="45 min" deliverable="You understand the call flow: intro → qualify → objections → book → end" />
        <StepRow num="2" accent={G.gold} title="Customize the script for your target market" detail="Replace: [TARGET CITY] with a real city. [Owner First Name] with {{customer.name}} variable. Read the script aloud 20 times — if it sounds unnatural when YOU read it, the AI will too. Remove any corporate-sounding language." time="2 hrs" deliverable="Script v1 personalized, read aloud tested, at least 8 objections handled" />
        <StepRow num="3" accent={G.gold} title="Enter script as Assistant system prompt + configure hooks" detail="Dashboard → your Assistant → System Prompt field → paste full script. Also add the silence hook config (see code below) to prevent dead air. Set firstMessage to a natural greeting." time="1 hr" deliverable="Assistant updated with full real estate script" />
        <StepRow num="4" accent={G.gold} title="Add structured data extraction to your assistant" detail="This is what makes the n8n automation possible. The analysisPlan tells Vapi to extract structured fields from the transcript after each call. You'll consume these in Week 2." time="45 min" deliverable="Assistant config includes analysisPlan with interested, timeline, ownerName, callbackRequested fields" />
      </DayBlock>

      <Panel accent={G.gold}>
        <SectionTitle accent={G.gold}>Assistant Configuration — Full JSON</SectionTitle>
        <CodeBlock lang="bash" label="CREATE/UPDATE ASSISTANT VIA VAPI API (CURL)" code={`curl -X POST "https://api.vapi.ai/assistant" \\
  -H "Authorization: Bearer $VAPI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Sarah - RE Lead Qualifier",
    "model": {
      "provider": "openai",
      "model": "gpt-4o-mini",
      "temperature": 0.7,
      "systemPrompt": "PASTE YOUR FULL SCRIPT HERE"
    },
    "voice": {
      "provider": "11labs",
      "voiceId": "21m00Tcm4TlvDq8ikWAM",
      "stability": 0.5,
      "similarityBoost": 0.75,
      "style": 0.3
    },
    "transcriber": {
      "provider": "deepgram",
      "model": "nova-2",
      "language": "en-US"
    },
    "firstMessage": "Hi, is this {{customer.name}}?",
    "endCallMessage": "Thanks so much for your time! Have a wonderful day.",
    "endCallFunctionEnabled": true,
    "silenceTimeoutSeconds": 30,
    "maxDurationSeconds": 600,
    "backgroundSound": "off",
    "hooks": [
      {
        "on": "customer.speech.timeout",
        "do": [
          {
            "type": "say",
            "exact": "Hello? Are you still there?"
          }
        ],
        "filters": [
          {
            "type": "oneOf",
            "key": "call.status",
            "oneOf": ["in-progress"]
          }
        ],
        "timeoutSeconds": 10
      }
    ],
    "analysisPlan": {
      "structuredDataPrompt": "Analyze this call transcript. Extract: 1) Is the owner interested in selling? (boolean) 2) Their timeline (string: immediate/6months/1year/not_interested) 3) Owner first name (string) 4) Did they request a callback? (boolean) 5) Did they ask to be removed from calls? (boolean) 6) Any price mentioned? (string)",
      "structuredDataSchema": {
        "type": "object",
        "properties": {
          "interested": { "type": "boolean" },
          "timeline": { "type": "string", "enum": ["immediate", "6months", "1year", "not_interested", "unknown"] },
          "ownerName": { "type": "string" },
          "callbackRequested": { "type": "boolean" },
          "removeFromList": { "type": "boolean" },
          "priceRange": { "type": "string" }
        },
        "required": ["interested", "callbackRequested", "removeFromList"]
      },
      "summaryPrompt": "Summarize this call in 2-3 sentences. Was the owner interested? What was their main concern? What should the agent know before calling back?"
    },
    "serverUrl": "YOUR_NGROK_URL/webhook/vapi"
  }'`} />
        <Pitfall severity="warn" problem="AI reads phone numbers or addresses as individual digits" cause="TTS renders '(602) 555-1234' as 'six zero two five five five...' instead of area code format." fix="In your system prompt, add: 'When speaking phone numbers, addresses, or prices, format them naturally as a human would say them. Say area codes as three-digit groups, not individual digits.'" />
        <Pitfall severity="warn" problem="AI interrupts the homeowner mid-sentence" cause="interruptionThreshold is too sensitive by default." fix={"Add to your assistant JSON: \"interruptionThreshold\": 0.5 — this requires 500ms of continuous speech before the AI considers it an interruption. Prevents talking over brief pauses."} />
      </Panel>

      <DayBlock label="DAY 5–7 — n8n First Workflow + Webhook Foundation" accent={G.purple}>
        <StepRow num="1" accent={G.purple} title="Start your ngrok tunnel (keep it running all of Week 1-2)" cmd={`# Run in a tmux pane or separate terminal
tmux new-session -d -s tunnel 'ngrok http 5678'

# Get your public URL
curl -s http://localhost:4040/api/tunnels | \\
  python3 -c "import sys,json; d=json.load(sys.stdin); print(d['tunnels'][0]['public_url'])"`} deliverable="Public HTTPS URL available. Update Vapi assistant serverUrl with this URL." time="10 min" />
        <StepRow num="2" accent={G.purple} title="Update Vapi assistant server URL with ngrok URL" detail="In Vapi Dashboard → your assistant → Server URL field → paste: https://your-ngrok-url.ngrok-free.app/webhook/vapi. This is where Vapi will send call events." deliverable="Vapi assistant pointing to your local n8n via ngrok" time="5 min" />
        <StepRow num="3" accent={G.purple} title="Create your first n8n workflow: Webhook → Google Sheets" detail="In n8n UI: New Workflow → Add node: Webhook (POST). Path: /vapi-test. Add node: Google Sheets (Append Row). Connect them. Add test columns: timestamp, message. Activate the workflow." deliverable="POST request to your webhook URL creates a row in Google Sheets" time="2 hrs" />
        <StepRow num="4" accent={G.purple} title="Send a test webhook from CLI to verify the pipeline" cmd={`# Send a test POST to your n8n webhook
curl -X POST "https://YOUR_NGROK_URL/webhook/vapi-test" \\
  -H "Content-Type: application/json" \\
  -d '{"test": "hello from vapi", "timestamp": "'$(date -Iseconds)'"}'

# Then check your Google Sheet — a new row should appear`} deliverable="CLI curl → n8n webhook → Google Sheet row. The data pipeline works." time="30 min" />
        <StepRow num="5" accent={G.purple} title="Read Vapi webhook event docs — understand what you'll receive" detail="Go to: https://docs.vapi.ai/server-url/events — read every event type, especially end-of-call-report. Print the payload structure. You will parse this in Week 2." deliverable="You understand the Vapi → n8n event flow and can sketch the payload structure from memory" time="45 min" />
      </DayBlock>

      <Panel accent={G.gold}>
        <SectionTitle accent={G.gold}>Week 1 Final Checkpoint</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            "Vapi account created + API key set in .env",
            "Twilio number imported into Vapi",
            "AI answers your personal phone using real estate script",
            "n8n running at localhost:5678 with PostgreSQL backend",
            "ngrok tunnel active with public HTTPS URL",
            "Vapi assistant Server URL set to ngrok URL",
            "Script v1 with 8+ objection handlers entered",
            "First n8n webhook workflow logs data to Google Sheets",
            "Test curl → webhook → Google Sheet verified working",
            "Understand all 4 Vapi objects (Assistant, Phone, Call, Webhook)",
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 10, fontSize: 11, color: G.text, padding: "7px 10px", background: G.panelHi, borderRadius: 4, border: `1px solid ${G.border}` }}>
              <span style={{ color: G.green, fontWeight: 900, flexShrink: 0 }}>□</span>{c}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

// ═══════════════════════════════════════════════
// WEEK 2
// ═══════════════════════════════════════════════
function Week2() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.purple + "0A", border: `1px solid ${G.purple}25`, borderRadius: 6, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.purple, fontWeight: 700 }}>Week 2 Goal: </span>
        Complete the Vapi + n8n automation architecture. A real phone call ends → Vapi fires a webhook → n8n parses the payload → Google Sheets is updated → agent gets an SMS if the lead is hot. Zero manual steps. Tested 30+ times.
      </div>

      <DayBlock label="DAY 1–3 — Course + Parallel Building" accent={G.purple}>
        <StepRow num="1" accent={G.purple} title="Watch the Vapi + n8n integration course (8–12 hrs total)" detail="Watch: https://www.youtube.com/watch?v=kpzExuG4CIs — Do NOT binge watch. 3-4 hours/day. Pause every time the instructor builds something and replicate it yourself before continuing. Active building > passive watching." time="3–4 hrs/day × 3 days" deliverable="Understand full architecture: Vapi → webhook → n8n → conditional routing → CRM output" />
        <StepRow num="2" accent={G.purple} title="Build a webhook receiver workflow that handles Vapi event types" detail="Create an n8n workflow: Webhook trigger → Switch node (on message.type) → route 'end-of-call-report' to your processing chain, discard all other events. This is the filter layer that prevents noise." deliverable="n8n workflow correctly receives and type-filters Vapi events" time="1.5 hrs" />
        <StepRow num="3" accent={G.purple} title="Trigger a real call and verify end-of-call-report arrives in n8n" cmd={`# Make a call via CLI
vapi call create \\
  --assistant-id YOUR_ASSISTANT_ID \\
  --phone-number-id YOUR_PHONE_ID \\
  --customer-number YOUR_PHONE \\
  --customer-name "Test Owner"

# Watch n8n execution log in real time
# n8n UI → your workflow → Executions tab
# Refresh after the call ends — you should see an execution`} deliverable="Call made → call ended → n8n execution appeared with real Vapi payload" time="30 min" />
      </DayBlock>

      <Panel accent={G.cyan}>
        <SectionTitle accent={G.cyan}>The Vapi End-of-Call Webhook Payload — Full Structure</SectionTitle>
        <div style={{ fontSize: 11, color: G.mid, marginBottom: 10, lineHeight: 1.6 }}>This is the JSON Vapi sends to your n8n server URL when a call ends. Study every field — your automation depends on parsing this correctly.</div>
        <CodeBlock lang="json" label="FULL END-OF-CALL-REPORT PAYLOAD (ANNOTATED)" code={`{
  "message": {
    "type": "end-of-call-report",    // Filter for this type ONLY
    "call": {
      "id": "call_abc123xyz",         // Unique call ID for lookup
      "orgId": "org_your_org_id",
      "createdAt": "2025-01-15T14:32:00.000Z",
      "startedAt": "2025-01-15T14:32:05.000Z",
      "endedAt": "2025-01-15T14:34:38.000Z",
      "status": "ended",
      "endedReason": "assistant-ended-call",  // See all reasons below
      "type": "outboundPhoneCall",
      "phoneNumber": {
        "id": "phone_id_xyz",
        "number": "+16025551234"      // The Vapi/Twilio number that called
      },
      "customer": {
        "number": "+16025559999",     // The homeowner's number
        "name": "John Smith"          // Name you passed when creating call
      },
      "assistantId": "asst_id_xyz",
      "cost": 0.084,                  // Vapi cost for this call in USD
      "costBreakdown": {
        "stt": 0.012, "llm": 0.031,
        "tts": 0.018, "vapi": 0.023
      }
    },
    "artifact": {
      "transcript": "AI: Hi, is this John? \\nJohn: Yes, who is this? \\nAI: Hi John, this is Sarah...",
      "recordingUrl": "https://storage.vapi.ai/recordings/call_abc123.mp3",
      "stereoRecordingUrl": "https://storage.vapi.ai/recordings/stereo/call_abc123.mp3",
      "messages": []                  // Full message array if needed
    },
    "analysis": {
      "summary": "John Smith owns property at 123 Main St. He said he might consider selling in 6 months if the price is right. He requested a callback from an agent. Warm lead.",
      "structuredData": {
        "interested": true,           // From your analysisPlan schema
        "timeline": "6months",
        "ownerName": "John",
        "callbackRequested": true,
        "removeFromList": false,
        "priceRange": "around 350k"
      },
      "successEvaluation": "true"     // Did AI achieve its goal?
    }
  }
}

// endedReason values to know:
// "assistant-ended-call"  → AI said goodbye and ended it (success flow)
// "customer-ended-call"   → Homeowner hung up
// "customer-did-not-answer" → No answer, goes to voicemail
// "voicemail"             → Hit voicemail
// "pipeline-error"        → Something broke — check logs
// "silence-timed-out"     → No speech detected, AI hung up
// "time-limit-reached"    → Call exceeded maxDurationSeconds`} />
        <CodeBlock lang="js" label="N8N CODE NODE — PARSE VAPI PAYLOAD (PASTE ENTIRE BLOCK)" code={`// N8n Code node (JavaScript mode)
// This node sits right after the Webhook trigger
// Input: raw Vapi webhook POST body
// Output: clean, flat object ready for Google Sheets / CRM

const body = $input.item.json.body || $input.item.json;

// Bail early if this isn't an end-of-call-report
if (body.message?.type !== 'end-of-call-report') {
  return [{ json: { skip: true, reason: 'Not an end-of-call-report event' } }];
}

const msg = body.message;
const call = msg.call;
const artifact = msg.artifact || {};
const analysis = msg.analysis || {};
const structured = analysis.structuredData || {};

// Calculate call duration in seconds
const startedAt = new Date(call.startedAt);
const endedAt = new Date(call.endedAt);
const durationSeconds = Math.round((endedAt - startedAt) / 1000);

// Determine lead tier
let leadTier = 'cold';
if (structured.interested && structured.callbackRequested) leadTier = 'hot';
else if (structured.interested) leadTier = 'warm';
else if (structured.removeFromList) leadTier = 'dnc';

return [{
  json: {
    // Call metadata
    callId: call.id,
    callTimestamp: call.endedAt,
    callDate: new Date(call.endedAt).toLocaleDateString('en-US'),
    callTime: new Date(call.endedAt).toLocaleTimeString('en-US'),
    durationSeconds,
    endedReason: call.endedReason,
    callCost: call.cost?.toFixed(4) || '0.0000',

    // Contact info
    customerPhone: call.customer?.number || 'unknown',
    customerName: call.customer?.name || 'unknown',

    // Analysis
    interested: structured.interested === true ? 'YES' : 'NO',
    timeline: structured.timeline || 'unknown',
    ownerName: structured.ownerName || call.customer?.name || 'unknown',
    callbackRequested: structured.callbackRequested === true ? 'YES' : 'NO',
    removeFromList: structured.removeFromList === true ? 'YES' : 'NO',
    priceRange: structured.priceRange || 'not_mentioned',

    // Summary
    aiSummary: analysis.summary || 'No summary generated',
    transcript: artifact.transcript || 'No transcript',
    recordingUrl: artifact.recordingUrl || '',

    // Lead tier for routing
    leadTier,  // hot | warm | cold | dnc

    // Raw flag for IF nodes
    isHotLead: (structured.interested === true && structured.callbackRequested === true),
    isDNC: structured.removeFromList === true,
    wasAnswered: durationSeconds > 12,
    callStatus: call.endedReason
  }
}];`} />
      </Panel>

      <DayBlock label="DAY 4–5 — Connect Vapi to n8n and Parse Real Data" accent={G.purple}>
        <StepRow num="1" accent={G.purple} title="Make sure your ngrok URL is current in Vapi assistant" cmd={`# Get current ngrok URL
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | \\
  python3 -c "import sys,json; print(json.load(sys.stdin)['tunnels'][0]['public_url'])")
echo "Current ngrok URL: $NGROK_URL/webhook/vapi"

# Update Vapi assistant Server URL via API:
curl -X PATCH "https://api.vapi.ai/assistant/YOUR_ASSISTANT_ID" \\
  -H "Authorization: Bearer $VAPI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d "{\"serverUrl\": \"$NGROK_URL/webhook/vapi\"}"`} deliverable="Vapi assistant serverUrl matches current ngrok URL" time="10 min" />
        <StepRow num="2" accent={G.purple} title="Build the full 5-node parsing workflow in n8n" detail="Nodes: 1) Webhook (POST /webhook/vapi) 2) Code node (paste extraction code above) 3) IF node (leadTier == 'hot') 4a) Google Sheets Append (Hot Leads sheet) 4b) Google Sheets Append (All Calls log)" deliverable="Workflow built and ACTIVE (not just saved — click Activate toggle)" time="2 hrs" />
        <StepRow num="3" accent={G.purple} title="Make a real test call and trace it through the pipeline" cmd={`# 1. Start call
vapi call create --assistant-id ASST_ID --phone-number-id PHONE_ID \\
  --customer-number YOUR_PHONE --customer-name "Test Owner"

# 2. Talk to the AI for at least 30 seconds — express "interest" in selling
# 3. Let AI end the call naturally

# 4. Watch n8n: Executions tab should show a new execution
# 5. Check your Google Sheets — new row should appear
# 6. Get the call details:
vapi calls get CALL_ID`} deliverable="Call made → webhook fired → n8n parsed → Google Sheets updated. End-to-end pipeline confirmed." time="45 min" />
        <Pitfall severity="error" problem="Webhook node receives POST but n8n shows 'Error' in execution" cause="Code node has a syntax error, or the payload structure doesn't match what the code expects." fix="In n8n: click the failed execution → click the Code node → look at the error message. Common issue: 'body' is nested differently. Log the raw input first: add console.log(JSON.stringify($input.item.json)) and check n8n logs to see the actual structure." />
        <Pitfall severity="warn" problem="Vapi isn't sending webhooks at all (n8n gets no executions)" cause="Server URL in Vapi assistant is wrong, ngrok isn't running, or the webhook path doesn't match." fix={"1) Verify ngrok is running: curl http://localhost:4040/api/tunnels. 2) Verify the Vapi assistant serverUrl is exactly: https://xxxxx.ngrok-free.app/webhook/vapi. 3) Test manually: curl -X POST https://YOUR_URL/webhook/vapi -d '{\"test\":true}' — you should see an n8n execution."} />
      </DayBlock>

      <DayBlock label="DAY 6–7 — Complete Pipeline + 30 Test Calls" accent={G.purple}>
        <StepRow num="1" accent={G.purple} title="Add Twilio SMS notification for hot leads" detail="In n8n: after the IF (isHotLead = true) branch → Add Twilio node → Send SMS to your phone number with: lead name, phone, what they said, AI summary. You need Twilio account SID + Auth Token in n8n credentials." deliverable="When AI detects a hot lead, you receive an SMS within 30 seconds of call ending" time="1.5 hrs" />
        <StepRow num="2" accent={G.purple} title="Add DNC auto-remove logic" detail="Add another IF node: isDNC = YES → Google Sheets Update (mark lead as DNC in status column) + NO further contact. This prevents repeat calls to opt-outs — legally critical." deliverable="DNC requests from calls automatically flagged in CRM" time="45 min" />
        <StepRow num="3" accent={G.purple} title="Run 30 test calls through the full pipeline" detail="Call your own phone 10 times expressing interest. Call 10 times saying 'not interested'. Call 10 times saying 'remove me from your list'. Verify every outcome routes correctly in n8n and logs correctly to Google Sheets." deliverable="30/30 calls logged correctly. Hot lead SMS fires only when appropriate. DNC flags work." time="2 hrs" />
        <StepRow num="4" accent={G.purple} title="Document your n8n workflow with sticky notes" detail="In n8n: right-click → Add Sticky Note. Add a note on every non-obvious node explaining what it does. Future-you (and future clients) will need this context when debugging." deliverable="Every n8n node has a description or sticky note. You can explain the entire workflow in 2 minutes." time="30 min" />
      </DayBlock>

      <Panel accent={G.gold}>
        <SectionTitle accent={G.gold}>Week 2 Final Checkpoint</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            "Real call ends → n8n execution fires automatically",
            "End-of-call-report correctly parsed into flat fields",
            "All calls logged to Google Sheets 'All Calls' tab",
            "Hot leads logged to separate 'Hot Leads' tab",
            "SMS alert fires to agent when hot lead detected",
            "DNC requests flagged and not retried",
            "30 test calls: all logged, routing correct",
            "n8n workflow documented with sticky notes",
            "You can describe the data flow from memory",
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 10, fontSize: 11, color: G.text, padding: "7px 10px", background: G.panelHi, borderRadius: 4, border: `1px solid ${G.border}` }}>
              <span style={{ color: G.green, fontWeight: 900, flexShrink: 0 }}>□</span>{c}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

// ═══════════════════════════════════════════════
// PITFALLS
// ═══════════════════════════════════════════════
function Pitfalls() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.red + "08", border: `1px solid ${G.red}25`, borderRadius: 6, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.red, fontWeight: 700 }}>Why This Tab Exists: </span>
        Every pitfall here was either encountered by builders of this exact stack or is a known failure mode documented in official sources. Read this before Week 1 starts — recognition is faster than diagnosis.
      </div>

      <Expand title="🐳 Docker & Environment Pitfalls" accent={G.cyan} badge="ENV" defaultOpen={true}>
        <Pitfall severity="error" problem="'docker: Got permission denied while trying to connect to Docker daemon socket'" cause="User hasn't been added to the docker group, or the session wasn't refreshed after adding." fix="Run exactly: sudo usermod -aG docker $USER && newgrp docker. If still failing, fully log out of your Pop!_OS session and back in. This is a session token issue, not a config issue." />
        <Pitfall severity="error" problem="n8n container starts then immediately exits (exit code 1)" cause="PostgreSQL isn't healthy yet when n8n starts, or the .env variables are malformed (quotes, spaces, or special characters in passwords)." fix="1) Run 'docker compose logs postgres' — if DB is starting, just wait and retry 'docker compose restart n8n'. 2) Check .env for special characters in passwords — passwords with @ or # break the DB connection string. Generate a new password with only alphanumeric chars." />
        <Pitfall severity="warn" problem="n8n workflows are gone after running 'docker compose down'" cause="You accidentally ran 'docker compose down -v' which destroys volumes, or the volume paths in docker-compose.yml weren't mounted when workflows were created." fix="NEVER run 'docker compose down -v'. To check if data is safe: 'ls -la ~/vapi-agency/n8n/n8n_data/' — this directory should have files. If empty, workflows are lost. Going forward: backup n8n_data weekly with 'tar czf n8n_backup_$(date +%Y%m%d).tar.gz ~/vapi-agency/n8n/'" />
        <Pitfall severity="warn" problem="Port 5678 already in use when starting n8n" cause="Another process (or a previous n8n instance) is using the port." fix="Find and kill it: lsof -ti:5678 | xargs kill -9 — then retry 'docker compose up -d'" />
        <Pitfall severity="info" problem="n8n UI is very slow or timing out" cause="Docker container is CPU or memory throttled. n8n with PostgreSQL needs at least 1GB RAM assigned." fix="Check Docker resource usage: 'docker stats n8n_app'. If memory is capped, increase Docker's resource limits in Docker settings. For Pop!_OS you can also check: free -h to see available system RAM." />
      </Expand>

      <Expand title="📡 Webhook & Connectivity Pitfalls" accent={G.orange} badge="WEBHOOKS">
        <Pitfall severity="error" problem="Vapi sends webhooks but n8n never triggers (no executions)" cause="Three possible causes: 1) Webhook node path mismatch, 2) ngrok URL is stale, 3) Workflow not activated." fix="Checklist: 1) Is ngrok running? (curl http://localhost:4040/api/tunnels) 2) Is the URL in Vapi assistant matching ngrok? 3) Is the n8n workflow ACTIVATED (toggle top right)? 4) Does the Webhook node path match the URL path? Path '/webhook/vapi' → URL must end in '/webhook/vapi'." />
        <Pitfall severity="error" problem="Webhook returns 403 Forbidden" cause="n8n webhook authentication is enabled and Vapi isn't sending the right auth header." fix="Option A: Disable webhook auth in n8n for development (Settings → n8n → disable auth). Option B: In Vapi assistant, add a serverUrlSecret — this sends a shared secret header that n8n can validate with a Code node." />
        <Pitfall severity="warn" problem="ngrok URL changes and everything breaks every morning" cause="Free ngrok generates a new random URL on every session start." fix="Three options: 1) Paid ngrok for a static domain ($8/mo). 2) Cloudflare Tunnel: 'cloudflared tunnel create vapi-n8n' gives you a permanent free subdomain (best option for local dev). 3) Deploy n8n to a VPS ($5/mo Hetzner CX11) for a permanent URL." />
        <Pitfall severity="warn" problem="Vapi retries the webhook multiple times causing duplicate n8n executions" cause="n8n takes >5 seconds to respond, Vapi interprets this as failure and retries." fix="Add a 'Respond to Webhook' node as the FIRST node after your Webhook trigger — set it to return {status: 200} immediately. This acknowledges receipt before any processing. Then continue processing asynchronously." />
        <Pitfall severity="info" problem="Webhook payload structure is different from the docs" cause="Vapi occasionally updates payload structure between API versions." fix="Always console.log the raw input in your Code node first: console.log(JSON.stringify($input.item.json, null, 2)). Check n8n logs or the execution output to see the actual payload before assuming the documented structure." />
      </Expand>

      <Expand title="📞 Vapi & Call Quality Pitfalls" accent={G.purple} badge="CALLS">
        <Pitfall severity="error" problem="AI interrupts the homeowner constantly (overlapping speech)" cause="Default interruptionThreshold is too aggressive. The AI cuts in the moment it detects any sound." fix={"Add to your assistant config: \"interruptionThreshold\": 0.6 (scale 0-1, higher = less sensitive). Also set \"voiceActivityDetectionMode\": \"server-side\" for better accuracy."} />
        <Pitfall severity="error" problem="Long dead air / silence after homeowner speaks" cause="LLM processing latency + TTS generation. Default OpenAI TTS is slower than ElevenLabs Turbo." fix="Switch TTS to ElevenLabs Turbo v2.5 (specifically the 'turbo' variant). Switch STT to Deepgram Nova-2. These two changes alone reduce perceived latency by 300-500ms and are the #1 call quality improvement." />
        <Pitfall severity="warn" problem="AI sounds too robotic or formal" cause="System prompt uses corporate language that LLMs tend to render formally. Also: TTS provider matters enormously." fix={"In your system prompt: 1) Add 'Use casual, conversational language. Short sentences. Like talking to a neighbor.' 2) Add 'Insert brief thinking sounds like \"hmm\" or \"right\" where natural.' 3) Test 5+ ElevenLabs voices — the right voice makes a huge difference."} />
        <Pitfall severity="warn" problem="AI gets confused when homeowner asks unexpected questions" cause="System prompt is too rigid / dialogue-tree based. LLMs need rules, not scripts." fix="Restructure your system prompt as GOALS + RULES + EXAMPLES rather than a word-for-word script. The AI should know what it's trying to accomplish (qualify the lead), not what words to say. This makes it far more resilient." />
        <Pitfall severity="warn" problem="endedReason shows 'pipeline-error' on some calls" cause="LLM call failed, TTS timeout, or STT error mid-call." fix="These are Vapi infrastructure errors. Log them separately in n8n (don't count them as answered calls). If happening >5% of calls, switch to more stable providers. Check Vapi status page for outages." />
        <Pitfall severity="info" problem="Structured data extraction (analysisPlan) returns null for some fields" cause="The transcript didn't contain enough information to extract, or the LLM prompt was ambiguous." fix="Make extractable fields binary when possible (interested: true/false vs 'yes/maybe/no'). Add 'If unclear, default to false' to your structuredDataPrompt. Test with diverse call transcripts." />
      </Expand>

      <Expand title="📊 n8n & Data Pipeline Pitfalls" accent={G.gold} badge="AUTOMATION">
        <Pitfall severity="error" problem="Google Sheets credentials expire / stop working" cause="OAuth tokens expire, especially if your Google account has 2FA changes or the token wasn't refreshed." fix="In n8n: Credentials → your Google Sheets credential → Reconnect (re-authorize OAuth). This happens every 6 months. Consider using a Service Account for n8n instead of personal OAuth — it never expires." />
        <Pitfall severity="warn" problem="n8n Code node works in test but fails in production" cause="Test mode uses different input data structure than live execution data." fix="Always use the live execution data to test Code nodes (click 'Execute node' with real data, not the 'test' mock data). The $input.item.json structure can differ between modes." />
        <Pitfall severity="warn" problem="Twilio SMS node fails with authentication error" cause="Wrong Twilio Account SID or Auth Token, or using Test credentials instead of Live credentials." fix="In Twilio: Console → use the LIVE credentials (not Test credentials). Account SID starts with 'AC'. Make sure the Twilio number you're sending FROM is the exact same number imported into Vapi." />
        <Pitfall severity="info" problem="n8n workflow executes but Google Sheet has duplicate rows" cause="Vapi retried the webhook due to slow n8n response." fix="Add a deduplication check: in your Code node, extract the callId. Add a Google Sheets 'Lookup' node before appending — if the callId already exists in the sheet, skip the append. This makes the workflow idempotent." />
      </Expand>

      <Expand title="⚖️ Legal & Compliance Pitfalls" accent={G.red} badge="CRITICAL">
        <Pitfall severity="error" problem="Called someone on the DNC registry" cause="No DNC scrub before dialing, or scrub was done at lead collection time and not again before calling (DNC list updates daily)." fix="Scrub 24-48 hours before every campaign batch, not at lead intake. Use DNC.com API integrated into your n8n campaign trigger. This is the single biggest legal risk — $500-1,500 fine per call." />
        <Pitfall severity="error" problem="Called outside legal hours (before 8am or after 9pm local time)" cause="Used your own time zone instead of the recipient's local time zone, or time zone detection was based on area code mapping that was incomplete." fix="See the time zone gating code in the Tech tab. Default to Eastern time when unknown (most restrictive). Add a 1-hour buffer: call 9am–8pm local time to account for DST edge cases." />
        <Pitfall severity="error" problem="AI did not disclose it was AI when asked" cause="System prompt didn't include the disclosure rule, or AI 'forgot' it during a long conversation." fix="Add to system prompt AND as a hard rule: 'RULE: If ANY human asks if you are AI, a robot, or a computer — you MUST immediately say YES and disclose. Never deny being AI. This is a legal requirement.' Test this specifically during QA." />
        <Pitfall severity="warn" problem="No opt-out mechanism in calls" cause="System prompt didn't include the 'Press 2 to be removed' instruction, or the AI isn't honoring verbal opt-outs." fix="Add to system prompt: 'If anyone says stop calling, remove me, don't call again, or similar — say: Absolutely, I'll remove you right away. Have a great day. Then use the end_call function with removeFromList: true. Honor every opt-out immediately.'" />
      </Expand>
    </div>
  );
}

// ═══════════════════════════════════════════════
// SCRIPTS
// ═══════════════════════════════════════════════
function Scripts() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.purple + "0A", border: `1px solid ${G.purple}25`, borderRadius: 6, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.purple, fontWeight: 700 }}>Script Design Philosophy: </span>
        This is a rules document for a language model, not a word-for-word script. The AI adapts to what the homeowner says. Your job is to define the GOAL (qualify the lead), the PERSONA (warm, curious, never pushy), and the GUARDRAILS (objection handling, legal disclosures). Read every version aloud before deploying.
      </div>

      <Expand title="Full Real Estate Cold-Call System Prompt v2" accent={G.gold} badge="PASTE INTO VAPI" defaultOpen={true}>
        <CodeBlock lang="js" label="VAPI SYSTEM PROMPT — REAL ESTATE SELLER QUALIFIER v2" code={`You are Sarah, a friendly property specialist who helps connect homeowners in [TARGET CITY] with serious buyers and investors actively purchasing in the area right now.

## CORE IDENTITY
- Warm, genuinely curious, never pushy
- You are AI. Disclose immediately and honestly if asked.
- Short sentences. Natural pacing. Real conversation energy.
- You are calling on behalf of [AGENT/COMPANY NAME]

## COMPLIANCE RULES (NEVER BREAK THESE)
- If directly asked "Is this AI/a robot/a computer?" → IMMEDIATELY say: "Yes, I'm an AI assistant calling on behalf of [Company]. Is that okay?"
- If anyone says "remove me", "don't call", "stop calling" → say "Absolutely, I'm so sorry to bother you. I'll remove you right now. Have a great day!" then use end_call with removeFromList: true
- Always disclose: "This call may be recorded for quality and training purposes"
- Never claim to be a licensed real estate agent

## CALL FLOW

### OPENING (first 20 seconds — be brief)
"Hi, is this {{customer.name}}?"
[Wait for yes]
"Hi [Name], this is Sarah — I'm calling on behalf of a group of buyers actively looking in [City] right now. I noticed your address and wanted to reach out directly. Do you have 60 seconds?"

### IF THEY ASK HOW YOU GOT THEIR NUMBER
"We work from property records and public listings in your area. I completely understand if the timing's off — I'm sorry to interrupt your day."

### QUALIFY (if receptive)
"I'll be direct with you — we have buyers paying cash, closing fast, no contingencies. I'm not here to waste your time, so let me just ask: is selling your property at [Address] something that's been on your radar at all, even casually?"

### IF INTERESTED — DISCOVER THE MOTIVATION
Listen actively. Let them talk. Then ask ONE of:
- "What would need to be true for the timing to work for you?"
- "Is it more about the price or the timing right now?"
- "Have you had any estimates on what the property is worth in today's market?"

### TRANSITION TO BOOKING
"That makes a lot of sense. Would it be worth a quick 10-minute conversation with one of our buyers — no obligation at all, just to hear what the numbers look like for your specific property? I can set that up for this week."

### OBJECTION HANDLING

"Not interested":
"Completely understand. Can I just ask — is it more that the timing isn't right, or would it genuinely depend on the offer?"
[If timing] → "Fair enough. Would it be okay if I checked back in a few months?"
[If price] → "Got it. If the number ever made sense, is there a good way to reach you?"

"Is this AI?":
"Yes — I'm an AI assistant. I reach out on behalf of the team to see if there's any initial interest before a real person follows up. Would you prefer I connect you directly with someone now?"

"How much will you pay?":
"That's exactly the right question. Our buyers work on a case-by-case basis based on condition and your situation — I genuinely can't give you a number, but that's exactly what a 10-minute call with a buyer would cover. Real numbers, no pressure."

"I already have a real estate agent":
"That's completely fine — our buyers sometimes work alongside agents too. If there was interest, everything would go through your agent."

"Who is this really?":
"I'm Sarah, an AI assistant for [Company Name]. We help connect homeowners with buyers in the area. Would you like more information?"

"Stop calling me / Remove me":
[USE END_CALL FUNCTION WITH removeFromList: true]
"Absolutely, I'm so sorry to bother you. You'll be removed right away. Have a great day!"

"The market is bad right now":
"I hear that a lot — and honestly that's exactly why some owners are choosing to sell now to lock in their equity before any further uncertainty. Have you seen what homes are actually closing for in your neighborhood recently?"

"I'm too busy":
"Of course — I'll be quick. Would Thursday or Saturday work better for a 2-minute chat with one of our buyers?"

"I'm renting it out":
"That's actually great — we have investors specifically looking for tenanted properties too. Would it be worth a quick conversation to see what it might be worth as an investment sale?"

## BOOKING CONFIRMATION
"Perfect. I'll have [Agent Name] reach out to you [day/time they said]. Just to confirm — best number to reach you is {{customer.number}}?"
[Use end_call function with: status: interested, callbackRequested: true, bestCallbackTime: what they said]

## CALL ENDING (ALWAYS)
"Thanks so much for your time, [Name]. I really appreciate it. Have a wonderful rest of your day!"
[Use end_call function]

## PERFORMANCE RULES
- Keep calls under 3 minutes unless prospect is highly engaged
- Never read from a script — adapt to what they say
- If they ask a question you can't answer, say "That's a great question — let me have our team follow up with specifics"
- One question at a time. Wait for answer. Don't stack questions.`} />
      </Expand>

      <Expand title="Voicemail Drop Script (Record This Yourself)" accent={G.cyan} badge="15 SECONDS">
        <div style={{ padding: "14px 16px", background: G.panel, border: `1px solid ${G.cyan}20`, borderRadius: 6, fontSize: 13, color: G.text, lineHeight: 2.1, fontStyle: "italic" }}>
          "Hi [Owner Name], this is Sarah calling about your property at [Address]. I work with a group of buyers looking in [City] and wanted to reach out about a potential opportunity. No rush at all — if you'd like to chat, you can reach us at [Phone Number]. Hope you have a great day!"
        </div>
        <div style={{ marginTop: 10, padding: "10px 14px", background: G.cyan + "08", border: `1px solid ${G.cyan}20`, borderRadius: 5, fontSize: 11, color: G.mid, lineHeight: 1.7 }}>
          <span style={{ color: G.cyan, fontWeight: 700 }}>Recording Tips: </span>
          Quiet room, no background noise. Conversational tone — imagine you're leaving a voicemail for a friend. Re-record until it sounds natural (target: 10+ takes). Use Audacity (free on Pop!_OS: sudo apt install audacity) to trim silence. This voicemail should generate 10–20% callback rate on no-answer leads.
        </div>
      </Expand>

      <Expand title="SMS Follow-Up Sequence (Automated via n8n)" accent={G.green} badge="3-PART SEQUENCE">
        {[
          { trigger: "Immediately after hot lead call ends", msg: "Hi [Name], this is the team who just called about your property at [Address]. Thanks so much for your time — really appreciated the conversation! [Agent Name] will reach out within the hour. Want to pick a convenient time? [Calendly Link]" },
          { trigger: "+24 hours (if no appointment booked yet)", msg: "Hi [Name], following up from our call yesterday about [Address]. [Agent Name] is still eager to connect — we work around your schedule. Any time this week work for a quick 10-min chat? [Calendly Link]" },
          { trigger: "+72 hours (final follow-up)", msg: "Hi [Name], last follow-up from the team — we have a buyer specifically focused on your area right now. If timing ever aligns, [Agent Name] would love to connect: [Calendly Link]. No pressure, have a great week!" },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <Tag color={G.green}>{s.trigger}</Tag>
            <div style={{ marginTop: 8, padding: "12px 14px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 5, fontSize: 12, color: G.text, lineHeight: 1.85, fontStyle: "italic" }}>{s.msg}</div>
          </div>
        ))}
      </Expand>
    </div>
  );
}

// ═══════════════════════════════════════════════
// TECH REFERENCE
// ═══════════════════════════════════════════════
function TechRef() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Expand title="Outbound Calling — Native Vapi vs n8n-Triggered" accent={G.cyan} badge="UNDERSTAND THIS" defaultOpen={true}>
        <div style={{ fontSize: 12, color: G.mid, lineHeight: 1.8, marginBottom: 14 }}>
          There are two ways to trigger a Vapi outbound call. Know the difference:
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
          {[
            { title: "Native Vapi Call (Direct API)", desc: "You call the Vapi API directly (curl/SDK). Good for: single test calls, manual triggers, quick debugging. Not suited for bulk campaigns.", color: G.cyan },
            { title: "n8n-Triggered Call (Automated)", desc: "n8n reads a lead list and calls the Vapi API in a loop. This is your production flow for bulk campaigns. n8n handles timing, rate limits, and logging.", color: G.purple },
          ].map((m, i) => (
            <div key={i} style={{ padding: "14px 16px", background: G.panelHi, border: `1px solid ${m.color}25`, borderLeft: `3px solid ${m.color}`, borderRadius: 5 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: m.color, marginBottom: 8 }}>{m.title}</div>
              <div style={{ fontSize: 11, color: G.mid, lineHeight: 1.6 }}>{m.desc}</div>
            </div>
          ))}
        </div>
        <CodeBlock lang="bash" label="METHOD 1 — SINGLE CALL VIA CURL (TEST/MANUAL)" code={`# Make a single outbound call directly to Vapi API
curl -X POST "https://api.vapi.ai/call/phone" \\
  -H "Authorization: Bearer $VAPI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "assistantId": "YOUR_ASSISTANT_ID",
    "phoneNumberId": "YOUR_VAPI_PHONE_NUMBER_ID",
    "customer": {
      "number": "+15551234567",
      "name": "John Smith"
    },
    "assistantOverrides": {
      "variableValues": {
        "ownerName": "John",
        "propertyAddress": "123 Main St"
      }
    }
  }'

# Response includes call ID — use this to check status/transcript:
# vapi calls get <callId>`} />
        <CodeBlock lang="js" label="METHOD 2 — N8N BULK CAMPAIGN WORKFLOW (LOOP OVER LEADS)" code={`// n8n workflow structure for bulk outbound campaign:
//
// [Schedule Trigger] → runs daily at 10am
//   ↓
// [Google Sheets: Read] → get rows where status = "new"
//   ↓
// [Limit Node] → max 50 calls per run (start small)
//   ↓
// [Loop Over Items]
//   ↓
//   [Code: Time Zone Check] → calculate local hour for this number
//     ↓
//   [IF: Is Legal To Call?] (hour >= 8 AND hour < 21)
//     ↓ YES
//     [HTTP Request: POST https://api.vapi.ai/call/phone]
//     Body:
//     {
//       "assistantId": "{{ $env.VAPI_ASSISTANT_ID }}",
//       "phoneNumberId": "{{ $env.VAPI_PHONE_ID }}",
//       "customer": {
//         "number": "{{ $json.phone }}",
//         "name": "{{ $json.firstName }} {{ $json.lastName }}"
//       }
//     }
//     Headers: { Authorization: "Bearer {{ $env.VAPI_API_KEY }}" }
//     ↓
//     [Google Sheets: Update Row] → set status = "calling", callTriggeredAt = now
//     ↓
//     [Wait: 15 seconds] → rate limit protection
//     ↓ NO
//     [Google Sheets: Update Row] → set status = "deferred_hours"
//
// Key: The 15-second wait prevents hitting Vapi's rate limits
// Key: Update status BEFORE the wait so partial batches don't retry`} />
      </Expand>

      <Expand title="Time Zone Gating — TCPA Compliance Code" accent={G.orange} badge="LEGAL REQUIRED">
        <CodeBlock lang="js" label="N8N CODE NODE — FULL TIME ZONE GATE (US AREA CODES)" code={`// Input: $json.phone (E.164 format, e.g. "+16025551234")
// Output: adds timezone, localHour, isLegalToCall fields

const phone = $json.phone || '';
const areaCode = phone.replace(/[^0-9]/g, '').slice(1, 4); // strip +1, take 3 digits

// Comprehensive US area code → timezone mapping
const tzMap = {
  // EASTERN UTC-5/-4
  '201':'America/New_York','202':'America/New_York','203':'America/New_York',
  '205':'America/Chicago', // Alabama - Central
  '207':'America/New_York','212':'America/New_York','213':'America/Los_Angeles',
  '214':'America/Chicago','215':'America/New_York','216':'America/New_York',
  '217':'America/Chicago','218':'America/Chicago','219':'America/Chicago',
  '224':'America/Chicago','225':'America/Chicago',
  '228':'America/Chicago','229':'America/New_York',
  '231':'America/Detroit','234':'America/New_York','239':'America/New_York',
  '240':'America/New_York','248':'America/Detroit',
  '251':'America/Chicago','252':'America/New_York','253':'America/Los_Angeles',
  '256':'America/Chicago','260':'America/Indiana/Indianapolis',
  '262':'America/Chicago','267':'America/New_York','269':'America/Detroit',
  '270':'America/Chicago','272':'America/New_York',
  '301':'America/New_York','302':'America/New_York','303':'America/Denver',
  '304':'America/New_York','305':'America/New_York','307':'America/Denver',
  '308':'America/Chicago','309':'America/Chicago','310':'America/Los_Angeles',
  '312':'America/Chicago','313':'America/Detroit','314':'America/Chicago',
  '315':'America/New_York','316':'America/Chicago','317':'America/Indiana/Indianapolis',
  '318':'America/Chicago','319':'America/Chicago',
  '320':'America/Chicago','321':'America/New_York','323':'America/Los_Angeles',
  '325':'America/Chicago','330':'America/New_York','331':'America/Chicago',
  '334':'America/Chicago','336':'America/New_York','337':'America/Chicago',
  '339':'America/New_York','347':'America/New_York','351':'America/New_York',
  '352':'America/New_York','360':'America/Los_Angeles','361':'America/Chicago',
  '385':'America/Denver','386':'America/New_York',
  '401':'America/New_York','402':'America/Chicago','404':'America/New_York',
  '405':'America/Chicago','406':'America/Denver','407':'America/New_York',
  '408':'America/Los_Angeles','409':'America/Chicago','410':'America/New_York',
  '412':'America/New_York','413':'America/New_York','414':'America/Chicago',
  '415':'America/Los_Angeles','417':'America/Chicago','419':'America/New_York',
  '423':'America/New_York','424':'America/Los_Angeles','425':'America/Los_Angeles',
  '432':'America/Chicago','434':'America/New_York','435':'America/Denver',
  '440':'America/New_York','442':'America/Los_Angeles','443':'America/New_York',
  '469':'America/Chicago','470':'America/New_York','475':'America/New_York',
  '478':'America/New_York','479':'America/Chicago','480':'America/Phoenix',
  '484':'America/New_York',
  '501':'America/Chicago','502':'America/New_York','503':'America/Los_Angeles',
  '504':'America/Chicago','505':'America/Denver','507':'America/Chicago',
  '508':'America/New_York','509':'America/Los_Angeles','510':'America/Los_Angeles',
  '512':'America/Chicago','513':'America/New_York','515':'America/Chicago',
  '516':'America/New_York','517':'America/Detroit','518':'America/New_York',
  '520':'America/Phoenix','530':'America/Los_Angeles','534':'America/Chicago',
  '540':'America/New_York','541':'America/Los_Angeles','551':'America/New_York',
  '559':'America/Los_Angeles','561':'America/New_York','562':'America/Los_Angeles',
  '563':'America/Chicago','567':'America/New_York','570':'America/New_York',
  '571':'America/New_York','573':'America/Chicago','574':'America/Indiana/Indianapolis',
  '575':'America/Denver','580':'America/Chicago','585':'America/New_York',
  '586':'America/Detroit',
  '601':'America/Chicago','602':'America/Phoenix','603':'America/New_York',
  '605':'America/Chicago','606':'America/New_York','607':'America/New_York',
  '608':'America/Chicago','609':'America/New_York','610':'America/New_York',
  '612':'America/Chicago','614':'America/New_York','615':'America/Chicago',
  '616':'America/Detroit','617':'America/New_York','618':'America/Chicago',
  '619':'America/Los_Angeles','620':'America/Chicago','623':'America/Phoenix',
  '626':'America/Los_Angeles','628':'America/Los_Angeles','630':'America/Chicago',
  '631':'America/New_York','636':'America/Chicago','641':'America/Chicago',
  '646':'America/New_York','650':'America/Los_Angeles','651':'America/Chicago',
  '657':'America/Los_Angeles','660':'America/Chicago','661':'America/Los_Angeles',
  '662':'America/Chicago','669':'America/Los_Angeles','678':'America/New_York',
  '681':'America/New_York','682':'America/Chicago',
  '701':'America/Chicago','702':'America/Los_Angeles','703':'America/New_York',
  '704':'America/New_York','706':'America/New_York','707':'America/Los_Angeles',
  '708':'America/Chicago','712':'America/Chicago','713':'America/Chicago',
  '714':'America/Los_Angeles','715':'America/Chicago','716':'America/New_York',
  '717':'America/New_York','718':'America/New_York','719':'America/Denver',
  '720':'America/Denver','724':'America/New_York','725':'America/Los_Angeles',
  '727':'America/New_York','731':'America/Chicago','732':'America/New_York',
  '734':'America/Detroit','737':'America/Chicago','740':'America/New_York',
  '747':'America/Los_Angeles','754':'America/New_York','757':'America/New_York',
  '760':'America/Los_Angeles','762':'America/New_York','763':'America/Chicago',
  '765':'America/Indiana/Indianapolis','769':'America/Chicago','770':'America/New_York',
  '772':'America/New_York','773':'America/Chicago','774':'America/New_York',
  '775':'America/Los_Angeles','779':'America/Chicago','781':'America/New_York',
  '785':'America/Chicago','786':'America/New_York','801':'America/Denver',
  '802':'America/New_York','803':'America/New_York','804':'America/New_York',
  '805':'America/Los_Angeles','806':'America/Chicago','808':'Pacific/Honolulu',
  '810':'America/Detroit','812':'America/Indiana/Indianapolis','813':'America/New_York',
  '814':'America/New_York','815':'America/Chicago','816':'America/Chicago',
  '817':'America/Chicago','818':'America/Los_Angeles','828':'America/New_York',
  '830':'America/Chicago','831':'America/Los_Angeles','832':'America/Chicago',
  '843':'America/New_York','845':'America/New_York','847':'America/Chicago',
  '848':'America/New_York','850':'America/Chicago','856':'America/New_York',
  '857':'America/New_York','858':'America/Los_Angeles','859':'America/New_York',
  '860':'America/New_York','862':'America/New_York','863':'America/New_York',
  '864':'America/New_York','865':'America/New_York','870':'America/Chicago',
  '878':'America/New_York',
  '901':'America/Chicago','903':'America/Chicago','904':'America/New_York',
  '906':'America/Detroit','907':'America/Anchorage','908':'America/New_York',
  '909':'America/Los_Angeles','910':'America/New_York','912':'America/New_York',
  '913':'America/Chicago','914':'America/New_York','915':'America/Denver',
  '916':'America/Los_Angeles','917':'America/New_York','918':'America/Chicago',
  '919':'America/New_York','920':'America/Chicago','925':'America/Los_Angeles',
  '928':'America/Phoenix','929':'America/New_York','931':'America/Chicago',
  '936':'America/Chicago','937':'America/New_York','938':'America/Chicago',
  '940':'America/Chicago','941':'America/New_York','947':'America/Detroit',
  '949':'America/Los_Angeles','951':'America/Los_Angeles','952':'America/Chicago',
  '954':'America/New_York','956':'America/Chicago','970':'America/Denver',
  '971':'America/Los_Angeles','972':'America/Chicago','973':'America/New_York',
  '978':'America/New_York','979':'America/Chicago','980':'America/New_York',
  '985':'America/Chicago','989':'America/Detroit',
};

const tz = tzMap[areaCode] || 'America/New_York'; // default Eastern (most restrictive)
const now = new Date();
const localTimeStr = now.toLocaleString('en-US', { timeZone: tz });
const localTime = new Date(localTimeStr);
const hour = localTime.getHours();
const dayOfWeek = localTime.getDay(); // 0=Sun, 6=Sat

// TCPA: 8am-9pm local time, any day
// We use 9am-8pm (1-hour buffer on each end for safety)
const isLegalToCall = hour >= 9 && hour < 20;

return [{
  json: {
    ...$json,
    detectedTimezone: tz,
    localHour: hour,
    localDayOfWeek: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][dayOfWeek],
    isLegalToCall,
    blockReason: !isLegalToCall ? \`Local time \${hour}:00 — outside safe calling window (9am-8pm)\` : null
  }
}];`} />
      </Expand>

      <Expand title="Lead Scraper — Python Script for Pop!_OS" accent={G.blue} badge="WEEK 3">
        <CodeBlock lang="python" label="ZILLOW FSBO SCRAPER — ~/vapi-agency/scraper/zillow_fsbo.py" code={`#!/usr/bin/env python3
"""
Zillow FSBO Lead Scraper for Pop!_OS
Run: source ~/vapi-agency/scraper-env/bin/activate
     python3 zillow_fsbo.py --city "Phoenix" --state "AZ" --pages 5
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import json
import argparse
import sys
from pathlib import Path

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
}

def scrape_zillow_fsbo(city: str, state: str, pages: int = 3) -> list:
    leads = []
    city_slug = city.lower().replace(' ', '-')
    state_slug = state.lower()

    for page in range(1, pages + 1):
        url = f"https://www.zillow.com/{city_slug}-{state_slug}/fsbo/{page}_p/"
        print(f"[{page}/{pages}] Fetching: {url}")

        try:
            resp = requests.get(url, headers=HEADERS, timeout=15)
            if resp.status_code == 200:
                soup = BeautifulSoup(resp.content, 'html.parser')
                scripts = soup.find_all('script', {'type': 'application/json'})

                for script in scripts:
                    if not script.string:
                        continue
                    try:
                        data = json.loads(script.string)
                        listings = (
                            data.get('props', {})
                                .get('pageProps', {})
                                .get('searchPageState', {})
                                .get('cat1', {})
                                .get('searchResults', {})
                                .get('listResults', [])
                        )
                        for listing in listings:
                            home = listing.get('hdpData', {}).get('homeInfo', {})
                            leads.append({
                                'address': listing.get('address', ''),
                                'city': city,
                                'state': state,
                                'zip': listing.get('addressZipcode', ''),
                                'price_listed': listing.get('price', ''),
                                'beds': listing.get('beds', ''),
                                'baths': listing.get('baths', ''),
                                'sqft': home.get('livingArea', ''),
                                'days_on_market': home.get('daysOnZillow', ''),
                                'year_built': home.get('yearBuilt', ''),
                                'listing_url': 'https://zillow.com' + listing.get('detailUrl', ''),
                                'latitude': home.get('latitude', ''),
                                'longitude': home.get('longitude', ''),
                                'source': 'Zillow FSBO',
                                'scraped_at': pd.Timestamp.now().isoformat(),
                                # Fields to fill via skip trace:
                                'first_name': '',
                                'last_name': '',
                                'phone': '',
                                'skip_traced': 'NO',
                                'dnc_checked': 'NO',
                                'call_status': 'new',
                            })
                    except (json.JSONDecodeError, KeyError):
                        continue

                print(f"  → Running total: {len(leads)} leads")
            elif resp.status_code == 429:
                print(f"  → Rate limited. Waiting 30 seconds...")
                time.sleep(30)
            else:
                print(f"  → HTTP {resp.status_code}. Skipping page.")

        except Exception as e:
            print(f"  → Error: {e}")

        # Polite delay between pages (2-4 seconds)
        time.sleep(2.5)

    return leads


def main():
    parser = argparse.ArgumentParser(description='Scrape Zillow FSBO listings')
    parser.add_argument('--city', required=True)
    parser.add_argument('--state', required=True)
    parser.add_argument('--pages', type=int, default=3)
    parser.add_argument('--output', default=None)
    args = parser.parse_args()

    print(f"\\nScraping Zillow FSBO: {args.city}, {args.state} ({args.pages} pages)")
    leads = scrape_zillow_fsbo(args.city, args.state, args.pages)

    if not leads:
        print("No leads found. Zillow may have changed their page structure.")
        sys.exit(1)

    df = pd.DataFrame(leads)
    df.drop_duplicates(subset=['address'], inplace=True)

    output_file = args.output or f"leads_{args.city.lower().replace(' ','_')}_{args.state.lower()}.csv"
    output_path = Path(output_file)
    df.to_csv(output_path, index=False)

    print(f"\\nSaved {len(df)} unique leads → {output_path}")
    print(f"Next step: Skip trace these leads via BatchSkipTracing")
    return str(output_path)

if __name__ == '__main__':
    main()

# CLI USAGE:
# python3 zillow_fsbo.py --city "Phoenix" --state "AZ" --pages 5
# python3 zillow_fsbo.py --city "Atlanta" --state "GA" --pages 3 --output atlanta_leads.csv`} />
      </Expand>

      <Expand title="n8n Bulk Campaign Runner — Full Workflow Code" accent={G.gold} badge="WEEK 4-5">
        <CodeBlock lang="js" label="N8N CAMPAIGN RUNNER — COMPLETE WORKFLOW STRUCTURE" code={`// COMPLETE OUTBOUND CAMPAIGN WORKFLOW
// Build these nodes in n8n in this exact order:

// ┌─────────────────────────────────────────────────────┐
// │ Node 1: SCHEDULE TRIGGER                            │
// │ - Cron: Mon-Fri at 10:00 AM your local time         │
// │ - This triggers the daily campaign batch            │
// └─────────────────────────────────────────────────────┘
//                        ↓
// ┌─────────────────────────────────────────────────────┐
// │ Node 2: GOOGLE SHEETS (Read Rows)                   │
// │ - Sheet: "Ready to Call"                            │
// │ - Filter: call_status = "new"                       │
// │ - Limit: 50 rows (increase as you gain confidence)  │
// └─────────────────────────────────────────────────────┘
//                        ↓
// ┌─────────────────────────────────────────────────────┐
// │ Node 3: CODE — Time Zone Check                      │
// │ (paste the full timezone code from above)           │
// └─────────────────────────────────────────────────────┘
//                        ↓
// ┌─────────────────────────────────────────────────────┐
// │ Node 4: IF — isLegalToCall = true?                  │
// │ TRUE branch → Node 5                                │
// │ FALSE branch → Node 9 (defer)                       │
// └─────────────────────────────────────────────────────┘
//                        ↓ TRUE
// ┌─────────────────────────────────────────────────────┐
// │ Node 5: HTTP REQUEST — Trigger Vapi Call            │
// │ Method: POST                                        │
// │ URL: https://api.vapi.ai/call/phone                 │
// │ Auth: Bearer {{ $env.VAPI_API_KEY }}                │
// │ Body:                                               │
// │ {                                                   │
// │   "assistantId": "{{ $env.VAPI_ASSISTANT_ID }}",   │
// │   "phoneNumberId": "{{ $env.VAPI_PHONE_ID }}",     │
// │   "customer": {                                     │
// │     "number": "{{ $json.phone }}",                  │
// │     "name": "{{ $json.first_name }}"               │
// │   }                                                 │
// │ }                                                   │
// │ Response: capture - will contain call.id            │
// └─────────────────────────────────────────────────────┘
//                        ↓
// ┌─────────────────────────────────────────────────────┐
// │ Node 6: CODE — Extract Call ID from Response        │
// │                                                     │
// │ const callId = $input.item.json.id;                 │
// │ return [{ json: { ...$json, vapiCallId: callId }}]; │
// └─────────────────────────────────────────────────────┘
//                        ↓
// ┌─────────────────────────────────────────────────────┐
// │ Node 7: GOOGLE SHEETS UPDATE                        │
// │ - Find row by phone number                          │
// │ - Update: call_status = "calling"                   │
// │ - Update: vapi_call_id = {{ $json.vapiCallId }}     │
// │ - Update: call_triggered_at = {{ $now }}            │
// └─────────────────────────────────────────────────────┘
//                        ↓
// ┌─────────────────────────────────────────────────────┐
// │ Node 8: WAIT — 20 seconds                           │
// │ Rate limit protection. Don't skip this.             │
// └─────────────────────────────────────────────────────┘
//
//                  ↓ FALSE (from Node 4)
// ┌─────────────────────────────────────────────────────┐
// │ Node 9: GOOGLE SHEETS UPDATE (deferred)             │
// │ - Update: call_status = "deferred_outside_hours"    │
// │ - Update: deferred_reason = {{ $json.blockReason }} │
// └─────────────────────────────────────────────────────┘
//
// SEPARATE WORKFLOW: Call Results Handler (from Week 2)
// Webhook → Parse Payload → Route by leadTier → Log All + Alert Hot`} />
      </Expand>
    </div>
  );
}

// ═══════════════════════════════════════════════
// OUTREACH
// ═══════════════════════════════════════════════
function Outreach() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.blue + "0A", border: `1px solid ${G.blue}25`, borderRadius: 6, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.blue, fontWeight: 700 }}>The Core Rule: </span>
        Every message leads with THEIR problem, not your solution. Agents have one problem: not enough motivated seller leads. Lead with your results. Don't explain AI. Don't say "I built a tool." Say "I got 6 qualified seller leads in one day for $48."
      </div>

      <Expand title="Instagram DM Sequence — 3-Message Flow" accent={G.purple} badge="HIGH RESPONSE RATE">
        {[
          { label: "Message 1 — The Hook (send cold)", msg: "Hey [Name] — quick question. Do you ever struggle finding motivated sellers in [City]? I ran a test last month and sourced 6 qualified homeowners open to selling for under $50 total. Wanted to see if it would be useful for you." },
          { label: "Message 2 — If they reply 'how?' or 'yes'", msg: "We built an AI system that calls FSBO and expired listing owners automatically. Had 100 conversations in one day — 6 people said they'd seriously consider selling, 3 booked appointments. All for $48. Would you be open to a 10-minute call to see the actual numbers? No pitch — just results." },
          { label: "Message 3 — Follow-up if no reply (3 days later)", msg: "Hey [Name] — not sure if my last message went through. No pressure if it's not the right time. If you're ever trying to find sellers without cold calling yourself, I'd love to share what we built. Zero sales pitch — just real campaign data. 🏠" },
        ].map((m, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: G.purple, letterSpacing: 2, marginBottom: 8 }}>{m.label}</div>
            <div style={{ padding: "12px 14px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 6, fontSize: 12, color: G.text, lineHeight: 1.85 }}>{m.msg}</div>
          </div>
        ))}
      </Expand>

      <Expand title="Cold Email Template" accent={G.cyan} badge="B2B OUTREACH">
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: G.gold, letterSpacing: 2, marginBottom: 6 }}>SUBJECT LINES (A/B TEST BOTH)</div>
          <div style={{ padding: "7px 12px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 4, fontSize: 11, color: G.gold, marginBottom: 5 }}>6 seller leads, $48, same day — [City] test results</div>
          <div style={{ padding: "7px 12px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 4, fontSize: 11, color: G.gold }}>Quick question about finding motivated sellers in [City]</div>
        </div>
        <div style={{ padding: "16px 18px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 6, fontSize: 12, color: G.text, lineHeight: 2 }}>
          Hi [Agent Name],<br /><br />
          I'm [Your Name]. Last month I ran a test calling campaign targeting FSBO and expired listing owners in [City]. Here's what happened:<br /><br />
          → 100 calls placed in one day<br />
          → 28 homeowners answered<br />
          → 6 expressed real interest in selling<br />
          → 3 booked appointments with our test agent<br />
          → Total cost: $48<br /><br />
          I'm looking to offer this as a service for 2–3 agents in [City] who want a consistent pipeline of motivated seller leads — without spending hours cold calling personally.<br /><br />
          Would you be open to a 15-minute call this week to walk through the results? No commitment — I just want to see if it's a fit for how you work.<br /><br />
          [Your Name]<br />
          [Phone] | [Email]
        </div>
      </Expand>

      <Expand title="Facebook Group Post — Value-First Approach" accent={G.orange} badge="SOFT SELL">
        <div style={{ padding: "14px 16px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 6, fontSize: 12, color: G.text, lineHeight: 2 }}>
          "Wanted to share something I built and tested for anyone it might help.<br /><br />
          I've been experimenting with automated outreach to FSBO and expired listing owners using AI voice. Ran a 100-call test in [City] last month.<br /><br />
          Results:<br />
          ✓ 28 homeowners answered<br />
          ✓ 6 were genuinely open to selling<br />
          ✓ 3 booked appointments with the agent I was testing with<br />
          ✓ Total cost: $48 and about 1 hour of setup<br /><br />
          Not selling anything here — thought some of you might find the approach interesting or useful. Happy to share exactly what we built if anyone wants to DM."
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: G.mid, lineHeight: 1.7 }}>This type of post generates 5–15 DMs from curious agents. Respond to every single one within an hour. Convert DMs to calls. Close on calls.</div>
      </Expand>

      <Panel accent={G.gold}>
        <SectionTitle accent={G.gold}>Outreach Tracking — Google Sheet Columns</SectionTitle>
        <CodeBlock lang="bash" label="OUTREACH TRACKER SHEET COLUMNS" code={`Column headers to create in Google Sheets:

| Agent Name | City | Platform | Date Sent | Message Version | Opened? | Response | Response Date | Call Booked? | Call Date | Outcome | Notes |

DAILY GOAL:    5 new personalized outreach messages
WEEKLY GOAL:   3 sales calls booked from outreach
CONVERSION:    ~1 in 10 people you reach will book a call
               ~1 in 3 calls will close
MATH:          30 outreach → 3 calls → 1 client

TARGETING CRITERIA (who to reach):
- Agents with 2–5 years experience (have money, know the pain)
- Active on social media (Instagram / LinkedIn posts in last 30 days)
- Posting about listings or their market (they care about deals)
- Local area code (starts conversations naturally)
- NOT mega-agents (too corporate, complex sale)
- IDEAL: agents who just lost 1–2 listings to competitors`} />
      </Panel>
    </div>
  );
}

// ═══════════════════════════════════════════════
// CLOSE CLIENTS
// ═══════════════════════════════════════════════
function CloseClients() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.green + "0A", border: `1px solid ${G.green}25`, borderRadius: 6, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.green, fontWeight: 700 }}>On Sales Calls: </span>
        You don't need to be a salesperson. You need to ask two good questions and show one set of real numbers. The results sell the service — not you. Your role is to listen, find the pain, and connect your proof to their specific problem.
      </div>

      <Expand title="15-Minute Sales Call Script" accent={G.gold} badge="USE ON EVERY CALL" defaultOpen={true}>
        {[
          { step: "Min 0–2", title: "Rapport + Frame", script: `"Thanks for making time, [Name]. Before I show you anything — how are you currently finding sellers in [City]? What's that process look like for you?"`, note: "Let them talk for 2 full minutes. This is pure intelligence gathering. Note: are they doing cold calls themselves? Paying for leads? Burning out?" },
          { step: "Min 2–5", title: "Quantify the Pain", script: `"How many motivated seller leads do you need per month to hit your goals? And honestly — how much time does finding those leads take you every week?"`, note: "You want a number. Most agents need 5–15 leads/month and spend 5–15 hours/week finding them. That's the gap you fill." },
          { step: "Min 5–8", title: "Present the Proof", script: `"Let me show you what we ran last month. [Share screen or send sheet] 100 calls to FSBO and expired listing owners in [their city or similar]. 28 answered. 6 said they'd seriously consider selling. 3 booked appointments. Total cost: $48. Where does that start becoming interesting to you?"`, note: "Show your actual Google Sheet live. Real data. Real call IDs. If they ask to hear a call — play one. Authenticity closes." },
          { step: "Min 8–11", title: "Address Objections", script: "See objection handlers below. Don't rush. One objection at a time. If you don't know something — say 'Great question, let me confirm that and come back to you today.'", note: "" },
          { step: "Min 11–13", title: "Propose the Offer", script: `"Based on what you told me, I'd start with the Growth package — targeting [specific list type] in [their market]. That's $2,500/month. We do everything: source leads, skip trace, scrub DNC, run campaigns, send you a hot lead report every morning. You just answer the calls."`, note: "Be specific to their market and their words. Don't pitch generically. Use what they told you in minutes 2–5." },
          { step: "Min 13–15", title: "The Close", script: `"If this looks right, I can have the system built and first calls going out within 48 hours. Want to move forward?"`, note: "Say this and stop talking. Wait. The silence is intentional. Don't fill it. Let them answer." },
        ].map((s, i) => (
          <div key={i} style={{ padding: "12px 14px", background: G.panelHi, border: `1px solid ${G.border}`, borderRadius: 6, marginBottom: 8 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
              <Tag color={G.gold}>{s.step}</Tag>
              <span style={{ fontSize: 12, fontWeight: 700, color: G.text }}>{s.title}</span>
            </div>
            <div style={{ fontSize: 12, color: G.text, lineHeight: 1.8, fontStyle: "italic", padding: "8px 12px", background: G.bg, borderRadius: 5, marginBottom: s.note ? 8 : 0 }}>{s.script}</div>
            {s.note && <div style={{ fontSize: 11, color: G.gold, paddingLeft: 4, lineHeight: 1.6 }}>{s.note}</div>}
          </div>
        ))}
      </Expand>

      <Expand title="Objection Handling — The 6 Real Objections" accent={G.orange} badge="CRITICAL">
        {[
          { obj: "\"How do I know this will work for MY market?\"", ans: "\"Fair point — we don't have data from your specific market yet. That's exactly why I'd propose starting with a 1-month pilot. You see real results from YOUR market before committing to anything longer term. If it doesn't produce leads, you've spent less than one day of cold calling costs.\"" },
          { obj: "\"I don't want homeowners called by a robot\"", ans: "\"I completely understand — if it sounds robotic, it fails. Ours doesn't sound robotic. Here — let me play you a recording from last week's campaign. [Play call] Most people don't realize it's AI until it's asked. By then they're already in a conversation. The AI disclosure happens, but naturally.\"" },
          { obj: "\"I already have a VA doing this\"", ans: "\"How many calls per day is your VA making? [50–80 usually.] Our system does 300–2,000 per day, every day, with no sick days or inconsistency. Your VA could focus on the warm callbacks — the ones who already showed interest. This just fills the pipeline they work from.\"" },
          { obj: "\"What's the contract? Can I cancel?\"", ans: "\"Month-to-month, cancel with 30 days notice, no setup fees. We want clients who stay because the results justify it — not because they're locked in. The first month is the proof.\"" },
          { obj: "\"I need to think about it / talk to my partner\"", ans: "\"Of course. Can I ask — what's the main thing you need to think through? Is it the budget, or is it more whether this will actually work in your market?\" [Address the specific concern directly.] \"What if we started with a 1,000-call pilot at $200 — no risk, real results, and then we have actual data from your market to make the decision?\"" },
          { obj: "\"Is this legal?\"", ans: "\"Yes — and I'm glad you asked because it's something I take seriously. We've had a TCPA attorney review the entire system. Every call includes an AI disclosure, a remove-me option, and we DNC scrub every single list before the campaign starts. I can share the compliance documentation if you want to review it before we move forward.\"" },
        ].map((o, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G.orange, marginBottom: 6 }}>{o.obj}</div>
            <div style={{ fontSize: 12, color: G.text, lineHeight: 1.85, padding: "10px 14px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 5 }}>{o.ans}</div>
          </div>
        ))}
      </Expand>

      <Expand title="Service Pricing — Three Tiers" accent={G.cyan} badge="SEND AFTER CALL">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { plan: "Starter", calls: "3,000 calls/mo", est: "5–10 qualified leads", price: "$1,500/mo", best: "1–2 zip codes. New agent. Testing the channel.", color: G.cyan },
            { plan: "Growth", calls: "10,000 calls/mo", est: "15–30 qualified leads", price: "$2,500/mo", best: "Established agent. 1–2 target markets. Main prospecting channel.", color: G.gold },
            { plan: "Scale", calls: "30,000 calls/mo", est: "40–80 qualified leads", price: "$5,000/mo", best: "Team or high-volume agent. Multiple markets. Serious volume.", color: G.green },
          ].map((p, i) => (
            <div key={i} style={{ padding: "16px 18px", background: G.panelHi, border: `1px solid ${p.color}25`, borderLeft: `3px solid ${p.color}`, borderRadius: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: p.color }}>{p.plan}</div>
                  <div style={{ fontSize: 11, color: G.mid, marginTop: 4 }}>{p.calls} · Est. {p.est}/month</div>
                  <div style={{ fontSize: 11, color: G.dim, marginTop: 4 }}>Best for: {p.best}</div>
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: p.color, fontFamily: "'Courier New',monospace" }}>{p.price}</div>
              </div>
            </div>
          ))}
          <div style={{ padding: "12px 14px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 5, fontSize: 11, color: G.mid, lineHeight: 1.8 }}>
            ✓ Month-to-month, no setup fee, cancel any time with 30 days notice<br />
            ✓ Includes: lead sourcing, skip tracing, DNC scrubbing, CRM logging, weekly report<br />
            ✓ First calls live within 48 hours of sign-up<br />
            ✓ Dedicated local phone number with agent's city area code
          </div>
        </div>
      </Expand>
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════
export function VapiGuideContent() {
  const [tab, setTab] = useState("roadmap");

  const contentMap = {
    roadmap: <Roadmap />,
    env: <EnvSetup />,
    w1: <Week1 />,
    w2: <Week2 />,
    pitfalls: <Pitfalls />,
    scripts: <Scripts />,
    tech: <TechRef />,
    outreach: <Outreach />,
    close: <CloseClients />,
  };

  return (
    <div style={{ background: G.bg, minHeight: "100vh", fontFamily: "'Courier New', 'JetBrains Mono', monospace", color: G.text, fontSize: 13 }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: #252545; border-radius: 99px; }
        ::-webkit-scrollbar-track { background: transparent; }
        .tab-btn:hover { background: #131328 !important; color: #EEEEFF !important; }
        pre { white-space: pre-wrap; word-break: break-word; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(180deg, #090915 0%, ${G.bg2} 100%)`, borderBottom: `1px solid ${G.border}`, padding: "22px 28px 0", maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 22 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: G.green, boxShadow: `0 0 8px ${G.green}` }} />
              <span style={{ fontSize: 9, fontWeight: 700, color: G.mid, letterSpacing: 3 }}>FULL IMPLEMENTATION GUIDE · VAPI + N8N + POP!_OS</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: G.white, letterSpacing: -0.5, lineHeight: 1.15, marginBottom: 8 }}>
              VAPI REAL ESTATE AI<br />
              <span style={{ color: G.gold, textShadow: `0 0 20px ${G.gold}50` }}>COLD-CALLING AGENCY</span>
            </div>
            <div style={{ fontSize: 11, color: G.mid }}>Pop!_OS · CLI-First · Docker · n8n · Week-by-Week · Every Command Included</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { v: "8", l: "Weeks", c: G.gold },
              { v: "~$400", l: "Start Cost", c: G.green },
              { v: "CLI", l: "Edge", c: G.cyan },
              { v: "$1.5K+", l: "First Client", c: G.gold },
            ].map(s => (
              <div key={s.l} style={{ padding: "10px 14px", background: G.panel, border: `1px solid ${G.border}`, borderRadius: 5, textAlign: "center", minWidth: 68 }}>
                <div style={{ fontFamily: "'Courier New',monospace", fontSize: 18, fontWeight: 900, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 8, fontWeight: 700, color: G.dim, letterSpacing: 1.5, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {TABS.map(t => (
            <button key={t.id} className="tab-btn" onClick={() => setTab(t.id)} style={{
              padding: "10px 16px", fontSize: 9, fontWeight: 900, letterSpacing: 1.5,
              background: tab === t.id ? G.panelHi : "transparent",
              border: "none",
              borderBottom: `2px solid ${tab === t.id ? G.gold : "transparent"}`,
              color: tab === t.id ? G.gold : G.mid,
              cursor: "pointer", borderRadius: "4px 4px 0 0",
              fontFamily: "'Courier New', monospace",
              whiteSpace: "nowrap", transition: "color 0.1s",
            }}>{t.icon} {t.label}</button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "22px 28px" }}>
        {contentMap[tab]}
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "14px 28px 28px", borderTop: `1px solid ${G.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 9, color: G.dim, letterSpacing: 1 }}>VAPI · N8N · TWILIO · DOCKER · POP!_OS · BATCHTSKIPTRACE · DNC.COM</span>
        <span style={{ fontSize: 9, color: G.dim, letterSpacing: 1 }}>WEEK 8 → FIRST CLIENT → $1,500+/MO → SCALE</span>
      </div>
    </div>
  );
}

export default VapiGuideContent;
