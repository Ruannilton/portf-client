import Image from "next/image";
import { redirect } from "next/navigation";
import Form from "next/form";
import ProjectCreator from "@/lib/components/projectCreator";
import {
  getGitHubData,
  getUser,
  updateUserBio,
  updateUserEmail,
  updateUserLinkedIn,
} from "@/app/serverActions";
import Link from "next/link";

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

function FormButtons() {
  return (
    <div className="flex flex-row gap-4 justify-end">
      <button
        type="submit"
        className="border border-black text-black rounded-md py-1 px-3"
      >
        Save
      </button>
      <button
        type="reset"
        className="border border-black text-black rounded-md py-1 px-3"
      >
        Discard
      </button>
    </div>
  );
}

export default async function Home(props: Props) {
  const { userId } = await props.params;

  const user = await getUser(userId);

  const gitHubdata = await getGitHubData(user.github);

  if (!gitHubdata) redirect("/");

  const updateBio = async (formData: FormData) => {
    "use server";
    const bio = formData.get("bio")?.toString();
    if (bio != null && bio.length > 0) {
      await updateUserBio(userId, bio);
    }
  };

  const updateContact = async (formData: FormData) => {
    "use server";
    const email = formData.get("email")?.toString();
    const linkedin = formData.get("linkedin")?.toString();

    if (email != null && email.length > 0 && email != user.email) {
      await updateUserEmail(userId, email);
    }

    if (linkedin != null && linkedin.length > 0 && linkedin != user.linkedIn) {
      await updateUserLinkedIn(userId, linkedin);
    }
  };

  return (
    <div className="bg-white grid grid-cols-12 gap-5 h-full pt-5">
      <div className="col-span-2 col-start-2 h-screen">
        <Image
          className="rounded-full"
          width={200}
          height={200}
          src={gitHubdata?.avatar_url}
          alt="github icon"
        />

        <Link href={`/profile/${user.github}`}>
          <button
            type="submit"
            className="border w-full border-black  rounded-md my-2 py-1 px-3 text-black"
          >
            View Profile
          </button>
        </Link>
      </div>
      <div className="col-span-8 col-start-4 h-screen pt-20 ">
        <div className="flex flex-col border border-black p-4 my-4 rounded-md">
          <a className="text-3xl  text-black">Biografia</a>
          <div className="my-2 border border-black"></div>
          <Form action={updateBio}>
            <input
              className="border text-black p-2 border-black rounded-md my-4"
              type="text"
              placeholder={"Enter your bio"}
              defaultValue={user.bio}
              name="bio"
            ></input>
            <FormButtons />
          </Form>
        </div>
        <div className="flex flex-col border border-black p-4 my-4 rounded-md">
          <a className="text-3xl  text-black">Contact</a>
          <div className="my-2 border border-black"></div>
          <Form action={updateContact}>
            <div className="flex gap-4 my-4">
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border text-black border-black p-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your email"
                  defaultValue={user.email}
                  name="email"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="linkedin"
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  LinkedIn
                </label>
                <input
                  type="text"
                  id="linkedin"
                  className="w-full rounded-md border text-black border-black p-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your linkedin"
                  defaultValue={user.linkedIn || ""}
                  name="linkedin"
                />
              </div>
            </div>
            <FormButtons />
          </Form>
        </div>
        <div className="flex flex-col border border-black p-4 my-4 rounded-md">
          <a className="text-3xl  text-black">Projects</a>
          <div className="my-2 border border-black"></div>
          <ProjectCreator userId={userId} />
        </div>
      </div>
    </div>
  );
}
