import React from "react";
import { createPortal } from "react-dom";
import { MdOutlineCancel } from "react-icons/md";
import { motion } from "framer-motion";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { getUser } from "~/redux/slices/userSlice";

const PhotoEditModal = ({ setEditPhoto }) => {
  const rootModal = document.getElementById("root-modal");

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const updatePhotoHandle = async (data) => {
    try {
      await axios.put(`http://localhost:5002/api/auth/update/${user._id}`, {
        photoURL: data.photoURL,
      });
      toast.success("Görsel başarıyla güncellendi");
      setEditPhoto(false);
      dispatch(getUser());
    } catch (error) {
      console.log(error);
    }
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
        <div className="w-full flex justify-between items-center self-center mb-4">
          <h2 className="text-lg font-semibold ">Görsel Güncelle</h2>
          <button
            onClick={() => setEditPhoto(false)}
            className="hover:bg-red-100 text-red-500 rounded-md transition-colors p-2 "
          >
            <MdOutlineCancel size={20} />
          </button>
        </div>
        <form
          className="mt-2 grid grid-cols-1 gap-4"
          onSubmit={handleSubmit(updatePhotoHandle)}
        >
          <input
            type="text"
            placeholder="Görsel URL"
            className="px-4 py-2 rounded-md border outline-none"
            {...register("photoURL", { required: true })}
          />
          <button className="px-4 py-2 rounded-md bg-black text-white font-semibold">
            Oluştur
          </button>
        </form>
      </div>
    </motion.div>,
    rootModal
  );
};

export default PhotoEditModal;
