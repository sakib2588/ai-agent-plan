import { useState } from "react";

const PHASES = [
  {
    id: 1,
    phase: "PHASE 1",
    title: "Foundation & Environment",
    weeks: [1, 2],
    color: "#00E5FF",
    darkColor: "#007A8C",
    completion: "~5% of total product",
    tasks: [
      {
        id: "1a",
        title: "Dev Environment Setup",
        week: 1,
        duration: 0.5,
        description: "Python 3.11+, Git, VS Code, virtual environment, Docker basics",
        deliverable: "Working local dev environment",
        difficulty: "Easy",
      },
      {
        id: "1b",
        title: "Study: Prompt Engineering (Course 3)",
        week: 1,
        duration: 1,
        description: "~8 hours. Focus on: system prompts, conversation flow, objection handling, few-shot examples",
        deliverable: "First draft of your real estate conversation prompt",
        difficulty: "Easy",
      },
      {
        id: "1c",
        title: "Study: Agentic Workflows (Course 5)",
        week: 2,
        duration: 1,
        description: "~10 hours. Focus on: tool calling, state machines, decision trees, multi-step flows",
        deliverable: "Written diagram of your agent decision tree",
        difficulty: "Medium",
      },
      {
        id: "1d",
        title: "Read LiveKit Agents Docs",
        week: 2,
        duration: 0.5,
        description: "~6 hours. VoicePipelineAgent, AgentSession, plugins, telephony integration overview",
        deliverable: "You understand the full architecture before writing code",
        difficulty: "Medium",
      },
    ],
  },
  {
    id: 2,
    phase: "PHASE 2",
    title: "Core Voice Pipeline",
    weeks: [3, 4],
    color: "#B388FF",
    darkColor: "#5E35B1",
    completion: "~15% of total product",
    tasks: [
      {
        id: "2a",
        title: "Install & Run Pipecat Examples",
        week: 3,
        duration: 0.5,
        description: "Clone pipecat repo. Run their example voice agent locally. Understand Frame flow: AudioFrame → TextFrame → AudioFrame",
        deliverable: "A working local chatbot you can talk to in terminal",
        difficulty: "Easy",
      },
      {
        id: "2b",
        title: "Swap In Local Models (Free)",
        week: 3,
        duration: 1,
        description: "STT: Whisper base (CPU). LLM: Llama 3.1 8B via Ollama (GPU). TTS: Piper TTS (CPU). Wire them together in Pipecat pipeline.",
        deliverable: "Full local STT→LLM→TTS pipeline running. 3-6s latency expected — that is fine",
        difficulty: "Medium",
      },
      {
        id: "2c",
        title: "Build Voice Activity Detection",
        week: 3,
        duration: 0.5,
        description: "Use Silero VAD (free, open source). Test: does it correctly detect when you stop talking? Test with background noise (TV on, music). Fix false triggers.",
        deliverable: "VAD working correctly in 90% of your test cases",
        difficulty: "Medium",
      },
      {
        id: "2d",
        title: "Build Interruption Handler",
        week: 4,
        duration: 1,
        description: "When you speak while AI is responding: AI must stop mid-sentence immediately, not finish its thought, and listen to you. This requires cancelling the TTS stream on UserStartedSpeakingFrame.",
        deliverable: "AI stops talking when you interrupt it. Test 20+ times.",
        difficulty: "Hard",
      },
      {
        id: "2e",
        title: "Basic Conversation State Manager",
        week: 4,
        duration: 1,
        description: "Track conversation stage: INTRO → QUALIFY → OBJECTION → BOOK → END. Build a Python dataclass or dict that holds current stage, property data, owner name, previous objections raised.",
        deliverable: "State object that correctly tracks a full mock conversation",
        difficulty: "Medium",
      },
    ],
  },
  {
    id: 3,
    phase: "PHASE 3",
    title: "Telephony Integration",
    weeks: [5, 6],
    color: "#69FF47",
    darkColor: "#2E7D32",
    completion: "~25% of total product",
    tasks: [
      {
        id: "3a",
        title: "Read Telnyx SIP Docs + Account Setup",
        week: 5,
        duration: 0.5,
        description: "~3 hours. Understand SIP trunking, outbound dialing, audio codec (mulaw G.711). Create Telnyx account (free tier available).",
        deliverable: "Telnyx account ready, SIP config understood",
        difficulty: "Medium",
      },
      {
        id: "3b",
        title: "LiveKit SIP Bridge Setup",
        week: 5,
        duration: 1,
        description: "Connect Telnyx → LiveKit SIP → your agent. This is the critical bridge: PSTN phone call becomes WebRTC room participant that your agent can hear. Follow LiveKit telephony docs exactly.",
        deliverable: "You can trigger a call to your phone from your code",
        difficulty: "Hard",
      },
      {
        id: "3c",
        title: "First Real Call To Yourself",
        week: 5,
        duration: 0.5,
        description: "Your agent calls your phone. You answer. It says hello. You talk. It responds. Even at 4 second latency this is a major milestone. Record the call.",
        deliverable: "First successful end-to-end phone conversation with your agent",
        difficulty: "Medium",
      },
      {
        id: "3d",
        title: "Voicemail Detection (AMD)",
        week: 6,
        duration: 1,
        description: "Answering Machine Detection. When voicemail picks up: detect it within 3 seconds, play a short 15-second message, hang up. Use audio pattern analysis. This is a known hard problem — budget extra time.",
        deliverable: "Agent correctly identifies voicemail 80%+ of the time",
        difficulty: "Hard",
      },
      {
        id: "3e",
        title: "Call Outcome Logging",
        week: 6,
        duration: 0.5,
        description: "Log every call: timestamp, number called, duration, outcome (answered/voicemail/no-answer/interested/not-interested/booked), full transcript. Store in local SQLite first.",
        deliverable: "Every test call has a complete log entry you can review",
        difficulty: "Easy",
      },
      {
        id: "3f",
        title: "Retry & Scheduling Logic",
        week: 6,
        duration: 0.5,
        description: "No answer → retry in 4 hours. Voicemail → retry next day at different time. Said 'call Thursday' → schedule for Thursday. Requested DNC → flag permanently. Use APScheduler (Python).",
        deliverable: "Automated retry system running on test data",
        difficulty: "Medium",
      },
    ],
  },
  {
    id: 4,
    phase: "PHASE 4",
    title: "Conversation Logic & Prompts",
    weeks: [7, 8],
    color: "#FFD740",
    darkColor: "#F57F17",
    completion: "~33% of total product",
    tasks: [
      {
        id: "4a",
        title: "Write Full Conversation Script v1",
        week: 7,
        duration: 1,
        description: "Cover all branches: intro, qualify, 8 objections, price deflection, spouse handoff, angry owner, 'is this a robot', booking, end call. This is not code — this is a document you write first.",
        deliverable: "Google Doc / Markdown with every conversation branch mapped",
        difficulty: "Hard",
      },
      {
        id: "4b",
        title: "Convert Script to System Prompt",
        week: 7,
        duration: 0.5,
        description: "Translate your conversation document into a structured system prompt with: persona definition, rules, property context injection, response length limits, tone guidelines, tool calling instructions.",
        deliverable: "System prompt that fits under 2000 tokens",
        difficulty: "Medium",
      },
      {
        id: "4c",
        title: "Test 20 Edge Cases On Yourself",
        week: 7,
        duration: 0.5,
        description: "Call yourself and manually trigger each edge case. Record which ones fail. Update prompt after each failure. Minimum 20 distinct scenarios tested.",
        deliverable: "List of 20 test cases with pass/fail results",
        difficulty: "Medium",
      },
      {
        id: "4d",
        title: "Property Data Injection",
        week: 8,
        duration: 0.5,
        description: "Agent must know: owner name, property address, estimated value, last sale date, days on market if listed. Build function to inject this into prompt context before each call.",
        deliverable: "Agent correctly references property details mid-conversation",
        difficulty: "Medium",
      },
      {
        id: "4e",
        title: "Prompt Refinement Cycle",
        week: 8,
        duration: 1,
        description: "Call yourself 30 more times. Have a friend (who doesn't know the script) answer and act as a homeowner. Find every failure point. Rewrite prompt sections that fail. Repeat until 80% of conversations reach the qualification stage.",
        deliverable: "Prompt v3+ with documented change log explaining each revision",
        difficulty: "Hard",
      },
      {
        id: "4f",
        title: "Is This A Robot? Handler",
        week: 8,
        duration: 0.5,
        description: "Most critical single moment. When owner asks 'are you a robot?' or 'is this AI?' — your agent needs a rehearsed, honest, non-defensive response that keeps the call alive. Test 10 variations. Pick the one with best retention.",
        deliverable: "Single best response that passes the robot test in 7/10 tries",
        difficulty: "Hard",
      },
    ],
  },
  {
    id: 5,
    phase: "PHASE 5",
    title: "CRM & Booking Integration",
    weeks: [9, 10],
    color: "#FF6D00",
    darkColor: "#BF360C",
    completion: "~40% of total product",
    tasks: [
      {
        id: "5a",
        title: "Mock CRM Data Layer",
        week: 9,
        duration: 0.5,
        description: "Build a local SQLite or JSON file that mimics your CRM structure: owner_name, phone, address, property_value, notes, call_history, status. Write seed script with 50 fake leads.",
        deliverable: "50 fake leads ready to feed into your agent",
        difficulty: "Easy",
      },
      {
        id: "5b",
        title: "CRM → Call Trigger Webhook",
        week: 9,
        duration: 0.5,
        description: "When new lead added to CRM: automatically trigger outbound call. Build a FastAPI webhook endpoint. CRM posts to it → your server pulls lead data → initiates call via Telnyx.",
        deliverable: "Adding a record to your mock CRM automatically starts a call",
        difficulty: "Medium",
      },
      {
        id: "5c",
        title: "Calendly API Integration",
        week: 9,
        duration: 1,
        description: "When owner says yes: agent reads your available slots from Calendly API, offers 2 options ('I have Tuesday 2pm or Thursday 10am, which works better?'), books the one they pick, sends confirmation.",
        deliverable: "Full booking flow tested end to end. Appointment appears in your Calendly.",
        difficulty: "Medium",
      },
      {
        id: "5d",
        title: "Post-Call CRM Update",
        week: 10,
        duration: 0.5,
        description: "After every call: write outcome, transcript summary, next action, and appointment details back to CRM. Automatically update lead status. No manual data entry ever.",
        deliverable: "Zero manual CRM updates needed after any call",
        difficulty: "Easy",
      },
      {
        id: "5e",
        title: "SMS Reminder System",
        week: 10,
        duration: 0.5,
        description: "24 hours before booked appointment: send SMS to owner confirming the meeting. Use Twilio free trial. Simple message: name, time, address. This one feature dramatically reduces no-show rate.",
        deliverable: "Automated SMS fires correctly 24hrs before test appointments",
        difficulty: "Easy",
      },
      {
        id: "5f",
        title: "End to End Integration Test",
        week: 10,
        duration: 1,
        description: "Run the FULL flow 10 times: Add lead to CRM → auto call fires → have conversation → book appointment → CRM updates → SMS reminder fires. Document every failure. Fix every failure.",
        deliverable: "10/10 runs complete without manual intervention",
        difficulty: "Medium",
      },
    ],
  },
  {
    id: 6,
    phase: "PHASE 6",
    title: "Edge Case Testing & Defect Fixing",
    weeks: [11, 12],
    color: "#F48FB1",
    darkColor: "#AD1457",
    completion: "~45% of total product",
    tasks: [
      {
        id: "6a",
        title: "Stress Test: 50 Self-Calls",
        week: 11,
        duration: 1,
        description: "Call yourself 50 times over 3 days. Different times of day. Different noise levels. Try to break it every way you can. Log every defect in a bug tracker (Notion or GitHub Issues).",
        deliverable: "Bug tracker with 50 logged calls and all defects documented",
        difficulty: "Medium",
      },
      {
        id: "6b",
        title: "Friend Test: 20 Blind Calls",
        week: 11,
        duration: 1,
        description: "Have 3-4 friends answer calls without coaching. They act natural. Do not tell them what to say. Watch where the agent breaks on real unexpected human behavior. This will reveal bugs you never imagined.",
        deliverable: "20 friend test calls with transcript analysis",
        difficulty: "Medium",
      },
      {
        id: "6c",
        title: "Defect Priority & Fix Cycle",
        week: 11,
        duration: 0.5,
        description: "Sort all bugs: P0 (call crashes), P1 (bad experience), P2 (minor). Fix all P0s immediately. Fix top 5 P1s. P2s go to backlog. Retest every fix.",
        deliverable: "Zero P0 bugs. Top P1s resolved.",
        difficulty: "Medium",
      },
      {
        id: "6d",
        title: "Failure Mode Documentation",
        week: 12,
        duration: 0.5,
        description: "Document every known failure: what causes it, what the agent does wrong, whether it's fixed or in backlog. This becomes your checklist before going to real calls.",
        deliverable: "Written failure mode document — your honest assessment of system limitations",
        difficulty: "Easy",
      },
      {
        id: "6e",
        title: "Final Pipeline Verification",
        week: 12,
        duration: 1,
        description: "Full end-to-end run: 20 calls across 2 days. Target: 85% complete without crash, 70% reach qualification stage, booking flow works 100% of interested cases, CRM updated on all calls.",
        deliverable: "Pass/fail report against these 4 metrics",
        difficulty: "Medium",
      },
      {
        id: "6f",
        title: "Production Readiness Checklist",
        week: 12,
        duration: 0.5,
        description: "Written checklist: pipeline stable ✓, all P0 bugs fixed ✓, CRM integration working ✓, booking working ✓, logging complete ✓, prompt handles 20+ edge cases ✓, you know all current failure modes ✓",
        deliverable: "Signed-off checklist. If all green: you are ready to spend real money.",
        difficulty: "Easy",
      },
    ],
  },
];

