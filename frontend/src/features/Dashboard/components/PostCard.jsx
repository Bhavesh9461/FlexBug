// src/components/PostCard.jsx
import React from "react";
import { FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";

const PostCard = ({
  imgUrl,
  profileImage,
  username,
  caption,
  postId,
  isLiked,
  loading,
  handleLike,
  handleUnlike,
}) => {
  if (loading) {
    return <h1 className="p-20 text-center">loading...</h1>;
  }

  return (
    <article className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-300 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-center object-cover"
              src={profileImage}
              alt=""
            />
          </div>
          <span className="font-semibold"> {username} </span>
        </div>
        <button className="cursor-pointer">•••</button>
      </div>

      {/* Image */}
      <div className="w-full h-80 bg-gray-200 overflow-hidden">
        <img
          className="w-full h-full object-center object-cover"
          src={imgUrl}
          alt=""
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 px-4 py-3 text-sm">
        <div className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-5">
            <button
              onClick={() => {
                isLiked ? handleUnlike(postId) : handleLike(postId);
              }}
              className="hover:scale-110 p-1 transition cursor-pointer"
            >
              {/* <span> */}
              {isLiked ? (
                <FaHeart className="text-red-500" size={22} />
              ) : (
                <FaRegHeart size={22} />
              )}
              {/* </span> */}
            </button>

            <button className="hover:scale-110 p-1 transition cursor-pointer">
              <span>
                {" "}
                <FaRegComment size={22} />{" "}
              </span>
            </button>
            <button className="hover:scale-110 p-1 transition cursor-pointer">
              <span>
                {" "}
                <IoPaperPlaneOutline size={22} />{" "}
              </span>
            </button>
          </div>
          <button className="hover:scale-110 p-1 transition cursor-pointer">
              <span>
                {" "}
                <FaRegBookmark size={22} />{" "}
              </span>
            </button>
        </div>

        <p>
          <span className="font-semibold text-base mr-2">{username}</span>
          {caption}
        </p>

        <input
          type="text"
          placeholder="Add a comment..."
          className="outline-none border-t pt-2 text-sm"
        />
      </div>
    </article>
  );
};

export default PostCard;
