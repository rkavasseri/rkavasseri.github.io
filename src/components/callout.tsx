import * as React from "react";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "tip";

const styles: Record<
  CalloutType,
  { border: string; bg: string; icon: React.ElementType; iconColor: string }
> = {
  info: {
    border: "border-l-primary",
    bg: "bg-primary/5",
    icon: Info,
    iconColor: "text-primary",
  },
  warning: {
    border: "border-l-amber-500",
    bg: "bg-amber-500/5",
    icon: AlertTriangle,
    iconColor: "text-amber-500",
  },
  tip: {
    border: "border-l-emerald-500",
    bg: "bg-emerald-500/5",
    icon: Lightbulb,
    iconColor: "text-emerald-500",
  },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const { border, bg, icon: Icon, iconColor } = styles[type];

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-r-lg border border-l-4 border-border py-4 pl-4 pr-5",
        border,
        bg
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconColor)} />
      <div className="[&>p]:m-0 [&>p]:text-sm [&>p]:leading-6 [&>p]:text-foreground/80">
        {title ? (
          <p className="mb-1 !font-semibold !text-foreground">{title}</p>
        ) : null}
        {children}
      </div>
    </div>
  );
}
