import AuthHOC from "@/components/AuthHOC";
import Header from "@/components/Header";

import { Outlet } from "react-router";

function RoomLayout() {
  return (
    <AuthHOC>
      <main>
        <Header />
        <Outlet />
      </main>
    </AuthHOC>
  );
}

export default RoomLayout;
