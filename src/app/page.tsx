import Image from "next/image";
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Projects from './sections/Projects/Projects';
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="flex min-h-screen flex-col items-center justify-between bg-light-cream">
        <Hero />
        <About />
        <Projects />
      </main>
    </SmoothScroll>
  );
}
