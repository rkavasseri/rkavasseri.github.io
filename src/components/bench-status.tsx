import type { BenchStatus } from "@/lib/livebench";

const tone: Record<BenchStatus, string> = {
  Active: "bg-foreground text-background",
  "Pre-registered": "border border-foreground",
  Paused: "border border-dashed border-foreground",
  "Findings recorded": "border border-foreground",
  "Gate passed": "bg-foreground text-background",
  "Gate failed": "border border-foreground line-through decoration-1",
};

export function BenchStatusChip({ status }: { status: BenchStatus }) {
  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-widest ${tone[status] ?? "border border-foreground"}`}>
      {status === "Active" ? <i className="status-pulse h-1.5 w-1.5 bg-current" aria-hidden /> : null}
      {status}
    </span>
  );
}
