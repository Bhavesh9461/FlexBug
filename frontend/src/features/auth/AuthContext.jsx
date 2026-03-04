import React, { createContext, useEffect, useState } from "react";

export const authContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [tempEmail, setTempEmail] = useState("")
  const [allUsers, setAllUsers] = useState([])

  return (
    <authContext.Provider value={{ user, loading, setUser, setLoading, userId, setUserId, otp, setOtp, message, setMessage, tempEmail, setTempEmail, allUsers, setAllUsers }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
