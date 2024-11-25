import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "~/assets/logo.svg";
import Circles from "~/assets/authbg.svg";
import { Toaster } from "react-hot-toast";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center p-12 gap-12 relative">
      <img src={Logo} className="animate-pulse" />
      <Outlet />
      <img
        src={Circles}
        className="absolute bottom-0 opacity-20 animate-pulse"
      />
      <Toaster />
    </div>
  );
};

export default AuthLayout;
