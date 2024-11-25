import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getAllBlogs, getBlogByCreatedID } from "~/redux/slices/blogSlice";

const EditBlogModal = ({ setEditMode, selectedBlog, user }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: selectedBlog.title,
      content: selectedBlog.content,
      category: selectedBlog.category,
      imageURL: selectedBlog.imageURL,
      isBanner: selectedBlog.isBanner,
    },
  });

  const editHandle = async (data) => {
    try {
      await axios.put(
        `http://localhost:5002/api/blog/update/${selectedBlog._id}`,
        data
      );
      dispatch(getBlogByCreatedID(user?._id));
      toast.success("Blog başarıyla güncellendi.");
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Blog Güncelle</h2>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(editHandle)}
        >
          <select
            className="px-4 w-full py-2 rounded-md border outline-none"
            type="text"
            {...register("category")}
          >
            <option value="">Seçiniz..</option>
            <option value="teknoloji">Teknoloji</option>
            <option value="araç">Araç</option>
            <option value="eğitim">Eğitim</option>
            <option value="elektrik">Elektrik</option>
            <option value="kodlama">Kodlama</option>
          </select>
          <select
            className="px-4 w-full py-2 rounded-md border outline-none"
            type="text"
            {...register("isBanner")}
          >
            <option value={true}>Evet</option>
            <option value={false}>Hayır</option>
          </select>
          <input
            className="px-4 w-full py-2 rounded-md border outline-none"
            type="text"
            {...register("title")}
          />
          <input
            className="px-4 w-full py-2 rounded-md border outline-none"
            type="text"
            {...register("imageURL")}
          />
          <textarea
            className="px-4 py-2 rounded-md border outline-none min-h-64 max-h-64 w-full"
            type="text"
            {...register("content")}
          />
          <div className="flex justify-end gap-x-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Kaydet
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Kapat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogModal;
