import React from "react";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" grid grid-cols-3 gap-0 h-screen">
      <div className="col-span-1 col-start-2">
        <div className="grid grid-rows-7 h-screen">
          <a className="row-span-1 row-start-2 text-center text-6xl">
            Portfolio
          </a>
          <div className="bg-slate-800 mx-16 row-start-3 row-span-3 shadow-md rounded-md  flex flex-col items-center justify-center h-full">
            <Image
              width={100}
              height={100}
              src="/github.png"
              alt="github icon"
            />
            <Link
              className="bg-black mx-5 mt-20 p-5 rounded-md hover:bg-gray-800"
              href={"http://localhost:3030/auth/github"}
            >
              Login with Github
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
