import Navbar from "@/components/Navbar";
import { usePageView } from "@/hooks/usePageView";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import CertificatesSection from "@/components/CertificatesSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import InsightsSection from "@/components/InsightsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  usePageView("home");
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <CertificatesSection />
      <SkillsSection />
      <ProjectsSection />
      <InsightsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
