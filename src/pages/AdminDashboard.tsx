import { useState } from 'react';
import { useData, InstitutionalData } from '@/contexts/DataContext';
import { useLanguage } from '@/hooks/useLanguage';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, FileText, AlertCircle, HelpCircle, MessageSquare, Shield, Activity, Database, Sparkles, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';

export const AdminDashboard = () => {
  const { t } = useLanguage();
  const { institutionalData, addInstitutionalData, updateInstitutionalData, deleteInstitutionalData, chatMessages } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InstitutionalData | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '', type: 'notice' as 'circular' | 'notice' | 'faq' });

  const resetForm = () => { setFormData({ title: '', content: '', type: 'notice' }); setEditingItem(null); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateInstitutionalData(editingItem.id, formData);
      toast({ title: "Update Success", description: "Knowledge vector re-indexed successfully." });
    } else {
      addInstitutionalData(formData);
      toast({ title: "Entry Verified", description: "New intelligence node added to knowledge base." });
    }
    resetForm(); setIsDialogOpen(false);
  };

  const handleEdit = (item: InstitutionalData) => {
    setEditingItem(item);
    setFormData({ title: item.title, content: item.content, type: item.type });
    setIsDialogOpen(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'circular': return <FileText className="h-4 w-4" />;
      case 'notice': return <AlertCircle className="h-4 w-4" />;
      case 'faq': return <HelpCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const userQueries = chatMessages.filter(msg => msg.isUser);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      <Navigation />

      <div className="max-w-[1600px] mx-auto px-6 pt-40 pb-20">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Shield className="h-3 w-3 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">System Override Active</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic">
                Control <span className="text-primary">Center.</span>
              </h1>
            </div>
            <div className="flex space-x-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { resetForm(); setIsDialogOpen(true); }} className="h-16 px-8 rounded-2xl bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest text-xs">
                    <Plus className="h-4 w-4 mr-2" /> {t.addNew}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-black/90 border-white/10 backdrop-blur-2xl text-white rounded-[2rem] p-10">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter">{editingItem ? 'Modify Node' : 'Initialize Node'}</DialogTitle>
                    <DialogDescription className="text-white/40 font-light">Update the core knowledge vector for the AI assistant.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest font-black text-white/40 ml-2">Node Title</Label>
                        <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="h-14 bg-white/5 border-white/10 rounded-xl" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest font-black text-white/40 ml-2">Node Type</Label>
                        <Select value={formData.type} onValueChange={(v: any) => setFormData({ ...formData, type: v })}>
                          <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-xl"><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-black border-white/10 text-white">
                            <SelectItem value="circular">Circular</SelectItem>
                            <SelectItem value="notice">Notice</SelectItem>
                            <SelectItem value="faq">FAQ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest font-black text-white/40 ml-2">Vector Content</Label>
                      <Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="bg-white/5 border-white/10 rounded-2xl p-6 resize-none" rows={8} required />
                    </div>
                    <Button type="submit" className="w-full h-16 rounded-xl bg-primary text-white font-black uppercase tracking-widest">Update Intelligence Hub</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </ScrollReveal>

        {/* Dynamic Matrix Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { label: "Total Vectors", value: institutionalData.length, icon: Database, color: "text-blue-400" },
            { label: "Neural Inquiries", value: userQueries.length, icon: Activity, color: "text-primary" },
            { label: "Matrix Sync", value: "98.4%", icon: Sparkles, color: "text-emerald-400" },
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group overflow-hidden relative">
                <div className={`absolute top-0 right-0 p-10 opacity-10 transition-transform group-hover:scale-110 ${stat.color}`}>
                  <stat.icon className="h-24 w-24" />
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 block mb-4">{stat.label}</span>
                  <div className="text-6xl font-black italic tracking-tighter">{stat.value}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <ScrollReveal>
              <Card className="bg-white/[0.03] border-white/10 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-10 border-b border-white/5">
                  <CardTitle className="text-2xl font-black italic uppercase tracking-tighter">Intelligence Hub Management</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-white/5">
                    {institutionalData.map((item) => (
                      <div key={item.id} className="p-8 hover:bg-white/[0.02] transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-start space-x-6">
                          <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-primary/20 transition-colors">
                            {getTypeIcon(item.type)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-bold">{item.title}</h3>
                              <Badge className="bg-white/5 text-[8px] font-black uppercase tracking-widest border-white/10 group-hover:bg-primary/20">{item.type}</Badge>
                            </div>
                            <p className="text-white/40 text-sm font-light leading-relaxed max-w-xl line-clamp-2">{item.content}</p>
                          </div>
                        </div>
                        <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="h-12 w-12 rounded-xl border border-white/10 hover:bg-white/5"><Edit2 className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteInstitutionalData(item.id)} className="h-12 w-12 rounded-xl border border-white/10 hover:bg-red-500/10 hover:text-red-400 group/del"><Trash2 className="h-4 w-4 group-hover/del:scale-110 transition-transform" /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <ScrollReveal direction="right">
              <Card className="bg-white/[0.03] border-white/10 rounded-[2.5rem] p-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-10 italic">Recent System Queries</h3>
                <div className="space-y-6">
                  {userQueries.slice(-5).map((query) => (
                    <div key={query.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                      <p className="text-sm font-light text-white/60 mb-2 truncate">{query.content}</p>
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/20">{new Date(query.timestamp).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 flex flex-col items-center text-center">
                <Activity className="h-12 w-12 text-primary mb-6" />
                <h4 className="text-xl font-black italic uppercase tracking-tighter mb-4">System Integrity</h4>
                <p className="text-white/40 text-xs font-light tracking-wide leading-loose">Matrix sync is running at peak biological efficiency. All knowledge vectors are currently prioritized for context-retrieval.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};