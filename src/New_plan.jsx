import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// PROJECT PLAN COLORS (Main App Style)
// ═══════════════════════════════════════════════════════════════
const C = {
  bg: "#06070F", surface: "#0C0E1C", surfaceHigh: "#111428", surfaceHover: "#161930",
  border: "#1E2236", borderHigh: "#2A2E4A",
  amber: "#F5A623", amberGlow: "#F5A62340", amberDim: "#7A5212",
  cyan: "#00D4FF", cyanGlow: "#00D4FF30", cyanDim: "#004D5E",
  green: "#00E676", greenGlow: "#00E67630", greenDim: "#004D1F",
  red: "#FF5252", redGlow: "#FF525230", redDim: "#5C1010",
  purple: "#B39DDB", purpleGlow: "#B39DDB30", purpleDim: "#3B2F6B",
  orange: "#FF7043", orangeDim: "#5C1F0A",
  pink: "#F06292", pinkDim: "#5C0F2A",
  text: "#E8EAF6", textMid: "#9094B0", textDim: "#3E4268", white: "#FFFFFF",
};

// ═══════════════════════════════════════════════════════════════
// VAPI MONEY GUIDE COLORS (Vapi Guide Tab Style)
// ═══════════════════════════════════════════════════════════════
const G = {
  bg: "#080810", bg2: "#0D0D1A", panel: "#111122", panelHi: "#161628",
  border: "#1E1E35", borderHi: "#2A2A4A", gold: "#FFB800", goldDim: "#7A5800",
  goldGlow: "#FFB80030", cyan: "#00E5FF", cyanDim: "#004D5E",
  green: "#00E676", greenDim: "#004D1F", red: "#FF4444", redDim: "#5C0000",
  purple: "#C084FC", orange: "#FF7043", blue: "#3B9EFF",
  text: "#F0F0FF", mid: "#8888AA", dim: "#3A3A5A", white: "#FFFFFF",
};

// ═══════════════════════════════════════════════════════════════
// MAIN APP TABS
// ═══════════════════════════════════════════════════════════════
const TABS = ["Overview", "Learning Path", "Build Plan", "Lead Sourcing", "Business Model", "Costs & ROI", "Feasibility", "Vapi Guide"];

// ═══════════════════════════════════════════════════════════════
// VAPI MONEY GUIDE HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════
function Tag({ children, color = G.gold }) {
  return (
    <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1.5, padding: "2px 8px", borderRadius: 3, background: color + "18", color, border: `1px solid ${color}35`, textTransform: "uppercase", flexShrink: 0 }}>{children}</span>
  );
}

function Panel({ children, accent, style = {} }) {
  return (
    <div style={{ background: G.panel, border: `1px solid ${accent ? accent + "30" : G.border}`, borderLeft: accent ? `3px solid ${accent}` : `1px solid ${G.border}`, borderRadius: 8, padding: "18px 20px", ...style }}>{children}</div>
  );
}

function SectionTitle({ children, accent = G.gold }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
      <div style={{ width: 3, height: 18, background: accent, borderRadius: 2, boxShadow: `0 0 8px ${accent}` }} />
      <span style={{ fontSize: 10, fontWeight: 800, color: accent, letterSpacing: 3, textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

function Expand({ title, children, accent = G.gold, badge }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${open ? accent + "40" : G.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 8 }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", cursor: "pointer", background: open ? G.panelHi : G.panel, transition: "background 0.15s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: G.text }}>{title}</span>
          {badge && <Tag color={accent}>{badge}</Tag>}
        </div>
        <span style={{ color: G.dim, fontSize: 11, transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }}>▾</span>
      </div>
      {open && <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${accent}20` }}><div style={{ marginTop: 14 }}>{children}</div></div>}
    </div>
  );
}

function CodeBlock({ code, label }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ marginTop: 10 }}>
      {label && <div style={{ fontSize: 9, fontWeight: 700, color: G.gold, letterSpacing: 2, marginBottom: 6 }}>{label}</div>}
      <div style={{ position: "relative", background: "#050508", border: `1px solid ${G.borderHi}`, borderRadius: 6, overflow: "hidden" }}>
        <button onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }} style={{ position: "absolute", top: 8, right: 10, background: copied ? G.green + "20" : G.borderHi, border: `1px solid ${copied ? G.green : G.dim}`, color: copied ? G.green : G.mid, fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 4, cursor: "pointer" }}>{copied ? "COPIED" : "COPY"}</button>
        <pre style={{ margin: 0, padding: "14px 16px", fontSize: 11, color: "#C8D0E0", overflowX: "auto", lineHeight: 1.7, fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>{code}</pre>
      </div>
    </div>
  );
}

function DayCard({ day, tasks, accent = G.gold }) {
  return (
    <div style={{ padding: "14px 16px", background: G.panelHi, border: `1px solid ${G.border}`, borderRadius: 8, marginBottom: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: accent, letterSpacing: 2, marginBottom: 10 }}>DAY {day}</div>
      {tasks.map((t, i) => (
        <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: i < tasks.length - 1 ? `1px solid ${G.border}` : "none" }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${accent}50`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: accent + "60" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: G.text, marginBottom: t.detail ? 4 : 0 }}>{t.task}</div>
            {t.detail && <div style={{ fontSize: 11, color: G.mid, lineHeight: 1.6 }}>{t.detail}</div>}
            {t.time && <div style={{ fontSize: 10, color: G.dim, marginTop: 3 }}>⏱ {t.time}</div>}
            {t.link && <div style={{ fontSize: 10, color: G.cyan, marginTop: 3, wordBreak: "break-all" }}>→ {t.link}</div>}
            {t.deliverable && <div style={{ fontSize: 10, marginTop: 5, padding: "4px 8px", background: accent + "0A", border: `1px solid ${accent}20`, borderRadius: 4, color: accent }}>✓ {t.deliverable}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VAPI MONEY GUIDE CONTENT COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Roadmap() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ padding: "20px 24px", background: `linear-gradient(135deg, ${G.gold}10, ${G.cyan}08)`, border: `1px solid ${G.gold}35`, borderRadius: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: G.gold, letterSpacing: 3, marginBottom: 8 }}>THE MISSION</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: G.white, lineHeight: 1.4, marginBottom: 10 }}>
          Build an AI Cold-Calling Service for Real Estate Agents. <span style={{ color: G.gold }}>First client in 7–8 weeks. $1,500–3,000/mo. Recurring.</span>
        </div>
        <div style={{ fontSize: 12, color: G.mid, lineHeight: 1.8 }}>
          You are NOT building a custom voice engine. You are using <span style={{ color: G.cyan }}>Vapi</span> as infrastructure and selling the <span style={{ color: G.gold }}>outcome</span>: qualified seller leads delivered to agents on autopilot. Two CS people can build this in 8 weeks. Here is exactly how.
        </div>
      </div>

      <Panel accent={G.gold}>
        <SectionTitle accent={G.gold}>8-Week Timeline</SectionTitle>
        {[
          { week: "Week 1", title: "Learn Vapi. Build first agent. Write real estate script.", milestone: "Working agent that answers calls", color: G.cyan, phase: "LEARN" },
          { week: "Week 2", title: "Complete n8n course. Connect Vapi → n8n webhook. Automate first workflow.", milestone: "Call ends → data logged automatically", color: G.purple, phase: "LEARN" },
          { week: "Week 3", title: "Real estate tutorial. Twilio number. Scrape 200 free leads. Skip trace.", milestone: "200 leads with phone numbers ready", color: G.green, phase: "BUILD" },
          { week: "Week 4", title: "Full automation pipeline. CRM logging. DNC scrub. Time zone gating.", milestone: "Legally compliant calling pipeline live", color: G.gold, phase: "BUILD" },
          { week: "Weeks 5–6", title: "Run first 100-call campaign. Analyze. Refine script. Dashboard.", milestone: "3–10 booked appointments from real homeowners", color: G.orange, phase: "LAUNCH" },
          { week: "Weeks 7–8", title: "Pitch to 20 real estate agents. Use campaign results as proof. Close first client.", milestone: "First paying client: $1,500–3,000/mo", color: G.green, phase: "SELL" },
        ].map((row, i) => (
          <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 0", borderBottom: i < 5 ? `1px solid ${G.border}` : "none" }}>
            <div style={{ width: 70, flexShrink: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: row.color, letterSpacing: 1 }}>{row.week}</div>
              <Tag color={row.color}>{row.phase}</Tag>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: G.text, marginBottom: 5 }}>{row.title}</div>
              <div style={{ fontSize: 11, color: G.gold }}>✓ Milestone: {row.milestone}</div>
            </div>
          </div>
        ))}
      </Panel>

      <Panel accent={G.cyan}>
        <SectionTitle accent={G.cyan}>The System You're Building — End to End</SectionTitle>
        <div style={{ fontSize: 12, color: G.mid, lineHeight: 1.9, marginBottom: 14 }}>
          Every component listed below has a specific job. Nothing is optional except GoHighLevel (you can use Google Sheets early on to save $97/mo).
        </div>
        {[
          { tool: "Vapi", job: "Makes the actual AI phone calls. Handles the voice, LLM, and call management. You write the system prompt — Vapi does the rest.", cost: "~$0.07/min", color: G.cyan },
          { tool: "Twilio", job: "Provides the phone number your agents call FROM. Vapi routes through it. You need a real number per client.", cost: "$1/num + $0.013/min", color: G.green },
          { tool: "n8n (self-hosted)", job: "The brain that connects everything. When a call ends, n8n fires: logs to CRM, texts the agent, books calendar, sends SMS. All automatic.", cost: "$0 (pay $20/mo VPS)", color: G.gold },
          { tool: "Python scraper + BeautifulSoup", job: "Scrapes Zillow FSBO, Craigslist, Facebook Marketplace listings into a CSV. Free lead pipeline.", cost: "$0", color: G.purple },
          { tool: "BatchSkipTracing API", job: "Takes name + address → returns phone number. Connected to n8n. Runs automatically on every new lead.", cost: "$0.15–0.18/record", color: G.orange },
          { tool: "DNC.com / Telnyx API", job: "Checks every number against National Do-Not-Call registry before dialing. Non-negotiable legal protection.", cost: "$25–50/mo", color: G.red },
          { tool: "Google Sheets or GoHighLevel", job: "CRM. Stores every call outcome, transcript, lead status. Agents see their pipeline live.", cost: "$0 or $97/mo", color: G.blue },
          { tool: "Calendly", job: "When AI qualifies a seller, it books directly into agent's calendar. Automatic appointment confirmation.", cost: "$0 free tier", color: G.cyan },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "10px 0", borderBottom: i < 7 ? `1px solid ${G.border}` : "none" }}>
            <div style={{ minWidth: 120 }}><span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.tool}</span></div>
            <div style={{ flex: 1, fontSize: 11, color: G.mid, lineHeight: 1.6 }}>{s.job}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: G.gold, minWidth: 80, textAlign: "right" }}>{s.cost}</div>
          </div>
        ))}
      </Panel>

      <Panel accent={G.green}>
        <SectionTitle accent={G.green}>The Money Path — Week by Week Revenue</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {[
            { period: "Weeks 1–4", rev: "$0", note: "Building. Zero revenue. Normal.", color: G.mid },
            { period: "Weeks 5–6", rev: "$0–500", note: "Testing. May run for a small agent for free as proof.", color: G.orange },
            { period: "Week 7–8", rev: "$1,500+", note: "First paying client closes. Break-even achieved.", color: G.green },
            { period: "Month 3", rev: "$4,000–8,000", note: "2–3 clients. Referrals starting. You're a business.", color: G.gold },
          ].map((s, i) => (
            <div key={i} style={{ padding: "14px 16px", background: G.panelHi, border: `1px solid ${s.color}25`, borderRadius: 8, textAlign: "center" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: G.dim, letterSpacing: 1.5, marginBottom: 6 }}>{s.period}</div>
              <div style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 800, color: s.color, marginBottom: 6 }}>{s.rev}</div>
              <div style={{ fontSize: 10, color: G.mid, lineHeight: 1.5 }}>{s.note}</div>
            </div>
          ))}
        </div>
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Panel accent={G.red}>
          <SectionTitle accent={G.red}>⚠️ Non-Negotiables (Don't Skip)</SectionTitle>
          {[
            "Get a TCPA compliance review from a lawyer ($200–500) before your first live campaign",
            "DNC scrub EVERY list before calling. $500–1,500 fine per illegal call",
            "Only call 8am–9pm in the recipient's LOCAL time zone — not yours",
            "Your AI agent must announce it is AI and disclose call recording at the start of every call",
            "Add 'Press 2 to be removed from our list' to every call and actually remove people",
            "Never use a spoofed or fake caller ID — federal law violation",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: i < 5 ? `1px solid ${G.border}` : "none", fontSize: 11, color: G.mid }}>
              <span style={{ color: G.red, fontWeight: 800, flexShrink: 0 }}>!</span>{item}
            </div>
          ))}
        </Panel>
        <Panel accent={G.gold}>
          <SectionTitle accent={G.gold}>✦ Mindset — How to Win</SectionTitle>
          {[
            "You are selling RESULTS (qualified leads), not technology",
            "One real estate deal = $5,000–15,000 commission. Your $3,500/mo service = cheap to them",
            "Your first 100 calls are research, not sales. Learn what homeowners say",
            "Script v1 will suck. Script v10 will convert. Update it every week",
            "The goal by week 8 is ONE paying client. Not ten. One",
            "Use your own campaign as a case study — 'We called 200 homeowners and booked 7 appointments'",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: i < 5 ? `1px solid ${G.border}` : "none", fontSize: 11, color: G.mid }}>
              <span style={{ color: G.gold, fontWeight: 800, flexShrink: 0 }}>→</span>{item}
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}

