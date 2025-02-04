import useAuth from "@/lib/hooks/useAuth";
import { UI_LINKS } from "@/lib/links";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

interface AuthHOCProps {
  children: React.ReactNode;
}

const AuthHOC: React.FC<AuthHOCProps> = ({ children }) => {
  const isAuthenticated = useAuth().user !== null;
  const { loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && loading) {
      navigate(UI_LINKS.login);
    }
  }, [isAuthenticated, loading]);

  return <>{children}</>;
};

export default AuthHOC;
