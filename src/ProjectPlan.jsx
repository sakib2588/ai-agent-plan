import { useState, useEffect } from "react";
import { VapiGuideContent } from './vapi_plan';

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

const TABS = ["Overview", "Learning Path", "Build Plan", "Lead Sourcing", "Business Model", "Costs & ROI", "Feasibility", "Execution Guide"];

const LEARNING = [
  {
    step: 1, title: "Vapi Quickstart Docs", time: "2–3 hrs", diff: "Easy",
    color: C.cyan, icon: "📖",
    url: "https://docs.vapi.ai/assistants/quickstart",
    what: ["Create a voice assistant from scratch", "Attach a real phone number to it", "Make your first inbound and outbound calls"],
    why: "This is step zero. You cannot build anything without understanding how Vapi's core objects work. Do this before touching any code.",
    deliverable: "Working Vapi assistant that answers a call and has a basic conversation",
  },
  {
    step: 2, title: "15-Minute Voice Agent Tutorial", time: "15 min + 1 hr practice", diff: "Easy",
    color: C.green, icon: "⚡",
    url: null,
    what: ["Create first AI voice agent end-to-end", "Write and attach a system prompt", "Test real phone calls immediately"],
    why: "Fastest way to get something working and calling. Builds confidence before tackling the full course.",
    deliverable: "First complete agent calling your phone with a real conversation prompt",
  },
  {
    step: 3, title: "Full Vapi + n8n Beginner Course", time: "8–12 hrs", diff: "Medium",
    color: C.purple, icon: "🎓",
    url: null,
    what: ["Full voice AI architecture from first principles", "Connecting AI to n8n automation workflows", "Building production-scale calling campaigns"],
    why: "This is where the business side becomes possible. n8n is how you scale from 1 call to 10,000 calls without manual work.",
    deliverable: "Automated campaign that pulls leads, calls them, and logs outcomes without touching it",
  },
  {
    step: 4, title: "Real Estate Lead-Qualifier Tutorial", time: "3–4 hrs", diff: "Medium",
    color: C.amber, icon: "🏠",
    url: null,
    what: ["AI cold-calling system for real estate specifically", "Automatically qualify motivated sellers", "Save qualified leads directly to CRM"],
    why: "This is your exact use case. Study the script structure, the objection handling, and how they define a 'qualified lead' — this becomes your product.",
    deliverable: "Real estate specific agent script that qualifies sellers and routes interested leads",
  },
  {
    step: 5, title: "Twilio Phone Integration", time: "2–3 hrs", diff: "Medium",
    color: C.orange, icon: "📞",
    url: null,
    what: ["Buy and configure a real phone number", "Route all calls through your Vapi agent", "Connect Twilio phone infrastructure to Vapi"],
    why: "Vapi uses Twilio under the hood anyway. Understanding this layer helps you debug call quality issues and manage phone numbers at scale for multiple clients.",
    deliverable: "Dedicated phone number per client routing all calls through your agent system",
  },
  {
    step: 6, title: "Advanced n8n Automation", time: "4–6 hrs", diff: "Medium",
    color: C.pink, icon: "⚙️",
    url: null,
    what: ["Complex workflow automation across 100+ apps", "Push lead data automatically into any CRM", "Schedule appointments and send confirmations"],
    why: "This is what makes you scalable. One n8n workflow handles CRM updates, email notifications, Slack alerts, calendar bookings — fully hands-free after setup.",
    deliverable: "Full n8n workflow: call ends → CRM updated → agent notified → calendar booked → SMS sent",
  },
];

const BUILD_PHASES = [
  {
    id: 1, label: "W1", title: "Learn & First Agent", weeks: [1, 1], color: C.cyan, pct: 0,
    tasks: [
      { id: "1A", title: "Complete Vapi Quickstart Docs", diff: "Easy", time: "2–3 hrs", deliverable: "Vapi account + first assistant created + test call made to your phone" },
      { id: "1B", title: "15-Min Tutorial — First Working Agent", diff: "Easy", time: "15 min + practice", deliverable: "Agent answers your phone with a real conversation" },
      { id: "1C", title: "Write First Real Estate Script v1", diff: "Medium", time: "3–4 hrs", deliverable: "Script covering: intro, qualify, 5 objections, book appointment, end call" },
    ]
  },
  {
    id: 2, label: "W2", title: "Full Course + Automation Foundation", weeks: [2, 2], color: C.purple, pct: 15,
    tasks: [
      { id: "2A", title: "Full Vapi + n8n Course", diff: "Medium", time: "8–12 hrs", deliverable: "Understand full architecture: Vapi → webhook → n8n → CRM" },
      { id: "2B", title: "Install n8n locally (free)", diff: "Easy", time: "1 hr", deliverable: "n8n running on your machine, basic workflow created" },
      { id: "2C", title: "Connect Vapi webhook to n8n", diff: "Medium", time: "2–3 hrs", deliverable: "Call ends → n8n receives outcome data automatically" },
    ]
  },
  {
    id: 3, label: "W3", title: "Real Estate Script + Twilio", weeks: [3, 3], color: C.green, pct: 25,
    tasks: [
      { id: "3A", title: "Real Estate Lead-Qualifier Tutorial", diff: "Medium", time: "3–4 hrs", deliverable: "Agent correctly qualifies a motivated seller and routes to booking" },
      { id: "3B", title: "Twilio Phone Integration", diff: "Medium", time: "2–3 hrs", deliverable: "Dedicated number bought, connected to Vapi, real outbound calls working" },
      { id: "3C", title: "Test 50 self-calls with your script", diff: "Medium", time: "2–3 days", deliverable: "Script handles 15+ edge cases without breaking" },
      { id: "3D", title: "Calendly booking integration", diff: "Easy", time: "1–2 hrs", deliverable: "When owner says yes → agent books time slot automatically" },
      { id: "3E", title: "Free Lead Scraping Pipeline", diff: "Medium", time: "4–6 hrs", deliverable: "200 scraped FSBO leads in a CSV file — Python + BeautifulSoup/Selenium scraper targeting Zillow FSBO listings for your zip codes. Free test pipeline before paying for PropStream.", isNew: true },
      { id: "3F", title: "Skip Trace Integration", diff: "Medium", time: "3–4 hrs", deliverable: "BatchSkipTracing API connected to n8n workflow. Input: name + address → Output: phone number appended automatically. Pipeline becomes: scrape → skip trace → call. Zero manual steps. 60–70% phone hit rate.", isNew: true },
    ]
  },
  {
    id: 4, label: "W4", title: "Full Automation Pipeline", weeks: [4, 4], color: C.amber, pct: 35,
    tasks: [
      { id: "4A", title: "Advanced n8n Automation Course", diff: "Medium", time: "4–6 hrs", deliverable: "Comfortable building multi-step n8n workflows" },
      { id: "4B", title: "Build CRM lead logging workflow", diff: "Medium", time: "3–4 hrs", deliverable: "Every call auto-logged to Google Sheets or GoHighLevel with outcome + transcript" },
      { id: "4C", title: "Build SMS reminder workflow", diff: "Easy", time: "1–2 hrs", deliverable: "Appointment reminder fires automatically 24hrs before via Twilio SMS" },
      { id: "4D", title: "Lead notification to agent (email/Slack)", diff: "Easy", time: "1 hr", deliverable: "Agent gets instant notification when a qualified lead is found" },
      { id: "4E", title: "DNC Scrubbing Automation", diff: "Hard", time: "3–5 hrs", deliverable: "Zero calls made to DNC-registered numbers. n8n automatically checks each number against National DNC Registry (via DNC.com or Telnyx API) before every call batch. Flagged numbers removed before dialing. Legal protection — not optional.", isNew: true },
      { id: "4F", title: "Call Time Zone Logic", diff: "Medium", time: "2–3 hrs", deliverable: "No calls placed outside 8am–9pm local time. EVER. Function checks area code → maps to time zone → gates calls accordingly. Calling outside legal hours = TCPA violation.", isNew: true },
    ]
  },
  {
    id: 5, label: "W5–6", title: "Lead Source + Full Test", weeks: [5, 6], color: C.orange, pct: 50,
    tasks: [
      { id: "5A", title: "Set up PropStream or BatchLeads trial", diff: "Easy", time: "1–2 hrs", deliverable: "500 FSBO/expired listing leads ready to call in your system" },
      { id: "5B", title: "Set up GoHighLevel free trial", diff: "Easy", time: "2–3 hrs", deliverable: "CRM pipeline configured with stages: New → Called → Interested → Booked → Closed" },
      { id: "5C", title: "Run first 100-call campaign", diff: "Medium", time: "1–2 days setup", deliverable: "100 calls made, outcomes logged, at least 1–3 real appointments booked" },
      { id: "5D", title: "Analyse results and refine script", diff: "Hard", time: "ongoing", deliverable: "Script v2 based on real call data — conversion rate improving" },
      { id: "5E", title: "Call Recording + Transcript Storage", diff: "Medium", time: "2–3 hrs", deliverable: "100% of calls have recording + transcript stored and searchable. Vapi records → n8n saves to Google Drive/S3 automatically. Review 10 worst-performing conversations weekly and update script based on exactly where it broke.", isNew: true },
      { id: "5F", title: "Conversion Rate Dashboard", diff: "Medium", time: "3–4 hrs", deliverable: "Live Google Sheet (auto-updated by n8n) showing: calls made, answered rate, qualified rate, booked rate, cost per lead. This is your client proof AND tells you exactly where funnel is leaking.", isNew: true },
      { id: "5G", title: "Voicemail Drop Campaign", diff: "Medium", time: "2–3 hrs", deliverable: "Automated voicemail drop on all no-answer attempts (after 2 tries). 15-second pre-recorded message: 'Hi [Name], I was hoping to catch you about your property at [Address]...' Generates 10–20% callback rate on top of live connects.", isNew: true },
    ]
  },
  {
    id: 6, label: "W7–8", title: "First Client + Service Launch", weeks: [7, 8], color: C.pink, pct: 70,
    tasks: [
      { id: "6A", title: "Build client-facing dashboard (basic)", diff: "Medium", time: "1 week", deliverable: "Client can see: calls made, leads found, appointments booked — live" },
      { id: "6B", title: "Create 1-page service offer", diff: "Easy", time: "1–2 hrs", deliverable: "Clear offer: X calls/month, Y qualified leads guaranteed, price" },
      { id: "6C", title: "Onboard first client (use your existing result as proof)", diff: "Hard", time: "ongoing", deliverable: "First paying client at $500–1,500/month minimum" },
      { id: "6D", title: "Document your SOP for client onboarding", diff: "Medium", time: "2–3 hrs", deliverable: "Written process to onboard any new agent in under 2 hours" },
      { id: "6E", title: "Lead Handoff Workflow", diff: "Hard", time: "4–6 hrs", deliverable: "Agent notified in under 60 seconds of every qualified lead. When lead marked 'interested': n8n texts agent with details, emails full summary with transcript link, creates CRM task with follow-up date, sends homeowner SMS confirming agent will call. All within 60 seconds of call ending.", isNew: true },
      { id: "6F", title: "Client Reporting Automation", diff: "Medium", time: "3–4 hrs", deliverable: "Automated weekly report email every Monday morning: calls made last week, leads generated, appointments booked, pipeline value estimate. Keeps clients from cancelling — they see the machine working even when nothing booked yet.", isNew: true },
    ]
  },
];