function Week1() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.cyan + "0C", border: `1px solid ${G.cyan}30`, borderRadius: 8, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.cyan, fontWeight: 700 }}>Week 1 Goal: </span>
        Understand Vapi. Create a working voice agent. Write your first real estate script. By Friday you should be able to call your own phone and have the AI hold a real 2-minute conversation.
      </div>
      <DayCard day="1" accent={G.cyan} tasks={[
        { task: "Create Vapi account at vapi.ai", detail: "Sign up free. No credit card needed for the trial. You get free minutes.", time: "15 min", link: "https://vapi.ai", deliverable: "Account created, dashboard open" },
        { task: "Read the Vapi Quickstart docs end to end", detail: "Don't skip anything. Read about Assistants, Phone Numbers, Calls, and Webhooks sections. Take notes on what each object does.", time: "1.5 hrs", link: "https://docs.vapi.ai/assistants/quickstart", deliverable: "You understand: Assistant, Phone Number, Call objects" },
        { task: "Create your first Vapi Assistant via the dashboard (no code)", detail: "Use the dashboard UI. Set voice to 'Alloy' or 'Nova'. Write a simple system prompt: 'You are a helpful assistant. Say hello and ask how you can help.' Test it.", time: "45 min", deliverable: "Assistant created and visible in dashboard" },
      ]} />
      <DayCard day="2" accent={G.cyan} tasks={[
        { task: "Watch the 15-minute voice agent tutorial", link: "https://www.youtube.com/watch?v=VNdF3B6-tyQ", time: "15 min + 30 min practice", deliverable: "Agent answers your phone and holds a basic conversation" },
        { task: "Add a Twilio phone number to Vapi (free trial number)", detail: "Go to Twilio → create account → buy a trial number ($0 with trial credit). Import it into Vapi under Phone Numbers. Test an outbound call to yourself.", time: "1 hr", deliverable: "Real phone number connected. Call rings your phone." },
        { task: "Read Vapi docs: System Prompts and Functions", detail: "Understanding how system prompts control the AI's behavior is 70% of the job. Read the entire prompting guide.", link: "https://docs.vapi.ai/prompting-guide", time: "1 hr", deliverable: "You understand how to control AI behavior via system prompts" },
      ]} />
      <DayCard day="3-4" accent={G.cyan} tasks={[
        { task: "Write Real Estate Script v1 (see Scripts tab for full template)", detail: "Use the template in the Scripts tab. Customize: add your city name, make it sound natural when you read it aloud. Test it by reading it yourself 10 times.", time: "3–4 hrs", deliverable: "Script covering: intro → qualify → 5 objections → book → end" },
        { task: "Enter your script into Vapi as an Assistant system prompt", detail: "Copy the script into Vapi's system prompt field. Add END_CALL instructions. Test by calling your own phone 20 times from different angles.", time: "2 hrs", deliverable: "Agent uses your script in real calls" },
        { task: "List every way a homeowner can respond and add handling", detail: "Think of: 'I'm not interested', 'I already have an agent', 'How much will you pay?', 'Who is this?', 'Is this AI?'. Add handling for each in the script.", time: "2 hrs", deliverable: "Script handles at least 8 common objections" },
      ]} />
      <DayCard day="5-7" accent={G.cyan} tasks={[
        { task: "Install n8n locally (free) using Docker or npm", detail: "Instructions: npm install n8n -g then n8n start. Or use Docker: docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n", time: "1 hr", link: "https://docs.n8n.io/hosting/installation/npm/", deliverable: "n8n running at localhost:5678" },
        { task: "Create your first n8n workflow: HTTP Trigger → Log to Google Sheet", detail: "Add an 'HTTP Request' trigger node. Add a 'Google Sheets' node. Connect them. Test by sending a POST request to the webhook URL.", time: "2 hrs", deliverable: "POST request → row appears in Google Sheet automatically" },
        { task: "Read: What is a webhook? How Vapi uses webhooks.", detail: "Go to Vapi docs → Webhooks. Understand the events: call.started, call.ended, transcript. You will be receiving these from Vapi in your n8n workflow.", link: "https://docs.vapi.ai/server-url", time: "45 min", deliverable: "You understand the Vapi → n8n data flow" },
        { task: "Plan Week 2: write out what you want your automation to do", detail: "Write a simple flowchart: Call ends → n8n receives data → IF interested = YES → log to CRM + text agent → IF NO → log as not interested. You'll build this in Week 2.", time: "30 min", deliverable: "Flowchart written" },
      ]} />
      <Panel accent={G.gold} style={{ marginTop: 8 }}>
        <SectionTitle accent={G.gold}>Week 1 Checkpoint</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { item: "Vapi account + first assistant created", done: true },
            { item: "Phone number connected to Vapi", done: true },
            { item: "AI answers your call using your script", done: true },
            { item: "n8n installed and first workflow works", done: true },
            { item: "Script v1 written with 8+ objection handlers", done: true },
            { item: "Understand: Assistant, Phone Number, Webhook objects", done: true },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 10, fontSize: 12, color: G.text, padding: "7px 10px", background: G.panelHi, borderRadius: 6 }}>
              <span style={{ color: G.green }}>□</span>{c.item}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function Week2() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.purple + "0C", border: `1px solid ${G.purple}30`, borderRadius: 8, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.purple, fontWeight: 700 }}>Week 2 Goal: </span>
        Complete the full Vapi + n8n course. Connect Vapi webhooks to n8n. By end of week, a call should end and n8n should automatically log the result — with zero manual work.
      </div>
      <DayCard day="1-3" accent={G.purple} tasks={[
        { task: "Watch the full Vapi + n8n beginner course (8–12 hrs total)", detail: "Do NOT try to do this in one day. Watch 3–4 hours per day. Pause and implement each section as you go. Don't just watch.", time: "8–12 hrs total", link: "https://www.youtube.com/watch?v=kpzExuG4CIs", deliverable: "Understand full architecture: Vapi → webhook → n8n → output" },
        { task: "While watching: build each workflow the instructor shows", detail: "Every time the instructor builds a workflow, pause and build the same thing yourself. Don't move on until yours works.", time: "Parallel with above", deliverable: "3+ working n8n workflows built during course" },
      ]} />
      <DayCard day="4-5" accent={G.purple} tasks={[
        { task: "Connect your Vapi assistant to your n8n webhook", detail: "In Vapi: go to your Assistant → Server URL → paste your n8n webhook URL. In n8n: add Webhook trigger. Make a test call. n8n should receive the call data.", time: "2–3 hrs", deliverable: "Test call made → n8n workflow triggers → you see data" },
        { task: "Parse the Vapi webhook payload in n8n", detail: "The payload contains: call outcome, transcript, caller number, duration, end reason. Add a 'Code' node in n8n to extract: was the call answered? What was said? Was the person interested?", time: "2 hrs", deliverable: "n8n correctly extracts call outcome from Vapi payload" },
      ]} />
      <Panel accent={G.cyan} style={{ margin: "4px 0" }}>
        <SectionTitle accent={G.cyan}>The Vapi Webhook Payload — What It Looks Like</SectionTitle>
        <CodeBlock label="VAPI CALL ENDED WEBHOOK PAYLOAD (SIMPLIFIED)" code={`{
  "message": {
    "type": "end-of-call-report",
    "call": {
      "id": "call_abc123",
      "status": "ended",
      "endedReason": "assistant-ended-call",
      "duration": 94.3,
      "phoneNumber": "+15551234567"
    },
    "transcript": "AI: Hi, is this John? ... Owner: Yes who's this? ... ",
    "summary": "Owner John at 123 Main St. Said he might consider selling in 6 months if price right. Asked for callback. INTERESTED.",
    "analysis": {
      "structuredData": {
        "interested": true,
        "timeline": "6 months",
        "ownerName": "John",
        "callbackRequested": true
      }
    }
  }
}`} />
        <CodeBlock label="N8N CODE NODE — EXTRACT LEAD DATA" code={`// In n8n Code node (JavaScript)
const payload = $input.item.json.body.message;
const call = payload.call;
const analysis = payload.analysis?.structuredData || {};
return [{
  json: {
    phoneNumber: call.phoneNumber,
    duration: call.duration,
    transcript: payload.transcript,
    summary: payload.summary,
    interested: analysis.interested || false,
    ownerName: analysis.ownerName || "Unknown",
    timeline: analysis.timeline || "Unknown",
    callbackRequested: analysis.callbackRequested || false,
    timestamp: new Date().toISOString(),
    callId: call.id
  }
}];`} />
      </Panel>
      <DayCard day="6-7" accent={G.purple} tasks={[
        { task: "Build the full call logging workflow in n8n", detail: "Workflow: Webhook trigger → Code node (extract data) → IF node (interested = true?) → Google Sheets (log all calls) + Twilio SMS (alert agent if interested)", time: "3–4 hrs", deliverable: "Call ends → CRM row created → agent texted if lead is hot" },
        { task: "Test 30 times with real calls to your own number", detail: "Make 30 test calls. Confirm every single one logs correctly. Check the Google Sheet. Confirm the agent SMS fires only when the AI detects interest.", time: "1–2 hrs", deliverable: "30/30 calls correctly logged. SMS fires on interested leads." },
        { task: "Document your workflow with notes/comments", detail: "Add sticky notes in n8n explaining what each node does. This will save hours when debugging later or showing a client.", time: "30 min", deliverable: "Workflow documented. You can explain it in 2 minutes." },
      ]} />
    </div>
  );
}

