import { useState, useEffect } from "react";

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

const TABS = ["Overview", "Readiness", "Gantt", "Pipeline", "Costs"];

export default function App() {
  const [tab, setTab] = useState("Overview");
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div style={{
      background: C.bg,
      minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: C.text,
      fontSize: 14,
      lineHeight: 1.5,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.borderHigh}; }
        .tab-btn { 
          transition: all 0.2s ease;
          position: relative;
        }
        .tab-btn:hover { 
          background: ${C.surfaceHigh} !important;
          color: ${C.white} !important;
        }
        .tab-btn.active {
          color: ${C.amber} !important;
        }
        .task-row:hover { 
          background: ${C.surfaceHigh} !important; 
          cursor: pointer; 
        }
        .phase-row:hover { 
          background: ${C.surfaceHigh} !important; 
          cursor: pointer; 
        }
        .stat-item:hover {
          transform: translateY(-2px);
          transition: transform 0.2s ease;
        }
      `}</style>

      {/* TOP HEADER */}
      <div style={{ 
        background: C.surface, 
        borderBottom: `1px solid ${C.border}`, 
        padding: "24px 32px",
        boxShadow: `0 4px 20px ${C.bg}`,
      }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-start", 
          flexWrap: "wrap", 
          gap: 24,
          marginBottom: 24,
        }}>
          <div>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 12, 
              marginBottom: 12,
            }}>
              <div style={{ 
                width: 10, 
                height: 10, 
                borderRadius: "50%", 
                background: C.green, 
                boxShadow: `0 0 12px ${C.green}66`,
                animation: 'pulse 2s infinite',
              }} />
              <span style={{ 
                fontSize: 11, 
                color: C.cyan, 
                letterSpacing: 3, 
                textTransform: "uppercase",
                fontWeight: 600,
              }}>
                Project Brief · AI Voice Agent · Real Estate Outreach
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 36, 
              fontWeight: 800, 
              color: C.white,
              letterSpacing: -1, 
              lineHeight: 1.1,
              margin: 0,
            }}>
              FROM ZERO TO <span style={{ color: C.amber }}>45%</span> PRODUCTION
            </h1>
            <p style={{ 
              fontSize: 13, 
              color: C.textMid, 
              marginTop: 10,
              fontWeight: 400,
            }}>
              12-Week Build Plan · Full Learning Phase · Complete Pipeline Architecture
            </p>
          </div>
          
          {/* Stats - IMPROVED VISIBILITY */}
          <div style={{ 
            display: "flex", 
            gap: 32, 
            flexWrap: "wrap",
            alignItems: "flex-end",
          }}>
            {[
              { v: "12", l: "Weeks", color: C.cyan }, 
              { v: "6", l: "Phases", color: C.purple }, 
              { v: "30", l: "Tasks", color: C.amber },
              { v: "$0", l: "Phase Cost", color: C.green }, 
              { v: "45%", l: "Complete", color: C.green }, 
              { v: "~55%", l: "Remaining", color: C.red }
            ].map((s, i) => (
              <div key={i} className="stat-item" style={{ 
                textAlign: "center",
                minWidth: 80,
              }}>
                <div style={{ 
                  fontFamily: "'Syne', sans-serif", 
                  fontSize: 36, 
                  fontWeight: 800, 
                  color: s.color,
                  textShadow: `0 0 20px ${s.color}44`,
                  lineHeight: 1,
                }}>
                  {s.v}
                </div>
                <div style={{ 
                  fontSize: 11, 
                  color: C.textMid, 
                  letterSpacing: 1.5, 
                  textTransform: "uppercase",
                  marginTop: 6,
                  fontWeight: 500,
                }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs - CENTER ALIGNED */}
        <div style={{ 
          display: "flex", 
          gap: 4, 
          borderBottom: `1px solid ${C.border}`,
          paddingBottom: 0,
        }}>
          {TABS.map(t => (
            <button 
              key={t} 
              className={`tab-btn ${tab === t ? 'active' : ''}`} 
              onClick={() => setTab(t)} 
              style={{
                padding: "14px 28px", 
                fontSize: 12, 
                letterSpacing: 1.5,
                textTransform: "uppercase", 
                background: tab === t ? C.surfaceHigh : "transparent", 
                border: "none",
                borderBottom: `2px solid ${tab === t ? C.amber : "transparent"}`,
                color: tab === t ? C.amber : C.textMid,
                cursor: "pointer", 
                fontFamily: "inherit",
                fontWeight: tab === t ? 600 : 500,
                textAlign: "center",
                borderRadius: "4px 4px 0 0",
                transition: "all 0.2s ease",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "32px", maxWidth: 1440, margin: "0 auto" }}>
        {/* OVERVIEW TAB */}
        {tab === "Overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {/* Learning Phase Card */}
              <div style={{ 
                background: C.surface, 
                border: `1px solid ${C.border}`, 
                borderRadius: 8, 
                padding: 28,
                boxShadow: `0 2px 12px ${C.bg}`,
              }}>
                <div style={{ 
                  fontSize: 11, 
                  color: C.cyan, 
                  letterSpacing: 2.5, 
                  textTransform: "uppercase", 
                  marginBottom: 20,
                  fontWeight: 600,
                }}>
                  What "Learning Phase" Means
                </div>
                {[
                  "Study the topics",
                  "Build the full system locally",
                  "Call your own number",
                  "Test every edge case you can think of",
                  "Find and fix defects",
                ].map((step, i) => (
                  <div key={i}>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 14, 
                      padding: "12px 0",
                    }}>
                      <div style={{
                        width: 32, 
                        height: 32, 
                        borderRadius: "50%",
                        background: C.cyanDim, 
                        border: `1px solid ${C.cyan}44`,
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        fontSize: 12, 
                        color: C.cyan, 
                        fontWeight: 700, 
                        flexShrink: 0,
                      }}>
                        {i + 1}
                      </div>
                      <span style={{ fontSize: 13, color: C.text, fontWeight: 400 }}>
                        {step}
                      </span>
                    </div>
                    {i < 4 && (
                      <div style={{ 
                        marginLeft: 16, 
                        width: 1, 
                        height: 12, 
                        background: C.border 
                      }} />
                    )}
                  </div>
                ))}
                <div style={{
                  marginTop: 20, 
                  padding: "14px 18px",
                  background: `${C.cyan}0A`, 
                  border: `1px solid ${C.cyan}22`,
                  borderRadius: 6,
                }}>
                  <span style={{ color: C.cyan, fontWeight: 700, fontSize: 12 }}>
                    = LEARNING PHASE COMPLETE
                  </span>
                  <p style={{ 
                    fontSize: 12, 
                    color: C.textMid, 
                    marginTop: 6,
                    lineHeight: 1.6,
                  }}>
                    Not just studying. Not just building. All of it together.
                  </p>
                </div>
              </div>

              {/* Progress Card */}
              <div style={{ 
                background: C.surface, 
                border: `1px solid ${C.border}`, 
                borderRadius: 8, 
                padding: 28,
                boxShadow: `0 2px 12px ${C.bg}`,
              }}>
                <div style={{ 
                  fontSize: 11, 
                  color: C.amber, 
                  letterSpacing: 2.5, 
                  textTransform: "uppercase", 
                  marginBottom: 24,
                  fontWeight: 600,
                }}>
                  Where This Plan Gets You
                </div>
                
                {/* 45% Complete */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    marginBottom: 10,
                  }}>
                    <span style={{ fontSize: 12, color: C.textMid, fontWeight: 500 }}>
                      Learning Phase Complete
                    </span>
                    <span style={{ 
                      fontSize: 16, 
                      fontWeight: 700, 
                      color: C.green,
                      fontFamily: "'Syne', sans-serif",
                    }}>
                      45%
                    </span>
                  </div>
                  <div style={{ 
                    height: 10, 
                    background: C.border, 
                    borderRadius: 5, 
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%", 
                      width: "45%",
                      background: `linear-gradient(90deg, ${C.green}, ${C.green}CC)`,
                      borderRadius: 5,
                    }} />
                  </div>
                </div>

                {/* 55% Remaining */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    marginBottom: 10,
                  }}>
                    <span style={{ fontSize: 12, color: C.textMid, fontWeight: 500 }}>
                      Remaining to 100% Production
                    </span>
                    <span style={{ 
                      fontSize: 16, 
                      fontWeight: 700, 
                      color: C.red,
                      fontFamily: "'Syne', sans-serif",
                    }}>
                      55%
                    </span>
                  </div>
                  <div style={{ 
                    height: 10, 
                    background: C.border, 
                    borderRadius: 5, 
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%", 
                      width: "55%",
                      background: `linear-gradient(90deg, ${C.red}, ${C.red}CC)`,
                      borderRadius: 5,
                    }} />
                  </div>
                </div>

                {/* Remaining Breakdown */}
                <div style={{ 
                  fontSize: 10, 
                  color: C.textDim, 
                  letterSpacing: 2, 
                  marginBottom: 16,
                  fontWeight: 600,
                }}>
                  THAT 55% BREAKS DOWN AS:
                </div>
                {REMAINING.map((r) => (
                  <div key={r.label} style={{ marginBottom: 12 }}>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      marginBottom: 6,
                    }}>
                      <span style={{ fontSize: 11, color: C.textMid, fontWeight: 400 }}>
                        {r.label}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ 
                          fontSize: 10, 
                          color: DIFF_COLOR[r.diff],
                          fontWeight: 500,
                        }}>
                          {r.diff}
                        </span>
                        <span style={{ 
                          fontSize: 12, 
                          color: DIFF_COLOR[r.diff], 
                          fontWeight: 700, 
                          minWidth: 32, 
                          textAlign: "right",
                          fontFamily: "'Syne', sans-serif",
                        }}>
                          {r.pct}%
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 3 }}>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} style={{
                          width: 16, 
                          height: 16,
                          background: i < r.fill ? DIFF_COLOR[r.diff] : C.border,
                          borderRadius: 3,
                          opacity: i < r.fill ? 1 : 0.3,
                        }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* The 55% Card */}
            <div style={{ 
              background: C.surface, 
              border: `1px solid ${C.border}`, 
              borderRadius: 8, 
              padding: 28,
              boxShadow: `0 2px 12px ${C.bg}`,
            }}>
              <div style={{ 
                fontSize: 11, 
                color: C.red, 
                letterSpacing: 2.5, 
                textTransform: "uppercase", 
                marginBottom: 24,
                fontWeight: 600,
              }}>
                The 55% Nobody Talks About — What Separates a Demo from Production
              </div>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
                gap: 16,
              }}>
                {[
                  { 
                    title: "Production Conversation Quality", 
                    pct: "~10%", 
                    color: C.red, 
                    items: [
                      "Owner hands phone to spouse mid-call",
                      "Heavy accent drops STT 30–40%",
                      "Same question 3 times loops agent",
                      "Owner goes silent 8 seconds",
                      '"Yeah yeah" — agent ignores social cues',
                      '"Is this a robot?" — most critical moment'
                    ] 
                  },
                  { 
                    title: "Reliability & Error Handling", 
                    pct: "~8%", 
                    color: C.amber, 
                    items: [
                      "Deepgram goes down mid-call",
                      "ElevenLabs 429 rate limit during call",
                      "Telnyx drops audio at second 45",
                      "LLM takes 4 seconds one response",
                      "CRM webhook fails to fire",
                      "Server OOM on call 47"
                    ] 
                  },
                  { 
                    title: "Concurrent Call Management", 
                    pct: "~7%", 
                    color: C.purple, 
                    items: [
                      "Each call needs isolated state",
                      "Memory multiplies per active call",
                      "GPU/CPU contention between calls",
                      "One crash can't kill others",
                      "Logs don't get calls mixed up"
                    ] 
                  },
                  { 
                    title: "Compliance Infrastructure", 
                    pct: "~8%", 
                    color: "#FF7043", 
                    items: [
                      "DNC scrubbing before every call",
                      "State-by-state calling hour rules",
                      "Call recording consent disclosure",
                      "Opt-out handling mid-call",
                      "TCPA audit log — legally required"
                    ] 
                  },
                ].map(section => (
                  <div key={section.title} style={{
                    background: C.surfaceHigh, 
                    border: `1px solid ${section.color}22`,
                    borderLeft: `3px solid ${section.color}`, 
                    borderRadius: 6, 
                    padding: 20,
                  }}>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      marginBottom: 14,
                    }}>
                      <span style={{ 
                        fontSize: 12, 
                        fontWeight: 700, 
                        color: section.color,
                        letterSpacing: 0.5,
                      }}>
                        {section.title}
                      </span>
                      <span style={{ 
                        fontSize: 12, 
                        color: section.color, 
                        fontWeight: 700,
                        fontFamily: "'Syne', sans-serif",
                      }}>
                        {section.pct}
                      </span>
                    </div>
                    {section.items.map(item => (
                      <div key={item} style={{ 
                        display: "flex", 
                        gap: 10, 
                        padding: "5px 0", 
                        fontSize: 11, 
                        color: C.textMid,
                        lineHeight: 1.5,
                      }}>
                        <span style={{ 
                          color: section.color, 
                          flexShrink: 0,
                          fontWeight: 600,
                        }}>
                          ›
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would follow similar pattern with improved fonts and alignment */}
        {tab !== "Overview" && (
          <div style={{ 
            textAlign: "center", 
            padding: 80, 
            color: C.textMid,
            fontSize: 14,
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>
              {tab} Tab Content
            </div>
            <div style={{ fontSize: 13 }}>
              Same styling improvements apply to all tabs
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 40,
        paddingTop: 24,
        borderTop: `1px solid ${C.border}`,
        display: "flex", 
        justifyContent: "space-between", 
        flexWrap: "wrap", 
        gap: 16,
        padding: "24px 32px",
      }}>
        <div style={{ 
          fontSize: 11, 
          color: C.textDim, 
          letterSpacing: 1.5,
          fontWeight: 500,
        }}>
          PHASE 1–6 · 12 WEEKS · $0 COST · LOCAL BUILD · FULL EDGE CASE COVERAGE
        </div>
        <div style={{ 
          fontSize: 11, 
          color: C.textDim,
          fontWeight: 500,
        }}>
          After Week 12 → spend first real money → 20 calls/day → scale from there
        </div>
      </div>
    </div>
  );
}