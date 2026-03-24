import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility function to merge tailwind classes */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-2xl bg-border/50", className)}
      {...props}
    />
  );
}
