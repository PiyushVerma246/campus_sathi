import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, Mail, Phone, MapPin, Github, Twitter, Linkedin, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/5 selection:bg-primary/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-24">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-primary p-2 rounded-xl">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tighter">Campus_Sathi</span>
              </div>
              <p className="text-white/40 mb-8 text-sm leading-relaxed font-light">
                Redefining the boundaries of academic intelligence through custom AI models and neural document analysis.
              </p>
              <div className="flex space-x-4">
                {[Twitter, Linkedin, Github, Facebook].map((Icon, i) => (
                  <Button key={i} variant="ghost" size="sm" className="p-0 h-10 w-10 border border-white/5 hover:bg-white/5 hover:text-primary transition-all rounded-full">
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-8">Navigation</h3>
              <ul className="space-y-4">
                {['Home', 'About Us', 'Contact', 'Login'].map((item) => (
                  <li key={item}>
                    <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} className="text-white/60 hover:text-white transition-all text-sm font-medium">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-8">Infrastructure</h3>
              <ul className="space-y-4">
                {['Status', 'Docs', 'API', 'Security', 'Privacy'].map((item) => (
                  <li key={item}>
                    <button className="text-white/60 hover:text-white transition-all text-sm font-medium">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-8">Intelligence Feed</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-sm text-white/50">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="font-mono">echo@campussathi.ai</span>
                </div>

                {/* Newsletter Signup */}
                <div className="mt-8">
                  <p className="text-xs text-white/40 mb-4 font-light tracking-wide">
                    Join the closed beta for advanced neural features.
                  </p>
                  <div className="flex bg-white/5 border border-white/10 rounded-full p-1 pl-4 focus-within:border-primary/50 transition-all">
                    <input
                      placeholder="Neural ID (Email)"
                      className="text-xs bg-transparent border-0 outline-none flex-1 py-2 text-white placeholder:text-white/20"
                      type="email"
                    />
                    <Button size="sm" className="rounded-full bg-white text-black hover:bg-white/90 px-6 font-bold h-10">
                      SYNC
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-black">
              © {new Date().getFullYear()} Campus_Sathi Systems / Neural Division
            </div>
            <div className="flex space-x-8 text-[11px] font-bold tracking-widest uppercase">
              <a href="#" className="text-white/40 hover:text-white duration-300">Protocol</a>
              <a href="#" className="text-white/40 hover:text-white duration-300">Encrypted</a>
              <a href="#" className="text-white/40 hover:text-white duration-300">Vault</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
