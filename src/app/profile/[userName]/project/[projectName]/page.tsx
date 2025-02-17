import { getProfile, getProjectProfile } from "@/app/serverActions";
import { UserSideBar } from "@/lib/components/userSideBar";
import { Project } from "@/lib/models/project";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    userName: string;
    projectName: string;
  }>;
};

function ProjectDeails({ project }: { project: Project }) {
  function formatDate(
    date: Date | string | null,
    repl: string = "Present"
  ): string {
    if (date == null) return repl;
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return repl; // Invalid date
    return dateObj.toLocaleDateString();
  }

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
            <a>{formatDate(project.startDate, "")}</a>
            <a> - </a>
            <a>{formatDate(project.endDate)}</a>
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
  const { userName, projectName } = await props.params;
  const profile = await getProfile(userName);
  const project = await getProjectProfile(userName, projectName);

  if (project == null) {
    redirect(`/profile/${userName}`);
  }

  return (
    <div className="bg-white grid grid-cols-12 gap-5 h-screen">
      <div className="col-span-2 col-start-1 bg-slate-200">
        <UserSideBar
          bio={profile.bio}
          name={profile.name}
          userName={profile.github}
        />
      </div>
      <div className="col-start-3 col-end-12 pt-5">
        <ProjectDeails project={project} />
      </div>
    </div>
  );
}
