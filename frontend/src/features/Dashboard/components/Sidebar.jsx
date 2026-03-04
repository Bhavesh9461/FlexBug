// src/components/Sidebar.jsx
import React from "react";
import {
  FiCompass,
  FiHeart,
  FiHome,
  FiPlusSquare,
  FiSearch,
  FiSend,
  FiUser,
  FiVideo,
} from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { RiThunderstormsLine } from "react-icons/ri";

const Sidebar = ({ onCreateClick, onNotificationClick }) => {
  const navigate = useNavigate();

  const { loading, handleLogout } = useAuth();

  const onLogout = async () => {
    try {
      await handleLogout();
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return <h1>Logging out...</h1>;
  }

  const navItems = [
    { name: "Home", icon: <FiHome size={22} />, path: "/home" },
    { name: "Search", icon: <FiSearch size={22} />, path: "/search" },
    { name: "Explore", icon: <FiCompass size={22} />, path: "/explore" },
    { name: "Reels", icon: <FiVideo size={22} />, path: "/reels" },
    { name: "Messages", icon: <FiSend size={22} />, path: "/messages" },
    {
      name: "Notifications",
      icon: <FiHeart size={22} />,
      onClick: onNotificationClick,
    },
    {
      name: "Create",
      icon: <FiPlusSquare size={22} />,
      onClick: onCreateClick,
    },
    { name: "Profile", icon: <FiUser size={22} />, path: "/profile" },
  ];

  return (
    <aside
      className=" group hidden md:flex flex-col justify-between fixed left-0 top-0 h-screen w-20 hover:w-64  bg-white border-r border-gray-200 transition-all duration-300 ease-in-out overflow-hidden "
    >
      <div className="flex flex-col gap-10 px-4 py-8">
        {/* Logo Section */}
        <div className="flex items-center px-3 gap-3">
          {/* Instagram-style Icon */}
          <div className="text-2xl font-bold">
            <button>
              <RiThunderstormsLine size={26} />
            </button>
          </div>

          {/* FlexBug Text (appears smoothly) */}
          <span
            className=" text-2xl font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out whitespace-nowrap "
          >
            FlexBug
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) =>
            item.path ? (
              <Link
                key={item.name}
                to={item.path}
                className=" flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 grou "
              >
                {/* Icon container */}
                <div className="flex items-center justify-center w-6 h-6 shrink-0">
                  {item.icon}
                </div>

                {/* Text */}
                <span
                  className=" ml-4 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out whitespace-nowrap"
                >
                  {item.name}
                </span>
              </Link>
            ) : (
              <button
                key={item.name}
                onClick={item.onClick}
                className="  flex items-center  w-full  px-3 py-2  rounded-lg  hover:bg-gray-100  transition-all duration-200  group cursor-pointer"
              >
                {/* Icon container */}
                <div className="flex items-center justify-center w-6 h-6 shrink-0">
                  {item.icon}
                </div>

                {/* Text */}
                <span
                  className=" ml-4 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out whitespace-nowra "
                >
                  {item.name}
                </span>
              </button>
            ),
          )}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-2 px-4 pb-6">
        <button className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
          <IoMdSettings />

          <span
            className=" opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out whitespace-nowrap "
          >
            Settings
          </span>
        </button>

        <button
          onClick={onLogout}
          className="flex items-center gap-3 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
        >
          🔓
          <span
            className=" opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out whitespace-nowrap "
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
