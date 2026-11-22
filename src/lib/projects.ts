export interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  /** Optional thumbnail under public/images. Falls back to an initials tile. */
  image?: string;
  /** Supporting architecture figure shown on the Projects page. */
  diagram?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
    summary: string;
  };
  anchor?: string;
  links?: {
    github?: string;
    maritime?: string;
    demo?: string;
    paper?: string;
  };
  /** Overrides the default link labels ("Code", "Demo", "Paper"). */
  linkLabels?: Partial<Record<"github" | "maritime" | "demo" | "paper", string>>;
  /** Short status note for projects without a public repo, e.g. "Private beta". */
  status?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Provable safety for human-in-the-loop AI",
    anchor: "closed-loop-safety",
    category: "AI Safety / Control Theory",
    description:
      "Flight-envelope protection guarantees an aircraft won’t stall whatever the pilot does: the safe set is proven invariant under any input. I’m exploring the same standard for AI systems: treat both the model and the human in the loop as worst-case disturbances, and verify a small shield that keeps the system’s actions inside a specified safe set, using barrier certificates, reachability analysis, and runtime-assurance architectures. Open questions: which harms can be specified as safe sets at all, and how human approval behaves as a feedback element.",
    tech: ["AI Safety", "Barrier Certificates", "Reachability", "Runtime Assurance", "Scalable Oversight"],
    status: "Research direction",
    featured: true,
  },
  {
    title: "Genomi",
    category: "Scientific AI / Verifiable Outputs",
    description:
      "A natural-language interface to microbial genomics, built with a domain expert. It takes isolates from sequencing to a ranked shortlist of strains. Answers are grounded in each run’s computed results, numerical claims are checked against them, and every answer links to supporting evidence and software versions. Also a testbed for studying how non-experts can oversee AI-generated scientific conclusions.",
    tech: ["Microbial Genomics", "Grounded Q&A", "Claim Checking", "Evidence Tracing"],
    links: {
      demo: "https://demo.genomi.si",
    },
    linkLabels: { demo: "Demo" },
    status: "Invite-only",
    featured: true,
  },
  {
    title: "Seahound",
    category: "Physics-Informed AI / Remote Sensing",
    description:
      "AIS-independent maritime intelligence combining Sentinel-1 SAR, ERA5, CMOD7, and uncertainty-aware residual learning. Evaluated across a 27-scene Strait of Hormuz record and presented at Defense TechConnect 2026.",
    tech: ["Sentinel-1 SAR", "ERA5", "CMOD7", "Uncertainty"],
    links: {
      maritime: "https://seahound.app/maritime",
      demo: "https://seahound.app",
      paper: "https://www.nabhas.ai/seahound/hormuz-august",
    },
    linkLabels: { maritime: "Maritime SAR", demo: "Coastal modeling", paper: "Hormuz study" },
    featured: true,
  },
  {
    title: "SDSU Science Commons",
    anchor: "science-commons",
    diagram: {
      src: "/images/Agentic-Science%20(1).png",
      width: 1448,
      height: 1086,
      alt: "Proposed agentic scientific workflow using computational fluid dynamics (CFD), with failed-run recovery and scientific feedback loops.",
      caption: "SDSU Science Commons: proposed agentic scientific workflow, illustrated with computational fluid dynamics (CFD). Architecture concept; working-group handoff and fall 2027 sandbox are planned.",
      summary: "The workflow defines a research objective, retrieves knowledge and data, plans simulations, discovers and calls tools through MCP, executes and monitors jobs, analyzes results, validates against physics or experiments, and recommends next steps. A failed-run recovery loop diagnoses execution errors and adjusts parameters. A separate scientific feedback loop uses mismatches or new evidence to select the next simulation. Shared services support orchestration, computing, data, research state, provenance, and security.",
    },
    category: "Scientific AI",
    description:
      "As Co-Executive Director of SDSU’s AI center, I assembled campus research projects and proposed a shared architecture for agentic scientific workflows. In the computational fluid dynamics example, one loop recovers from failed runs and another uses physical or experimental evidence to select the next simulation. A working-group handoff and a fall 2027 sandbox are planned.",
    tech: ["AI for Science", "Scientific Workflows", "Cross-Campus Research", "Experiment Design"],
    status: "Pilot · sandbox planned for fall 2027",
    featured: true,
  },
  {
    title: "Inventrix",
    category: "Research Intelligence",
    description:
      "Search more than 300,000 funded NSF awards by research topic. In a 54-query evaluation, Inventrix returned at least one useful result in the top five for 49 queries, compared with four for NSF award search.",
    tech: ["Hybrid Retrieval", "RAG", "pgvector", "NSF Awards", "Next.js"],
    links: {
      demo: "https://inventrix.app/research/awards",
    },
    linkLabels: { demo: "Search NSF awards" },
    status: "Private repo",
    featured: true,
  },
  {
    title: "instaprop",
    category: "Agentic Research Workflows",
    description:
      "A double-loop agentic review system for NSF concept notes. Five simulated reviewers score the draft against 17 criteria. One loop revises the draft. The other revisits the contribution brief, including the novelty claim and evaluation plan.",
    tech: ["Agentic Workflows", "LLM Orchestration", "Python", "CLI", "PyPI"],
    links: {
      github: "https://github.com/rkavasseri/instaprop",
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

/** Keep research and deployed systems grouped independently of array position. */
export const researchProjects = projects.filter((project) =>
  ["Provable safety for human-in-the-loop AI", "Genomi", "Seahound", "SDSU Science Commons"].includes(project.title),
);

export const productionProjects = projects.filter(
  (project) => !researchProjects.includes(project),
);