const FREE_LEAD_SOURCES = [
  {
    name: "Zillow FSBO Listings", icon: "🏠", color: C.cyan,
    how: "Go to Zillow → filter 'For Sale By Owner' in your target city. Copy names, addresses, and listing phone numbers manually.",
    volume: "50–100 leads/hour", cost: "$0",
    tip: "Best starting point. Highest intent — these people already want to sell."
  },
  {
    name: "Facebook Marketplace", icon: "📱", color: C.purple,
    how: "Search 'house for sale' in your city on Facebook Marketplace. FSBO owners post here constantly with personal phone numbers visible.",
    volume: "30–60 leads/hour", cost: "$0",
    tip: "Personal phone numbers are often listed directly. Great for skip-trace-free leads."
  },
  {
    name: "Craigslist Housing", icon: "📋", color: C.green,
    how: "craigslist.org → Housing → For Sale By Owner. Old school but still active in most US cities. Phone numbers posted publicly.",
    volume: "20–40 leads/hour", cost: "$0",
    tip: "Less competition than Zillow. Older demographic = more motivated sellers."
  },
  {
    name: "County Tax Records", icon: "🏛️", color: C.amber,
    how: "Every US county publishes property owner names and mailing addresses online for free. Google '[your county] property search' or '[your county] tax assessor lookup'.",
    volume: "100+ leads/session", cost: "$0",
    tip: "Export absentee owner records — owners who don't live at the property are more likely to sell."
  },
  {
    name: "Expired MLS Listings", icon: "⏰", color: C.orange,
    how: "Ask any licensed real estate agent friend to pull expired listings from MLS. They have free access. You get names and addresses, then skip-trace for phone numbers.",
    volume: "50–200 leads/pull", cost: "$0 (semi-free)",
    tip: "Highest motivation tier — these people WANTED to sell and failed. Extremely receptive to outreach."
  },
];

const PAID_TOOLS = [
  { tool: "PropStream", cost: "$1 trial (7 days)", what: "Full lists: FSBO, expired, pre-foreclosure, absentee owners. Skip tracing built-in.", color: C.cyan, rating: 5 },
  { tool: "BatchLeads", cost: "Free trial", what: "Similar to PropStream with an easier UI. Good for beginners. Pull lists fast.", color: C.green, rating: 4 },
  { tool: "REDX", cost: "$39–99/mo", what: "Pre-built FSBO + expired caller lists with phone numbers already attached. Plug and play.", color: C.amber, rating: 4 },
  { tool: "Vulcan7", cost: "$299/mo", what: "Best quality expired listings with direct phone numbers. Premium but highest accuracy.", color: C.purple, rating: 5 },
];

const SKIP_TRACE_TOOLS = [
  { tool: "BatchSkipTracing", cost: "$0.15–0.18/record", accuracy: 85, color: C.green },
  { tool: "PropStream (built-in)", cost: "Included in sub", accuracy: 80, color: C.cyan },
  { tool: "Skipforce", cost: "$0.12/record", accuracy: 78, color: C.amber },
  { tool: "Whitepages Pro", cost: "$0.10/record", accuracy: 70, color: C.purple },
];

const DIFF = { Easy: C.green, Medium: C.amber, Hard: C.red };

const STACK = [
  { tool: "Vapi", role: "Voice AI engine", cost: "~$0.05–0.12/min", why: "Handles STT, LLM, TTS, telephony in one platform. Already production-ready.", color: C.cyan },
  { tool: "Twilio", role: "Phone numbers & calls", cost: "~$0.013/min + $1/num", why: "Buy numbers, route calls. Vapi uses Twilio under the hood — direct gives you more control.", color: C.green },
  { tool: "OpenAI GPT-4o-mini", role: "AI conversation brain", cost: "~$0.15/1M tokens", why: "Powers the actual conversation. Vapi plugs straight in — no integration work.", color: C.purple },
  { tool: "n8n (self-hosted)", role: "Workflow automation", cost: "$0 self-hosted", why: "Connects Vapi webhooks to any CRM, email, Slack, calendar. Free if you host yourself.", color: C.amber },
  { tool: "GoHighLevel", role: "CRM + client portal", cost: "$97/month", why: "Industry standard for agencies. White-label it — clients see your brand, not GHL.", color: C.orange },
  { tool: "PropStream / BatchLeads", role: "Lead data", cost: "$100–150/month", why: "FSBO, expired listings, probate, absentee owners — the people most likely to sell.", color: C.pink },
];

const PRICING_TIERS = [
  { plan: "Starter", calls: "3,000", leads: "5–10", price: "$1,500", margin: "$900–1,100", color: C.cyan },
  { plan: "Growth", calls: "10,000", leads: "15–30", price: "$3,500", margin: "$2,500–2,900", color: C.green },
  { plan: "Investor", calls: "30,000", leads: "40–80", price: "$7,000", margin: "$5,500–6,200", color: C.amber },
];

const LEAD_SOURCES = [
  { source: "FSBO Listings", heat: 9, why: "Already decided to sell, just haven't listed with agent yet", tool: "Zillow, PropStream" },
  { source: "Expired MLS Listings", heat: 10, why: "Wanted to sell but failed — highly motivated, frustrated, receptive", tool: "PropStream, BatchLeads" },
  { source: "Probate Lists", heat: 8, why: "Estate sales — heirs often want fast sale, emotional situation", tool: "County records, BatchLeads" },
  { source: "Pre-Foreclosures", heat: 9, why: "Under financial pressure — urgency to sell before bank takes", tool: "PropStream, ATTOM" },
  { source: "Tax Delinquent", heat: 7, why: "Can't pay taxes = cash-strapped, may consider selling", tool: "County tax records" },
  { source: "Absentee Owners", heat: 7, why: "Don't live in property — less attachment, easier to sell", tool: "BatchLeads, PropStream" },
];

