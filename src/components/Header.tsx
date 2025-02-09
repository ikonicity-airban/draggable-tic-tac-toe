import useAuth from "../lib/hooks/useAuth";

import Logo from "./Logo";
import { Link } from "react-router";
import { UI_LINKS } from "@/lib/links";
import UserImage from "./UserImage";

export default function Header() {
  const { /* login */ user, logout } = useAuth();
  console.log("🚀 ~ Header ~ user:", user);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <header className="flex items-center justify-between p-3">
      <Link to={UI_LINKS.home} className="flex">
        <Logo className="size-10 cursor-pointer" />
      </Link>
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer" onClick={handleLogout}>
          <UserImage photoURL={user?.photoURL || ""} />
          <span className="absolute bottom-0 end-0 size-3 rounded-full border-2 border-background bg-emerald-500">
            <span className="sr-only">Online</span>
          </span>
        </div>
      </div>
    </header>
  );
}
