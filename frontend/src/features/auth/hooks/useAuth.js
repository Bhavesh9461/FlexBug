import React, { useContext } from "react";
import { authContext } from "../AuthContext";
import { getAllUsers, login, logout, register, verifyOtp } from "../services/auth.api";

export function useAuth() {
  const context = useContext(authContext);

  const {
    user,
    setUser,
    loading,
    setLoading,
    userId,
    setUserId,
    otp,
    setOtp,
    message,
    setMessage,
    tempEmail,
    setTempEmail,
    allUsers, setAllUsers
  } = context;

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const res = await login(username, password);
      setUser(res.user);

      return res;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await logout();
      setUser(null);

      return res;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (fullname, username, email, password) => {
    setLoading(true);
    try {
      const res = await register(fullname, username, email, password);
      setTempEmail(email);
      setMessage(res.message);

      return res;
    } catch (err) {
      console.error(err);
      // handle backend errors gracefully
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else if (err instanceof Error) {
        setMessage(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (code) => {
    if (!tempEmail) {
      setMessage("Email not found. Please register first.");
      return;
    }
    setLoading(true);
    try {
      const res = await verifyOtp(tempEmail, code);

      // Now the user is verified, you can store full user info or JWT
      if (res && res.user) {
        setUser(res.user); // store user info
        console.log(res);
        
        setMessage(res.message || "Verified successfully!");

        // Optional: clear temp data after success
        setTempEmail("");
        setOtp("");
        return res
      } else {
        setMessage(res?.message || "Something went wrong during verification.");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAllUsers = async ()=>{
     setLoading(true);
    try {
      const res = await getAllUsers();
      // console.log(res.users);
      setAllUsers(res.users.reverse() || [])

      return res;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    user,
    setUser,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
    handleVerifyOtp,
    userId,
    message,
    otp,
    setOtp,
    tempEmail,
    setTempEmail,
    setMessage,
    handleAllUsers,
    allUsers
  };
}
