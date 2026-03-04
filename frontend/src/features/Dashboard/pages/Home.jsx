// src/pages/Home.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import Suggestions from "../components/Suggesstions";
import CreatePost from "../components/CreatePost";
import { usePost } from "../../posts/hooks/usePost";
import { useEffect } from "react";
import { useRef } from "react";
import Stories from "../components/Stories";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUser } from "../hooks/useUser";

const Home = () => {
  const { posts, loading, handleGetPosts, handleLike, handleUnlike } =
    usePost();

  const { user,setUser, handleAllUsers, allUsers } = useAuth();


  useEffect(() => {
    handleGetPosts();
    handleAllUsers()
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <>
      {/* SEO */}
      {/* <head>
        <title>Home | FlexBug</title>
        <meta
          name="description"
          content="FlexBug - Share moments, explore content and connect with people."
        />
      </head> */}

      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex  justify-center xl:justify-around gap-8 px-4 py-8 md:ml-64 max-w-6xl mx-auto">
          {/* Feed */}
          <section className="flex flex-col gap-8 w-full max-w-xl">
            <div>
              <Stories />
            </div>
            {posts.length === 0 && <p>No posts yet</p>}

            {posts.map((post, idx) => {
              if (!post.user) return null; // skip if user is undefined
              return (
                <PostCard
                  key={idx}
                  imgUrl={post.imgUrl}
                  username={post.user.username}
                  profileImage={post.user.profileImage}
                  caption={post.caption}
                  isLiked={post.isLiked}
                  postId={post._id}
                  loading={loading}
                  handleLike={handleLike}
                  handleUnlike={handleUnlike}
                />
              );
            })}
          </section>

          <Suggestions allUsers={allUsers} />
        </div>
      </main>
    </>
  );
};

export default Home;
