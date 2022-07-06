import { Routes, Route, Navigate } from "react-router-dom";

import { authRoutes } from "./AuthRoute";
import { publicRoutes } from "./PublicRoutes";
import { getIsAuthenticated } from "../features/auth/authSlice";
import { protectedRoutes } from "./ProtectedRoutes";
import { adminRoutes } from "./AdminRoutes";
import { doctorRoutes } from "./DoctorRoutes";
import Home from "../pages/Home";
import Try from "../pages/Try";

import { useAppDispatch, useAppSelector } from "../features/redux-hooks";
function Routers() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(getIsAuthenticated);

  return (
    <>
      <Routes>
        <Route path="/try" element={<Try />} />
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.Component} />
        ))}
        <Route path={"auth"}>
          {authRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.Component} />
          ))}
          {/* {isAuthenticated && <Navigate to={"/"} />} */}
        </Route>
        {isAuthenticated &&
          protectedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.Component} />
          ))}
        {adminRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.Component} />
        ))}
        {doctorRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.Component} />
        ))}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
export default Routers;
