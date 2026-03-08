import { motion } from "framer-motion";
import { Download, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.jpg";

const roles = ["HR Specialist", "Digital Marketer", "Data Entry Expert", "ERP Specialist"];

import { useState, useEffect } from "react";

const useTypewriter = (words: string[], speed = 100, pause = 2000) => {
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
          if (charIndex + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          }
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

const HeroSection = () => {
  const typed = useTypewriter(roles);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] -translate-y-1/2" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for Opportunities
          </span>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-4">
            MD. AMMAR ALI
            <br />
            <span className="text-gradient-gold">KHANDOKER</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-2">
            HR Specialist | Digital Marketing | Data Entry Expert
          </p>
          <p className="text-muted-foreground max-w-lg mb-4">
            Empowering businesses with streamlined HR, precise data management & creative digital solutions.
          </p>

          <p className="text-primary font-display text-xl mb-8">
            {typed}
            <span className="animate-pulse">▌</span>
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6">
              <a href="https://ammar-khandoker-bd.github.io/Amber-Ali/cv.pdf" target="_blank" rel="noopener">
                <Download className="w-4 h-4 mr-2" /> Download CV
              </a>
            </Button>
            <Button asChild variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
              <a href="#contact">
                <MessageCircle className="w-4 h-4 mr-2" /> Contact Me
              </a>
            </Button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
            {[
              { value: "4.5+", label: "Years Experience" },
              { value: "62+", label: "Certificates" },
              { value: "4", label: "Companies" },
              { value: "100%", label: "Commitment" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-gradient-gold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-[60px]" />
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-primary/40 glow-gold">
              <img
                src={profileImg}
                alt="MD. Ammar Ali Khandoker"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