const DIFFICULTY_COLORS = {
  Easy: "#4CAF50",
  Medium: "#FF9800",
  Hard: "#F44336",
};

const WEEKS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function ProjectPlan() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [view, setView] = useState("gantt");

  const allTasks = PHASES.flatMap((p) => p.tasks.map((t) => ({ ...t, phase: p })));

  return (
    <div style={{
      background: "#0A0A0F",
      minHeight: "100vh",
      fontFamily: "'Courier New', 'Consolas', monospace",
      color: "#E0E0E0",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid #1E1E2E",
        padding: "24px 32px",
        background: "linear-gradient(180deg, #0D0D1A 0%, #0A0A0F 100%)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 6, color: "#00E5FF", marginBottom: 6, textTransform: "uppercase" }}>
              AI Calling Agent · Real Estate Outreach
            </div>
            <h1 style={{
              fontSize: 28,
              fontWeight: 700,
              margin: 0,
              color: "#FFFFFF",
              letterSpacing: -0.5,
            }}>
              FROM ZERO → 45% PRODUCTION
            </h1>
            <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
              12-Week Build Plan · Learning Phase Complete · Full Pipeline
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["gantt", "tasks", "pipeline"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  background: view === v ? "#00E5FF" : "transparent",
                  border: `1px solid ${view === v ? "#00E5FF" : "#333"}`,
                  color: view === v ? "#000" : "#888",
                  padding: "6px 14px",
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: 2,
                  fontFamily: "inherit",
                  fontWeight: view === v ? 700 : 400,
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ display: "flex", gap: 32, marginTop: 20, flexWrap: "wrap" }}>
          {[
            { label: "Total Weeks", value: "12" },
            { label: "Total Tasks", value: "30" },
            { label: "Total Phases", value: "6" },
            { label: "Cost Phase", value: "$0" },
            { label: "Product Ready", value: "45%" },
            { label: "Next Step", value: "Real Calls" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#00E5FF" }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "#555", letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>

        {/* GANTT VIEW */}
        {view === "gantt" && (
          <div>
            <div style={{ fontSize: 11, color: "#555", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
              Gantt Chart — Click a phase to expand tasks
            </div>

            {/* Week headers */}
            <div style={{ display: "grid", gridTemplateColumns: "200px repeat(12, 1fr)", gap: 0, marginBottom: 2 }}>
              <div style={{ fontSize: 10, color: "#444", padding: "4px 8px" }}>PHASE</div>
              {WEEKS.map((w) => (
                <div key={w} style={{
                  fontSize: 10,
                  color: "#444",
                  textAlign: "center",
                  padding: "4px 2px",
                  borderLeft: "1px solid #1A1A2E",
                }}>
                  W{w}
                </div>
              ))}
            </div>

            {PHASES.map((phase) => (
              <div key={phase.id}>
                {/* Phase row */}
                <div
                  onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px repeat(12, 1fr)",
                    gap: 0,
                    marginBottom: 2,
                    cursor: "pointer",
                    borderRadius: 3,
                    background: selectedPhase === phase.id ? "#0F0F1E" : "transparent",
                  }}
                >
                  <div style={{
                    padding: "10px 8px",
                    fontSize: 11,
                    fontWeight: 700,
                    color: phase.color,
                    letterSpacing: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}>
                    <span style={{ opacity: 0.5, fontSize: 9 }}>{selectedPhase === phase.id ? "▼" : "▶"}</span>
                    {phase.phase}
                    <div style={{ fontSize: 9, color: "#444", fontWeight: 400, letterSpacing: 0 }}>
                      {phase.title}
                    </div>
                  </div>
                  {WEEKS.map((w) => {
                    const inPhase = w >= phase.weeks[0] && w <= phase.weeks[1];
                    const isStart = w === phase.weeks[0];
                    const isEnd = w === phase.weeks[1];
                    return (
                      <div key={w} style={{
                        borderLeft: "1px solid #1A1A2E",
                        padding: "6px 2px",
                        display: "flex",
                        alignItems: "center",
                      }}>
                        {inPhase && (
                          <div style={{
                            height: 24,
                            background: `linear-gradient(90deg, ${phase.darkColor}, ${phase.color})`,
                            width: "100%",
                            borderRadius: isStart ? "4px 0 0 4px" : isEnd ? "0 4px 4px 0" : "0",
                            opacity: 0.85,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                            {isStart && (
                              <span style={{ fontSize: 9, color: "#000", fontWeight: 700, paddingLeft: 4, whiteSpace: "nowrap", overflow: "hidden" }}>
                                {phase.completion}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Task rows (expanded) */}
                {selectedPhase === phase.id && phase.tasks.map((task) => {
                  const taskWeek = task.week;
                  const taskEnd = Math.min(task.week + Math.ceil(task.duration) - 1, task.week + 0);
                  return (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "200px repeat(12, 1fr)",
                        gap: 0,
                        marginBottom: 1,
                        cursor: "pointer",
                        background: selectedTask?.id === task.id ? "#111120" : "transparent",
                        borderRadius: 2,
                      }}
                    >
                      <div style={{
                        padding: "6px 8px 6px 20px",
                        fontSize: 10,
                        color: "#888",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}>
                        <span style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: DIFFICULTY_COLORS[task.difficulty],
                          flexShrink: 0,
                        }} />
                        {task.title}
                      </div>
                      {WEEKS.map((w) => {
                        const inTask = w === taskWeek;
                        return (
                          <div key={w} style={{
                            borderLeft: "1px solid #131328",
                            padding: "4px 2px",
                            display: "flex",
                            alignItems: "center",
                          }}>
                            {inTask && (
                              <div style={{
                                height: 14,
                                background: phase.color,
                                width: `${task.duration * 100}%`,
                                maxWidth: "100%",
                                borderRadius: 2,
                                opacity: 0.6,
                              }} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}

                {/* Task detail card */}
                {selectedTask && selectedTask.phase?.id === phase.id && selectedPhase === phase.id && (
                  <div style={{
                    margin: "8px 0 12px 0",
                    padding: "16px 20px",
                    background: "#0D0D1A",
                    border: `1px solid ${phase.color}33`,
                    borderRadius: 4,
                    borderLeft: `3px solid ${phase.color}`,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: phase.color, marginBottom: 6 }}>
                          {selectedTask.title}
                        </div>
                        <div style={{ fontSize: 11, color: "#888", lineHeight: 1.7, maxWidth: 600 }}>
                          {selectedTask.description}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                        <span style={{
                          fontSize: 10,
                          padding: "3px 10px",
                          background: `${DIFFICULTY_COLORS[selectedTask.difficulty]}22`,
                          color: DIFFICULTY_COLORS[selectedTask.difficulty],
                          border: `1px solid ${DIFFICULTY_COLORS[selectedTask.difficulty]}44`,
                          borderRadius: 20,
                          letterSpacing: 1,
                        }}>
                          {selectedTask.difficulty}
                        </span>
                        <span style={{ fontSize: 10, color: "#444" }}>Week {selectedTask.week}</span>
                      </div>
                    </div>
                    <div style={{
                      marginTop: 12,
                      paddingTop: 12,
                      borderTop: "1px solid #1A1A2E",
                      fontSize: 11,
                      color: "#AAA",
                    }}>
                      <span style={{ color: "#555", marginRight: 8 }}>✓ DELIVERABLE:</span>
                      {selectedTask.deliverable}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Legend */}
            <div style={{ marginTop: 24, display: "flex", gap: 24, flexWrap: "wrap" }}>
              <div style={{ fontSize: 10, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginRight: 8 }}>Difficulty:</div>
              {Object.entries(DIFFICULTY_COLORS).map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: v }} />
                  <span style={{ fontSize: 10, color: "#555" }}>{k}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TASKS VIEW */}
        {view === "tasks" && (
          <div>
            <div style={{ fontSize: 11, color: "#555", letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>
              All 30 Tasks — Full Detail
            </div>
            {PHASES.map((phase) => (
              <div key={phase.id} style={{ marginBottom: 32 }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                  paddingBottom: 8,
                  borderBottom: `1px solid ${phase.color}33`,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: phase.color, letterSpacing: 2 }}>
                    {phase.phase}
                  </div>
                  <div style={{ fontSize: 13, color: "#CCC" }}>{phase.title}</div>
                  <div style={{ fontSize: 10, color: "#444", marginLeft: "auto" }}>
                    Weeks {phase.weeks[0]}–{phase.weeks[1]} · {phase.completion}
                  </div>
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  {phase.tasks.map((task, i) => (
                    <div key={task.id} style={{
                      padding: "14px 16px",
                      background: "#0D0D1A",
                      border: "1px solid #1A1A2E",
                      borderLeft: `3px solid ${phase.color}`,
                      borderRadius: 3,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 10, color: "#444" }}>{task.id.toUpperCase()}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#DDD" }}>{task.title}</span>
                        </div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <span style={{
                            fontSize: 9,
                            padding: "2px 8px",
                            background: `${DIFFICULTY_COLORS[task.difficulty]}22`,
                            color: DIFFICULTY_COLORS[task.difficulty],
                            border: `1px solid ${DIFFICULTY_COLORS[task.difficulty]}33`,
                            borderRadius: 20,
                          }}>
                            {task.difficulty}
                          </span>
                          <span style={{ fontSize: 10, color: "#444" }}>Week {task.week}</span>
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: "#777", lineHeight: 1.7, marginBottom: 10 }}>
                        {task.description}
                      </div>
                      <div style={{
                        fontSize: 10,
                        color: "#AAA",
                        padding: "8px 12px",
                        background: "#070710",
                        borderRadius: 2,
                      }}>
                        <span style={{ color: "#555" }}>DELIVERABLE → </span>
                        {task.deliverable}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PIPELINE VIEW */}
        {view === "pipeline" && (
          <div>
            <div style={{ fontSize: 11, color: "#555", letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>
              Full Technical Pipeline — What You're Building
            </div>

            {/* Pipeline diagram */}
            <div style={{
              background: "#0D0D1A",
              border: "1px solid #1A1A2E",
              borderRadius: 6,
              padding: 24,
              marginBottom: 24,
              overflowX: "auto",
            }}>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 20, letterSpacing: 2 }}>CALL FLOW ARCHITECTURE</div>
              <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "nowrap", minWidth: 800 }}>
                {[
                  { label: "CRM", sub: "Lead Data", color: "#00E5FF", icon: "🗄️" },
                  { label: "→", sub: "", color: "#333", icon: "" },
                  { label: "Trigger", sub: "Webhook", color: "#00E5FF", icon: "⚡" },
                  { label: "→", sub: "", color: "#333", icon: "" },
                  { label: "Telnyx", sub: "SIP/PSTN", color: "#69FF47", icon: "📞" },
                  { label: "→", sub: "", color: "#333", icon: "" },
                  { label: "LiveKit", sub: "WebRTC Bridge", color: "#B388FF", icon: "🌐" },
                  { label: "→", sub: "", color: "#333", icon: "" },
                  { label: "VAD", sub: "Silero", color: "#FFD740", icon: "👂" },
                  { label: "→", sub: "", color: "#333", icon: "" },
                  { label: "STT", sub: "Whisper/Deepgram", color: "#FFD740", icon: "📝" },
                  { label: "→", sub: "", color: "#333", icon: "" },
                  { label: "LLM", sub: "Llama/GPT-4o", color: "#FF6D00", icon: "🧠" },
                  { label: "→", sub: "", color: "#333", icon: "" },
                  { label: "TTS", sub: "Piper/ElevenLabs", color: "#F48FB1", icon: "🔊" },
                  { label: "→", sub: "", color: "#333", icon: "" },
                  { label: "Phone", sub: "Owner hears AI", color: "#69FF47", icon: "📱" },
                ].map((node, i) => (
                  <div key={i} style={{ textAlign: "center", flexShrink: 0 }}>
                    {node.label === "→" ? (
                      <div style={{ fontSize: 20, color: "#333", padding: "0 4px", marginBottom: 20 }}>→</div>
                    ) : (
                      <div style={{
                        padding: "10px 12px",
                        background: `${node.color}11`,
                        border: `1px solid ${node.color}44`,
                        borderRadius: 4,
                        minWidth: 70,
                      }}>
                        <div style={{ fontSize: 16, marginBottom: 4 }}>{node.icon}</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: node.color }}>{node.label}</div>
                        <div style={{ fontSize: 9, color: "#555", marginTop: 2 }}>{node.sub}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Return flow */}
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #1A1A2E" }}>
                <div style={{ fontSize: 10, color: "#444", marginBottom: 12, letterSpacing: 2 }}>OUTCOME FLOW (after call ends)</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  {[
                    { text: "Call Ends", color: "#555" },
                    { text: "→", color: "#333" },
                    { text: "Transcript Logged", color: "#00E5FF" },
                    { text: "→", color: "#333" },
                    { text: "Outcome Classified", color: "#B388FF" },
                    { text: "→", color: "#333" },
                    { text: "CRM Updated", color: "#69FF47" },
                    { text: "→", color: "#333" },
                    { text: "IF BOOKED: Calendly + SMS", color: "#FFD740" },
                    { text: "→", color: "#333" },
                    { text: "IF NO ANSWER: Retry Scheduled", color: "#FF6D00" },
                  ].map((item, i) => (
                    <span key={i} style={{
                      fontSize: 11,
                      color: item.color,
                      fontWeight: item.color === "#333" ? 400 : 600,
                    }}>
                      {item.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* What you build vs what you use */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              <div style={{
                padding: 20,
                background: "#0D0D1A",
                border: "1px solid #69FF4733",
                borderRadius: 4,
              }}>
                <div style={{ fontSize: 11, color: "#69FF47", letterSpacing: 2, marginBottom: 14 }}>YOU BUILD THIS (Your code)</div>
                {[
                  "Conversation prompt & logic",
                  "Call state manager",
                  "CRM webhook handler",
                  "Orchestration layer",
                  "Retry & scheduling system",
                  "Outcome classifier",
                  "Booking flow coordinator",
                  "Logging & call records",
                  "Voicemail detection logic",
                  "Integration glue code",
                ].map((item) => (
                  <div key={item} style={{ fontSize: 11, color: "#888", padding: "4px 0", borderBottom: "1px solid #111", display: "flex", gap: 8 }}>
                    <span style={{ color: "#69FF47" }}>→</span> {item}
                  </div>
                ))}
              </div>
              <div style={{
                padding: 20,
                background: "#0D0D1A",
                border: "1px solid #FF6D0033",
                borderRadius: 4,
              }}>
                <div style={{ fontSize: 11, color: "#FF6D00", letterSpacing: 2, marginBottom: 14 }}>YOU USE THIS (APIs/Libs)</div>
                {[
                  "Pipecat — pipeline framework",
                  "LiveKit — WebRTC transport",
                  "Telnyx — SIP/telephony",
                  "Whisper / Deepgram — STT",
                  "Llama 3.1 / GPT-4o-mini — LLM",
                  "Piper / ElevenLabs — TTS",
                  "Silero VAD — voice detection",
                  "Calendly API — booking",
                  "Twilio — SMS reminders",
                  "APScheduler — retry logic",
                ].map((item) => (
                  <div key={item} style={{ fontSize: 11, color: "#888", padding: "4px 0", borderBottom: "1px solid #111", display: "flex", gap: 8 }}>
                    <span style={{ color: "#FF6D00" }}>↗</span> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Progress to production */}
            <div style={{
              padding: 20,
              background: "#0D0D1A",
              border: "1px solid #1A1A2E",
              borderRadius: 4,
            }}>
              <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, marginBottom: 16 }}>ROAD TO 100% PRODUCTION</div>
              {[
                { label: "Learning Phase (This Plan)", pct: 45, color: "#00E5FF", note: "12 weeks · $0 cost" },
                { label: "Error Handling & Reliability", pct: 8, color: "#B388FF", note: "2-3 weeks · Free APIs" },
                { label: "Concurrent Call Management", pct: 7, color: "#69FF47", note: "1-2 weeks" },
                { label: "Compliance Infrastructure", pct: 8, color: "#FFD740", note: "1-2 weeks · $200 legal" },
                { label: "Monitoring & Observability", pct: 4, color: "#FF6D00", note: "1 week" },
                { label: "Prompt Iteration (Real Calls)", pct: 13, color: "#F48FB1", note: "4-6 weeks · Real $ spent here" },
                { label: "Production Deployment", pct: 10, color: "#888", note: "2 weeks · $165-300/mo" },
                { label: "Buffer / Unknown Unknowns", pct: 5, color: "#333", note: "Always exists" },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#888" }}>{item.label}</span>
                    <div style={{ display: "flex", gap: 16 }}>
                      <span style={{ fontSize: 10, color: "#444" }}>{item.note}</span>
                      <span style={{ fontSize: 11, color: item.color, fontWeight: 700, minWidth: 30, textAlign: "right" }}>{item.pct}%</span>
                    </div>
                  </div>
                  <div style={{ height: 6, background: "#111", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${item.pct}%`,
                      background: item.color,
                      borderRadius: 3,
                      opacity: item.label.includes("Buffer") ? 0.3 : 0.8,
                    }} />
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #1A1A2E", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: "#555" }}>Total to 100% production after this plan</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#00E5FF" }}>~20-24 more weeks</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: 32,
          paddingTop: 20,
          borderTop: "1px solid #1A1A2E",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <div style={{ fontSize: 10, color: "#333", letterSpacing: 1 }}>
            PHASE 1–6 · ZERO COST · CALLING OWN PHONE · FULL EDGE CASE TESTING
          </div>
          <div style={{ fontSize: 10, color: "#333" }}>
            After week 12: spend first real money → test on 20 real calls/day → scale from there
          </div>
        </div>
      </div>
    </div>
  );
}
