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
  featured?: boolean;
}

// TODO: replace placeholder projects with real work.
export const projects: Project[] = [
  {
    title: "Grid Stability Simulator",
    description:
      "Transient stability analysis for large interconnected power networks, with a solver that scales across multi-node CPU clusters.",
    tech: ["C++", "MPI", "Python", "NumPy"],
    links: {
      github: "https://github.com/rkavasseri",
      paper: "https://example.com/paper",
    },
    featured: true,
  },
  {
    title: "PMU Anomaly Detection",
    description:
      "Streaming detection of anomalous events in phasor measurement unit data using sequence models trained on synthetic fault scenarios.",
    tech: ["PyTorch", "Kafka", "Pandas"],
    links: {
      github: "https://github.com/rkavasseri",
    },
    featured: true,
  },
  {
    title: "Renewable Forecasting Toolkit",
    description:
      "Short-horizon wind and solar generation forecasts combining numerical weather prediction output with gradient-boosted residual models.",
    tech: ["Python", "XGBoost", "ERA5", "Dask"],
    links: {
      github: "https://github.com/rkavasseri",
      demo: "https://example.com/demo",
    },
    featured: true,
  },
];
