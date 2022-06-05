import { Routes, Route, Navigate } from "react-router-dom";

import { authRoutes } from "./AuthRoute";
import { publicRoutes } from "./PublicRoutes";
import { useSelector, useDispatch } from "react-redux";
import { getIsAuthenticated } from "../features/auth/authSlice";
import { protectedRoutes } from "./ProtectedRoutes";
import { adminRoutes } from "./AdminRoutes";
import { doctorRoutes } from "./DoctorRoutes";
import Home from "../pages/Home";
function Routers() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <>
      <Routes>
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
