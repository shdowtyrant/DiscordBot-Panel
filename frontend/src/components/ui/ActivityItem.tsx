import { History, Settings, LogIn, UserPlus } from 'lucide-react';

interface ActivityItemProps {
  action: string;
  details: string;
  date: string;
}

export function ActivityItem({ action, details, date }: ActivityItemProps) {
  // Determine premium colors and icon
  let Icon = History;
  let color = "text-foreground/40";
  let bg = "bg-white/5";
  
  if (action.includes('SETTINGS')) {
    Icon = Settings;
    color = "text-primary group-hover:text-primary-hover";
    bg = "bg-primary/10";
  } else if (action.includes('INVITE')) {
    Icon = UserPlus;
    color = "text-emerald-400";
    bg = "bg-emerald-400/10";
  } else if (action.includes('LOGIN')) {
    Icon = LogIn;
    color = "text-indigo-400";
    bg = "bg-indigo-400/10";
  }

  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-default">
      <div className={`mt-1 min-w-8 w-8 h-8 rounded-full border border-white/5 flex items-center justify-center ${color} ${bg} shadow-soft transition-colors`}>
        <Icon size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[13px] font-bold text-white tracking-wide truncate">{action.replace('_', ' ')}</h4>
        <p className="text-[12px] text-foreground/60 mt-0.5 truncate">{details}</p>
      </div>
      <span className="text-[10px] text-foreground/40 font-medium whitespace-nowrap mt-1 tracking-wider">{date}</span>
    </div>
  )
}
