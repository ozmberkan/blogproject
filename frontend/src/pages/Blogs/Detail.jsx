import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlogDetailByID } from "~/redux/slices/blogSlice";

const Detail = () => {
  const { id } = useParams();
  const { currentBlog } = useSelector((state) => state.blog);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogDetailByID(id));
  }, []);

  return (
    <div className="container mx-auto flex flex-col gap-4 p-5">
      <div className="w-full  flex items-center  justify-between">
        <div className="flex items-center gap-x-2">
          <img
            src={currentBlog?.createdPhoto}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium text-zinc-500">
            @{currentBlog?.createdName}
          </span>
        </div>
        <span className="text-xs text-zinc-500">
          {dayjs(currentBlog?.createdAt).format("DD.MM.YYYY HH:mm")}
        </span>
      </div>
      <div className="relative">
        <div
          style={{ backgroundImage: `url('${currentBlog?.imageURL}')` }}
          className="w-full drop-shadow-2xl h-[500px] p-7 bg-cover bg-center shadow-[inset_-0px_200px_400px_#05966970] rounded-xl flex flex-col gap-5 items-start justify-start "
        ></div>
        <div className="absolute text-zinc-600 font-medium text-sm top-3 left-3 px-4 py-1 rounded-full bg-white">
          <span>
            {currentBlog?.category &&
              currentBlog.category.charAt(0).toUpperCase() +
                currentBlog.category.slice(1)}
          </span>
        </div>
      </div>
      <span className="text-3xl font-semibold">{currentBlog?.title}</span>
      <span className="text-sm">{currentBlog?.content}</span>
    </div>
  );
};

export default Detail;
