import AuthHOC from "@/components/AuthHOC";
import Logo from "@/components/Logo";
import { Helmet } from "react-helmet";

import { Outlet, useLocation } from "react-router";

function RoomLayout() {
  const pathname = useLocation().pathname.split("/").at(2) || "Home";
  return (
    <AuthHOC>
      <Helmet>
        <title>Rooms | {pathname}</title>
      </Helmet>
      <div className="flex p-4">
        <Logo className="size-10" />
      </div>
      <Outlet />
    </AuthHOC>
  );
}

export default RoomLayout;
