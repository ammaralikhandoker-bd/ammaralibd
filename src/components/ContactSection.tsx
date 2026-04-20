import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Linkedin, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "8801716861353";
const EMAIL = "ammar.khandoker@outlook.com";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      toast.error("Please fill in your name and message");
      return;
    }
    setSending(true);

    const text = `Hello, I'm ${form.name}.%0A%0A` +
      `Email: ${form.email || "—"}%0A` +
      `Phone: ${form.phone || "—"}%0A` +
      `Subject: ${form.subject || "Inquiry"}%0A%0A` +
      `${form.message}`;

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener");
      toast.success("Opening WhatsApp to send your message");
      setSending(false);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[140px] pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Let's Talk</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">
            Get In <span className="text-gradient-gold">Touch</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left — info + map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div className="glass-card rounded-2xl p-5 hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                  <a href={`mailto:${EMAIL}`} className="font-medium text-foreground hover:text-primary transition-colors break-all">
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Phone</p>
                  <a href="tel:+8801716861353" className="font-medium text-foreground hover:text-accent transition-colors">
                    +880 1716-861353
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">Savar, Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="glass-card rounded-2xl overflow-hidden h-56">
              <iframe
                title="Dhaka, Bangladesh"
                src="https://www.openstreetmap.org/export/embed.html?bbox=90.2569%2C23.8225%2C90.3469%2C23.8825&amp;layer=mapnik&amp;marker=23.8525%2C90.3019"
                className="w-full h-full grayscale-[40%] opacity-90"
                loading="lazy"
              />
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/ammar-khandoker-bd"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Email"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:scale-110 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card rounded-3xl p-6 sm:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="bg-background/40 border-border/60" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="bg-background/40 border-border/60" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+880…" className="bg-background/40 border-border/60" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can I help?" className="bg-background/40 border-border/60" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project…" className="bg-background/40 border-border/60 resize-none" />
            </div>
            <Button
              type="submit"
              disabled={sending}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 font-semibold rounded-xl shadow-[var(--shadow-glow)]"
            >
              {sending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Opening WhatsApp…</>
              ) : (
                <><Send className="w-4 h-4 mr-2" /> Send Message</>
              )}
            </Button>
            <p className="text-[11px] text-muted-foreground text-center">
              Your message will open in WhatsApp for instant delivery.
            </p>
          </motion.form>
        </div>
      </div>

      {/* Floating WhatsApp FAB */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform pulse-ring"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </section>
  );
};

export default ContactSection;
