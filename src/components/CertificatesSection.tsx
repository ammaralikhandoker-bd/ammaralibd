import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certs = [
  { title: "Deep Dive into OpenAI Models: Master o3, o4-mini & Beyond", org: "Udemy", date: "Jan 2026", url: "https://www.udemy.com/certificate/UC-da299e1d-71cd-4fc3-aeaf-fb74a0e41133/" },
  { title: "5-Day AI Agents Intensive Course with Google", org: "Kaggle", date: "Dec 2025", url: "https://www.kaggle.com/certification/badges/mdamberalikhandoker/105" },
  { title: "Excel Essentials for Workplace Productivity", org: "Passport to Earning Bangladesh", date: "Dec 2025" },
  { title: "Critical Thinking in AI Era", org: "HP LIFE", date: "Dec 2025", url: "https://www.linkedin.com/learning/certificates/edd333eccb1a7d3968828775be2c12fd401bff9e357441c888aa40d5f77b0d8f" },
  { title: "Human Resources: Writing an Effective Job Description", org: "LinkedIn Learning", date: "Oct 2025", url: "https://www.linkedin.com/learning/certificates/52bcd3b0090706426fdb170fea26395ea3757c2bdf7a41b9b020f86908ad9baf" },
  { title: "Gemini Certified Educator", org: "Google", date: "Jan 2025", url: "https://edu.google.accredible.com/c65ef36e-9649-4a90-a24c-95381c98658a#acc.yobiZlBw" },
  { title: "Six Sigma Level 1", org: "PRAN-RFL Group", date: "Aug 2023" },
  { title: "HR as a Strategic Business Partner", org: "HRCI®", date: "Aug 2025", url: "https://www.linkedin.com/learning/certificates/456b5d870f9440b23d93b21ba92ad061a0b4bdafd6b154ca7891755afec22d52" },
];

const CertificatesSection = () => {
  return (
    <section id="certificates" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            My <span className="text-gradient-gold">Certificates</span>
          </h2>
          <p className="text-muted-foreground mt-2">62+ Professional Certifications</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {certs.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all"
            >
              <Award className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-display text-sm font-semibold leading-snug mb-2 line-clamp-2">
                {cert.title}
              </h3>
              <p className="text-xs text-primary/80">{cert.org}</p>
              <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mt-3 transition-colors"
                >
                  Show credential <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
