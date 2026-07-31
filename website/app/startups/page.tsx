import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import InnovationHubSection from "@/components/InnovationHubSection";

export default function StartupsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Startup Showcase"
          title="Student-Led Startups"
          subtitle="Discover launched and scaling ventures built by SLIC students — real startups solving real problems."
          breadcrumb="Startup Showcase"
        />
        <InnovationHubSection
          limit={100}
          showViewAll={false}
          showHeader={false}
          showActions={false}
          stageFilter={["launched", "scaling"]}
        />
      </main>
      <Footer />
    </>
  );
}
