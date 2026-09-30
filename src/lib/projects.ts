export interface Project {
  title: string;
  category: string;
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
    title: "Sabha",
    category: "Foundational AI",
    description:
      "Sparse latent coordination of specialist language models. Three ~234M specialist transformers are coordinated by a compact Council decoder; the top-2 system reports 7.708 multitask cross-entropy versus 7.721 for a 729M dense baseline at 74.5% estimated inference FLOPs. Submitted to ICLR 2027.",
    tech: ["Specialist Models", "Sparse Coordination", "Transformers", "Efficient Inference"],
    status: "ICLR 2027 submission",
    featured: true,
  },
  {
    title: "Seahound",
    category: "Physics-Informed AI / Remote Sensing",
    description:
      "AIS-independent maritime intelligence combining Sentinel-1 SAR, ERA5, CMOD7, and uncertainty-aware residual learning. Evaluated across a 27-scene Strait of Hormuz record and presented at Defense TechConnect 2026.",
    tech: ["Sentinel-1 SAR", "ERA5", "CMOD7", "Uncertainty"],
    links: {
      demo: "https://www.seahound.app",
      paper: "https://www.nabhas.ai/seahound/hormuz-august",
    },
    linkLabels: { demo: "seahound.app", paper: "Hormuz study" },
    featured: true,
  },
  {
    title: "Frontier AI for Scientific Discovery",
    category: "Scientific AI",
    description:
      "A cross-campus initiative identifying experimentally grounded frontier-AI workflows across biological discovery, therapeutics, agriculture, Earth observation, physics-informed simulation, and autonomous systems.",
    tech: ["AI for Science", "Scientific Workflows", "Cross-Campus Research", "Experiment Design"],
    status: "Research initiative",
    featured: true,
  },
  {
    title: "Inventrix",
    category: "Research Intelligence",
    description:
      "Evidence-grounded research discovery across more than 300,000 NSF awards. Hybrid dense and sparse retrieval, pgvector, and LLM synthesis map crowded themes, adjacent work, and open research gaps.",
    tech: ["Hybrid Retrieval", "RAG", "pgvector", "NSF Awards", "Next.js"],
    links: {
      demo: "https://www.inventrix.app",
    },
    linkLabels: { demo: "inventrix.app" },
    status: "Private repo",
    featured: true,
  },
  {
    title: "instaprop",
    category: "Agentic Research Workflows",
    description:
      "Open-source multi-agent system for NSF proposal development and review. It turns a solicitation and contribution brief into a draft, then runs a five-reviewer draft–review–revise loop with rubric-aligned scorecards.",
    tech: ["Agentic Workflows", "LLM Orchestration", "Python", "CLI", "PyPI"],
    links: {
      github: "https://github.com/kavasserirocks/instaprop",
      demo: "https://pypi.org/project/instaprop/",
    },
    linkLabels: { demo: "PyPI" },
    featured: true,
  },
  {
    title: "Roamance",
    category: "Production Semantic Search",
    description:
      "Experiential semantic retrieval and representation design for discovering films and experiences by how they feel, rather than by conventional metadata lookup.",
    tech: ["Semantic Search", "Representation Design", "Embeddings", "Production AI"],
    status: "In development",
    featured: true,
  },
];
