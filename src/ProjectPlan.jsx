import { useState, useEffect } from "react";

const C = {
  bg: "#06070F",
  surface: "#0C0E1C",
  surfaceHigh: "#111428",
  surfaceHover: "#161930",
  border: "#1E2236",
  borderHigh: "#2A2E4A",
  amber: "#F5A623",
  amberGlow: "#F5A62340",
  amberDim: "#7A5212",
  cyan: "#00D4FF",
  cyanGlow: "#00D4FF30",
  cyanDim: "#004D5E",
  green: "#00E676",
  greenGlow: "#00E67630",
  greenDim: "#004D1F",
  red: "#FF5252",
  redGlow: "#FF525230",
  redDim: "#5C1010",
  purple: "#B39DDB",
  purpleGlow: "#B39DDB30",
  purpleDim: "#3B2F6B",
  orange: "#FF7043",
  orangeDim: "#5C1F0A",
  pink: "#F06292",
  pinkDim: "#5C0F2A",
  text: "#E8EAF6",
  textMid: "#9094B0",
  textDim: "#3E4268",
  white: "#FFFFFF",
};

const PHASES = [
  {
    id: 1, label: "P1", title: "Foundation & Environment", weeks: [1, 2],
    color: C.cyan, dim: C.cyanDim, pct: 5,
    tasks: [
      { id: "1A", title: "Dev Environment Setup", week: 1, span: 0.4, diff: "Easy", deliverable: "Working local dev environment", desc: "Python 3.11+, Git, VS Code, virtual environment, Docker basics. This takes half a day — don't spend a week on it." },
      { id: "1B", title: "Prompt Engineering Course", week: 1, span: 0.6, diff: "Easy", deliverable: "First draft of your real estate conversation prompt", desc: "~8 hours. Focus: system prompts, conversation flow, objection handling, few-shot examples. This directly produces your first agent script." },
      { id: "1C", title: "Agentic Workflows Course", week: 2, span: 0.7, diff: "Medium", deliverable: "Written diagram of your agent decision tree", desc: "~10 hours. Focus: tool calling, state machines, decision trees, multi-step flows. Draw the decision tree before writing any code." },
      { id: "1D", title: "LiveKit Agents Docs", week: 2, span: 0.5, diff: "Medium", deliverable: "You understand full architecture before writing code", desc: "~6 hours. VoicePipelineAgent, AgentSession, plugins, telephony overview. Read end-to-end before starting Phase 2." },
    ]
  },
  {
    id: 2, label: "P2", title: "Core Voice Pipeline", weeks: [3, 4],
    color: C.purple, dim: C.purpleDim, pct: 15,
    tasks: [
      { id: "2A", title: "Install & Run Pipecat Examples", week: 3, span: 0.4, diff: "Easy", deliverable: "Working local chatbot you can talk to in terminal", desc: "Clone pipecat repo. Run their example voice agent locally. Understand Frame flow: AudioFrame → TextFrame → AudioFrame. This is your foundation." },
      { id: "2B", title: "Swap In Local Models", week: 3, span: 0.8, diff: "Medium", deliverable: "Full local STT→LLM→TTS pipeline. 3–6s latency expected — fine for now", desc: "STT: Whisper base (CPU). LLM: Llama 3.1 8B via Ollama (GPU). TTS: Piper TTS (CPU). Wire all three together in Pipecat." },
      { id: "2C", title: "Build Voice Activity Detection", week: 3, span: 0.5, diff: "Medium", deliverable: "VAD working correctly in 90% of test cases", desc: "Silero VAD (free, open source). Test with background noise — TV on, music playing. Log every false trigger. Fix the threshold." },
      { id: "2D", title: "Build Interruption Handler", week: 4, span: 0.8, diff: "Hard", deliverable: "AI stops talking immediately when you interrupt. Test 20+ times.", desc: "When you speak while AI responds: cut TTS stream mid-sentence. Don't finish the thought. Listen. Resume naturally. Requires cancelling on UserStartedSpeakingFrame." },
      { id: "2E", title: "Conversation State Manager", week: 4, span: 0.7, diff: "Medium", deliverable: "State object that correctly tracks a full mock conversation", desc: "Stages: INTRO → QUALIFY → OBJECTION → BOOK → END. Python dataclass holding current stage, property data, owner name, objections raised so far." },
    ]
  },
  {
    id: 3, label: "P3", title: "Telephony Integration", weeks: [5, 6],
    color: C.green, dim: C.greenDim, pct: 25,
    tasks: [
      { id: "3A", title: "Telnyx SIP Docs + Account", week: 5, span: 0.4, diff: "Medium", deliverable: "Telnyx account ready, SIP config understood", desc: "~3 hours. SIP trunking, outbound dialing, audio codec (mulaw G.711). Create free Telnyx account. Read outbound calling guide fully." },
      { id: "3B", title: "LiveKit SIP Bridge Setup", week: 5, span: 0.8, diff: "Hard", deliverable: "You can trigger a call to your phone from your code", desc: "Telnyx → LiveKit SIP → your agent. PSTN call becomes WebRTC room participant your agent can hear and speak to. Follow LiveKit telephony docs exactly — don't improvise." },
      { id: "3C", title: "First Real Call To Yourself", week: 5, span: 0.4, diff: "Medium", deliverable: "First successful end-to-end phone conversation with your agent", desc: "Your agent calls your phone. You answer. It says hello. You talk. It responds. Even at 4s latency — this is a major milestone. Record and listen back." },
      { id: "3D", title: "Voicemail Detection (AMD)", week: 6, span: 0.8, diff: "Hard", deliverable: "Agent correctly identifies voicemail 80%+ of the time", desc: "Answering Machine Detection. Detect within 3 seconds, play 15-second message, hang up. Use audio energy + pause pattern analysis. Known hard problem — budget extra time here." },
      { id: "3E", title: "Call Outcome Logging", week: 6, span: 0.5, diff: "Easy", deliverable: "Every test call has a complete log entry you can review", desc: "Log: timestamp, number called, duration, outcome (answered/voicemail/no-answer/interested/booked), full transcript. SQLite locally first." },
      { id: "3F", title: "Retry & Scheduling Logic", week: 6, span: 0.5, diff: "Medium", deliverable: "Automated retry system running on test data", desc: "No answer → retry in 4hrs. Voicemail → next day different time. 'Call Thursday' → schedule Thursday. DNC requested → flag permanently. Use APScheduler." },
    ]
  },
  {
    id: 4, label: "P4", title: "Conversation Logic & Prompts", weeks: [7, 8],
    color: C.amber, dim: C.amberDim, pct: 33,
    tasks: [
      { id: "4A", title: "Write Full Conversation Script v1", week: 7, span: 0.8, diff: "Hard", deliverable: "Document with every conversation branch mapped", desc: "Cover all branches: intro, qualify, 8 objections, price deflection, spouse handoff, angry owner, 'is this a robot', booking, end call. Write it in a doc BEFORE touching code." },
      { id: "4B", title: "Convert Script to System Prompt", week: 7, span: 0.5, diff: "Medium", deliverable: "System prompt under 2000 tokens", desc: "Translate conversation doc into structured system prompt: persona definition, rules, property context injection, response length limits, tone, tool calling instructions." },
      { id: "4C", title: "Test 20 Edge Cases On Yourself", week: 7, span: 0.5, diff: "Medium", deliverable: "List of 20 test cases with pass/fail results", desc: "Call yourself and manually trigger each edge case. Record every failure. Update prompt after each one. Don't move on until you have 20 distinct scenarios documented." },
      { id: "4D", title: "Property Data Injection", week: 8, span: 0.5, diff: "Medium", deliverable: "Agent correctly references property details mid-conversation", desc: "Agent must know: owner name, address, estimated value, last sale date, days on market if listed. Write function that injects this into prompt context before each call starts." },
      { id: "4E", title: "Prompt Refinement Cycle", week: 8, span: 0.8, diff: "Hard", deliverable: "Prompt v3+ with documented change log", desc: "30 more self-calls. Have a friend act as homeowner with zero coaching. Find every failure. Rewrite until 80% of conversations reach the qualification stage." },
      { id: "4F", title: "'Is This A Robot?' Handler", week: 8, span: 0.5, diff: "Hard", deliverable: "Single best response that passes robot test in 7/10 tries", desc: "The most critical single moment. Honest, non-defensive response that keeps the call alive. Test 10 different variations. Pick the one with best call retention." },
    ]
  },
  {
    id: 5, label: "P5", title: "CRM & Booking Integration", weeks: [9, 10],
    color: C.orange, dim: C.orangeDim, pct: 40,
    tasks: [
      { id: "5A", title: "Mock CRM Data Layer", week: 9, span: 0.4, diff: "Easy", deliverable: "50 fake leads ready to feed into your agent", desc: "Local SQLite/JSON mimicking your CRM: owner_name, phone, address, property_value, notes, call_history, status. Write seed script with 50 realistic fake leads." },
      { id: "5B", title: "CRM → Call Trigger Webhook", week: 9, span: 0.5, diff: "Medium", deliverable: "Adding a CRM record automatically starts a call", desc: "FastAPI webhook endpoint. CRM posts new lead → your server pulls data → initiates call via Telnyx. Zero manual steps between lead added and call placed." },
      { id: "5C", title: "Calendly API Integration", week: 9, span: 0.8, diff: "Medium", deliverable: "Full booking flow tested. Appointment appears in Calendly.", desc: "Owner says yes → agent reads your available slots from Calendly API → offers 2 options → books the one they pick → sends confirmation. Fully hands-free." },
      { id: "5D", title: "Post-Call CRM Update", week: 10, span: 0.4, diff: "Easy", deliverable: "Zero manual CRM updates needed after any call", desc: "After every call: write outcome, transcript summary, next action, appointment details back to CRM automatically. No manual data entry. Ever." },
      { id: "5E", title: "SMS Reminder System", week: 10, span: 0.4, diff: "Easy", deliverable: "Automated SMS fires correctly 24hrs before test appointments", desc: "24 hours before appointment: SMS to owner confirming name, time, your number. Twilio free trial. This one feature alone cuts no-show rate significantly." },
      { id: "5F", title: "End-to-End Integration Test", week: 10, span: 0.8, diff: "Medium", deliverable: "10/10 runs complete without manual intervention", desc: "Full flow 10 times: Add lead → call fires → conversation → book → CRM updates → SMS fires. Document every failure. Fix every single one before moving on." },
    ]
  },
  {
    id: 6, label: "P6", title: "Edge Cases, Defects & Readiness", weeks: [11, 12],
    color: C.pink, dim: C.pinkDim, pct: 45,
    tasks: [
      { id: "6A", title: "Stress Test: 50 Self-Calls", week: 11, span: 0.8, diff: "Medium", deliverable: "Bug tracker with 50 logged calls and all defects documented", desc: "Call yourself 50 times over 3 days. Different times of day. Different noise levels. Try to break it every way you can think of. Log every defect — GitHub Issues or Notion." },
      { id: "6B", title: "Friend Test: 20 Blind Calls", week: 11, span: 0.8, diff: "Medium", deliverable: "20 friend test calls with full transcript analysis", desc: "3–4 friends answer without coaching. They act completely natural. Watch where the agent breaks on real unexpected human behavior. This will reveal bugs self-testing never could." },
      { id: "6C", title: "Defect Priority & Fix Cycle", week: 11, span: 0.5, diff: "Medium", deliverable: "Zero P0 bugs. Top 5 P1s resolved.", desc: "Sort all bugs: P0 (call crashes), P1 (bad experience), P2 (minor). Fix all P0s immediately. Fix top 5 P1s. P2s go to backlog. Retest every single fix." },
      { id: "6D", title: "Failure Mode Documentation", week: 12, span: 0.4, diff: "Easy", deliverable: "Written failure mode doc — your honest system assessment", desc: "Document every known failure: what causes it, what agent does wrong, whether it's fixed or in backlog. This becomes your go/no-go checklist before real calls." },
      { id: "6E", title: "Final Pipeline Verification", week: 12, span: 0.8, diff: "Medium", deliverable: "Pass/fail report against 4 key metrics", desc: "20 calls over 2 days. Targets: 85% complete without crash, 70% reach qualification stage, booking works 100% of interested cases, CRM updated on all calls." },
      { id: "6F", title: "Production Readiness Sign-Off", week: 12, span: 0.4, diff: "Easy", deliverable: "All green = ready to spend real money on real homeowners", desc: "Signed checklist: pipeline stable, P0 bugs zero, CRM working, booking working, logging complete, 20+ edge cases handled, all failure modes documented and known." },
    ]
  },
];

