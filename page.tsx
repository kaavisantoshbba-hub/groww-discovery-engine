
"use client";

import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Trophy,
  Route,
  Search,
  Database,
  Activity,
  ShieldCheck,
  MessageSquare,
  Filter,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  TrendingDown,
  UserCheck,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATASET (Using v4 Processed Data) ---
// Note: In a full app, this would be in data.json.
// I have embedded a representative sample of your 511 records here for immediate deployment.
const ALL_REVIEWS = [
  { no: "RD-1", source: "Reddit", text: "I requested to cancel my monthly SIPs around Jan 25, but the Feb 1 SIP was still active...", relevance: "SIP-relevant", moment: "Wanting to pause/change/stop", reason: ["Unclear"], intent: "Get help or an answer", confidence: "High" },
  { no: "RD-4", source: "Reddit", text: "For the last 2–3 months, my monthly SIP... has been failing every time. I contacted Groww support, but they couldn't resolve the issue.", relevance: "SIP-relevant", moment: "Instalment due or payment attempt", reason: ["Autopay or mandate problem", "Support didn't help"], intent: "Get help or an answer", confidence: "High" },
  { no: "RD-5", source: "Reddit", text: "Groww didn't give me an option to create a separate mandate... Groww support/chatbot is giving me conflicting advice.", relevance: "SIP-relevant", moment: "Setting up autopay", reason: ["Product gap"], intent: "Get help or an answer", confidence: "High" },
  { no: "RD-16", source: "Reddit", text: "I started an SIP... and I don't know why but it felt so small that it almost felt pointless. I went down the usual rabbit hole. YouTube videos, Reddit threads...", relevance: "SIP-relevant", moment: "Starting a SIP", reason: ["N/A"], intent: "Get help or an answer", confidence: "High" },
  { no: "PS-66", source: "Play Store", text: "tried a lot to skip my sips for a month... I recently got operated on my knee and I'm not able to go for work... the useless feature doesn't work.", relevance: "SIP-relevant", moment: "Wanting to pause/change/stop", reason: ["Financial strain", "Product gap"], intent: "Unclear", confidence: "High" },
  { no: "PS-14", source: "Play Store", text: "Big disappointing me 3 sal se sip kar rha tha... but since MF Prime came, they auto swipe my SIP... no support no nothing then i withdrawal all.", relevance: "SIP-relevant", moment: "After stopping or cancelling", reason: ["Technical issue"], intent: "Stop completely", confidence: "High" },
  { no: "YT-5", source: "YouTube", text: "Sbi mutual fund me 2000 ka sip chal raha tha lekin bo nav me credit hi nhi hua... grow ko kaafi message Kiya mail kiya koi help nahi mili", relevance: "SIP-relevant", moment: "Instalment due or payment attempt", reason: ["Technical issue", "Support didn't help"], intent: "Get help or an answer", confidence: "High" },
  { no: "PS-103", source: "Play Store", text: "Against all the MFs should be tagging/purpose/goal - Most of the people invest in SIP for specific purpose like Trip, Child Marriage...", relevance: "SIP-relevant", moment: "Unclear", reason: ["Product gap"], intent: "Suggest a feature", confidence: "High" },
  { no: "RD-26", source: "Reddit", text: "I stared at my screen during market hours today, and I honestly felt a heavy wave of anxiety... make me want to stop saving into stocks completely.", relevance: "SIP-relevant", moment: "Wanting to pause/change/stop", reason: ["Unclear"], intent: "Unclear", confidence: "Medium" },
];

const GOLDEN_SET_STATS = {
  relevance: "18/20",
  moment: "15/20",
  reason: "17/20",
  intent: "12/20",
  overall: "55%"
};

const OPPORTUNITIES = [
  { title: "Autopay & Mandate Friction", desc: "Users face repeated failures in autopay setup and lack of manual retry options.", volume: 60, priority: "High", moment: "Instalment due or payment attempt" },
  { title: "The 'Anxiety Gap'", desc: "First-time investors exit when portfolios turn red due to lack of contextual reassurance.", volume: 42, priority: "High", moment: "Quiet months" },
  { title: "Lifecycle Management", desc: "Lack of a seamless 'Pause' or 'Flex-Amount' feature for life events (e.g., medical, moving).", volume: 38, priority: "Medium", moment: "Wanting to pause/change/stop" },
  { title: "Jargon Barrier", desc: "Confusing terminology ('minimum value') creates fear of making mistakes in the app.", volume: 25, priority: "Medium", moment: "Starting a SIP" },
  { title: "Post-Purchase Void", desc: "Lack of immediate visibility for IPO/SIP status after payment leads to distrust.", volume: 18, priority: "Low", moment: "After investing" },
];

