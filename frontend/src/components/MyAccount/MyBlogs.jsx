import dayjs from "dayjs";
import React from "react";
import { TbAlertCircle, TbDatabaseEdit, TbTrash } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsTextParagraph } from "react-icons/bs";

const MyBlogs = ({ openEdit, deleteHandle }) => {
  const { myBlogs } = useSelector((state) => state.blog);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-3xl">Kendi Bloglarım</h1>
      </div>
      <div className="grid grid-cols-3 gap-5 ">
        {myBlogs?.blogs?.length > 0 ? (
          myBlogs?.blogs?.map((blog) => (
            <div
              key={blog._id}
              className="p-4 rounded-md border shadow-xl flex flex-col gap-5 items-start"
            >
              <div className="w-full  flex justify-between items-center">
                <div className="flex items-center gap-x-1">
                  <div className="text-sm font-medium text-neutral-600 px-4 py-1 rounded-full bg-neutral-100 border">
                    {blog.category.charAt(0).toUpperCase() +
                      blog.category.slice(1)}
                  </div>
                  <div className="text-sm font-medium text-neutral-600 px-4 py-1 rounded-full bg-neutral-100 border">
                    {dayjs(blog.createdAt).format("DD.MM.YYYY HH:mm")}
                  </div>
                </div>
                <div className="text-sm font-medium text-neutral-600">
                  {blog.isBanner === true ? (
                    <span className="bg-green-100 text-xs  rounded-full px-4 py-1 border-green-500 text-green-500 border">
                      Afişte
                    </span>
                  ) : (
                    <span className="bg-red-100 text-xs rounded-full px-4 py-1 border-red-500 text-red-500 border">
                      Afişte Değil
                    </span>
                  )}
                </div>
              </div>
              <img
                src={blog.imageURL}
                className="w-full max-h-[200px] object-cover rounded-xl"
              />
              <span className="font-semibold text-xl">{blog.title}</span>
              <p>{blog.content.slice(0, 200)}...</p>
              <div className="flex flex-col mt-auto w-full gap-3 ">
                <button
                  onClick={() => deleteHandle(blog._id)}
                  className="px-4 py-2 rounded-md flex items-center justify-start gap-2 text-sm bg-red-100 text-red-600 font-semibold hover:bg-red-600 hover:text-white transition-colors border-red-600 border "
                >
                  <TbTrash />
                  Sil
                </button>
                <button
                  onClick={() => openEdit(blog)}
                  className="px-4 py-2 rounded-md flex items-center justify-start gap-2 text-sm bg-blue-100 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-colors border-blue-600 border "
                >
                  <TbDatabaseEdit />
                  Düzenle
                </button>
                <Link
                  to={`/detail/${blog._id}`}
                  className="px-4 py-2 rounded-md  flex items-center justify-start gap-2 text-sm bg-violet-100 text-violet-600 font-semibold hover:bg-violet-600 hover:text-white transition-colors border-violet-600 border "
                >
                  <BsTextParagraph />
                  Detay
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 bg-red-100 font-medium text-red-500 rounded-md p-2 flex items-center gap-x-2 ">
            <TbAlertCircle />
            Henüz bir bloga sahip değilsiniz.
          </div>
        )}
      </div>
    </>
  );
};

export default MyBlogs;
