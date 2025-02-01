import { getUser, getUserProjects } from "@/lib/api/user_api";
import Link from "next/link";
import { Project } from "@/lib/models/project";
import { UserSideBar } from "@/lib/components/userSideBar";
import Image from "next/image";

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="">
      <a className="text-5xl font-bold text-black"> Projects</a>
      <div className="my-2 border border-black"></div>
      <div className="grid grid-cols-2 gap-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="py-5 px-3 rounded-md bg-slate-300 shadow-md"
          >
            <div className="grid grid-cols-3">
              <Link href={`/project/${project.id}`}>
                <div className="col-start-1 col-span-2 ">
                  <div className="flex gap-2">
                    <Image
                      src={"/link-svgrepo-com.svg"}
                      width={20}
                      height={20}
                      alt={`/project/${project.id}`}
                    />
                    <p className="text-xl text-black">{project.name}</p>
                  </div>
                </div>
              </Link>

              <div className="col-start-3 col-span-1">
                <div className="flex flex-row justify-between">
                  <a>{project.startDate?.toLocaleDateString()}</a>
                  <a> - </a>
                  <a>{project.endDate?.toLocaleDateString() || "Present"}</a>
                </div>
              </div>
            </div>

            <div className="my-3">
              <a>{project.description}</a>
            </div>

            <div className="flex gap-2">
              {project.keys.map((key, i) => (
                <a className="text-sm" key={i}>
                  {key}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Home(props: Props) {
  const { userId } = await props.params;

  const user = await getUser(userId);
  const projects = await getUserProjects(userId);

  return (
    <div className="bg-white grid grid-cols-12 gap-5 h-screen">
      <div className="col-span-2 col-start-1 bg-slate-200">
        <UserSideBar {...user} />
      </div>
      <div className="col-start-3 col-end-12 pt-5">
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}
