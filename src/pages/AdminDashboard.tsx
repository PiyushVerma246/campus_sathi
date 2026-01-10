import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Plus, Trash2, Edit2, LayoutDashboard, Users, MessageSquare, Database, Activity, Shield, Zap, Cpu, Sparkles, ArrowRight, Bot, Command, Search, Clock } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { ScrollReveal } from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

interface CampusData {
  id: number;
  title: string;
  content: string;
  category: string;
  updatedAt: string;
}

const initialData: CampusData[] = [
  { id: 1, title: "Library Hours", content: "Mon-Fri: 8AM-10PM, Sat-Sun: 10AM-6PM", category: "Facilities", updatedAt: "2024-03-10" },
  { id: 2, title: "Academic Calendar", content: "Spring Break starts March 15th. Exam week begins May 1st.", category: "Academic", updatedAt: "2024-03-08" },
  { id: 3, title: "Hostel Regulations", content: "Curfew: 10:00 PM. Visitors allowed until 8:00 PM.", category: "Administration", updatedAt: "2024-03-12" }
];

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState<CampusData[]>(initialData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CampusData | null>(null);
  const [newData, setNewData] = useState({ title: '', content: '', category: 'General' });

  if (user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleAdd = () => {
    const item: CampusData = {
      id: data.length + 1,
      ...newData,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setData([...data, item]);
    setIsAddDialogOpen(false);
    setNewData({ title: '', content: '', category: 'General' });
  };

  const handleEdit = (item: CampusData) => {
    setEditingItem(item);
    setNewData({ title: item.title, content: item.content, category: item.category });
    setIsAddDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!editingItem) return;
    const updatedData = data.map(item =>
      item.id === editingItem.id
        ? { ...item, ...newData, updatedAt: new Date().toISOString().split('T')[0] }
        : item
    );
    setData(updatedData);
    setIsAddDialogOpen(false);
    setEditingItem(null);
    setNewData({ title: '', content: '', category: 'General' });
  };

  const handleDelete = (id: number) => {
    setData(data.filter(item => item.id !== id));
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

      <div className="relative z-10 pt-32 px-6 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <ScrollReveal width="100%">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="absolute -inset-4 bg-purple-600/20 rounded-full blur-xl animate-pulse" />
                  <div className="relative p-5 rounded-3xl bg-purple-600/10 border border-purple-500/20">
                    <LayoutDashboard className="h-10 w-10 text-purple-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Central <span className="text-purple-400">Command.</span></h1>
                  <div className="flex items-center space-x-3 mt-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500 animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Root Matrix Authorized v2.4.0</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1} width="100%">
              <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                setIsAddDialogOpen(open);
                if (!open) {
                  setEditingItem(null);
                  setNewData({ title: '', content: '', category: 'General' });
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-purple-600 hover:text-white font-black uppercase tracking-widest text-sm transition-all duration-500 shadow-3xl">
                    <Plus className="mr-3 h-5 w-5" />
                    Inject Data Node
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-[#0a0a0f]/95 border-white/10 backdrop-blur-3xl text-white rounded-[2.5rem] p-10">
                  <DialogHeader className="mb-8">
                    <DialogTitle className="text-4xl font-black italic tracking-tighter uppercase mb-2">
                      {editingItem ? 'Update' : 'Initialize'} <span className="text-purple-400">Node.</span>
                    </DialogTitle>
                    <DialogDescription className="text-gray-500 font-bold tracking-widest text-[10px] uppercase">MODERATING INSTITUTIONAL INTELLIGENCE MATRIX</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <Label className="uppercase text-[10px] font-black tracking-widest text-gray-500 ml-2">Node Title</Label>
                      <Input
                        placeholder="e.g. Semester Registration"
                        value={newData.title}
                        onChange={(e) => setNewData({ ...newData, title: e.target.value })}
                        className="bg-white/[0.03] border-white/10 h-14 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="uppercase text-[10px] font-black tracking-widest text-gray-500 ml-2">Classification</Label>
                      <select
                        className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none"
                        value={newData.category}
                        onChange={(e) => setNewData({ ...newData, category: e.target.value })}
                      >
                        <option value="General">GENERAL_LEVEL</option>
                        <option value="Facilities">FACILITY_NODE</option>
                        <option value="Academic">ACADEMIC_STREAM</option>
                        <option value="Administration">ADMIN_PROTOCOL</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="uppercase text-[10px] font-black tracking-widest text-gray-500 ml-2">Neural Payload (Content)</Label>
                      <Textarea
                        placeholder="Input the core data stream here..."
                        value={newData.content}
                        onChange={(e) => setNewData({ ...newData, content: e.target.value })}
                        className="bg-white/[0.03] border-white/10 min-h-[150px] rounded-xl"
                      />
                    </div>
                    <Button
                      onClick={editingItem ? handleUpdate : handleAdd}
                      className="w-full h-16 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest transition-all"
                    >
                      {editingItem ? 'Commit Changes' : 'Execute Injection'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </ScrollReveal>
          </div>

          {/* Matrix Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { label: "Active Agents", value: "1,248", icon: Users, color: "text-purple-400", change: "+12%" },
              { label: "Neural Queries", value: "43.2K", icon: MessageSquare, color: "text-blue-400", change: "+18%" },
              { label: "Data Cubes", value: "154", icon: Database, color: "text-emerald-400", change: "+5" },
              { label: "System Uptime", value: "99.99%", icon: Activity, color: "text-orange-400", change: "STABLE" }
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1} width="100%">
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-morphism p-8 rounded-[2.5rem] border-white/5 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <stat.icon className="h-24 w-24" />
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/5`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${stat.change.includes('+') ? 'text-emerald-400' : 'text-blue-400'}`}>{stat.change}</span>
                  </div>
                  <div className="text-4xl font-black mb-1 italic">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{stat.label}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Intelligence Hub Management (Institutional Data) */}
            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal width="100%">
                <div className="flex items-center justify-between mb-8 ml-2">
                  <div className="flex items-center space-x-3">
                    <Cpu className="h-5 w-5 text-purple-400" />
                    <h2 className="text-2xl font-black uppercase tracking-tighter italic">Intelligence Hub</h2>
                  </div>
                  <div className="relative w-64 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                    <Input placeholder="SEARCH CLUSTERS..." className="bg-white/[0.03] border-white/10 h-10 pl-10 rounded-xl text-[10px] font-black uppercase tracking-widest" />
                  </div>
                </div>
              </ScrollReveal>

              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {data.map((item, index) => (
                    <ScrollReveal key={item.id} delay={index * 0.1} width="100%">
                      <motion.div
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        whileHover={{ scale: 1.01 }}
                        className="glass-morphism rounded-[2rem] border-white/5 p-8 flex flex-col md:flex-row items-center justify-between gap-8 group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <Badge className="bg-purple-600/10 text-purple-400 border-purple-500/20 font-black uppercase tracking-widest text-[8px] italic px-3">
                              {item.category.toUpperCase()}
                            </Badge>
                            <span className="text-[8px] font-black uppercase tracking-widest text-gray-600 flex items-center">
                              <Clock className="h-3 w-3 mr-2" />
                              SYNC_DATE: {item.updatedAt}
                            </span>
                          </div>
                          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 group-hover:text-purple-400 transition-colors italic">{item.title}</h3>
                          <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-2xl">{item.content}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button
                            onClick={() => handleEdit(item)}
                            variant="ghost"
                            className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all p-0"
                          >
                            <Edit2 className="h-5 w-5" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(item.id)}
                            variant="ghost"
                            className="h-12 w-12 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all p-0"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Neural Query Stream */}
            <div className="space-y-8">
              <ScrollReveal delay={0.3} width="100%">
                <div className="flex items-center space-x-3 mb-8 ml-2">
                  <Bot className="h-5 w-5 text-purple-400" />
                  <h2 className="text-2xl font-black uppercase tracking-tighter italic">Neural Stream</h2>
                </div>
                <div className="glass-morphism rounded-[2.5rem] border-white/10 p-8 h-[600px] flex flex-col">
                  <div className="flex-1 space-y-8 overflow-y-auto scrollbar-hide min-h-0">
                    {[
                      { user: "Agent_Viper", query: "Library availability status?", time: "2m ago", status: "Resolved" },
                      { user: "Agent_Nebula", query: "Scholarship vector guidelines?", time: "5m ago", status: "Redirected" },
                      { user: "Agent_Solar", query: "Hostel portal access issues.", time: "12m ago", status: "Pending" },
                      { user: "Agent_Void", query: "Exam schedule synchronization.", time: "15m ago", status: "Resolved" },
                      { user: "Agent_Nova", query: "Canteen matrix updates.", time: "22m ago", status: "Resolved" },
                    ].map((query, i) => (
                      <div key={i} className="relative pl-6 border-l-2 border-purple-500/20 group cursor-pointer hover:border-purple-500 transition-colors">
                        <div className="absolute left-[-5px] top-0 h-2 w-2 rounded-full bg-purple-500" />
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white italic">{query.user}</span>
                          <span className="text-[8px] font-bold text-gray-500 uppercase">{query.time}</span>
                        </div>
                        <p className="text-xs text-gray-400 font-medium mb-3 group-hover:text-white transition-colors">"{query.query}"</p>
                        <div className="flex items-center justify-between">
                          <Badge className={`bg-transparent border-0 p-0 text-[8px] font-black uppercase tracking-[0.2em] ${query.status === 'Resolved' ? 'text-emerald-400' : query.status === 'Pending' ? 'text-orange-400' : 'text-blue-400'}`}>
                            STATUS_{query.status.toUpperCase()}
                          </Badge>
                          <ArrowRight className="h-3 w-3 text-gray-700 group-hover:text-purple-400 transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/5 text-center">
                    <Button variant="ghost" className="w-full text-gray-500 hover:text-white font-black uppercase tracking-widest text-[10px] h-10">
                      View Operational Logs
                    </Button>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4} width="100%">
                <div className="glass-morphism rounded-[2.5rem] p-8 border-white/5 bg-gradient-to-br from-purple-600/10 to-blue-600/10 relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 opacity-[0.05] group-hover:rotate-12 transition-transform duration-1000">
                    <Shield className="h-32 w-32" />
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Security Matrix</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed mb-6">ALL DATA INJECTIONS ARE LOGGED AND AUDITED THROUGH NEURAL ENCRYPTION CHANNELS.</p>
                  <div className="flex items-center space-x-3 text-emerald-400">
                    <Shield className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Protection Level: MAX</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};