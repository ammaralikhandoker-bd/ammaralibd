import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, MessageCircle, Linkedin, Facebook, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.jpg";
import ParticleBackground from "./ParticleBackground";

const roles = [
  "HR Professional",
  "Digital Strategist",
  "Team Builder",
  "People & Culture Expert",
];

const useTypewriter = (words: string[], speed = 90, pause = 1800) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
          if (charIndex + 1 === current.length) setTimeout(() => setDeleting(true), pause);
        } else {
          setText(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
          if (charIndex <= 1) {
            setDeleting(false);
            setWordIndex((w) => (w + 1) % words.length);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return text;
};

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/ammar-khandoker-bd", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/share/187NdGsk4e/", label: "Facebook" },
  { icon: Mail, href: "mailto:ammar.khandoker@outlook.com", label: "Email" },
  { icon: Phone, href: "https://wa.me/8801716861353", label: "WhatsApp" },
];

const HeroSection = () => {
  const typed = useTypewriter(roles);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Animated background layers */}
      <div className="absolute inset-0 bg-mesh opacity-80" />
      <ParticleBackground />
      <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px] animate-blob" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/15 blur-[100px] animate-blob" style={{ animationDelay: "4s" }} />

      <div className="container relative mx-auto px-4 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Left content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-primary text-xs sm:text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Available for Opportunities
          </motion.span>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5 text-foreground"
          >
            MD. Ammar Ali
            <br />
            <span className="text-gradient-gold animate-gradient bg-clip-text">
              Khandoker
            </span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-foreground/90 mb-3 min-h-[2.2em] sm:min-h-[1.6em]"
          >
            <span className="text-gradient-cyan">{typed}</span>
            <span className="inline-block w-[2px] h-[1em] bg-accent ml-1 align-middle animate-pulse" />
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-base text-muted-foreground max-w-xl mb-8 leading-relaxed"
          >
            Empowering businesses with streamlined HR, precise data management & creative
            digital solutions across Bangladesh.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-wrap gap-3 sm:gap-4 mb-10"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 font-semibold px-6 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-cyan)] transition-all duration-500 rounded-xl"
            >
              <a href="https://ammar-khandoker-bd.github.io/Amber-Ali/cv.pdf" target="_blank" rel="noopener">
                <Download className="w-4 h-4 mr-2" /> Download CV
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/40 bg-transparent text-foreground hover:bg-primary/10 hover:border-primary rounded-xl backdrop-blur-sm"
            >
              <a href="#contact">
                <MessageCircle className="w-4 h-4 mr-2" /> Contact Me
              </a>
            </Button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex items-center gap-3"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                aria-label={s.label}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:scale-110 transition-all duration-300"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right photo with animated glowing ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end order-first lg:order-last"
        >
          <div className="relative">
            {/* Spinning gradient ring */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-primary via-accent to-primary blur-md opacity-60 animate-spin-slow" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-accent" />

            {/* Photo */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] rounded-full overflow-hidden border-4 border-background">
              <img
                src={profileImg}
                alt="MD. Ammar Ali Khandoker"
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 glass-card px-3 py-2 rounded-2xl text-xs font-semibold text-foreground"
            >
              <span className="text-gradient-cyan">4.5+</span> Years
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 glass-card px-3 py-2 rounded-2xl text-xs font-semibold text-foreground"
            >
              <span className="text-gradient-gold">62+</span> Certs
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
