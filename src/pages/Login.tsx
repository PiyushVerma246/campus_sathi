import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, ArrowRight, Eye, EyeOff, Sparkles, Shield, User, Lock, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroCanvas } from '@/components/HeroCanvas';
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

    await new Promise(r => setTimeout(r, 1000));

    if (login(username, password)) {
      navigate(type === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError("Authorization Failed. Invalid Credentials.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 relative overflow-hidden flex flex-col items-center justify-center p-6">
      <HeroCanvas />

      {/* Background Mask */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-0" />

      <Link to="/" className="absolute top-12 left-12 z-50 group flex items-center space-x-2 text-white/50 hover:text-white transition-colors">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return to Nexus</span>
      </Link>

      <ScrollReveal>
        <div className="relative z-10 w-full max-w-xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, type: "spring" }}
              className="inline-block p-4 rounded-[2rem] bg-primary/20 border border-primary/30 mb-8"
            >
              <Brain className="h-12 w-12 text-primary" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-none uppercase">
              Access<br />
              <span className="text-primary italic">Portal.</span>
            </h1>
            <p className="text-white/40 font-light tracking-widest uppercase text-xs">Initialize Digital Identity Verification</p>
          </div>

          <Tabs defaultValue="student" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white/5 border border-white/10 rounded-full h-14 p-1">
                <TabsTrigger value="student" className="rounded-full px-8 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-white">Student</TabsTrigger>
                <TabsTrigger value="admin" className="rounded-full px-8 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-white">Admin</TabsTrigger>
              </TabsList>
            </div>

            <Card className="bg-white/[0.03] border-white/10 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-primary/10" />

              <TabsContent value="student" className="p-10 md:p-12 relative z-10">
                <form onSubmit={(e) => { e.preventDefault(); handleAuth('user'); }} className="space-y-8">
                  <div className="space-y-4">
                    <Label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 ml-4">Credential Identity</Label>
                    <div className="relative">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
                      <Input
                        value={userUsername}
                        onChange={(e) => setUserUsername(e.target.value)}
                        placeholder="Username"
                        className="h-16 rounded-2xl bg-white/[0.05] border-white/10 focus:border-primary/50 text-lg px-16 group/input"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 ml-4">Neural Key</Label>
                    <div className="relative">
                      <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder="••••••••"
                        className="h-16 rounded-2xl bg-white/[0.05] border-white/10 focus:border-primary/50 text-lg px-16"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs font-black uppercase tracking-widest text-center">{error}</motion.p>
                  )}

                  <Button disabled={isLoading} className="h-20 w-full rounded-2xl bg-white text-black hover:bg-white/90 font-black text-xl uppercase tracking-widest group transition-all duration-500 overflow-hidden relative">
                    <span className="relative z-10 flex items-center">
                      {isLoading ? "VERIFYING..." : "INITIALIZE ACCESS"}
                      {!isLoading && <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform duration-500" />}
                    </span>
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin" className="p-10 md:p-12 relative z-10">
                <form onSubmit={(e) => { e.preventDefault(); handleAuth('admin'); }} className="space-y-8">
                  <div className="space-y-4">
                    <Label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 ml-4">Admin Identifier</Label>
                    <div className="relative">
                      <Shield className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
                      <Input
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        placeholder="Administrator"
                        className="h-16 rounded-2xl bg-white/[0.05] border-white/10 focus:border-primary/50 text-lg px-16"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 ml-4">Secure Passkey</Label>
                    <div className="relative">
                      <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="••••••••"
                        className="h-16 rounded-2xl bg-white/[0.05] border-white/10 focus:border-primary/50 text-lg px-16"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs font-black uppercase tracking-widest text-center">{error}</p>
                  )}

                  <Button disabled={isLoading} className="h-20 w-full rounded-2xl bg-primary text-white hover:bg-primary/90 font-black text-xl uppercase tracking-widest group transition-all duration-500 overflow-hidden relative">
                    <span className="relative z-10 flex items-center">
                      {isLoading ? "AUTHORIZING..." : "ADMIN LOGIN"}
                      {!isLoading && <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform duration-500" />}
                    </span>
                  </Button>
                </form>
              </TabsContent>
            </Card>
          </Tabs>

          <div className="mt-12 text-center text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">
            Institutional Access Only • Secured by Campus_Sathi Core
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
