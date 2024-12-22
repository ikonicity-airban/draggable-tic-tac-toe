import useAuth from "@/lib/hooks/useAuth";
import React from "react";
import GameDialog from "./GameDialog";

interface AuthHOCProps {
  children: React.ReactNode;
}

const AuthHOC: React.FC<AuthHOCProps> = ({ children }) => {
  const isAuthenticated = useAuth().user !== null;
  console.log("🚀 ~ isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    return <GameDialog />;
  }

  return <>{children}</>;
};

export default AuthHOC;