export default function DiscoveryEngine() {
  const [activeTab, setActiveTab] = useState('overview');
  const [filter, setFilter] = useState({ moment: 'All', reason: 'All' });
  const [selectedReview, setSelectedReview] = useState(null);

  const filteredReviews = useMemo(() => {
    return ALL_REVIEWS.filter(r => {
      const mMatch = filter.moment === 'All' || r.moment === filter.moment;
      const rMatch = filter.reason === 'All' || r.reason.includes(filter.reason);
      return mMatch && rMatch;
    });
  }, [filter]);

  return (
    <div className="min-h-screen bg-premium-black text-ivory-text font-sans flex overflow-hidden">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-charcoal-surface border-r border-gold-primary/10 flex flex-col">
        <div className="p-6 flex flex-col gap-2">
          <div className="text-gold-primary font-serif text-2xl font-bold tracking-tighter">Groww</div>
          <div className="text-muted-gold text-xs uppercase tracking-widest font-semibold">AI Discovery Engine <span className="ml-2 px-1.5 py-0.5 bg-gold-primary/20 text-gold-primary rounded text-[10px]">BETA</span></div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'opportunities', label: 'Opportunity Ranking', icon: Trophy },
            { id: 'journey', label: 'Investor Journey', icon: Route },
            { id: 'evidence', label: 'Evidence Browser', icon: Database },
            { id: 'quality', label: 'AI Quality Centre', icon: ShieldCheck },
            { id: 'explore', label: 'Ask & Explore', icon: MessageSquare },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                activeTab === item.id ? 'bg-gold-primary/10 text-gold-primary border-l-2 border-gold-primary' : 'text-secondary-text hover:bg-white/5 hover:text-ivory-text'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gold-primary/10 text-[10px] text-muted-gold text-center">
          v4.0 Engine • Production Build
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 relative overflow-y-auto bg-deep-gradient">
        {/* Background Atmospheric Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <header className="h-16 border-b border-gold-primary/10 flex items-center justify-between px-8 bg-premium-black/50 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-serif font-medium text-ivory-text capitalize">{activeTab.replace('_', ' ')}</h1>
            <p className="text-xs text-muted-gold">Analyzing first-time investor behavior at scale</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <div className="text-[10px] text-muted-gold uppercase tracking-tighter">Last Updated</div>
              <div className="text-xs text-ivory-text font-mono">Nov 03, 2026 • 23:45</div>
            </div>
            <button className="bg-gold-primary text-premium-black px-3 py-1.5 rounded text-xs font-bold hover:bg-gold-champagne transition-colors">
              Refresh Data
            </button>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* KPI ROW */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { label: 'Total Records', val: '511', icon: Database, color: 'gold' },
                    { label: 'SIP Relevant', val: '330', icon: UserCheck, color: 'gold' },
                    { label: 'Recurring Themes', val: '18', icon: Activity, color: 'gold' },
                    { label: 'Priority Opps', val: '6', icon: Trophy, color: 'gold' },
                    { label: 'AI Agreement', val: GOLDEN_SET_STATS.overall, icon: ShieldCheck, color: 'gold' },
                    { label: 'Sources', val: '7', icon: ExternalLink, color: 'gold' },
                  ].map((kpi, i) => (
                    <div key={i} className="bg-charcoal-surface border border-gold-primary/20 p-4 rounded-lg shadow-gold-glow hover:border-gold-primary/50 transition-all group">
                      <div className="flex justify-between items-start mb-2">
                        <kpi.icon size={16} className="text-gold-primary group-hover:scale-110 transition-transform" />
                        <div className="text-[10px] text-muted-gold uppercase font-bold tracking-tighter">Verified</div>
                      </div>
                      <div className="text-2xl font-serif font-bold text-ivory-text">{kpi.val}</div>
                      <div className="text-[11px] text-muted-gold uppercase tracking-wide">{kpi.label}</div>
                    </div>
                  ))}
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-charcoal-surface border border-gold-primary/20 rounded-xl p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="text-xl font-serif text-gold-primary">Top Opportunity Areas</h2>
                          <p className="text-xs text-muted-gold">Highest-potential problems influencing SIP continuation</p>
                        </div>
                        <button className="text-xs text-gold-primary hover:underline flex items-center gap-1">View All <ChevronRight size={14}/></button>
                      </div>
                      <div className="space-y-3">
                        {OPPORTUNITIES.map((opp, i) => (
                          <div key={i} className="flex items-center gap-4 p-3 bg-premium-black/50 border border-gold-primary/10 rounded-lg hover:border-gold-primary/40 transition-all group cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center font-serif font-bold">{i+1}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-ivory-text">{opp.title}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${opp.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-gold-primary/20 text-gold-primary'}`}>{opp.priority}</span>
                              </div>
                              <div className="text-xs text-muted-gold line-clamp-1">{opp.desc}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-mono text-gold-primary">{opp.volume} records</div>
                              <div className="text-[10px] text-muted-gold uppercase">Evidence</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-charcoal-surface border border-gold-primary/20 rounded-xl p-6">
                      <h2 className="text-lg font-serif text-gold-primary mb-4">AI Research Assistant</h2>
                      <div className="relative mb-4">
                        <input
                          type="text"
                          placeholder="Ask about SIP investors..."
                          className="w-full bg-premium-black border border-gold-primary/20 rounded-lg px-4 py-3 text-sm text-ivory-text placeholder:text-muted-gold focus:outline-none focus:border-gold-primary transition-all"
                        />
                        <Search className="absolute right-3 top-3 text-muted-gold" size={18} />
                      </div>
                      <div className="space-y-2">
                        {["Why do people stop their SIP?", "What causes anxiety in Month 3?", "Unmet needs in Groww?"].map((q, i) => (
                          <button key={i} className="w-full text-left p-2 text-xs text-muted-gold hover:text-gold-primary hover:bg-white/5 rounded transition-all border border-transparent hover:border-gold-primary/20">
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'evidence' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap gap-4 items-center justify-between bg-charcoal-surface p-4 rounded-xl border border-gold-primary/20">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase text-muted-gold font-bold">Moment</label>
                      <select
                        onChange={(e) => setFilter({...filter, moment: e.target.value})}
                        className="bg-premium-black border border-gold-primary/20 text-xs text-ivory-text p-1.5 rounded outline-none"
                      >
                        <option value="All">All Moments</option>
                        <option value="Starting a SIP">Starting a SIP</option>
                        <option value="Wanting to pause/change/stop">Wanting to Stop</option>
                        <option value="Instalment due or payment attempt">Payment Attempt</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase text-muted-gold font-bold">Reason</label>
                      <select
                        onChange={(e) => setFilter({...filter, reason: e.target.value})}
                        className="bg-premium-black border border-gold-primary/20 text-xs text-ivory-text p-1.5 rounded outline-none"
                      >
                        <option value="All">All Reasons</option>
                        <option value="Technical issue">Technical Issue</option>
                        <option value="Autopay or mandate problem">Autopay Problem</option>
                        <option value="Product gap">Product Gap</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-gold">
                    <Filter size={14} />
                    Showing {filteredReviews.length} of {ALL_REVIEWS.length} records
                  </div>
                </div>

                <div className="bg-charcoal-surface border border-gold-primary/20 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-premium-black/50 text-muted-gold text-[11px] uppercase tracking-wider border-b border-gold-primary/10">
                        <th className="px-6 py-3 font-semibold">ID</th>
                        <th className="px-6 py-3 font-semibold">Review Text</th>
                        <th className="px-6 py-3 font-semibold">Moment</th>
                        <th className="px-6 py-3 font-semibold">Reason</th>
                        <th className="px-6 py-3 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {filteredReviews.map((r, i) => (
                        <tr key={i} className="border-b border-gold-primary/5 hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => setSelectedReview(r)}>
                          <td className="px-6 py-4 font-mono text-gold-primary text-xs">{r.no}</td>
                          <td className="px-6 py-4 text-ivory-text max-w-md truncate">{r.text}</td>
                          <td className="px-6 py-4">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-primary/10 text-gold-primary border border-gold-primary/20">{r.moment}</span>
                          </td>
                          <td className="px-6 py-4">
                            {r.reason.map((res, j) => (
                              <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted-gold border border-white/10 mr-1">{res}</span>
                            ))}
                          </td>
                          <td className="px-6 py-4">
                            <button className="p-1 text-muted-gold group-hover:text-gold-primary transition-colors">
                              <ExternalLink size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'quality' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {Object.entries(GOLDEN_SET_STATS).map(([key, val], i) => (
                    <div key={i} className="bg-charcoal-surface border border-gold-primary/20 p-6 rounded-xl text-center">
                      <div className="text-xs text-muted-gold uppercase tracking-widest mb-2">{key}</div>
                      <div className="text-3xl font-serif font-bold text-gold-primary">{val}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-charcoal-surface border border-gold-primary/20 rounded-xl p-6">
                  <h2 className="text-xl font-serif text-gold-primary mb-6 flex items-center gap-2">
                    <AlertCircle size={20} /> Where the AI Gets It Wrong
                  </h2>
                  <div className="space-y-4">
                    {[
                      { review: "PS-60", human: "Autopay Problem", ai: "Product Gap", why: "AI confused 'missing option' with 'product gap' instead of 'payment failure'." },
                      { review: "RD-16", human: "Starting a SIP", ai: "Unclear", why: "AI failed to recognize 'felt pointless' as a mindset during the starting phase." },
                    ].map((err, i) => (
                      <div key={i} className="p-4 bg-premium-black rounded-lg border-l-4 border-red-500 flex gap-4">
                        <div className="font-mono text-gold-primary text-xs w-20">{err.review}</div>
                        <div className="flex-1 text-sm">
                          <div className="flex gap-4 mb-1">
                            <span className="text-muted-gold italic">Human: {err.human}</span>
                            <span className="text-red-400 italic">AI: {err.ai}</span>
                          </div>
                          <div className="text-xs text-ivory-text opacity-70">{err.why}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other tabs would be implemented similarly... */}
            {activeTab !== 'overview' && activeTab !== 'evidence' && activeTab !== 'quality' && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-6 rounded-full bg-gold-primary/10 text-gold-primary animate-pulse">
                  <Activity size={48} />
                </div>
                <h2 className="text-2xl font-serif text-ivory-text">Section Under Construction</h2>
                <p className="text-muted-gold max-w-md">The {activeTab} module is being integrated with the v4 dataset. Please check the Evidence Browser for real-time data.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* --- DETAIL DRAWER --- */}
        <AnimatePresence>
          {selectedReview && (
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-charcoal-surface border-l border-gold-primary/30 shadow-2xl z-50 p-8 overflow-y-auto"
            >
              <button
                onClick={() => setSelectedReview(null)}
                className="absolute top-6 right-6 text-muted-gold hover:text-gold-primary transition-colors"
              >
                Close ✕
              </button>
              <div className="mt-12 space-y-8">
                <div>
                  <div className="text-xs text-gold-primary uppercase tracking-widest mb-2">Original Evidence</div>
                  <h3 className="text-2xl font-serif text-ivory-text mb-4">{selectedReview.no}</h3>
                  <p className="text-ivory-text leading-relaxed italic opacity-90">"{selectedReview.text}"</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-premium-black border border-gold-primary/10 rounded-lg">
                    <div className="text-[10px] text-muted-gold uppercase">Moment</div>
                    <div className="text-sm text-gold-primary">{selectedReview.moment}</div>
                  </div>
                  <div className="p-3 bg-premium-black border border-gold-primary/10 rounded-lg">
                    <div className="text-[10px] text-muted-gold uppercase">Intent</div>
                    <div className="text-sm text-gold-primary">{selectedReview.intent}</div>
                  </div>
                </div>
                <div className="p-4 bg-premium-black border border-gold-primary/10 rounded-lg">
                  <div className="text-[10px] text-muted-gold uppercase mb-2">AI Analysis & Reasoning</div>
                  <div className="text-sm text-ivory-text opacity-80">
                    Based on the phrase <span className="text-gold-primary">"{selectedReview.text.substring(0, 30)}..."</span>, the engine identified this as a {selectedReview.moment} event driven by {selectedReview.reason.join(', ')}.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
