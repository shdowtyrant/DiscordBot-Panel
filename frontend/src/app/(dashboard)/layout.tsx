"use client";
import { ReactNode, useEffect } from "react";
import { Sidebar } from "@/components/shared/Sidebar";
import { Header } from "@/components/shared/Header";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => { checkAuth(); }, [checkAuth]);
  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/");
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return (
     <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
       <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center animate-pulse shadow-glow">
         <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
       </div>
       <p className="text-muted text-[10px] font-bold tracking-widest uppercase mt-4 animate-pulse">Initializing</p>
     </div>
  );

  return isAuthenticated ? (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#050505] text-foreground selection:bg-primary/30">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative">
         <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' } }} />
         {/* Background Glow globally over dashboard area */}
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

         <Header />
         <main className="flex-1 overflow-y-auto w-full relative z-10 scroll-smooth">
           <div className="max-w-7xl mx-auto w-full">
             {children}
           </div>
         </main>
      </div>
    </div>
  ) : null;
}
