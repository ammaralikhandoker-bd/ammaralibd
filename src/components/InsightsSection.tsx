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
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Professional <span className="text-gradient-gold">Insights</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {insights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-background border border-border rounded-xl p-5"
            >
              <Quote className="w-5 h-5 text-primary/40 mb-3" />
              <p className="text-sm text-muted-foreground leading-relaxed italic mb-4">
                "{item.quote}"
              </p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
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
