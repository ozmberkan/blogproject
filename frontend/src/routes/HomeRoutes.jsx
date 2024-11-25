import MainLayout from "~/layouts/MainLayout";
import { roleLoader } from "~/loader/roleLoader";
import Home from "~/pages/Home/Home";
import { store } from "~/redux/store";

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
      path: "/about",
      element: <Home />,
    },
  ],
};
