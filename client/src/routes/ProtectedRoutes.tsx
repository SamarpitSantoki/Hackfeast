import User from "../pages/User";
import Cart from "../pages/Cart";
// import Chat from "../pages/Chat";
import Order from "../pages/Order";

export const protectedRoutes = [
  {
    path: "/user",
    Component: <User />,
  },
  {
    path: "/cart",
    Component: <Cart />,
  },
  // {
  //   path: "/chat",
  //   Component: <Chat />,
  // },
  {
    path: "/order/:id",
    Component: <Order />,
  },
];