const DIFF = { Easy: C.green, Medium: C.amber, Hard: C.red };

const REMAINING = [
  { label: "Error Handling & Reliability", pct: 8, fill: 4, diff: "Hard", note: "APIs fail mid-call — you need graceful fallbacks everywhere or calls die silently" },
  { label: "Real Human Edge Cases", pct: 10, fill: 8, diff: "Hard", note: "Accents, spouse handoffs, angry owners — impossible to simulate with self-testing" },
  { label: "Concurrent Call Management", pct: 7, fill: 3, diff: "Medium", note: "10–50 simultaneous calls with fully isolated state per call" },
  { label: "Compliance Infrastructure", pct: 8, fill: 4, diff: "Hard", note: "TCPA, DNC scrubbing, recording consent — legally non-negotiable, can end business" },
  { label: "Monitoring & Observability", pct: 4, fill: 2, diff: "Medium", note: "Know which call failed at which second and why — blind without this" },
  { label: "Production Deployment", pct: 5, fill: 2, diff: "Medium", note: "VPS, uptime SLA, load testing, CI/CD pipeline" },
  { label: "Prompt Iteration (Real Data)", pct: 13, fill: 8, diff: "Hard", note: "v1 → v23: only real homeowners teach you what's broken" },
];

const EDGE_CASES = [
  { case: "Owner hands phone to spouse mid-call", why: "Conversation context breaks completely" },
  { case: "Heavy accent speaker", why: "STT accuracy drops 30–40% — LLM gets garbage" },
  { case: "Same question asked 3 times", why: "Agent loops or gives inconsistent answers" },
  { case: "Owner silent for 8+ seconds", why: "VAD triggers incorrectly, AI interrupts" },
  { case: '"Yeah yeah" impatient response', why: "Agent ignores social cues, keeps pitching" },
  { case: "Asks for specific home valuation", why: "Needs graceful deflection to appointment" },
  { case: "Owner swears or gets aggressive", why: "Needs de-escalation logic, not more pitch" },
  { case: "Heavy background noise (TV, kids)", why: "STT transcribes noise as real words" },
  { case: "Very fast talker", why: "STT misses words, LLM receives broken input" },
  { case: '"Is this a robot / AI?"', why: "Most critical moment — wrong answer = immediate hang-up" },
];