function Week3() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.green + "0C", border: `1px solid ${G.green}30`, borderRadius: 8, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.green, fontWeight: 700 }}>Week 3 Goal: </span>
        Real estate-specific agent working. 200 real leads scraped for free. Phone numbers attached via skip tracing. By end of week you can dial 200 real homeowners.
      </div>
      <DayCard day="1-2" accent={G.green} tasks={[
        { task: "Watch Real Estate Lead-Qualifier Vapi tutorial", link: "https://www.youtube.com/watch?v=0FFX_Z2w-qI", time: "3–4 hrs", detail: "Study how they structure the conversation flow. Notice when and how they detect interest. Copy the structure — not the words.", deliverable: "Real-estate specific assistant built and tested" },
        { task: "Rebuild your assistant with structured data extraction", detail: "Vapi can extract structured data from calls automatically. Add this to your assistant configuration to pull: interested (boolean), timeline, seller name, property address, best callback time.", time: "2 hrs", deliverable: "Assistant returns structured lead data on every call" },
      ]} />
      <Panel accent={G.cyan} style={{ margin: "4px 0" }}>
        <SectionTitle accent={G.cyan}>Vapi Assistant Config — Structured Data Extraction</SectionTitle>
        <CodeBlock label="VAPI ASSISTANT JSON (KEY SECTIONS)" code={`{
  "name": "Sarah - Real Estate Lead Qualifier",
  "model": {
    "provider": "openai",
    "model": "gpt-4o-mini",
    "systemPrompt": "You are Sarah, a friendly assistant who helps connect homeowners with real estate investors in their area. [FULL SCRIPT - see Scripts tab]. After the call, extract structured data."
  },
  "voice": {
    "provider": "11labs",
    "voiceId": "21m00Tcm4TlvDq8ikWAM"
  },
  "analysisPlan": {
    "structuredDataPrompt": "Extract from this call transcript: 1) Is the owner interested in selling? (true/false) 2) What is their timeline? 3) What is the owner's name? 4) Did they request a callback? 5) What price range are they thinking?",
    "structuredDataSchema": {
      "type": "object",
      "properties": {
        "interested": { "type": "boolean" },
        "timeline": { "type": "string" },
        "ownerName": { "type": "string" },
        "callbackRequested": { "type": "boolean" },
        "priceRange": { "type": "string" }
      }
    }
  },
  "endCallFunctionEnabled": true,
  "endCallMessage": "Thanks so much for your time. Have a great day!",
  "serverUrl": "YOUR_N8N_WEBHOOK_URL"
}`} />
      </Panel>
      <DayCard day="3" accent={G.green} tasks={[
        { task: "Buy a Twilio phone number for your first 'client' (yourself)", detail: "Go to Twilio Console → Phone Numbers → Buy a Number. Search for a local area code in your target city. $1/month. Import into Vapi.", time: "30 min", deliverable: "Local phone number active and calling from your city" },
        { task: "Set up outbound calling via Vapi API", detail: "Use the Vapi /call/phone endpoint to programmatically start calls. Test with curl command.", time: "1.5 hrs", deliverable: "You can trigger a call to any number via API. This is how n8n will dial leads." },
      ]} />
      <Panel accent={G.gold} style={{ margin: "4px 0" }}>
        <SectionTitle accent={G.gold}>Free Lead Scraping — Python Script</SectionTitle>
        <CodeBlock label="ZILLOW FSBO SCRAPER — SAVE AS zillow_scraper.py" code={`import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import json

headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
}

def scrape_zillow_fsbo(city, state, pages=3):
  leads = []
  city_slug = city.lower().replace(' ', '-')
  for page in range(1, pages + 1):
    url = f"https://www.zillow.com/{city_slug}-{state.lower()}/fsbo/{page}_p/"
    try:
      resp = requests.get(url, headers=headers, timeout=10)
      soup = BeautifulSoup(resp.content, 'html.parser')
      scripts = soup.find_all('script', type='application/json')
      for script in scripts:
        try:
          data = json.loads(script.string)
          listings = (data.get('props', {})
                         .get('pageProps', {})
                          .get('searchPageState', {})
                         .get('cat1', {})
                         .get('searchResults', {})
                          .get('listResults', []))
          for listing in listings:
            leads.append({
              'address': listing.get('address', ''),
              'city': city,
              'state': state,
              'zip': listing.get('addressZipcode', ''),
              'price': listing.get('price', ''),
              'beds': listing.get('beds', ''),
              'baths': listing.get('baths', ''),
              'days_on_market': listing.get('hdpData', {}).get('homeInfo', {}).get('daysOnZillow', ''),
              'listing_url': 'https://zillow.com' + listing.get('detailUrl', ''),
              'owner_name': '',
              'phone': '',
              'source': 'Zillow FSBO',
            })
        except: pass
      print(f"Page {page}: Found {len(leads)} total leads so far")
      time.sleep(2)
    except Exception as e:
      print(f"Error on page {page}: {e}")
  return leads

def save_leads(leads, filename='leads_raw.csv'):
  df = pd.DataFrame(leads)
  df.drop_duplicates(subset=['address'], inplace=True)
  df.to_csv(filename, index=False)
  print(f"Saved {len(df)} unique leads to {filename}")
  return df

# USAGE:
# pip install requests beautifulsoup4 pandas
# leads = scrape_zillow_fsbo("Phoenix", "AZ", pages=5)
# save_leads(leads, "phoenix_fsbo_leads.csv")`} />
      </Panel>
      <DayCard day="4-5" accent={G.green} tasks={[
        { task: "Run the scraper on 3 cities in your target market", detail: "Install dependencies: pip install requests beautifulsoup4 pandas. Run the scraper on 3 cities. Target mid-size cities (200K–800K population) for less competition. Export to CSV.", time: "2 hrs", deliverable: "200+ FSBO leads with addresses in a CSV file" },
        { task: "Supplement with Facebook Marketplace and Craigslist (manual)", detail: "Spend 2 hours manually copying listings from Facebook Marketplace → Homes for Sale and Craigslist → Housing → For Sale By Owner in your target city. Add to the same CSV.", time: "2 hrs", deliverable: "CSV now has 300+ leads total" },
      ]} />
      <Panel accent={G.purple} style={{ margin: "4px 0" }}>
        <SectionTitle accent={G.purple}>Skip Tracing — Get Phone Numbers via n8n</SectionTitle>
        <CodeBlock label="N8N HTTP REQUEST NODE — BATCHSKIPTRACING API" code={`// In n8n HTTP Request node:
// Method: POST
// URL: https://api.batchskiptracing.com/api/search
// Auth: API Key header
// Body (JSON):
{
  "firstName": "{{ $json.owner_first_name }}",
  "lastName": "{{ $json.owner_last_name }}",
  "address": "{{ $json.address }}",
  "city": "{{ $json.city }}",
  "state": "{{ $json.state }}",
  "zip": "{{ $json.zip }}"
}
// Response will include:
// phones: [{ phoneNumber: "+15551234567", lineType: "mobile", carrier: "Verizon" }]
// Append best phone to your lead record`} />
        <CodeBlock label="N8N WORKFLOW: CSV → SKIP TRACE → CLEANED LEAD LIST" code={`// Workflow structure:
// 1. Read CSV node (your scraped leads file)
// 2. Loop Over Items node
// 3. HTTP Request → BatchSkipTracing API
// 4. Code node: extract best phone number
// 5. IF node: phone found?
//    YES → Append to "ready_to_call" Google Sheet
//    NO  → Append to "no_phone_found" sheet
// 6. Wait 0.5s between requests (rate limit)
// Expected results:
// 300 leads in → ~195 get phone numbers → ~160 after DNC scrub`} />
      </Panel>
      <DayCard day="6-7" accent={G.green} tasks={[
        { task: "Sign up for BatchSkipTracing and trace your full lead list", link: "https://batchskiptracing.com", detail: "Sign up, buy credits ($30–45 for 200 records). Use n8n to automate the tracing or upload the CSV directly to their portal. Get phone numbers appended.", time: "2–3 hrs", deliverable: "Phone numbers attached to 120–180 of your 200+ leads" },
        { task: "Set up DNC scrubbing n8n workflow", detail: "Use DNC.com API or manually check the National DNC Registry. In n8n: after skip trace → check DNC → IF on DNC → flag as DO_NOT_CALL → else → move to ready_to_call list.", time: "2–3 hrs", deliverable: "Lead list is DNC-scrubbed. Only legal numbers remain." },
        { task: "Create the 'Ready to Call' Google Sheet with all required columns", detail: "Columns: FirstName, LastName, Phone, Address, City, State, Source, DateAdded, CallStatus (new/called/interested/dnc), Notes, TranscriptURL", time: "30 min", deliverable: "CRM Google Sheet ready for first campaign" },
      ]} />
    </div>
  );
}

function Week4() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.gold + "0C", border: `1px solid ${G.gold}30`, borderRadius: 8, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.gold, fontWeight: 700 }}>Week 4 Goal: </span>
        Full production-ready pipeline. Every legal and technical safeguard in place. By Friday you should be able to press GO and have 100 calls run automatically with zero manual steps.
      </div>
      <DayCard day="1-2" accent={G.gold} tasks={[
        { task: "Watch advanced n8n automation course", link: "https://www.youtube.com/watch?v=BCGzStFltQw", time: "4–6 hrs", detail: "Focus specifically on: error handling, retries, IF/Switch logic, looping over lists, HTTP requests with auth. These are what you'll use most.", deliverable: "Comfortable building complex n8n workflows" },
        { task: "Build the outbound calling trigger workflow in n8n", detail: "Goal: read from your Google Sheet → for each lead → check time zone → check DNC → trigger Vapi API call. This single workflow runs your entire campaign.", time: "3–4 hrs", deliverable: "n8n can trigger Vapi calls for a list of 10 test numbers" },
      ]} />
      <Panel accent={G.orange} style={{ margin: "4px 0" }}>
        <SectionTitle accent={G.orange}>Time Zone Gating — Critical Legal Protection</SectionTitle>
        <CodeBlock label="N8N CODE NODE — TIME ZONE CHECK BEFORE CALLING" code={`// This runs BEFORE each call is made
// Input: lead's area code or full phone number
// Output: isLegalToCall (true/false)
const phoneNumber = $json.phone;
const areaCode = phoneNumber.slice(2, 5);
const areaCodeTimezones = {
  '212': 'America/New_York', '718': 'America/New_York', '917': 'America/New_York',
  '404': 'America/New_York', '305': 'America/New_York', '617': 'America/New_York',
  '312': 'America/Chicago', '214': 'America/Chicago', '713': 'America/Chicago',
  '612': 'America/Chicago', '504': 'America/Chicago',
  '602': 'America/Denver', '720': 'America/Denver', '801': 'America/Denver',
  '213': 'America/Los_Angeles', '310': 'America/Los_Angeles', '415': 'America/Los_Angeles',
  '503': 'America/Los_Angeles', '206': 'America/Los_Angeles',
};
const tz = areaCodeTimezones[areaCode] || 'America/New_York';
const now = new Date();
const localTime = new Date(now.toLocaleString('en-US', { timeZone: tz }));
const hour = localTime.getHours();
const day = localTime.getDay();
const isLegal = hour >= 8 && hour < 21;
return [{
  json: {
    ...$json,
    timezone: tz,
    localHour: hour,
    isLegalToCall: isLegal,
    reason: isLegal ? 'Within calling hours' : \`Outside hours (local time: \${hour}:00)\`
  }
}];`} />
      </Panel>
      <DayCard day="3-4" accent={G.gold} tasks={[
        { task: "Build full CRM logging workflow (call end → sheets update)", detail: "When call ends: 1) Update lead row in Google Sheet with outcome 2) If interested=true → create new row in 'Hot Leads' sheet 3) Log transcript to Google Drive folder", time: "3–4 hrs", deliverable: "Every call result logged automatically to correct sheet" },
        { task: "Build agent notification workflow (SMS + email)", detail: "When a hot lead is found: 1) Twilio SMS to agent with lead name, phone, and what they said 2) Email with full transcript 3) Create follow-up task in CRM.", time: "2 hrs", deliverable: "Agent gets SMS within 60 seconds of a hot lead being found" },
        { task: "Set up Calendly integration", detail: "Create a Calendly account. Add your agent's calendar. In n8n: when hot lead found → send Calendly booking link via SMS to both agent and lead.", time: "1.5 hrs", deliverable: "Hot leads receive booking link automatically" },
      ]} />
      <DayCard day="5-7" accent={G.gold} tasks={[
        { task: "Build the voicemail drop system", detail: "Record a 15-second voicemail. In n8n: if call = no answer after 2 attempts → trigger Twilio voicemail drop.", time: "2–3 hrs", deliverable: "Voicemail drops automatically on no-answer leads" },
        { task: "Build the SMS follow-up sequence for interested leads", detail: "After a hot lead call: SMS #1 immediately, SMS #2 after 24 hrs if no callback. Use Twilio + n8n delay node.", time: "2 hrs", deliverable: "Automated SMS follow-up on hot leads" },
        { task: "Full end-to-end test: run 20 calls through the complete pipeline", detail: "Load 20 test numbers. Run them through the complete pipeline. Verify: calls fired → logged → hot leads texted → voicemails dropped → sheets updated.", time: "2 hrs", deliverable: "20/20 test calls completed with zero manual intervention" },
        { task: "Get TCPA legal review", detail: "Search 'TCPA attorney' + your state. Send them your system overview + script. Budget $200–500.", time: "Schedule call", deliverable: "Legal green light to run live campaigns" },
      ]} />
    </div>
  );
}

