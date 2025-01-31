import { User } from "../models/user";
import { UserSideBar } from "./userSideBar";

export function SideBar({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white grid grid-cols-6 h-screen">
      <div className="col-span-1 col-start-1 bg-slate-200">
        <UserSideBar {...user} />
      </div>
      <div className="col-span-5 col-start-2 bg-withe p-8">
        <div className="mx-3 my-3">{children}</div>
      </div>
    </div>
  );
}
