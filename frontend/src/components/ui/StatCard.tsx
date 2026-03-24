import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: ReactNode;
}

export function StatCard({ title, value, trend, icon }: StatCardProps) {
  return (
    <div className="relative group overflow-hidden rounded-[2rem] glass p-6 cursor-default transition-all duration-500 hover:-translate-y-1 hover:shadow-glow border border-transparent hover:border-white/10">
      {/* Top Gradient highlight on hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
      
      {/* Background Subtle Glow Injection */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-foreground/70 group-hover:text-white group-hover:bg-primary/20 group-hover:border-primary/30 transition-all shadow-inner-light">
            {icon}
          </div>
          {trend && (
            <span className="flex items-center text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
              {trend}
            </span>
          )}
        </div>
        <h3 className="text-muted text-[12px] font-bold tracking-widest uppercase">{title}</h3>
        <p className="text-4xl font-extrabold text-white mt-1 tracking-tighter">{value}</p>
      </div>
    </div>
  );
}
