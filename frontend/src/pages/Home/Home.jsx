import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "~/redux/slices/blogSlice";
import Banner from "~/components/Banner/Banner";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  return (
    <div className="container mx-auto p-6 w-full flex flex-col gap-8">
      {/* Banner */}
      <Banner blogs={blogs} />

      {/* Title Section */}
      <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#0A936C] via-black to-[#8E44AD]">
        Bloglar
      </h1>

      {/* Blog List Section */}
      <div className="grid grid-cols-1  md:grid-cols-3 gap-12">
        {blogs.map((blog, i) => (
          <div
            key={blog._id}
            className={`p-5 bg-white shadow-lg rounded-lg flex flex-col md:flex-row gap-5 transition-transform transform duration-300 hover:scale-105 ${
              i % 2 === 0 ? "md:col-span-2" : ""
            }`}
          >
            {/* Blog Image */}
            <div className="md:w-1/3 w-full ">
              <img
                src={blog.imageURL}
                alt={blog.title}
                className="rounded-lg w-full object-cover h-48 md:h-full"
              />
            </div>

            {/* Blog Details */}
            <div className="flex flex-col justify-between w-full">
              <div>
                {/* Title and Category */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold">{blog.title}</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600 border">
                    {blog.category.charAt(0).toUpperCase() +
                      blog.category.slice(1)}
                  </span>
                </div>

                {/* Content Preview */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {blog.content.slice(0, 100)}...
                </p>
              </div>

              {/* Read More Button */}
              <div className="mt-4">
                <Link
                  to={`/detail/${blog._id}`}
                  className="inline-block px-6 py-2 text-sm text-white bg-black rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Daha fazla
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
