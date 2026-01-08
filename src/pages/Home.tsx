import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Shield, User, Zap, Globe, FileText, Users, BookOpen, ArrowRight, Brain, Clock, Lock, Sparkles, Cpu, Fingerprint } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroCanvas } from '@/components/HeroCanvas';
import { ScrollReveal } from '@/components/ScrollReveal';
import { motion, useScroll, useTransform } from 'framer-motion';
import aiAnalysisImage from '@/assets/ai-analysis.jpg';
import { GlobalSpotlight, ParticleCard } from '@/components/MagicBento';

export const Home = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
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
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">Intelligent Campus Evolution</span>
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
            className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed tracking-wide"
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
              <Button size="lg" className="h-16 px-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all group overflow-hidden relative font-bold text-lg">
                <span className="relative z-10 flex items-center">
                  Initialize Experience
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-full border-foreground/10 hover:bg-foreground/5 backdrop-blur-sm transition-all text-lg font-medium">
                Our Philosophy
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          style={{ y: y1 }}
          className="absolute bottom-20 left-10 md:left-20 text-[10vw] font-bold text-foreground/[0.01] select-none pointer-events-none whitespace-nowrap z-0"
        >
          INTELLIGENCE • INNOVATION • IMPACT
        </motion.div>
      </section>

      {/* Feature Narrative Section */}
      <section className="py-32 relative overflow-hidden bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <ScrollReveal direction="left">
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-foreground/10 bg-background/50">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

                {/* Main Image */}
                <img
                  src={aiAnalysisImage}
                  alt="AI Analysis Interface"
                  className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Neural Engine Card */}
                <div className="absolute top-8 right-8 z-20 bg-background/80 backdrop-blur-xl p-6 rounded-2xl border border-foreground/10 shadow-xl max-w-xs animate-float">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
                      <Cpu className="h-8 w-8 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg leading-tight mb-1">Neural Engine</h4>
                      <p className="text-xs text-foreground/60 font-medium">Processing 10TB+ academic data</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="space-y-12">
              <ScrollReveal direction="right">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  A New Paradigm in <br />
                  <span className="text-primary tracking-widest uppercase text-sm font-black bg-primary/10 px-4 py-1 rounded-full align-middle border border-primary/20">Campus Intelligence</span>
                </h2>
              </ScrollReveal>

              <div className="space-y-6">
                {[
                  { icon: Brain, title: "Cognitive Document Analysis", content: "Deep learning models extract insights from complex academic papers and institutional records instantly." },
                  { icon: Fingerprint, title: "Contextual Awareness", content: "Understands your specific role and history to provide tailored, personalized responses." },
                  { icon: Globe, title: "Universal Translation", content: "Smashes language barriers with real-time translation across 50+ strategic languages." }
                ].map((feature, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ x: 10, backgroundColor: "rgba(var(--primary-rgb), 0.05)" }}
                      className="flex items-start space-x-6 p-6 rounded-2xl transition-all border border-transparent hover:border-foreground/5"
                    >
                      <div className="flex-shrink-0 bg-primary/10 p-4 rounded-2xl text-primary">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                        <p className="text-foreground/60 leading-relaxed text-sm font-medium">{feature.content}</p>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Crazy" Interaction Grid */}
      <section className="py-32 relative bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 italic tracking-tighter">Multidimensional Core</h2>
              <p className="max-w-xl mx-auto text-foreground/40 tracking-widest uppercase text-[10px] font-black">Everything you need, amplified by intelligence</p>
            </div>
          </ScrollReveal>

          <GlobalSpotlight gridRef={gridRef} />

          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 bento-section">
            {[
              {
                title: "Autonomous Neural Grid",
                subtitle: "Self-healing infrastructure that predicts load spikes before they happen.",
                icon: Cpu,
                stat: "99.999% Uptime",
                colSpan: "lg:col-span-2",
                gradient: "from-primary/20 via-primary/5 to-transparent"
              },
              {
                title: "Quantum-Resistant Security",
                subtitle: "Encrypted at rest, in transit, and during execution.",
                icon: Shield,
                stat: "SOC2 Compliant"
              },
              {
                title: "Planetary Scale",
                subtitle: "Supports millions of concurrent users globally without latency.",
                icon: Globe,
                stat: "Infinite Scaling"
              },
              {
                title: "Universal API Nexus",
                subtitle: "Restful endpoints with <100ms latency for any LMS integration.",
                icon: Zap,
                stat: "<100ms Latency"
              },
              {
                title: "Sovereign Control",
                subtitle: "Granular administrative privileges down to the data field level.",
                icon: Fingerprint,
                stat: "RBAC Level 4"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${item.colSpan || ""}`}
              >
                <ParticleCard
                  className="magic-bento-card h-full p-10 rounded-[2.5rem] border border-foreground/20 bg-background overflow-hidden group hover:shadow-2xl transition-all duration-500"
                  glowColor="132, 0, 255"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${item.gradient || "from-foreground/5 to-transparent"}`}></div>

                  <div className="relative z-10 flex flex-col h-full items-start text-left pointer-events-none">
                    <div className="mb-8 p-4 rounded-2xl bg-foreground/5 border border-foreground/5 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
                      <item.icon className="h-8 w-8 text-foreground/70 group-hover:text-primary transition-colors duration-500" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                    <p className="text-foreground/60 text-sm leading-relaxed mb-8 max-w-sm font-medium">{item.subtitle}</p>

                    <div className="mt-auto opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-primary/80">
                      <span>{item.stat}</span>
                      <div className="h-px flex-1 bg-primary/20"></div>
                    </div>
                  </div>
                </ParticleCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive CTA Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="relative z-10 text-center px-6">
          <ScrollReveal>
            <h2 className="text-[12vw] font-black leading-none tracking-tighter mb-12 uppercase italic">Elevate.</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-2xl md:text-3xl max-w-3xl mx-auto mb-16 font-serif italic text-primary-foreground/60">
              The future isn't just coming—it's being computed.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex justify-center">
              <Link to="/login">
                <Button size="lg" className="h-20 px-16 rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl">
                  START NOW
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <motion.div
          style={{ y: y2 }}
          className="absolute -bottom-20 right-0 text-[15vw] font-black text-primary-foreground/[0.03] select-none pointer-events-none whitespace-nowrap uppercase italic"
        >
          ACADEMIC REVOLUTION
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};