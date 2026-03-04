import React from "react";
import { FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const PostRectBox = ({ posts, selectedPost, setSelectedPost, onClose}) => {
  if (!selectedPost) return null;

  const currentIndex = posts.findIndex(
    (post) => post._id === selectedPost._id
  );

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === posts.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setSelectedPost(posts[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setSelectedPost(posts[currentIndex - 1]);
    }
  };

  return (
    <div 
    className="fixed inset-0 bg-black/45 backdrop-blur-lg flex justify-center items-center z-50">
      <button
        onClick={onClose}
        className="fixed top-5 right-7 w-8 h-8 cursor-pointer text-white rounded-full"
      >
        <ImCancelCircle className="w-full h-full" />
      </button>
      {/* Main Box */}
        {/* LEFT BUTTON */}
        {!isFirst && (
          <button
            onClick={handlePrev}
            className="absolute left-17 top-1/2 -translate-y-1/2 bg-white/70 rounded-full w-10 h-10
            flex items-center justify-center pr-0.5 text-2xl cursor-pointer"
          >
            <IoIosArrowBack/>
          </button>
        )}
      <div className="bg-white w-[80%] h-[80%] rounded-lg flex overflow-hidden">
        {/* LEFT SIDE - IMAGE */}
        <div className="w-1/2 bg-black flex items-center justify-center">
          <img src={selectedPost.imgUrl} alt="" className="object-contain max-h-full" />
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div className="w-1/2 flex flex-col p-4">
          {/* User Info */}
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <img
                src={selectedPost.user.profileImage}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <span className="font-semibold">{selectedPost.user.username}</span>
            </div>
            <button className="text-2xl cursor-pointer"> <PiDotsThreeOutlineFill/> </button>
          </div>

          {/* Caption */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-3">
              <img
                src={selectedPost.user.profileImage}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <span className="font-semibold">{selectedPost.user.username}</span>
            </div>
            {selectedPost.caption}
          </div>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto mt-3">
            {selectedPost.comments?.map((comment, index) => (
              <div key={index} className="mb-2">
                <span className="font-semibold mr-2">
                  {comment.user.username}
                </span>
                {comment.text}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-lg border-t py-3 border-gray-300">
            <div className="flex items-center gap-5">
              <button className="hover:scale-110 p-1 text-gray-800 transition cursor-pointer">
                <FaRegHeart size={22} />
              </button>

              <button className="hover:scale-110 p-1 text-gray-800 transition cursor-pointer">
                <span>
                  {" "}
                  <FaRegComment size={22} />{" "}
                </span>
              </button>
              <button className="hover:scale-110 p-1 text-gray-800 transition cursor-pointer">
                <span>
                  {" "}
                  <IoPaperPlaneOutline size={22} />{" "}
                </span>
              </button>
            </div>

            <button className="hover:scale-110 p-1 text-gray-800 transition cursor-pointer">
              <span>
                {" "}
                <FaRegBookmark size={22} />{" "}
              </span>
            </button>
          </div>

          <input
            type="text"
            placeholder="Add a comment..."
            className="outline-none border-t border-gray-300 pt-2 text-sm"
          />
        </div>
      </div>

      {!isLast && (
          <button
            onClick={handleNext}
            className="absolute right-17 top-1/2 -translate-y-1/2 bg-white/70 rounded-full w-10 h-10
            flex items-center justify-center pl-0.5 text-2xl cursor-pointer"
          >
            <IoIosArrowForward/>
          </button>
        )}
    </div>
  );
};

export default PostRectBox;
