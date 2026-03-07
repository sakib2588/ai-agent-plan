import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#07080D",
  surface: "#0D0F1A",
  surfaceHigh: "#131625",
  border: "#1C1F33",
  borderHigh: "#252840",
  amber: "#F5A623",
  amberDim: "#7A5212",
  cyan: "#00D4FF",
  cyanDim: "#004D5E",
  green: "#00E676",
  greenDim: "#004D1F",
  red: "#FF4444",
  redDim: "#5C1010",
  purple: "#A78BFA",
  purpleDim: "#3B2F6B",
  text: "#E2E4F0",
  textMid: "#8B8FA8",
  textDim: "#3A3D55",
  white: "#FFFFFF",
};

const PHASES = [
  {
    id: 1, label: "P1", title: "Foundation & Environment", weeks: [1, 2],
    color: C.cyan, dim: C.cyanDim, pct: 5,
    tasks: [
      { id: "1A", title: "Dev Environment Setup", week: 1, span: 0.4, diff: "Easy", deliverable: "Working local dev environment", desc: "Python 3.11+, Git, VS Code, virtual environment, Docker basics" },
      { id: "1B", title: "Prompt Engineering Course", week: 1, span: 0.6, diff: "Easy", deliverable: "First draft of your real estate conversation prompt", desc: "~8 hours. Focus: system prompts, conversation flow, objection handling, few-shot examples" },
      { id: "1C", title: "Agentic Workflows Course", week: 2, span: 0.7, diff: "Medium", deliverable: "Written diagram of your agent decision tree", desc: "~10 hours. Focus: tool calling, state machines, decision trees, multi-step flows" },
      { id: "1D", title: "LiveKit Agents Docs", week: 2, span: 0.5, diff: "Medium", deliverable: "You understand full architecture before writing code", desc: "~6 hours. VoicePipelineAgent, AgentSession, plugins, telephony overview" },
    ]
  },
  {
    id: 2, label: "P2", title: "Core Voice Pipeline", weeks: [3, 4],
    color: C.purple, dim: C.purpleDim, pct: 15,
    tasks: [
      { id: "2A", title: "Install & Run Pipecat Examples", week: 3, span: 0.4, diff: "Easy", deliverable: "Working local chatbot you can talk to in terminal", desc: "Clone pipecat repo. Run example voice agent. Understand Frame flow: AudioFrame → TextFrame → AudioFrame" },
      { id: "2B", title: "Swap In Local Models (Free)", week: 3, span: 0.8, diff: "Medium", deliverable: "Full local STT→LLM→TTS pipeline. 3–6s latency expected — fine for now", desc: "STT: Whisper base (CPU). LLM: Llama 3.1 8B via Ollama (GPU). TTS: Piper TTS (CPU). Wire in Pipecat." },
      { id: "2C", title: "Build Voice Activity Detection", week: 3, span: 0.5, diff: "Medium", deliverable: "VAD working correctly in 90% of test cases", desc: "Silero VAD (free, open source). Test with background noise — TV, music. Fix false triggers." },
      { id: "2D", title: "Build Interruption Handler", week: 4, span: 0.8, diff: "Hard", deliverable: "AI stops talking immediately when you interrupt. Test 20+ times.", desc: "When you speak while AI responds: cut TTS audio stream mid-sentence, listen to you, resume naturally. Requires cancelling on UserStartedSpeakingFrame." },
      { id: "2E", title: "Conversation State Manager", week: 4, span: 0.7, diff: "Medium", deliverable: "State object that correctly tracks a full mock conversation", desc: "Track stage: INTRO → QUALIFY → OBJECTION → BOOK → END. Python dataclass holding stage, property data, owner name, previous objections." },
    ]
  },
  {
    id: 3, label: "P3", title: "Telephony Integration", weeks: [5, 6],
    color: C.green, dim: C.greenDim, pct: 25,
    tasks: [
      { id: "3A", title: "Telnyx SIP Docs + Account", week: 5, span: 0.4, diff: "Medium", deliverable: "Telnyx account ready, SIP config understood", desc: "~3 hours. SIP trunking, outbound dialing, audio codec (mulaw G.711). Create free Telnyx account." },
      { id: "3B", title: "LiveKit SIP Bridge Setup", week: 5, span: 0.8, diff: "Hard", deliverable: "You can trigger a call to your phone from your code", desc: "Telnyx → LiveKit SIP → your agent. PSTN call becomes WebRTC room participant your agent can hear. Follow LiveKit telephony docs exactly." },
      { id: "3C", title: "First Real Call To Yourself", week: 5, span: 0.4, diff: "Medium", deliverable: "First successful end-to-end phone conversation with your agent", desc: "Agent calls your phone. You answer. It says hello. You talk. It responds. Even at 4s latency — major milestone." },
      { id: "3D", title: "Voicemail Detection (AMD)", week: 6, span: 0.8, diff: "Hard", deliverable: "Agent correctly identifies voicemail 80%+ of the time", desc: "Answering Machine Detection. Detect within 3 seconds, play 15-second message, hang up. Known hard problem — budget extra time." },
      { id: "3E", title: "Call Outcome Logging", week: 6, span: 0.5, diff: "Easy", deliverable: "Every test call has a complete log entry you can review", desc: "Log: timestamp, number, duration, outcome (answered/voicemail/no-answer/interested/booked), full transcript. Local SQLite first." },
      { id: "3F", title: "Retry & Scheduling Logic", week: 6, span: 0.5, diff: "Medium", deliverable: "Automated retry system running on test data", desc: "No answer → retry 4hrs. Voicemail → next day. 'Call Thursday' → schedule Thursday. DNC → flag permanently. APScheduler." },
    ]
  },
  {
    id: 4, label: "P4", title: "Conversation Logic & Prompts", weeks: [7, 8],
    color: C.amber, dim: C.amberDim, pct: 33,
    tasks: [
      { id: "4A", title: "Write Full Conversation Script v1", week: 7, span: 0.8, diff: "Hard", deliverable: "Google Doc with every conversation branch mapped", desc: "Cover all branches: intro, qualify, 8 objections, price deflection, spouse handoff, angry owner, 'is this a robot', booking, end call." },
      { id: "4B", title: "Convert Script to System Prompt", week: 7, span: 0.5, diff: "Medium", deliverable: "System prompt under 2000 tokens", desc: "Translate conversation doc into structured system prompt: persona, rules, property context injection, response limits, tone, tool calling." },
      { id: "4C", title: "Test 20 Edge Cases On Yourself", week: 7, span: 0.5, diff: "Medium", deliverable: "List of 20 test cases with pass/fail results", desc: "Call yourself and manually trigger each edge case. Record failures. Update prompt after each one. Minimum 20 distinct scenarios." },
      { id: "4D", title: "Property Data Injection", week: 8, span: 0.5, diff: "Medium", deliverable: "Agent correctly references property details mid-conversation", desc: "Agent knows: owner name, address, estimated value, last sale date, days on market. Function injects this into prompt before each call." },
      { id: "4E", title: "Prompt Refinement Cycle", week: 8, span: 0.8, diff: "Hard", deliverable: "Prompt v3+ with documented change log", desc: "30 more self-calls. Friend acts as homeowner (no coaching). Find every failure. Rewrite until 80% of conversations reach qualification stage." },
      { id: "4F", title: "'Is This A Robot?' Handler", week: 8, span: 0.5, diff: "Hard", deliverable: "Single best response that passes robot test in 7/10 tries", desc: "Most critical single moment. Honest, non-defensive response that keeps call alive. Test 10 variations. Pick the one with best retention rate." },
    ]
  },
  {
    id: 5, label: "P5", title: "CRM & Booking Integration", weeks: [9, 10],
    color: "#FF7043", dim: "#5C1F0A", pct: 40,
    tasks: [
      { id: "5A", title: "Mock CRM Data Layer", week: 9, span: 0.4, diff: "Easy", deliverable: "50 fake leads ready to feed into your agent", desc: "Local SQLite/JSON mimicking your CRM: owner_name, phone, address, property_value, notes, call_history, status. Seed with 50 fake leads." },
      { id: "5B", title: "CRM → Call Trigger Webhook", week: 9, span: 0.5, diff: "Medium", deliverable: "Adding a CRM record automatically starts a call", desc: "FastAPI webhook endpoint. CRM posts → server pulls lead data → initiates call via Telnyx. New lead = automatic call." },
      { id: "5C", title: "Calendly API Integration", week: 9, span: 0.8, diff: "Medium", deliverable: "Full booking flow tested. Appointment appears in Calendly.", desc: "Owner says yes: agent reads available slots, offers 2 options, books chosen one, sends confirmation. Fully automated." },
      { id: "5D", title: "Post-Call CRM Update", week: 10, span: 0.4, diff: "Easy", deliverable: "Zero manual CRM updates needed after any call", desc: "After every call: write outcome, transcript summary, next action, appointment details back to CRM. Automatic status update." },
      { id: "5E", title: "SMS Reminder System", week: 10, span: 0.4, diff: "Easy", deliverable: "Automated SMS fires correctly 24hrs before test appointments", desc: "24 hours before appointment: SMS to owner with name, time, address. Twilio free trial. Dramatically reduces no-show rate." },
      { id: "5F", title: "End-to-End Integration Test", week: 10, span: 0.8, diff: "Medium", deliverable: "10/10 runs complete without manual intervention", desc: "Full flow 10 times: Add lead → call fires → conversation → book → CRM updates → SMS fires. Document every failure. Fix every one." },
    ]
  },
  {
    id: 6, label: "P6", title: "Edge Cases, Defects & Readiness", weeks: [11, 12],
    color: "#EC407A", dim: "#5C0F2A", pct: 45,
    tasks: [
      { id: "6A", title: "Stress Test: 50 Self-Calls", week: 11, span: 0.8, diff: "Medium", deliverable: "Bug tracker with 50 logged calls and all defects documented", desc: "Call yourself 50 times over 3 days. Different times, noise levels. Break it every way you can. Log every defect in GitHub Issues or Notion." },
      { id: "6B", title: "Friend Test: 20 Blind Calls", week: 11, span: 0.8, diff: "Medium", deliverable: "20 friend test calls with transcript analysis", desc: "3–4 friends answer without coaching. They act natural. Watch where agent breaks on real unpredictable human behavior. Reveals bugs you never imagined." },
      { id: "6C", title: "Defect Priority & Fix Cycle", week: 11, span: 0.5, diff: "Medium", deliverable: "Zero P0 bugs. Top P1s resolved.", desc: "Sort: P0 (crash), P1 (bad UX), P2 (minor). Fix all P0s immediately. Fix top 5 P1s. P2s go to backlog. Retest every fix." },
      { id: "6D", title: "Failure Mode Documentation", week: 12, span: 0.4, diff: "Easy", deliverable: "Written failure mode doc — honest assessment of system limits", desc: "Document every known failure: cause, what agent does wrong, fixed or backlog. Becomes your pre-launch checklist." },
      { id: "6E", title: "Final Pipeline Verification", week: 12, span: 0.8, diff: "Medium", deliverable: "Pass/fail report: 85% no crash, 70% reach qualify, 100% booking works", desc: "20 calls over 2 days. Targets: 85% no crash, 70% reach qualification stage, booking works 100% of interested cases, CRM updates all." },
      { id: "6F", title: "Production Readiness Checklist", week: 12, span: 0.4, diff: "Easy", deliverable: "All green = ready to spend real money on real calls", desc: "Pipeline stable ✓, P0 bugs fixed ✓, CRM working ✓, booking working ✓, logging complete ✓, 20+ edge cases handled ✓, all failure modes known ✓" },
    ]
  },
];