function Week56() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.orange + "0C", border: `1px solid ${G.orange}30`, borderRadius: 8, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.orange, fontWeight: 700 }}>Weeks 5–6 Goal: </span>
        Run your first 100-call live campaign. Get REAL results you can show to agents. This is where you generate your case study — the proof that makes selling easy.
      </div>
      <DayCard day="Week 5, Mon–Tue" accent={G.orange} tasks={[
        { task: "PropStream $1 trial — pull 500 real FSBO + expired leads", link: "https://propstream.com", detail: "Sign up for the $1/7-day trial. Filter: For Sale By Owner + Expired Listings + your target city. Export as CSV with owner name, address, phone if available.", time: "2 hrs", deliverable: "500 fresh leads exported from PropStream" },
        { task: "Skip trace the batch via BatchSkipTracing", detail: "Upload CSV to BatchSkipTracing portal. Pay ~$60–90 for 500 records. Download results. You should get phones on 350–400 of the 500.", time: "1 hr (mostly waiting)", deliverable: "350–400 phone numbers attached to leads" },
        { task: "DNC scrub + time zone tag the full batch", detail: "Run through your n8n DNC workflow. Tag each lead's timezone. Remove DNC leads. You should have ~280–350 clean, legal, callable leads.", time: "30 min (automated)", deliverable: "Clean callable list of 280–350 leads ready to dial" },
      ]} />
      <DayCard day="Week 5, Wed–Fri" accent={G.orange} tasks={[
        { task: "Launch your first 100-call campaign (test run)", detail: "Start with 100 calls — not all 350. This is a test. Load the first 100 into n8n. Schedule calls to run between 10am–6pm local time.", time: "Setup: 1 hr, Calls: 1 day", deliverable: "100 calls made, results logged to Google Sheet" },
        { task: "Monitor every call in real time for the first 20", detail: "In Vapi dashboard you can watch calls live. Listen to how homeowners respond. Note exactly where the script loses them.", time: "1–2 hrs", deliverable: "10+ new objections documented for script update" },
        { task: "Expected results from 100 calls (be prepared)", detail: "Answer rate: 20–35 calls answered. Interest rate: 3–8 qualified leads from answered calls. Appointments: 1–3 booked. This is NORMAL for a first campaign.", time: "Reviewing", deliverable: "1–3 booked appointments from first 100 calls" },
      ]} />
      <Panel accent={G.green} style={{ margin: "4px 0" }}>
        <SectionTitle accent={G.green}>Your Case Study — How to Document This</SectionTitle>
        <div style={{ fontSize: 12, color: G.mid, lineHeight: 1.9, marginBottom: 12 }}>
          After your 100-call campaign, write down these exact numbers. This becomes your pitch to agents.
        </div>
        {[
          { metric: "Total calls attempted", example: "100", why: "Shows volume and scale" },
          { metric: "Total calls answered", example: "28", why: "Industry benchmark (20–35% is normal)" },
          { metric: "Total qualified leads (showed interest)", example: "6", why: "Core value metric — what agents buy" },
          { metric: "Appointments booked", example: "3", why: "The highest-value metric — agents love this" },
          { metric: "Total cost", example: "$12 (Vapi) + $36 (skip trace) = $48", why: "Shows incredible ROI vs human callers" },
          { metric: "Cost per qualified lead", example: "$8", why: "Human callers charge $100–300 per lead" },
          { metric: "Turnaround time", example: "Same day", why: "Impossible with human teams" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: i < 6 ? `1px solid ${G.border}` : "none", flexWrap: "wrap" }}>
            <div style={{ minWidth: 200, fontSize: 12, fontWeight: 600, color: G.text }}>{r.metric}</div>
            <div style={{ minWidth: 120, fontSize: 12, fontWeight: 700, color: G.green }}>{r.example}</div>
            <div style={{ fontSize: 11, color: G.mid, flex: 1 }}>{r.why}</div>
          </div>
        ))}
        <div style={{ marginTop: 14, padding: "12px 16px", background: G.green + "0A", border: `1px solid ${G.green}25`, borderRadius: 8 }}>
          <span style={{ color: G.green, fontWeight: 700, fontSize: 12 }}>The pitch: </span>
          <span style={{ fontSize: 12, color: G.mid }}>"We ran a 100-call test campaign for a FSBO list in [City]. 28 homeowners answered. 6 expressed real interest in selling. 3 booked appointments. Cost: $48 total. A human caller would charge $300–1,800 for the same result and take 2 weeks."</span>
        </div>
      </Panel>
      <DayCard day="Week 6" accent={G.orange} tasks={[
        { task: "Run your second 200-call campaign with script v2", detail: "Use what you learned from week 5 to update your script. Fix every objection that stumped the AI. Then run 200 more calls.", time: "Setup: 2 hrs, Calls: 2 days", deliverable: "Script v2 results vs v1 — document the improvement" },
        { task: "Build the live Google Sheets conversion dashboard", detail: "Create a Google Sheet with live formulas showing: Calls Made, Answered Rate, Interested Rate, Booked Rate, Cost Per Lead.", time: "2–3 hrs", deliverable: "Live dashboard showing campaign performance" },
        { task: "Set up call recording storage", detail: "In n8n: when call ends → download recording URL from Vapi → save to Google Drive folder named by date + lead phone.", time: "1.5 hrs", deliverable: "100% of calls have recording stored in Drive" },
        { task: "Review 20 worst-performing calls and update script", detail: "Open your recordings. Listen to calls where the homeowner hung up quickly. Find the EXACT line that lost them. Fix it.", time: "2 hrs", deliverable: "Script v3 with measurably better opening hook" },
        { task: "Compile your full case study document (1 page)", detail: "Write a clean 1-page PDF: what you built, campaign results, cost breakdown, comparison to human callers.", time: "2 hrs", deliverable: "1-page case study ready to send to agents" },
      ]} />
    </div>
  );
}

function Week78() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.green + "0C", border: `1px solid ${G.green}30`, borderRadius: 8, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.green, fontWeight: 700 }}>Weeks 7–8 Goal: </span>
        Close your first paying client. One client at $1,500–3,000/month breaks even and proves the business is real. Everything else is growth.
      </div>
      <DayCard day="Week 7, Mon–Wed" accent={G.green} tasks={[
        { task: "Build your client acquisition target list — 30 real estate agents", detail: "Search: '[your city] top real estate agents', Zillow Premier Agent listings, Instagram hashtags. Find 30 agents who are actively posting about finding sellers.", time: "3 hrs", deliverable: "Spreadsheet: 30 agents with IG/LinkedIn + email + phone" },
        { task: "Create your service offer document (see Close Clients tab)", detail: "One clean page: what you offer, expected results, pricing. Three tiers. Simple language. No tech jargon.", time: "2 hrs", deliverable: "Service offer PDF ready to send" },
        { task: "Set up your outreach sequences (see Outreach tab)", detail: "Prepare 3 outreach templates: Instagram DM, cold email, LinkedIn message. Personalize each one with the agent's name and city.", time: "2 hrs", deliverable: "3 outreach templates personalized for your top 10 targets" },
      ]} />
      <DayCard day="Week 7, Thu–Sun" accent={G.green} tasks={[
        { task: "Send outreach to your top 20 agents", detail: "Send Instagram DM to 10 agents. Send cold email to 10 agents. Personalize every single message with their name, recent listing, or something specific.", time: "3–4 hrs", deliverable: "20 outreach messages sent, 3–6 responses expected" },
        { task: "Join 3 real estate investor Facebook groups in your city", detail: "Search Facebook: '[city] real estate investors', '[city] REIA'. Join and lurk for 2–3 days. Then post your case study as a story.", time: "1 hr setup, ongoing", deliverable: "Member of 3 groups, value post planned" },
        { task: "Post your campaign results on LinkedIn (your own profile)", detail: "Write a post: 'We ran an AI calling campaign targeting homeowners who might want to sell. 100 calls, 3 appointments booked, $48 total cost.'", time: "1 hr", deliverable: "LinkedIn post published with real numbers" },
      ]} />
      <DayCard day="Week 8" accent={G.green} tasks={[
        { task: "Take every sales call that comes in (expect 3–8 this week)", detail: "Use the closing script in the Close Clients tab. Your goal is ONE yes. Not ten.", time: "Ongoing", deliverable: "3–8 sales conversations had" },
        { task: "Offer first client a discounted pilot at cost", detail: "If struggling to close: 'Let me run 1,000 calls for you at my cost — $150. You see the results.'", time: "Negotiation", deliverable: "At minimum: paid pilot in progress" },
        { task: "Onboard your first client — set up their system", detail: "Set up: 1) Dedicated Twilio number 2) Customized agent script 3) Their Google Sheet CRM 4) Calendly linked to their calendar 5) Weekly reporting email", time: "3–4 hrs", deliverable: "Client system live and calling within 48hrs of signing" },
        { task: "Set up weekly automated client report email", detail: "In n8n: every Monday at 9am → query their Google Sheet → calculate week's stats → format HTML email → send via Gmail.", time: "2 hrs", deliverable: "Automated weekly report fires every Monday morning" },
      ]} />
      <Panel accent={G.gold} style={{ marginTop: 8 }}>
        <SectionTitle accent={G.gold}>After First Client — Month 3 Plan</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: G.gold, marginBottom: 10 }}>How to Get Clients 2 and 3</div>
            {["Ask Client 1 for 2 referrals — offer $200 referral bonus", "Reply to every agent comment on your LinkedIn post", "Post monthly updates: 'Month 2 — booked 19 appointments for 2 agents'", "Cold call agents who recently lost listings on Zillow", "Partner with a local real estate investor coach — they have audiences"].map((item, i) => (
              <div key={i} style={{ fontSize: 11, color: G.mid, padding: "5px 0", borderBottom: `1px solid ${G.border}`, display: "flex", gap: 8 }}>
                <span style={{ color: G.gold }}>→</span>{item}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: G.green, marginBottom: 10 }}>Month 3 Revenue Target</div>
            {[
              { label: "Client 1 (full month)", value: "$2,000" },
              { label: "Client 2 (started mid-month)", value: "$1,000" },
              { label: "Client 3 (pilot)", value: "$500" },
              { label: "Total revenue", value: "$3,500" },
              { label: "Total costs", value: "~$900" },
              { label: "Net profit", value: "$2,600" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "6px 0", borderBottom: `1px solid ${G.border}`, color: i === 5 ? G.green : G.text, fontWeight: i === 5 ? 700 : 400 }}>
                <span style={{ color: G.mid }}>{r.label}</span>
                <span style={{ color: i === 5 ? G.green : G.gold }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}

function Scripts() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.purple + "0C", border: `1px solid ${G.purple}30`, borderRadius: 8, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.purple, fontWeight: 700 }}>Script Notes: </span>
        Copy this entire block into your Vapi Assistant system prompt. Replace ALL bracketed items. The script is designed to feel like a real person — never pushy, always curious. Read it aloud 20 times before going live.
      </div>
      <Expand title="🎯 Full Real Estate Cold-Call System Prompt" accent={G.gold} badge="PASTE INTO VAPI">
        <CodeBlock label="VAPI SYSTEM PROMPT — REAL ESTATE SELLER QUALIFIER" code={`You are Sarah, a friendly local real estate assistant. You help connect homeowners in [TARGET CITY] with serious buyers and investors in the area.

YOUR PERSONALITY
- Warm, conversational, genuinely curious
- Never pushy or salesy
- You're making a friendly inquiry, not a pitch
- Short sentences. Natural pauses. Real conversation.

CALL FLOW

OPENING (first 20 seconds)
Say: "Hi, is this [Owner First Name]?"
Wait for response.
If yes: "Hi [Name], this is Sarah — I work with a group of buyers and investors here in [City] who are actively looking for properties right now. I noticed your address came up in our area and I just wanted to reach out quickly — do you have literally 60 seconds?"

QUALIFY (if they say yes or seem receptive)
Say: "Perfect, thank you. So we work with a handful of buyers who are paying cash and can close fast — no contingencies. I'm not going to waste your time, so let me just ask directly: is selling your property at [Address] something you've thought about at all, even casually?"

IF INTERESTED
"That's great to hear. Can I ask — is there a number that would make it worth your while? Or is it more about timing for you right now?"
[Listen. Let them talk.]
"That makes total sense. So would it be worth a quick 10-minute call with one of our buyers — no commitment, just to hear a real number on your property? I can set that up for this week."
[If yes → book via Calendly function call]

IF NOT INTERESTED RIGHT NOW
"Completely understand — I appreciate you being straight with me. Can I just ask, is it more that the timing isn't right, or would it really depend on the price?"
[If timing]: "Fair enough. Would it be okay if I checked back in a few months?"
[If price only]: "Got it. If you ever did get a number that made sense, is there a good way to reach you?"

OBJECTION HANDLING
"Is this AI?": "Yes it is — I'm an AI assistant. Is that okay? I'm just reaching out on behalf of the team to see if there's any interest before a person reaches back out."
"How much will you pay?": "That's the right question. Our buyers work on a case-by-case basis depending on condition and timing — so I can't give you a number right now, but that's exactly what the call with a buyer would cover."
"I already have an agent": "Totally fine — that's not a problem at all. Our buyers sometimes work alongside agents too."
"I'm not interested": "No problem at all, I completely understand. Sorry to bother you — have a great day!" [END CALL]
"Who gave you my number?": "We work from property records and public listings in the area. I'm sorry if the timing is off — is it okay if I reach back out in a few months, or would you prefer we don't call again?"
"Stop calling me": "Absolutely, I'm so sorry. We will remove you from our list right away. Have a great day." [END CALL — mark as DNC in your system]

BOOKING A CALL
If they agree to a callback, use the end_call function with:
status: "interested", callback_requested: true, best_time: [what they say], notes: [summary of conversation]

ENDING THE CALL
Always end with: "Thanks so much for your time, [Name]. I really appreciate it. Have a wonderful day!"

IMPORTANT RULES
- Keep total call under 3 minutes unless they're highly engaged
- Never lie about who you work for or what you're offering
- If they ask to be removed, do it immediately and end the call
- Always disclose you are AI if directly asked
- This call may be recorded for quality purposes`} />
      </Expand>
      <Expand title="📞 Voicemail Drop Script" accent={G.cyan} badge="RECORD THIS">
        <div style={{ padding: "14px 16px", background: G.panel, border: `1px solid ${G.cyan}25`, borderRadius: 8, fontSize: 13, color: G.text, lineHeight: 2, fontStyle: "italic" }}>
          "Hi [Owner Name], this is Sarah calling about your property at [Address] in [City]. I work with a group of local buyers and wanted to reach out about a potential opportunity. I'd love to chat for just a minute when you get a chance — you can reach me back at [Phone Number]. No pressure at all, just wanted to connect. Thanks and have a great day!"
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: G.mid, lineHeight: 1.7 }}>
          <span style={{ color: G.cyan, fontWeight: 700 }}>Notes: </span>
          Record this in a quiet room. Natural tone. No music. Under 20 seconds. Re-record until it sounds like you just called a friend. This should trigger 10–20% callback rate on no-answer leads.
        </div>
      </Expand>
      <Expand title="💬 SMS Follow-Up Sequence" accent={G.green} badge="AUTOMATED via n8n">
        {[
          { trigger: "Immediately after hot lead call", msg: "Hi [Name], this is the team who just called about your property at [Address]. We really appreciate your time! Our agent [Agent Name] will reach out within the hour. Feel free to book a convenient time here: [Calendly Link]" },
          { trigger: "+24 hrs (if no booking yet)", msg: "Hi [Name], just following up from our call yesterday about [Address]. [Agent Name] is still eager to connect. Happy to work around your schedule — any time this week work for a quick 10-min call? [Calendly Link]" },
          { trigger: "+72 hrs (final follow-up)", msg: "Hi [Name], last follow-up from the property inquiry team — we have a buyer specifically looking in your area. If timing ever makes sense, [Agent Name] would love to connect: [Calendly Link]. Have a great week!" },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <Tag color={G.green}>{s.trigger}</Tag>
            <div style={{ marginTop: 8, padding: "12px 14px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 6, fontSize: 12, color: G.text, lineHeight: 1.8, fontStyle: "italic" }}>{s.msg}</div>
          </div>
        ))}
      </Expand>
    </div>
  );
}

