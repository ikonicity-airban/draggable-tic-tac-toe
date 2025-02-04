import AuthHOC from "@/components/AuthHOC";
import Logo from "@/components/Logo";
import { UI_LINKS } from "@/lib/links";
import { Helmet } from "react-helmet";

import { Link, Outlet, useLocation } from "react-router";

function RoomLayout() {
  const pathname = useLocation().pathname.split("/").at(2) || "Home";
  return (
    <AuthHOC>
      <Helmet>
        <title>Rooms | {pathname}</title>
      </Helmet>
      <Link to={UI_LINKS.home} className="flex p-4">
        <Logo className="size-10" />
      </Link>
      <Outlet />
    </AuthHOC>
  );
}

export default RoomLayout;
