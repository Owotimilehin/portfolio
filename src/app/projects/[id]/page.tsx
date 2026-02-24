import { projects } from "@/lib/data";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { ProjectPage } from "@/components/ProjectPage";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.title} — Owoigbe Timilehin`,
    description: project.subtitle,
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();
  const index = projects.findIndex((p) => p.id === id);

  return (
    <main>
      <Navbar />
      <ProjectPage project={project} index={index} />
    </main>
  );
}
