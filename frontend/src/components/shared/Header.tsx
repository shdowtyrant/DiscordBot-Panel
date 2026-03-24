"use client";
import { Bell, Search } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className="h-20 border-b border-white/5 bg-[#050505]/40 backdrop-blur-2xl sticky top-0 px-8 flex items-center justify-between z-40 w-full transition-all">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-white transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search servers or settings..." 
            className="w-full bg-white/[0.03] border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all placeholder:text-muted shadow-inner-light"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-colors relative outline-none focus:ring-2 ring-white/20">
          <Bell size={18} />
          <span className="absolute top-[10px] right-[10px] w-2 h-2 bg-primary rounded-full border-2 border-[#050505]"></span>
        </button>
        
        <div className="h-6 w-[1px] bg-white/10 mx-1"></div>
        
        {user && (
          <div onClick={handleLogout} className="flex items-center gap-3 cursor-pointer group p-1 pr-4 rounded-full hover:bg-white/[0.03] transition-colors border border-transparent hover:border-red-500/20 active:scale-95">
            {user.avatar ? (
              <img src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`} alt="Avatar" className="w-8 h-8 rounded-full shadow-inner-light group-hover:opacity-80 transition-opacity" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white font-bold text-xs group-hover:border-red-500/30 transition-colors">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="hidden md:block">
              <p className="text-[13px] font-bold text-white group-hover:text-red-400 transition-colors" title="Click to logout">{user.username}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
