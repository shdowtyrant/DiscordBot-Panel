"use client";
import { useEffect, useState } from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { ActivityItem } from '@/components/ui/ActivityItem';
import { Server, Zap, Users, History, ArrowUpRight } from 'lucide-react';
import { apiClient } from '@/services/api';
import { Skeleton } from '@/components/ui/Skeleton';
import Link from 'next/link';

export default function DashboardOverview() {
  const [servers, setServers] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogsLoading, setIsLogsLoading] = useState(true);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const res = await apiClient('/users/servers');
        setServers(res.data.guilds || []);
      } finally { setIsLoading(false); }
    };
    fetchServers();

    const fetchLogs = async () => {
      try {
        const res = await apiClient('/logs/global');
        setLogs(res.data.logs || []);
      } finally { setIsLogsLoading(false); }
    };
    fetchLogs();
  }, []);

  return (
    <div className="p-8 md:p-12 space-y-12 animate-fade-in w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Overview</h1>
          <p className="text-muted text-[11px] font-bold tracking-widest uppercase">MONITOR GLOBAL PERFORMANCE & ACTIVE SERVERS</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-xs font-bold transition-all shadow-soft active:scale-95 text-white hover:text-white">
           <Zap size={14} className="text-primary"/> Sync Data 
        </button>
      </div>
      
      {/* SaaS Premium Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <StatCard title="Total Servers" value={isLoading ? "..." : servers.length.toString()} trend="+4%" icon={<Server />} />
         <StatCard title="Commands Executed" value="0" trend="0/m" icon={<Zap />} />
         <StatCard title="Active Users" value="0" icon={<Users />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pt-4">
        {/* Main Content Area: Guilds */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Connected Guilds
              </h2>
              <button className="text-[11px] px-4 py-2 rounded-full bg-white/5 text-muted hover:text-white hover:bg-white/10 font-bold uppercase tracking-wider transition-colors border border-white/5">
                  View All
              </button>
          </div>
          
          <div className="rounded-[2rem]">
              {isLoading ? (
                 <Skeleton className="w-full h-64 rounded-[2rem] opacity-20" />
              ) : servers.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   {servers.map((server, i) => (
                     <Link href={`/servers/${server.id}/settings`} key={server.id}>
                       <div className="p-5 glass group hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden relative">
                         <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                           <ArrowUpRight size={18} className="text-primary" />
                         </div>
                         <div className="flex items-center gap-4 relative z-10">
                             {server.icon ? (
                               <div className="relative w-16 h-16">
                                 <img src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`} className="w-16 h-16 rounded-full border border-white/10 shadow-soft object-cover" alt={server.name} />
                                 <div className="absolute inset-0 rounded-full shadow-inner-light pointer-events-none"></div>
                               </div>
                             ) : (
                               <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xl text-white group-hover:text-primary transition-colors shadow-soft shadow-inner-light">
                                 {server.name.charAt(0)}
                               </div>
                             )}
                             <div className="overflow-hidden flex-1 ml-1">
                               <h3 className="text-white font-bold tracking-tight truncate w-[90%] group-hover:text-primary transition-colors text-base">{server.name}</h3>
                               <div className="flex items-center gap-2 mt-2">
                                 <span className="text-[9px] font-extrabold tracking-widest uppercase bg-white/10 text-muted px-2.5 py-1 rounded-full border border-white/5 group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                   {server.owner ? 'Owner' : 'Admin'}
                                 </span>
                               </div>
                             </div>
                         </div>
                       </div>
                     </Link>
                   ))}
                 </div>
              ) : (
                 <EmptyState 
                   title="No active servers" 
                   description="Connect the bot to your community to start managing settings."
                   actionLabel="Invite to Server"
                 />
              )}
          </div>
        </div>

        {/* Sidebar Widget: Activity Logs */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                 <History size={18} className="text-primary" />
                 Audit Log
              </h2>
          </div>
          
          <div className="glass p-3">
             {isLogsLoading ? (
                 <div className="p-4 space-y-4 opacity-50">
                     <Skeleton className="w-full h-12 rounded-2xl" />
                     <Skeleton className="w-full h-12 rounded-2xl" />
                 </div>
             ) : logs.length > 0 ? (
                 <div className="flex flex-col gap-1">
                   {logs.map((log: any) => (
                     <ActivityItem 
                       key={log._id}
                       action={log.action} 
                       details={log.details || 'System action executed'} 
                       date={new Date(log.createdAt).toLocaleDateString()}
                     />
                   ))}
                 </div>
             ) : (
                 <div className="py-12 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-[1rem] border border-white/5 flex items-center justify-center mb-4 shadow-inner-light bg-black/20">
                        <History className="w-5 h-5 text-muted" />
                    </div>
                    <p className="text-sm font-bold text-white mb-1">Silence.</p>
                    <p className="text-[11px] text-muted max-w-[200px] leading-relaxed">No recent configuration changes made by your team.</p>
                 </div>
             )}
          </div>
        </div>
      </div>
    </div>
  )
}
