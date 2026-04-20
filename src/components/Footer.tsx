import { Linkedin, Facebook, Mail, Phone, Github, Send } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/ammar-khandoker-bd", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/share/187NdGsk4e/", label: "Facebook" },
  { icon: Github, href: "https://github.com/ammar-khandoker-bd", label: "GitHub" },
  { icon: Send, href: "https://t.me/bdalikm", label: "Telegram" },
  { icon: Mail, href: "mailto:ammar.khandoker@outlook.com", label: "Email" },
  { icon: Phone, href: "https://wa.me/8801716861353", label: "WhatsApp" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-border/60 bg-card/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <a href="#home" className="font-display text-2xl font-bold tracking-tight">
              AMMAR <span className="text-gradient-gold">ALI</span>
            </a>
            <p className="text-sm text-muted-foreground mt-3 max-w-xs leading-relaxed">
              HR Professional & Digital Strategist building people-first systems and digital growth.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Quick Links</p>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-muted-foreground hover:text-primary transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Connect</p>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.label}
                  className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border/60 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MD. Ammar Ali Khandoker. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