const TABS = ["Overview", "Readiness", "Gantt", "Tasks", "Pipeline", "Costs"];

function AnimatedBar({ pct, color, height = 8 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 400); return () => clearTimeout(t); }, [pct]);
  return (
    <div style={{ height, background: C.border, borderRadius: 99, overflow: "hidden" }}>
      <div style={{
        height: "100%", width: `${w}%`, borderRadius: 99,
        background: `linear-gradient(90deg, ${color}99, ${color})`,
        transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: `0 0 8px ${color}60`,
      }} />
    </div>
  );
}

function BlockBar({ fill, total = 10, color }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: 16, height: 16, borderRadius: 3,
          background: i < fill ? color : C.border,
          boxShadow: i < fill ? `0 0 6px ${color}50` : "none",
          transition: "all 0.2s",
        }} />
      ))}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("Overview");
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [checks, setChecks] = useState({});
  const toggleCheck = (i) => setChecks(c => ({ ...c, [i]: !c[i] }));
  const checkedCount = Object.values(checks).filter(Boolean).length;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", color: C.text, fontSize: 13 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.borderHigh}; border-radius: 99px; }
        .hover-row:hover { background: ${C.surfaceHover} !important; }
        .tab-btn { transition: all 0.2s ease !important; }
        .tab-btn:hover { background: ${C.surfaceHigh} !important; color: ${C.text} !important; }
        .phase-bar:hover { opacity: 1 !important; }
        .card:hover { border-color: ${C.borderHigh} !important; }
        .stat-glow { animation: pulse 3s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.8 } }
        .tag { font-size: 10px; font-weight: 600; padding: 2px 9px; border-radius: 99px; letter-spacing: 0.5px; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ background: `linear-gradient(180deg, #0A0C1E 0%, ${C.surface} 100%)`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1380, margin: "0 auto", padding: "28px 32px 0" }}>

          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, boxShadow: `0 0 10px ${C.green}` }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: C.textMid, letterSpacing: 3, textTransform: "uppercase" }}>
                  AI Voice Agent · Real Estate Lead Outreach
                </span>
              </div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 38, fontWeight: 800, color: C.white, letterSpacing: -1.5, lineHeight: 1.05, marginBottom: 8 }}>
                FROM ZERO TO <span style={{ color: C.amber, textShadow: `0 0 30px ${C.amber}80` }}>45%</span> PRODUCTION
              </h1>
              <p style={{ fontSize: 13, color: C.textMid, fontWeight: 400, lineHeight: 1.5 }}>
                12-Week Build Plan · Full Learning Phase · Local RTX 3060 Ti · Complete Pipeline Architecture
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[
                { v: "12", l: "Weeks", c: C.cyan },
                { v: "6", l: "Phases", c: C.purple },
                { v: "30", l: "Tasks", c: C.green },
                { v: "$0", l: "Phase Cost", c: C.amber },
                { v: "45%", l: "Complete", c: C.green },
                { v: "55%", l: "Remaining", c: C.red },
              ].map(s => (
                <div key={s.l} style={{
                  padding: "14px 18px", background: C.surfaceHigh,
                  border: `1px solid ${C.border}`, borderRadius: 10,
                  textAlign: "center", minWidth: 80,
                }}>
                  <div style={{
                    fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800,
                    color: s.c, lineHeight: 1,
                    textShadow: `0 0 20px ${s.c}80`,
                  }} className="stat-glow">{s.v}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: C.textDim, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 5 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 2 }}>
            {TABS.map(t => (
              <button key={t} className="tab-btn" onClick={() => setTab(t)} style={{
                padding: "11px 24px", fontSize: 12, fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                background: tab === t ? C.surfaceHigh : "transparent",
                border: "none", borderBottom: `2px solid ${tab === t ? C.amber : "transparent"}`,
                color: tab === t ? C.amber : C.textMid,
                cursor: "pointer", letterSpacing: 0.5,
                borderRadius: "6px 6px 0 0",
                textAlign: "center",
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "28px 32px" }}>

        {/* ═══ OVERVIEW ═══ */}
        {tab === "Overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Learning Phase definition + 45/55 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16 }}>

              {/* Left: Definition */}
              <div className="card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.cyan, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 20 }}>
                  What "Learning Phase" Means
                </div>
                {["Study the topics", "Build the full system locally", "Call your own number", "Test every edge case you can think of", "Find and fix defects"].map((step, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0" }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: "50%",
                        background: C.cyanDim, border: `1.5px solid ${C.cyan}55`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 700, color: C.cyan, flexShrink: 0,
                      }}>{i + 1}</div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{step}</span>
                    </div>
                    {i < 4 && <div style={{ marginLeft: 15, width: 1, height: 10, background: C.border }} />}
                  </div>
                ))}
                <div style={{ marginTop: 20, padding: "14px 16px", background: `${C.cyan}0D`, border: `1px solid ${C.cyan}30`, borderRadius: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.cyan }}>=  LEARNING PHASE COMPLETE</div>
                  <div style={{ fontSize: 12, color: C.textMid, marginTop: 4 }}>Not just studying. Not just building. All of it together.</div>
                </div>
              </div>

              {/* Right: 45/55 visual */}
              <div className="card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 20 }}>
                  Where This Plan Gets You
                </div>

                <div style={{ marginBottom: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.textMid }}>Learning Phase End Point</span>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: C.green, textShadow: `0 0 16px ${C.green}60` }}>45%</span>
                  </div>
                  <AnimatedBar pct={45} color={C.green} height={10} />
                  <div style={{ marginTop: 8, display: "flex", gap: 3 }}>
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} style={{ flex: 1, height: 5, background: i < 9 ? C.green : C.border, borderRadius: 2, opacity: i < 9 ? 0.85 : 0.25, boxShadow: i < 9 ? `0 0 4px ${C.green}60` : "none" }} />
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.textMid }}>Remaining to 100% Production</span>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: C.red, textShadow: `0 0 16px ${C.red}60` }}>55%</span>
                  </div>
                  <AnimatedBar pct={55} color={C.red} height={10} />
                </div>

                <div style={{ fontSize: 11, fontWeight: 700, color: C.textDim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>That 55% Breaks Down As:</div>
                {REMAINING.map((r, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 500, color: C.textMid }}>{r.label}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className="tag" style={{ background: `${DIFF[r.diff]}18`, color: DIFF[r.diff], border: `1px solid ${DIFF[r.diff]}30` }}>{r.diff}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: DIFF[r.diff], minWidth: 30, textAlign: "right" }}>{r.pct}%</span>
                      </div>
                    </div>
                    <BlockBar fill={r.fill} color={DIFF[r.diff]} />
                  </div>
                ))}
              </div>
            </div>

            {/* 55% nobody talks about */}
            <div className="card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 4, height: 24, background: C.red, borderRadius: 2, boxShadow: `0 0 8px ${C.red}` }} />
                <div style={{ fontSize: 11, fontWeight: 700, color: C.red, letterSpacing: 2.5, textTransform: "uppercase" }}>
                  The 55% Nobody Talks About — What Separates a Demo From Production
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
                {[
                  { title: "Production Conversation Quality", pct: "~10%", color: C.red, items: ["Owner hands phone to spouse mid-call", "Heavy accent drops STT accuracy 30–40%", "Same question 3 times — agent loops", "8-second silence triggers VAD falsely", '"Yeah yeah" — agent ignores social cues', '"Is this a robot?" — most critical moment'] },
                  { title: "Reliability & Error Handling", pct: "~8%", color: C.amber, items: ["Deepgram API goes down mid-call", "ElevenLabs 429 rate limit during live call", "Telnyx drops audio stream at second 45", "LLM takes 4 seconds on one response", "CRM webhook silently fails to fire", "Server OOM on call 47"] },
                  { title: "Concurrent Call Management", pct: "~7%", color: C.purple, items: ["Each call needs fully isolated state", "Memory multiplies with each active call", "GPU/CPU contention between simultaneous calls", "One crashed call cannot kill others", "Logs cannot get calls mixed up"] },
                  { title: "Compliance Infrastructure", pct: "~8%", color: C.orange, items: ["DNC list scrubbing before every call", "State-by-state calling hour restrictions", "Call recording consent disclosure", "Opt-out handling mid-conversation", "TCPA audit trail — legally required"] },
                ].map(section => (
                  <div key={section.title} style={{ background: C.surfaceHigh, border: `1px solid ${section.color}20`, borderLeft: `3px solid ${section.color}`, borderRadius: 8, padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: section.color }}>{section.title}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: section.color }}>{section.pct}</span>
                    </div>
                    {section.items.map(item => (
                      <div key={item} style={{ display: "flex", gap: 8, padding: "4px 0", fontSize: 12, color: C.textMid, borderBottom: `1px solid ${C.border}40` }}>
                        <span style={{ color: section.color, flexShrink: 0, fontWeight: 700 }}>›</span>{item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Edge cases + % breakdown */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 16 }}>
              <div className="card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 4, height: 20, background: C.amber, borderRadius: 2 }} />
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: 2.5, textTransform: "uppercase" }}>Real Human Edge Cases</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {EDGE_CASES.map((e, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 7 }}>
                      <span style={{ color: C.red, fontWeight: 700, fontSize: 13, flexShrink: 0, marginTop: 1 }}>!</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{e.case}</div>
                        <div style={{ fontSize: 11, color: C.textMid, marginTop: 2 }}>{e.why}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12, padding: "10px 14px", background: `${C.red}0C`, border: `1px solid ${C.red}20`, borderRadius: 7, fontSize: 12, color: C.textMid }}>
                  <span style={{ color: C.red, fontWeight: 700 }}>Takes 4–6 weeks of real call data to fix. </span>Impossible to find with self-testing alone.
                </div>
              </div>

              {/* % table */}
              <div className="card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 4, height: 20, background: C.cyan, borderRadius: 2 }} />
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.cyan, letterSpacing: 2.5, textTransform: "uppercase" }}>Honest % Breakdown After Learning Phase</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {[
                    { comp: "Core Pipeline (STT→LLM→TTS)", done: 90, remain: 10 },
                    { comp: "Telephony Integration", done: 75, remain: 25 },
                    { comp: "Conversation Logic v1", done: 60, remain: 40 },
                    { comp: "CRM Integration", done: 65, remain: 35 },
                    { comp: "Error Handling", done: 10, remain: 90 },
                    { comp: "Concurrent Calls", done: 0, remain: 100 },
                    { comp: "Compliance System", done: 0, remain: 100 },
                    { comp: "Monitoring / Logging", done: 10, remain: 90 },
                    { comp: "Prompt Refinement", done: 20, remain: 80 },
                    { comp: "Production Deployment", done: 20, remain: 80 },
                  ].map((row, i) => {
                    const dc = row.done > 60 ? C.green : row.done > 20 ? C.amber : C.red;
                    const rc = row.remain > 70 ? C.red : row.remain > 30 ? C.amber : C.green;
                    return (
                      <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 110px 110px", gap: 8, alignItems: "center", padding: "8px 10px", background: i % 2 === 0 ? C.surfaceHigh : "transparent", borderRadius: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{row.comp}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ flex: 1, height: 5, background: C.border, borderRadius: 99, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${row.done}%`, background: dc, borderRadius: 99 }} />
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: dc, minWidth: 28, textAlign: "right" }}>{row.done}%</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ flex: 1, height: 5, background: C.border, borderRadius: 99, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${row.remain}%`, background: rc, borderRadius: 99 }} />
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: rc, minWidth: 28, textAlign: "right" }}>{row.remain}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.textMid }}>Column: Done after learning → Remaining</span>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[["Done", C.green], ["Left", C.red]].map(([l, c]) => (
                      <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                        <span style={{ fontSize: 10, color: C.textMid }}>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ═══ READINESS ═══ */}
        {tab === "Readiness" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Hardware */}
            <div className="card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 4, height: 20, background: C.cyan, borderRadius: 2 }} />
                <div style={{ fontSize: 11, fontWeight: 700, color: C.cyan, letterSpacing: 2.5, textTransform: "uppercase" }}>RTX 3060 Ti (8GB VRAM) — Capability Assessment</div>
              </div>
              <div style={{ padding: "12px 16px", background: `${C.amber}0C`, border: `1px solid ${C.amber}25`, borderRadius: 8, fontSize: 13, color: C.textMid, marginBottom: 16, lineHeight: 1.6 }}>
                <span style={{ color: C.amber, fontWeight: 700 }}>Critical constraint: </span>
                You cannot run STT + LLM simultaneously on 8GB VRAM. They compete directly for memory.
                Solution: Whisper base on CPU for STT, Llama 3.1 8B quantized on GPU for LLM.
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {["Component", "Local Option", "Fits 8GB?", "Note", "Quality"].map(h => (
                      <th key={h} style={{ padding: "8px 14px", fontSize: 10, fontWeight: 700, color: C.textDim, textAlign: "left", letterSpacing: 1.5, textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { comp: "STT", local: "Whisper medium", fits: "yes", note: "~3GB VRAM", quality: "Good", qc: C.green },
                    { comp: "LLM", local: "Llama 3.1 8B (quantized)", fits: "yes", note: "~5GB VRAM", quality: "Decent", qc: C.amber },
                    { comp: "TTS", local: "Coqui TTS / Piper", fits: "cpu", note: "CPU only", quality: "Mediocre", qc: C.orange },
                    { comp: "Telephony", local: "Cannot run locally", fits: "no", note: "—", quality: "N/A", qc: C.textDim },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.border}30`, background: i % 2 === 0 ? C.surfaceHigh : "transparent" }}>
                      <td style={{ padding: "13px 14px", fontSize: 13, fontWeight: 700, color: C.amber }}>{row.comp}</td>
                      <td style={{ padding: "13px 14px", fontSize: 12, color: C.text }}>{row.local}</td>
                      <td style={{ padding: "13px 14px" }}>
                        {row.fits === "yes" && <span className="tag" style={{ background: C.greenGlow, color: C.green, border: `1px solid ${C.green}30` }}>✓ Yes</span>}
                        {row.fits === "cpu" && <span className="tag" style={{ background: C.amberGlow, color: C.amber, border: `1px solid ${C.amber}30` }}>⚠ CPU</span>}
                        {row.fits === "no" && <span className="tag" style={{ background: C.redGlow, color: C.red, border: `1px solid ${C.red}30` }}>✗ No</span>}
                      </td>
                      <td style={{ padding: "13px 14px", fontSize: 12, color: C.textMid }}>{row.note}</td>
                      <td style={{ padding: "13px 14px", fontSize: 12, fontWeight: 600, color: row.qc }}>{row.quality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Free vs Paid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div className="card" style={{ background: C.surface, border: `1px solid ${C.green}25`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16 }}>✓ Works Completely Free</div>
                {["Conversation logic and prompts", "Orchestration / state management code", "CRM integration (mock data)", "Calendar booking logic", "Call flow and branching logic", "Voicemail detection logic", "Retry & scheduling system", "Monitoring dashboard build", "Testing with pre-recorded audio files", "End-to-end pipeline (just slow)"].map(item => (
                  <div key={item} style={{ display: "flex", gap: 10, padding: "7px 0", fontSize: 12, color: C.textMid, borderBottom: `1px solid ${C.border}30` }}>
                    <span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>✓</span>{item}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="card" style={{ background: C.surface, border: `1px solid ${C.red}25`, borderRadius: 12, padding: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.red, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 14 }}>✗ Cannot Do For Free</div>
                  {[
                    { item: "Call real phone numbers", note: "Telnyx/Twilio required — no workaround" },
                    { item: "Sub-second latency pipeline", note: "Cloud APIs mandatory for production speed" },
                    { item: "Production quality TTS voice", note: "ElevenLabs or Cartesia required" },
                    { item: "DNC compliance scrubbing", note: "$25–50/mo — legally non-negotiable" },
                  ].map(({ item, note }) => (
                    <div key={item} style={{ padding: "8px 0", borderBottom: `1px solid ${C.border}30` }}>
                      <div style={{ display: "flex", gap: 10, fontSize: 12, color: C.textMid }}>
                        <span style={{ color: C.red, fontWeight: 700, flexShrink: 0 }}>✗</span>{item}
                      </div>
                      <div style={{ fontSize: 11, color: C.textDim, marginTop: 2, paddingLeft: 20 }}>{note}</div>
                    </div>
                  ))}
                </div>
                <div className="card" style={{ background: C.surface, border: `1px solid ${C.amber}25`, borderRadius: 12, padding: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 12 }}>Bridge: Free API Tiers (Week 5)</div>
                  {["Twilio free trial → $15 credit, real calls", "Deepgram free tier → 200 hours free", "OpenAI → free credits on new account", "ElevenLabs free → 10k chars/month"].map(item => (
                    <div key={item} style={{ fontSize: 12, color: C.textMid, padding: "4px 0" }}>→ {item}</div>
                  ))}
                  <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: C.amber }}>Spend $0 but get real API quality for testing.</div>
                </div>
              </div>
            </div>

            {/* Readiness checklist */}
            <div className="card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 4, height: 20, background: C.amber, borderRadius: 2 }} />
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: 2.5, textTransform: "uppercase" }}>Are You Ready To Spend Money? — Click to check off</div>
                </div>
                <div style={{
                  padding: "6px 16px", borderRadius: 99,
                  background: checkedCount === 6 ? C.greenGlow : checkedCount >= 4 ? C.amberGlow : C.redGlow,
                  border: `1px solid ${checkedCount === 6 ? C.green : checkedCount >= 4 ? C.amber : C.red}40`,
                  fontSize: 12, fontWeight: 700,
                  color: checkedCount === 6 ? C.green : checkedCount >= 4 ? C.amber : C.red,
                }}>
                  {checkedCount}/6 · {checkedCount === 6 ? "READY TO SPEND" : checkedCount >= 4 ? "GETTING CLOSE" : "NOT YET"}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { q: "Can you write a basic webhook handler?", y: "Getting close", n: "Not yet" },
                  { q: "Have you run any LLM API call in code?", y: "Getting close", n: "Not yet" },
                  { q: "Do you understand async/await deeply?", y: "Getting close", n: "Not yet" },
                  { q: "Have you read LiveKit or Pipecat docs?", y: "Getting close", n: "Not yet" },
                  { q: "Have you written your conversation script?", y: "Ready", n: "Not yet" },
                  { q: "Can you explain VAD in your own words?", y: "Ready", n: "Not yet" },
                ].map((r, i) => (
                  <div key={i} className="hover-row" onClick={() => toggleCheck(i)} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "13px 16px", background: checks[i] ? `${C.green}0C` : C.surfaceHigh,
                    border: `1px solid ${checks[i] ? C.green + "30" : C.border}`,
                    borderRadius: 8, cursor: "pointer", transition: "all 0.15s", flexWrap: "wrap", gap: 8,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: 5,
                        border: `2px solid ${checks[i] ? C.green : C.borderHigh}`,
                        background: checks[i] ? C.green : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, color: "#000", fontWeight: 800, flexShrink: 0,
                        boxShadow: checks[i] ? `0 0 10px ${C.green}50` : "none",
                        transition: "all 0.2s",
                      }}>{checks[i] ? "✓" : ""}</div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: checks[i] ? C.text : C.textMid }}>{r.q}</span>
                    </div>
                    <div style={{ display: "flex", gap: 16 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: C.green }}>YES → {r.y}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: C.red }}>NO → {r.n}</span>
                    </div>
                  </div>
                ))}
              </div>
              {checkedCount === 6 && (
                <div style={{ marginTop: 14, padding: "14px 18px", background: `${C.green}0C`, border: `1px solid ${C.green}30`, borderRadius: 8, fontSize: 13, fontWeight: 700, color: C.green, textAlign: "center" }}>
                  ✓ All 6 checked — You are ready to spend real money on real calls
                </div>
              )}
            </div>

          </div>
        )}

        {/* ═══ GANTT ═══ */}
        {tab === "Gantt" && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textDim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
              Click phase to expand tasks · Click task to view detail
            </div>

            {/* Week header */}
            <div style={{ display: "grid", gridTemplateColumns: "270px repeat(12, 1fr)", paddingBottom: 10, borderBottom: `1px solid ${C.border}`, marginBottom: 6 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, padding: "0 14px", letterSpacing: 1.5 }}>PHASE</div>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} style={{ fontSize: 10, fontWeight: 700, color: C.textDim, textAlign: "center", letterSpacing: 1 }}>W{i + 1}</div>
              ))}
            </div>

            {PHASES.map(phase => (
              <div key={phase.id}>
                {/* Phase row */}
                <div
                  className="hover-row"
                  onClick={() => { setExpandedPhase(expandedPhase === phase.id ? null : phase.id); setSelectedTask(null); }}
                  style={{
                    display: "grid", gridTemplateColumns: "270px repeat(12, 1fr)",
                    alignItems: "center", borderRadius: 8, padding: "3px 0", marginBottom: 4,
                    background: expandedPhase === phase.id ? C.surfaceHigh : "transparent",
                    cursor: "pointer", transition: "background 0.15s",
                  }}
                >
                  <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 9, color: C.textDim }}>{expandedPhase === phase.id ? "▼" : "▶"}</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: phase.color, letterSpacing: 1.5 }}>{phase.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.textMid }}>{phase.title}</span>
                  </div>
                  {Array.from({ length: 12 }, (_, i) => {
                    const w = i + 1, inPhase = w >= phase.weeks[0] && w <= phase.weeks[1];
                    const isStart = w === phase.weeks[0], isEnd = w === phase.weeks[1];
                    return (
                      <div key={i} style={{ height: 36, display: "flex", alignItems: "center", padding: "0 1px", borderLeft: `1px solid ${C.border}25` }}>
                        {inPhase && (
                          <div style={{
                            height: 26, width: "100%",
                            background: `linear-gradient(90deg, ${phase.dim}, ${phase.color}CC)`,
                            borderRadius: `${isStart ? 6 : 0}px ${isEnd ? 6 : 0}px ${isEnd ? 6 : 0}px ${isStart ? 6 : 0}px`,
                            display: "flex", alignItems: "center",
                            boxShadow: `0 0 10px ${phase.color}25`,
                          }}>
                            {isStart && <span style={{ fontSize: 9, fontWeight: 800, color: "#000", paddingLeft: 8 }}>{phase.pct}%</span>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Tasks */}
                {expandedPhase === phase.id && phase.tasks.map(task => (
                  <div key={task.id}>
                    <div
                      className="hover-row"
                      onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
                      style={{
                        display: "grid", gridTemplateColumns: "270px repeat(12, 1fr)",
                        alignItems: "center", borderRadius: 6, padding: "2px 0", marginBottom: 2,
                        background: selectedTask?.id === task.id ? C.surface : "transparent",
                        cursor: "pointer", transition: "background 0.15s",
                      }}
                    >
                      <div style={{ padding: "5px 14px 5px 32px", display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: DIFF[task.diff], flexShrink: 0, boxShadow: `0 0 6px ${DIFF[task.diff]}80` }} />
                        <span style={{ fontSize: 11, fontWeight: 500, color: C.textMid }}>{task.title}</span>
                      </div>
                      {Array.from({ length: 12 }, (_, i) => (
                        <div key={i} style={{ height: 24, display: "flex", alignItems: "center", padding: "0 1px", borderLeft: `1px solid ${C.border}15` }}>
                          {i + 1 === task.week && (
                            <div style={{ height: 10, width: `${task.span * 100}%`, background: phase.color, borderRadius: 3, opacity: 0.75, boxShadow: `0 0 6px ${phase.color}50` }} />
                          )}
                        </div>
                      ))}
                    </div>

                    {selectedTask?.id === task.id && (
                      <div style={{
                        margin: "4px 0 8px 32px", padding: "16px 18px",
                        background: C.surface, border: `1px solid ${phase.color}30`,
                        borderLeft: `3px solid ${phase.color}`, borderRadius: 8,
                        boxShadow: `0 4px 20px ${C.bg}`,
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: phase.color }}>{task.title}</span>
                          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                            <span className="tag" style={{ background: `${DIFF[task.diff]}18`, color: DIFF[task.diff], border: `1px solid ${DIFF[task.diff]}30` }}>{task.diff}</span>
                            <span style={{ fontSize: 11, fontWeight: 500, color: C.textDim }}>Week {task.week}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.7, marginBottom: 12 }}>{task.desc}</p>
                        <div style={{ padding: "10px 14px", background: C.bg, borderRadius: 6, fontSize: 12, color: C.text }}>
                          <span style={{ color: C.textDim, fontWeight: 600 }}>DELIVERABLE → </span>{task.deliverable}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            <div style={{ marginTop: 20, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.textDim, letterSpacing: 2 }}>DIFFICULTY:</span>
              {Object.entries(DIFF).map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 9, height: 9, borderRadius: "50%", background: v, boxShadow: `0 0 6px ${v}80` }} />
                  <span style={{ fontSize: 11, fontWeight: 500, color: C.textMid }}>{k}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TASKS ═══ */}
        {tab === "Tasks" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.textDim, letterSpacing: 2.5, textTransform: "uppercase" }}>
              All 30 Tasks — Full Detail · Click any task to expand
            </div>
            {PHASES.map(phase => (
              <div key={phase.id}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  paddingBottom: 12, marginBottom: 14,
                  borderBottom: `1px solid ${phase.color}30`,
                  flexWrap: "wrap", gap: 8,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      padding: "4px 12px", background: `${phase.color}15`,
                      border: `1px solid ${phase.color}40`, borderRadius: 6,
                      fontSize: 11, fontWeight: 800, color: phase.color, letterSpacing: 2,
                    }}>{phase.label}</div>
                    <span style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{phase.title}</span>
                  </div>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 500, color: C.textDim }}>Weeks {phase.weeks[0]}–{phase.weeks[1]}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: phase.color, padding: "3px 12px", background: `${phase.color}12`, border: `1px solid ${phase.color}30`, borderRadius: 99 }}>~{phase.pct}% of total product</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {phase.tasks.map((task) => {
                    const isOpen = selectedTask?.id === task.id;
                    return (
                      <div key={task.id} className="hover-row" onClick={() => setSelectedTask(isOpen ? null : { ...task, phase })} style={{
                        background: isOpen ? C.surface : C.surfaceHigh,
                        border: `1px solid ${isOpen ? phase.color + "40" : C.border}`,
                        borderLeft: `3px solid ${isOpen ? phase.color : C.borderHigh}`,
                        borderRadius: 10, overflow: "hidden", cursor: "pointer",
                        transition: "all 0.18s",
                        boxShadow: isOpen ? `0 4px 24px ${C.bg}` : "none",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", flexWrap: "wrap", gap: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: C.textDim, minWidth: 24 }}>{task.id}</span>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: DIFF[task.diff], flexShrink: 0, boxShadow: `0 0 7px ${DIFF[task.diff]}80` }} />
                            <span style={{ fontSize: 13, fontWeight: 600, color: isOpen ? C.white : C.text }}>{task.title}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span className="tag" style={{ background: `${DIFF[task.diff]}18`, color: DIFF[task.diff], border: `1px solid ${DIFF[task.diff]}35` }}>{task.diff}</span>
                            <span style={{ fontSize: 11, fontWeight: 600, color: C.textDim }}>Week {task.week}</span>
                            <span style={{ fontSize: 11, color: C.textDim, display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
                          </div>
                        </div>
                        {isOpen && (
                          <div style={{ padding: "0 18px 18px 18px", borderTop: `1px solid ${phase.color}20` }}>
                            <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.75, margin: "14px 0 12px" }}>{task.desc}</p>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8 }}>
                              <span style={{ fontSize: 10, fontWeight: 800, color: phase.color, letterSpacing: 1.5, flexShrink: 0, marginTop: 1 }}>DELIVERABLE</span>
                              <span style={{ fontSize: 12, color: C.text }}>→ {task.deliverable}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center", paddingTop: 8, borderTop: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.textDim, letterSpacing: 2 }}>DIFFICULTY:</span>
              {Object.entries(DIFF).map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 9, height: 9, borderRadius: "50%", background: v, boxShadow: `0 0 6px ${v}80` }} />
                  <span style={{ fontSize: 11, fontWeight: 500, color: C.textMid }}>{k}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ PIPELINE ═══ */}
        {tab === "Pipeline" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Architecture */}
            <div className="card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 4, height: 20, background: C.cyan, borderRadius: 2 }} />
                <div style={{ fontSize: 11, fontWeight: 700, color: C.cyan, letterSpacing: 2.5, textTransform: "uppercase" }}>Full Call Flow Architecture</div>
              </div>
              <div style={{ overflowX: "auto", paddingBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", minWidth: 960, gap: 0 }}>
                  {[
                    { label: "CRM", sub: "Lead Data", color: C.cyan, icon: "🗄" },
                    null, { label: "Webhook", sub: "FastAPI", color: C.cyan, icon: "⚡" },
                    null, { label: "Telnyx", sub: "SIP/PSTN", color: C.green, icon: "📞" },
                    null, { label: "LiveKit", sub: "WebRTC", color: C.purple, icon: "🌐" },
                    null, { label: "VAD", sub: "Silero", color: C.amber, icon: "👂" },
                    null, { label: "STT", sub: "Whisper", color: C.amber, icon: "📝" },
                    null, { label: "LLM", sub: "Llama/GPT", color: C.orange, icon: "🧠" },
                    null, { label: "TTS", sub: "Piper/EL", color: C.pink, icon: "🔊" },
                    null, { label: "Owner\nPhone", sub: "Hears AI", color: C.green, icon: "📱" },
                  ].map((node, i) =>
                    node === null ? (
                      <div key={i} style={{ fontSize: 22, color: C.border, padding: "0 6px", flexShrink: 0 }}>→</div>
                    ) : (
                      <div key={i} style={{
                        padding: "14px 12px", textAlign: "center", flexShrink: 0,
                        background: `${node.color}0D`, border: `1px solid ${node.color}30`,
                        borderRadius: 10, minWidth: 84,
                        boxShadow: `0 0 14px ${node.color}15`,
                      }}>
                        <div style={{ fontSize: 22, marginBottom: 5 }}>{node.icon}</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: node.color, whiteSpace: "pre-line" }}>{node.label}</div>
                        <div style={{ fontSize: 10, color: C.textDim, marginTop: 2 }}>{node.sub}</div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Outcome flow */}
              <div style={{ marginTop: 20, paddingTop: 18, borderTop: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, letterSpacing: 2, marginBottom: 10 }}>OUTCOME FLOW — After call ends</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                  {[["Call Ends", C.textMid], ["→", C.border], ["Transcript Logged", C.cyan], ["→", C.border], ["Outcome Classified", C.purple], ["→", C.border], ["CRM Updated", C.green], ["→", C.border], ["IF BOOKED →", C.amber], ["Calendly + SMS", C.amber], ["→", C.border], ["IF NO ANSWER →", C.red], ["Retry Scheduled", C.red]].map(([text, color], i) => (
                    <span key={i} style={{ fontSize: 12, fontWeight: text.includes("→") ? 400 : 600, color }}>{text}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Build vs Use + Latency */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="card" style={{ background: C.surface, border: `1px solid ${C.green}25`, borderLeft: `3px solid ${C.green}`, borderRadius: 12, padding: 20, flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 4 }}>You Build This</div>
                  <div style={{ fontSize: 11, color: C.textDim, marginBottom: 14 }}>Your code. Your logic. Your competitive edge.</div>
                  {["Conversation prompt & decision logic", "Call state manager", "CRM webhook handler", "Orchestration / glue layer", "Retry & scheduling system", "Outcome classifier", "Booking flow coordinator", "Full call logging system", "Voicemail detection handler", "Monitoring dashboard"].map(item => (
                    <div key={item} style={{ display: "flex", gap: 8, padding: "6px 0", fontSize: 12, color: C.text, borderBottom: `1px solid ${C.border}25` }}>
                      <span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>→</span>{item}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="card" style={{ background: C.surface, border: `1px solid ${C.amber}25`, borderLeft: `3px solid ${C.amber}`, borderRadius: 12, padding: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 4 }}>You Use This</div>
                  <div style={{ fontSize: 11, color: C.textDim, marginBottom: 14 }}>Commodity infrastructure. Like electricity.</div>
                  {[["Pipecat", "Pipeline framework"], ["LiveKit", "WebRTC transport"], ["Telnyx", "SIP / telephony"], ["Whisper / Deepgram", "Speech to text"], ["Llama 3.1 / GPT-4o-mini", "LLM reasoning"], ["Piper / ElevenLabs", "Text to speech"], ["Silero VAD", "Voice activity detection"], ["Calendly API", "Appointment booking"], ["Twilio", "SMS reminders"], ["APScheduler", "Retry logic"]].map(([tool, desc]) => (
                    <div key={tool} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.border}25` }}>
                      <div style={{ display: "flex", gap: 8, fontSize: 12, color: C.text }}>
                        <span style={{ color: C.amber, fontWeight: 700, flexShrink: 0 }}>↗</span>{tool}
                      </div>
                      <span style={{ fontSize: 11, color: C.textDim }}>{desc}</span>
                    </div>
                  ))}
                </div>

                {/* Latency */}
                <div className="card" style={{ background: C.surface, border: `1px solid ${C.red}25`, borderRadius: 12, padding: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.red, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 14 }}>Latency Targets — #1 Technical Challenge</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                    {[
                      { stage: "STT", target: "<300ms", local: "800–1200ms" },
                      { stage: "LLM", target: "<400ms", local: "500–1500ms" },
                      { stage: "TTS", target: "<200ms", local: "300–800ms" },
                    ].map(r => (
                      <div key={r.stage} style={{ padding: 12, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 8, textAlign: "center" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: C.textMid, marginBottom: 4 }}>{r.stage}</div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: C.green }}>{r.target}</div>
                        <div style={{ fontSize: 10, color: C.red, marginTop: 3 }}>local: {r.local}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "10px 12px", background: `${C.red}0C`, border: `1px solid ${C.red}20`, borderRadius: 7 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.red }}>Total: &lt;1.1s required · Local: 3.6–6.5s</div>
                    <div style={{ fontSize: 11, color: C.textMid, marginTop: 3 }}>Acceptable during dev. Cloud APIs mandatory for real homeowner calls.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ COSTS ═══ */}
        {tab === "Costs" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Monthly breakdown */}
            <div className="card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 4, height: 20, background: C.amber, borderRadius: 2 }} />
                <div style={{ fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: 2.5, textTransform: "uppercase" }}>Monthly Cost Breakdown — 200 calls/day, ~4,400 calls/month</div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      {["Service", "What It Does", "Rate", "Monthly Usage", "Est. Cost"].map(h => (
                        <th key={h} style={{ padding: "8px 14px", fontSize: 10, fontWeight: 700, color: C.textDim, textAlign: "left", letterSpacing: 1.5, textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { s: "Deepgram STT", w: "Speech to text", r: "$0.0043/min", u: "~3,500 answered mins", cost: "$10–28", c: C.cyan },
                      { s: "ElevenLabs TTS", w: "Text to speech", r: "$0.18/1k chars", u: "~200k chars/mo", cost: "$25–45", c: C.purple },
                      { s: "GPT-4o-mini", w: "LLM reasoning", r: "$0.15/1M tokens", u: "~880k tokens/mo", cost: "$15–30", c: C.orange },
                      { s: "Telnyx Telephony", w: "Outbound calls", r: "$0.013/min", u: "~6,600 mins/mo", cost: "$70–100", c: C.green },
                      { s: "Hetzner VPS", w: "24/7 server", r: "flat rate", u: "CX31 or similar", cost: "$20–35", c: C.amber },
                      { s: "DNC Compliance", w: "Legal scrubbing", r: "flat rate", u: "per list batch", cost: "$25–50", c: C.red },
                      { s: "Calendly", w: "Appointment booking", r: "flat rate", u: "unlimited bookings", cost: "$0–12", c: C.textMid },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.border}25`, background: i % 2 === 0 ? C.surfaceHigh : "transparent" }}>
                        <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: row.c }}>{row.s}</td>
                        <td style={{ padding: "12px 14px", fontSize: 12, color: C.textMid }}>{row.w}</td>
                        <td style={{ padding: "12px 14px", fontSize: 12, color: C.text }}>{row.r}</td>
                        <td style={{ padding: "12px 14px", fontSize: 12, color: C.textMid }}>{row.u}</td>
                        <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: C.amber }}>{row.cost}</td>
                      </tr>
                    ))}
                    <tr style={{ borderTop: `1px solid ${C.border}`, background: C.surfaceHigh }}>
                      <td colSpan={4} style={{ padding: "14px 14px", fontSize: 13, fontWeight: 700, color: C.text }}>TOTAL MONTHLY</td>
                      <td style={{ padding: "14px 14px", fontSize: 16, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: C.amber, textShadow: `0 0 16px ${C.amber}60` }}>$165–300/mo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scale + One-time */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Cost At Different Scales</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {[
                    { scale: "Testing", calls: 20, cost: "$30", c: C.green },
                    { scale: "Early", calls: 100, cost: "$100", c: C.cyan },
                    { scale: "Real", calls: 200, cost: "$165–300", c: C.amber },
                    { scale: "Scaling", calls: 500, cost: "$400–600", c: C.red },
                  ].map(row => (
                    <div key={row.scale} className="card" style={{
                      padding: 18, background: C.surface, border: `1px solid ${C.border}`,
                      borderRadius: 10, textAlign: "center",
                    }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, letterSpacing: 2, marginBottom: 8 }}>{row.scale.toUpperCase()}</div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: row.c, textShadow: `0 0 12px ${row.c}50` }}>{row.cost}</div>
                      <div style={{ fontSize: 11, color: C.textMid, marginTop: 4 }}>/month</div>
                      <div style={{ fontSize: 11, color: C.textDim, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}` }}>{row.calls} calls/day</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 22 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.cyan, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16 }}>One-Time Setup Costs</div>
                {[
                  { item: "Domain + SSL", cost: "$15/year", note: "" },
                  { item: "Server setup", cost: "$0", note: "your time" },
                  { item: "Legal / TCPA review", cost: "$200–500", note: "⚠ DO NOT SKIP" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: `1px solid ${C.border}30` }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{row.item}</div>
                      {row.note && <div style={{ fontSize: 11, color: row.note.includes("SKIP") ? C.red : C.textDim, marginTop: 2 }}>{row.note}</div>}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.amber }}>{row.cost}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>TOTAL</span>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: C.amber }}>$215–515</span>
                </div>
              </div>
            </div>

            {/* ROI */}
            <div className="card" style={{ background: C.surface, border: `1px solid ${C.green}25`, borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 4, height: 20, background: C.green, borderRadius: 2 }} />
                <div style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: 2.5, textTransform: "uppercase" }}>Quick ROI — Why The Numbers Work</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
                {[
                  { label: "Average listing commission", value: "$8–15K", c: C.green },
                  { label: "Monthly running cost", value: "$165–300", c: C.amber },
                  { label: "Commissions to cover years of cost", value: "1 = 2 yrs", c: C.cyan },
                  { label: "Appointments/week at 200 calls/day", value: "2–8", c: C.purple },
                  { label: "Listings/month (30–50% close rate)", value: "1–3", c: C.green },
                  { label: "Revenue potential per month", value: "$8K–45K", c: C.amber },
                ].map(stat => (
                  <div key={stat.label} style={{ padding: 16, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 8 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: stat.c, textShadow: `0 0 12px ${stat.c}50` }}>{stat.value}</div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: C.textMid, marginTop: 6, lineHeight: 1.5 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: "13px 16px", background: `${C.green}0C`, border: `1px solid ${C.green}25`, borderRadius: 8, fontSize: 13, fontWeight: 700, color: C.green }}>
                One listing commission covers 2–4 years of monthly running costs. This is why the economics work.
              </div>
            </div>

          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 32, paddingTop: 20, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 500, color: C.textDim }}>Phase 1–6 · 12 Weeks · $0 Cost · Local Build · Full Edge Case Coverage</span>
          <span style={{ fontSize: 11, fontWeight: 500, color: C.textDim }}>After Week 12 → spend first real money → 20 calls/day → scale</span>
        </div>
      </div>
    </div>
  );
}