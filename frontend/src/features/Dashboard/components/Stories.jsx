import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Stories = () => {

  const scrollRef = useRef(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const stories = [
    { id: 1, username: "john", profileImage: "https://i.pravatar.cc/150?img=1", storyImage: "https://picsum.photos/400/700?random=1" },
    { id: 2, username: "alex", profileImage: "https://i.pravatar.cc/150?img=2", storyImage: "https://picsum.photos/400/700?random=2" },
    { id: 3, username: "sara", profileImage: "https://i.pravatar.cc/150?img=3", storyImage: "https://picsum.photos/400/700?random=3" },
    { id: 4, username: "mike", profileImage: "https://i.pravatar.cc/150?img=4", storyImage: "https://picsum.photos/400/700?random=4" },
    { id: 5, username: "emma", profileImage: "https://i.pravatar.cc/150?img=5", storyImage: "https://picsum.photos/400/700?random=5" },
    { id: 6, username: "liam", profileImage: "https://i.pravatar.cc/150?img=6", storyImage: "https://picsum.photos/400/700?random=6" },
    { id: 7, username: "olivia", profileImage: "https://i.pravatar.cc/150?img=7", storyImage: "https://picsum.photos/400/700?random=7" },
    { id: 8, username: "noah", profileImage: "https://i.pravatar.cc/150?img=8", storyImage: "https://picsum.photos/400/700?random=8" },
    { id: 9, username: "ava", profileImage: "https://i.pravatar.cc/150?img=9", storyImage: "https://picsum.photos/400/700?random=9" },
    { id: 10, username: "william", profileImage: "https://i.pravatar.cc/150?img=10", storyImage: "https://picsum.photos/400/700?random=10" },
    { id: 11, username: "mia", profileImage: "https://i.pravatar.cc/150?img=11", storyImage: "https://picsum.photos/400/700?random=11" },
    { id: 12, username: "james", profileImage: "https://i.pravatar.cc/150?img=12", storyImage: "https://picsum.photos/400/700?random=12" },
    { id: 13, username: "sophia", profileImage: "https://i.pravatar.cc/150?img=13", storyImage: "https://picsum.photos/400/700?random=13" },
  ];

  // 🔥 Check scroll position
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setShowLeft(scrollLeft > 5);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
  }, []);

  return (
    <div className="relative">

      {/* LEFT BUTTON */}
      {showLeft && (
        <button
          onClick={() =>
            scrollRef.current.scrollBy({
              left: -200,
              behavior: "smooth",
            })
          }
          className="absolute left-0 top-6 z-10 bg-white shadow rounded-full w-8 h-8 flex items-center justify-center"
        >
          <IoIosArrowBack />
        </button>
      )}

      {/* STORIES CONTAINER */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center cursor-pointer min-w-[70px]"
          >
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-pink-600">
              <img
                src={story.profileImage}
                alt=""
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>
            <span className="text-xs mt-1 truncate w-[70px] text-center">
              {story.username}
            </span>
          </div>
        ))}
      </div>

      {/* RIGHT BUTTON */}
      {showRight && (
        <button
          onClick={() =>
            scrollRef.current.scrollBy({
              left: 200,
              behavior: "smooth",
            })
          }
          className="absolute right-0 top-6 z-10 bg-white shadow rounded-full w-8 h-8 flex items-center justify-center"
        >
          <IoIosArrowForward />
        </button>
      )}

    </div>
  );
};

export default Stories;