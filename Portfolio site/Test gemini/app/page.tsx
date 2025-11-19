import Hero from "@/components/dom/Hero";
import About from "@/components/dom/About";
import ProjectGallery from "@/components/dom/ProjectGallery";
import Skills from "@/components/dom/Skills";
import Contact from "@/components/dom/Contact";
import content from "@/data/content.json";

export default function Home() {
  return (
    <main className="relative">
      <Hero data={content.hero} />
      <About data={content.about} />
      <ProjectGallery projects={content.projects} />
      <Skills data={content.skills} />
      <Contact data={content.contact} />
    </main>
  );
}
