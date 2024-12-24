import useAuth from "@/lib/hooks/useAuth";
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
    setTimeout(() => {
      if (!isAuthenticated && loading) {
        navigate("/login");
      }
    }, 3000);
  }, [navigate, isAuthenticated, loading]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AuthHOC;