const DIFF_COLOR = { Easy: C.green, Medium: C.amber, Hard: C.red };

const REMAINING = [
  { label: "Error Handling & Reliability", pct: 8, fill: 4, diff: "Hard", note: "APIs fail mid-call — you need graceful fallbacks everywhere" },
  { label: "Real Human Edge Cases", pct: 10, fill: 8, diff: "Hard", note: "Accents, spouse handoffs, angry owners — impossible to simulate alone" },
  { label: "Concurrent Call Management", pct: 7, fill: 3, diff: "Medium", note: "10–50 simultaneous calls with isolated state per call" },
  { label: "Compliance Infrastructure", pct: 8, fill: 4, diff: "Hard", note: "TCPA, DNC scrubbing, recording consent — legally non-negotiable" },
  { label: "Monitoring & Observability", pct: 4, fill: 2, diff: "Medium", note: "Know which call failed at which second and why" },
  { label: "Production Deployment", pct: 5, fill: 2, diff: "Medium", note: "VPS, uptime, load testing, CI/CD" },
  { label: "Prompt Iteration (Real Data)", pct: 13, fill: 8, diff: "Hard", note: "Version 1 → Version 23 — only real homeowners teach you this" },
];

const HARDWARE = [
  { comp: "STT", local: "Whisper medium", fits: true, note: "~3GB", quality: "Good" },
  { comp: "LLM", local: "Llama 3.1 8B (quantized)", fits: true, note: "~5GB", quality: "Decent" },
  { comp: "TTS", local: "Coqui TTS / Piper", fits: "cpu", note: "CPU only", quality: "Mediocre" },
  { comp: "Telephony", local: "Cannot run locally", fits: false, note: "—", quality: "N/A" },
];

