import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Transmission Received",
      description: "Our core team will respond within 24 standard hours.",
    });
    setFormData({ name: '', email: '', institution: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfos = [
    { icon: Mail, title: "Support", value: "support@campus-sathi.com", label: "General Inquiries" },
    { icon: Phone, title: "Voice", value: "+1 (555) 123-4567", label: "Emergency Support" },
    { icon: MapPin, title: "HQ", value: "Innovation Drive, Tech Campus", label: "Visit Us" },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      <Navigation />

      {/* Immersive Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
        <div className="absolute inset-0 mask-radial opacity-30 bg-primary/10 pointer-events-none" />

        <ScrollReveal>
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Communication Layer</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.85]">
              ESTABLISH<br />
              <span className="text-primary italic">CONNECTION.</span>
            </h1>
          </div>
        </ScrollReveal>
      </section>

      {/* Contact Interface */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Form Container */}
            <div className="lg:col-span-8">
              <ScrollReveal direction="left">
                <div className="p-10 md:p-16 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-primary/10" />

                  <div className="relative z-10">
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-12 flex items-center">
                      <MessageSquare className="h-8 w-8 mr-4 text-primary" />
                      Encrypted Message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 ml-4">Full Identity</Label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="h-16 rounded-2xl bg-white/[0.03] border-white/10 focus:border-primary/50 text-lg px-6"
                            required
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 ml-4">Nexus Endpoint</Label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="user@university.edu"
                            className="h-16 rounded-2xl bg-white/[0.03] border-white/10 focus:border-primary/50 text-lg px-6"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 ml-4">Subject Vector</Label>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Strategic Inquiry"
                          className="h-16 rounded-2xl bg-white/[0.03] border-white/10 focus:border-primary/50 text-lg px-6"
                          required
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 ml-4">Core Message</Label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Initialize transmission content..."
                          rows={6}
                          className="rounded-3xl bg-white/[0.03] border-white/10 focus:border-primary/50 text-lg p-6 resize-none"
                          required
                        />
                      </div>

                      <Button type="submit" className="h-20 w-full rounded-2xl bg-white text-black hover:bg-white/90 font-black text-xl uppercase tracking-widest group transition-all duration-500 overflow-hidden relative">
                        <span className="relative z-10 flex items-center">
                          Transmit Data
                          <Send className="h-6 w-6 ml-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                        </span>
                      </Button>
                    </form>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Info Container */}
            <div className="lg:col-span-4 space-y-6">
              {contactInfos.map((info, idx) => (
                <ScrollReveal key={idx} direction="right" delay={idx * 0.1}>
                  <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-500 group">
                    <info.icon className="h-8 w-8 text-primary mb-6 transition-transform duration-500 group-hover:scale-110" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 block mb-2">{info.label}</span>
                    <h3 className="text-xl font-bold mb-1">{info.title}</h3>
                    <p className="text-white/60 font-light">{info.value}</p>
                  </div>
                </ScrollReveal>
              ))}

              <ScrollReveal direction="right" delay={0.4}>
                <div className="p-8 rounded-3xl bg-primary/10 border border-primary/20">
                  <Clock className="h-8 w-8 text-primary mb-6" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 block mb-2">Availability</span>
                  <p className="text-white font-bold">24/7 Digital Assistant</p>
                  <p className="text-white/40 text-sm mt-2">Human response: 9AM - 6PM EST</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 border-t border-white/5 bg-slate-950/20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black tracking-tighter mb-4 italic">F.A.Q.</h2>
              <p className="text-xl text-white/40 font-light">Rapid knowledge retrieval.</p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {[
              { q: "How does the AI process my documents?", a: "We utilize advanced semantic indexing to create a neural map of your data, allowing for natural language retrieval." },
              { q: "Is the transmission secure?", a: "All data transfers are encrypted via TLS 1.3 and stored in high-security, compliant cloud environments." },
              { q: "Can I switch between roles instantly?", a: "Yes, our portal allows seamless switching between student and administrative access once authenticated." }
            ].map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Sparkles className="h-4 w-4 text-primary mr-3" />
                    {faq.q}
                  </h3>
                  <p className="text-white/40 font-light leading-relaxed pl-7">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};