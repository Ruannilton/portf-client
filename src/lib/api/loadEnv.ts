import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

interface Envs {
  SERVER_URL: string;
}

function loadEnv(): Envs {
  const SERVER_URL = process.env.SERVER_URL;
  if (SERVER_URL == undefined || SERVER_URL.length == 0)
    throw new Error("SERVER_URL not defined");
  return { SERVER_URL };
}

const envs = loadEnv();

export { envs };
