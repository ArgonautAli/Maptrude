import React from 'react'
import { APP_ROUTES } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import {Appbar} from "../appBar/Appbar"
import { Login } from '../../pages/login/Login';

export const ProtectedRoute = () => {
    const isAuthorized = localStorage.getItem('token');
    if (!isAuthorized) return (
        <>
        <Login />
        </>
    );

  return (
    <>
      <Appbar />
      <Outlet />
    </>
  )
}
