import { useContext, useEffect } from "react";
import { postContext } from "../PostContext";
import {
  createPost,
  getAllPosts,
  getUserPosts,
  likePost,
  unlikePost,
} from "../services/post.api";

export function usePost() {
  const context = useContext(postContext);

  const { posts, setPosts, userPosts, setUserPosts, loading, setLoading } =
    context;

  const handleGetPosts = async () => {
    setLoading(true);
    
    try {
      const res = await getAllPosts();
      setPosts(res.posts.reverse() || []);
      // console.log(res);
      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUserPosts = async () => {
    setLoading(true);
    setUserPosts([])
    try {
      const res = await getUserPosts();
      setUserPosts(res.posts.reverse() || []);;
      
      return res;
    } catch (err) {
      // console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (imageFile, caption) => {
    setLoading(true);
    try {
      const data = await createPost(imageFile, caption);
      setPosts([data.post, ...posts]);
      setUserPosts([data.post, ...userPosts]);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
 
    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? {
              ...post,
              isLiked: true,
            }
          : post,
      ),
    );
    try {
      const data = await likePost(postId);
    } catch (err) {
      //   throw err;
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                isLiked: false,
              }
            : post,
        ),
      );
      throw err;
    } 
  };

  const handleUnlike = async (postId) => {
    
    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? {
              ...post,
              isLiked: false,
            }
          : post,
      ),
    );
    try {
      const data = await unlikePost(postId);
    } catch (err) {
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                isLiked: true,
              }
            : post,
        ),
      );
      throw err;
    } 
  };

  // useEffect(() => {
  //   handleGetPosts();
  // }, []);

  return {
    posts,
    loading,
    handleGetPosts,
    userPosts,
    handleUserPosts,
    setUserPosts,
    handleCreatePost,
    handleLike,
    handleUnlike,
  };
}
