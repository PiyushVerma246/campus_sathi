import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Brain, Users, Target, Lightbulb, Award, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const About = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  const values = [
    { title: "Community First", desc: "Prioritizing the needs of students, faculty, and staff in every line of code.", icon: Users, color: "text-blue-400" },
    { title: "Innovation", desc: "Pushing AI boundaries to deliver cutting-edge academic solutions.", icon: Lightbulb, color: "text-amber-400" },
    { title: "Accessibility", desc: "Ensuring our platform is usable by everyone, regardless of background.", icon: Target, color: "text-emerald-400" },
    { title: "Excellence", desc: "Maintaining the highest standards of quality and academic integrity.", icon: Award, color: "text-purple-400" },
    { title: "Efficiency", desc: "Streamlining campus processes to save time for what matters most.", icon: Zap, color: "text-rose-400" },
    { title: "Intelligence", desc: "Leveraging AI responsibly to augment student and faculty capabilities.", icon: Brain, color: "text-cyan-400" },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 mask-radial opacity-30 bg-primary/20 pointer-events-none" />

        <ScrollReveal>
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Our Identity</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.85]">
              CRAFTING<br />
              <span className="text-primary italic">INTELLIGENCE</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Beyond software, we are building the neural foundation for the modern academic ecosystem.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          style={{ y: y1 }}
          className="absolute -bottom-20 left-0 right-0 text-[20vw] font-black text-white/[0.02] select-none pointer-events-none whitespace-nowrap z-0"
        >
          CAMPUS SATHI • CAMPUS SATHI • CAMPUS SATHI
        </motion.div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 px-6 border-y border-white/5 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <ScrollReveal direction="left">
              <div>
                <span className="text-primary font-black uppercase tracking-widest text-sm mb-6 block italic">The Genesis</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 leading-tight">
                  Bridging the Gap<br />
                  <span className="text-white/40">Between Info & Access.</span>
                </h2>
                <div className="space-y-6 text-xl text-white/50 leading-relaxed font-light">
                  <p>
                    Campus_Sathi emerged from a simple question: Why is academic information still siloed in PDFs and static portals?
                  </p>
                  <p>
                    We envisioned a world where every document speaks, every circular is contextually aware, and every student has a 24/7 intellectual companion.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent rounded-3xl" />
                <div className="w-full h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl p-12 flex flex-col justify-center items-center text-center group transition-all duration-700 hover:border-primary/50">
                  <div className="bg-primary/20 p-8 rounded-full mb-8 group-hover:scale-110 transition-transform duration-700">
                    <Brain className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-3xl font-black mb-4">Neural Architecture</h3>
                  <p className="text-white/40 text-lg">Built on proprietary LLM integration and semantic document processing.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <ScrollReveal direction="up" delay={0.2}>
              <div>
                <span className="text-primary font-black uppercase tracking-widest text-sm mb-6 block italic">Our DNA</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Core Principles.</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.4}>
              <p className="text-xl text-white/40 max-w-md font-light">
                The six foundational pillars guiding our journey towards a smarter campus.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group h-full p-10 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20">
                  <v.icon className={`h-10 w-10 mb-8 transition-transform duration-500 group-hover:scale-110 ${v.color}`} />
                  <h3 className="text-2xl font-black mb-4">{v.title}</h3>
                  <p className="text-white/40 font-light leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-48 px-6 bg-white text-black text-center relative overflow-hidden">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-[calc(-0.06em)] mb-12 uppercase italic leading-[0.8]">
              Ready to<br />
              <span className="text-primary">Evolve.</span>
            </h2>
            <p className="text-xl md:text-2xl mb-16 font-light max-w-2xl mx-auto text-black/60">
              Join the mission to transform documentation into conversation.
            </p>
            <Link to="/login">
              <Button size="lg" className="h-20 px-12 rounded-full bg-black text-white hover:bg-black/90 text-xl font-black uppercase tracking-widest group">
                Initialize Portal
                <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};