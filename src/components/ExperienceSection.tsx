import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const experiences = [
  {
    period: "2025 — Present",
    title: "Executive (Store & Inventory Management)",
    company: "Step Media Limited",
    points: [
      "Overseeing store operations, stock control & logistics optimization",
      "Implementing digital inventory tracking & reporting workflows",
      "Cross-team coordination for procurement & vendor management",
    ],
    current: true,
  },
  {
    period: "1.5 Years",
    title: "Junior Executive (HR & Admin)",
    company: "RFL Electronics Limited",
    points: [
      "Managed end-to-end HR functions & employee lifecycle",
      "Maintained ERP-driven employee data & internal communications",
      "Streamlined recruitment, onboarding & payroll processing",
    ],
  },
  {
    period: "0.8 Years",
    title: "Computer Operator & IT Support",
    company: "Mahdeen Group",
    points: [
      "High-accuracy data entry across production finishing records",
      "Day-to-day IT support, troubleshooting & system maintenance",
    ],
  },
  {
    period: "Previous",
    title: "Data Entry Operator",
    company: "Chorka Apparels Limited",
    points: [
      "Maintained accurate production records & data integrity",
      "Built foundational skills in data accuracy and reporting",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 sm:py-28 relative">
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Career Path</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">
            Career <span className="text-gradient-gold">Journey</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Center line (desktop) / left line (mobile) */}
          <div className="absolute md:left-1/2 left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:-translate-x-1/2" />

          <div className="space-y-10 md:space-y-16">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative md:grid md:grid-cols-2 md:gap-10 items-start ${
                    isLeft ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute md:left-1/2 left-4 top-3 w-4 h-4 rounded-full md:-translate-x-1/2 -translate-x-1/2 z-10">
                    <div className={`absolute inset-0 rounded-full ${exp.current ? "bg-gradient-to-br from-primary to-accent glow-ring" : "bg-muted border-2 border-primary/40"}`} />
                  </div>

                  <div className={`pl-12 md:pl-0 ${isLeft ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                    <div className="glass-card rounded-2xl p-5 sm:p-6 hover-lift inline-block w-full">
                      {exp.current && (
                        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground mb-2">
                          Current Role
                        </span>
                      )}
                      <p className="text-xs text-accent font-medium mb-1">{exp.period}</p>
                      <h3 className="font-display text-lg font-semibold">{exp.title}</h3>
                      <p className="text-sm text-primary/90 font-medium mb-3">{exp.company}</p>
                      <ul className={`text-sm text-muted-foreground space-y-1.5 ${isLeft ? "md:text-right" : ""}`}>
                        {exp.points.map((p, j) => (
                          <li key={j} className={`flex gap-2 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                            <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="hidden md:block" />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 font-semibold rounded-xl shadow-[var(--shadow-glow)]"
            >
              <a href="https://ammar-khandoker-bd.github.io/Amber-Ali/cv.pdf" target="_blank" rel="noopener">
                <Download className="w-4 h-4 mr-2" /> Download Full CV
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
