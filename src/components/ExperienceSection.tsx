import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    period: "2025 - Present",
    title: "Executive (Store & Inventory Management)",
    company: "Step Media Limited",
    desc: "Overseeing store operations, inventory management, and logistics optimization for maximum efficiency.",
    current: true,
  },
  {
    period: "1.5 Years",
    title: "Junior Executive (HR & Admin)",
    company: "RFL Electronics Limited",
    desc: "Managed HR functions, employee data, ERP systems, and internal communications.",
  },
  {
    period: "0.8 Years",
    title: "Computer Operator & IT Support",
    company: "Mahdeen Group",
    desc: "Handled data entry, production finishing records, and IT support with high accuracy.",
  },
  {
    period: "Previous",
    title: "Data Entry Operator",
    company: "Chorka Apparels Limited",
    desc: "Accurate data entry and maintaining production records, building foundational skills.",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Career <span className="text-gradient-gold">Journey</span>
        </motion.h2>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-16"
              >
                {/* Dot */}
                <div className={`absolute left-4 top-1 w-4 h-4 rounded-full border-2 ${
                  exp.current ? "bg-primary border-primary glow-gold" : "bg-card border-muted-foreground/30"
                }`} />

                {exp.current && (
                  <span className="inline-block text-xs font-medium text-primary mb-1">Current Role</span>
                )}

                <span className="text-xs text-muted-foreground">{exp.period}</span>
                <h3 className="font-display text-lg font-semibold mt-1">{exp.title}</h3>
                <p className="text-sm text-primary/80 font-medium">{exp.company}</p>
                <p className="text-sm text-muted-foreground mt-2">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
