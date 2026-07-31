import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import LeadershipSection from "@/components/LeadershipSection";

export default function LeadershipPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Leadership"
          title="Meet Our Team"
          subtitle="Dedicated student leaders driving innovation and impact across Riara University."
          breadcrumb="Leadership"
        />
        <LeadershipSection limit={100} showViewAll={false} showHeader={false} />
      </main>
      <Footer />
    </>
  );
}
