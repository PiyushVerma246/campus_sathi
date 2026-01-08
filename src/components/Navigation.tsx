import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Brain, Menu, X, ArrowRight, LogOut, Layout, UserCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAuthPage = location.pathname === '/login';
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');

  const getInitials = (name?: string) => {
    return name ? name.substring(0, 2).toUpperCase() : 'U';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`relative flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-500 ${isScrolled || isAuthPage || location.pathname !== '/'
          ? 'bg-background/90 backdrop-blur-2xl border-foreground/10 shadow-2xl'
          : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-3 group decoration-none hover:no-underline">
              <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-500">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-foreground">Campus<span className="text-primary italic">_</span>Sathi</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Events', 'Lost & Found', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : item === 'Lost & Found' ? '/lost-and-found' : `/${item.toLowerCase()}`}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors relative group decoration-none hover:no-underline ${location.pathname === (item === 'Home' ? '/' : item === 'Lost & Found' ? '/lost-and-found' : `/${item.toLowerCase()}`)
                    ? 'text-foreground'
                    : 'text-foreground/50 hover:text-foreground'
                  }`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-500 ${location.pathname === (item === 'Home' ? '/' : item === 'Lost & Found' ? '/lost-and-found' : `/${item.toLowerCase()}`)
                    ? 'w-full'
                    : 'w-0 group-hover:w-full'
                  }`}></span>
              </Link>
            ))}

            {isAuthenticated && (
              <Link
                to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors relative group decoration-none hover:no-underline flex items-center ${isDashboard ? 'text-primary' : 'text-foreground/50 hover:text-primary'
                  }`}
              >
                <Layout className="h-3 w-3 mr-2" />
                Dashboard
              </Link>
            )}

            <div className="pl-4 border-l border-foreground/10 h-6 flex items-center">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary leading-none">Authenticated User</span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border border-foreground/10 hover:border-primary/50 transition-colors">
                      <Avatar className="h-full w-full">
                        <AvatarImage src="/placeholder-avatar.jpg" alt={user?.username} />
                        <AvatarFallback className="bg-primary/5 text-primary font-bold">
                          {getInitials(user?.username)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.username}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email || 'user@example.com'}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      <span>Switch Role</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="md:hidden">
                  <ThemeToggle />
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="hidden md:block">
                  <Button variant="ghost" className="text-xs font-black uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground hover:bg-foreground/5 px-6 rounded-full font-bold">
                    Portal Access
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 font-black text-xs uppercase tracking-widest px-6 rounded-full h-10 group">
                    Join
                    <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <div className="md:hidden">
                  <ThemeToggle />
                </div>
              </>
            )}

            <button
              className="md:hidden text-foreground p-2 hover:bg-foreground/5 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-6 right-6 mt-4 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:hidden flex flex-col items-center space-y-8 shadow-2xl z-[101]"
          >
            {['Home', 'Events', 'Lost & Found', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : item === 'Lost & Found' ? '/lost-and-found' : `/${item.toLowerCase()}`}
                className="text-2xl font-black uppercase tracking-tighter text-white decoration-none hover:no-underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full h-16 rounded-2xl bg-primary text-white font-black text-xl uppercase tracking-widest">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  className="w-full h-16 rounded-2xl bg-white/5 border border-red-500/20 text-red-400 font-black text-xl uppercase tracking-widest"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full h-16 rounded-2xl bg-white text-black font-black text-xl uppercase tracking-widest">
                  Portal Access
                </Button>
              </Link>
            )}
            <div className="pt-4">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};