function Outreach() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.blue + "0C", border: `1px solid ${G.blue}30`, borderRadius: 8, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.blue, fontWeight: 700 }}>The Rule: </span>
        Every message should be about THEIR problem, not your solution. Agents have one problem: not enough listings. Lead with that. Don't explain AI. Don't say "I built a thing." Say "I got 6 qualified seller leads for $48."
      </div>
      <Expand title="📱 Instagram DM — Cold Outreach" accent={G.purple} badge="HIGH RESPONSE RATE">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Message 1 — Short hook (send first)", msg: "Hey [Name] — quick question. Do you ever struggle to find motivated sellers in [City]? I ran a test last month and got 6 qualified seller leads for under $50. Wanted to see if it'd be useful for you." },
            { label: "Message 2 — If they reply 'yes' or 'how?'", msg: "We built an AI system that calls FSBO and expired listing owners automatically. Had 100 conversations last month — 6 people said they'd seriously consider selling. Would love to show you the exact numbers if you're open to it? Takes 10 min." },
            { label: "Message 3 — If no reply after 3 days", msg: "Hey [Name], not sure if you saw my last message — totally fine if not the right time. If you're ever trying to find sellers without cold calling yourself, happy to share what we built. No pitch, just results. 🏠" },
          ].map((m, i) => (
            <div key={i}>
              <div style={{ fontSize: 10, fontWeight: 700, color: G.purple, letterSpacing: 1.5, marginBottom: 6 }}>{m.label}</div>
              <div style={{ padding: "12px 14px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 8, fontSize: 12, color: G.text, lineHeight: 1.8 }}>{m.msg}</div>
            </div>
          ))}
        </div>
      </Expand>
      <Expand title="📧 Cold Email — Real Estate Agent Outreach" accent={G.cyan} badge="B2B EMAIL">
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: G.gold, letterSpacing: 1.5, marginBottom: 6 }}>SUBJECT LINE OPTIONS (test both):</div>
          <div style={{ padding: "8px 12px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 6, fontSize: 12, color: G.gold, marginBottom: 4 }}>6 seller leads, $48, same day — [City] test results</div>
          <div style={{ padding: "8px 12px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 6, fontSize: 12, color: G.gold, marginBottom: 12 }}>Quick question about finding motivated sellers in [City]</div>
          <div style={{ padding: "16px 18px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 8, fontSize: 12, color: G.text, lineHeight: 2 }}>
            Hi [Agent Name],<br/><br/>
            My name is [Your Name]. I recently ran a test AI calling campaign targeting FSBO and expired listing owners in [City]. Here's what happened:<br/><br/>
            → 100 calls made<br/>
            → 28 homeowners answered<br/>
            → 6 expressed serious interest in selling<br/>
            → 3 booked appointments<br/>
            → Total cost: $48<br/><br/>
            I'm looking to run this service for 2–3 real estate agents in [City] who want a consistent flow of motivated seller leads without personally making cold calls.<br/><br/>
            Would you be open to a 15-minute call this week? I can walk you through the results and show you exactly how it works. No commitment required — just want to see if it's a fit.<br/><br/>
            [Your Name]<br/>
            [Phone] | [Email]
          </div>
        </div>
      </Expand>
      <Expand title="💼 LinkedIn Message — Professional Outreach" accent={G.blue} badge="BEST FOR HIGH-VOLUME AGENTS">
        <div style={{ padding: "14px 16px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 8, fontSize: 12, color: G.text, lineHeight: 2 }}>
          Hi [Name],<br/><br/>
          Noticed you're one of the top agents in [City] — impressive track record.<br/><br/>
          I recently ran an AI-powered calling campaign on FSBO + expired listing owners in the area. Generated 6 qualified seller conversations from 100 calls at a cost of $48.<br/><br/>
          Building this as a service for a few select agents in [City]. Wondering if finding motivated sellers is something you'd be interested in solving more systematically?<br/><br/>
          Happy to share the full breakdown if useful. 15 min max.
        </div>
      </Expand>
      <Expand title="🏠 Facebook Group Post — Value-First Approach" accent={G.orange} badge="SOFT SELL — HIGH TRUST">
        <div style={{ padding: "14px 16px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 8, fontSize: 12, color: G.text, lineHeight: 2 }}>
          "Wanted to share something I built and tested last month for anyone who finds it useful.<br/><br/>
          I've been experimenting with using AI voice agents to automatically call FSBO and expired listing owners. Ran a 100-call test targeting homeowners in [City] last month.<br/><br/>
          Results:<br/>
          ✓ 28 calls answered<br/>
          ✓ 6 homeowners expressed genuine interest in selling<br/>
          ✓ 3 booked appointments with our test agent<br/>
          ✓ Total cost: $48<br/><br/>
          Not selling anything — just thought some of you might find the approach interesting. Happy to share exactly how we set it up if anyone wants to DM me."
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: G.mid }}>
          This post typically generates 5–15 DMs from curious agents. Respond to every single one. Convert them to a call. Close on the call.
        </div>
      </Expand>
      <Panel accent={G.gold}>
        <SectionTitle accent={G.gold}>Outreach Tracking System</SectionTitle>
        <CodeBlock label="GOOGLE SHEET COLUMNS — TRACK YOUR OUTREACH" code={`| Agent Name | Platform | Message Sent | Date | Response? | Response Text | Call Booked? | Call Date | Outcome |
| John Smith | Instagram | DM #1 | W7-Mon | Yes | "How does it work?" | Yes | W7-Wed | SIGNED |
| Jane Doe | Email | Cold email | W7-Mon | No | - | - | - | Follow up W8 |

DAILY GOAL: 5 new outreach messages sent
WEEKLY GOAL: 3 sales calls booked
CONVERSION: 1 in 10 people you reach will book a call. 1 in 3 calls will close.
So: 30 outreach → 3 calls → 1 client.`} />
      </Panel>
    </div>
  );
}

function TechSetup() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Expand title="Step 1 — Vapi Account & First Assistant" accent={G.cyan} badge="DAY 1">
        <CodeBlock label="CURL — CREATE ASSISTANT VIA VAPI API" code={`curl -X POST "https://api.vapi.ai/assistant" \\
  -H "Authorization: Bearer YOUR_VAPI_PRIVATE_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Sarah - RE Lead Qualifier",
    "model": {
      "provider": "openai",
      "model": "gpt-4o-mini",
      "systemPrompt": "YOUR FULL SCRIPT HERE"
    },
    "voice": {
      "provider": "openai",
      "voiceId": "nova"
    },
    "firstMessage": "Hi, is this [customer.name]?",
    "endCallMessage": "Thanks so much! Have a great day.",
    "serverUrl": "YOUR_N8N_WEBHOOK_URL"
  }'`} />
        <CodeBlock label="CURL — MAKE A TEST OUTBOUND CALL" code={`curl -X POST "https://api.vapi.ai/call/phone" \\
  -H "Authorization: Bearer YOUR_VAPI_PRIVATE_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "assistantId": "YOUR_ASSISTANT_ID",
    "phoneNumberId": "YOUR_VAPI_PHONE_NUMBER_ID",
    "customer": {
      "number": "+15551234567",
      "name": "Test Owner"
    }
  }'`} />
      </Expand>
      <Expand title="Step 2 — n8n Self-Host Setup" accent={G.gold} badge="WEEK 1">
        <CodeBlock label="INSTALL N8N WITH DOCKER (RECOMMENDED)" code={`# Install Docker first: https://docs.docker.com/get-docker/
# Run n8n with persistent storage
docker run -d \\
  --name n8n \\
  -p 5678:5678 \\
  -v n8n_data:/home/node/.n8n \\
  --restart unless-stopped \\
  n8nio/n8n

# Access at http://localhost:5678
# Set up owner account on first visit

# For production (VPS hosting - Hetzner CX11, ~$5/mo):
# SSH into VPS, install Docker, run same command
# Replace localhost with your VPS IP
# Add Nginx reverse proxy for HTTPS (required for webhooks)`} />
        <CodeBlock label="FULL N8N MAIN WORKFLOW — VAPI → LOG + ALERT" code={`// WORKFLOW STRUCTURE (create these nodes in n8n):
// Node 1: Webhook (POST) - Method: POST, Path: /vapi-call-ended
// Node 2: Code (extract lead data) - See extraction code in Week 2 tab
// Node 3: IF (was call answered?) - Condition: $json.duration > 15
// Node 4: IF (was lead interested?) - Condition: $json.interested === true
// Node 5: Google Sheets (append to Hot Leads sheet)
// Node 6: Twilio (SMS agent with lead details)
// Node 7: Gmail (email agent with full transcript)
// Node 8: Google Sheets (append to All Calls log)`} />
      </Expand>
      <Expand title="Step 3 — Twilio Phone Setup" accent={G.green} badge="WEEK 3">
        <CodeBlock label="TWILIO SETUP STEPS" code={`// 1. Create Twilio account at twilio.com (free trial = $15 credit)
// 2. Buy a phone number:
//    Console → Phone Numbers → Manage → Buy a Number
//    Choose area code matching your target city
//    Cost: ~$1/month per number
// 3. Import to Vapi:
//    Vapi Dashboard → Phone Numbers → Import
//    Enter Twilio Account SID + Auth Token + Phone Number
// 4. Configure for outbound calls:
//    In Vapi, set default assistant on the phone number
// 5. For each new client:
//    Buy a NEW Twilio number with their local area code
//    Import into Vapi, assign their specific assistant`} />
      </Expand>
      <Expand title="Step 4 — GoHighLevel CRM Setup" accent={G.orange} badge="WEEK 5">
        <CodeBlock label="GHL PIPELINE STAGES TO CREATE" code={`// Create these pipeline stages in GoHighLevel:
// Pipeline name: "Seller Lead Pipeline"
Stage 1: "New Lead" (just entered system)
Stage 2: "Called - No Answer" (Vapi called, no answer)
Stage 3: "Called - Not Interested" (spoke, said no)
Stage 4: "WARM - Follow Up" (showed some interest)
Stage 5: "HOT - Appointment Booked" (agreed to call)
Stage 6: "Met with Agent" (call with agent happened)
Stage 7: "Under Contract" (signed listing agreement)
Stage 8: "Dead" (opted out, DNC, or lost)

// In n8n, after each call, use GHL API to:
// - Create contact if new
// - Move to appropriate pipeline stage
// - Add note with transcript summary
// - Set follow-up task if warm lead`} />
      </Expand>
      <Expand title="Step 5 — Bulk Calling via n8n Loop" accent={G.purple} badge="WEEK 4-5">
        <CodeBlock label="N8N WORKFLOW — BULK CAMPAIGN RUNNER" code={`// WORKFLOW: Run a calling campaign from Google Sheet
// Node 1: Schedule Trigger - Runs every weekday at 10am your local time
// Node 2: Google Sheets (read rows) - Sheet: "Ready to Call", Filter: Status = "new" AND IsLegalToCall = TRUE
// Node 3: Loop Over Items
//   For each lead in the list:
//   Node 3a: Code (time zone check)
//   Node 3b: IF (is it legal to call right now?)
//     TRUE: Node 3c: HTTP Request → Vapi API, Node 3d: Google Sheets UPDATE Status = "calling", Node 3e: Wait 30 seconds
//     FALSE: Node 3f: Google Sheets UPDATE Status = "deferred - outside hours"
// Node 4: Slack/Email notification - "Campaign batch complete: 50 calls triggered"`} />
      </Expand>
    </div>
  );
}

function CloseClients() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: "14px 18px", background: G.green + "0C", border: `1px solid ${G.green}30`, borderRadius: 8, fontSize: 12, color: G.mid, lineHeight: 1.7 }}>
        <span style={{ color: G.green, fontWeight: 700 }}>On Sales Calls: </span>
        You don't need to be a salesperson. You need to ask good questions and show real numbers. The results sell the service — not you. Your job is to listen, find their pain, and show proof.
      </div>
      <Expand title="📞 Sales Call Script — 15-Minute Agent Close" accent={G.gold} badge="USE ON EVERY CALL">
        {[
          { step: "Minute 0–2", title: "Rapport + Frame", script: `"Thanks for making time, [Name]. Before I show you anything — tell me about your business right now. How are you finding sellers currently?"`, note: "Let them talk for 2 full minutes. Take notes. Their answer tells you exactly what to say next." },
          { step: "Minute 2–5", title: "Find the Pain", script: `"How many leads do you typically need per month to hit your goals? And how much time does finding those leads take you right now?"`, note: "You want them to say a number. Most agents need 5–15 seller leads/month and spend hours finding them." },
          { step: "Minute 5–8", title: "Show the Numbers", script: `"Let me show you what we did last month. We ran 100 automated calls to FSBO and expired listing owners in [City]. 28 answered. 6 were genuinely interested. 3 booked appointments. Total cost: $48. At what point do those numbers start being interesting to you?"`, note: "Show your actual Google Sheet. Real data beats any presentation." },
          { step: "Minute 8–11", title: "Handle Objections (see below)", script: `Address their specific concern. Don't rush. If they ask something you don't know — say "good question, let me check and come back to you."`, note: "" },
          { step: "Minute 11–14", title: "Propose the Offer", script: `"Based on what you told me, I'd suggest we start with the Growth plan — 10,000 calls per month, targeting expired listings in your market specifically. That's $2,500/month. We set up everything, you just get leads. Does that feel like a fit?"`, note: "Be specific. Use their market, their numbers. Don't pitch generically." },
          { step: "Minute 14–15", title: "Ask for the Close", script: `"If this looks right, I can have everything set up for you within 48 hours. First calls would go out [day after tomorrow]. Want to move forward?"`, note: "Shut up after this. Wait for their answer. Don't fill the silence." },
        ].map((s, i) => (
          <div key={i} style={{ padding: "12px 14px", background: G.panelHi, border: `1px solid ${G.border}`, borderRadius: 8, marginBottom: 8 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
              <Tag color={G.gold}>{s.step}</Tag>
              <span style={{ fontSize: 12, fontWeight: 700, color: G.text }}>{s.title}</span>
            </div>
            <div style={{ fontSize: 12, color: G.text, lineHeight: 1.8, fontStyle: "italic", padding: "8px 12px", background: G.bg, borderRadius: 6, marginBottom: s.note ? 8 : 0 }}>{s.script}</div>
            {s.note && <div style={{ fontSize: 11, color: G.gold }}>{s.note}</div>}
          </div>
        ))}
      </Expand>
      <Expand title="🛡 Objection Handling — The 6 Real Objections" accent={G.orange} badge="CRITICAL">
        {[
          { obj: "\"How do I know this will work for ME?\"", ans: "\"Totally fair. The numbers I showed you are from our own test run — we don't have your specific market data yet. That's why I'd propose we start with a 1-month pilot. You see real results before committing long-term. If it doesn't work, you've spent less than a cold caller's day rate.\"" },
          { obj: "\"I don't want homeowners called by a robot\"", ans: "\"Completely understand — and honestly, if your script sounds robotic, you'll fail. Ours doesn't. Here's a recording from last week's campaign [play call recording]. Most people don't even realize it's AI. The disclosure happens, but by then they're already talking.\"" },
          { obj: "\"I already have a VA doing this\"", ans: "\"How many calls is your VA making per day? [They say 50–80.] Our system can do 500–2,000 per day, 24/7, no sick days, no bad days. And cost per lead is typically 10x less. Your VA could handle the warm leads — this just fills their pipeline.\"" },
          { obj: "\"What's the cancellation policy?\"", ans: "\"Month to month, cancel any time with 30 days notice. No contracts. We want clients who stay because the results justify it — not because they're locked in.\"" },
          { obj: "\"I need to think about it\"", ans: "\"Totally get that. What's the main thing you need to think through? Is it budget, or is it more about whether this will actually work in your market? [Address the specific concern. Then:] What if I set up a 1,000-call pilot for $200 — you see real results with zero risk, and decide from there?\"" },
          { obj: "\"Is this legal?\"", ans: "\"Yes — we've had a TCPA attorney review the entire system. Every call includes AI disclosure and a remove-me option. We scrub against the DNC registry before every campaign. I can share our compliance documentation.\"" },
        ].map((o, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G.orange, marginBottom: 6 }}>{o.obj}</div>
            <div style={{ fontSize: 12, color: G.text, lineHeight: 1.8, padding: "10px 14px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 6 }}>{o.ans}</div>
          </div>
        ))}
      </Expand>
      <Expand title="📄 Service Offer — What to Send After the Call" accent={G.cyan} badge="1-PAGE DECK">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 11, color: G.mid, lineHeight: 1.7 }}>Send this as a PDF within 1 hour of your sales call. Short. Numbers-first. No tech jargon.</div>
          <div style={{ padding: "18px 20px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: G.white, marginBottom: 4 }}>[Your Company Name] — AI Seller Lead System</div>
            <div style={{ fontSize: 11, color: G.mid, marginBottom: 16 }}>Automated outbound calling for real estate agents in [City]</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: G.gold, marginBottom: 10 }}>What We Do</div>
            <div style={{ fontSize: 11, color: G.mid, lineHeight: 1.8, marginBottom: 16 }}>We run automated calling campaigns targeting FSBO owners, expired listings, and absentee property owners in your market. Our AI identifies homeowners open to selling and routes interested leads directly to you — same day.</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: G.gold, marginBottom: 10 }}>Pricing</div>
            {[
              { plan: "Starter", calls: "3,000 calls/mo", leads: "5–10 qualified", price: "$1,500/mo" },
              { plan: "Growth", calls: "10,000 calls/mo", leads: "15–30 qualified", price: "$2,500/mo" },
              { plan: "Scale", calls: "30,000 calls/mo", leads: "40–80 qualified", price: "$5,000/mo" },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: `1px solid ${G.border}`, fontSize: 12 }}>
                <div style={{ minWidth: 70, fontWeight: 700, color: G.cyan }}>{p.plan}</div>
                <div style={{ color: G.mid, flex: 1 }}>{p.calls} · Est. {p.leads}</div>
                <div style={{ fontWeight: 700, color: G.gold }}>{p.price}</div>
              </div>
            ))}
            <div style={{ marginTop: 14, fontSize: 11, color: G.mid, lineHeight: 1.8 }}>
              ✓ Month-to-month · No setup fee · Cancel anytime<br/>
              ✓ Includes: lead list, skip tracing, DNC scrubbing, CRM logging, weekly reports<br/>
              ✓ First calls go live within 48 hours of sign-up
            </div>
          </div>
        </div>
      </Expand>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VAPI GUIDE TAB CONTAINER
