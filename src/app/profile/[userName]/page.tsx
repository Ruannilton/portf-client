import Link from "next/link";
import { UserSideBar } from "@/lib/components/userSideBar";
import Image from "next/image";
import { ProfileProject } from "@/lib/models/profile";
import { getProfile } from "@/app/serverActions";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    userName: string;
  }>;
};

function ProjectList({
  projects,
  userName,
}: {
  userName: string;
  projects: ProfileProject[];
}) {
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
              <Link href={`/profile/${userName}/project/${project.name}`}>
                <div className="col-start-1 col-span-2 ">
                  <div className="flex gap-2">
                    <Image
                      src={"/link-svgrepo-com.svg"}
                      width={20}
                      height={20}
                      alt={`/profile/${userName}/project/${project.name}`}
                    />
                    <p className="text-xl text-black">{project.name}</p>
                  </div>
                </div>
              </Link>

              <div className="col-start-3 col-span-1">
                <div className="flex flex-row justify-between">
                  <a>{formatDate(project.startDate, "")}</a>
                  <a> - </a>
                  <a>{formatDate(project.endDate)}</a>
                </div>
              </div>
            </div>

            <div className="my-3">
              <a>{project.brief}</a>
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
  const { userName } = await props.params;

  const profile = await getProfile(userName);

  if (profile == null) {
    redirect("/");
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
        <ProjectList projects={profile.projects} userName={userName} />
      </div>
    </div>
  );
}
