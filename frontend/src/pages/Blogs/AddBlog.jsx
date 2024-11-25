import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddBlog = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useSelector((state) => state.user);

  const addHandle = async (data) => {
    try {
      const blogData = {
        ...data,
        createdBy: user._id,
      };
      const response = await axios.post(
        "http://localhost:5002/api/blog/create",
        blogData
      );
      console.log(response.data);
      toast.success("Blog başarıyla oluşturuldu.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto w-full p-3 ">
      <h1 className="font-bold text-xl">Blog Oluştur</h1>
      <form
        className="mt-2 grid grid-cols-1 gap-2"
        onSubmit={handleSubmit(addHandle)}
      >
        <select
          placeholder="Blog Kategorisi"
          type="text"
          className="px-4 py-2 rounded-md border outline-none"
          {...register("category")}
        >
          <option value="">Seçiniz..</option>
          <option value="teknoloji">Teknoloji</option>
          <option value="araç">Araç</option>
          <option value="eğitim">Eğitim</option>
          <option value="elektrik">Elektrik</option>
          <option value="kodlama">Kodlama</option>
        </select>
        <input
          placeholder="Blog Başlığı"
          type="text"
          className="px-4 py-2 rounded-md border outline-none"
          {...register("title")}
        />

        <input
          placeholder="Blog Görseli (URL)"
          type="text"
          className="px-4 py-2 rounded-md border outline-none"
          {...register("imageURL")}
        />
        <textarea
          placeholder="Blog İçeriği"
          type="text"
          className="px-4 py-2 rounded-md border outline-none min-h-64 max-h-64"
          cols="30"
          rows="10"
          {...register("content")}
        />
        <button className="px-4 py-2 rounded-md bg-black text-white font-semibold">
          Oluştur
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
