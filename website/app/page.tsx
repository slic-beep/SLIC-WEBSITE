import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import InnovationHubSection from "@/components/InnovationHubSection";
import EventsSection from "@/components/EventsSection";
import ImpactSection from "@/components/ImpactSection";
import LeadershipSection from "@/components/LeadershipSection";
import PartnersSection from "@/components/PartnersSection";
import JoinSlicSection from "@/components/JoinSlicSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <InnovationHubSection />
        <EventsSection />
        <ImpactSection />
        <LeadershipSection />
        <PartnersSection />
        <JoinSlicSection />
      </main>
      <Footer />
    </>
  );
}
