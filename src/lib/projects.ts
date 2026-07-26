export interface Project {
  title: string;
  description: string;
  tech: string[];
  /** Optional thumbnail under public/images. Falls back to an initials tile. */
  image?: string;
  links?: {
    github?: string;
    demo?: string;
    paper?: string;
  };
  /** Overrides the default link labels ("Code", "Demo", "Paper"). */
  linkLabels?: Partial<Record<"github" | "demo" | "paper", string>>;
  /** Short status note for projects without a public repo, e.g. "Private beta". */
  status?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Inventrix",
    description:
      "Retrieval-augmented semantic search over NSF awards. Embeds a research idea, retrieves and clusters the nearest awards, then chains LLM synthesis to map the funding landscape: crowded themes, adjacent work, and open gaps.",
    tech: ["RAG", "Semantic Search", "Embeddings", "pgvector", "Next.js"],
    links: {
      demo: "https://www.inventrix.app",
    },
    linkLabels: { demo: "inventrix.app" },
    status: "Private repo",
    featured: true,
  },
  {
    title: "instaprop",
    description:
      "CLI toolkit that drafts NSF proposals with an agentic review panel. Give it a solicitation and your merit bullets; it returns a concept note vetted by five simulated reviewers through a draft–review–revise loop.",
    tech: ["Agentic Workflows", "LLM Orchestration", "Python", "CLI", "PyPI"],
    links: {
      // NOTE: points at rkavasseri — update if the transfer is not completed.
      github: "https://github.com/rkavasseri/instaprop",
      demo: "https://pypi.org/project/instaprop/",
    },
    linkLabels: { demo: "PyPI" },
    featured: true,
  },
];
