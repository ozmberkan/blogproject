import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import EditBlogModal from "~/components/UI/Modals/EditBlogModal";
import { getBlogByCreatedID } from "~/redux/slices/blogSlice";
import Profile from "~/components/MyAccount/Profile";
import MyBlogs from "~/components/MyAccount/MyBlogs";

const MyAccount = () => {
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
      <div className="container flex flex-col gap-5 mx-auto p-5">
        <Profile />
        <MyBlogs openEdit={openEdit} deleteHandle={deleteHandle} />
      </div>
    </>
  );
};

export default MyAccount;