// ═══════════════════════════════════════════════════════════════
function VapiMoneyGuide() {
  const [vTab, setVTab] = useState("roadmap");
  const vapiTabs = [
    { id: "roadmap", label: "ROADMAP", icon: "🗺" },
    { id: "w1", label: "WEEK 1", icon: "1" },
    { id: "w2", label: "WEEK 2", icon: "2" },
    { id: "w3", label: "WEEK 3", icon: "3" },
    { id: "w4", label: "WEEK 4", icon: "4" },
    { id: "w56", label: "WEEK 5-6", icon: "5" },
    { id: "w78", label: "WEEK 7-8", icon: "6" },
    { id: "scripts", label: "SCRIPTS", icon: "📝" },
    { id: "outreach", label: "OUTREACH", icon: "📣" },
    { id: "tech", label: "TECH SETUP", icon: "⚙️" },
    { id: "close", label: "CLOSE CLIENTS", icon: "💰" },
  ];
  const contentMap = {
    roadmap: <Roadmap />, w1: <Week1 />, w2: <Week2 />, w3: <Week3 />, w4: <Week4 />,
    w56: <Week56 />, w78: <Week78 />, scripts: <Scripts />, outreach: <Outreach />,
    tech: <TechSetup />, close: <CloseClients />,
  };
  return (
    <div style={{ background: G.bg, minHeight: "100vh", color: G.text, fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace", padding: "20px", borderRadius: 12 }}>
      <div style={{ display: "flex", gap: 2, flexWrap: "wrap", marginBottom: 24, borderBottom: `1px solid ${G.border}`, overflowX: "auto" }}>
        {vapiTabs.map(t => (
          <button key={t.id} onClick={() => setVTab(t.id)} style={{
            padding: "10px 16px", fontSize: 10, fontWeight: 700, letterSpacing: 1,
            background: vTab === t.id ? G.panelHi : G.panel, border: "none",
            borderBottom: `2px solid ${vTab === t.id ? G.gold : "transparent"}`,
            color: vTab === t.id ? G.gold : G.mid, borderRadius: "6px 6px 0 0",
            cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'IBM Plex Mono', monospace",
          }}>{t.icon} {t.label}</button>
        ))}
      </div>
      {contentMap[vTab]}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROJECT PLAN DATA (Original)
// ═══════════════════════════════════════════════════════════════
const LEARNING = [
  { step: 1, title: "Vapi Quickstart Docs", time: "2–3 hrs", diff: "Easy", color: C.cyan, icon: "📖", url: "https://docs.vapi.ai/assistants/quickstart", what: ["Create a voice assistant from scratch", "Attach a real phone number to it", "Make your first inbound and outbound calls"], why: "This is step zero. You cannot build anything without understanding how Vapi's core objects work.", deliverable: "Working Vapi assistant that answers a call and has a basic conversation" },
  { step: 2, title: "15-Minute Voice Agent Tutorial", time: "15 min + 1 hr practice", diff: "Easy", color: C.green, icon: "⚡", url: null, what: ["Create first AI voice agent end-to-end", "Write and attach a system prompt", "Test real phone calls immediately"], why: "Fastest way to get something working and calling. Builds confidence before tackling the full course.", deliverable: "First complete agent calling your phone with a real conversation prompt" },
  { step: 3, title: "Full Vapi + n8n Beginner Course", time: "8–12 hrs", diff: "Medium", color: C.purple, icon: "🎓", url: null, what: ["Full voice AI architecture from first principles", "Connecting AI to n8n automation workflows", "Building production-scale calling campaigns"], why: "This is where the business side becomes possible. n8n is how you scale from 1 call to 10,000 calls without manual work.", deliverable: "Automated campaign that pulls leads, calls them, and logs outcomes without touching it" },
  { step: 4, title: "Real Estate Lead-Qualifier Tutorial", time: "3–4 hrs", diff: "Medium", color: C.amber, icon: "🏠", url: null, what: ["AI cold-calling system for real estate specifically", "Automatically qualify motivated sellers", "Save qualified leads directly to CRM"], why: "This is your exact use case. Study the script structure, the objection handling, and how they define a 'qualified lead'.", deliverable: "Real estate specific agent script that qualifies sellers and routes interested leads" },
  { step: 5, title: "Twilio Phone Integration", time: "2–3 hrs", diff: "Medium", color: C.orange, icon: "📞", url: null, what: ["Buy and configure a real phone number", "Route all calls through your Vapi agent", "Connect Twilio phone infrastructure to Vapi"], why: "Vapi uses Twilio under the hood anyway. Understanding this layer helps you debug call quality issues.", deliverable: "Dedicated phone number per client routing all calls through your agent system" },
  { step: 6, title: "Advanced n8n Automation", time: "4–6 hrs", diff: "Medium", color: C.pink, icon: "⚙️", url: null, what: ["Complex workflow automation across 100+ apps", "Push lead data automatically into any CRM", "Schedule appointments and send confirmations"], why: "This is what makes you scalable. One n8n workflow handles CRM updates, email notifications, Slack alerts, calendar bookings.", deliverable: "Full n8n workflow: call ends → CRM updated → agent notified → calendar booked → SMS sent" },
];

const BUILD_PHASES = [
  { id: 1, label: "W1", title: "Learn & First Agent", weeks: [1, 1], color: C.cyan, pct: 0, tasks: [
    { id: "1A", title: "Complete Vapi Quickstart Docs", diff: "Easy", time: "2–3 hrs", deliverable: "Vapi account + first assistant created + test call made to your phone" },
    { id: "1B", title: "15-Min Tutorial — First Working Agent", diff: "Easy", time: "15 min + practice", deliverable: "Agent answers your phone with a real conversation" },
    { id: "1C", title: "Write First Real Estate Script v1", diff: "Medium", time: "3–4 hrs", deliverable: "Script covering: intro, qualify, 5 objections, book appointment, end call" },
  ]},
  { id: 2, label: "W2", title: "Full Course + Automation Foundation", weeks: [2, 2], color: C.purple, pct: 15, tasks: [
    { id: "2A", title: "Full Vapi + n8n Course", diff: "Medium", time: "8–12 hrs", deliverable: "Understand full architecture: Vapi → webhook → n8n → CRM" },
    { id: "2B", title: "Install n8n locally (free)", diff: "Easy", time: "1 hr", deliverable: "n8n running on your machine, basic workflow created" },
    { id: "2C", title: "Connect Vapi webhook to n8n", diff: "Medium", time: "2–3 hrs", deliverable: "Call ends → n8n receives outcome data automatically" },
  ]},
  { id: 3, label: "W3", title: "Real Estate Script + Twilio", weeks: [3, 3], color: C.green, pct: 25, tasks: [
    { id: "3A", title: "Real Estate Lead-Qualifier Tutorial", diff: "Medium", time: "3–4 hrs", deliverable: "Agent correctly qualifies a motivated seller and routes to booking" },
    { id: "3B", title: "Twilio Phone Integration", diff: "Medium", time: "2–3 hrs", deliverable: "Dedicated number bought, connected to Vapi, real outbound calls working" },
    { id: "3C", title: "Test 50 self-calls with your script", diff: "Medium", time: "2–3 days", deliverable: "Script handles 15+ edge cases without breaking" },
    { id: "3D", title: "Calendly booking integration", diff: "Easy", time: "1–2 hrs", deliverable: "When owner says yes → agent books time slot automatically" },
    { id: "3E", title: "Free Lead Scraping Pipeline", diff: "Medium", time: "4–6 hrs", deliverable: "200 scraped FSBO leads in a CSV file", isNew: true },
    { id: "3F", title: "Skip Trace Integration", diff: "Medium", time: "3–4 hrs", deliverable: "BatchSkipTracing API connected to n8n workflow", isNew: true },
  ]},
  { id: 4, label: "W4", title: "Full Automation Pipeline", weeks: [4, 4], color: C.amber, pct: 35, tasks: [
    { id: "4A", title: "Advanced n8n Automation Course", diff: "Medium", time: "4–6 hrs", deliverable: "Comfortable building multi-step n8n workflows" },
    { id: "4B", title: "Build CRM lead logging workflow", diff: "Medium", time: "3–4 hrs", deliverable: "Every call auto-logged to Google Sheets or GoHighLevel" },
    { id: "4C", title: "Build SMS reminder workflow", diff: "Easy", time: "1–2 hrs", deliverable: "Appointment reminder fires automatically 24hrs before" },
    { id: "4D", title: "Lead notification to agent (email/Slack)", diff: "Easy", time: "1 hr", deliverable: "Agent gets instant notification when a qualified lead is found" },
    { id: "4E", title: "DNC Scrubbing Automation", diff: "Hard", time: "3–5 hrs", deliverable: "Zero calls made to DNC-registered numbers", isNew: true },
    { id: "4F", title: "Call Time Zone Logic", diff: "Medium", time: "2–3 hrs", deliverable: "No calls placed outside 8am–9pm local time", isNew: true },
  ]},
  { id: 5, label: "W5–6", title: "Lead Source + Full Test", weeks: [5, 6], color: C.orange, pct: 50, tasks: [
    { id: "5A", title: "Set up PropStream or BatchLeads trial", diff: "Easy", time: "1–2 hrs", deliverable: "500 FSBO/expired listing leads ready to call" },
    { id: "5B", title: "Set up GoHighLevel free trial", diff: "Easy", time: "2–3 hrs", deliverable: "CRM pipeline configured with stages" },
    { id: "5C", title: "Run first 100-call campaign", diff: "Medium", time: "1–2 days setup", deliverable: "100 calls made, outcomes logged, 1–3 appointments booked" },
    { id: "5D", title: "Analyse results and refine script", diff: "Hard", time: "ongoing", deliverable: "Script v2 based on real call data" },
    { id: "5E", title: "Call Recording + Transcript Storage", diff: "Medium", time: "2–3 hrs", deliverable: "100% of calls have recording + transcript stored", isNew: true },
    { id: "5F", title: "Conversion Rate Dashboard", diff: "Medium", time: "3–4 hrs", deliverable: "Live Google Sheet showing funnel metrics", isNew: true },
    { id: "5G", title: "Voicemail Drop Campaign", diff: "Medium", time: "2–3 hrs", deliverable: "Automated voicemail drop on no-answer attempts", isNew: true },
  ]},
  { id: 6, label: "W7–8", title: "First Client + Service Launch", weeks: [7, 8], color: C.pink, pct: 70, tasks: [
    { id: "6A", title: "Build client-facing dashboard (basic)", diff: "Medium", time: "1 week", deliverable: "Client can see: calls made, leads found, appointments booked" },
    { id: "6B", title: "Create 1-page service offer", diff: "Easy", time: "1–2 hrs", deliverable: "Clear offer: X calls/month, Y qualified leads, price" },
    { id: "6C", title: "Onboard first client", diff: "Hard", time: "ongoing", deliverable: "First paying client at $500–1,500/month minimum" },
    { id: "6D", title: "Document your SOP for client onboarding", diff: "Medium", time: "2–3 hrs", deliverable: "Written process to onboard any new agent in under 2 hours" },
    { id: "6E", title: "Lead Handoff Workflow", diff: "Hard", time: "4–6 hrs", deliverable: "Agent notified in under 60 seconds of every qualified lead", isNew: true },
    { id: "6F", title: "Client Reporting Automation", diff: "Medium", time: "3–4 hrs", deliverable: "Automated weekly report email every Monday morning", isNew: true },
  ]},
];

const DIFF = { Easy: C.green, Medium: C.amber, Hard: C.red };

function AnimatedBar({ pct, color, height = 8 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 400); return () => clearTimeout(t); }, [pct]);
  return (<div style={{ height, background: C.border, borderRadius: 99, overflow: "hidden" }}><div style={{ height: "100%", width: `${w}%`, borderRadius: 99, background: `linear-gradient(90deg, ${color}88, ${color})`, transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 8px ${color}50` }} /></div>);
}

function SectionHeader({ color, children }) {
  return (<div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}><div style={{ width: 4, height: 22, background: color, borderRadius: 2, boxShadow: `0 0 8px ${color}80` }} /><div style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: 2.5, textTransform: "uppercase" }}>{children}</div></div>);
}

function Card({ children, color, style = {} }) {
  return (<div style={{ background: C.surface, border: `1px solid ${color ? color + "25" : C.border}`, borderRadius: 12, padding: 24, ...style }}>{children}</div>);
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("Overview");
  const [openLearn, setOpenLearn] = useState(null);
  const [openTask, setOpenTask] = useState(null);
  const [openPhase, setOpenPhase] = useState(null);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", color: C.text, fontSize: 13 }}>
      {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { width: 5px; height: 5px; } ::-webkit-scrollbar-track { background: ${C.bg}; } ::-webkit-scrollbar-thumb { background: ${C.borderHigh}; border-radius: 99px; } .hov:hover { background: ${C.surfaceHover} !important; } .tab-btn { transition: all 0.18s ease !important; } .tab-btn:hover { background: ${C.surfaceHigh} !important; color: ${C.text} !important; } .card-hover:hover { border-color: ${C.borderHigh} !important; transform: translateY(-1px); transition: all 0.18s; } .tag { font-size: 10px; font-weight: 600; padding: 2px 9px; border-radius: 99px; } @keyframes glow { 0%,100%{opacity:1}50%{opacity:0.75} }`}

      {/* HEADER */}
      <div style={{ background: `linear-gradient(180deg,#090B1E 0%,${C.surface} 100%)`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1380, margin: "0 auto", padding: "28px 32px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, boxShadow: `0 0 10px ${C.green}` }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: C.textMid, letterSpacing: 3, textTransform: "uppercase" }}>AI Calling Service · Real Estate Lead Generation · Vapi Stack</span>
              </div>
              <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, color: C.white, letterSpacing: -1.5, lineHeight: 1.05, marginBottom: 8 }}>
                REVISED PLAN —{" "}
                <span style={{ color: C.amber, textShadow: `0 0 28px ${C.amber}70` }}>BUILD WITH VAPI</span>
                <span style={{ color: C.textMid }}>, SELL TO AGENTS</span>
              </h1>
              <p style={{ fontSize: 13, color: C.textMid, fontWeight: 400 }}>8-Week Build · Vapi + n8n + Twilio · $5K–$20K/month Revenue Potential · No Custom Voice Engine</p>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[
                { v: "8", l: "Weeks", c: C.cyan },
                { v: "Vapi", l: "Voice Engine", c: C.purple },
                { v: "$300", l: "Start Cost", c: C.green },
                { v: "10×", l: "Faster Build", c: C.amber },
                { v: "$20K", l: "Max Monthly", c: C.green },
                { v: "High", l: "Feasibility", c: C.cyan },
              ].map(s => (
                <div key={s.l} style={{ padding: "12px 16px", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10, textAlign: "center", minWidth: 76 }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: s.c, lineHeight: 1, textShadow: `0 0 18px ${s.c}70`, animation: "glow 3s ease-in-out infinite" }}>{s.v}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.textDim, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 5 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* PLAN CHANGE NOTICE */}
          <div style={{ marginBottom: 20, padding: "14px 18px", background: `${C.amber}0C`, border: `1px solid ${C.amber}30`, borderRadius: 10, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>🔄</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.amber, marginBottom: 4 }}>PLAN UPDATE — Significant Change From Previous Version</div>
              <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>
                Previous plan: build your own voice engine (4–6 months, complex). <span style={{ color: C.red }}>Scrapped.</span>{" "}
                New plan: use <span style={{ color: C.cyan, fontWeight: 600 }}>Vapi</span> as the voice infrastructure and sell AI calling as a service to real estate agents.
                Build time drops from 4–6 months to <span style={{ color: C.green, fontWeight: 600 }}>6–8 weeks</span>.
                Revenue model changes from "get my own listings" to <span style={{ color: C.green, fontWeight: 600 }}>recurring B2B revenue from multiple agents</span>.
              </div>
            </div>
          </div>

          {/* TABS */}
          <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {TABS.map(t => (
              <button key={t} className="tab-btn" onClick={() => setTab(t)} style={{
                padding: "11px 20px", fontSize: 12, fontWeight: 600, fontFamily: "'Inter',sans-serif",
                background: tab === t ? C.surfaceHigh : "transparent", border: "none",
                borderBottom: `2px solid ${tab === t ? C.amber : "transparent"}`,
                color: tab === t ? C.amber : C.textMid, cursor: "pointer",
                letterSpacing: 0.3, borderRadius: "6px 6px 0 0", textAlign: "center",
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "28px 32px" }}>
        {tab === "Overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Card color={C.red}>
                <SectionHeader color={C.red}>Old Plan — Scrapped</SectionHeader>
                {[["Build custom voice engine", "4–6 months dev time"], ["Custom STT/LLM/TTS pipeline", "Latency problems you own"], ["Use only for your own listings", "Single revenue stream"], ["$0 platform cost but massive time cost", "Real opportunity cost"], ["Solo real estate agent use case", "Low revenue ceiling"], ["No product to sell", "No business scalability"]].map(([a, b], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "8px 0", borderBottom: `1px solid ${C.border}30`, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, color: C.textMid }}>✗ {a}</span>
                    <span style={{ fontSize: 11, color: C.red }}>{b}</span>
                  </div>
                ))}
              </Card>
              <Card color={C.green}>
                <SectionHeader color={C.green}>New Plan — Vapi + Agency Model</SectionHeader>
                {[["Use Vapi (production-ready)", "First call in 1 day"], ["Vapi handles all audio infra", "Sub-second latency solved"], ["Sell service to multiple agents", "Recurring B2B revenue"], ["$300–500/month operating cost", "Low overhead, high margin"], ["B2B SaaS-style service", "Unlimited scaling"], ["AI calling product you own", "Sell to any niche"]].map(([a, b], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "8px 0", borderBottom: `1px solid ${C.border}30`, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, color: C.textMid }}>✓ {a}</span>
                    <span style={{ fontSize: 11, color: C.green }}>{b}</span>
                  </div>
                ))}
              </Card>
            </div>
            <Card>
              <SectionHeader color={C.cyan}>The Business Model — What You're Actually Building</SectionHeader>
              <div style={{ overflowX: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 0, minWidth: 860, marginBottom: 20 }}>
                  {[
                    { label: "Lead List", sub: "PropStream", icon: "📋", color: C.cyan },
                    null,
                    { label: "n8n Trigger", sub: "Automation", icon: "⚡", color: C.cyan },
                    null,
                    { label: "Vapi", sub: "Voice AI", icon: "🤖", color: C.purple },
                    null,
                    { label: "Phone Call", sub: "Twilio", icon: "📞", color: C.green },
                    null,
                    { label: "AI Qualifies", sub: "Seller", icon: "🎯", color: C.amber },
                    null,
                    { label: "Interested?", sub: "Yes/No", icon: "❓", color: C.orange },
                    null,
                    { label: "n8n Routes", sub: "CRM + Book", icon: "⚙️", color: C.pink },
                    null,
                    { label: "Agent Gets", sub: "Hot Lead", icon: "💰", color: C.green },
                  ].map((node, i) => node === null ? (
                    <div key={i} style={{ fontSize: 20, color: C.border, padding: "0 5px", flexShrink: 0 }}>→</div>
                  ) : (
                    <div key={i} style={{ padding: "12px 10px", textAlign: "center", flexShrink: 0, background: `${node.color}0D`, border: `1px solid ${node.color}30`, borderRadius: 10, minWidth: 78 }}>
                      <div style={{ fontSize: 20, marginBottom: 4 }}>{node.icon}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: node.color }}>{node.label}</div>
                      <div style={{ fontSize: 9, color: C.textDim, marginTop: 1 }}>{node.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: "14px 18px", background: `${C.green}0A`, border: `1px solid ${C.green}25`, borderRadius: 8, fontSize: 13, color: C.textMid, lineHeight: 1.7 }}>
                <span style={{ color: C.green, fontWeight: 700 }}>You don't sell "AI". You sell qualified seller leads. </span>
                Agents pay $1,500–$7,000/month for a system that automatically identifies homeowners interested in selling. You run the infrastructure, they get the leads.
              </div>
            </Card>
          </div>
        )}

        {tab === "Learning Path" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ padding: "14px 18px", background: `${C.cyan}0A`, border: `1px solid ${C.cyan}25`, borderRadius: 10, fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>
              <span style={{ color: C.cyan, fontWeight: 700 }}>Total learning time: ~20–28 hours. </span>
              Do these in order — each one builds directly on the previous. By step 4 you'll have a working real estate agent.
            </div>
            {LEARNING.map((item, i) => {
              const isOpen = openLearn === i;
              return (
                <div key={i} className="hov" onClick={() => setOpenLearn(isOpen ? null : i)} style={{
                  background: isOpen ? C.surface : C.surfaceHigh, border: `1px solid ${isOpen ? item.color + "40" : C.border}`,
                  borderLeft: `3px solid ${item.color}`, borderRadius: 10, overflow: "hidden", cursor: "pointer",
                  transition: "all 0.18s", boxShadow: isOpen ? `0 4px 24px ${C.bg}80` : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", flexWrap: "wrap", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${item.color}18`, border: `2px solid ${item.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 16 }}>{item.icon}</span>
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                          <span style={{ fontSize: 10, fontWeight: 800, color: item.color, letterSpacing: 1.5 }}>STEP {item.step}</span>
                          <span className="tag" style={{ background: `${DIFF[item.diff]}18`, color: DIFF[item.diff], border: `1px solid ${DIFF[item.diff]}30` }}>{item.diff}</span>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: C.white }}>{item.title}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: C.textDim }}>⏱ {item.time}</span>
                      <span style={{ fontSize: 12, color: C.textDim, transition: "transform 0.2s", display: "inline-block", transform: isOpen ? "rotate(180deg)" : "none" }}>▾</span>
                    </div>
                  </div>
                  {isOpen && (
                    <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${item.color}20` }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 16 }}>
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, letterSpacing: 2, marginBottom: 10 }}>WHAT YOU LEARN</div>
                          {item.what.map((w, j) => (
                            <div key={j} style={{ display: "flex", gap: 8, padding: "5px 0", fontSize: 12, color: C.text, borderBottom: `1px solid ${C.border}25` }}>
                              <span style={{ color: item.color, fontWeight: 700, flexShrink: 0 }}>→</span>{w}
                            </div>
                          ))}
                        </div>
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, letterSpacing: 2, marginBottom: 10 }}>WHY THIS STEP MATTERS</div>
                          <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.75 }}>{item.why}</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
                        <div style={{ flex: 1, padding: "10px 14px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, minWidth: 200 }}>
                          <span style={{ fontSize: 10, fontWeight: 800, color: item.color, letterSpacing: 1.5 }}>DELIVERABLE → </span>
                          <span style={{ fontSize: 12, color: C.text }}>{item.deliverable}</span>
                        </div>
                        {item.url && (
                          <div style={{ padding: "10px 14px", background: `${item.color}0A`, border: `1px solid ${item.color}25`, borderRadius: 8 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: C.textDim, letterSpacing: 1.5 }}>URL → </span>
                            <span style={{ fontSize: 11, color: item.color }}>{item.url}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === "Build Plan" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ padding: "14px 18px", background: `${C.purple}0A`, border: `1px solid ${C.purple}25`, borderRadius: 10, fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>
              <span style={{ color: C.purple, fontWeight: 700 }}>8-week build. </span>
              Weeks 1–4 are the technical foundation using Vapi. Weeks 5–6 are lead sourcing and real campaign testing. Weeks 7–8 are getting the first paying client.
            </div>
            {BUILD_PHASES.map(phase => (
              <div key={phase.id}>
                <div className="hov" onClick={() => setOpenPhase(openPhase === phase.id ? null : phase.id)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px",
                  background: C.surfaceHigh, border: `1px solid ${openPhase === phase.id ? phase.color + "40" : C.border}`,
                  borderLeft: `4px solid ${phase.color}`, borderRadius: 10, cursor: "pointer",
                  marginBottom: openPhase === phase.id ? 8 : 0, transition: "all 0.18s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: phase.color, letterSpacing: 2 }}>{phase.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{phase.title}</span>
                    <span style={{ fontSize: 11, color: C.textDim }}>Weeks {phase.weeks[0]}–{phase.weeks[1]}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: phase.color, padding: "3px 10px", background: `${phase.color}12`, border: `1px solid ${phase.color}30`, borderRadius: 99 }}>~{phase.pct}% service complete</span>
                    <span style={{ fontSize: 12, color: C.textDim, display: "inline-block", transform: openPhase === phase.id ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
                  </div>
                </div>
                {openPhase === phase.id && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 8 }}>
                    {phase.tasks.map(task => {
                      const isOpen = openTask === task.id;
                      return (
                        <div key={task.id} className="hov" onClick={() => setOpenTask(isOpen ? null : task.id)} style={{
                          marginLeft: 20, background: isOpen ? C.surface : C.surfaceHigh,
                          border: `1px solid ${isOpen ? phase.color + "35" : C.border}`,
                          borderLeft: `3px solid ${isOpen ? phase.color : C.borderHigh}`,
                          borderRadius: 8, overflow: "hidden", cursor: "pointer", transition: "all 0.15s",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", flexWrap: "wrap", gap: 8 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <span style={{ fontSize: 10, fontWeight: 700, color: C.textDim, minWidth: 22 }}>{task.id}</span>
                              <div style={{ width: 7, height: 7, borderRadius: "50%", background: DIFF[task.diff], flexShrink: 0, boxShadow: `0 0 6px ${DIFF[task.diff]}70` }} />
                              <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{task.title}</span>
                              {task.isNew && (
                                <span style={{ fontSize: 8, fontWeight: 800, color: C.bg, background: `linear-gradient(135deg, ${C.amber}, ${C.orange})`, padding: "2px 7px", borderRadius: 99, letterSpacing: 1.5, animation: "glow 2s ease-in-out infinite" }}>NEW</span>
                              )}
                            </div>
                            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                              <span className="tag" style={{ background: `${DIFF[task.diff]}18`, color: DIFF[task.diff], border: `1px solid ${DIFF[task.diff]}30` }}>{task.diff}</span>
                              <span style={{ fontSize: 11, color: C.textDim }}>⏱ {task.time}</span>
                              <span style={{ fontSize: 11, color: C.textDim, display: "inline-block", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
                            </div>
                          </div>
                          {isOpen && (
                            <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${phase.color}18` }}>
                              <div style={{ marginTop: 12, padding: "10px 14px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 7, fontSize: 12, color: C.text }}>
                                <span style={{ fontSize: 10, fontWeight: 800, color: phase.color, letterSpacing: 1.5 }}>DELIVERABLE → </span>{task.deliverable}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "Lead Sourcing" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card>
              <SectionHeader color={C.green}>Free Lead Sources — Start Here (Zero Cost)</SectionHeader>
              <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>
                Zillow FSBO, Facebook Marketplace, Craigslist, County Tax Records. Combine all for 200+ free leads in one afternoon.
              </div>
            </Card>
          </div>
        )}

        {tab === "Business Model" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card>
              <SectionHeader color={C.amber}>Pricing Tiers — What You Sell to Agents</SectionHeader>
              <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>
                Starter: $1,500/mo (3,000 calls), Growth: $2,500/mo (10,000 calls), Scale: $5,000/mo (30,000 calls)
              </div>
            </Card>
          </div>
        )}

        {tab === "Costs & ROI" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card>
              <SectionHeader color={C.amber}>Monthly Operating Costs</SectionHeader>
              <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>
                Total: $397–767/mo (Vapi, Twilio, OpenAI, n8n VPS, GHL, PropStream, DNC Compliance)
              </div>
            </Card>
          </div>
        )}

        {tab === "Feasibility" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card color={C.green}>
              <SectionHeader color={C.green}>Overall Feasibility Assessment</SectionHeader>
              <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>
                Technical Difficulty: 4/10 | Business Difficulty: 6/10 | Time to First Revenue: 7–8 weeks | Revenue Ceiling: Very High
              </div>
            </Card>
          </div>
        )}

        {/* NEW INTEGRATED TAB */}
        {tab === "Vapi Guide" && <VapiMoneyGuide />}
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "16px 32px 32px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 500, color: C.textDim }}>Revised Plan · Vapi Stack · 8-Week Build · B2B Lead-Gen Service Model</span>
        <span style={{ fontSize: 11, fontWeight: 500, color: C.textDim }}>Week 8 → first client → $1,500–7,000/mo → scale to $20K+</span>
      </div>
    </div>
  );
}
