import React, { createContext, useEffect, useState } from "react";

export const followContext = createContext();

const FollowStatusContext = ({ children }) => {
  const [followingMap, setFollowingMap] = useState({});
  const [followingUsers, setFollowingUsers] = useState([]);

  return (
    <followContext.Provider
      value={{
        followingMap,
        setFollowingMap,
        followingUsers,
        setFollowingUsers,
      }}
    >
      {children}
    </followContext.Provider>
  );
};

export default FollowStatusContext;
