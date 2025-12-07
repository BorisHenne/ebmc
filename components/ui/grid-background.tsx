"use client";

import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function GridBackground({
  children,
  className,
  containerClassName,
}: GridBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center bg-white",
        containerClassName
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-grid-gray [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
          className
        )}
      />
      {children}
    </div>
  );
}

export function DotBackground({
  children,
  className,
  containerClassName,
}: GridBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center bg-white",
        containerClassName
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-dot-gray [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
          className
        )}
      />
      {children}
    </div>
  );
}
