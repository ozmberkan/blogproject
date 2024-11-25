import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "~/assets/logo.svg";
import { logoutService } from "~/redux/slices/userSlice";

const Navbar = () => {
  const { user, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(logoutService());
      toast.success("Çıkış yapıldı.");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto rounded-full h-16 bg-white border  flex justify-between items-center px-7">
      <Link to="/">
        <img src={Logo} className="w-10" />
      </Link>

      {user ? (
        <div className="flex gap-x-2 items-center">
          <Link
            to="/add-blog"
            className="font-medium text-sm bg-black hover:bg-neutral-800 transition-colors px-4 py-2 rounded-full text-white"
          >
            Blog Oluştur
          </Link>
          <Link
            to="/my-account"
            className="font-medium text-sm bg-black hover:bg-neutral-800 transition-colors px-4 py-2 rounded-full text-white"
          >
            Profilim
          </Link>
          <button
            onClick={handleLogout}
            className="font-medium text-sm bg-red-600 hover:bg-red-800 transition-colors px-4 py-2 rounded-full text-white"
          >
            Çıkış Yap
          </button>
        </div>
      ) : (
        <Link
          to="/auth/login"
          className="font-medium text-sm bg-black hover:bg-neutral-800 transition-colors px-4 py-2 rounded-full text-white"
        >
          Oturum aç
        </Link>
      )}
    </div>
  );
};

export default Navbar;
