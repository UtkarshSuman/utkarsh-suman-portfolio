// data.js — Work Experience Data
// To use real logos: replace `logo: null` with `logo: "/logos/company.png"` or an external URL
// The `initials` and `color` fields are used as fallback when no logo is provided

export const experiences = [
  {
    id: 1,
    company: "Anthropic",
    role: "Senior AI Engineer",
    logo: null,
    initials: "AN",
    color: "#c084fc",
    bg: "rgba(192,132,252,0.12)",
    accentBorder: "rgba(192,132,252,0.35)",
    startDate: "Jan 2023",
    endDate: "Present",
    duration: "2 yrs",
    current: true,
    description:
      "Leading development of large-scale ML infrastructure and safety systems. Collaborating cross-functionally to ship production-grade AI products serving millions of users globally. Pioneering alignment research tooling adopted across the engineering org.",
    tags: ["Python", "LLMs", "MLOps", "Safety", "PyTorch"],
  },
  {
    id: 2,
    company: "Google DeepMind",
    role: "Machine Learning Engineer",
    logo: null,
    initials: "DM",
    color: "#34d399",
    bg: "rgba(52,211,153,0.1)",
    accentBorder: "rgba(52,211,153,0.35)",
    startDate: "Mar 2021",
    endDate: "Dec 2022",
    duration: "1 yr 9 mo",
    current: false,
    description:
      "Designed and optimised reinforcement learning pipelines for game-playing agents. Reduced training time by 40% via distributed compute architecture and custom CUDA kernels. Co-authored internal whitepaper on reward shaping strategies.",
    tags: ["RL", "TensorFlow", "GCP", "CUDA", "Research"],
  },
  {
    id: 3,
    company: "Stripe",
    role: "Software Engineer II",
    logo: null,
    initials: "ST",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.1)",
    accentBorder: "rgba(96,165,250,0.35)",
    startDate: "Jun 2019",
    endDate: "Feb 2021",
    duration: "1 yr 9 mo",
    current: false,
    description:
      "Built and maintained high-throughput payment APIs handling billions in daily transaction volume. Architected fraud detection microservices achieving sub-10ms latency at scale. Mentored two junior engineers and led bi-weekly technical design reviews.",
    tags: ["Ruby", "Go", "Kafka", "PostgreSQL", "Payments"],
  },
  {
    id: 4,
    company: "Accenture",
    role: "Associate Software Engineer",
    logo: null,
    initials: "AC",
    color: "#f97316",
    bg: "rgba(249,115,22,0.1)",
    accentBorder: "rgba(249,115,22,0.35)",
    startDate: "Jul 2017",
    endDate: "May 2019",
    duration: "1 yr 11 mo",
    current: false,
    description:
      "Developed enterprise web solutions for Fortune 500 clients in the finance sector. Led frontend migration from legacy AngularJS to React, boosting Lighthouse performance scores by 60%. Delivered three major client engagements on time and under budget.",
    tags: ["React", "Node.js", "Azure", "TypeScript", "Agile"],
  },
];