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
    <div className="container mx-auto flex flex-col">
      {currentBlog?.category &&
        currentBlog.category.charAt(0).toUpperCase() +
          currentBlog.category.slice(1)}

      <span>{currentBlog?.title}</span>
      <img src={currentBlog?.imageURL} className="w-80" />
      <span className="text-sm">{currentBlog?.content}</span>
    </div>
  );
};

export default Detail;
