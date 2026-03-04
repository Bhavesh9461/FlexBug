import React from "react";
import { VscChromeClose } from "react-icons/vsc";

const NotificationsPanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`
        fixed top-0 left-0 h-screen bg-white shadow-lg z-40
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        w-full md:w-2/5 lg:w-[512px] border-r border-gray-200
        flex flex-col
      `}
    >
      {/* Header */}
      <div className="p-4 md:p-6 flex justify-between items-center border-b">
        <h2 className="text-lg md:text-xl font-semibold">Notifications</h2>
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 text-2xl cursor-pointer transition"
        >
          <VscChromeClose />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 overflow-y-auto">
        <p className="text-gray-600 text-sm md:text-base">
          No notifications yet.
        </p>
      </div>
    </div>
  );
};

export default NotificationsPanel;