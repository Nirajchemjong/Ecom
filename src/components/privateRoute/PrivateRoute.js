import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { users } = useSelector((state) => state.usersInfo);
  return users?.uid ? (
    children
  ) : (
    <Navigate
      to='/'
      state={{ from: location }}
    />
  );
};
