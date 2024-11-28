import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditBlogModal from "~/components/UI/Modals/EditBlogModal";
import { getAllBlogs, getBlogByCreatedID } from "~/redux/slices/blogSlice";
import { TbDatabase, TbDatabaseEdit, TbTrash } from "react-icons/tb";
import { BsTextParagraph } from "react-icons/bs";
import dayjs from "dayjs";

const MyAccount = () => {
  const { myBlogs } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      dispatch(getBlogByCreatedID(user._id));
    }
  }, [user, dispatch]);

  const deleteHandle = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/api/blog/delete/${id}`);
      toast.success("Blog başarıyla silindi");
      dispatch(getBlogByCreatedID(user._id));
    } catch (error) {
      console.log(error);
    }
  };

  const openEdit = (blog) => {
    setEditMode(true);
    setSelectedBlog(blog);
  };

  return (
    <>
      {editMode && (
        <EditBlogModal
          selectedBlog={selectedBlog}
          setEditMode={setEditMode}
          user={user}
        />
      )}
      <div className="container flex flex-col  mx-auto p-5">
        <div className="flex flex-col gap-1 mb-5">
          <h1 className="font-bold text-3xl">Profilim</h1>
          <div className="bg-white border shadow-xl rounded-lg p-4 flex flex-col">
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold text-3xl">Kendi Bloglarım</h1>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {myBlogs?.blogs?.map((blog) => (
            <div className="p-4 rounded-md border shadow-xl flex flex-col gap-5 items-start">
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
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAccount;
