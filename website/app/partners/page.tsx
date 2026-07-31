import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PartnersSection from "@/components/PartnersSection";

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Partners"
          title="Our Partners"
          subtitle="Collaborating with leading organizations to create meaningful innovation opportunities for students."
          breadcrumb="Partners"
        />
        <PartnersSection limit={100} showViewAll={false} showHeader={false} />
      </main>
      <Footer />
    </>
  );
}
