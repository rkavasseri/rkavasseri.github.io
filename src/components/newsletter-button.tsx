import { LinkedInIcon, SubstackIcon } from "@/components/brand-icons";
import { Button } from "@/components/ui/button";
import { newsletter, type Newsletter } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface NewsletterButtonProps {
  /** Defaults to the primary newsletter for compact CTAs. */
  publication?: Newsletter;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  /** Shortened label for tight spaces like the footer. */
  compact?: boolean;
  className?: string;
}

/**
 * Subscribe link for a newsletter. Deliberately uses the site's own tokens
 * rather than LinkedIn's #0A66C2 or Substack's orange — the icon and label
 * carry the brand recognition, and the page stays visually coherent.
 */
export function NewsletterButton({
  publication = newsletter,
  variant = "default",
  size = "default",
  compact = false,
  className,
}: NewsletterButtonProps) {
  const Icon =
    publication.platform === "Substack" ? SubstackIcon : LinkedInIcon;

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={publication.url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Subscribe to ${publication.name} on ${publication.platform} (opens in a new tab)`}
      >
        <Icon
          className={cn("h-4 w-4", size === "lg" && "h-[1.1rem] w-[1.1rem]")}
        />
        {compact ? "Subscribe" : `Subscribe to ${publication.name}`}
      </a>
    </Button>
  );
}
