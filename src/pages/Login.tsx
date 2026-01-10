import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, ArrowRight, Eye, EyeOff, Shield, User, Lock, ArrowLeft, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';

export const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [userUsername, setUserUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  const handleAuth = async (type: 'admin' | 'user') => {
    setError('');
    setIsLoading(true);
    const username = type === 'admin' ? adminUsername : userUsername;
    const password = type === 'admin' ? adminPassword : userPassword;

    await new Promise(r => setTimeout(r, 1500));

    if (login(username, password)) {
      navigate(type === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError("AUTHENTICATION_FAILURE: INVALID_CREDENTIALS");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30 relative overflow-hidden flex flex-col items-center justify-center p-6 font-sans">
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

      <Link to="/" className="absolute top-12 left-12 z-50 group flex items-center space-x-4 text-white/50 hover:text-white transition-all duration-500">
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Return to Nexus</span>
      </Link>

      <ScrollReveal>
        <div className="relative z-10 w-full max-w-2xl">
          <div className="text-center mb-16 px-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, type: "spring" }}
              className="relative inline-block mb-10"
            >
              <div className="absolute -inset-12 bg-purple-600/20 rounded-full blur-[80px] animate-pulse" />
              <div className="relative p-8 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl">
                <Brain className="h-14 w-14 text-purple-400" />
              </div>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-[0.8] uppercase italic">
              Access<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-800">Portal.</span>
            </h1>
            <p className="text-gray-500 font-bold tracking-[0.4em] uppercase text-[10px]">Initialize Identity Verification Sequence</p>
          </div>

          <Tabs defaultValue="student" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white/[0.03] border border-white/5 rounded-3xl h-20 p-2 backdrop-blur-xl shadow-2xl">
                <TabsTrigger value="student" className="rounded-2xl px-12 h-full font-black uppercase tracking-[0.2em] text-[10px] data-[state=active]:bg-white data-[state=active]:text-black transition-all duration-700">Student_Protocol</TabsTrigger>
                <TabsTrigger value="admin" className="rounded-2xl px-12 h-full font-black uppercase tracking-[0.2em] text-[10px] data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all duration-700">Admin_Override</TabsTrigger>
              </TabsList>
            </div>

            <Card className="glass-morphism rounded-[3rem] overflow-hidden group transition-all duration-700 hover:border-purple-500/30">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] -mr-[200px] -mt-[200px] pointer-events-none group-hover:bg-purple-600/10 transition-all duration-1000" />

              <TabsContent value="student" className="p-10 md:p-14 relative z-10 m-0">
                <form onSubmit={(e) => { e.preventDefault(); handleAuth('user'); }} className="space-y-10">
                  <div className="space-y-4">
                    <Label className="text-[10px] uppercase tracking-[0.5em] font-black text-gray-500 ml-6 italic">Identity Coordinate</Label>
                    <div className="relative group/input">
                      <User className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-white/20 group-focus-within/input:text-purple-400 transition-colors" />
                      <Input
                        value={userUsername}
                        onChange={(e) => setUserUsername(e.target.value)}
                        placeholder="ENTER USERNAME"
                        className="h-20 rounded-[2rem] bg-white/[0.03] border-white/10 focus:border-purple-500/50 text-xl px-20 font-medium tracking-wide transition-all duration-500 placeholder:text-white/10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[10px] uppercase tracking-[0.5em] font-black text-gray-500 ml-6 italic">Neural Passkey</Label>
                    <div className="relative group/input">
                      <Lock className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-white/20 group-focus-within/input:text-purple-400 transition-colors" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="h-20 rounded-[2rem] bg-white/[0.03] border-white/10 focus:border-purple-500/50 text-xl px-20 font-medium tracking-wide transition-all duration-500 placeholder:text-white/10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/5"
                      >
                        {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center space-x-3"
                      >
                        <Shield className="h-4 w-4 text-red-400" />
                        <p className="text-red-400 text-[10px] font-black uppercase tracking-[0.3em]">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button disabled={isLoading} className="h-24 w-full rounded-[2.5rem] bg-white text-black hover:bg-purple-600 hover:text-white font-black text-2xl uppercase tracking-[0.2em] group transition-all duration-700 overflow-hidden relative shadow-3xl">
                    <div className="relative z-10 flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <div className="h-8 w-8 border-4 border-black border-t-transparent group-hover:border-white group-hover:border-t-transparent rounded-full animate-spin mr-6" />
                          <span>SYNCHRONIZING...</span>
                        </>
                      ) : (
                        <>
                          <span>INITIALIZE ACCESS</span>
                          <ArrowRight className="ml-6 h-8 w-8 group-hover:translate-x-4 transition-transform duration-700" />
                        </>
                      )}
                    </div>
                    {!isLoading && <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin" className="p-10 md:p-14 relative z-10 m-0">
                <form onSubmit={(e) => { e.preventDefault(); handleAuth('admin'); }} className="space-y-10">
                  <div className="space-y-4">
                    <Label className="text-[10px] uppercase tracking-[0.5em] font-black text-gray-500 ml-6 italic">Secure Admin Key</Label>
                    <div className="relative group/input">
                      <Shield className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-white/20 group-focus-within/input:text-purple-400 transition-colors" />
                      <Input
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        placeholder="ADMIN_IDENTIFIER"
                        className="h-20 rounded-[2rem] bg-white/[0.03] border-white/10 focus:border-purple-500/50 text-xl px-20 font-medium tracking-wide transition-all duration-500 placeholder:text-white/10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[10px] uppercase tracking-[0.5em] font-black text-gray-500 ml-6 italic">Root Authorization</Label>
                    <div className="relative group/input">
                      <Lock className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-white/20 group-focus-within/input:text-purple-400 transition-colors" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="h-20 rounded-[2rem] bg-white/[0.03] border-white/10 focus:border-purple-500/50 text-xl px-20 font-medium tracking-wide transition-all duration-500 placeholder:text-white/10"
                        required
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center space-x-3">
                        <Shield className="h-4 w-4 text-red-400" />
                        <p className="text-red-400 text-[10px] font-black uppercase tracking-[0.3em]">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button disabled={isLoading} className="h-24 w-full rounded-[2.5rem] bg-purple-600 text-white hover:bg-white hover:text-black font-black text-2xl uppercase tracking-[0.2em] group transition-all duration-700 overflow-hidden relative shadow-2xl">
                    <div className="relative z-10 flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <div className="h-8 w-8 border-4 border-white border-t-transparent group-hover:border-black group-hover:border-t-transparent rounded-full animate-spin mr-6" />
                          <span>AUTHORIZING...</span>
                        </>
                      ) : (
                        <>
                          <span>ADMIN_OVERRIDE</span>
                          <Zap className="ml-6 h-8 w-8 group-hover:scale-125 transition-transform duration-700" />
                        </>
                      )}
                    </div>
                  </Button>
                </form>
              </TabsContent>
            </Card>
          </Tabs>

          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mt-16 text-center text-gray-600 text-[10px] font-black uppercase tracking-[0.8em]"
          >
            Institutional Gateway • Neural Encryption Active • v2.4.0
          </motion.div>
        </div>
      </ScrollReveal>

      {/* Decorative Sidebar Visuals */}
      <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.02] rounded-full opacity-0 lg:opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-[-5%] -translate-y-1/2 w-[600px] h-[600px] border border-purple-500/[0.02] rounded-full opacity-0 lg:opacity-10 pointer-events-none" />
    </div>
  );
};
