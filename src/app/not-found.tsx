import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex max-w-xl flex-col items-center py-24 text-center md:py-32">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 leading-7 text-muted-foreground">
        That page doesn&apos;t exist — it may have been moved or renamed.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/guides">Browse guides</Link>
        </Button>
      </div>
    </div>
  );
}
