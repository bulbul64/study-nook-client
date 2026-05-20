import FeaturedStudySpaces from "@/components/home/FeaturedStudySpaces";
import Hero from "@/components/home/Hero";
import Stats from "@/components/stats";
import Testimonials from "@/components/testimonials";
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main>
       <Hero />
       <FeaturedStudySpaces />
       <Stats />
       <Testimonials />
    </main>
  );
}
