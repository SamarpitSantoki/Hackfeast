import { Routes, Route, Navigate } from "react-router-dom";

import { authRoutes } from "./AuthRoute";
import { publicRoutes } from "./PublicRoutes";
import { useSelector } from "react-redux";
function Routers() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
      </Routes>
    </>
  );
}
export default Routers;
