import { User } from "../models/user";
import { UserSideBar } from "./userSideBar";

export function PageStructure({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  return (
    <div className="bg-white grid grid-cols-12 gap-5 h-screen">
      <div className="col-span-2 col-start-1 bg-slate-200">
        <UserSideBar {...user} />
      </div>
      <div className="col-start-3 col-end-12">{children}</div>
    </div>
  );
}
