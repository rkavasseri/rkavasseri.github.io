import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

/**
 * rehype-pretty-code replaces code block children with highlighted spans, so
 * the original source is gone by render time. Stash it on the <pre> element
 * beforehand (as `raw`) so <CopyButton /> has something to copy.
 */
export function rehypeRawCode() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "pre") return;

      const [child] = node.children;
      if (!child || child.type !== "element" || child.tagName !== "code") {
        return;
      }

      const text = child.children
        .filter((n): n is { type: "text"; value: string } => n.type === "text")
        .map((n) => n.value)
        .join("");

      node.properties = { ...node.properties, raw: text };
    });
  };
}
