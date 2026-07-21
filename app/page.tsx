import { AboutSection } from "@/components/sections/AboutSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { RewardsSection } from "@/components/sections/RewardsSection";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { WorksSection } from "@/components/sections/WorksSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--pitch-black)] text-on-surface">
      <Navbar />
      <Hero />
      <TechMarquee />
      <AboutSection />
      <AchievementsSection />
      <WorksSection />
      <RewardsSection />
      <ContactSection />
    </main>
  );
}
