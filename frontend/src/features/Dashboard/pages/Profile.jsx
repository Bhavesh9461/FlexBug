// src/pages/Profile.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { IoSettingsSharp } from "react-icons/io5";
import Sidebar from "../components/Sidebar";
import { BsGrid3X3Gap } from "react-icons/bs";
import { CgPlayButtonR } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import { RiMapPinUserLine } from "react-icons/ri";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import { useState } from "react";
import { usePost } from "../../posts/hooks/usePost";
import EditProfile from "../components/EditProfile";
import PostRectBox from "../components/PostRectBox";
import { useRef } from "react";

const Profile = () => {
  const {
    user,
    handleGetMe,
    isOpen,
    setIsOpen,
    username,
    setUsername,
    bio,
    setBio,
    image,
    setImage,
  } = useUser();

  const [selectedPost, setSelectedPost] = useState(null);

  const { userPosts, loading, handleUserPosts } = usePost();

  // 🔥 Scroll Logic
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const isAtStart = el.scrollLeft <= 0;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;

    setShowLeft(!isAtStart);
    setShowRight(!isAtEnd);
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });

    setTimeout(checkScroll, 300);
  };

  useEffect(() => {
    checkScroll();
  }, [userPosts]);

  useEffect(() => {
    handleGetMe();
  }, []);

  useEffect(() => {
    if (user) {
      handleUserPosts();
    }
  }, [user]);

  return (
    <>
      {/* Navbar (Top Bar) */}
      <Navbar />

      {/* Layout Wrapper */}
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar (Desktop Only) */}

        {/* Main Content */}
        <main className="flex-1 md:ml-64">
          <section className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-10">
            {/* Profile Header */}
            <header className="flex flex-col gap-6">
              {/* Top Section */}
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                {/* Profile Image */}
                <div className="flex justify-center md:justify-start">
                  <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-gray-300 border-4 border-white shadow-[0_0_20px_rgb(184,179,179)] overflow-hidden">
                    <img
                      className="w-full h-full object-center object-cover"
                      src={image}
                      alt=""
                    />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex flex-col gap-4 md:w-82">
                  {/* Username + Settings */}
                  <div className="flex items-center justify-center md:items-start md:justify-start gap-3 min-w-0">
                    <h1 className="text-2xl break-all font-semibold min-w-0">
                      {user.username}
                    </h1>

                    <button
                      aria-label="Open settings"
                      className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 cursor-pointer active:scale-95"
                    >
                      <IoSettingsSharp size={23} />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between sm:justify-center md:justify-start sm:gap-10 text-sm">
                    <div>
                      <span className="font-semibold">{userPosts.length}</span>{" "}
                      posts
                    </div>
                    <div>
                      <span className="font-semibold">340</span> followers
                    </div>
                    <div>
                      <span className="font-semibold">180</span> following
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="text-sm text-center flex flex-col items-center md:items-start md:text-left">
                    <p className="font-semibold break-all">{username} </p>
                    <p className="text-gray-600 w-60">{bio || "No bio yet"}</p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center md:justify-start gap-3">
                <button
                  onClick={() => setIsOpen(true)}
                  className="md:px-20 px-4 sm:px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-all duration-200 cursor-pointer active:scale-95"
                >
                  Edit Profile
                </button>

                <button className="md:px-20 px-4 sm:px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-all duration-200 cursor-pointer active:scale-95">
                  Share Profile
                </button>
              </div>
            </header>

            {/* EditProfile Component */}
            <EditProfile
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              username={username}
              setUsername={setUsername}
              image={image}
              setImage={setImage}
              bio={bio}
              setBio={setBio}
            />

            {/* Story Highlights */}
            <section className="flex gap-6 overflow-x-auto">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-300 border-2 border-gray-300 group-hover:border-gray-500 transition overflow-hidden">
                    <img
                      className="w-full h-full object-center object-cover"
                      src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                      alt=""
                    />
                  </div>
                  <span className="text-xs">Highlight {item}</span>
                </div>
              ))}
            </section>

            {/* Tabs */}
            <nav className="border-b border-gray-300 flex justify-evenly text-sm font-medium">
              <button className="py-3 border-b-2 border-black cursor-pointer transition">
                <span>
                  {" "}
                  <BsGrid3X3Gap size={22} />{" "}
                </span>
              </button>
              <button className="py-3 text-gray-500 hover:text-black cursor-pointer transition">
                <span>
                  {" "}
                  <CgPlayButtonR size={22} />{" "}
                </span>
              </button>
              <button className="py-3 text-gray-500 hover:text-black cursor-pointer transition">
                <span>
                  {" "}
                  <FaRegBookmark size={22} />{" "}
                </span>
              </button>
              <button className="py-3 text-gray-500 hover:text-black cursor-pointer transition">
                <span>
                  {" "}
                  <RiMapPinUserLine size={22} />{" "}
                </span>
              </button>
            </nav>

            {/* Post Grid */}
            {userPosts.length === 0 && (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <i className="text-5xl mb-4">📷</i>
                <p className="text-lg font-semibold">No Posts Yet</p>
                <p className="pt-1">Start sharing your moments.</p>
              </div>
            )}
            <section className="flex flex-wrap gap-1 sm:gap-4">
              {userPosts.map((userpost, index) => (
                <div
                  key={index}
                  className="aspect-square w-75 h-65 bg-gray-300 hover:opacity-80 transition cursor-pointer rounded-sm
                  overflow-hidden"
                >
                  <img
                    onClick={() => {
                      setSelectedPost(userpost);
                    }}
                    className="w-full h-full object-center object-cover cursor-pointer"
                    src={userpost.imgUrl}
                    alt=""
                  />
                </div>
              ))}
            </section>
            {selectedPost && (
              <PostRectBox
                posts={userPosts}
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
                onClose={() => setSelectedPost(null)}
              />
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default Profile;
