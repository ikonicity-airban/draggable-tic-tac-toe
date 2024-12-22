import useAuth from "@/lib/hooks/useAuth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

interface AuthHOCProps {
  children: React.ReactNode;
}

const AuthHOC: React.FC<AuthHOCProps> = ({ children }) => {
  const isAuthenticated = useAuth().user !== null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AuthHOC;
