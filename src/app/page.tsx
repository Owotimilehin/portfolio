import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProjectShowcase />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
