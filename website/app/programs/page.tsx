import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ProgramsSection from "@/components/ProgramsSection";

export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Programs"
          title="Innovation Programs"
          subtitle="Empowering students and professionals through cutting-edge innovation programs designed to build real-world skills."
          breadcrumb="Programs"
        />
        <ProgramsSection limit={100} showViewAll={false} showHeader={false} />
      </main>
      <Footer />
    </>
  );
}