const READINESS = [
  { q: "Can you write a basic webhook handler?", ifYes: "Getting close", ifNo: "Not yet" },
  { q: "Have you run any LLM API call in code?", ifYes: "Getting close", ifNo: "Not yet" },
  { q: "Do you understand async/await deeply?", ifYes: "Getting close", ifNo: "Not yet" },
  { q: "Have you read LiveKit or Pipecat docs?", ifYes: "Getting close", ifNo: "Not yet" },
  { q: "Have you written your conversation script?", ifYes: "Ready", ifNo: "Not yet" },
  { q: "Can you explain VAD in your own words?", ifYes: "Ready", ifNo: "Not yet" },
];

const COSTS_MONTHLY = [
  { scale: "Testing", calls: 20, cost: "$30", color: C.green },
  { scale: "Early", calls: 100, cost: "$100", color: C.cyan },
  { scale: "Real", calls: 200, cost: "$165–300", color: C.amber },
  { scale: "Scaling", calls: 500, cost: "$400–600", color: C.red },
];

const EDGE_CASES = [
  { case: "Owner hands phone to spouse mid-call", why: "Conversation context breaks completely" },
  { case: "Heavy accent speaker", why: "STT accuracy drops 30–40%" },
  { case: "Same question asked 3 times", why: "Agent loops or gives inconsistent answers" },
  { case: "Owner goes silent for 8 seconds", why: "VAD triggers incorrectly" },
  { case: '"Yeah yeah" impatient response', why: "Agent ignores social cues, keeps pitching" },
  { case: "Asks specific price of their home", why: "Agent needs graceful deflection to appointment" },
  { case: "Owner swears at agent", why: "Needs professional de-escalation logic" },
  { case: "Background noise (TV, kids)", why: "STT transcribes noise as real words" },
  { case: "Very fast talker", why: "STT misses words, LLM gets garbage input" },
  { case: '"Is this a robot?"', why: "Most critical moment — wrong answer = call over" },
];

function ProgressBar({ pct, color, height = 8, showLabel = false, animated = false }) {
  const [w, setW] = useState(0);
  useEffect(() => { setTimeout(() => setW(pct), 300); }, [pct]);
  return (
    <div style={{ position: "relative" }}>
      <div style={{ height, background: C.border, borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${animated ? w : pct}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: 2,
          transition: animated ? "width 1.2s cubic-bezier(0.4,0,0.2,1)" : "none",
        }} />
      </div>
      {showLabel && <span style={{ position: "absolute", right: 0, top: -18, fontSize: 11, color, fontWeight: 700 }}>{pct}%</span>}
    </div>
  );
}

function BlockBar({ fill, total = 10, color }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: 14, height: 14,
          background: i < fill ? color : C.border,
          borderRadius: 2,
          opacity: i < fill ? 1 : 0.3,
        }} />
      ))}
    </div>
  );
}

const TABS = ["Overview", "Readiness", "Gantt", "Pipeline", "Costs"];

