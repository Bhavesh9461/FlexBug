import React from "react";
import { useState } from "react";
import { useUser } from "../hooks/useUser";

const EditProfile = ({
  isOpen,
  setIsOpen,
  username,
  setUsername,
  image,
  setImage,
  bio,
  setBio,
}) => {
  const [error, setError] = useState("");
  const { handleUpdateUser, loading, setUser } = useUser();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    // console.log(username, bio, image);
    setError("");

    try {
      const res = await handleUpdateUser(username, bio, image);
      setUser(res.updateUser)
      setIsOpen(false);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Something went wrong";

      setError(message);
    }

  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        {/* Profile Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Profile Picture
          </label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>


        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={(e) => {
              handleSubmit(e);
            }}
            className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
