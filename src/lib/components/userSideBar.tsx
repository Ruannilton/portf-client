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

export function UserSideBar(user: User) {
  return (
    <div className="flex flex-col p-5">
      <Image
        className="rounded-full"
        width={200}
        height={200}
        src="https://avatars.githubusercontent.com/u/44852912?v=4"
        alt="github icon"
      />
      <a className="my-3 text-center font-sans text-2xl text-black ">
        {user.name}
      </a>
      <UserContacts />
      <svg width="200" height="50">
        <line x1="0" y1="25" x2="200" y2="25" stroke="black" strokeWidth="1" />
      </svg>
      <a className="text-black">
        Sou desenvolvedora web apaixonada por criar aplicações modernas,
        eficientes e escaláveis. Tenho experiência com front-end e back-end,
        utilizando tecnologias como JavaScript, TypeScript, React, Node.js e
        .NET. Meu foco é construir interfaces intuitivas e soluções robustas que
        proporcionam a melhor experiência para os usuários.
      </a>
    </div>
  );
}
