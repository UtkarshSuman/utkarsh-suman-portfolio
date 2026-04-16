const projects = [
  {
    id: 1,
    title: "MiniLink",
    description:
      "Create your link-in-bio page in seconds. Fully customisable, free forever — no account needed.",
    image:
      "/images/jokebox.png",
    popLabel: "link-in-bio",       // small label shown on image pop-out
    liveLink: "https://minilink.example.com",
    githubLink: "https://github.com/yourusername/minilink",
    techStack: [
      { name: "Next.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Vercel",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
    ],
  },
  {
    id: 2,
    title: "DevBoard",
    description:
      "A minimal developer dashboard that unifies GitHub activity, open PRs, and issue tracking.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    popLabel: "dashboard",
    liveLink: "https://devboard.example.com",
    githubLink: "https://github.com/yourusername/devboard",
    techStack: [
      { name: "React",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Redis",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    ],
  },
  {
    id: 3,
    title: "CodeSnap",
    description:
      "Turn raw code snippets into beautiful, shareable screenshots with one click.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14431b9?w=600&h=400&fit=crop",
    popLabel: "code → screenshot",
    liveLink: "https://codesnap.example.com",
    githubLink: "https://github.com/yourusername/codesnap",
    techStack: [
      { name: "Vue.js",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "Python",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Docker",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    ],
  },
];

export default projects;