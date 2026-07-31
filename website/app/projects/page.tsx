import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import InnovationHubSection from "@/components/InnovationHubSection";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Innovation Hub"
          title="Student Projects"
          subtitle="Explore the full collection of student-driven projects and innovations making a difference."
          breadcrumb="Innovation Hub"
        />
        <InnovationHubSection limit={100} showViewAll={false} showHeader={false} showActions={false} />
      </main>
      <Footer />
    </>
  );
}
