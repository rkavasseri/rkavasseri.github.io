import { LinkedInIcon } from "@/components/brand-icons";
import { Button } from "@/components/ui/button";
import { newsletter } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface NewsletterButtonProps {
  /** Visual weight — "default" for prominent placements, "outline" inline. */
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  /** Shortened label for tight spaces like the footer. */
  compact?: boolean;
  className?: string;
}

/**
 * Subscribe link for the LinkedIn newsletter. Deliberately uses the site's
 * own tokens rather than LinkedIn's #0A66C2 — the icon and label carry the
 * brand recognition, and the page stays visually coherent.
 */
export function NewsletterButton({
  variant = "default",
  size = "default",
  compact = false,
  className,
}: NewsletterButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={newsletter.url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Subscribe to ${newsletter.name} newsletter on ${newsletter.platform} (opens in a new tab)`}
      >
        <LinkedInIcon className={cn("h-4 w-4", size === "lg" && "h-[1.1rem] w-[1.1rem]")} />
        {compact ? "Subscribe" : `Subscribe to ${newsletter.name}`}
      </a>
    </Button>
  );
}
