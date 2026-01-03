import { useState, useRef, useEffect } from 'react';
import { useData, ChatMessage } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { Navigation } from '@/components/Navigation';
import { UserProfile } from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Send, Upload, MessageSquare, Bot, User, FileText, UserCircle, Paperclip, History, Trash2, ArrowRight, Sparkles, Layout } from 'lucide-react';
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
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ id: string, name: string, size: number, type: string, uploadDate: Date, content?: string }>>([]);
  const [chatHistory, setChatHistory] = useState<Array<{ id: string, title: string, messages: ChatMessage[], date: Date }>>([]);
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
      const newFile = { id: Date.now().toString() + Math.random().toString(36).substr(2, 9), name: file.name, size: file.size, type: file.type, uploadDate: new Date() };
      setUploadedFiles(prev => [...prev, newFile]);
      toast({ title: "Neural Sync Complete", description: `${file.name} is now part of the knowledge base.` });
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navigation />

      <div className="max-w-[1600px] mx-auto px-6 pt-24 pb-4">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
                <Layout className="h-3 w-3 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Workspace Active</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic">
                {t.welcomeBack}, <span className="text-primary">{user?.username}</span>
              </h1>
            </div>
            <div className="text-right">
              <p className="text-foreground/40 text-xs font-light uppercase tracking-widest leading-loose">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <Tabs defaultValue="chat" className="w-full">
          <ScrollReveal delay={0.1}>
            <TabsList className="bg-foreground/5 border border-foreground/10 rounded-2xl h-12 p-1 mb-6 flex justify-start overflow-x-auto no-scrollbar">
              <TabsTrigger value="chat" className="rounded-xl px-6 font-black uppercase tracking-widest text-xs data-[state=active]:bg-background data-[state=active]:text-foreground text-foreground/60 hover:text-foreground transition-all">Chat</TabsTrigger>
              <TabsTrigger value="history" className="rounded-xl px-6 font-black uppercase tracking-widest text-xs data-[state=active]:bg-background data-[state=active]:text-foreground text-foreground/60 hover:text-foreground transition-all">History</TabsTrigger>
              <TabsTrigger value="files" className="rounded-xl px-6 font-black uppercase tracking-widest text-xs data-[state=active]:bg-background data-[state=active]:text-foreground text-foreground/60 hover:text-foreground transition-all">Files</TabsTrigger>
              <TabsTrigger value="profile" className="rounded-xl px-6 font-black uppercase tracking-widest text-xs data-[state=active]:bg-background data-[state=active]:text-foreground text-foreground/60 hover:text-foreground transition-all">Profile</TabsTrigger>
            </TabsList>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <TabsContent value="chat" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Main Chat Hub */}
                <div className="lg:col-span-8">
                  <Card className="h-[calc(100vh-220px)] min-h-[500px] flex flex-col bg-foreground/[0.02] border-foreground/10 backdrop-blur-3xl rounded-[2rem] shadow-2xl overflow-hidden group">
                    <CardHeader className="bg-foreground/[0.03] border-b border-foreground/10 py-6 px-10 flex flex-row items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/20 rounded-2xl">
                          <Bot className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-black tracking-tighter">Campus_Sathi Core</CardTitle>
                          <span className="text-[10px] text-primary font-black uppercase tracking-widest">Active Processing</span>
                        </div>
                      </div>
                      <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-foreground" onClick={() => setUserMessages([])}>Reset Hub</Button>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                      <ScrollArea className="flex-1 px-10 py-10" ref={scrollAreaRef}>
                        <div className="space-y-6">
                          {userMessages.length === 0 && (
                            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                              <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
                                <Sparkles className="h-20 w-20 text-primary mb-8 animate-pulse relative z-10" />
                              </div>
                              <h3 className="text-3xl font-black text-foreground/20 uppercase tracking-tighter italic">Initialize neural gateway</h3>
                              <p className="text-foreground/10 text-sm mt-4 uppercase tracking-[0.3em] font-bold">Awaiting Input Vector</p>
                            </div>
                          )}

                          {userMessages.map((msg, idx) => (
                            <motion.div
                              key={msg.id}
                              initial={{ opacity: 0, y: 10, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`relative max-w-[85%] group ${msg.isUser ? 'order-2' : ''}`}>
                                <div className={`p-6 rounded-[2rem] text-lg font-light leading-relaxed backdrop-blur-3xl transition-all duration-300 ${msg.isUser
                                  ? 'bg-gradient-to-br from-primary to-primary-hover text-primary-foreground rounded-tr-none shadow-[0_10px_30px_-10px_rgba(var(--primary),0.5)]'
                                  : 'bg-foreground/[0.03] border border-foreground/10 text-foreground/90 rounded-tl-none shadow-2xl hover:bg-foreground/[0.05]'
                                  }`}>
                                  {msg.content}
                                  <div className={`mt-4 text-[9px] font-black uppercase tracking-[0.2em] opacity-30 flex items-center ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                                    {msg.isUser ? <User className="h-3 w-3 mr-1" /> : <Bot className="h-3 w-3 mr-1" />}
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}

                          {isTyping && (
                            <div className="flex justify-start">
                              <div className="bg-foreground/[0.03] border border-foreground/10 p-6 rounded-[2rem] rounded-tl-none shadow-xl backdrop-blur-sm">
                                <span className="flex space-x-2">
                                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </ScrollArea>

                      <div className="p-6 md:p-8 bg-foreground/[0.04] border-t border-foreground/10 backdrop-blur-xl">
                        <form onSubmit={handleSendMessage} className="flex items-center space-x-4 max-w-5xl mx-auto">
                          <div className="relative flex-1 group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-[2rem] blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-focus-within:duration-200" />
                            <div className="relative flex items-center bg-background border border-foreground/10 rounded-[2rem] focus-within:border-primary/50 transition-all px-6 py-2 shadow-lg">
                              <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Quantum Retrieval Request..."
                                className="h-14 md:h-16 border-none bg-transparent focus-visible:ring-0 text-base md:text-lg placeholder:text-foreground/30 px-2"
                                disabled={isTyping}
                              />
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="ml-2 p-2 bg-foreground/5 rounded-2xl text-foreground/40 hover:text-primary hover:bg-primary/10 transition-all"
                              >
                                <Paperclip className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                          <Button
                            type="submit"
                            size="lg"
                            disabled={!message.trim() || isTyping}
                            className="h-14 w-14 md:h-20 md:w-20 rounded-[2rem] bg-foreground text-background hover:bg-primary hover:text-white shadow-2xl transition-all duration-500 hover:rotate-6 active:scale-95 flex-shrink-0"
                          >
                            <Send className="h-6 w-6" />
                          </Button>
                        </form>
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Info Sidestrip */}
                <div className="lg:col-span-4 space-y-8">
                  <ScrollReveal direction="right" delay={0.3}>
                    <Card className="bg-foreground/[0.02] border-foreground/10 rounded-[2.5rem] p-8">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 mb-8 ml-2 italic">Knowledge Matrix</h3>
                      <div className="space-y-4">
                        {["Policy Inquiry", "Resource Allocation", "Exam Schedules", "Campus Events"].map((item, i) => (
                          <button key={i} onClick={() => setMessage(item)} className="w-full text-left p-6 rounded-2xl bg-foreground/[0.02] border border-foreground/5 hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-bold uppercase tracking-widest">{item}</button>
                        ))}
                      </div>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal direction="right" delay={0.4}>
                    <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-transparent border border-primary/20">
                      <Sparkles className="h-10 w-10 text-primary mb-6" />
                      <h4 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Neural Sync v2.0</h4>
                      <p className="text-foreground/40 text-sm font-light leading-relaxed">System is optimized for high-frequency document analysis. Upload PDFs to initialize local context sync.</p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="bg-foreground/[0.02] border-foreground/10 rounded-[2rem] p-6 hover:bg-foreground/[0.04] transition-all cursor-pointer group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-foreground/30">2 days ago</span>
                      </div>
                      <h4 className="text-lg font-bold mb-2">Research Session #{100 + i}</h4>
                      <p className="text-sm text-foreground/50 line-clamp-2">Inquiry regarding advanced quantum mechanics principles and their application in...</p>
                    </Card>
                  ))}
                </div>
              </ScrollReveal>
            </TabsContent>

            <TabsContent value="files">
              <ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="group h-80 rounded-[2.5rem] border-2 border-dashed border-foreground/10 hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center cursor-pointer"
                  >
                    <div className="bg-foreground/5 p-8 rounded-full mb-6 group-hover:scale-110 transition-transform">
                      <Upload className="h-10 w-10 text-foreground/20 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">Transmit New Data</span>
                  </div>
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="h-80 p-10 rounded-[2.5rem] border border-foreground/10 bg-foreground/[0.03] flex flex-col justify-between">
                      <div className="p-4 bg-primary/10 rounded-2xl w-fit">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black tracking-tighter mb-2 truncate">{file.name}</h4>
                        <p className="text-foreground/40 text-[10px] font-black uppercase tracking-widest">Synced: {file.uploadDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </TabsContent>

            <TabsContent value="profile">
              <ScrollReveal>
                <UserProfile />
              </ScrollReveal>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
};