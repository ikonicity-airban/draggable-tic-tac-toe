import useAuth from "../lib/hooks/useAuth";
import "./Header.css";
import Logo from "./Logo";
import { Sparkle } from "lucide-react";
import { Link } from "react-router";
import { UI_LINKS } from "@/lib/links";

export default function Header() {
  const { /* login */ logout } = useAuth();

  return (
    <header className="header">
      <Link
        to={UI_LINKS.home}
        className="flex items-center justify-center size-10"
      >
        <Logo />
      </Link>
      <div className="" onClick={logout}></div>
      <div className="relative">
        <Sparkle size={30} className="text-[#fff9]" />
        <Sparkle size={10} className="text-[#fff9] absolute bottom-0 left-0" />
      </div>
    </header>
  );
}
