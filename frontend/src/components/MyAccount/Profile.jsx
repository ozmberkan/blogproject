import React, { useState } from "react";
import { TbPhotoEdit } from "react-icons/tb";
import { useSelector } from "react-redux";
import PhotoEditModal from "../UI/Modals/PhotoEditModal";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const [editPhoto, setEditPhoto] = useState(false);

  return (
    <>
      {editPhoto && <PhotoEditModal setEditPhoto={setEditPhoto} />}
      <div className="flex flex-col gap-1 ">
        <h1 className="font-bold text-3xl">Profilim</h1>
        <div className="bg-white border shadow-xl rounded-lg p-4 flex items-start justify-start gap-5">
          <div className="relative">
            <img
              src={
                user?.photoURL
                  ? user.photoURL
                  : "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png"
              }
              alt=""
              className="h-full max-w-44 max-h-44 min-h-44 min-w-44 rounded-md"
            />
            <button
              onClick={() => setEditPhoto(true)}
              className="absolute -top-2 -right-2 bg-white border p-3 rounded-md"
            >
              <TbPhotoEdit />
            </button>
          </div>
          <div className="w-full flex flex-col">
            <div className=" w-full">
              <h2 className="font-bold text-xl">{user?.username}</h2>
              <p>{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
