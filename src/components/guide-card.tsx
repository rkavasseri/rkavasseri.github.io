import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { GuideMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/format";

export function GuideCard({ guide }: { guide: GuideMeta }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="flex h-full flex-col transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-md">
        <CardHeader className="flex-none">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <time dateTime={guide.date}>{formatDate(guide.date)}</time>
            <span aria-hidden>·</span>
            <span>{guide.readTime} min read</span>
          </div>
          <CardTitle className="text-lg leading-snug transition-colors group-hover:text-primary">
            {guide.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1">
          <CardDescription className="leading-6">
            {guide.description}
          </CardDescription>
        </CardContent>

        <CardFooter className="flex-none flex-wrap gap-2">
          {guide.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
