import React from "react";
import { APP_ROUTES } from "../../utils";
import { useNavigate } from "react-router-dom";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Appbar } from "../appBar/Appbar";
import { Login } from "../../pages/login/Login";

export const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthorized = localStorage.getItem("token");
  if (!isAuthorized)
    return (
      <Navigate to={APP_ROUTES.LOGIN} state={{ from: location }} replace />
    );

  return (
    <>
      <Appbar />
      <Outlet />
    </>
  );
};
