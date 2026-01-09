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
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[150px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-900/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <div className="relative z-10">
        {/* Space Hero Section */}
        <section className="pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <ScrollReveal>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-600">touch</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-tight">
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
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactInfos.map((info, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="relative p-10 rounded-[3rem] bg-[#12121e]/50 border border-white/5 backdrop-blur-xl group overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <info.icon className="h-10 w-10 text-purple-400 mb-8 transition-transform duration-500 group-hover:scale-110" />
                    <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500 block mb-2">{info.label}</span>
                    <h3 className="text-2xl font-black mb-2 tracking-tight">{info.title}</h3>
                    <p className="text-gray-400 text-lg">{info.value}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Social Nexus */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-4xl font-black mb-12 tracking-tight">Social Nexus</h2>
              <div className="flex justify-center flex-wrap gap-8">
                {[
                  { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500' },
                  { icon: Twitter, label: 'Twitter', color: 'hover:text-blue-400' },
                  { icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
                  { icon: Github, label: 'GitHub', color: 'hover:text-white' }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`flex flex-col items-center gap-2 text-gray-500 ${social.color} transition-colors p-4`}
                  >
                    <social.icon className="h-8 w-8" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Stellar FAQ Section */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-20">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">Knowledge Base</span>
                </div>
                <h2 className="text-6xl font-black tracking-tighter mb-4 italic">F.A.Q.</h2>
                <p className="text-xl text-gray-500 font-medium tracking-tight">Rapid access to campus intelligence.</p>
              </div>
            </ScrollReveal>

            <div className="space-y-6">
              {[
                { q: "How does the AI process my documents?", a: "Our proprietary neural engine semanticizes your data, enabling ultra-low latency natural language retrieval." },
                { q: "Is orbital data transmission secure?", a: "All data streams are shielded by end-to-end quantum-resistant encryption across all cloud nodes." },
                { q: "Can I jump between portals instantly?", a: "Seamless role-switching is enabled for authenticated users across all campus modules." }
              ].map((faq, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="p-10 rounded-[2.5rem] bg-[#12121e]/50 border border-white/5 hover:border-purple-500/30 backdrop-blur-xl transition-all duration-300 group">
                    <h3 className="text-2xl font-bold mb-4 flex items-center tracking-tight">
                      <Sparkles className="h-5 w-5 text-purple-400 mr-4" />
                      {faq.q}
                    </h3>
                    <p className="text-gray-500 text-lg leading-relaxed pl-9">{faq.a}</p>
                  </div>
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