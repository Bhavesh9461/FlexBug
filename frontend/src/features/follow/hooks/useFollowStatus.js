import { useContext, useEffect, useCallback } from "react";
import { followContext } from "../FollowStatusContext";
import {
  fetchFollowing,
  followUser,
  unfollowUser,
} from "../services/followStatus.api";

export function useFollowStatus() {
  const { followingMap, setFollowingMap, followingUsers, setFollowingUsers } =
    useContext(followContext);

  // -------------------------------
  // LOAD FOLLOWING (ON MOUNT)
  // -------------------------------
  useEffect(() => {
    const loadFollowing = async () => {
      try {
        const res = await fetchFollowing();

        const following = res?.following || res?.data?.following || [];

        const map = {};
        const users = [];

        following.forEach((item) => {
          if (item?.followee?._id) {
            const id = String(item.followee._id);
            map[id] = true;
            users.push(item.followee);
          }
        });

        setFollowingMap(map);
        setFollowingUsers(users);
      } catch (err) {
        console.error("Fetch Following Error:", err.message);
      }
    };

    loadFollowing();
  }, [setFollowingMap, setFollowingUsers]);

  // -------------------------------
  // FOLLOW
  // -------------------------------
  const handleFollowStatus = useCallback(
    async (id) => {
      try {
        const userId = String(id);

        const res = await followUser(userId);
        const followee = res?.followee || res?.data?.followee;

        // if (!followee?._id) {
        //   throw new Error("Invalid follow response from server");
        // }

        // Update map
        setFollowingMap((prev) => ({
          ...prev,
          [userId]: true,
        }));

        // Update users list (avoid duplicates)
        setFollowingUsers((prev) => {
          const exists = prev.some((user) => String(user._id) === userId);
          if (exists) return prev;
          return [...prev, followee];
        });

        return res;
      } catch (err) {
        console.error("Follow Error:", err.response?.data || err.message);
        throw err;
      }
    },
    [setFollowingMap, setFollowingUsers],
  );

  // -------------------------------
  // UNFOLLOW
  // -------------------------------
  const handleUnfollowStatus = useCallback(
    async (id) => {
      const userId = String(id);

      try {
        await unfollowUser(userId);

        // ✅ Remove from followingMap safely
        setFollowingMap((prev) => {
          if (!prev[userId]) return prev; // nothing to remove

          const updated = { ...prev };
          delete updated[userId];
          return updated;
        });

        // ✅ Remove from followingUsers safely
        setFollowingUsers((prev) =>
          prev.filter((user) => user && String(user._id) !== userId),
        );
      } catch (err) {
        console.error(
          "Unfollow Error:",
          err.response?.data?.message || err.message,
        );
      }
    },
    [setFollowingMap, setFollowingUsers],
  );

  return {
    handleFollowStatus,
    handleUnfollowStatus,
    followingMap,
    followingUsers,
  };
}
