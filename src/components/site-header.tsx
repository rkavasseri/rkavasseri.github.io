"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, siteConfig, type NavLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

function isActive(pathname: string, link: NavLink): boolean {
  if (link.href === "/") return pathname === "/";
  if (pathname.startsWith(link.href.split("#")[0])) return true;
  // A parent is active when any of its internal children are.
  return (link.items ?? []).some(
    (child) => !child.external && pathname.startsWith(child.href.split("#")[0])
  );
}

const linkBase =
  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function ActiveUnderline() {
  return (
    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-foreground" />
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight transition-colors hover:text-primary"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active = isActive(pathname, link);

            if (link.items) {
              return (
                <DropdownMenu key={link.href}>
                  <DropdownMenuTrigger
                    className={cn(
                      linkBase,
                      "inline-flex items-center gap-1 data-[state=open]:text-foreground",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.title}
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform duration-200 [[data-state=open]>&]:rotate-180"
                      aria-hidden
                    />
                    {active ? <ActiveUnderline /> : null}
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="start">
                    {link.items.map((child) => (
                      <DropdownMenuItem key={child.href} asChild>
                        <Link
                          href={child.href}
                          target={child.external ? "_blank" : undefined}
                          rel={
                            child.external ? "noreferrer noopener" : undefined
                          }
                          className="flex-col items-start gap-0.5"
                        >
                          <span className="flex items-center gap-1 font-medium">
                            {child.title}
                            {child.external ? (
                              <ArrowUpRight
                                className="h-3 w-3 text-muted-foreground"
                                aria-hidden
                              />
                            ) : null}
                          </span>
                          {child.description ? (
                            <span className="text-xs leading-snug text-muted-foreground">
                              {child.description}
                            </span>
                          ) : null}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  linkBase,
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.title}
                {active ? <ActiveUnderline /> : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 overflow-y-auto">
              <SheetTitle className="text-left">{siteConfig.name}</SheetTitle>
              <nav
                className="mt-8 flex flex-col gap-1"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => {
                  const active = isActive(pathname, link);
                  return (
                    <div key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        )}
                      >
                        {link.title}
                      </Link>

                      {/* Sub-items render inline on mobile — no nested menus. */}
                      {link.items ? (
                        <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-border pl-3">
                          {link.items.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpen(false)}
                              target={child.external ? "_blank" : undefined}
                              rel={
                                child.external
                                  ? "noreferrer noopener"
                                  : undefined
                              }
                              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
                            >
                              {child.title}
                              {child.external ? (
                                <ArrowUpRight className="h-3 w-3" aria-hidden />
                              ) : null}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
