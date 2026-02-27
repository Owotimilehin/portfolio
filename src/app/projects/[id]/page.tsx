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
    openGraph: {
      title: `${project.title} — Owoigbe Timilehin`,
      description: project.subtitle,
      type: "article",
      url: `https://owoigbe-timilehin.vercel.app/projects/${project.id}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${project.title} — Owoigbe Timilehin`,
      description: project.subtitle,
      images: ["/opengraph-image"],
    },
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
