import React, { useContext } from "react";
import { getMe, updateUser } from "../services/user.api";
import { userContext } from "../UserContext";

export function useUser() {
  const context = useContext(userContext);

  const {
    user,
    setUser,
    loading,
    setLoading,
    isOpen,
    setIsOpen,
    username,
    setUsername,
    bio,
    setBio,
    image,
    setImage,
  } = context;

  const handleGetMe = async () => {
    setLoading(true);
    try {
      const res = await getMe();

      setUser(res.user);
      setUsername(res.user.username);
      setBio(res.user.bio);
      setImage(res.user.profileImage);

      return res.data;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (username, bio, image) => {
    setLoading(true);
    try {
      const res = await updateUser(username, bio, image);

      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    setUser,
    loading,
    handleGetMe,
    isOpen,
    setIsOpen,
    username,
    bio,
    image,
    setUsername,
    setBio,
    setImage,
    handleUpdateUser,
  };
}
