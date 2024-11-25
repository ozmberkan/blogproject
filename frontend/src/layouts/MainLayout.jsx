import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { dotWave } from "ldrs";
import Navbar from "~/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const { user, status } = useSelector((state) => state.user);
  dotWave.register();

  if (status === "loading") {
    return (
      <div className="w-full z-20 bg-white absolute h-screen flex justify-center items-center">
        <l-dot-wave size="150" speed="1" color="black"></l-dot-wave>
      </div>
    );
  }

  if (status === "failed" || (!user && status === "succeeded")) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="p-2">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
