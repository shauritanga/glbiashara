import { Header } from "@/components/header";
import { ImageCarousel } from "@/components/image-carousel";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section id="home">
          <ImageCarousel />
        </section>
        <Services />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
