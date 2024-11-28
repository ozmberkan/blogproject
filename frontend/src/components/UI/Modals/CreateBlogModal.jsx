import React from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineCancel } from "react-icons/md";
import { motion } from "framer-motion";
import { createForm } from "~/data/data";
import axios from "axios";
import toast from "react-hot-toast";
import { getAllBlogs } from "~/redux/slices/blogSlice";

const CreateBlogModal = ({ setIsCreateOpenModal }) => {
  const rootModal = document.getElementById("root-modal");
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);

  const { register, handleSubmit } = useForm();

  const addHandle = async (data) => {
    try {
      const blogData = {
        ...data,
        createdBy: user._id,
        createdName: user.username,
      };
      const response = await axios.post(
        "http://localhost:5002/api/blog/create",
        blogData
      );
      console.log(response.data);
      toast.success("Blog başarıyla oluşturuldu.");
      setIsCreateOpenModal(false);
      dispatch(getAllBlogs());
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
          <h2 className="text-lg font-semibold ">Blog Oluştur</h2>
          <button
            onClick={() => setIsCreateOpenModal(false)}
            className="hover:bg-red-100 text-red-500 rounded-md transition-colors p-2 "
          >
            <MdOutlineCancel size={20} />
          </button>
        </div>
        <form
          className="mt-2 grid grid-cols-1 gap-4"
          onSubmit={handleSubmit(addHandle)}
        >
          {createForm.map((input) => {
            if (input.type === "select") {
              return (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-zinc-500">
                    {input.label}
                  </label>
                  <select
                    key={input.name}
                    className="px-4 py-2 rounded-md border outline-none"
                    {...register(input.name, { required: true })}
                  >
                    {input.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (input.type === "textarea") {
              return (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-zinc-500">
                    {input.label}
                  </label>
                  <textarea
                    key={input.name}
                    className="w-full p-2 border rounded-md outline-none max-h-52 min-h-52"
                    placeholder={input.placeholder}
                    cols={30}
                    rows={10}
                    {...register(input.name, { required: true })}
                  />
                </div>
              );
            }

            return (
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-500">
                  {input.label}
                </label>
                <input
                  key={input.name}
                  type={input.type}
                  className="px-4 py-2 rounded-md border outline-none"
                  placeholder={input.placeholder}
                  {...register(input.name, { required: true })}
                />
              </div>
            );
          })}

          <button className="px-4 py-2 rounded-md bg-black text-white font-semibold">
            Oluştur
          </button>
        </form>
      </div>
    </motion.div>,
    rootModal
  );
};

export default CreateBlogModal;
