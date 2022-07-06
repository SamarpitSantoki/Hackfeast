import Login from "../pages/Doctor/Login";
import Register from "../pages/Doctor/Register";

export const doctorRoutes = [
  { path: "/doctor/login", Component: <Login /> },
  { path: "/doctor/register", Component: <Register /> },
];
