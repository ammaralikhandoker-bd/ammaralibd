import { motion } from "framer-motion";
import { Mail, Phone, MapPin, GraduationCap } from "lucide-react";
import aboutImg from "@/assets/about-photo.png";

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-16"
        >
          About <span className="text-gradient-gold">Me</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-border">
              <img src={aboutImg} alt="Ammar Ali Khandoker" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-xl font-semibold mb-4">Professional Summary</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Highly organized and detail-oriented professional with 4.5+ years of experience in Data Entry, ERP Systems, and Admin Support. I specialize in managing large datasets, Inventory Management, and HRIS workflows. My goal is to use technology to drive organizational efficiency.
            </p>

            <ul className="space-y-2 mb-8 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                Expert in ERP systems, HRIS workflows & inventory management
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                Bangladesh Government Certified Freelancer
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                AI automation & SEO specialist driving digital growth
              </li>
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <a href="mailto:ammar.khandoker@outlook.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 text-primary" /> ammar.khandoker@outlook.com
              </a>
              <a href="tel:+8801716861353" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4 text-primary" /> +8801716-861353
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" /> Savar, Dhaka
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <GraduationCap className="w-4 h-4 text-primary" /> BSS (Social Science)
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
