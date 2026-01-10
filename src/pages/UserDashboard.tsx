import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, Send, User, LogOut, Sparkles, MessageSquare, Zap, Shield, Activity, Calendar, Package, FileUp, Cpu, Globe, ArrowRight, Bot, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { ScrollReveal } from '@/components/ScrollReveal';

interface Message {
  role: 'user' | 'bot';
  content: string;
  time: string;
}

export const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "SYSTEM_READY: Greetings, Agent. I am Campus Sathi Core. How may I assist your traversal through the institutional matrix today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      role: 'user',
      content: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    await new Promise(r => setTimeout(r, 1500));
    const botMsg: Message = {
      role: 'bot',
      content: "DATA_RESPONSE: Request acknowledged. Processing query through neural nodes. Synchronizing relevant institutional documentation...",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30 overflow-hidden font-sans">
      <Navigation />

      {/* Deep Space Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 z-0">
          <div className="stars absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse" />
        </div>

        {/* Nebula Glows */}
        <div className="nebula-glow top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 animate-orb" />
        <div className="nebula-glow bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 animate-orb" style={{ animationDelay: '5s' }} />

        <div className="absolute inset-0 neural-grid opacity-[0.05]" />
      </div>

      <div className="relative z-10 pt-24 h-[calc(100vh-1rem)] flex flex-col md:flex-row p-6 gap-6">
        {/* Left Sidebar - Agent Information & Gateways */}
        <aside className="w-full md:w-80 flex flex-col gap-6">
          <ScrollReveal width="100%">
            <div className="glass-morphism rounded-[2.5rem] p-8 border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-purple-600/10 transition-all" />

              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-purple-600/20 rounded-full blur-xl animate-pulse" />
                  <div className="relative h-24 w-24 rounded-full bg-white/[0.03] border border-white/10 p-1">
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-4xl font-black italic">
                      {user?.username?.[0].toUpperCase()}
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 h-6 w-6 rounded-full bg-emerald-500 border-4 border-[#0a0a0f] animate-pulse" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 select-none">Agent_{user?.username}</h3>
                <Badge variant="outline" className="bg-purple-600/10 text-purple-400 border-purple-500/20 font-black uppercase tracking-[0.2em] text-[8px] italic">
                  Operational_Status: ACTIVE
                </Badge>
              </div>

              <div className="space-y-4 pt-8 border-t border-white/5">
                {[
                  { label: "Sync Rate", value: "99.9%", icon: Activity, color: "text-purple-400" },
                  { label: "Neural Tier", value: "Level 4", icon: Shield, color: "text-blue-400" },
                  { label: "Active Nodes", value: "14", icon: Cpu, color: "text-emerald-400" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center space-x-3">
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</span>
                    </div>
                    <span className="text-xs font-black italic">{stat.value}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={logout}
                variant="ghost"
                className="w-full mt-8 h-12 rounded-xl border border-white/5 hover:bg-red-500/10 hover:text-red-400 font-black uppercase tracking-widest text-[10px] transition-all"
              >
                <LogOut className="mr-3 h-4 w-4" />
                De-authorize Session
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} width="100%">
            <div className="glass-morphism rounded-[2.5rem] p-8 border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-6 italic ml-2">Neural_Gateways</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Calendar, label: "Events", path: "/events" },
                  { icon: Package, label: "Found", path: "/lost-and-found" },
                  { icon: Globe, label: "Portal", path: "/" },
                  { icon: MessageSquare, label: "Core", path: "/dashboard" },
                ].map((link, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group text-center"
                    onClick={() => window.location.href = link.path}
                  >
                    <link.icon className="h-6 w-6 mx-auto mb-2 text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{link.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </aside>

        {/* Main Content - Chat Interface */}
        <main className="flex-1 flex flex-col gap-6">
          <ScrollReveal delay={0.2} width="100%" className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 glass-morphism rounded-[3rem] border-white/5 flex flex-col overflow-hidden relative group/chat min-h-0">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01] shrink-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-purple-600/20 rounded-full blur-lg animate-pulse" />
                    <div className="relative p-3 rounded-2xl bg-purple-600/10 border border-purple-500/20">
                      <Bot className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tighter italic">Campus_Sathi_Core</h2>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-500">Neural Lattice Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-white/5 hover:bg-white/10 text-white border-white/10 backdrop-blur-md px-4 py-1.5 font-black uppercase tracking-[0.2em] text-[10px] italic">
                    v2.4.0_Stable
                  </Badge>
                  <div className="p-3 cursor-pointer hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/10">
                    <Command className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide min-h-0"
              >
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] flex items-start space-x-4 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`p-2 rounded-xl ${msg.role === 'user' ? 'bg-purple-600' : 'bg-white/5 border border-white/10'}`}>
                          {msg.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-purple-400" />}
                        </div>
                        <div className={`p-6 rounded-[2rem] ${msg.role === 'user'
                          ? 'bg-purple-600 text-white shadow-2xl shadow-purple-900/20 rounded-tr-none'
                          : 'glass-morphism border-white/10 text-gray-100 rounded-tl-none'
                          }`}>
                          <p className="text-sm font-medium leading-relaxed tracking-wide">
                            {msg.content}
                          </p>
                          <div className={`mt-3 text-[8px] font-black uppercase tracking-widest ${msg.role === 'user' ? 'text-white/50' : 'text-gray-500'}`}>
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                          <Bot className="h-4 w-4 text-purple-400" />
                        </div>
                        <div className="glass-morphism border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                          <div className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-bounce" />
                          <div className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input Area */}
              <div className="p-8 bg-white/[0.01] border-t border-white/5 shrink-0">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2rem] opacity-0 group-focus-within:opacity-20 blur transition-opacity" />
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="ENTER NEURAL COMMAND..."
                    className="h-20 rounded-[2rem] bg-white/[0.02] border-white/10 focus:border-purple-500/50 pl-20 pr-32 text-lg font-medium transition-all"
                  />
                  <div className="absolute left-8 top-1/2 -translate-y-1/2">
                    <Zap className="h-6 w-6 text-purple-400 opacity-50 group-focus-within:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="h-14 px-8 rounded-2xl bg-white text-black hover:bg-purple-600 hover:text-white font-black uppercase tracking-widest text-xs transition-all duration-500"
                    >
                      INITIALIZE <ArrowRight className="ml-3 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center space-x-6 text-[8px] font-black uppercase tracking-[0.4em] text-gray-600">
                  <span>Press ENTER for Burst Transmission</span>
                  <div className="h-1 w-1 bg-gray-700 rounded-full" />
                  <span>Neural Encryption Active</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Actions / Integration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
            <ScrollReveal delay={0.3} width="100%">
              <div className="glass-morphism rounded-[2.5rem] p-8 border-white/5 flex items-center justify-between group cursor-pointer hover:border-purple-500/30 transition-all">
                <div className="flex items-center space-x-6">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all">
                    <FileUp className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tighter mb-1">Neural_Sync</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Upload documents for analysis</p>
                  </div>
                </div>
                <ArrowRight className="h-6 w-6 text-gray-500 group-hover:text-white group-hover:translate-x-2 transition-all" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} width="100%">
              <div className="glass-morphism rounded-[2.5rem] p-8 border-white/5 flex items-center justify-between group cursor-pointer hover:border-blue-500/30 transition-all">
                <div className="flex items-center space-x-6">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
                    <Sparkles className="h-8 w-8 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tighter mb-1">Smart_Filters</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Customize operational view</p>
                  </div>
                </div>
                <ArrowRight className="h-6 w-6 text-gray-500 group-hover:text-white group-hover:translate-x-2 transition-all" />
              </div>
            </ScrollReveal>
          </div>
        </main>
      </div>
    </div>
  );
};