export default function App() {
  const [tab, setTab] = useState("Overview");
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [checks, setChecks] = useState({});

  const toggleCheck = (i) => setChecks(c => ({ ...c, [i]: !c[i] }));
  const checkedCount = Object.values(checks).filter(Boolean).length;

  return (
    <div style={{
      background: C.bg,
      minHeight: "100vh",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
      color: C.text,
      fontSize: 13,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700;800&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
        .tab-btn:hover { background: ${C.surfaceHigh} !important; }
        .task-row:hover { background: ${C.surfaceHigh} !important; cursor: pointer; }
        .check-row:hover { background: ${C.surfaceHigh} !important; cursor: pointer; }
        .phase-row:hover { background: ${C.surfaceHigh} !important; cursor: pointer; }
        .cost-card:hover { border-color: ${C.amber}44 !important; }
      `}</style>

      {/* TOP HEADER */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 32px" }}>
        <div style={{ padding: "20px 0 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, boxShadow: `0 0 8px ${C.green}` }} />
              <span style={{ fontSize: 10, color: C.textMid, letterSpacing: 4, textTransform: "uppercase" }}>
                PROJECT BRIEF · AI VOICE AGENT · REAL ESTATE OUTREACH
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 32, fontWeight: 800, color: C.white,
              letterSpacing: -1, lineHeight: 1,
            }}>
              FROM ZERO TO <span style={{ color: C.amber }}>45%</span> PRODUCTION
            </h1>
            <p style={{ fontSize: 11, color: C.textMid, marginTop: 6 }}>
              12-Week Build Plan · Full Learning Phase · Complete Pipeline Architecture
            </p>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              { v: "12", l: "Weeks" }, { v: "6", l: "Phases" }, { v: "30", l: "Tasks" },
              { v: "$0", l: "Phase Cost" }, { v: "45%", l: "Complete" }, { v: "~55%", l: "Remaining" }
            ].map(s => (
              <div key={s.l} style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: C.amber }}>{s.v}</div>
                <div style={{ fontSize: 9, color: C.textDim, letterSpacing: 2, textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 2, marginTop: 20 }}>
          {TABS.map(t => (
            <button key={t} className="tab-btn" onClick={() => setTab(t)} style={{
              padding: "10px 20px", fontSize: 11, letterSpacing: 2,
              textTransform: "uppercase", background: "transparent", border: "none",
              color: tab === t ? C.amber : C.textMid,
              borderBottom: `2px solid ${tab === t ? C.amber : "transparent"}`,
              cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.15s",
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1400 }}>

        {/* ═══════════════════════════════════ OVERVIEW TAB ═══════════════════════════════════ */}
        {tab === "Overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* What Is The Learning Phase */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: 24 }}>
                <div style={{ fontSize: 10, color: C.cyan, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
                  WHAT "LEARNING PHASE" MEANS
                </div>
                {[
                  "Study the topics",
                  "Build the full system locally",
                  "Call your own number",
                  "Test every edge case you can think of",
                  "Find and fix defects",
                ].map((step, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: C.cyanDim, border: `1px solid ${C.cyan}44`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, color: C.cyan, fontWeight: 700, flexShrink: 0,
                      }}>{i + 1}</div>
                      <span style={{ fontSize: 12, color: C.text }}>{step}</span>
                    </div>
                    {i < 4 && (
                      <div style={{ marginLeft: 14, width: 1, height: 8, background: C.border }} />
                    )}
                  </div>
                ))}
                <div style={{
                  marginTop: 16, padding: "12px 16px",
                  background: `${C.cyan}0A`, border: `1px solid ${C.cyan}22`,
                  borderRadius: 4,
                }}>
                  <span style={{ color: C.cyan, fontWeight: 700 }}>= LEARNING PHASE COMPLETE</span>
                  <p style={{ fontSize: 11, color: C.textMid, marginTop: 4 }}>
                    Not just studying. Not just building. All of it together.
                  </p>
                </div>
              </div>

              {/* 45% / 55% visual */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: 24 }}>
                <div style={{ fontSize: 10, color: C.amber, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>
                  WHERE THIS PLAN GETS YOU
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: C.textMid }}>Learning Phase Complete</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.green }}>45%</span>
                  </div>
                  <ProgressBar pct={45} color={C.green} height={12} animated />
                  <div style={{ marginTop: 6, display: "flex", gap: 4 }}>
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} style={{ flex: 1, height: 6, background: i < 9 ? C.green : C.border, borderRadius: 1, opacity: i < 9 ? 0.9 : 0.3 }} />
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: C.textMid }}>Remaining to 100% Production</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.red }}>55%</span>
                  </div>
                  <ProgressBar pct={55} color={C.red} height={12} animated />
                  <div style={{ marginTop: 6, display: "flex", gap: 4 }}>
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} style={{ flex: 1, height: 6, background: i >= 9 ? C.red : C.border, borderRadius: 1, opacity: i >= 9 ? 0.9 : 0.3 }} />
                    ))}
                  </div>
                </div>

                <div style={{ fontSize: 10, color: C.textDim, letterSpacing: 2, marginBottom: 12 }}>THAT 55% BREAKS DOWN AS:</div>
                {REMAINING.map((r) => (
                  <div key={r.label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 10, color: C.textMid }}>{r.label}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 9, color: DIFF_COLOR[r.diff] }}>{r.diff}</span>
                        <span style={{ fontSize: 11, color: DIFF_COLOR[r.diff], fontWeight: 700, minWidth: 28, textAlign: "right" }}>{r.pct}%</span>
                      </div>
                    </div>
                    <BlockBar fill={r.fill} color={DIFF_COLOR[r.diff]} />
                  </div>
                ))}
              </div>
            </div>

            {/* The 40% nobody talks about */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
                <div style={{ fontSize: 10, color: C.red, letterSpacing: 3, textTransform: "uppercase" }}>
                  THE 55% NOBODY TALKS ABOUT — What separates a demo from production
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12 }}>
                {[
                  { title: "Production Conversation Quality", pct: "~10%", color: C.red, items: ["Owner hands phone to spouse mid-call", "Heavy accent drops STT 30–40%", "Same question 3 times loops agent", "Owner goes silent 8 seconds", '"Yeah yeah" — agent ignores social cues', '"Is this a robot?" — most critical moment'] },
                  { title: "Reliability & Error Handling", pct: "~8%", color: C.amber, items: ["Deepgram goes down mid-call", "ElevenLabs 429 rate limit during call", "Telnyx drops audio at second 45", "LLM takes 4 seconds one response", "CRM webhook fails to fire", "Server OOM on call 47"] },
                  { title: "Concurrent Call Management", pct: "~7%", color: C.purple, items: ["Each call needs isolated state", "Memory multiplies per active call", "GPU/CPU contention between calls", "One crash can't kill others", "Logs don't get calls mixed up"] },
                  { title: "Compliance Infrastructure", pct: "~8%", color: "#FF7043", items: ["DNC scrubbing before every call", "State-by-state calling hour rules", "Call recording consent disclosure", "Opt-out handling mid-call", "TCPA audit log — legally required"] },
                ].map(section => (
                  <div key={section.title} style={{
                    background: C.surfaceHigh, border: `1px solid ${section.color}22`,
                    borderLeft: `3px solid ${section.color}`, borderRadius: 4, padding: 16,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: section.color }}>{section.title}</span>
                      <span style={{ fontSize: 11, color: section.color, fontWeight: 700 }}>{section.pct}</span>
                    </div>
                    {section.items.map(item => (
                      <div key={item} style={{ display: "flex", gap: 8, padding: "3px 0", fontSize: 10, color: C.textMid }}>
                        <span style={{ color: section.color, flexShrink: 0 }}>›</span>
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Edge cases table */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: 24 }}>
              <div style={{ fontSize: 10, color: C.amber, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
                REAL HUMAN EDGE CASES — You will only find these with real homeowners
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {EDGE_CASES.map((e, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 12, padding: "10px 12px",
                    background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 4,
                  }}>
                    <span style={{ color: C.red, fontWeight: 700, flexShrink: 0, fontSize: 11 }}>!</span>
                    <div>
                      <div style={{ fontSize: 11, color: C.text, fontWeight: 500 }}>{e.case}</div>
                      <div style={{ fontSize: 10, color: C.textMid, marginTop: 2 }}>{e.why}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 14, padding: "10px 14px",
                background: `${C.red}0A`, border: `1px solid ${C.red}22`, borderRadius: 4,
                fontSize: 11, color: C.textMid,
              }}>
                <span style={{ color: C.red, fontWeight: 700 }}>This phase alone takes 4–6 weeks of real call data to fix properly. </span>
                Impossible to simulate calling yourself.
              </div>
            </div>

            {/* Honest % Breakdown Table */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: 24 }}>
              <div style={{ fontSize: 10, color: C.cyan, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
                HONEST PERCENTAGE BREAKDOWN — After Full Learning Phase
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      {["System Component", "Coverage After Learning", "Remaining Work", ""].map(h => (
                        <th key={h} style={{ padding: "8px 12px", fontSize: 9, color: C.textDim, textAlign: "left", letterSpacing: 2, textTransform: "uppercase", fontWeight: 400 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { comp: "Core Pipeline (STT→LLM→TTS)", done: 90, remain: 10 },
                      { comp: "Telephony Integration", done: 75, remain: 25 },
                      { comp: "Conversation Logic v1", done: 60, remain: 40 },
                      { comp: "Error Handling", done: 10, remain: 90 },
                      { comp: "Concurrent Calls", done: 0, remain: 100 },
                      { comp: "Compliance System", done: 0, remain: 100 },
                      { comp: "Monitoring / Logging", done: 10, remain: 90 },
                      { comp: "Prompt Refinement", done: 20, remain: 80, note: "ongoing" },
                      { comp: "CRM Integration", done: 65, remain: 35 },
                      { comp: "Production Deployment", done: 20, remain: 80 },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.border}22` }}>
                        <td style={{ padding: "10px 12px", fontSize: 11, color: C.text }}>{row.comp}</td>
                        <td style={{ padding: "10px 12px", minWidth: 180 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ flex: 1, height: 5, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${row.done}%`, background: row.done > 50 ? C.green : row.done > 20 ? C.amber : C.red, borderRadius: 2 }} />
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 700, color: row.done > 50 ? C.green : row.done > 20 ? C.amber : C.red, minWidth: 30 }}>{row.done}%</span>
                          </div>
                        </td>
                        <td style={{ padding: "10px 12px", minWidth: 180 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ flex: 1, height: 5, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${row.remain}%`, background: row.remain > 70 ? C.red : row.remain > 30 ? C.amber : C.green, borderRadius: 2 }} />
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 700, color: row.remain > 70 ? C.red : row.remain > 30 ? C.amber : C.green, minWidth: 30 }}>{row.remain}%</span>
                          </div>
                        </td>
                        <td style={{ padding: "10px 12px" }}>
                          {row.note && <span style={{ fontSize: 9, color: C.textDim, letterSpacing: 2 }}>{row.note.toUpperCase()}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ═══════════════════════════════════ READINESS TAB ═══════════════════════════════════ */}
        {tab === "Readiness" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Hardware Table */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: 24 }}>
              <div style={{ fontSize: 10, color: C.cyan, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
                YOUR RTX 3060 Ti (8GB VRAM) — CAPABILITY ASSESSMENT
              </div>
              <div style={{
                padding: "10px 14px", background: `${C.amber}0A`, border: `1px solid ${C.amber}22`,
                borderRadius: 4, fontSize: 11, color: C.textMid, marginBottom: 16,
              }}>
                <span style={{ color: C.amber, fontWeight: 700 }}>Critical: </span>
                You cannot run STT + LLM simultaneously on 8GB VRAM. They compete for memory.
                Solution: STT on CPU (Whisper base), LLM on GPU (Llama 3.1 8B).
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {["Component", "Local Option", "Fits 8GB?", "VRAM/Note", "Quality"].map(h => (
                      <th key={h} style={{ padding: "8px 12px", fontSize: 9, color: C.textDim, textAlign: "left", letterSpacing: 2, textTransform: "uppercase", fontWeight: 400 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HARDWARE.map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.border}22` }}>
                      <td style={{ padding: "12px 12px", fontSize: 12, fontWeight: 700, color: C.amber }}>{row.comp}</td>
                      <td style={{ padding: "12px 12px", fontSize: 11, color: C.text }}>{row.local}</td>
                      <td style={{ padding: "12px 12px" }}>
                        {row.fits === true && <span style={{ color: C.green, fontWeight: 700 }}>✓ Yes</span>}
                        {row.fits === "cpu" && <span style={{ color: C.amber, fontWeight: 700 }}>⚠ CPU</span>}
                        {row.fits === false && <span style={{ color: C.red, fontWeight: 700 }}>✗ No</span>}
                      </td>
                      <td style={{ padding: "12px 12px", fontSize: 11, color: C.textMid }}>{row.note}</td>
                      <td style={{ padding: "12px 12px" }}>
                        <span style={{ fontSize: 10, color: row.quality === "Good" ? C.green : row.quality === "Decent" ? C.amber : row.quality === "Mediocre" ? "#FF7043" : C.red }}>
                          {row.quality}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Free vs Paid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: C.surface, border: `1px solid ${C.greenDim}`, borderRadius: 6, padding: 24 }}>
                <div style={{ fontSize: 10, color: C.green, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
                  ✓ WORKS COMPLETELY FREE
                </div>
                {["Conversation logic and prompts", "Orchestration / state management", "CRM integration (mock data)", "Calendar booking logic", "Call flow and branching logic", "Voicemail detection logic", "Retry scheduling system", "Monitoring dashboard", "Testing with pre-recorded audio files", "End-to-end pipeline (just slow)"].map(item => (
                  <div key={item} style={{ display: "flex", gap: 8, padding: "5px 0", fontSize: 11, color: C.textMid, borderBottom: `1px solid ${C.border}22` }}>
                    <span style={{ color: C.green, fontWeight: 700 }}>✓</span> {item}
                  </div>
                ))}
              </div>
              <div style={{ background: C.surface, border: `1px solid ${C.redDim}`, borderRadius: 6, padding: 24 }}>
                <div style={{ fontSize: 10, color: C.red, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
                  ✗ CANNOT DO FOR FREE
                </div>
                {[
                  { item: "Call real phone numbers", note: "Telnyx/Twilio required — no way around it" },
                  { item: "Sub-second latency pipeline", note: "Cloud APIs mandatory for production speed" },
                  { item: "Production quality TTS voice", note: "ElevenLabs or Cartesia required" },
                  { item: "DNC compliance scrubbing", note: "$25–50/mo — legally non-negotiable" },
                ].map(({ item, note }) => (
                  <div key={item} style={{ padding: "8px 0", borderBottom: `1px solid ${C.border}22` }}>
                    <div style={{ display: "flex", gap: 8, fontSize: 11, color: C.textMid }}>
                      <span style={{ color: C.red, fontWeight: 700, flexShrink: 0 }}>✗</span> {item}
                    </div>
                    <div style={{ fontSize: 10, color: C.textDim, marginTop: 2, paddingLeft: 18 }}>{note}</div>
                  </div>
                ))}
                <div style={{
                  marginTop: 16, padding: "10px 12px",
                  background: `${C.amber}0A`, border: `1px solid ${C.amber}22`, borderRadius: 4,
                }}>
                  <div style={{ fontSize: 10, color: C.amber, letterSpacing: 2, marginBottom: 4 }}>FREE TIER BRIDGE (Week 5)</div>
                  {["Twilio free trial ($15 credit)", "Deepgram free tier (200 hrs free)", "OpenAI free credits", "ElevenLabs free tier (10k chars/mo)"].map(item => (
                    <div key={item} style={{ fontSize: 10, color: C.textMid, padding: "2px 0" }}>→ {item}</div>
                  ))}
                  <div style={{ fontSize: 10, color: C.amber, marginTop: 6, fontWeight: 700 }}>
                    Spend $0 but get real API quality for testing
                  </div>
                </div>
              </div>
            </div>

            {/* Readiness Checklist */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: C.amber, letterSpacing: 3, textTransform: "uppercase" }}>
                  ARE YOU READY TO SPEND MONEY? — Answer honestly
                </div>
                <div style={{
                  fontSize: 12, fontWeight: 700,
                  color: checkedCount === 6 ? C.green : checkedCount >= 4 ? C.amber : C.red,
                }}>
                  {checkedCount}/6 {checkedCount === 6 ? "→ READY" : checkedCount >= 4 ? "→ GETTING CLOSE" : "→ NOT YET"}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {READINESS.map((r, i) => (
                  <div key={i} className="check-row" onClick={() => toggleCheck(i)} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 14px", background: checks[i] ? `${C.green}0A` : C.surfaceHigh,
                    border: `1px solid ${checks[i] ? C.green + "33" : C.border}`,
                    borderRadius: 4, transition: "all 0.15s", flexWrap: "wrap", gap: 8,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: 3,
                        border: `2px solid ${checks[i] ? C.green : C.border}`,
                        background: checks[i] ? C.green : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, color: "#000", fontWeight: 700, flexShrink: 0,
                      }}>{checks[i] ? "✓" : ""}</div>
                      <span style={{ fontSize: 11, color: checks[i] ? C.text : C.textMid }}>{r.q}</span>
                    </div>
                    <div style={{ display: "flex", gap: 16 }}>
                      <span style={{ fontSize: 10, color: C.green }}>YES → {r.ifYes}</span>
                      <span style={{ fontSize: 10, color: C.red }}>NO → {r.ifNo}</span>
                    </div>
                  </div>
                ))}
              </div>
              {checkedCount === 6 && (
                <div style={{
                  marginTop: 14, padding: "12px 16px",
                  background: `${C.green}0A`, border: `1px solid ${C.green}44`,
                  borderRadius: 4, fontSize: 11, color: C.green, textAlign: "center", fontWeight: 700,
                }}>
                  ✓ ALL GREEN — You are ready to spend real money on real calls
                </div>
              )}
            </div>

          </div>
        )}

        {/* ═══════════════════════════════════ GANTT TAB ═══════════════════════════════════ */}
        {tab === "Gantt" && (
          <div>
            <div style={{ fontSize: 10, color: C.textDim, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
              Click phase row to expand · Click task to view detail
            </div>

            {/* Week headers */}
            <div style={{
              display: "grid", gridTemplateColumns: "260px repeat(12, 1fr)",
              borderBottom: `1px solid ${C.border}`, paddingBottom: 8, marginBottom: 4,
            }}>
              <div style={{ fontSize: 9, color: C.textDim, padding: "0 12px", letterSpacing: 2 }}>PHASE</div>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} style={{ fontSize: 9, color: C.textDim, textAlign: "center", letterSpacing: 1 }}>W{i + 1}</div>
              ))}
            </div>

            {PHASES.map(phase => (
              <div key={phase.id}>
                {/* Phase row */}
                <div
                  className="phase-row"
                  onClick={() => {
                    setExpandedPhase(expandedPhase === phase.id ? null : phase.id);
                    setSelectedTask(null);
                  }}
                  style={{
                    display: "grid", gridTemplateColumns: "260px repeat(12, 1fr)",
                    alignItems: "center", borderRadius: 4, padding: "4px 0", marginBottom: 3,
                    background: expandedPhase === phase.id ? C.surfaceHigh : "transparent",
                    transition: "background 0.15s",
                  }}
                >
                  <div style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 9, color: C.textDim }}>{expandedPhase === phase.id ? "▼" : "▶"}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: phase.color, letterSpacing: 2 }}>{phase.label}</span>
                    <span style={{ fontSize: 10, color: C.textMid }}>{phase.title}</span>
                  </div>
                  {Array.from({ length: 12 }, (_, i) => {
                    const w = i + 1;
                    const inPhase = w >= phase.weeks[0] && w <= phase.weeks[1];
                    const isStart = w === phase.weeks[0];
                    const isEnd = w === phase.weeks[1];
                    return (
                      <div key={i} style={{ height: 32, display: "flex", alignItems: "center", padding: "0 1px", borderLeft: `1px solid ${C.border}22` }}>
                        {inPhase && (
                          <div style={{
                            height: 24, width: "100%",
                            background: `linear-gradient(90deg, ${phase.dim}, ${phase.color}CC)`,
                            borderRadius: `${isStart ? 4 : 0}px ${isEnd ? 4 : 0}px ${isEnd ? 4 : 0}px ${isStart ? 4 : 0}px`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            {isStart && (
                              <span style={{ fontSize: 8, color: "#000", fontWeight: 800, letterSpacing: 1, paddingLeft: 6 }}>
                                {phase.pct}%
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Tasks (expanded) */}
                {expandedPhase === phase.id && phase.tasks.map(task => (
                  <div key={task.id}>
                    <div
                      className="task-row"
                      onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
                      style={{
                        display: "grid", gridTemplateColumns: "260px repeat(12, 1fr)",
                        alignItems: "center", borderRadius: 3, padding: "2px 0", marginBottom: 2,
                        background: selectedTask?.id === task.id ? C.surface : "transparent",
                        transition: "background 0.15s",
                      }}
                    >
                      <div style={{ padding: "5px 12px 5px 28px", display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: DIFF_COLOR[task.diff], flexShrink: 0 }} />
                        <span style={{ fontSize: 10, color: C.textMid }}>{task.title}</span>
                      </div>
                      {Array.from({ length: 12 }, (_, i) => {
                        const w = i + 1;
                        return (
                          <div key={i} style={{ height: 24, display: "flex", alignItems: "center", padding: "0 1px", borderLeft: `1px solid ${C.border}11` }}>
                            {w === task.week && (
                              <div style={{
                                height: 12, width: `${task.span * 100}%`,
                                background: phase.color, borderRadius: 2, opacity: 0.7,
                              }} />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {selectedTask?.id === task.id && (
                      <div style={{
                        margin: "4px 0 8px 28px",
                        padding: "14px 16px",
                        background: C.surface,
                        border: `1px solid ${phase.color}33`,
                        borderLeft: `3px solid ${phase.color}`,
                        borderRadius: 4,
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: phase.color }}>{task.title}</span>
                          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 20, background: `${DIFF_COLOR[task.diff]}22`, color: DIFF_COLOR[task.diff], border: `1px solid ${DIFF_COLOR[task.diff]}33` }}>{task.diff}</span>
                            <span style={{ fontSize: 10, color: C.textDim }}>Week {task.week}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: 11, color: C.textMid, lineHeight: 1.7, marginBottom: 10 }}>{task.desc}</p>
                        <div style={{ padding: "8px 12px", background: C.bg, borderRadius: 3, fontSize: 11, color: C.text }}>
                          <span style={{ color: C.textDim }}>DELIVERABLE → </span>{task.deliverable}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            <div style={{ marginTop: 16, display: "flex", gap: 20, flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, color: C.textDim, letterSpacing: 2 }}>DIFFICULTY:</span>
              {Object.entries(DIFF_COLOR).map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: v }} />
                  <span style={{ fontSize: 10, color: C.textDim }}>{k}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════ PIPELINE TAB ═══════════════════════════════════ */}
        {tab === "Pipeline" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Architecture diagram */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: 24 }}>
              <div style={{ fontSize: 10, color: C.cyan, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>
                CALL FLOW ARCHITECTURE — Full Pipeline
              </div>
              <div style={{ overflowX: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 0, minWidth: 900, paddingBottom: 8 }}>
                  {[
                    { label: "CRM", sub: "Lead Data", color: C.cyan, icon: "🗄" },
                    null,
                    { label: "Webhook\nTrigger", sub: "FastAPI", color: C.cyan, icon: "⚡" },
                    null,
                    { label: "Telnyx", sub: "SIP/PSTN", color: C.green, icon: "📞" },
                    null,
                    { label: "LiveKit", sub: "WebRTC", color: C.purple, icon: "🌐" },
                    null,
                    { label: "VAD", sub: "Silero", color: C.amber, icon: "👂" },
                    null,
                    { label: "STT", sub: "Whisper", color: C.amber, icon: "📝" },
                    null,
                    { label: "LLM", sub: "Llama/GPT", color: "#FF7043", icon: "🧠" },
                    null,
                    { label: "TTS", sub: "Piper/EL", color: "#EC407A", icon: "🔊" },
                    null,
                    { label: "Owner's\nPhone", sub: "Hears AI", color: C.green, icon: "📱" },
                  ].map((node, i) => (
                    node === null ? (
                      <div key={i} style={{ fontSize: 18, color: C.border, padding: "0 4px", flexShrink: 0 }}>→</div>
                    ) : (
                      <div key={i} style={{
                        padding: "12px 14px", textAlign: "center", flexShrink: 0,
                        background: `${node.color}0D`, border: `1px solid ${node.color}33`, borderRadius: 6,
                        minWidth: 80,
                      }}>
                        <div style={{ fontSize: 20, marginBottom: 4 }}>{node.icon}</div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: node.color, whiteSpace: "pre-line" }}>{node.label}</div>
                        <div style={{ fontSize: 9, color: C.textDim, marginTop: 2 }}>{node.sub}</div>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {/* Outcome flow */}
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 9, color: C.textDim, letterSpacing: 2, marginBottom: 10 }}>OUTCOME FLOW (After call ends)</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                  {[
                    ["Call Ends", C.textMid], ["→", C.border], ["Transcript Logged", C.cyan],
                    ["→", C.border], ["Outcome Classified", C.purple], ["→", C.border],
                    ["CRM Updated", C.green], ["→", C.border], ["IF BOOKED →", C.amber],
                    ["Calendly + SMS", C.amber], ["→", C.border], ["IF NO ANSWER →", C.red],
                    ["Retry Scheduled", C.red],
                  ].map(([text, color], i) => (
                    <span key={i} style={{ fontSize: 11, color, fontWeight: text.includes("→") ? 400 : 600 }}>{text}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* You Build vs You Use */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: C.surface, border: `1px solid ${C.green}22`, borderLeft: `3px solid ${C.green}`, borderRadius: 6, padding: 24 }}>
                <div style={{ fontSize: 10, color: C.green, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>YOU BUILD THIS</div>
                <div style={{ fontSize: 11, color: C.textDim, marginBottom: 14 }}>Your code. Your logic. Your value.</div>
                {["Conversation prompt & logic", "Call state manager", "CRM webhook handler", "Orchestration / glue layer", "Retry & scheduling system", "Outcome classifier", "Booking flow coordinator", "Full call logging", "Voicemail detection logic", "Monitoring dashboard"].map(item => (
                  <div key={item} style={{ display: "flex", gap: 8, padding: "6px 0", fontSize: 11, color: C.text, borderBottom: `1px solid ${C.border}22` }}>
                    <span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>→</span> {item}
                  </div>
                ))}
              </div>
              <div style={{ background: C.surface, border: `1px solid ${C.amber}22`, borderLeft: `3px solid ${C.amber}`, borderRadius: 6, padding: 24 }}>
                <div style={{ fontSize: 10, color: C.amber, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>YOU USE THIS</div>
                <div style={{ fontSize: 11, color: C.textDim, marginBottom: 14 }}>Commodity bricks. Like electricity.</div>
                {[
                  ["Pipecat", "Pipeline framework"],
                  ["LiveKit", "WebRTC transport"],
                  ["Telnyx", "SIP / telephony"],
                  ["Whisper / Deepgram", "Speech to text"],
                  ["Llama 3.1 / GPT-4o-mini", "LLM reasoning"],
                  ["Piper / ElevenLabs", "Text to speech"],
                  ["Silero VAD", "Voice detection"],
                  ["Calendly API", "Appointment booking"],
                  ["Twilio", "SMS reminders"],
                  ["APScheduler", "Retry logic"],
                ].map(([tool, desc]) => (
                  <div key={tool} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.border}22` }}>
                    <div style={{ display: "flex", gap: 8, fontSize: 11, color: C.text }}>
                      <span style={{ color: C.amber, fontWeight: 700, flexShrink: 0 }}>↗</span> {tool}
                    </div>
                    <span style={{ fontSize: 10, color: C.textDim }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Latency targets */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: 24 }}>
              <div style={{ fontSize: 10, color: C.red, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
                LATENCY TARGETS — The #1 technical challenge
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                {[
                  { stage: "STT Transcription", target: "<300ms", local: "800–1200ms", pass: false },
                  { stage: "LLM First Token", target: "<400ms", local: "500–1500ms", pass: false },
                  { stage: "TTS First Chunk", target: "<200ms", local: "300–800ms", pass: false },
                  { stage: "Network Overhead", target: "<200ms", local: "varies", pass: false },
                  { stage: "Total End-to-End", target: "<1.1s", local: "3.6–6.5s", pass: false, critical: true },
                ].map(row => (
                  <div key={row.stage} style={{
                    padding: "14px",
                    background: row.critical ? `${C.red}0A` : C.surfaceHigh,
                    border: `1px solid ${row.critical ? C.red + "44" : C.border}`,
                    borderRadius: 4,
                  }}>
                    <div style={{ fontSize: 10, color: C.textMid, marginBottom: 6 }}>{row.stage}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.green }}>{row.target}</div>
                    <div style={{ fontSize: 10, color: C.red, marginTop: 2 }}>local: {row.local}</div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 14, padding: "10px 14px",
                background: `${C.amber}0A`, border: `1px solid ${C.amber}22`, borderRadius: 4,
                fontSize: 11, color: C.textMid,
              }}>
                <span style={{ color: C.amber, fontWeight: 700 }}>OK for learning phase: </span>
                3–6 second latency on your local setup is expected and acceptable during development.
                Cloud APIs are mandatory when you go to real homeowner calls.
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════ COSTS TAB ═══════════════════════════════════ */}
        {tab === "Costs" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Monthly breakdown */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: 24 }}>
              <div style={{ fontSize: 10, color: C.amber, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>
                MONTHLY COST BREAKDOWN — 200 calls/day, 4,400 calls/month
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      {["Service", "What It Does", "Rate", "Monthly Usage", "Est. Cost"].map(h => (
                        <th key={h} style={{ padding: "8px 12px", fontSize: 9, color: C.textDim, textAlign: "left", letterSpacing: 2, fontWeight: 400 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { service: "Deepgram STT", what: "Speech to text", rate: "$0.0043/min", usage: "~3,500 answered mins", cost: "$10–28", color: C.cyan },
                      { service: "ElevenLabs TTS", what: "Text to speech", rate: "$0.18/1k chars", usage: "~200k chars/mo", cost: "$25–45", color: C.purple },
                      { service: "GPT-4o-mini", what: "LLM reasoning", rate: "$0.15/1M tokens", usage: "~880k tokens/mo", cost: "$15–30", color: "#FF7043" },
                      { service: "Telnyx Telephony", what: "Phone calls", rate: "$0.013/min", usage: "~6,600 mins/mo", cost: "$70–100", color: C.green },
                      { service: "VPS Server", what: "Hetzner CX31", rate: "flat rate", usage: "24/7 uptime", cost: "$20–35", color: C.amber },
                      { service: "DNC Compliance", what: "Legal scrubbing", rate: "flat rate", usage: "per list", cost: "$25–50", color: C.red },
                      { service: "Calendly", what: "Booking", rate: "flat rate", usage: "unlimited", cost: "$0–12", color: C.textMid },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.border}22` }}>
                        <td style={{ padding: "11px 12px", fontSize: 11, fontWeight: 700, color: row.color }}>{row.service}</td>
                        <td style={{ padding: "11px 12px", fontSize: 11, color: C.textMid }}>{row.what}</td>
                        <td style={{ padding: "11px 12px", fontSize: 11, color: C.text }}>{row.rate}</td>
                        <td style={{ padding: "11px 12px", fontSize: 11, color: C.textMid }}>{row.usage}</td>
                        <td style={{ padding: "11px 12px", fontSize: 12, fontWeight: 700, color: C.amber }}>{row.cost}</td>
                      </tr>
                    ))}
                    <tr style={{ borderTop: `1px solid ${C.border}`, background: C.surfaceHigh }}>
                      <td colSpan={4} style={{ padding: "12px 12px", fontSize: 11, fontWeight: 700, color: C.text }}>TOTAL MONTHLY</td>
                      <td style={{ padding: "12px 12px", fontSize: 14, fontWeight: 800, color: C.amber }}>$165–300/mo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scale cards */}
            <div>
              <div style={{ fontSize: 10, color: C.textDim, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
                COST AT DIFFERENT SCALES
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {COSTS_MONTHLY.map(row => (
                  <div key={row.scale} className="cost-card" style={{
                    padding: 20, background: C.surface,
                    border: `1px solid ${C.border}`, borderRadius: 6,
                    transition: "border-color 0.15s", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 9, color: C.textDim, letterSpacing: 3, marginBottom: 8 }}>{row.scale.toUpperCase()}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: row.color }}>{row.cost}</div>
                    <div style={{ fontSize: 10, color: C.textMid, marginTop: 4 }}>/month</div>
                    <div style={{ fontSize: 11, color: C.textDim, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}` }}>
                      {row.calls} calls/day
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* One time costs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: 24 }}>
                <div style={{ fontSize: 10, color: C.cyan, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>ONE-TIME SETUP COSTS</div>
                {[
                  { item: "Domain + SSL", cost: "$15/year", note: "" },
                  { item: "Initial server setup", cost: "$0", note: "your time" },
                  { item: "Legal / TCPA consultation", cost: "$200–500", note: "DO NOT SKIP" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.border}22` }}>
                    <div>
                      <div style={{ fontSize: 11, color: C.text }}>{row.item}</div>
                      {row.note && <div style={{ fontSize: 10, color: row.note === "DO NOT SKIP" ? C.red : C.textDim, marginTop: 2 }}>{row.note}</div>}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: C.amber }}>{row.cost}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", marginTop: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>TOTAL ONE-TIME</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: C.amber }}>$215–515</span>
                </div>
              </div>

              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: 24 }}>
                <div style={{ fontSize: 10, color: C.green, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
                  WHEN IS THE RIGHT TIME TO SPEND?
                </div>
                <div style={{ fontSize: 11, color: C.textMid, marginBottom: 14, lineHeight: 1.7 }}>
                  You are ready to spend real money when ALL of these are true:
                </div>
                {[
                  { item: "Pipeline runs end-to-end locally", type: "tech" },
                  { item: "Conversation handles 10+ edge cases", type: "tech" },
                  { item: "CRM integration works with real data structure", type: "tech" },
                  { item: "Booking flow works correctly", type: "tech" },
                  { item: "You've had 20+ fake conversations with agent", type: "mental" },
                  { item: "You know exactly where it fails", type: "mental" },
                  { item: "You have a fix plan for each failure", type: "mental" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: `1px solid ${C.border}22`, fontSize: 11, color: C.textMid }}>
                    <span style={{ color: row.type === "tech" ? C.cyan : C.purple, flexShrink: 0 }}>◆</span>
                    {row.item}
                  </div>
                ))}
                <div style={{
                  marginTop: 14, padding: "10px 12px",
                  background: `${C.amber}0A`, border: `1px solid ${C.amber}22`, borderRadius: 4,
                  fontSize: 11, color: C.amber, fontWeight: 700,
                }}>
                  That point: Week 7–8 minimum
                </div>
              </div>
            </div>

            {/* ROI quick calc */}
            <div style={{ background: C.surface, border: `1px solid ${C.green}22`, borderRadius: 6, padding: 24 }}>
              <div style={{ fontSize: 10, color: C.green, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
                QUICK ROI — Why the numbers work
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                {[
                  { label: "Average listing commission", value: "$8–15K", color: C.green },
                  { label: "Monthly running cost", value: "$165–300", color: C.amber },
                  { label: "Months of costs per commission", value: "2–4 years", color: C.cyan },
                  { label: "Appointments per week (200 calls/day)", value: "2–8", color: C.purple },
                  { label: "Listings per month (30–50% close)", value: "1–3", color: C.green },
                  { label: "Revenue potential per month", value: "$8K–45K", color: C.amber },
                ].map(stat => (
                  <div key={stat.label} style={{
                    padding: 16, background: C.surfaceHigh,
                    border: `1px solid ${C.border}`, borderRadius: 4,
                  }}>
                    <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: 10, color: C.textMid, marginTop: 6, lineHeight: 1.5 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 16, padding: "12px 16px",
                background: `${C.green}0A`, border: `1px solid ${C.green}33`,
                borderRadius: 4, fontSize: 11, color: C.green, fontWeight: 700,
              }}>
                One listing commission covers 2–4 years of monthly running costs. This is why the economics work.
              </div>
            </div>

          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: 32, paddingTop: 20,
          borderTop: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <div style={{ fontSize: 10, color: C.textDim, letterSpacing: 1 }}>
            PHASE 1–6 · 12 WEEKS · $0 COST · LOCAL BUILD · FULL EDGE CASE COVERAGE
          </div>
          <div style={{ fontSize: 10, color: C.textDim }}>
            After Week 12 → spend first real money → 20 calls/day → scale from there
          </div>
        </div>
      </div>
    </div>
  );
}