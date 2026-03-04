import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { usePost } from "../../posts/hooks/usePost";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isOpen, onClose }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");
  const postImageInputFieldRef = useRef(null);

  const navigate = useNavigate();

  const { loading, handleCreatePost, handleUserPosts } = usePost();

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();

    setError(""); // clear old error

    const file = postImageInputFieldRef.current.files[0];

    if (!file) {
      setError("Please select an image before sharing.");
      return;
    }

    try {
      const file = postImageInputFieldRef.current.files[0];

      await handleCreatePost(file, caption);

      await handleUserPosts();

      setCaption("");
      setImage(null);

      onClose();
      // navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (image) URL.revokeObjectURL(image);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    if (image) URL.revokeObjectURL(image);
    setImage(null);
    setCaption("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white w-full h-full max-w-xl rounded-2xl shadow-2xl flex flex-col animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-5 py-4">
          <h2 className="font-semibold text-lg">Create New Post</h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <IoClose size={22} />
          </button>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {/* Body */}
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="p-5 flex flex-col gap-4"
        >
          <div className="aspect-square w-full h-79 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <label
                className="cursor-pointer text-gray-400 text-sm"
                htmlFor="uploadFile"
              >
                Select an Image
              </label>
            )}
          </div>

          <label
            className="cursor-pointer text-center text-indigo-400 text-sm"
            htmlFor="uploadFile"
          >
            Choose Image File
          </label>
          <input
            ref={postImageInputFieldRef}
            id="uploadFile"
            hidden
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="text-sm cursor-pointer"
          />

          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="border rounded-lg p-3 resize-none focus:ring-2 focus:ring-black focus:outline-none"
            rows={3}
          />

          <button 
          disabled={loading}
          className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer active:scale-95">
            {loading ? "Creating..." : "Share Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
