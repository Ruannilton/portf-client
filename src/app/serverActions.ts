"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { envs } from "@/lib/api/loadEnv";
import { Profile } from "@/lib/models/profile";
import { GitHubData } from "@/lib/models/gitHubData";
import { User } from "@/lib/models/user";
import { Project } from "@/lib/models/project";

const { SERVER_URL } = envs;

async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) return null;
  return token.value;
}

export async function createProject(
  userId: string,
  project: {
    name: string;
    brief: string;
    description: string;
  }
): Promise<boolean> {
  const path = `${SERVER_URL}/users/${userId}/project`;
  const token = await getToken();

  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    console.error("Failed to create project", await response.json());
    return false;
  }

  return true;
}

export async function githubSignIn() {
  const authUrl = `${SERVER_URL}/auth/github`;
  redirect(authUrl);
}

export async function getProfile(userName: string): Promise<Profile> {
  const url = `${SERVER_URL}/profile/${userName}`;
  const response = await fetch(url);
  const profile = (await response.json()) as Profile;

  return profile;
}

export async function getGitHubData(userName: string): Promise<GitHubData> {
  const response = await fetch(`https://api.github.com/users/${userName}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });

  const data = await response.json();

  const githubData: GitHubData = {
    login: data.login,
    avatar_url: data.avatar_url,
    bio: data.bio,
  };

  return githubData;
}

export async function updateUserBio(
  userId: string,
  bio: string
): Promise<void> {
  const token = await getToken();
  const path = `${SERVER_URL}/users/${userId}/bio`;
  await fetch(path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bio: bio }),
  });
}

export async function updateUserLinkedIn(
  userId: string,
  linkedIn: string
): Promise<void> {
  const token = await getToken();
  const path = `${SERVER_URL}/users/${userId}/linkedIn`;
  await fetch(path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ linkedIn: linkedIn }),
  });
}

export async function updateUserEmail(
  userId: string,
  email: string
): Promise<void> {
  const token = await getToken();
  const path = `${SERVER_URL}/users/${userId}/email`;
  await fetch(path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email: email }),
  });
}

export async function getUser(userId: string): Promise<User> {
  const token = await getToken();
  const url = `${SERVER_URL}/users/${userId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    redirect("/");
  }

  const user = (await response.json()) as User;

  return Promise.resolve(user);
}

export async function getProjectProfile(
  userName: string,
  projectName: string
): Promise<Project | null> {
  const url = `${SERVER_URL}/profile/${userName}/project/${projectName}`;
  const response = await fetch(url);

  if (!response.ok) return null;

  const project = (await response.json()) as Project;
  return project;
}

export async function goToUserPage(): Promise<void> {
  const token = await getToken();
  const path = `${SERVER_URL}/auth/me`;
  const response = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) redirect("/login");

  const user = (await response.json()) as User;

  const userId = user.id;
  redirect(`/user/${userId}`);
}
