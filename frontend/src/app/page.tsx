import { ArrowRight, Bot, Command, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#050505] selection:bg-primary/30">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-hero-grid bg-[length:32px_32px] opacity-20 mask-image-gradient"></div>
      
      {/* Center Blur Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center animate-fade-in max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold tracking-wide text-foreground/80 mb-4 animate-float shadow-soft">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow"></span>
          Bot Panel v2.0 is Live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gradient mb-2 leading-tight">
          Next-Gen Discord <br/> Automation
        </h1>
        
        <p className="text-lg md:text-xl text-muted max-w-2xl font-light leading-relaxed">
          The ultimate control center for your Discord community. Manage configurations, integrations, and activity logs in real-time.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <a 
            href="http://localhost:5000/api/v1/auth/login"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-bold overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-glow"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex items-center gap-2 tracking-wide">
               Login with Discord
               <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <Link href="/dashboard" className="px-8 py-3.5 rounded-full border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-colors backdrop-blur-md shadow-soft">
            View Dashboard
          </Link>
        </div>

        {/* Feature Icons Grid */}
        <div className="flex items-center gap-8 md:gap-16 mt-16 pt-12 border-t border-white/5 text-muted animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
           <div className="flex flex-col items-center gap-2 hover:text-white transition-colors cursor-default">
             <Command size={24} />
             <span className="text-xs font-medium uppercase tracking-wider">Commands</span>
           </div>
           <div className="flex flex-col items-center gap-2 hover:text-white transition-colors cursor-default">
             <Shield size={24} />
             <span className="text-xs font-medium uppercase tracking-wider">Security</span>
           </div>
           <div className="flex flex-col items-center gap-2 hover:text-white transition-colors cursor-default">
             <Zap size={24} />
             <span className="text-xs font-medium uppercase tracking-wider">Ultra Fast</span>
           </div>
        </div>
      </div>
    </div>
  );
}
