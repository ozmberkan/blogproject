import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "~/redux/slices/blogSlice";

const Home = () => {
  const { blogs } = useSelector((store) => store.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  return (
    <>
      <div>
        {blogs?.map((blog) => (
          <div>
            <span>{blog.title}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
