import User from "../pages/User";
import Cart from "../pages/Cart";
export const protectedRoutes = [
  {
    path: "/user",
    Component: <User />,
  },
  {
    path: "cart",
    Component: <Cart />,
  },
];
