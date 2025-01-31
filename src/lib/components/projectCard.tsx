import Link from "next/link";
import { Project } from "../models/project";

function ProjectCardHeader(project: Project) {
  return (
    <div className="flex flex-row justify-between mt-1 mb-3">
      <a
        href={`/project/${project.id}`}
        className="font-bold text-xl text-black "
      >
        {project.name}
      </a>

      <div className="flex flex-row justify-end">
        <a className="text-black">
          {project.startDate?.toLocaleDateString("en-US", {
            month: "2-digit",
            year: "numeric",
          })}
        </a>
        <a className="text-black mx-2">-</a>
        <a className="text-black">
          {project.endDate?.toLocaleDateString("en-US", {
            month: "2-digit",
            year: "numeric",
          }) ?? "Present"}
        </a>
      </div>
    </div>
  );
}

export function ProjectCard(project: Project) {
  return (
    <div key={project.id} className="bg-slate-75 p-3 rounded-md shadow-md">
      <div className="flex flex-col">
        <ProjectCardHeader {...project} />

        <a className="text-black">{project.brief}</a>

        <Link
          className="bg-black mt-1 p-2 rounded-md hover:bg-gray-800"
          href={project.repository_link as string}
        >
          Repository
        </Link>
      </div>
    </div>
  );
}
