import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const insights = [
  { quote: "Success in inventory management isn't about counting products — it's about creating systems that count for you.", tag: "Operations" },
  { quote: "AI doesn't replace professionals. It empowers them to achieve 10x more in the same time.", tag: "AI & Automation" },
  { quote: "Your career isn't a ladder — it's a portfolio of skills. Every role adds a new dimension to your professional value.", tag: "Career Growth" },
  { quote: "Data entry taught me precision. HR taught me people. Inventory taught me systems. Every step matters.", tag: "Personal Journey" },
  { quote: "Digital skills aren't optional anymore. They're the baseline for professional success in every industry.", tag: "Digital Skills" },
  { quote: "The best ERP system is only as good as the professional operating it. Invest in yourself first.", tag: "ERP & Systems" },
];

const InsightsSection = () => {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Notes from the field</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">
            Professional <span className="text-gradient-gold">Insights</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {insights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass-card rounded-2xl p-5 hover-lift"
            >
              <Quote className="w-5 h-5 text-primary/40 mb-3" />
              <p className="text-sm text-foreground/85 leading-relaxed italic mb-4">
                "{item.quote}"
              </p>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                {item.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
