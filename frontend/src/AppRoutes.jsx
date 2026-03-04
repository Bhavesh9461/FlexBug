import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./features/Start";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/Dashboard/pages/Home";
import Profile from "./features/Dashboard/pages/Profile";
import MainLayout from "./features/Dashboard/pages/MainLayout";
import ProtectedRoute from "./features/controller/ProtectedRoute";
import MessagePage from "./features/Dashboard/pages/MessagePage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute/>} >
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<MessagePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
