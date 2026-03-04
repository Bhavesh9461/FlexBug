import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CreatePost from "../components/CreatePost";
import NotificationsPanel from "../components/NotificationsPanel";

const MainLayout = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <>
      <Sidebar
        onCreateClick={() => setIsCreateOpen(true)}
        onNotificationClick={() => {
          setIsNotificationOpen((prev) => !prev);
        }}
      />

      <div>
        <Outlet />
      </div>

      <NotificationsPanel
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      <CreatePost
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </>
  );
};

export default MainLayout;
