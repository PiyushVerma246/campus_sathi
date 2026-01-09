import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Sparkles, ArrowRight, Instagram, Twitter, Linkedin, Github, Rocket } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';

export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Transmission Received",
      description: "Our core team will respond within 24 standard hours.",
    });
    setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfos = [
    { icon: Mail, title: "Support", value: "support@campus-sathi.com", label: "General Inquiries", gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent' },
    { icon: Phone, title: "Voice", value: "+1 (555) 123-4567", label: "Emergency Support", gradient: 'from-purple-500/20 via-pink-500/10 to-transparent' },
    { icon: MapPin, title: "HQ", value: "Innovation Drive, Tech Campus", label: "Visit Us", gradient: 'from-orange-500/20 via-amber-500/10 to-transparent' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30 overflow-hidden font-sans">
      <Navigation />

      {/* Deep Space Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated Starfield */}
        <div className="absolute inset-0 z-0">
          <div className="stars absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse" />
          <div className="stars2 absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse" style={{ animationDelay: '2s', transform: 'scale(1.5)' }} />
        </div>

        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[150px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-900/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <div className="relative z-10">
        {/* Space Hero Section */}
        <section className="pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 text-center">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-600">touch</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-tight text-center max-w-4xl mx-auto">
                Reach out, and let's create a universe of possibilities together!
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Constellation Form Card */}
        <section className="pb-32 px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <Card className="bg-[#12121e]/80 border-0 backdrop-blur-2xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[700px]">
                {/* Left Side: Form */}
                <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
                  <h2 className="text-4xl font-black mb-4 tracking-tight">Let's connect constellations</h2>
                  <p className="text-gray-400 font-medium mb-12">
                    Let's align our constellations! Reach out and let the magic of collaboration illuminate our skies.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last Name"
                          className="h-14 bg-[#1a1a2e] border-0 rounded-2xl focus:ring-2 focus:ring-purple-500/50 text-white placeholder:text-gray-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First Name"
                          className="h-14 bg-[#1a1a2e] border-0 rounded-2xl focus:ring-2 focus:ring-purple-500/50 text-white placeholder:text-gray-500"
                          required
                        />
                      </div>
                    </div>

                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="h-14 bg-[#1a1a2e] border-0 rounded-2xl focus:ring-2 focus:ring-purple-500/50 text-white placeholder:text-gray-500"
                      required
                    />

                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="h-14 bg-[#1a1a2e] border-0 rounded-2xl focus:ring-2 focus:ring-purple-500/50 text-white placeholder:text-gray-500"
                    />

                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Message"
                      rows={6}
                      className="bg-[#1a1a2e] border-0 rounded-2xl focus:ring-2 focus:ring-purple-500/50 text-white placeholder:text-gray-500 resize-none"
                      required
                    />

                    <Button type="submit" className="h-14 px-10 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:scale-105 transition-all text-white font-bold text-lg border-0 shadow-lg shadow-purple-500/20 group">
                      Send it to the moon <Rocket className="h-5 w-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </form>
                </div>

                {/* Right Side: Astronaut Visual */}
                <div className="hidden lg:block w-[45%] relative overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-gradient-to-l from-transparent via-[#12121e]/20 to-[#12121e]" />
                  <img
                    src="/astronaut_contact_hero.png"
                    className="w-full h-full object-cover"
                    alt="Space Explorer"
                  />
                  <div className="absolute bottom-12 left-12 right-12 z-20">
                    <p className="text-gray-300 italic mb-4 leading-relaxed font-medium">
                      "Two lunar months revealed Earth's fragile beauty against vast silence, transforming my view of our place in the universe."
                    </p>
                    <p className="text-white font-black text-lg">Irinel Traista</p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* Communication Satellites (Info Cards) */}
        <section className="py-24 px-6 relative overflow-hidden">
          {/* Section Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {contactInfos.map((info, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <motion.div
                    whileHover={{ y: -15, scale: 1.02 }}
                    className="relative group h-full"
                  >
                    {/* Hover Glow Effect */}
                    <div className={`absolute -inset-[1px] bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-100 rounded-[2.5rem] blur-md transition-opacity duration-700`} />

                    <div className="relative p-12 rounded-[2.5rem] bg-[#12121e]/40 border border-white/5 backdrop-blur-3xl h-full flex flex-col items-center text-center transition-all duration-500 group-hover:bg-[#12121e]/60 group-hover:border-purple-500/30">
                      <div className="p-6 rounded-[2rem] bg-purple-500/10 mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <info.icon className="h-10 w-10 text-purple-400" />
                      </div>

                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500/60 block mb-4">{info.label}</span>
                      <h3 className="text-3xl font-black mb-4 tracking-tighter text-white">{info.title}</h3>
                      <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-[200px]">{info.value}</p>

                      {/* Decorative "Satellite" Lines */}
                      <div className="mt-10 pt-8 border-t border-white/5 w-full flex items-center justify-center space-x-2 opacity-30 group-hover:opacity-100 transition-opacity">
                        <div className="h-1 w-1 bg-purple-500 rounded-full" />
                        <div className="h-[1px] w-12 bg-gradient-to-r from-purple-500 to-transparent" />
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Social Nexus */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="relative p-16 rounded-[4rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 backdrop-blur-md overflow-hidden text-center group">
                {/* Background Sparkles */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-grid-pattern" />

                <h2 className="text-5xl font-black mb-16 tracking-tighter uppercase relative z-10">
                  <span className="text-gray-500">Social</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-600">Nexus</span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
                  {[
                    { icon: Instagram, label: 'Instagram', color: 'group-hover:text-pink-500', bg: 'bg-pink-500/10' },
                    { icon: Twitter, label: 'Twitter', color: 'group-hover:text-blue-400', bg: 'bg-blue-400/10' },
                    { icon: Linkedin, label: 'LinkedIn', color: 'group-hover:text-blue-600', bg: 'bg-blue-600/10' },
                    { icon: Github, label: 'GitHub', color: 'group-hover:text-white', bg: 'bg-white/10' }
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href="#"
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="flex flex-col items-center gap-4 group/social"
                    >
                      <div className={`p-6 rounded-3xl bg-white/[0.03] border border-white/5 transition-all duration-300 group-hover/social:${social.bg} group-hover/social:border-white/20 group-hover/social:shadow-2xl group-hover/social:shadow-black`}>
                        <social.icon className="h-10 w-10 text-gray-400 transition-colors duration-300 group-hover/social:text-white" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 group-hover/social:text-white transition-colors">
                        {social.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Stellar FAQ Section */}
        <section className="py-40 px-6 relative overflow-hidden">
          {/* FAQ Background Glows */}
          <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="text-center mb-24">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">Knowledge Retrieving</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase">
                  F.<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-600">A</span>.Q.
                </h2>
                <p className="text-xl text-gray-400 font-medium tracking-tight max-w-xl mx-auto leading-relaxed">
                  Decrypted answers to the most common queries in our sector of the galaxy.
                </p>
              </div>
            </ScrollReveal>

            <div className="space-y-8">
              {[
                {
                  q: "How does the AI process my documents?",
                  a: "Our proprietary neural engine semanticizes your data, enabling ultra-low latency natural language retrieval.",
                  tag: "SATHI-CORE"
                },
                {
                  q: "Is orbital data transmission secure?",
                  a: "All data streams are shielded by end-to-end quantum-resistant encryption across all cloud nodes.",
                  tag: "SECURITY"
                },
                {
                  q: "Can I jump between portals instantly?",
                  a: "Seamless role-switching is enabled for authenticated users across all campus modules.",
                  tag: "NAVIGATION"
                }
              ].map((faq, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.01, x: 5 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/20 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 blur-sm transition-opacity" />

                    <div className="relative p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/20 backdrop-blur-3xl transition-all duration-500">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-black mb-4 flex items-start tracking-tight group-hover:text-purple-400 transition-colors">
                            <span className="text-purple-600 mr-4 font-serif text-3xl opacity-50">Q.</span>
                            {faq.q}
                          </h3>
                          <p className="text-gray-500 text-lg leading-relaxed pl-12 font-medium">{faq.a}</p>
                        </div>
                        <div className="shrink-0 flex md:flex-col items-center gap-4">
                          <span className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                            {faq.tag}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};