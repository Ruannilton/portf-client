import { getProject, getUser } from "@/lib/api/user_api";
import { UserSideBar } from "@/lib/components/userSideBar";
import { Project } from "@/lib/models/project";

type Props = {
  params: Promise<{
    projectId: number;
  }>;
};

function ProjectDeails({ project }: { project: Project }) {
  return (
    <>
      <div className="grid grid-cols-12 ">
        <div className="col-start-1 col-span-10 ">
          <div className="flex gap-2">
            <p className="text-5xl font-bold text-black">{project.name}</p>
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex flex-row justify-between text-black">
            <a>{project.startDate?.toLocaleDateString()}</a>
            <a> - </a>
            <a>{project.endDate?.toLocaleDateString() || "Present"}</a>
          </div>
        </div>
      </div>
      <div className="my-2 border border-black"></div>
      <div className="flex gap-2 my-5">
        {project.keys.map((key, i) => (
          <div
            key={i}
            className="rounded-md border border-slate-300 py-0.5 px-2.5 text-center text-sm transition-all shadow-sm text-slate-600"
          >
            {key}
          </div>
        ))}
      </div>
      <div className="rounded-md bg-slate-200 w-full max-h-64 py-8 px-4 text-black">
        {project.description}
      </div>
      <p className="text-2xl font-bold text-black my-3">Readme</p>
    </>
  );
}

export default async function Home(props: Props) {
  const { projectId } = await props.params;
  //  const response = await fetch(`http://localhost:3030/users/${id}`);
  // const user = (await response.json()) as User;

  const project = await getProject(projectId);
  const user = await getUser(project.userId);

  return (
    <div className="bg-white grid grid-cols-12 gap-5 h-screen">
      <div className="col-span-2 col-start-1 bg-slate-200">
        <UserSideBar {...user} />
      </div>
      <div className="col-start-3 col-end-12">
        <ProjectDeails project={project} />
      </div>
    </div>
  );
}
