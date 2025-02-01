import { redirect } from "next/navigation";
import { fetchGitHubUser, getGitHubId } from "../api/user_api";
import { User } from "../models/user";
import Image from "next/image";

function UserContacts() {
  const paths = [
    "/github-svgrepo-com.svg",
    "/email-1-svgrepo-com.svg",
    "/linkedin-svgrepo-com.svg",
  ];
  return (
    <div className="flex flex-row justify-between items-center w-full">
      {paths.map((path, i) => (
        <Image width={32} height={32} src={path} key={i} alt={path} />
      ))}
    </div>
  );
}

export async function UserSideBar(user: User) {
  const githubId = await getGitHubId(user.id);

  if (githubId == null) {
    redirect("/");
  }

  const gitHubdata = await fetchGitHubUser(githubId);

  if (gitHubdata == null) {
    redirect("/");
  }

  return (
    <div className="flex flex-col p-5">
      <Image
        className="rounded-full"
        width={200}
        height={200}
        src={gitHubdata?.avatar_url}
        alt="github icon"
      />
      <a className="my-3 text-center font-sans text-2xl text-black ">
        {gitHubdata.login}
      </a>
      <UserContacts />
      <div className="my-2 border border-black"></div>
      <a className="text-black">{gitHubdata.bio}</a>
    </div>
  );
}
