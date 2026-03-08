import { motion } from "framer-motion";
import { Users, Database, TrendingUp, Palette } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "HR & Administration",
    desc: "End-to-end human resource management, recruitment, and payroll processing.",
    tags: ["HR Management", "Recruitment", "Payroll", "Employee Relations", "HR & ERP"],
  },
  {
    icon: Database,
    title: "Data & IT",
    desc: "Accurate data entry, spreadsheet mastery, and technical support.",
    tags: ["Data Entry", "Microsoft Excel", "Google Sheets", "IT Support"],
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    desc: "SEO, social media strategy, and content marketing that drives results.",
    tags: ["Digital Marketing", "Social Media", "SEO", "Content Creation", "AI Automation"],
  },
  {
    icon: Palette,
    title: "Design & Web",
    desc: "Visual design and web development for compelling digital presence.",
    tags: ["Canva", "Graphic Design", "WordPress", "Web Design"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Services & <span className="text-gradient-gold">Expertise</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-all group"
            >
              <svc.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-lg font-semibold mb-2">{svc.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{svc.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
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

export default SkillsSection;
