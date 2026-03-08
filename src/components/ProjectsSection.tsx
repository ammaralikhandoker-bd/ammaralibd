import { motion } from "framer-motion";

const projects = [
  {
    title: "HR & Payroll Management System",
    desc: "Developed a comprehensive HR management and payroll processing system for a mid-size company, streamlining employee onboarding, attendance tracking, and salary disbursement.",
    tags: ["Excel", "ERP Software", "Google Sheets"],
  },
  {
    title: "E-Commerce Social Media Campaign",
    desc: "Designed and executed a full-funnel digital marketing campaign across Facebook, Instagram, and LinkedIn, resulting in a significant increase in brand awareness and lead generation.",
    tags: ["Canva", "Meta Ads", "SEO", "Content Strategy"],
  },
  {
    title: "Inventory Data Digitization",
    desc: "Led the digitization of a 10,000+ product inventory from physical records into a structured digital database with real-time tracking capabilities.",
    tags: ["Microsoft Excel", "Google Sheets", "Data Entry"],
  },
  {
    title: "Corporate Branding & Design",
    desc: "Created a complete visual branding package including logo, business cards, social media templates, and marketing collateral for a startup.",
    tags: ["Canva", "Graphic Design", "WordPress"],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Featured <span className="text-gradient-gold">Projects</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/20 transition-all"
            >
              <h3 className="font-display text-lg font-semibold mb-3">{proj.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{proj.desc}</p>
              <div className="flex flex-wrap gap-2">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
