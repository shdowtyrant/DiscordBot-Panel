"use client";
import { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import { apiClient } from '@/services/api';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export default function BotSettingsPage() {
  const params = useParams();
  const guildId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    prefix: '!',
    welcomeMessage: 'Welcome to the server, {user}!'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiClient(`/settings/${guildId}`);
        if (res.data.settings) {
          setFormData({
            prefix: res.data.settings.prefix,
            welcomeMessage: res.data.settings.welcomeMessage,
          });
        }
      } catch (error) {
        console.error("Failed to fetch settings", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (guildId) fetchSettings();
  }, [guildId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await apiClient(`/settings/${guildId}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
      });
      toast.success('Configuration saved permanently!');
    } catch (error) {
      toast.error("Failed to save configuration");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 md:p-10 animate-pulse flex flex-col gap-6 w-full max-w-2xl">
        <div className="h-8 bg-card rounded-md w-1/3"></div>
        <div className="h-64 bg-card rounded-3xl w-full border border-border"></div>
    </div>;
  }

  return (
    <div className="p-8 md:p-10 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white gap-2 flex items-center">
          Bot Configuration
        </h1>
        <p className="text-foreground/60 mt-1">Manage the core behavior of your bot for this server.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 md:p-8 bg-card border border-border rounded-3xl subtle-glow shadow-soft space-y-8 transition-colors hover:border-white/10">
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white tracking-wide">Command Prefix</label>
            <p className="text-xs text-foreground/50 mb-2">The character used to trigger bot commands. Keep it short.</p>
            <div className="max-w-xs">
               <Input 
                 value={formData.prefix}
                 onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
                 placeholder="e.g. ! or ?"
                 maxLength={3}
                 required
               />
            </div>
          </div>

          <div className="w-full h-[1px] bg-border/50"></div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-white tracking-wide">Welcome Message</label>
            <p className="text-xs text-foreground/50 mb-2">
              Sent automatically when a new user joins. Use <code className="bg-white/10 px-1.5 py-0.5 rounded-md text-primary font-mono select-all">{'{user}'}</code> to mention them.
            </p>
            <Textarea 
              value={formData.welcomeMessage}
              onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
              placeholder="Welcome to the server, {user}!"
              rows={4}
              required
            />
          </div>

        </div>

        <div className="flex justify-end pt-2">
           <Button type="submit" isLoading={isSaving}>
              Save Changes
           </Button>
        </div>
      </form>
    </div>
  );
}
