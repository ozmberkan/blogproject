import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import EditBlogModal from "~/components/UI/Modals/EditBlogModal";
import { getAllBlogs, getBlogByCreatedID } from "~/redux/slices/blogSlice";

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
      <div className="container mx-auto p-3">
        <h1>Kendi Bloglarım</h1>

        {myBlogs?.blogs?.map((blog) => (
          <div>
            <span> {blog.title}</span>
            <button
              onClick={() => deleteHandle(blog._id)}
              className="px-4 py-2 rounded-full text-sm bg-red-600 text-white"
            >
              sil
            </button>
            <button
              onClick={() => openEdit(blog)}
              className="px-4 py-2 rounded-full text-sm bg-blue-600 text-white"
            >
              düzenle
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyAccount;
