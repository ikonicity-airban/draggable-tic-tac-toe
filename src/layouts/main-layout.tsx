import AuthHOC from "@/components/AuthHOC";
import Logo from "@/components/Logo";
import { UI_LINKS } from "@/lib/links";
import { Helmet } from "react-helmet";

import { Link, Outlet } from "react-router";

function MainLayout() {
  return (
    <AuthHOC>
      <Helmet>
        <title>CodeOven | Let's play 🎮🚀 Tic tac toe</title>
      </Helmet>
      <Link to={UI_LINKS.home} className="flex p-4 cursor-pointer">
        <Logo className="size-10" />
      </Link>
      <Outlet />
    </AuthHOC>
  );
}

export default MainLayout;
