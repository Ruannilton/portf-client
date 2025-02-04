import { redirect } from "next/navigation";
import Image from "next/image";
import { getGitHubData, goToUserPage } from "@/app/serverActions";
import Form from "next/form";

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

export async function UserSideBar({
  userName,
  name,
  bio,
}: {
  userName: string;
  name: string;
  bio: string;
}) {
  async function goToUser() {
    "use server";
    await goToUserPage();
  }

  const gitHubdata = await getGitHubData(userName);

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
      <a className="my-3 text-center font-sans text-2xl text-black ">{name}</a>
      <UserContacts />
      <div className="my-2 border border-black"></div>
      <a className="text-black">{bio}</a>
      <Form action={goToUser}>
        <button
          type="submit"
          className="border w-full border-black  rounded-md my-2 py-1 px-3 text-black"
        >
          My Page
        </button>
      </Form>
    </div>
  );
}
