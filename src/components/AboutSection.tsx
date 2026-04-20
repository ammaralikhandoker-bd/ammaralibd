import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, GraduationCap, Briefcase, Award, Building2, Sparkles } from "lucide-react";
import aboutImg from "@/assets/about-photo.png";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { icon: Briefcase, value: 4.5, suffix: "+", label: "Years Experience" },
  { icon: Sparkles, value: 50, suffix: "+", label: "Projects" },
  { icon: Building2, value: 4, suffix: "", label: "Companies" },
  { icon: Award, value: 62, suffix: "+", label: "Certifications" },
];

const highlights = [
  "HR Management",
  "ERP Systems",
  "Inventory",
  "Digital Marketing",
  "AI Automation",
  "SEO",
];

const StatCard = ({ stat, inView, delay }: { stat: typeof stats[number]; inView: boolean; delay: number }) => {
  const value = useCountUp(stat.value, 1600, inView);
  const display = stat.value % 1 === 0 ? Math.round(value) : value.toFixed(1);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      className="glass-card rounded-2xl p-4 sm:p-5 text-center hover-lift"
    >
      <stat.icon className="w-5 h-5 mx-auto text-accent mb-2" />
      <p className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold">
        {display}{stat.suffix}
      </p>
      <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">{stat.label}</p>
    </motion.div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Get to know</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">
            About <span className="text-gradient-gold">Me</span>
          </h2>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary to-accent opacity-30 blur-xl" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden glass-card p-1">
                <img
                  src={aboutImg}
                  alt="MD. Ammar Ali Khandoker"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[1.4rem]"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-display text-2xl font-semibold mb-4">Professional Summary</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Highly organized and detail-oriented professional with 4.5+ years of experience in
              Data Entry, ERP Systems, and Admin Support. I specialize in managing large datasets,
              Inventory Management, and HRIS workflows. My goal is to use technology to drive
              organizational efficiency.
            </p>

            <div className="mb-8">
              <p className="text-sm font-semibold text-foreground mb-3">What I Do</p>
              <div className="flex flex-wrap gap-2">
                {highlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs px-3 py-1.5 rounded-full glass-card text-foreground/80 hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {stats.map((s, i) => (
                <StatCard key={s.label} stat={s} inView={inView} delay={i * 0.1} />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <a href="mailto:ammar.khandoker@outlook.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-accent" /> ammar.khandoker@outlook.com
              </a>
              <a href="tel:+8801716861353" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-accent" /> +8801716-861353
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" /> Savar, Dhaka
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <GraduationCap className="w-4 h-4 text-accent" /> BSS (Social Science)
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
