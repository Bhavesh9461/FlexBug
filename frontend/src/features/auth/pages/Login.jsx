// src/pages/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useState } from "react";
import { usePost } from "../../posts/hooks/usePost.js";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, loading, handleLogin } = useAuth();
  const {setUserPosts} = usePost()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // login logic here
    setError(""); // clear old error
    setUserPosts([])

    try {
      const user = await handleLogin(username, password);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
        navigate("/home");
      }
    } catch (err) {
      // alert("Invalid credentials");
      const message =
        err.response?.data?.message || err.message || "Something went wrong";

      setError(message);
    }
  };

  if (loading) {
    return (
      <main className="w-full h-screen flex justify-center items-center">
        <h1 className="text-xl font-bold">Loading...</h1>
      </main>
    );
  }

  return (
    <>
      {/* SEO */}
      {/* <head>
        <title>Login | FlexBug</title>
        <meta name="description" content="Login to FlexBug to connect and share moments." />
      </head> */}

      <main className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
        <section className="flex flex-col w-full max-w-md gap-2">
          {/* Card */}
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
          <article className="bg-white border border-gray-300 p-6 sm:p-6 rounded-lg flex flex-col gap-4">
            <header className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold">FlexBug</h1>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="identifier" className="text-sm text-gray-600">
                  Phone number, username, or email
                </label>
                <input
                  value={username}
                  onInput={(e) => {
                    setUsername(e.target.value);
                  }}
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  autoComplete="username"
                  className="border border-gray-300 bg-gray-100 text-sm p-2.5 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="Enter username, email or phone-number"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm text-gray-600">
                  Password
                </label>
                <input
                  value={password}
                  onInput={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="border border-gray-300 bg-gray-100 text-sm p-2.5 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded cursor-pointer transition"
              >
                Log In
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="border border-gray-300 py-2 rounded text-sm hover:bg-gray-100 cursor-pointer transition"
              >
                Continue with Google
              </button>

              <button
                type="button"
                className="border border-gray-300 py-2 rounded text-sm hover:bg-gray-100 cursor-pointer transition"
              >
                Continue with Facebook
              </button>
            </div>

            <footer className="text-center">
              <button
                type="button"
                className="text-xs text-blue-500 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </footer>
          </article>

          {/* Bottom Section */}
          <div className="bg-white border border-gray-300 p-4 text-center text-sm">
            <span>Don't have an account? </span>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-500 font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
