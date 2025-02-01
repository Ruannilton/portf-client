import { GitHubAccount } from "../models/githubAccount";
import { Project } from "../models/project";
import { User } from "../models/user";

import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const SERVER_URL = process.env.SERVER_URL || "http://localhost:3000";

interface GitHubUser {
  login: string;
  avatar_url: string;
  bio: string;
}

export async function getUser(userId: string): Promise<User> {
  const url = `${SERVER_URL}/users/${userId}`;
  const response = await fetch(url);
  const user = (await response.json()) as User;

  return Promise.resolve(user);
}

export async function getUserProjects(userId: string): Promise<Project[]> {
  const url = `${SERVER_URL}/users/${userId}/projects`;
  const response = await fetch(url);
  const projects = (await response.json()) as Project[];

  return Promise.resolve(projects);
}

export async function getProject(projectId: number) {
  const projs = await getUserProjects("");
  const index = (projectId - 1) % projs.length;
  return projs[index];
}

export function getGitHubAuth(): string {
  const authUrl = `${SERVER_URL}/auth/github`;
  console.log(authUrl);
  return authUrl;
}

export async function getGitHubId(userId: string): Promise<string | null> {
  const url = `${SERVER_URL}/auth/users/${userId}/github`;
  const response = await fetch(url);
  if (!response.ok) return null;
  const acc = (await response.json()) as GitHubAccount;
  return acc.id;
}

export async function fetchGitHubUser(
  userId: string
): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/user/${userId}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    const data = await response.json();

    const user: GitHubUser = {
      login: data.login,
      avatar_url: data.avatar_url,
      bio: data.bio,
    };

    return user;
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return null;
  }
}
