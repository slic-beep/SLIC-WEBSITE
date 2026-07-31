import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import EventsSection from "@/components/EventsSection";

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Events"
          title="Events & Activities"
          subtitle="Stay connected with our innovation ecosystem through workshops, hackathons, summits, and networking opportunities."
          breadcrumb="Events"
        />
        <EventsSection limit={100} showViewAll={false} showHeader={false} />
      </main>
      <Footer />
    </>
  );
}
