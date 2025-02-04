import { NextApiRequest, NextApiResponse } from "next";
import { JwtToken } from "@/lib/models/jwtToken";
import { User } from "@/lib/models/user";
import { envs } from "@/lib/api/loadEnv";

const { SERVER_URL } = envs;

const getJwtToken = async (code: string): Promise<JwtToken> => {
  const response = await fetch(
    `${SERVER_URL}/auth/github/callback?code=${code}`
  );
  const data: JwtToken = await response.json();
  return data;
};

const getUser = async (token: string): Promise<User> => {
  const response = await fetch(`${SERVER_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await response.json();
  return user;
};

const api_function = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    res.redirect("/");
    return;
  }

  try {
    const token = await getJwtToken(code);
    const user = await getUser(token.acces_token);

    res.setHeader("Set-Cookie", [
      `token=${token.acces_token}; Path=/; HttpOnly`,
      `user=${JSON.stringify(user)}; Path=/; HttpOnly`,
    ]);

    res.redirect(`/user/${user.id}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

export default api_function;
