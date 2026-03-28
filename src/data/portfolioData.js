import { FaNodeJs, FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";
import { SiExpress, SiPostgresql } from "react-icons/si";

export const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack app with React, Node.js and MongoDB.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Task Management App",
    description:
      "Real-time collaborative task manager.",
    tags: ["React", "Firebase"],
  },
];

export const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript"],
  },
  {
    category: "Backend",
    items: ["Node.js", "MongoDB"],
  },
];

export const experiences = [
  {
    title: "Senior Developer",
    company: "Tech Inc.",
    period: "2023 - Present",
    description: "Building scalable applications.",
  },
];



export const codingProfiles = [
  {
    platform: "LeetCode",
    username: "utkarsh123",
    link: "https://leetcode.com/utkarsh123",
    icon: "/images/leetcode.png"
  },
  {
    platform: "CodeChef",
    username: "utkarsh_chef",
    link: "https://codechef.com/users/utkarsh_chef",
    icon: "/images/codeforces.png"
  },
  {
    platform: "GitHub",
    username: "Utkarsh",
    link: "https://github.com/Utkarsh",
    icon: "/images/github.png"
  }
];

export const projects2 = [
  {
    id: 1,
    title: "Mini Postman",
    tagline:
      "A lightweight API testing tool to send HTTP requests and instantly inspect responses, status codes, and JSON data.",
    previewImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    liveUrl: "#",
    tags: [FaNodeJs, SiExpress],
    accentColor: "#38bdf8",
  },
  {
    id: 2,
    title: "Task Management App",
    tagline:
      "Full-stack task manager with secure authentication and persistent task storage using PostgreSQL.",
    previewImage:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80",
    liveUrl: "#",
    tags: [FaNodeJs, SiPostgresql],
    accentColor: "#6ee7b7",
  },
  {
    id: 3,
    title: "Tic Tac Toe",
    tagline:
      "Interactive two-player browser game implementing game logic, win detection algorithms, and dynamic UI updates.",
    previewImage:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&q=80",
    liveUrl: "#",
    tags: [FaHtml5, FaCss3Alt, FaJs],
    accentColor: "#a78bfa",
  },
];

export const techStack = [
  {
    category: "Frontend",
    icon: "◈",
    color: "#60efff",
    techs: [
      { name: "React", level: 95, icon: "⚛" },
      { name: "Next.js", level: 90, icon: "▲" },
      { name: "TypeScript", level: 88, icon: "τ" },
      { name: "Tailwind CSS", level: 92, icon: "✦" },
    ],
  },
  {
    category: "Backend",
    icon: "◉",
    color: "#a78bfa",
    techs: [
      { name: "Node.js", level: 85, icon: "⬡" },
      { name: "Express", level: 82, icon: "∞" },
      { name: "Python", level: 78, icon: "⌬" },
      { name: "FastAPI", level: 75, icon: "⚡" },
    ],
  },
  {
    category: "Database",
    icon: "◎",
    color: "#34d399",
    techs: [
      { name: "PostgreSQL", level: 80, icon: "🐘" },
      { name: "MongoDB", level: 85, icon: "◍" },
      { name: "Redis", level: 72, icon: "◐" },
      { name: "Prisma", level: 78, icon: "◆" },
    ],
  },
  {
    category: "DevOps",
    icon: "◇",
    color: "#fb923c",
    techs: [
      { name: "Docker", level: 80, icon: "◻" },
      { name: "GitHub Actions", level: 75, icon: "○" },
      { name: "Vercel", level: 90, icon: "△" },
      { name: "AWS", level: 68, icon: "☁" },
    ],
  },
];

