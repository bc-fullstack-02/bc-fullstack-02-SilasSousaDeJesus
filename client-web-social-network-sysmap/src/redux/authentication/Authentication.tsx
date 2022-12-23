import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { selectToken } from "../authSlice/AuthSlice";
import { useAppSelector } from "../hooks";

export const PrivateRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const token = useAppSelector(selectToken);
  let location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
