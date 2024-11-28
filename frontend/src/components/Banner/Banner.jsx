import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

const Banner = ({ blogs }) => {
  const filteredBlogs = blogs.filter((blog) => blog.isBanner === true);

  if (filteredBlogs.length === 0) {
    return (
      <div className="w-full h-[500px] bg-neutral-100 flex justify-center items-center p-4 rounded-xl">
        <span className="font-black text-[100px] text-neutral-600">
          NO Banner
        </span>
      </div>
    );
  }

  const bannerBlog = filteredBlogs[0];

  return (
    <div
      style={{ backgroundImage: `url('${bannerBlog.imageURL}')` }}
      className="w-full  drop-shadow-2xl  h-[500px] p-7 bg-cover bg-center shadow-[inset_-0px_200px_400px_#05966970] rounded-xl flex flex-col gap-5 items-start justify-start "
    >
      <div className="w-full flex justify-between items-start">
        <h1 className="font-semibold text-4xl text-white">
          {bannerBlog.title}
        </h1>
        <span className="text-sm px-4 py-1 rounded-full bg-white font-medium text-zinc-500">
          {dayjs(bannerBlog.createdAt).format("DD.MM.YYYY HH:mm")}
        </span>
      </div>
      <span className="font-semibold text-sm text-white w-2/3">
        {bannerBlog.content.slice(0, 600)}...
      </span>
      <Link
        to={`/detail/${bannerBlog._id}`}
        className="px-4 py-2 rounded-full text-sm bg-white font-semibold"
      >
        Daha fazla
      </Link>
    </div>
  );
};

export default Banner;
