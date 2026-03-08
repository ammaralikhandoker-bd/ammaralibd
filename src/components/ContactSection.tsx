import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

const socials = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/ammar-khandoker-bd" },
  { label: "Facebook", url: "https://www.facebook.com/share/187NdGsk4e/" },
  { label: "X (Twitter)", url: "https://x.com/ammar844231" },
  { label: "GitHub", url: "https://github.com/ammar-khandoker-bd" },
  { label: "Telegram", url: "https://t.me/bdalikm" },
  { label: "WhatsApp", url: "https://wa.me/8801716861353" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Get In <span className="text-gradient-gold">Touch</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="space-y-4 mb-8">
            <a href="mailto:ammar.khandoker@outlook.com" className="flex items-center justify-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-5 h-5 text-primary" /> ammar.khandoker@outlook.com
            </a>
            <a href="tel:+8801716861353" className="flex items-center justify-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-5 h-5 text-primary" /> +8801716-861353
            </a>
          </div>

          <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
          <div className="flex flex-wrap justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener"
                className="text-xs px-4 py-2 rounded-full border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="border-t border-border mt-24 pt-8">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} MD. Ammar Ali Khandoker. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
