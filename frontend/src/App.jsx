import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthRoutes } from "./routes/AuthRoutes";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/slices/userSlice";
import { HomeRoutes } from "./routes/HomeRoutes";

const App = () => {
  const dispatch = useDispatch();

  const fetchUserProfile = async () => {
    try {
      dispatch(getUser());
    } catch (error) {
      console.error(
        "Kullanıcı bilgileri alınamadı:",
        error.response.data.message
      );
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const router = createBrowserRouter([AuthRoutes, HomeRoutes]);

  return <RouterProvider router={router} />;
};

export default App;
