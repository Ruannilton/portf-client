import { Project } from "../models/project";
import { User } from "../models/user";

export async function getUser(userId: string): Promise<User> {
  //  const response = await fetch(`http://localhost:3030/users/${id}`);
  // const user = (await response.json()) as User;
  const user: User = {
    email: "ruannilton@gmail.com",
    name: "Ruan Nilton",
    github: "github.com/ruan-nilton",
    linkedIn: "linkedin.com/in/ruan-nilton",
    id: await userId,
  };
  return Promise.resolve(user);
}

export async function getUserProjects(userId: string): Promise<Project[]> {
  const projects: Project[] = [
    {
      id: 1,
      name: "Auth Service",
      brief: "Microserviço de autenticação com .NET 8 e Identity",
      userId: userId,
      description:
        "Projeto de autenticação utilizando .NET 8, Identity e EntityFramework.",
      repository_link: "https://github.com/user/auth-service",
      startDate: new Date("2024-06-01"),
      endDate: null,
      keys: [".NET", "C#", "Postgre", "SQL"],
    },
    {
      id: 2,
      name: "Voxel Engine",
      brief: "Motor gráfico para jogo baseado em voxels",
      userId: userId,
      description:
        "Implementação de um motor gráfico para voxel games com SVO.",
      repository_link: "https://github.com/user/voxel-engine",
      startDate: new Date("2024-07-15"),
      endDate: null,
      keys: ["C", "OpenGl"],
    },
    {
      id: 3,
      name: "Redis Rust Client",
      brief: "Cliente Redis feito em Rust",
      userId: userId,
      description:
        "Implementação de um cliente Redis utilizando Rust para aprendizado.",
      repository_link: "https://github.com/user/redis-rust-client",
      startDate: new Date("2024-05-10"),
      endDate: new Date("2024-06-20"),
      keys: ["Rust"],
    },
    {
      id: 4,
      name: "Game Asset Loader",
      brief: "Sistema de carregamento de assets assíncrono",
      userId: userId,
      description:
        "Implementação de um asset loader otimizado para jogos em C.",
      repository_link: "https://github.com/user/game-asset-loader",
      startDate: new Date("2024-08-01"),
      endDate: null,
      keys: ["C", "Assimp"],
    },
    {
      id: 5,
      name: "Finance API",
      brief: "API para análise de transações financeiras",
      userId: userId,
      description:
        "API para processar e analisar transações financeiras usando .NET e AWS.",
      repository_link: "https://github.com/user/finance-api",
      startDate: new Date("2024-09-10"),
      endDate: null,
      keys: [".NET", "Postgre", "Dynamo", "SQS"],
    },
  ];
  return Promise.resolve(projects);
}

export async function getProject(projectId: number) {
  const projs = await getUserProjects("");
  const index = (projectId - 1) % projs.length;
  return projs[index];
}
