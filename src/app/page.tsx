import Image from "next/image";
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Projects from './sections/Projects/Projects';
import SmoothScroll from "./components/SmoothScroll";
import Footer from "./sections/Footer/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="flex flex-col items-center justify-between bg-light-cream">
        <Hero />
        <About />
        <Projects />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
