import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, Mail, ArrowRight, Github, Twitter, Linkedin, Facebook, ChevronRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-black text-white border-t border-white/5 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">

        {/* Top CTA Section - Compact */}
        <div className="py-8 border-b border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-lg md:text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Ready to optimize your campus?
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <Button size="sm" className="rounded-full px-6 text-xs font-semibold bg-white text-black hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Get Started <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-10">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-4">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-primary/10 border border-primary/20 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <span className="text-xl font-bold tracking-tighter text-white">Campus_Sathi</span>
              </Link>
              <p className="text-white/40 text-xs leading-relaxed font-light">
                Redefining academic boundaries with next-gen AI models.
              </p>
              <div className="flex gap-2 pt-1">
                {[
                  { icon: Twitter, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Github, href: "#" },
                  { icon: Facebook, href: "#" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="p-2 rounded-full bg-white/5 border border-white/5 text-white/50 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    <social.icon className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-white tracking-wide flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary/50"></span>
                Platform
              </h3>
              <ul className="space-y-2">
                {['Home', 'About Us', 'Features', 'Pricing'].map((item) => (
                  <li key={item}>
                    <Link
                      to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                      className="group flex items-center text-white/50 hover:text-white transition-colors text-xs"
                    >
                      <ChevronRight className="h-2.5 w-2.5 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Support */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-white tracking-wide flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-indigo-500/50"></span>
                Resources
              </h3>
              <ul className="space-y-2">
                {['Documentation', 'API Reference', 'Security', 'Privacy Policy'].map((item) => (
                  <li key={item}>
                    <a href="#" className="group flex items-center text-white/50 hover:text-white transition-colors text-xs">
                      <ChevronRight className="h-2.5 w-2.5 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-indigo-400" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-white tracking-wide flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-500/50"></span>
                Stay Updated
              </h3>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-3 w-3 text-white/30" />
                    <Input
                      placeholder="Enter your email"
                      className="pl-8 bg-black/20 border-white/10 text-[10px] h-8 focus-visible:ring-primary/30"
                    />
                  </div>
                  <Button className="w-full h-7 text-[10px] font-semibold bg-white/10 hover:bg-white text-white hover:text-black border border-white/5 transition-all duration-300">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5">
          <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[10px] text-white/30 font-light">
              © {new Date().getFullYear()} Campus_Sathi Systems. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-white/20 font-bold">
                <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></div>
                <span>System Operational</span>
              </div>
              <div className="h-2 w-[1px] bg-white/10"></div>
              <div className="text-[10px] text-white/20 uppercase tracking-widest font-bold">
                v2.4.0-beta
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
