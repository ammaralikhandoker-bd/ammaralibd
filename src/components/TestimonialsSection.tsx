import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Rashidul Hasan",
    role: "HR Manager",
    company: "RFL Electronics",
    rating: 5,
    text: "Ammar's attention to detail with HRIS workflows and ERP data was outstanding. He brought structure and reliability to our HR operations from day one.",
    initials: "RH",
  },
  {
    name: "Tanvir Ahmed",
    role: "Operations Lead",
    company: "Step Media Limited",
    rating: 5,
    text: "Excellent inventory & store management. Ammar streamlined our stock processes and built reporting that we now rely on every single week.",
    initials: "TA",
  },
  {
    name: "Nusrat Jahan",
    role: "Marketing Director",
    company: "Independent Brand",
    rating: 5,
    text: "Creative, fast, and strategic. The social campaign Ammar designed for us delivered serious lift in engagement and qualified leads — highly recommended.",
    initials: "NJ",
  },
  {
    name: "Sajid Karim",
    role: "Founder",
    company: "Startup Studio",
    rating: 5,
    text: "Top-notch professional. Ammar handles HR, data and digital with the same care — rare combination of analytical precision and creative execution.",
    initials: "SK",
  },
];

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5500);
    return () => clearInterval(id);
  }, [paused]);

  const t = testimonials[index];

  return (
    <section id="testimonials" className="py-20 sm:py-28 relative">
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Kind Words</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">
            What People <span className="text-gradient-gold">Say</span>
          </h2>
        </motion.div>

        <div
          className="max-w-3xl mx-auto relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="glass-card rounded-3xl p-6 sm:p-10 min-h-[260px] sm:min-h-[240px] relative overflow-hidden">
            <Quote className="absolute top-6 right-6 w-16 h-16 text-primary/10" />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-display font-bold text-primary-foreground">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              aria-label="Previous"
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-gradient-to-r from-primary to-accent" : "w-2 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
