import AuthHOC from "@/components/AuthHOC";
import Header from "@/components/Header";
import { Helmet } from "react-helmet";

import { Outlet, useLocation } from "react-router";

function RoomLayout() {
  const pathname = useLocation().pathname.split("/").at(2) || "Home";
  return (
    <AuthHOC>
      <Helmet>
        <title>Rooms | {pathname}</title>
      </Helmet>
      <Header />
      <section className="login-page flex flex-col h-full max-w-lg justify-center items-center p-4"></section>
      <div className="flex flex-col items-center justify-center h-[90vh] w-screen z-10">
        <Outlet />
      </div>
    </AuthHOC>
  );
}

export default RoomLayout;
