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
      <NavBar />
      <main className='w-full'>
        <Hero />
        <About />
        <VersionHistory />
        <Projects />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
