import React, { useState } from "react";
import toast from "react-hot-toast";
import { TbDoorExit, TbList, TbPlus, TbUser } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "~/assets/logo.svg";
import { logoutService } from "~/redux/slices/userSlice";
import CreateBlogModal from "../UI/Modals/CreateBlogModal";
import { AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, status } = useSelector((state) => state.user);

  const [isCreateOpenModal, setIsCreateOpenModal] = useState(false);

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
    <>
      <AnimatePresence>
        {isCreateOpenModal && (
          <CreateBlogModal setIsCreateOpenModal={setIsCreateOpenModal} />
        )}
      </AnimatePresence>
      <div className="container mx-auto rounded-full h-16 bg-white   flex justify-between items-center p-5">
        <Link to="/">
          <img src={Logo} className="w-10" />
        </Link>

        {user ? (
          <div className="flex gap-x-2 items-center">
            <button
              onClick={() => setIsCreateOpenModal(true)}
              className="font-medium flex items-center gap-x-1 text-sm  hover:bg-white transition-colors px-4 py-2 rounded-md  text-black hover:text-[#0A936C]"
            >
              <TbPlus size={18} />
              Blog Oluştur
            </button>
            <Link
              to="/my-account"
              className="font-medium flex items-center gap-x-1 text-sm bg-[#0A936C] hover:border hover:border-[#0A936c] border hover:bg-white hover:text-[#0A936c] border-transparent transition-colors px-4 py-2 rounded-md text-white "
            >
              <TbUser size={18} />
            </Link>
            <button
              onClick={handleLogout}
              className="font-medium text-sm bg-red-600 hover:bg-red-800 transition-colors px-4 py-2 rounded-md text-white"
            >
              <TbDoorExit size={18} />
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
    </>
  );
};

export default Navbar;
