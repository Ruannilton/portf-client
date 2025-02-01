import { Project } from "../models/project";
import { User } from "../models/user";
import dotenv from "dotenv";

dotenv.config();

const SERVER_URL = process.env.SERVER_URL || "http://localhost:3030";

export async function getUser(userId: string): Promise<User> {
  const url = `${SERVER_URL}/user/${userId}`;
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
  return `${SERVER_URL}/auth/github`;
}