const SCRIPT = [
  { role: "AI", line: "Hi, is this [Owner Name]? This is Sarah calling about your property at [Address]." },
  { role: "Owner", line: "Yes, who's this?" },
  { role: "AI", line: "I help connect homeowners in the area with buyers. I noticed your property and wanted to see — if the price made sense, would you ever consider selling?" },
  { role: "Owner", line: "Maybe, depends on the offer." },
  { role: "AI", line: "Completely understand. What would need to happen for it to make sense for you? Are you thinking sometime this year or more long-term?" },
  { role: "Owner", line: "Probably within the next few months if the price is right." },
  { role: "AI", line: "Perfect — that's actually exactly the kind of timing that works well. I'd love to connect you with our agent who can put together a real number for your home. Would Tuesday or Thursday work better for a quick 10-minute call?" },
];

const REVENUE_SCENARIOS = [
  { clients: 2, avg: 2000, rev: 4000, cost: 800, profit: 3200, label: "Starting Out" },
  { clients: 4, avg: 2500, rev: 10000, cost: 1500, profit: 8500, label: "Gaining Traction" },
  { clients: 6, avg: 3000, rev: 18000, cost: 2500, profit: 15500, label: "Scaled" },
  { clients: 8, avg: 3500, rev: 28000, cost: 4000, profit: 24000, label: "Full Agency" },
];

function AnimatedBar({ pct, color, height = 8 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 400); return () => clearTimeout(t); }, [pct]);
  return (
    <div style={{ height, background: C.border, borderRadius: 99, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${w}%`, borderRadius: 99, background: `linear-gradient(90deg, ${color}88, ${color})`, transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 8px ${color}50` }} />
    </div>
  );
}

function SectionHeader({ color, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
      <div style={{ width: 4, height: 22, background: color, borderRadius: 2, boxShadow: `0 0 8px ${color}80` }} />
      <div style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: 2.5, textTransform: "uppercase" }}>{children}</div>
    </div>
  );
}

