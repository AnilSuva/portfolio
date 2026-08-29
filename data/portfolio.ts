import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export const siteMetadata = {
  title: "Anil Suva | Full-Stack Developer & Software Engineer",
  description: "Personal portfolio of Anil Suva, a Full-Stack Developer and IT Engineering student specializing in React, Next.js, Node.js, and modern web applications.",
  siteUrl: "https://www.anilsuva.com",
  author: "Anil Suva",
};

export const personalInfo = {
  name: "Anil Suva",
  headline: "Full-Stack Developer",
  about: "I am an IT engineering passionate about software development and modern web technologies. I specialize in building responsive, high-performance web applications using JavaScript, TypeScript, React, Next.js, and modern backend technologies. I enjoy solving complex problems and continuously learning new skills to improve my craft.",
  email: "suvaanil80@gmail.com", // Placeholder
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/anilsuva", // Placeholder
      icon: GithubIcon,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/anil-suva-cte-gecbvn-it-441258290/", // Placeholder
      icon: LinkedinIcon,
    },
    {
      name: "Email",
      url: "mailto:suvaanil80@gmail.com", // Placeholder
      icon: Mail,
    },
  ],
};

export const education = [
  {
    degree: "B.E. / B.Tech. in Information Technology",
    school: "Government Engineering College, Bhavnagar",
    location: "Bhavnagar, Gujarat",
    startDate: "2023", // Placeholder
    endDate: "2027", // Placeholder
    description: "Focusing on software engineering, data structures, algorithms, and web technologies.",
  },
];

export const skills = [
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", invertDark: true },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", invertDark: true },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg", invertDark: true },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", invertDark: true },
];

export const projects = [
  {
    title: "Paytm Dummy",
    description: "A Paytm-inspired digital wallet built with React and TypeScript, featuring authentication, user search, wallet-to-wallet transfers, transaction history, and a clean responsive dashboard. Built with React, Express, MongoDB, Mongoose, and Tailwind CSS.",
    technologies: ["Express", "MongoDB", "TypeScript", "Bcrypt", "Tailwind"],
    githubUrl: "https://github.com/AnilSuva/paytm", // Placeholder
    liveUrl: "https://paytm-rupees.vercel.app",
    image: "/api/placeholder/800/450",
  },
];
