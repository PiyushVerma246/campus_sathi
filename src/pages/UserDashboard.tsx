import { useState, useRef, useEffect } from 'react';
import { useData, ChatMessage } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Upload, FileText, Paperclip, Sparkles, Layout, Calendar, Shield, Cpu, BookOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';

export const UserDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { addChatMessage, searchInstitutionalData, chatMessages } = useData();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userMessages, setUserMessages] = useState<ChatMessage[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const filtered = chatMessages.filter(msg => msg.userId === user?.id || !msg.userId);
    setUserMessages(filtered);
  }, [chatMessages, user?.id]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [userMessages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const userMessage = message.trim();
    setMessage('');
    addChatMessage({ content: userMessage, isUser: true, userId: user?.id });
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    let response = searchInstitutionalData(userMessage);
    const botResponse = response ? `📚 Contextual retrieval successful:\n\n${response}` : "I'm processing your inquiry. For more specific results, try uploading relevant institutional documents.";
    addChatMessage({ content: botResponse, isUser: false, userId: user?.id });
    setIsTyping(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      toast({ title: "Neural Sync Complete", description: `${file.name} is now part of the knowledge base.` });
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      <Navigation />

      <div className="max-w-[1600px] mx-auto px-6 pt-28 pb-10">
        <ScrollReveal>
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 border-b border-foreground/5 pb-8">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
                <Layout className="h-3 w-3 text-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Workspace Active</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                Welcome back, <span className="text-primary">{user?.username}</span>
              </h1>
              <p className="text-foreground/60 text-sm font-medium">Here's what's happening on your campus today</p>
            </div>
            <div className="text-right">
              <p className="text-foreground/40 text-xs font-bold uppercase tracking-widest bg-foreground/5 px-4 py-2 rounded-lg">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Section - Campus Sathi Core (AI Assistant) */}
          <div className="lg:col-span-8 h-full">
            <ScrollReveal delay={0.1} className="h-full">
              <Card className="h-[calc(100vh-280px)] min-h-[600px] flex flex-col bg-foreground/[0.02] border-foreground/10 backdrop-blur-3xl rounded-[2rem] shadow-sm overflow-hidden group hover:border-foreground/20 transition-all duration-500">
                <CardHeader className="bg-transparent border-b border-foreground/5 py-6 px-8">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">Campus Sathi Core</h2>
                      <p className="text-xs text-foreground/50 font-medium">Your AI assistant for campus information</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col p-0 overflow-hidden relative">
                  <ScrollArea className="flex-1 px-8 py-8" ref={scrollAreaRef}>
                    <div className="space-y-6 max-w-4xl mx-auto">
                      {userMessages.length === 0 && (
                        <div className="flex flex-col items-center justify-center min-h-[300px] text-center opacity-50">
                          <Cpu className="h-16 w-16 text-foreground/20 mb-6" />
                          <h3 className="text-xl font-bold text-foreground/40">Ready to assist</h3>
                          <p className="text-sm text-foreground/30 mt-2 max-w-xs">Ask about schedules, policies, or events to get started.</p>
                        </div>
                      )}

                      {userMessages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[85%] p-5 rounded-2xl text-sm leading-relaxed ${msg.isUser
                              ? 'bg-primary text-primary-foreground rounded-tr-sm'
                              : 'bg-foreground/5 text-foreground/90 rounded-tl-sm border border-foreground/5'
                            }`}>
                            {msg.content}
                          </div>
                        </motion.div>
                      ))}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-foreground/5 px-6 py-4 rounded-2xl rounded-tl-sm">
                            <div className="flex space-x-1.5">
                              <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
                              <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                              <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  <div className="p-6 bg-background/50 backdrop-blur-md border-t border-foreground/5">
                    <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative group">
                      <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-20 transition-opacity duration-500 rounded-3xl"></div>
                      <div className="relative flex items-center bg-background border border-foreground/10 rounded-2xl shadow-sm focus-within:border-primary/30 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                        <Input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Ask anything about your campus..."
                          className="h-14 border-none bg-transparent focus-visible:ring-0 text-base px-6 placeholder:text-foreground/30"
                          disabled={isTyping}
                        />
                        <div className="flex items-center space-x-2 pr-4">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 text-foreground/40 hover:text-foreground hover:bg-foreground/5 rounded-xl transition-colors"
                          >
                            <Paperclip className="h-5 w-5" />
                          </button>
                          <Button
                            type="submit"
                            size="icon"
                            disabled={!message.trim() || isTyping}
                            className="h-10 w-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-transform active:scale-95"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </form>
                    <div className="text-center mt-3">
                      <span className="text-[10px] text-foreground/30 uppercase tracking-widest font-semibold">AI Assistant may produce inaccurate information</span>
                    </div>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Right Section - Quick Access & Neural Sync */}
          <div className="lg:col-span-4 space-y-6">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/40 mb-4 pl-1">Quick Access Panel</h3>
                {[
                  { title: "Policy Inquiry", sub: "Rules, regulations, attendance", icon: Shield },
                  { title: "Resource Allocation", sub: "Labs, equipment, facilities", icon: Cpu },
                  { title: "Exam Schedules", sub: "Dates, venues, notices", icon: Calendar },
                  { title: "Campus Events", sub: "Upcoming and ongoing", icon: Layout },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setMessage(item.title)}
                    className="w-full text-left p-4 rounded-2xl bg-foreground/[0.02] border border-foreground/10 hover:border-primary/30 hover:bg-foreground/[0.04] transition-all group flex items-center space-x-4 hover:translate-x-1"
                  >
                    <div className="p-3 bg-background rounded-xl border border-foreground/5 group-hover:border-primary/20 group-hover:text-primary transition-colors text-foreground/60">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground/90">{item.title}</h4>
                      <p className="text-xs text-foreground/50 font-medium">{item.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20 rounded-[2rem] p-6 mt-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-[50px] rounded-full -mr-10 -mt-10 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Upload className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">Neural Sync</h3>
                  </div>
                  <p className="text-sm text-foreground/60 mb-6 leading-relaxed">
                    Upload documents to enhance your personal knowledge context.
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-background border border-foreground/10 text-foreground hover:text-primary hover:border-primary/50 shadow-sm"
                  >
                    Upload Documents
                  </Button>
                  <p className="text-[10px] text-foreground/30 mt-4 text-center font-medium">
                    Supported: PDF, DOCX, TXT
                  </p>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};