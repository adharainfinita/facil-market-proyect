import { Navigate, Outlet } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  isAllowed: boolean | undefined;
  children?: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute = ({
  isAllowed,
  children,
  redirectTo = "/",
}: ProtectedRouteProps) => {

  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
