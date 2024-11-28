import MainLayout from "~/layouts/MainLayout";
import { roleLoader } from "~/loader/roleLoader";
import Detail from "~/pages/Blogs/Detail";
import Home from "~/pages/Home/Home";
import MyAccount from "~/pages/MyAccount/MyAccount";

export const HomeRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
      // loader: async () => {
      //   const state = store.getState();
      //   const user = state.user;
      //   return roleLoader(user.user, ["user"]);
      // },
    },

    {
      path: "/my-account",
      element: <MyAccount />,
    },
    {
      path: "/detail/:id",
      element: <Detail />,
    },
  ],
};
