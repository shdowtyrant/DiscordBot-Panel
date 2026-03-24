import { ServerCrash, Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-14 text-center rounded-3xl bg-card border border-dashed border-border subtle-glow transition-all hover:border-primary/30 duration-300">
      <div className="w-16 h-16 mb-5 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-foreground/40 shadow-soft">
        <ServerCrash size={28} />
      </div>
      <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-foreground/60 max-w-sm mb-6 leading-relaxed bg-clip-text">
        {description}
      </p>
      
      {actionLabel && (
        <button 
          onClick={onAction}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all transform hover:scale-105 active:scale-95 shadow-glow"
        >
          <Plus size={16} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
