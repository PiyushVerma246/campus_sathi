import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-primary/30">
      {/* Background Mask */}
      <div className="absolute inset-0 mask-radial opacity-20 bg-primary/10 pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="inline-block p-4 rounded-[2rem] bg-white/5 border border-white/10 mb-12"
        >
          <Brain className="h-10 w-10 text-white/20" />
        </motion.div>

        <h1 className="text-9xl font-black italic tracking-tighter mb-4 opacity-10 animate-pulse">404</h1>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-tight">
            Lost in the<br />
            <span className="text-primary italic">Digital Void.</span>
          </h2>
          <p className="text-white/40 font-light tracking-[0.2em] uppercase text-xs mb-12">
            The requested vector could not be located in the neural matrix.
          </p>

          <Link to="/">
            <Button size="lg" className="h-20 px-12 rounded-full bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest group transition-all duration-500">
              <ArrowLeft className="mr-4 h-6 w-6 group-hover:-translate-x-2 transition-transform duration-500" />
              Return to Nexus
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 flex items-center space-x-3 text-white/20">
        <Sparkles className="h-4 w-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Campus_Sathi Matrix Error</span>
      </div>
    </div>
  );
};

export default NotFound;
