import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X, Briefcase, Megaphone, Award, Layers } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Category = "All" | "HR" | "Digital" | "Achievements";

const projects: {
  title: string;
  desc: string;
  long: string;
  tags: string[];
  category: Exclude<Category, "All">;
  icon: any;
}[] = [
  {
    title: "HR & Payroll Management System",
    desc: "End-to-end HR & payroll system streamlining onboarding, attendance & salary disbursement.",
    long: "Developed a comprehensive HR management and payroll processing system for a mid-size company, streamlining employee onboarding, attendance tracking, and salary disbursement. Integrated reporting dashboards reduced monthly payroll close time by ~40%.",
    tags: ["Excel", "ERP", "Google Sheets"],
    category: "HR",
    icon: Briefcase,
  },
  {
    title: "E-Commerce Social Media Campaign",
    desc: "Full-funnel campaign across Meta & LinkedIn driving major lift in awareness & leads.",
    long: "Designed and executed a full-funnel digital marketing campaign across Facebook, Instagram, and LinkedIn — including creative, copy, audience targeting and weekly optimization — resulting in a significant increase in brand awareness and qualified leads.",
    tags: ["Canva", "Meta Ads", "SEO", "Content Strategy"],
    category: "Digital",
    icon: Megaphone,
  },
  {
    title: "Inventory Data Digitization",
    desc: "Digitized 10,000+ product inventory into a structured database with real-time tracking.",
    long: "Led the digitization of a 10,000+ product inventory from physical records into a structured digital database with real-time tracking capabilities, enabling fast lookups, audit trails, and accurate reorder forecasting.",
    tags: ["Microsoft Excel", "Google Sheets", "Data Entry"],
    category: "HR",
    icon: Layers,
  },
  {
    title: "Corporate Branding & Design",
    desc: "Complete visual branding package — logo, cards, social templates & marketing collateral.",
    long: "Created a complete visual branding package including logo, business cards, social media templates, and marketing collateral for a startup. Established a cohesive design system used across all customer touchpoints.",
    tags: ["Canva", "Graphic Design", "WordPress"],
    category: "Digital",
    icon: Megaphone,
  },
  {
    title: "Bangladesh Govt. Certified Freelancer",
    desc: "Officially recognized digital professional under national freelancer program.",
    long: "Recognized as a Bangladesh Government Certified Freelancer — an official acknowledgement of digital service capabilities, completed coursework, and adherence to national freelancing standards.",
    tags: ["Recognition", "Govt. Certified"],
    category: "Achievements",
    icon: Award,
  },
  {
    title: "62+ Professional Certifications",
    desc: "Continuous learning across HR, AI, Productivity, Marketing & more.",
    long: "Earned 62+ professional certifications from Google, LinkedIn Learning, Kaggle, HRCI, HP LIFE, Udemy and more — covering AI agents, HR strategy, productivity, marketing, and analytics.",
    tags: ["Continuous Learning"],
    category: "Achievements",
    icon: Award,
  },
];

const categories: Category[] = ["All", "HR", "Digital", "Achievements"];

const ProjectsSection = () => {
  const [active, setActive] = useState<Category>("All");
  const [open, setOpen] = useState<typeof projects[number] | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Selected Work</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">
            Featured <span className="text-gradient-gold">Portfolio</span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === c
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((proj, i) => {
              const Icon = proj.icon;
              return (
                <motion.div
                  key={proj.title}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 100, damping: 18 }}
                  className="group relative glass-card rounded-2xl overflow-hidden hover-lift"
                >
                  {/* Visual header */}
                  <div className="aspect-[16/10] relative bg-gradient-to-br from-primary/20 via-accent/10 to-transparent overflow-hidden">
                    <div className="absolute inset-0 bg-mesh opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-14 h-14 text-foreground/40 group-hover:text-accent group-hover:scale-110 transition-all duration-500" />
                    </div>
                    <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-sm text-accent border border-accent/20">
                      {proj.category}
                    </span>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => setOpen(proj)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium text-sm shadow-[var(--shadow-glow)]"
                      >
                        <Eye className="w-4 h-4" /> View Details
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{proj.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{proj.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-secondary/60 text-secondary-foreground border border-border/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="sm:max-w-lg glass-card border-border/60">
          {open && (
            <>
              <DialogHeader>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">{open.category}</span>
                <DialogTitle className="font-display text-2xl">{open.title}</DialogTitle>
                <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-2">
                  {open.long}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2 pt-2">
                {open.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
