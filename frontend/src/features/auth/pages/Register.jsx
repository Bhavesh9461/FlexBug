// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [code, setCode] = useState("");

  const {
    user,
    loading,
    handleRegister,
    handleVerifyOtp,
    userId,
    otp,
    setOtp,
    message,
    setMessage,
    tempEmail,
    setTempEmail,
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await handleRegister(fullname, username, email, password);

    localStorage.setItem("user", JSON.stringify(user))
    // setUsername("")
    // setPassword("")
    // setEmail("")
    // setFullname("")
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
      </main>
    );
  }

  return (
    <>
      {/* <head>
        <title>Register | FlexBug</title>
        <meta
          name="description"
          content="Create a new FlexBug account and start sharing your moments."
        />
      </head> */}

      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <section className="flex flex-col lg:flex-row w-full max-w-5xl bg-white border border-gray-300 rounded-xl overflow-hidden shadow-lg">
          {/* Left side - illustration */}
          <div className="hidden lg:flex flex-1 bg-blue-500 items-center justify-center text-white text-center p-10">
            <div>
              <h2 className="text-4xl font-bold mb-4">Welcome to FlexBug</h2>
              <p className="text-lg">
                Share your moments and explore content from friends.
              </p>
            </div>
          </div>

          {/* Right side - form */}
          <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center">
            <header className="text-center mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold">Sign Up</h1>
              <p className="text-gray-500 text-sm mt-1">
                Create your account to start sharing.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <button
                type="submit"
                disabled={!!tempEmail}
                className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-semibold py-2 rounded transition disabled:cursor-no-drop disabled:opacity-45"
              >
                {tempEmail ? "OTP Sent" : "Send OTP"}
              </button>

              {tempEmail && (
                <div className="flex flex-col gap-2 mt-2">
                  <input
                    placeholder="Enter OTP"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const res = await handleVerifyOtp(code); // wait for verification
                        
                        if(res.success){
                          navigate("/home")
                        }
                        else{
                          setMessage("Invalid Otp")
                        }
                        
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    className="bg-green-500 cursor-pointer hover:bg-green-600 text-white py-2 rounded font-semibold transition"
                  >
                    Verify OTP
                  </button>
                </div>
              )}

              {message && (
                <p className="text-red-500 text-sm text-center font-semibold mt-1">
                  {message}
                </p>
              )}
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              By signing up, you agree to our Terms & Privacy Policy.
            </p>

            <div className="text-center mt-4">
              <span>Already have an account? </span>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-500 cursor-pointer font-semibold hover:underline"
              >
                Log in
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Register;
