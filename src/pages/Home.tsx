import { Button } from '@/components/ui/button';
import { MessageSquare, Shield, User, Zap, Globe, FileText, Users, BookOpen, ArrowRight, Brain, Clock, Lock, Sparkles, Cpu, Fingerprint } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroCanvas } from '@/components/HeroCanvas';
import { ScrollReveal } from '@/components/ScrollReveal';
import { motion, useScroll, useTransform } from 'framer-motion';
import aiAnalysisImage from '@/assets/ai-analysis.jpg';

export const Home = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30">
      <Navigation />

      {/* Immersive Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-blue-300">Intelligent Campus Evolution</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tighter gradient-text-premium leading-none"
          >
            Campus<span className="text-primary italic">_</span>Sathi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed tracking-wide"
          >
            Transcending conventional communication with hyper-intelligent document analysis and contextual awareness for the modern academic era.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/login">
              <Button size="lg" className="h-16 px-10 rounded-full bg-white text-black hover:bg-white/90 transition-all group overflow-hidden relative font-bold text-lg">
                <span className="relative z-10 flex items-center">
                  Initialize Experience
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-full border-white/10 hover:bg-white/5 backdrop-blur-sm transition-all text-lg font-medium">
                Our Philosophy
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          style={{ y: y1 }}
          className="absolute bottom-20 left-10 md:left-20 text-[10vw] font-bold text-white/[0.01] select-none pointer-events-none whitespace-nowrap z-0"
        >
          INTELLIGENCE • INNOVATION • IMPACT
        </motion.div>
      </section>

      {/* Feature Narrative Section */}
      <section className="py-32 relative overflow-hidden bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="absolute -inset-10 bg-primary/20 blur-[100px] opacity-20"></div>
                <img
                  src={aiAnalysisImage}
                  alt="AI Core"
                  className="rounded-3xl border border-white/10 shadow-3xl grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute top-10 right-10 bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl animate-float">
                  <Cpu className="h-10 w-10 text-primary mb-2" />
                  <div className="text-xl font-bold">Neural Engine</div>
                  <div className="text-sm text-white/50">Processing 10TB+ academic data</div>
                </div>
              </div>
            </ScrollReveal>

            <div className="space-y-12">
              <ScrollReveal direction="right">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  A New Paradigm in <br />
                  <span className="text-primary tracking-widest uppercase text-sm font-black bg-white/10 px-4 py-1 rounded-full align-middle">Campus Intelligence</span>
                </h2>
              </ScrollReveal>

              <div className="space-y-8">
                {[
                  { icon: Brain, title: "Cognitive Document Analysis", content: "Deep learning models extract insights from complex academic papers and institutional records instantly." },
                  { icon: Fingerprint, title: "Contextual Awareness", content: "Understands your specific role and history to provide tailored, personalized responses." },
                  { icon: Globe, title: "Universal Translation", content: "Smashes language barriers with real-time translation across 50+ strategic languages." }
                ].map((feature, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="flex items-start space-x-6 group">
                      <div className="flex-shrink-0 bg-white/5 p-4 rounded-2xl group-hover:bg-primary/20 transition-colors border border-white/5">
                        <feature.icon className="h-7 w-7 text-white group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-primary">{feature.title}</h3>
                        <p className="text-white/50 leading-relaxed font-light">{feature.content}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Crazy" Interaction Grid */}
      <section className="py-32 relative bg-black/60">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 italic tracking-tighter">Multidimensional Core</h2>
              <p className="max-w-xl mx-auto text-white/40 tracking-widest uppercase text-xs">Everything you need, amplified by intelligence</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
            {[
              { title: "24/7 Autonomy", subtitle: "Zero downtime infrastructure", icon: Clock },
              { title: "Quantum Security", subtitle: "End-to-end encrypted logic", icon: Lock },
              { title: "Massive scale", subtitle: "Built for global universities", icon: Users },
              { title: "Unified API", subtitle: "Seamless data integration", icon: Zap },
              { title: "Direct Access", subtitle: "Admin-level control panel", icon: Shield },
              { title: "Smart Storage", subtitle: "Cloud-native file management", icon: BookOpen }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 0.98, backgroundColor: "rgba(255,255,255,0.03)" }}
                className="p-12 border border-white/5 flex flex-col items-center text-center transition-all bg-white/[0.01]"
              >
                <item.icon className="h-10 w-10 text-white/20 mb-8 group-hover:text-primary" />
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/30 text-sm tracking-wide uppercase font-semibold">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive CTA Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-white text-black">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="relative z-10 text-center px-6">
          <ScrollReveal>
            <h2 className="text-[12vw] font-black leading-none tracking-tighter mb-12 uppercase italic">Elevate.</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-2xl md:text-3xl max-w-3xl mx-auto mb-16 font-serif italic text-black/60">
              The future isn't just coming—it's being computed.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex justify-center">
              <Link to="/login">
                <Button size="lg" className="h-20 px-16 rounded-full bg-black text-white hover:bg-black/90 text-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl">
                  START NOW
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <motion.div
          style={{ y: y2 }}
          className="absolute -bottom-20 right-0 text-[15vw] font-black text-black/[0.03] select-none pointer-events-none whitespace-nowrap uppercase italic"
        >
          ACADEMIC REVOLUTION
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};