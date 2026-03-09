import { useState } from "react";

const G = {
  bg: "#080810",
  bg2: "#0D0D1A",
  panel: "#111122",
  panelHi: "#161628",
  border: "#1E1E35",
  borderHi: "#2A2A4A",
  gold: "#FFB800",
  goldDim: "#7A5800",
  goldGlow: "#FFB80030",
  cyan: "#00E5FF",
  cyanDim: "#004D5E",
  green: "#00E676",
  greenDim: "#004D1F",
  red: "#FF4444",
  redDim: "#5C0000",
  purple: "#C084FC",
  orange: "#FF7043",
  blue: "#3B9EFF",
  text: "#F0F0FF",
  mid: "#8888AA",
  dim: "#3A3A5A",
  white: "#FFFFFF",
};

const GUIDE_TABS = [
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

function Tag({ children, color = G.gold }) {
  return (
    <span style={{
      fontSize: 9, fontWeight: 800, letterSpacing: 1.5,
      padding: "2px 8px", borderRadius: 3,
      background: color + "18", color, border: `1px solid ${color}35`,
      textTransform: "uppercase", flexShrink: 0,
    }}>{children}</span>
  );
}

function Panel({ children, accent, style = {} }) {
  return (
    <div style={{
      background: G.panel,
      border: `1px solid ${accent ? accent + "30" : G.border}`,
      borderLeft: accent ? `3px solid ${accent}` : `1px solid ${G.border}`,
      borderRadius: 8, padding: "18px 20px", ...style,
    }}>
      {children}
    </div>
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
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "13px 16px", cursor: "pointer", background: open ? G.panelHi : G.panel,
          transition: "background 0.15s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: G.text }}>{title}</span>
          {badge && <Tag color={accent}>{badge}</Tag>}
        </div>
        <span style={{ color: G.dim, fontSize: 11, transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }}>▾</span>
      </div>
      {open && (
        <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${accent}20` }}>
          <div style={{ marginTop: 14 }}>{children}</div>
        </div>
      )}
    </div>
  );
}

function CodeBlock({ code, label }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ marginTop: 10 }}>
      {label && <div style={{ fontSize: 9, fontWeight: 700, color: G.gold, letterSpacing: 2, marginBottom: 6 }}>{label}</div>}
      <div style={{ position: "relative", background: "#050508", border: `1px solid ${G.borderHi}`, borderRadius: 6, overflow: "hidden" }}>
        <button
          onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          style={{ position: "absolute", top: 8, right: 10, background: copied ? G.green + "20" : G.borderHi, border: `1px solid ${copied ? G.green : G.dim}`, color: copied ? G.green : G.mid, fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 4, cursor: "pointer" }}
        >{copied ? "COPIED" : "COPY"}</button>
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

// ─────────────────────────────────────────────
// TAB CONTENT
// ─────────────────────────────────────────────

function Roadmap() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Mission Statement */}
      <div style={{ padding: "20px 24px", background: `linear-gradient(135deg, ${G.gold}10, ${G.cyan}08)`, border: `1px solid ${G.gold}35`, borderRadius: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: G.gold, letterSpacing: 3, marginBottom: 8 }}>THE MISSION</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: G.white, lineHeight: 1.4, marginBottom: 10 }}>
          Build an AI Cold-Calling Service for Real Estate Agents.<br />
          <span style={{ color: G.gold }}>First client in 7–8 weeks. $1,500–3,000/mo. Recurring.</span>
        </div>
        <div style={{ fontSize: 12, color: G.mid, lineHeight: 1.8 }}>
          You are NOT building a custom voice engine. You are using <span style={{ color: G.cyan }}>Vapi</span> as infrastructure and selling the <em>outcome</em>: qualified seller leads delivered to agents on autopilot. Two CS people can build this in 8 weeks. Here is exactly how.
        </div>
      </div>

      {/* 8-week visual timeline */}
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

      {/* What you're actually building */}
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
            <div style={{ minWidth: 120 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.tool}</span>
            </div>
            <div style={{ flex: 1, fontSize: 11, color: G.mid, lineHeight: 1.6 }}>{s.job}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: G.gold, minWidth: 80, textAlign: "right" }}>{s.cost}</div>
          </div>
        ))}
      </Panel>

      {/* Revenue path */}
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

      {/* Non-negotiables */}
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
    "transcript": "AI: Hi, is this John? ... Owner: Yes who's this? ...",
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
        { task: "Set up outbound calling via Vapi API", detail: "Use the Vapi /call/phone endpoint to programmatically start calls. Test with: curl -X POST https://api.vapi.ai/call/phone -H 'Authorization: Bearer YOUR_KEY' -d '{assistantId: ID, phoneNumberId: ID, customer: {number: YOUR_PHONE}}'", time: "1.5 hrs", deliverable: "You can trigger a call to any number via API. This is how n8n will dial leads." },
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
            
            # Extract listing data from JSON embedded in page
            scripts = soup.find_all('script', type='application/json')
            for script in scripts:
                try:
                    data = json.loads(script.string)
                    # Navigate the data structure for listings
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
                            'owner_name': '',  # Will fill via skip trace
                            'phone': '',       # Will fill via skip trace
                            'source': 'Zillow FSBO',
                        })
                except: pass
            
            print(f"Page {page}: Found {len(leads)} total leads so far")
            time.sleep(2)  # Be polite
            
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

const phoneNumber = $json.phone; // e.g. "+16025551234"
const areaCode = phoneNumber.slice(2, 5); // "602"

// Area code to timezone mapping (abbreviated - add all US area codes)
const areaCodeTimezones = {
  // Eastern (UTC-5/-4)
  '212': 'America/New_York', '718': 'America/New_York', '917': 'America/New_York',
  '404': 'America/New_York', '305': 'America/New_York', '617': 'America/New_York',
  // Central (UTC-6/-5)
  '312': 'America/Chicago', '214': 'America/Chicago', '713': 'America/Chicago',
  '612': 'America/Chicago', '504': 'America/Chicago',
  // Mountain (UTC-7/-6)
  '602': 'America/Denver', '720': 'America/Denver', '801': 'America/Denver',
  // Pacific (UTC-8/-7)
  '213': 'America/Los_Angeles', '310': 'America/Los_Angeles', '415': 'America/Los_Angeles',
  '503': 'America/Los_Angeles', '206': 'America/Los_Angeles',
};

const tz = areaCodeTimezones[areaCode] || 'America/New_York'; // Default eastern
const now = new Date();
const localTime = new Date(now.toLocaleString('en-US', { timeZone: tz }));
const hour = localTime.getHours();
const day = localTime.getDay(); // 0=Sun, 6=Sat

// TCPA rules: 8am-9pm local time, any day
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
        { task: "Build agent notification workflow (SMS + email)", detail: "When a hot lead is found: 1) Twilio SMS to agent with lead name, phone, and what they said 2) Email with full transcript 3) Create follow-up task in CRM. Use n8n's Twilio node and Gmail node.", time: "2 hrs", deliverable: "Agent gets SMS within 60 seconds of a hot lead being found" },
        { task: "Set up Calendly integration", detail: "Create a Calendly account. Add your agent's calendar. In n8n: when hot lead found → send Calendly booking link via SMS to both agent and lead. Optional: have AI offer to book during call using Vapi function calling.", time: "1.5 hrs", deliverable: "Hot leads receive booking link automatically" },
      ]} />

      <DayCard day="5-7" accent={G.gold} tasks={[
        { task: "Build the voicemail drop system", detail: "Record a 15-second voicemail: 'Hi [Name], this is Sarah calling about your property at [Address]. I'd love to connect — please call me back at [number] at your convenience.' In n8n: if call = no answer after 2 attempts → trigger Twilio voicemail drop.", time: "2–3 hrs", deliverable: "Voicemail drops automatically on no-answer leads" },
        { task: "Build the SMS follow-up sequence for interested leads", detail: "After a hot lead call: SMS #1 immediately — 'Hi [Name], thanks for chatting! Our agent will call you shortly.' SMS #2 after 24 hrs if no callback — 'Hi [Name], still wanted to connect about [Address]. Best time to reach you?' Use Twilio + n8n delay node.", time: "2 hrs", deliverable: "Automated SMS follow-up on hot leads" },
        { task: "Full end-to-end test: run 20 calls through the complete pipeline", detail: "Load 20 test numbers (use Google Voice numbers or ask friends). Run them through the complete pipeline. Verify: calls fired → logged → hot leads texted → voicemails dropped → sheets updated.", time: "2 hrs", deliverable: "20/20 test calls completed with zero manual intervention" },
        { task: "Get TCPA legal review", detail: "Search 'TCPA attorney' + your state. Send them your system overview + script. Budget $200–500. Ask specifically: are we compliant? Do we need any disclaimers? Is this legal in [your state]?", time: "Schedule call", deliverable: "Legal green light to run live campaigns" },
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
        { task: "Launch your first 100-call campaign (test run)", detail: "Start with 100 calls — not all 350. This is a test. Load the first 100 into n8n. Schedule calls to run between 10am–6pm local time. Watch the first 10 calls live to catch any issues.", time: "Setup: 1 hr, Calls: 1 day", deliverable: "100 calls made, results logged to Google Sheet" },
        { task: "Monitor every call in real time for the first 20", detail: "In Vapi dashboard you can watch calls live. Listen to how homeowners respond. Note exactly where the script loses them. Write down every new objection you haven't handled.", time: "1–2 hrs", deliverable: "10+ new objections documented for script update" },
        { task: "Expected results from 100 calls (be prepared)", detail: "Answer rate: 20–35 calls answered. Interest rate: 3–8 qualified leads from answered calls. Appointments: 1–3 booked. This is NORMAL for a first campaign — don't panic.", time: "Reviewing", deliverable: "1–3 booked appointments from first 100 calls" },
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
        { task: "Build the live Google Sheets conversion dashboard", detail: "Create a Google Sheet with live formulas showing: Calls Made, Answered Rate, Interested Rate, Booked Rate, Cost Per Lead. This becomes your client-facing dashboard.", time: "2–3 hrs", deliverable: "Live dashboard showing campaign performance" },
        { task: "Set up call recording storage", detail: "In n8n: when call ends → download recording URL from Vapi → save to Google Drive folder named by date + lead phone. Every call recorded and searchable.", time: "1.5 hrs", deliverable: "100% of calls have recording stored in Drive" },
        { task: "Review 20 worst-performing calls and update script", detail: "Open your recordings. Listen to calls where the homeowner hung up quickly. Find the EXACT line that lost them. Fix it. Do this weekly forever.", time: "2 hrs", deliverable: "Script v3 with measurably better opening hook" },
        { task: "Compile your full case study document (1 page)", detail: "Write a clean 1-page PDF: what you built, campaign results, cost breakdown, comparison to human callers. Design it to look professional. This is your pitch collateral.", time: "2 hrs", deliverable: "1-page case study ready to send to agents" },
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
        { task: "Build your client acquisition target list — 30 real estate agents", detail: "Search: '[your city] top real estate agents', Zillow Premier Agent listings, Instagram hashtags #[city]realestate. Find 30 agents who are actively posting about finding sellers. Follow them. Note their contact info.", time: "3 hrs", deliverable: "Spreadsheet: 30 agents with IG/LinkedIn + email + phone" },
        { task: "Create your service offer document (see Close Clients tab)", detail: "One clean page: what you offer, expected results, pricing. Three tiers. Simple language. No tech jargon. Agents want leads — your doc should be about leads, not AI.", time: "2 hrs", deliverable: "Service offer PDF ready to send" },
        { task: "Set up your outreach sequences (see Outreach tab)", detail: "Prepare 3 outreach templates: Instagram DM, cold email, LinkedIn message. Personalize each one with the agent's name and city. You'll send these in week 7.", time: "2 hrs", deliverable: "3 outreach templates personalized for your top 10 targets" },
      ]} />

      <DayCard day="Week 7, Thu–Sun" accent={G.green} tasks={[
        { task: "Send outreach to your top 20 agents", detail: "Send Instagram DM to 10 agents. Send cold email to 10 agents. Do NOT use generic templates — personalize every single message with their name, recent listing, or something specific about their market.", time: "3–4 hrs", deliverable: "20 outreach messages sent, 3–6 responses expected" },
        { task: "Join 3 real estate investor Facebook groups in your city", detail: "Search Facebook: '[city] real estate investors', '[city] REIA', '[city] house flippers'. Join and lurk for 2–3 days. Then post your case study as a 'I built this tool and ran a test' story — not a sales pitch.", time: "1 hr setup, ongoing", deliverable: "Member of 3 groups, value post planned" },
        { task: "Post your campaign results on LinkedIn (your own profile)", detail: "Write a post: 'We ran an AI calling campaign targeting homeowners who might want to sell. 100 calls, 3 appointments booked, $48 total cost. Here's exactly what we did.' People WILL DM you.", time: "1 hr", deliverable: "LinkedIn post published with real numbers" },
      ]} />

      <DayCard day="Week 8" accent={G.green} tasks={[
        { task: "Take every sales call that comes in (expect 3–8 this week)", detail: "Use the closing script in the Close Clients tab. Your goal is ONE yes. Not ten. Focus on agents who have been in business 2–5 years — they have money and know the pain of finding leads.", time: "Ongoing", deliverable: "3–8 sales conversations had" },
        { task: "Offer first client a discounted pilot at cost", detail: "If struggling to close: 'Let me run 1,000 calls for you at my cost — $150. You see the results. If you want to continue, we talk about a monthly contract.' Remove the risk and they almost always say yes.", time: "Negotiation", deliverable: "At minimum: paid pilot in progress" },
        { task: "Onboard your first client — set up their system", detail: "Set up: 1) Dedicated Twilio number with their city area code 2) Customized agent script using their name and brand 3) Their Google Sheet CRM 4) Calendly linked to their calendar 5) Weekly reporting email configured", time: "3–4 hrs", deliverable: "Client system live and calling within 48hrs of signing" },
        { task: "Set up weekly automated client report email", detail: "In n8n: every Monday at 9am → query their Google Sheet → calculate week's stats → format HTML email → send via Gmail. They wake up Monday to a report showing the machine is working.", time: "2 hrs", deliverable: "Automated weekly report fires every Monday morning" },
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

## YOUR PERSONALITY
- Warm, conversational, genuinely curious
- Never pushy or salesy
- You're making a friendly inquiry, not a pitch
- Short sentences. Natural pauses. Real conversation.

## CALL FLOW

### OPENING (first 20 seconds)
Say: "Hi, is this [Owner First Name]?"
Wait for response.
If yes: "Hi [Name], this is Sarah — I work with a group of buyers and investors here in [City] who are actively looking for properties right now. I noticed your address came up in our area and I just wanted to reach out quickly — do you have literally 60 seconds?"

### QUALIFY (if they say yes or seem receptive)
Say: "Perfect, thank you. So we work with a handful of buyers who are paying cash and can close fast — no contingencies. I'm not going to waste your time, so let me just ask directly: is selling your property at [Address] something you've thought about at all, even casually?"

### IF INTERESTED
"That's great to hear. Can I ask — is there a number that would make it worth your while? Or is it more about timing for you right now?"
[Listen. Let them talk.]
"That makes total sense. So would it be worth a quick 10-minute call with one of our buyers — no commitment, just to hear a real number on your property? I can set that up for this week."
[If yes → book via Calendly function call]

### IF NOT INTERESTED RIGHT NOW
"Completely understand — I appreciate you being straight with me. Can I just ask, is it more that the timing isn't right, or would it really depend on the price?"
[If timing]: "Fair enough. Would it be okay if I checked back in a few months? Sometimes our buyers' needs change and I'd hate you to miss out if the timing lines up better."
[If price only]: "Got it. If you ever did get a number that made sense, is there a good way to reach you? I won't call constantly — just if something comes up."

## OBJECTION HANDLING

"Is this AI?": 
"Yes it is — I'm an AI assistant. Is that okay? I'm just reaching out on behalf of the team to see if there's any interest before a person reaches back out. Happy to connect you with someone directly if you prefer."

"How much will you pay?":
"That's the right question. Our buyers work on a case-by-case basis depending on condition and timing — so I can't give you a number right now, but that's exactly what the call with a buyer would cover. It's a real conversation with a real number."

"I already have an agent":
"Totally fine — that's not a problem at all. Our buyers sometimes work alongside agents too. Is there anything we'd need to run by your agent if there was interest?"

"I'm not interested":
"No problem at all, I completely understand. Sorry to bother you — have a great day!"
[END CALL]

"Who gave you my number?":
"We work from property records and public listings in the area. I'm sorry if the timing is off — is it okay if I reach back out in a few months, or would you prefer we don't call again?"

"Stop calling me":
"Absolutely, I'm so sorry. We will remove you from our list right away. Have a great day."
[END CALL — mark as DNC in your system]

## BOOKING A CALL
If they agree to a callback, use the end_call function with:
- status: "interested"
- callback_requested: true
- best_time: [what they say]
- notes: [summary of conversation]

## ENDING THE CALL
Always end with: "Thanks so much for your time, [Name]. I really appreciate it. Have a wonderful day!"

## IMPORTANT RULES
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
            {
              label: "Message 1 — Short hook (send first)", 
              msg: "Hey [Name] — quick question. Do you ever struggle to find motivated sellers in [City]? I ran a test last month and got 6 qualified seller leads for under $50. Wanted to see if it'd be useful for you."
            },
            {
              label: "Message 2 — If they reply 'yes' or 'how?'",
              msg: "We built an AI system that calls FSBO and expired listing owners automatically. Had 100 conversations last month — 6 people said they'd seriously consider selling. Would love to show you the exact numbers if you're open to it? Takes 10 min."
            },
            {
              label: "Message 3 — If no reply after 3 days",
              msg: "Hey [Name], not sure if you saw my last message — totally fine if not the right time. If you're ever trying to find sellers without cold calling yourself, happy to share what we built. No pitch, just results. 🏠"
            },
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
            Hi [Agent Name],<br /><br />
            My name is [Your Name]. I recently ran a test AI calling campaign targeting FSBO and expired listing owners in [City]. Here's what happened:<br /><br />
            → 100 calls made<br />
            → 28 homeowners answered<br />
            → 6 expressed serious interest in selling<br />
            → 3 booked appointments<br />
            → Total cost: $48<br /><br />
            I'm looking to run this service for 2–3 real estate agents in [City] who want a consistent flow of motivated seller leads without personally making cold calls.<br /><br />
            Would you be open to a 15-minute call this week? I can walk you through the results and show you exactly how it works. No commitment required — just want to see if it's a fit.<br /><br />
            [Your Name]<br />
            [Phone] | [Email]
          </div>
        </div>
      </Expand>

      <Expand title="💼 LinkedIn Message — Professional Outreach" accent={G.blue} badge="BEST FOR HIGH-VOLUME AGENTS">
        <div style={{ padding: "14px 16px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 8, fontSize: 12, color: G.text, lineHeight: 2 }}>
          Hi [Name],<br /><br />
          Noticed you're one of the top agents in [City] — impressive track record.<br /><br />
          I recently ran an AI-powered calling campaign on FSBO + expired listing owners in the area. Generated 6 qualified seller conversations from 100 calls at a cost of $48.<br /><br />
          Building this as a service for a few select agents in [City]. Wondering if finding motivated sellers is something you'd be interested in solving more systematically?<br /><br />
          Happy to share the full breakdown if useful. 15 min max.
        </div>
      </Expand>

      <Expand title="🏠 Facebook Group Post — Value-First Approach" accent={G.orange} badge="SOFT SELL — HIGH TRUST">
        <div style={{ padding: "14px 16px", background: G.bg, border: `1px solid ${G.border}`, borderRadius: 8, fontSize: 12, color: G.text, lineHeight: 2 }}>
          "Wanted to share something I built and tested last month for anyone who finds it useful.<br /><br />
          I've been experimenting with using AI voice agents to automatically call FSBO and expired listing owners. Ran a 100-call test targeting homeowners in [City] last month.<br /><br />
          Results:<br />
          ✓ 28 calls answered<br />
          ✓ 6 homeowners expressed genuine interest in selling<br />
          ✓ 3 booked appointments with our test agent<br />
          ✓ Total cost: $48<br /><br />
          Not selling anything — just thought some of you might find the approach interesting. Happy to share exactly how we set it up if anyone wants to DM me."
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: G.mid }}>
          This post typically generates 5–15 DMs from curious agents. Respond to every single one. Convert them to a call. Close on the call.
        </div>
      </Expand>

      <Panel accent={G.gold}>
        <SectionTitle accent={G.gold}>Outreach Tracking System</SectionTitle>
        <CodeBlock label="GOOGLE SHEET COLUMNS — TRACK YOUR OUTREACH" code={`| Agent Name | Platform | Message Sent | Date | Response? | Response Text | Call Booked? | Call Date | Outcome |
|------------|----------|-------------|------|-----------|----------------|-------------|-----------|---------|
| John Smith | Instagram | DM #1       | W7-Mon | Yes     | "How does it work?" | Yes | W7-Wed | SIGNED |
| Jane Doe   | Email    | Cold email  | W7-Mon | No      | -              | -           | -         | Follow up W8 |

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

// Node 1: Webhook (POST)
// - Method: POST
// - Path: /vapi-call-ended
// - This is your Vapi serverUrl

// Node 2: Code (extract lead data)
// - See the extraction code in Week 2 tab

// Node 3: IF (was call answered?)
// - Condition: $json.duration > 15 (seconds)
// - True branch → Node 4
// - False branch → Node 8 (log as no-answer)

// Node 4: IF (was lead interested?)
// - Condition: $json.interested === true
// - True branch → Node 5 (hot lead workflow)
// - False branch → Node 8 (log as not interested)

// Node 5: Google Sheets (append to Hot Leads sheet)
// Node 6: Twilio (SMS agent with lead details)
// Node 7: Gmail (email agent with full transcript)
// Node 8: Google Sheets (append to All Calls log)`} />
      </Expand>

      <Expand title="Step 3 — Twilio Phone Setup" accent={G.green} badge="WEEK 3">
        <CodeBlock label="TWILIO SETUP STEPS" code={`// 1. Create Twilio account at twilio.com (free trial = $15 credit)

// 2. Buy a phone number:
// Console → Phone Numbers → Manage → Buy a Number
// Choose area code matching your target city
// Cost: ~$1/month per number

// 3. Import to Vapi:
// Vapi Dashboard → Phone Numbers → Import
// Enter Twilio Account SID + Auth Token + Phone Number

// 4. Configure for outbound calls:
// In Vapi, set default assistant on the phone number
// All calls from this number will use that assistant

// 5. For each new client:
// Buy a NEW Twilio number with their local area code
// Import into Vapi
// Assign their specific assistant
// This keeps campaigns completely separate per client`} />
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

// Node 1: Schedule Trigger
// - Runs every weekday at 10am your local time

// Node 2: Google Sheets (read rows)
// - Sheet: "Ready to Call"
// - Filter: Status = "new" AND IsLegalToCall = TRUE
// - Limit: 50 rows per run (start small)

// Node 3: Loop Over Items
// For each lead in the list:

  // Node 3a: Code (time zone check - see Week 4 code)
  
  // Node 3b: IF (is it legal to call right now?)
  // TRUE:
    // Node 3c: HTTP Request → Vapi API
    // POST https://api.vapi.ai/call/phone
    // Body: { assistantId, phoneNumberId, customer: { number, name } }
    
    // Node 3d: Google Sheets UPDATE
    // Set Status = "calling" for this row
    
    // Node 3e: Wait 30 seconds (avoid flooding)
    
  // FALSE:
    // Node 3f: Google Sheets UPDATE
    // Set Status = "deferred - outside hours"

// Node 4: Slack/Email notification
// "Campaign batch complete: 50 calls triggered"`} />
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
          { obj: "\"I need to think about it\"", ans: "\"Totally get that. What's the main thing you need to think through? Is it budget, or is it more about whether this will actually work in your market?\" [Address the specific concern. Then:] \"What if I set up a 1,000-call pilot for $200 — you see real results with zero risk, and decide from there?\"" },
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
              ✓ Month-to-month · No setup fee · Cancel anytime<br />
              ✓ Includes: lead list, skip tracing, DNC scrubbing, CRM logging, weekly reports<br />
              ✓ First calls go live within 48 hours of sign-up
            </div>
          </div>
        </div>
      </Expand>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────

export function VapiGuideContent() {
  const [tab, setTab] = useState("roadmap");

  const contentMap = {
    roadmap: <Roadmap />,
    w1: <Week1 />,
    w2: <Week2 />,
    w3: <Week3 />,
    w4: <Week4 />,
    w56: <Week56 />,
    w78: <Week78 />,
    scripts: <Scripts />,
    outreach: <Outreach />,
    tech: <TechSetup />,
    close: <CloseClients />,
  };

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', 'JetBrains Mono', 'Fira Code', monospace", color: G.text, fontSize: 13 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700;800&display=swap');
        .guide-tab-btn:hover { background: #161628 !important; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(180deg, #0A0A16 0%, ${G.bg2} 100%)`, borderBottom: `1px solid ${G.border}`, padding: "24px 24px 0", borderRadius: "12px 12px 0 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: G.mid, letterSpacing: 3, marginBottom: 8, display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: G.green, boxShadow: `0 0 8px ${G.green}` }} />
              FULL EXECUTION GUIDE · VAPI + N8N + TWILIO
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 800, color: G.white, letterSpacing: -1, lineHeight: 1.1, marginBottom: 8 }}>
              0 TO <span style={{ color: G.gold, textShadow: `0 0 24px ${G.gold}60` }}>$3,000/MO</span>
              {" "}IN <span style={{ color: G.cyan }}>8 WEEKS</span>
            </div>
            <div style={{ fontSize: 12, color: G.mid }}>Exact steps, real code, scripts, outreach templates, and closing tactics</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { v: "8", l: "Weeks", c: G.gold },
              { v: "~$400", l: "Start Cost", c: G.green },
              { v: "1", l: "Client Needed", c: G.cyan },
              { v: "$1.5K+", l: "Break-even", c: G.gold },
            ].map(s => (
              <div key={s.l} style={{ padding: "10px 14px", background: G.panel, border: `1px solid ${G.border}`, borderRadius: 8, textAlign: "center", minWidth: 72 }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 800, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: G.dim, letterSpacing: 1.5, marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SUB-TABS */}
        <div style={{ display: "flex", gap: 2, flexWrap: "wrap", overflowX: "auto" }}>
          {GUIDE_TABS.map(t => (
            <button key={t.id} className="guide-tab-btn" onClick={() => setTab(t.id)} style={{
              padding: "10px 16px", fontSize: 10, fontWeight: 700, letterSpacing: 1,
              background: tab === t.id ? G.panelHi : "transparent",
              border: "none",
              borderBottom: `2px solid ${tab === t.id ? G.gold : "transparent"}`,
              color: tab === t.id ? G.gold : G.mid,
              cursor: "pointer", borderRadius: "6px 6px 0 0",
              fontFamily: "'IBM Plex Mono', monospace",
              whiteSpace: "nowrap",
            }}>{t.icon} {t.label}</button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ padding: "24px 24px", background: G.bg, borderLeft: `1px solid ${G.border}`, borderRight: `1px solid ${G.border}` }}>
        {contentMap[tab]}
      </div>

      {/* FOOTER */}
      <div style={{ padding: "16px 24px 24px", borderTop: `1px solid ${G.border}`, background: G.bg, borderRadius: "0 0 12px 12px", border: `1px solid ${G.border}`, borderTopColor: G.border, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 10, color: G.dim }}>Vapi · n8n · Twilio · GoHighLevel · BatchSkipTracing</span>
        <span style={{ fontSize: 10, color: G.dim }}>Week 8 → first client → $1,500+/mo → scale from there</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ background: G.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "24px 32px" }}>
        <VapiGuideContent />
      </div>
    </div>
  );
}
