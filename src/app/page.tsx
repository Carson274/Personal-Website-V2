import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Projects from './sections/Projects/Projects';
import VersionHistory from './sections/VersionHistory/VersionHistory';
import SmoothScroll from "./components/SmoothScroll";
import Footer from "./sections/Footer/Footer";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <SmoothScroll>
      <Hero />
      <NavBar />
      <About />
      <Projects />
      <VersionHistory />
      <Footer />
    </SmoothScroll>
  );
}
