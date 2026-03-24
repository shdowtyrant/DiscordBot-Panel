"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiClient } from '@/services/api';
import { ActivityItem } from '@/components/ui/ActivityItem';

export default function ServerLogsPage() {
  const params = useParams();
  const guildId = params?.id as string;
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await apiClient(`/logs?guildId=${guildId}`);
        setLogs(res.data.logs || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (guildId) fetchLogs();
  }, [guildId]);

  if (isLoading) {
    return (
      <div className="p-8 md:p-10 animate-pulse flex flex-col gap-6 w-full max-w-2xl">
        <div className="h-8 bg-card rounded-md w-1/3"></div>
        <div className="h-32 bg-card rounded-3xl w-full border border-border"></div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-10 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white gap-2 flex items-center">
          Server Audit Logs
        </h1>
        <p className="text-foreground/60 mt-1">Real-time history of configuration changes for this server.</p>
      </div>

      <div className="p-6 md:p-8 bg-card border border-border rounded-3xl subtle-glow shadow-soft transition-colors hover:border-white/10">
        {logs.length > 0 ? (
          <div className="flex flex-col gap-1">
             {logs.map((log) => (
                <ActivityItem 
                  key={log._id}
                  action={log.action} 
                  details={log.details || 'System action executed'} 
                  date={new Date(log.createdAt).toLocaleDateString()}
                />
             ))}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center opacity-70">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-inner-light">
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-lg font-bold text-white mb-1">No Activity Found</p>
            <p className="text-sm font-medium text-muted">This server's configuration has not been modified yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
