/**
 * Presentation helpers safe to import from client components — deliberately
 * free of any Node built-ins so bundling them never pulls `fs` into the browser.
 */

export function formatDate(date: string): string {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
