"use client";
import { Bot, Home, Settings, Activity, Server, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname() || '';
  const params = useParams();

  // Deteksi apakah kita sedang di dalam halaman spesifik server (Context Switching)
  const isServerContext = pathname.startsWith('/servers/') && params?.id;
  const serverId = params?.id as string;

  const navItems = isServerContext ? [
    { icon: ChevronLeft, label: 'Back to Global', href: '/dashboard', active: false },
    { icon: Settings, label: 'Bot Configurations', href: `/servers/${serverId}/settings`, active: pathname.includes('/settings') },
    { icon: Activity, label: 'Audit Logs', href: `/servers/${serverId}/logs`, active: pathname.includes('/logs') },
  ] : [
    { icon: Home, label: 'Overview', href: '/dashboard', active: pathname === '/dashboard' },
    { icon: Server, label: 'Servers', href: '/dashboard', active: false },
    { icon: Settings, label: 'Bot Settings', href: '#', active: false, disabled: true },
    { icon: Activity, label: 'Activity Logs', href: '#', active: false, disabled: true },
  ];

  return (
    <aside className="w-72 border-r border-white/5 bg-[#050505]/40 backdrop-blur-2xl p-6 hidden md:flex flex-col gap-8 h-screen sticky top-0 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.4)]">
      <Link href="/" className="flex items-center gap-3 px-2 group mt-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover text-white flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform shadow-inner-light">
          <Bot size={22} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight leading-tight group-hover:text-primary transition-colors">Bot Panel</h2>
          <p className="text-[9px] text-muted font-bold tracking-widest uppercase mt-0.5">Demo Dashboard</p>
        </div>
      </Link>

      <nav className="flex flex-col gap-1 w-full mt-4">
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            onClick={(e) => item.disabled && e.preventDefault()}
            className={`relative flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 font-medium group overflow-hidden ${item.disabled
                ? 'opacity-30 cursor-not-allowed pointer-events-none mix-blend-luminosity'
                : item.active
                  ? 'text-white'
                  : 'text-muted hover:text-white hover:bg-white/5'
              }`}
          >
            {item.active && !item.disabled && (
              <>
                <div className="absolute inset-0 bg-primary/10 rounded-2xl border border-primary/20"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-r-full shadow-glow"></div>
              </>
            )}
            <item.icon size={18} className={`relative z-10 transition-colors ${item.active && !item.disabled ? 'text-primary' : 'group-hover:text-white'}`} />
            <span className="relative z-10 text-[14px]">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto mb-2">
        <div className="relative p-5 rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden group hover:border-white/20 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-white mb-1">Need help?</p>
            <p className="text-xs text-muted mb-4 leading-relaxed font-medium">Check our documentation or join the community.</p>
            <button className="w-full py-2.5 bg-white text-black hover:bg-gray-200 rounded-xl text-xs font-bold transition-all shadow-glow active:scale-95">
              Documentation
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