function Card({ children, color, style = {} }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${color ? color + "25" : C.border}`, borderRadius: 12, padding: 24, ...style }}>
      {children}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("Overview");
  const [openLearn, setOpenLearn] = useState(null);
  const [openTask, setOpenTask] = useState(null);
  const [openPhase, setOpenPhase] = useState(null);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", color: C.text, fontSize: 13 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.borderHigh}; border-radius: 99px; }
        .hov:hover { background: ${C.surfaceHover} !important; }
        .tab-btn { transition: all 0.18s ease !important; }
        .tab-btn:hover { background: ${C.surfaceHigh} !important; color: ${C.text} !important; }
        .card-hover:hover { border-color: ${C.borderHigh} !important; transform: translateY(-1px); transition: all 0.18s; }
        .tag { font-size: 10px; font-weight: 600; padding: 2px 9px; border-radius: 99px; }
        @keyframes glow { 0%,100%{opacity:1}50%{opacity:0.75} }
      `}</style>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(180deg,#090B1E 0%,${C.surface} 100%)`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1380, margin: "0 auto", padding: "28px 32px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, boxShadow: `0 0 10px ${C.green}` }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: C.textMid, letterSpacing: 3, textTransform: "uppercase" }}>
                  AI Calling Service · Real Estate Lead Generation · Vapi Stack
                </span>
              </div>
              <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, color: C.white, letterSpacing: -1.5, lineHeight: 1.05, marginBottom: 8 }}>
                REVISED PLAN —{" "}
                <span style={{ color: C.amber, textShadow: `0 0 28px ${C.amber}70` }}>BUILD WITH VAPI</span>
                <span style={{ color: C.textMid }}>, SELL TO AGENTS</span>
              </h1>
              <p style={{ fontSize: 13, color: C.textMid, fontWeight: 400 }}>
                8-Week Build · Vapi + n8n + Twilio · $5K–$20K/month Revenue Potential · No Custom Voice Engine
              </p>
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
                padding: "11px 20px", fontSize: 12, fontWeight: 600,
                fontFamily: "'Inter',sans-serif", background: tab === t ? C.surfaceHigh : "transparent",
                border: "none", borderBottom: `2px solid ${tab === t ? C.amber : "transparent"}`,
                color: tab === t ? C.amber : C.textMid, cursor: "pointer",
                letterSpacing: 0.3, borderRadius: "6px 6px 0 0", textAlign: "center",
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "28px 32px" }}>

        {/* ══════════════════ OVERVIEW ══════════════════ */}
        {tab === "Overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Old vs New */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Card color={C.red}>
                <SectionHeader color={C.red}>Old Plan — Scrapped</SectionHeader>
                {[
                  ["Build custom voice engine", "4–6 months dev time"],
                  ["Custom STT/LLM/TTS pipeline", "Latency problems you own"],
                  ["Use only for your own listings", "Single revenue stream"],
                  ["$0 platform cost but massive time cost", "Real opportunity cost"],
                  ["Solo real estate agent use case", "Low revenue ceiling"],
                  ["No product to sell", "No business scalability"],
                ].map(([a, b], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "8px 0", borderBottom: `1px solid ${C.border}30`, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, color: C.textMid }}>✗ {a}</span>
                    <span style={{ fontSize: 11, color: C.red }}>{b}</span>
                  </div>
                ))}
              </Card>

              <Card color={C.green}>
                <SectionHeader color={C.green}>New Plan — Vapi + Agency Model</SectionHeader>
                {[
                  ["Use Vapi (production-ready)", "First call in 1 day"],
                  ["Vapi handles all audio infra", "Sub-second latency solved"],
                  ["Sell service to multiple agents", "Recurring B2B revenue"],
                  ["$300–500/month operating cost", "Low overhead, high margin"],
                  ["B2B SaaS-style service", "Unlimited scaling"],
                  ["AI calling product you own", "Sell to any niche"],
                ].map(([a, b], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "8px 0", borderBottom: `1px solid ${C.border}30`, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, color: C.textMid }}>✓ {a}</span>
                    <span style={{ fontSize: 11, color: C.green }}>{b}</span>
                  </div>
                ))}
              </Card>
            </div>

            {/* The Business Model Visual */}
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

            {/* Timeline comparison */}
            <Card>
              <SectionHeader color={C.amber}>Timeline Comparison — Build From Scratch vs Vapi</SectionHeader>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.red, marginBottom: 12 }}>Build From Scratch</div>
                  {[
                    { task: "Basic demo working", time: "2–3 weeks" },
                    { task: "Phone calls functional", time: "4–6 weeks" },
                    { task: "Sub-second latency", time: "6–10 weeks" },
                    { task: "Interruption handling", time: "8–14 weeks" },
                    { task: "Production stable", time: "4–6 months" },
                    { task: "First real call to homeowner", time: "Month 3–4" },
                    { task: "First revenue", time: "Month 5–6 earliest" },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.border}25`, fontSize: 12 }}>
                      <span style={{ color: C.textMid }}>{r.task}</span>
                      <span style={{ color: C.red, fontWeight: 600 }}>{r.time}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.green, marginBottom: 12 }}>Using Vapi</div>
                  {[
                    { task: "Basic demo working", time: "Day 1" },
                    { task: "Phone calls functional", time: "Day 2–3" },
                    { task: "Sub-second latency", time: "Already solved" },
                    { task: "Interruption handling", time: "Already solved" },
                    { task: "Production stable", time: "Week 3–4" },
                    { task: "First real call to homeowner", time: "Week 3" },
                    { task: "First revenue", time: "Week 7–8" },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.border}25`, fontSize: 12 }}>
                      <span style={{ color: C.textMid }}>{r.task}</span>
                      <span style={{ color: C.green, fontWeight: 600 }}>{r.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Tech stack */}
            <Card>
              <SectionHeader color={C.purple}>The Stack — What You Use and Why</SectionHeader>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 10 }}>
                {STACK.map(s => (
                  <div key={s.tool} className="card-hover" style={{ padding: "14px 16px", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderLeft: `3px solid ${s.color}`, borderRadius: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.tool}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, color: C.amber }}>{s.cost}</span>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 6 }}>{s.role}</div>
                    <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6 }}>{s.why}</div>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        )}

        {/* ══════════════════ LEARNING PATH ══════════════════ */}
        {tab === "Learning Path" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ padding: "14px 18px", background: `${C.cyan}0A`, border: `1px solid ${C.cyan}25`, borderRadius: 10, fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>
              <span style={{ color: C.cyan, fontWeight: 700 }}>Total learning time: ~20–28 hours. </span>
              Do these in order — each one builds directly on the previous. By step 4 you'll have a working real estate agent. Steps 5–6 make it a scalable business.
            </div>

            {LEARNING.map((item, i) => {
              const isOpen = openLearn === i;
              return (
                <div key={i} className="hov" onClick={() => setOpenLearn(isOpen ? null : i)} style={{
                  background: isOpen ? C.surface : C.surfaceHigh,
                  border: `1px solid ${isOpen ? item.color + "40" : C.border}`,
                  borderLeft: `3px solid ${item.color}`,
                  borderRadius: 10, overflow: "hidden", cursor: "pointer",
                  transition: "all 0.18s",
                  boxShadow: isOpen ? `0 4px 24px ${C.bg}80` : "none",
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

            {/* After completing */}
            <Card color={C.green} style={{ marginTop: 8 }}>
              <SectionHeader color={C.green}>After Completing All 6 Steps — What You Can Build</SectionHeader>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { title: "AI Real Estate Cold-Caller", desc: "Automated outbound system that calls FSBOs, expired listings, and absentee owners — qualifies and books appointments", color: C.green },
                  { title: "AI Appointment-Setter Agent", desc: "Agent focused solely on moving warm leads to booked calls — follows up, handles objections, schedules", color: C.cyan },
                  { title: "AI Lead-Generation Service", desc: "Sellable service you offer to real estate agents and investors. They pay monthly, you run the system", color: C.amber },
                ].map(item => (
                  <div key={item.title} style={{ padding: 16, background: C.surfaceHigh, border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 8 }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: C.textMid, lineHeight: 1.7 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ══════════════════ BUILD PLAN ══════════════════ */}
        {tab === "Build Plan" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ padding: "14px 18px", background: `${C.purple}0A`, border: `1px solid ${C.purple}25`, borderRadius: 10, fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>
              <span style={{ color: C.purple, fontWeight: 700 }}>8-week build. </span>
              Weeks 1–4 are the technical foundation using Vapi. Weeks 5–6 are lead sourcing and real campaign testing. Weeks 7–8 are getting the first paying client. Click phases to expand tasks.
            </div>

            {/* 8-week gantt */}
            <Card>
              <SectionHeader color={C.cyan}>8-Week Timeline Overview</SectionHeader>
              <div style={{ display: "grid", gridTemplateColumns: "200px repeat(8, 1fr)", gap: 0, marginBottom: 6 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, padding: "0 12px", letterSpacing: 1.5 }}>PHASE</div>
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} style={{ fontSize: 10, fontWeight: 700, color: C.textDim, textAlign: "center", letterSpacing: 1 }}>W{i + 1}</div>
                ))}
              </div>
              {BUILD_PHASES.map(phase => {
                const [ws, we] = phase.weeks;
                return (
                  <div key={phase.id} style={{ display: "grid", gridTemplateColumns: "200px repeat(8, 1fr)", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: phase.color, letterSpacing: 1.5 }}>{phase.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 500, color: C.textMid }}>{phase.title}</span>
                    </div>
                    {Array.from({ length: 8 }, (_, i) => {
                      const w = i + 1, inP = w >= ws && w <= we;
                      return (
                        <div key={i} style={{ height: 32, display: "flex", alignItems: "center", padding: "0 2px", borderLeft: `1px solid ${C.border}25` }}>
                          {inP && (
                            <div style={{ height: 22, width: "100%", background: `linear-gradient(90deg,${phase.color}55,${phase.color}CC)`, borderRadius: w === ws ? "6px 0 0 6px" : w === we ? "0 6px 6px 0" : 0, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 8px ${phase.color}20` }}>
                              {w === ws && <span style={{ fontSize: 9, fontWeight: 800, color: "#000", paddingLeft: 6 }}>{phase.pct}%</span>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </Card>

            {/* Phase task cards */}
            {BUILD_PHASES.map(phase => (
              <div key={phase.id}>
                <div className="hov" onClick={() => setOpenPhase(openPhase === phase.id ? null : phase.id)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 18px", background: C.surfaceHigh,
                  border: `1px solid ${openPhase === phase.id ? phase.color + "40" : C.border}`,
                  borderLeft: `4px solid ${phase.color}`, borderRadius: 10,
                  cursor: "pointer", marginBottom: openPhase === phase.id ? 8 : 0, transition: "all 0.18s",
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

        {/* ══════════════════ LEAD SOURCING ══════════════════ */}
        {tab === "Lead Sourcing" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Hero banner */}
            <div style={{ padding: "20px 24px", background: `linear-gradient(135deg, ${C.cyan}12, ${C.purple}0A)`, border: `1px solid ${C.cyan}30`, borderRadius: 14, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, background: `radial-gradient(circle, ${C.cyan}15, transparent)`, borderRadius: "50%" }} />
              <div style={{ fontSize: 10, fontWeight: 800, color: C.cyan, letterSpacing: 3, marginBottom: 8 }}>⚡ LEAD SOURCING PLAYBOOK</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.white, marginBottom: 8, lineHeight: 1.4 }}>
                Where to Get Leads for Full Testing — <span style={{ color: C.amber }}>200+ Free Leads in One Afternoon</span>
              </div>
              <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>
                Start with the free sources below. That's 200+ leads without spending a dime. Once validated, graduate to paid tools for scale.
                The pipeline: <span style={{ color: C.cyan, fontWeight: 600 }}>Source leads</span> → <span style={{ color: C.green, fontWeight: 600 }}>Skip trace for numbers</span> → <span style={{ color: C.amber, fontWeight: 600 }}>Feed into your AI caller</span>.
              </div>
            </div>

            {/* Free sources */}
            <Card>
              <SectionHeader color={C.green}>Free Lead Sources — Start Here (Zero Cost)</SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {FREE_LEAD_SOURCES.map((src, i) => (
                  <div key={i} className="card-hover" style={{
                    padding: "18px 20px", background: C.surfaceHigh,
                    border: `1px solid ${src.color}20`, borderLeft: `4px solid ${src.color}`,
                    borderRadius: 10, transition: "all 0.15s",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${src.color}15`, border: `1px solid ${src.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                          {src.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: C.white }}>{src.name}</div>
                          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                            <span className="tag" style={{ background: `${C.green}18`, color: C.green, border: `1px solid ${C.green}30` }}>{src.cost}</span>
                            <span className="tag" style={{ background: `${C.cyan}18`, color: C.cyan, border: `1px solid ${C.cyan}30` }}>{src.volume}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.7, marginBottom: 10 }}>{src.how}</div>
                    <div style={{ padding: "8px 12px", background: `${src.color}08`, border: `1px solid ${src.color}18`, borderRadius: 6, fontSize: 11, color: src.color }}>
                      <span style={{ fontWeight: 700 }}>💡 Pro Tip: </span>{src.tip}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick math */}
              <div style={{ marginTop: 16, padding: "16px 20px", background: `linear-gradient(135deg, ${C.green}0C, ${C.amber}08)`, border: `1px solid ${C.green}30`, borderRadius: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 28 }}>📊</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.green }}>Quick Math: Free Sources Combined</div>
                    <div style={{ fontSize: 12, color: C.textMid, marginTop: 4 }}>
                      Zillow (100) + Facebook Marketplace (60) + Craigslist (40) = <span style={{ color: C.amber, fontWeight: 800, fontSize: 14 }}>200+ free leads</span> in one afternoon.
                      That's enough to validate your entire pipeline without spending a dollar.
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Paid tools */}
            <Card>
              <SectionHeader color={C.amber}>Paid Tools — Cheap for Testing, Powerful for Scale</SectionHeader>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
                {PAID_TOOLS.map((tool, i) => (
                  <div key={i} className="card-hover" style={{
                    padding: "18px 20px", background: C.surfaceHigh,
                    border: `1px solid ${tool.color}25`, borderRadius: 10,
                    position: "relative", overflow: "hidden", transition: "all 0.15s",
                  }}>
                    <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, background: `radial-gradient(circle at top right, ${tool.color}12, transparent)` }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: tool.color }}>{tool.tool}</div>
                      <div style={{ padding: "4px 10px", background: `${C.amber}15`, border: `1px solid ${C.amber}30`, borderRadius: 99, fontSize: 11, fontWeight: 700, color: C.amber }}>{tool.cost}</div>
                    </div>
                    <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.7, marginBottom: 12 }}>{tool.what}</div>
                    <div style={{ display: "flex", gap: 3 }}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} style={{ width: 20, height: 4, borderRadius: 2, background: j < tool.rating ? tool.color : C.border }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, padding: "12px 16px", background: `${C.amber}0A`, border: `1px solid ${C.amber}25`, borderRadius: 8, fontSize: 12, color: C.textMid }}>
                <span style={{ color: C.amber, fontWeight: 700 }}>Recommendation for testing: </span>
                Start with <span style={{ color: C.cyan, fontWeight: 600 }}>PropStream's $1 trial</span> to validate paid sources work, then decide if you need ongoing access. Most of what you need for first 100 calls is free.
              </div>
            </Card>

            {/* Skip Tracing */}
            <Card>
              <SectionHeader color={C.purple}>Skip Tracing — Getting Phone Numbers from Addresses</SectionHeader>
              <div style={{ padding: "12px 16px", background: `${C.purple}0A`, border: `1px solid ${C.purple}25`, borderRadius: 8, marginBottom: 16, fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>
                Once you have names and addresses from county records or MLS, you need <span style={{ color: C.purple, fontWeight: 600 }}>phone numbers</span>.
                Skip tracing services match property records to phone databases. Budget $0.10–0.18 per record. At 200 leads, that's <span style={{ color: C.amber, fontWeight: 700 }}>$20–36 total</span>.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                {SKIP_TRACE_TOOLS.map((tool, i) => (
                  <div key={i} style={{ padding: "16px 18px", background: C.surfaceHigh, border: `1px solid ${tool.color}25`, borderRadius: 10 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: tool.color, marginBottom: 6 }}>{tool.tool}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.amber }}>{tool.cost}</span>
                    </div>
                    <div style={{ marginBottom: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontWeight: 700, color: C.textDim, marginBottom: 4 }}>
                        <span>ACCURACY</span>
                        <span style={{ color: tool.color }}>{tool.accuracy}%</span>
                      </div>
                      <AnimatedBar pct={tool.accuracy} color={tool.color} height={6} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Pipeline visual */}
            <Card>
              <SectionHeader color={C.cyan}>The Complete Lead Pipeline — From Source to Call</SectionHeader>
              <div style={{ overflowX: "auto" }}>
                <div style={{ display: "flex", alignItems: "stretch", gap: 0, minWidth: 900, marginBottom: 16 }}>
                  {[
                    { step: "1", label: "Source Leads", sub: "Zillow / FB / County", icon: "📋", color: C.cyan, detail: "Scrape FSBO listings or pull county records" },
                    null,
                    { step: "2", label: "Clean & Dedupe", sub: "Remove duplicates", icon: "🧹", color: C.green, detail: "Standardize addresses, remove dupes" },
                    null,
                    { step: "3", label: "Skip Trace", sub: "Get phone numbers", icon: "🔍", color: C.purple, detail: "BatchSkipTracing API via n8n" },
                    null,
                    { step: "4", label: "DNC Scrub", sub: "Legal compliance", icon: "🛡️", color: C.red, detail: "Remove DNC-registered numbers" },
                    null,
                    { step: "5", label: "Time Zone Gate", sub: "8am–9pm local", icon: "🕐", color: C.amber, detail: "Only call in legal hours" },
                    null,
                    { step: "6", label: "Vapi Calls", sub: "AI cold-calls", icon: "📞", color: C.green, detail: "Automated outbound dialing" },
                    null,
                    { step: "7", label: "Qualify & Route", sub: "CRM + Agent", icon: "💰", color: C.amber, detail: "Hot leads → agent in <60 seconds" },
                  ].map((node, i) => node === null ? (
                    <div key={i} style={{ display: "flex", alignItems: "center", padding: "0 2px", flexShrink: 0 }}>
                      <div style={{ width: 24, height: 2, background: `linear-gradient(90deg, ${C.border}, ${C.borderHigh})` }} />
                      <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: `6px solid ${C.borderHigh}` }} />
                    </div>
                  ) : (
                    <div key={i} style={{
                      padding: "14px 12px", textAlign: "center", flexShrink: 0,
                      background: `${node.color}0A`, border: `1px solid ${node.color}25`,
                      borderRadius: 10, minWidth: 95, position: "relative",
                    }}>
                      <div style={{ position: "absolute", top: 6, left: 8, fontSize: 8, fontWeight: 800, color: node.color, background: `${node.color}20`, padding: "1px 5px", borderRadius: 4, letterSpacing: 1 }}>
                        STEP {node.step}
                      </div>
                      <div style={{ fontSize: 22, marginBottom: 4, marginTop: 8 }}>{node.icon}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: node.color, marginBottom: 2 }}>{node.label}</div>
                      <div style={{ fontSize: 9, color: C.textDim }}>{node.sub}</div>
                      <div style={{ fontSize: 9, color: C.textMid, marginTop: 4, lineHeight: 1.4 }}>{node.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 4 }}>
                {[
                  { label: "Leads In", value: "200", sub: "from free sources", color: C.cyan },
                  { label: "Numbers Found", value: "130–140", sub: "65–70% skip trace hit rate", color: C.green },
                  { label: "After DNC Scrub", value: "~110", sub: "clean, legal, callable", color: C.amber },
                ].map((stat, i) => (
                  <div key={i} style={{ padding: "14px 16px", background: C.surfaceHigh, border: `1px solid ${stat.color}25`, borderRadius: 8, textAlign: "center" }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: stat.color, textShadow: `0 0 14px ${stat.color}50` }}>{stat.value}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginTop: 2 }}>{stat.label}</div>
                    <div style={{ fontSize: 10, color: C.textDim, marginTop: 2 }}>{stat.sub}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* New tasks summary */}
            <Card>
              <SectionHeader color={C.orange}>New Build Plan Tasks — Lead Sourcing, Compliance & Analytics</SectionHeader>
              <div style={{ padding: "12px 16px", background: `${C.orange}0A`, border: `1px solid ${C.orange}25`, borderRadius: 8, marginBottom: 16, fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>
                <span style={{ color: C.orange, fontWeight: 700 }}>8 new tasks</span> added across Phases 3–6 to fill the real gaps: lead sourcing, legal compliance, analytics, and client retention.
                These are what matter most for actually running this as a <span style={{ color: C.amber, fontWeight: 600 }}>paid service</span> rather than just a demo.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { id: "3E", phase: "W3", title: "Free Lead Scraping Pipeline", desc: "Python scraper → 200 FSBO leads in a CSV", color: C.green, icon: "🕷️", category: "Lead Sourcing" },
                  { id: "3F", phase: "W3", title: "Skip Trace Integration", desc: "Scrape → skip trace → call. Zero manual steps", color: C.green, icon: "🔗", category: "Lead Sourcing" },
                  { id: "4E", phase: "W4", title: "DNC Scrubbing Automation", desc: "Auto-check DNC registry before every call batch", color: C.amber, icon: "🛡️", category: "Compliance" },
                  { id: "4F", phase: "W4", title: "Call Time Zone Logic", desc: "No calls outside 8am–9pm local. TCPA compliance", color: C.amber, icon: "🕐", category: "Compliance" },
                  { id: "5E", phase: "W5–6", title: "Call Recording + Transcripts", desc: "100% of calls recorded and searchable", color: C.orange, icon: "🎙️", category: "Analytics" },
                  { id: "5F", phase: "W5–6", title: "Conversion Rate Dashboard", desc: "Live funnel metrics: calls → answers → leads → booked", color: C.orange, icon: "📊", category: "Analytics" },
                  { id: "5G", phase: "W5–6", title: "Voicemail Drop Campaign", desc: "Auto voicemail after 2 failed attempts. +10–20% callbacks", color: C.orange, icon: "📱", category: "Growth" },
                  { id: "6E", phase: "W7–8", title: "Lead Handoff Workflow", desc: "Agent notified <60s: SMS + email + CRM + homeowner confirm", color: C.pink, icon: "⚡", category: "Delivery" },
                  { id: "6F", phase: "W7–8", title: "Client Reporting Automation", desc: "Weekly email report: calls, leads, bookings. Auto-sends Monday", color: C.pink, icon: "📧", category: "Retention" },
                ].map((task, i) => (
                  <div key={i} className="card-hover" style={{
                    padding: "14px 16px", background: C.surfaceHigh,
                    border: `1px solid ${task.color}20`, borderLeft: `3px solid ${task.color}`,
                    borderRadius: 8, display: "flex", gap: 12, alignItems: "flex-start", transition: "all 0.15s",
                  }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: `${task.color}12`, border: `1px solid ${task.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                      {task.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 10, fontWeight: 800, color: task.color, letterSpacing: 1 }}>{task.id}</span>
                        <span style={{ fontSize: 8, fontWeight: 700, color: C.bg, background: `linear-gradient(135deg, ${C.amber}, ${C.orange})`, padding: "1px 6px", borderRadius: 99, letterSpacing: 1 }}>NEW</span>
                        <span className="tag" style={{ background: `${task.color}15`, color: task.color, border: `1px solid ${task.color}25`, fontSize: 9 }}>{task.category}</span>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: C.white, marginBottom: 3 }}>{task.title}</div>
                      <div style={{ fontSize: 11, color: C.textMid, lineHeight: 1.5 }}>{task.desc}</div>
                      <div style={{ fontSize: 9, color: C.textDim, marginTop: 4 }}>Phase: {task.phase}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Testing strategy callout */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Card color={C.green}>
                <SectionHeader color={C.green}>Quick-Start Testing Strategy</SectionHeader>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { step: "1", task: "Scrape 100 leads from Zillow FSBO", time: "1 hour", cost: "$0" },
                    { step: "2", task: "Grab 50 leads from Facebook Marketplace", time: "30 min", cost: "$0" },
                    { step: "3", task: "Pull 50 from Craigslist Housing", time: "30 min", cost: "$0" },
                    { step: "4", task: "Skip trace all 200 via BatchSkipTracing", time: "10 min", cost: "$30–36" },
                    { step: "5", task: "DNC scrub the phone list", time: "5 min", cost: "$0 (free check)" },
                    { step: "6", task: "Load into Vapi + n8n and start calling", time: "15 min", cost: "$0 (trial)" },
                  ].map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 8 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: `${C.green}20`, border: `1px solid ${C.green}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: C.green, flexShrink: 0 }}>
                        {s.step}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{s.task}</div>
                        <div style={{ display: "flex", gap: 10, marginTop: 3 }}>
                          <span style={{ fontSize: 10, color: C.textDim }}>⏱ {s.time}</span>
                          <span style={{ fontSize: 10, color: s.cost === "$0" ? C.green : C.amber, fontWeight: 600 }}>{s.cost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12, padding: "10px 14px", background: `${C.green}0A`, border: `1px solid ${C.green}25`, borderRadius: 8, textAlign: "center" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, letterSpacing: 2, marginBottom: 4 }}>TOTAL TEST BUDGET</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: C.green, textShadow: `0 0 14px ${C.green}50` }}>~$30–36</div>
                  <div style={{ fontSize: 11, color: C.textMid, marginTop: 3 }}>For 200 leads with phone numbers, DNC-scrubbed, ready to call</div>
                </div>
              </Card>

              <Card color={C.red}>
                <SectionHeader color={C.red}>⚠️ Compliance Checklist — Non-Negotiable</SectionHeader>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { rule: "DNC Registry Check", desc: "Every number must be checked against the National DNC Registry before dialing. $500–$1,500 fine PER illegal call.", severity: "Critical", icon: "🛡️" },
                    { rule: "Time Zone Compliance", desc: "Only call between 8am–9pm in the recipient's LOCAL time zone. Area code → time zone mapping required.", severity: "Critical", icon: "🕐" },
                    { rule: "Call Recording Disclosure", desc: "Many states require two-party consent for recording. Your AI agent must disclose recording at the start of each call.", severity: "High", icon: "🎙️" },
                    { rule: "Caller ID Accuracy", desc: "Spoofing caller ID is illegal under the Truth in Caller ID Act. Your Twilio number must be legitimate and registered.", severity: "High", icon: "📞" },
                    { rule: "Opt-Out Mechanism", desc: "Every call must offer a clear way to opt out of future calls. 'Press 2 to be removed from our list' — and actually remove them.", severity: "High", icon: "🚫" },
                    { rule: "TCPA Legal Review", desc: "Budget $200–500 for a TCPA-specialized attorney to review your system before the first live campaign. Not optional.", severity: "Critical", icon: "⚖️" },
                  ].map((item, i) => (
                    <div key={i} style={{
                      padding: "12px 14px", background: C.surfaceHigh,
                      border: `1px solid ${item.severity === "Critical" ? C.red + "40" : C.amber + "30"}`,
                      borderRadius: 8,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 15 }}>{item.icon}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: item.severity === "Critical" ? C.red : C.amber }}>{item.rule}</span>
                        </div>
                        <span className="tag" style={{
                          background: item.severity === "Critical" ? C.redGlow : `${C.amber}18`,
                          color: item.severity === "Critical" ? C.red : C.amber,
                          border: `1px solid ${item.severity === "Critical" ? C.red : C.amber}30`,
                        }}>{item.severity}</span>
                      </div>
                      <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, paddingLeft: 23 }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

          </div>
        )}

        {/* ══════════════════ BUSINESS MODEL ══════════════════ */}
        {tab === "Business Model" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Pricing tiers */}
            <Card>
              <SectionHeader color={C.amber}>Pricing Tiers — What You Sell to Agents</SectionHeader>
              <div style={{ padding: "12px 16px", background: `${C.amber}0A`, border: `1px solid ${C.amber}25`, borderRadius: 8, marginBottom: 16, fontSize: 12, color: C.textMid }}>
                <span style={{ color: C.amber, fontWeight: 700 }}>Key insight: </span>
                You don't sell "AI calls". You sell qualified leads. Agents don't care about technology — they care about motivated sellers in their pipeline.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {PRICING_TIERS.map(tier => (
                  <div key={tier.plan} style={{ padding: 20, background: C.surfaceHigh, border: `1px solid ${tier.color}30`, borderRadius: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: tier.color, letterSpacing: 2.5, marginBottom: 8 }}>{tier.plan.toUpperCase()}</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: tier.color, textShadow: `0 0 16px ${tier.color}50`, marginBottom: 4 }}>{tier.price}</div>
                    <div style={{ fontSize: 11, color: C.textMid, marginBottom: 16 }}>/month per client</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {[
                        { l: "Calls/month", v: tier.calls },
                        { l: "Qualified leads est.", v: tier.leads },
                        { l: "Your margin", v: tier.margin },
                      ].map(r => (
                        <div key={r.l} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "5px 0", borderBottom: `1px solid ${C.border}30` }}>
                          <span style={{ color: C.textMid }}>{r.l}</span>
                          <span style={{ color: tier.color, fontWeight: 700 }}>{r.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, padding: "12px 16px", background: `${C.cyan}0A`, border: `1px solid ${C.cyan}25`, borderRadius: 8, fontSize: 12, color: C.textMid }}>
                <span style={{ color: C.cyan, fontWeight: 700 }}>Per-lead pricing alternative: </span>
                Some agencies charge $100–$300 per qualified lead instead of monthly flat fee. Higher upside per deal, but harder to predict revenue. Start with flat fee.
              </div>
            </Card>

            {/* Lead sources */}
            <Card>
              <SectionHeader color={C.green}>Lead Sources — Who to Call and Why</SectionHeader>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10 }}>
                {LEAD_SOURCES.map(src => (
                  <div key={src.source} style={{ padding: "14px 16px", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{src.source}</span>
                      <div style={{ display: "flex", gap: 2 }}>
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: i < src.heat ? C.amber : C.border }} />
                        ))}
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: C.textMid, marginBottom: 6 }}>{src.why}</div>
                    <div style={{ fontSize: 10, color: C.textDim }}>Tool: {src.tool}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Script */}
            <Card>
              <SectionHeader color={C.purple}>Example AI Seller Script — What the Conversation Sounds Like</SectionHeader>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {SCRIPT.map((line, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "12px 16px", background: line.role === "AI" ? `${C.cyan}08` : C.surfaceHigh, border: `1px solid ${line.role === "AI" ? C.cyan + "25" : C.border}`, borderRadius: 8, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: line.role === "AI" ? C.cyan : C.amber, letterSpacing: 1.5, flexShrink: 0, marginTop: 1, minWidth: 40 }}>{line.role}</span>
                    <span style={{ fontSize: 12, color: line.role === "AI" ? C.text : C.textMid, lineHeight: 1.6, fontStyle: line.role === "Owner" ? "italic" : "normal" }}>{line.line}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, padding: "12px 16px", background: `${C.purple}0A`, border: `1px solid ${C.purple}25`, borderRadius: 8, fontSize: 12, color: C.textMid }}>
                <span style={{ color: C.purple, fontWeight: 700 }}>Critical: </span>
                The script never asks "are you interested in selling?" It asks permission-based questions that feel natural. "If the price made sense..." is much less aggressive than "I want to buy your house".
              </div>
            </Card>

            {/* Why agents pay */}
            <Card>
              <SectionHeader color={C.orange}>Why Agents Pay — The Economics From Their Side</SectionHeader>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.red, marginBottom: 12 }}>Human Cold Caller Cost</div>
                  {[
                    { item: "Salary/contractor fee", cost: "$2,000–4,000/mo" },
                    { item: "Calls per day (realistic)", cost: "80–120 calls" },
                    { item: "Answer rate", cost: "15–25%" },
                    { item: "Leads per month", cost: "5–15" },
                    { item: "Cost per lead", cost: "$130–800" },
                    { item: "Works 8 hrs/day", cost: "40 hrs/week max" },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.border}25`, fontSize: 12 }}>
                      <span style={{ color: C.textMid }}>{r.item}</span>
                      <span style={{ color: C.red, fontWeight: 600 }}>{r.cost}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.green, marginBottom: 12 }}>Your AI System</div>
                  {[
                    { item: "Monthly service fee", cost: "$1,500–7,000/mo" },
                    { item: "Calls per day", cost: "500–2,000+" },
                    { item: "Answer rate", cost: "20–35%" },
                    { item: "Leads per month", cost: "15–80" },
                    { item: "Cost per lead", cost: "$25–150" },
                    { item: "Works 24/7", cost: "Unlimited hours" },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.border}25`, fontSize: 12 }}>
                      <span style={{ color: C.textMid }}>{r.item}</span>
                      <span style={{ color: C.green, fontWeight: 600 }}>{r.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 14, padding: "12px 16px", background: `${C.green}0A`, border: `1px solid ${C.green}25`, borderRadius: 8, fontSize: 12, color: C.textMid }}>
                <span style={{ color: C.green, fontWeight: 700 }}>The agent's ROI: </span>
                They pay you $3,500/month. If your system finds 1 listing at a $10K commission, they made $6,500 profit. Every additional lead is pure upside. That's why they renew.
              </div>
            </Card>
          </div>
        )}

        {/* ══════════════════ COSTS & ROI ══════════════════ */}
        {tab === "Costs & ROI" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Operating cost breakdown */}
            <Card>
              <SectionHeader color={C.amber}>Monthly Operating Costs — What It Costs You to Run</SectionHeader>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {["Service", "Role", "Cost/month", "Notes"].map(h => (
                      <th key={h} style={{ padding: "8px 14px", fontSize: 10, fontWeight: 700, color: C.textDim, textAlign: "left", letterSpacing: 1.5, textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { s: "Vapi", r: "Voice AI platform", c: "$50–200", note: "Scales with call volume. ~$0.07/min avg", col: C.cyan },
                    { s: "Twilio", r: "Phone calls + SMS", c: "$80–150", note: "$0.013/min outbound + numbers", col: C.green },
                    { s: "OpenAI (GPT-4o-mini)", r: "LLM for conversations", c: "$20–60", note: "Very cheap per call. Upgradeable.", col: C.purple },
                    { s: "n8n (self-hosted)", r: "Workflow automation", c: "$5–20", note: "VPS hosting only. n8n itself is free.", col: C.amber },
                    { s: "GoHighLevel", r: "CRM + white-label portal", c: "$97", note: "White-label so clients see your brand", col: C.orange },
                    { s: "PropStream / BatchLeads", r: "Lead data", c: "$100–150", note: "Can charge clients separately for this", col: C.pink },
                    { s: "VPS Server", r: "n8n hosting", c: "$20–40", note: "Hetzner or DigitalOcean. Small server fine.", col: C.textMid },
                    { s: "DNC Compliance", r: "Legal scrubbing", c: "$25–50", note: "Non-negotiable. Every list must be scrubbed.", col: C.red },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.border}25`, background: i % 2 === 0 ? C.surfaceHigh : "transparent" }}>
                      <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: row.col }}>{row.s}</td>
                      <td style={{ padding: "12px 14px", fontSize: 12, color: C.textMid }}>{row.r}</td>
                      <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: C.amber }}>{row.c}</td>
                      <td style={{ padding: "12px 14px", fontSize: 11, color: C.textDim }}>{row.note}</td>
                    </tr>
                  ))}
                  <tr style={{ background: C.surfaceHigh, borderTop: `1px solid ${C.border}` }}>
                    <td colSpan={2} style={{ padding: "14px 14px", fontSize: 13, fontWeight: 700, color: C.text }}>TOTAL OPERATING COST</td>
                    <td style={{ padding: "14px 14px", fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: C.amber, textShadow: `0 0 14px ${C.amber}50` }}>$397–767/mo</td>
                    <td style={{ padding: "14px 14px", fontSize: 11, color: C.textDim }}>Before any client revenue</td>
                  </tr>
                </tbody>
              </table>
            </Card>

            {/* Revenue scenarios */}
            <Card>
              <SectionHeader color={C.green}>Revenue Scenarios — From First Client to Full Agency</SectionHeader>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
                {REVENUE_SCENARIOS.map(sc => (
                  <div key={sc.label} style={{ padding: 18, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10, textAlign: "center" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, letterSpacing: 2, marginBottom: 10 }}>{sc.label.toUpperCase()}</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, color: C.textDim, marginBottom: 2 }}>REVENUE</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: C.amber, textShadow: `0 0 14px ${C.amber}50` }}>${sc.rev.toLocaleString()}</div>
                    <div style={{ height: 1, background: C.border, margin: "10px 0" }} />
                    <div style={{ fontSize: 11, color: C.textMid, marginBottom: 4 }}>{sc.clients} clients @ ~${sc.avg.toLocaleString()}/mo</div>
                    <div style={{ fontSize: 11, color: C.textDim, marginBottom: 8 }}>Costs: ~${sc.cost.toLocaleString()}/mo</div>
                    <div style={{ padding: "6px 0", background: `${C.green}0A`, border: `1px solid ${C.green}25`, borderRadius: 6 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.green }}>PROFIT</div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: C.green }}>${sc.profit.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ padding: "14px 16px", background: `${C.cyan}0A`, border: `1px solid ${C.cyan}25`, borderRadius: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.cyan, marginBottom: 8 }}>First 90 Days: Realistic Target</div>
                  {[
                    ["Month 1", "Build system, test, refine script", "$0"],
                    ["Month 2", "First client onboarded ($1,500–2,000/mo)", "$1,500–2,000"],
                    ["Month 3", "2–3 clients + referrals starting", "$3,000–6,000"],
                  ].map(([m, a, r], i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.border}25`, fontSize: 11, flexWrap: "wrap", gap: 4 }}>
                      <span style={{ color: C.cyan, fontWeight: 700, minWidth: 60 }}>{m}</span>
                      <span style={{ color: C.textMid, flex: 1 }}>{a}</span>
                      <span style={{ color: C.green, fontWeight: 700 }}>{r}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "14px 16px", background: `${C.amber}0A`, border: `1px solid ${C.amber}25`, borderRadius: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.amber, marginBottom: 8 }}>How To Get First 5 Clients</div>
                  {["Use your own results as proof (run campaigns first for yourself)", "Cold outreach to local real estate agents on Instagram/LinkedIn", "Real estate investor Facebook groups — they WANT this service", "Offer first month at cost or free — results speak louder than pitch", "One happy client = 3 referrals in this industry"].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, padding: "5px 0", borderBottom: `1px solid ${C.border}25`, fontSize: 11, color: C.textMid }}>
                      <span style={{ color: C.amber, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Startup cost */}
            <Card color={C.cyan}>
              <SectionHeader color={C.cyan}>Startup Cost — What You Need Before First Client</SectionHeader>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  {[
                    { item: "Vapi account (first 1000 min free)", cost: "$0", note: "Free tier plenty for testing" },
                    { item: "Twilio trial account", cost: "$0", note: "$15 free credit included" },
                    { item: "n8n self-hosted (Hetzner VPS)", cost: "$20", note: "One-time monthly start" },
                    { item: "GoHighLevel 14-day trial", cost: "$0", note: "Then $97/mo — bill after first client" },
                    { item: "PropStream trial", cost: "$1", note: "7-day trial for $1" },
                    { item: "Domain + email", cost: "$15", note: "Professional presence before pitching" },
                    { item: "TCPA legal review", cost: "$200–500", note: "Do NOT skip this. Seriously." },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "9px 0", borderBottom: `1px solid ${C.border}25`, gap: 10 }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{r.item}</div>
                        <div style={{ fontSize: 10, color: C.textDim, marginTop: 2 }}>{r.note}</div>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.amber, flexShrink: 0 }}>{r.cost}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ padding: "18px 20px", background: C.surfaceHigh, border: `1px solid ${C.green}30`, borderRadius: 10, textAlign: "center" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.textDim, letterSpacing: 2, marginBottom: 6 }}>TOTAL TO GET STARTED</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, color: C.green, textShadow: `0 0 20px ${C.green}60` }}>$236–536</div>
                    <div style={{ fontSize: 11, color: C.textMid, marginTop: 4 }}>Before first client pays you</div>
                  </div>
                  <div style={{ padding: "16px 18px", background: `${C.amber}0A`, border: `1px solid ${C.amber}25`, borderRadius: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.amber, marginBottom: 10 }}>Break-Even Math</div>
                    {[
                      ["Monthly operating cost", "$400–770"],
                      ["Minimum 1 client needed", "$1,500+/mo"],
                      ["Break-even at", "1 client"],
                      ["Profitable from", "Month 2"],
                    ].map(([l, v], i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "5px 0", borderBottom: `1px solid ${C.border}25` }}>
                        <span style={{ color: C.textMid }}>{l}</span>
                        <span style={{ color: C.amber, fontWeight: 700 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ══════════════════ FEASIBILITY ══════════════════ */}
        {tab === "Feasibility" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Overall score */}
            <Card color={C.green}>
              <SectionHeader color={C.green}>Overall Feasibility Assessment</SectionHeader>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
                {[
                  { label: "Technical Difficulty", score: 4, max: 10, color: C.green, verdict: "Very Manageable", note: "Vapi eliminates the hardest parts" },
                  { label: "Business Difficulty", score: 6, max: 10, color: C.amber, verdict: "Moderate", note: "Sales takes time but niche is proven" },
                  { label: "Time to First Revenue", score: 8, max: 10, color: C.green, verdict: "7–8 weeks", note: "Fastest path to cash in this space" },
                  { label: "Revenue Ceiling", score: 9, max: 10, color: C.green, verdict: "Very High", note: "$20K+/mo with 6–8 clients" },
                  { label: "Competition Level", score: 6, max: 10, color: C.amber, verdict: "Moderate", note: "Competitive but local niches wide open" },
                  { label: "Survival Probability (12mo)", score: 7, max: 10, color: C.green, verdict: "High", note: "If you get 3 clients, you survive" },
                ].map(s => (
                  <div key={s.label} style={{ padding: 16, background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.textMid, marginBottom: 8 }}>{s.label}</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: s.color, textShadow: `0 0 14px ${s.color}50`, marginBottom: 4 }}>{s.score}/10</div>
                    <AnimatedBar pct={s.score * 10} color={s.color} height={5} />
                    <div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginTop: 8 }}>{s.verdict}</div>
                    <div style={{ fontSize: 10, color: C.textDim, marginTop: 3 }}>{s.note}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "14px 18px", background: `${C.green}0A`, border: `1px solid ${C.green}25`, borderRadius: 8, fontSize: 13, color: C.textMid, lineHeight: 1.7 }}>
                <span style={{ color: C.green, fontWeight: 700 }}>Verdict: Highly feasible for 2 CS people. </span>
                The business model is proven — hundreds of agencies are doing this right now. Your CS background means the technical setup (Vapi, n8n, API integration) takes you days, not weeks. The hardest part is getting the first client — not the tech.
              </div>
            </Card>

            {/* Risks */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Card color={C.red}>
                <SectionHeader color={C.red}>Real Risks — Don't Ignore These</SectionHeader>
                {[
                  { risk: "TCPA Legal Exposure", sev: "Critical", desc: "Wrong setup = $500–1,500 per illegal call. At 1,000 calls/day that's catastrophic. Get a lawyer first." },
                  { risk: "Script Quality", sev: "High", desc: "Bad script = 0% conversion. The agent prompt is 70% of your results. Iterate relentlessly." },
                  { risk: "Lead Quality Matters", sev: "High", desc: "Calling random homeowners won't work. Expired listings and FSBOs convert 3–5x better than cold lists." },
                  { risk: "Client Churn", sev: "Medium", desc: "If you promise 10 leads and deliver 2, they cancel. Under-promise, over-deliver on your first client." },
                  { risk: "Vapi Platform Dependency", sev: "Medium", desc: "If Vapi raises prices or breaks, you're affected. Keep your conversation logic exportable." },
                  { risk: "Market Saturation (some cities)", sev: "Medium", desc: "Major metros have existing AI caller services. Target mid-size markets first." },
                ].map((r, i) => (
                  <div key={i} style={{ padding: "10px 12px", background: C.surfaceHigh, border: `1px solid ${r.sev === "Critical" ? C.red + "40" : C.border}`, borderRadius: 7, marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: r.sev === "Critical" ? C.red : r.sev === "High" ? C.amber : C.textMid }}>{r.risk}</span>
                      <span className="tag" style={{ background: r.sev === "Critical" ? C.redGlow : `${C.amber}18`, color: r.sev === "Critical" ? C.red : C.amber, border: `1px solid ${r.sev === "Critical" ? C.red : C.amber}30` }}>{r.sev}</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6 }}>{r.desc}</div>
                  </div>
                ))}
              </Card>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Card color={C.green}>
                  <SectionHeader color={C.green}>Competitive Advantages You Have</SectionHeader>
                  {[
                    ["CS background", "Setup takes you 1 day vs weeks for non-technical competitors"],
                    ["Two-person team", "One builds/maintains, one sells — perfect split"],
                    ["No overhead", "No office, no employees initially — pure margin"],
                    ["Early mover locally", "Most real estate agents in smaller cities haven't seen this yet"],
                    ["Iteratable product", "Every client's data makes your script better for the next"],
                    ["Vapi handles hard parts", "You focus on business logic, not audio engineering"],
                  ].map(([title, desc], i) => (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: `1px solid ${C.border}25`, fontSize: 12 }}>
                      <span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>+</span>
                      <div>
                        <span style={{ fontWeight: 700, color: C.text }}>{title}: </span>
                        <span style={{ color: C.textMid }}>{desc}</span>
                      </div>
                    </div>
                  ))}
                </Card>

                <Card color={C.amber}>
                  <SectionHeader color={C.amber}>Realistic Failure Scenarios</SectionHeader>
                  {[
                    { scenario: "Can't close first client", prob: "30%", fix: "Offer first month free or at cost. One result beats any pitch." },
                    { scenario: "Script never converts", prob: "20%", fix: "Join real estate investor groups, study existing scripts, iterate 20+ versions." },
                    { scenario: "Compliance issue halts", prob: "15%", fix: "Budget $300 for legal review before first campaign. Non-negotiable." },
                    { scenario: "Vapi cost too high at scale", prob: "15%", fix: "At scale, migrate hot logic to own stack. Vapi is for learning phase." },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: "10px 12px", background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 7, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: C.amber }}>{s.scenario}</span>
                        <span style={{ fontSize: 11, color: C.red, fontWeight: 600 }}>P: {s.prob}</span>
                      </div>
                      <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6 }}>Fix: {s.fix}</div>
                    </div>
                  ))}
                </Card>
              </div>
            </div>

            {/* Decision tree */}
            <Card color={C.cyan}>
              <SectionHeader color={C.cyan}>Decision: Build Own Stack Later vs Stay on Vapi</SectionHeader>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.cyan, marginBottom: 12 }}>Stay on Vapi if:</div>
                  {["Revenue under $15K/month — margin is fine", "Less than 30,000 calls/month volume", "Team is 2 people or less — bandwidth limited", "Clients don't demand data portability", "You want to focus on sales not engineering"].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: `1px solid ${C.border}25`, fontSize: 12, color: C.textMid }}>
                      <span style={{ color: C.cyan, fontWeight: 700 }}>✓</span>{item}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.amber, marginBottom: 12 }}>Migrate to own stack when:</div>
                  {["Revenue above $15K/month consistently", "Vapi costs eating 30%+ of margin", "You have 5+ clients demanding SLAs", "You want to expand to other industries", "You have engineering time to spare from revenue"].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: `1px solid ${C.border}25`, fontSize: 12, color: C.textMid }}>
                      <span style={{ color: C.amber, fontWeight: 700 }}>→</span>{item}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 14, padding: "12px 16px", background: `${C.cyan}0A`, border: `1px solid ${C.cyan}25`, borderRadius: 8, fontSize: 12, color: C.textMid }}>
                <span style={{ color: C.cyan, fontWeight: 700 }}>Bottom line: </span>
                Start on Vapi. Make money. At $15K/month revenue you can afford to hire someone to build the custom stack while you keep selling. Don't optimize infrastructure before you have customers.
              </div>
            </Card>
          </div>
        )}

        {/* ══════════════════ EXECUTION GUIDE ══════════════════ */}
        {tab === "Execution Guide" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ padding: "14px 18px", background: `${C.amber}0A`, border: `1px solid ${C.amber}25`, borderRadius: 10, fontSize: 12, color: C.textMid, lineHeight: 1.7 }}>
              <span style={{ color: C.amber, fontWeight: 700 }}>Full Execution Guide — </span>
              Day-by-day instructions, real code snippets, outreach templates, sales scripts, and tech setup walkthroughs. Everything you need to go from zero to first paying client.
            </div>
            <VapiGuideContent />
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 32, paddingTop: 20, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 500, color: C.textDim }}>Revised Plan · Vapi Stack · 8-Week Build · B2B Lead-Gen Service Model</span>
          <span style={{ fontSize: 11, fontWeight: 500, color: C.textDim }}>Week 8 → first client → $1,500–7,000/mo → scale to $20K+</span>
        </div>
      </div>
    </div>
  );
}