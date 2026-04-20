import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, BarChart3, Briefcase, Target, GraduationCap, ScrollText, Share2, FileText, MousePointerClick, AtSign, LineChart, Megaphone } from "lucide-react";

const hrSkills = [
  { name: "Recruitment & Talent Acquisition", level: 92, icon: Users },
  { name: "HR Management & HRIS", level: 90, icon: Briefcase },
  { name: "Payroll & Compensation", level: 85, icon: ScrollText },
  { name: "Performance Management", level: 88, icon: Target },
  { name: "Training & Development", level: 82, icon: GraduationCap },
  { name: "Labor Law & Compliance", level: 80, icon: ScrollText },
];

const digitalSkills = [
  { name: "Social Media Strategy", level: 90, icon: Share2 },
  { name: "Content Strategy", level: 88, icon: FileText },
  { name: "Meta Ads & Google Ads", level: 85, icon: MousePointerClick },
  { name: "Email Marketing", level: 80, icon: AtSign },
  { name: "Analytics & Reporting", level: 86, icon: LineChart },
  { name: "SEO & AI Automation", level: 87, icon: Megaphone },
];

const tools = [
  "BambooHR", "LinkedIn Recruiter", "ERP Software", "Microsoft Excel", "Google Sheets",
  "Canva", "WordPress", "Meta Business", "Google Analytics", "ChatGPT", "Gemini", "Notion",
];

const SkillBar = ({ skill, inView, delay }: { skill: { name: string; level: number; icon: any }; inView: boolean; delay: number }) => {
  const Icon = skill.icon;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-foreground/90 font-medium">
          <Icon className="w-3.5 h-3.5 text-accent" />
          {skill.name}
        </span>
        <span className="text-xs text-muted-foreground tabular-nums">{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_12px_hsl(244_100%_69%/0.6)]"
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 sm:py-28 relative">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[140px] pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Capabilities</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">
            Skills & <span className="text-gradient-gold">Expertise</span>
          </h2>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold">HR Skills</h3>
            </div>
            <div className="space-y-5">
              {hrSkills.map((s, i) => (
                <SkillBar key={s.name} skill={s} inView={inView} delay={i * 0.08} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold">Digital Skills</h3>
            </div>
            <div className="space-y-5">
              {digitalSkills.map((s, i) => (
                <SkillBar key={s.name} skill={s} inView={inView} delay={i * 0.08} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-6xl mx-auto"
        >
          <p className="text-center text-sm text-muted-foreground mb-5">Tools & Platforms</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {tools.map((t) => (
              <span
                key={t}
                className="text-xs px-4 py-2 rounded-full glass-card text-foreground/80 hover:text-accent hover:border-accent/40 transition-all hover-lift"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
