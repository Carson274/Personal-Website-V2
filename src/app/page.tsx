import Image from "next/image";
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Projects from './sections/Projects/Projects';
import SmoothScroll from "./components/SmoothScroll";
import Footer from "./sections/Footer/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Hero />
      <About />
      <Projects />
      <Footer />
    </SmoothScroll>
  );
}
