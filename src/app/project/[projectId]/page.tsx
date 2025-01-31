import { getProject, getUser } from "@/lib/api/user_api";
import { PageStructure } from "@/lib/components/pageStructure";

type Props = {
  params: {
    projectId: Promise<number>;
  };
};

export default async function Home(props: Props) {
  const { projectId } = await props.params;
  //  const response = await fetch(`http://localhost:3030/users/${id}`);
  // const user = (await response.json()) as User;

  const project = await getProject(await projectId);
  const user = await getUser(project.userId);

  return (
    <PageStructure user={user}>
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
    </PageStructure>
  );
}
