import { ArrowUpRight, Github } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";

// Import images properly (Vite safe)
import wordloomImg from "../assets/wordloom.png";
import carbookingImg from "../assets/carbooking.png";
import jobportalImg from "../assets/jobportal.png";
import quickbiteImg from "../assets/quick-bite.png";

const projects = [
  {
    title: "WordLoom – Full Stack Blog Platform",
    description:
      "Developed a full-stack blog platform with user authentication, CRUD operations, search functionality, and category filtering. Implemented secure REST APIs and responsive UI design.",
    image: wordloomImg,
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Tailwind CSS",
    ],
    link: "https://word-loom-alpha.vercel.app",
    github: "https://github.com/rosymohanty/WordLoom",
  },
  {
    title: "CarBook - Car Booking System",
    description:
      "Built a full-stack car booking platform with authentication, role-based access control, booking management, and secure backend APIs. Deployed backend on Render and frontend on Vercel.",
    image: carbookingImg,
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "REST API",
    ],
    link: "https://car-booking-mauve.vercel.app",
    github: "https://github.com/rosymohanty/Car-Booking.git",
  },
  {
    title: "CareerHive - Job Portal Application",
    description:
      "Developed a job portal system with user registration, job posting, application tracking, and protected routes. Integrated backend APIs with MongoDB for efficient data handling.",
    image: jobportalImg,
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Bootstrap",
    ],
    link: "https://careerhive-portal.vercel.app",
    github: "https://github.com/rosymohanty/Job-Portal.git",
  },
  {
    title: "Quick Bite – Food Ordering Web App",
    description:
      "Developed a responsive food ordering web application where users can browse food items, add them to cart, and place orders. Implemented a clean UI with smooth user experience and integrated backend APIs for order and menu management.",
    image: quickbiteImg,
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "REST API",
    ],
    link: "https://quick-bite-eight-pi.vercel.app",
    github: "https://github.com/rosymohanty/QuickBite",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
            My Projects
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground">
            Full Stack Applications
            <span className="font-serif italic font-normal text-white">
              {" "}I've Built.
            </span>
          </h2>

          <p className="text-muted-foreground">
            A collection of full-stack web applications built using the MERN stack and PHP,
            focusing on authentication, REST APIs, database integration, and responsive UI design.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group glass rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(32,178,166,0.4)] transition-all duration-300"
            >
              
              {/* Image */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />

                {/* Overlay Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>

                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/rosymohanty"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimatedBorderButton>
              View All Projects
              <ArrowUpRight className="w-5 h-5" />
            </AnimatedBorderButton>
          </a>
        </div>

      </div>
    </section>
  );
};