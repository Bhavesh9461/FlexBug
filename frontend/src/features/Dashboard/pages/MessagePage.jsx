import React, { useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { useFollowStatus } from "../../follow/hooks/useFollowStatus";
import { MdOutlineCall, MdVideoCall } from "react-icons/md";

const users = [
  {
    id: 1,
    username: "john_doe",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    username: "jane_smith",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    username: "alex_raj",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const MessagePage = () => {
  const { handleFetchFollowing, followingUsers } = useFollowStatus();

  useEffect(() => {
    handleFetchFollowing();
  }, []);

  return (
    <main className="h-screen flex bg-white border border-gray-200 max-w-6xl mx-auto">
      {/* LEFT SIDEBAR - USERS */}
      <aside className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <header className="p-4 border-b font-semibold text-lg">Messages</header>

        {/* Users List */}
        <section className="flex-1 overflow-y-auto">
          {followingUsers.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No users</p>
          ) : (
            followingUsers.map((user) => (
              <article
                key={user._id}
                className="flex items-center justify-between p-4 hover:bg-gray-100 cursor-pointer transition group"
              >
                {/* LEFT SIDE - USER INFO */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold overflow-hidden">
                    <img className="w-full h-full object-center object-cover" src={user.followee.profileImage} alt="" />
                  </div>

                  <h2 className="font-medium text-sm">{user.followee.username}</h2>
                </div>

                {/* RIGHT SIDE - CALL OPTIONS */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {/* Audio Call */}
                  <button
                    onClick={() => console.log("Call", user.followee)}
                    className="p-2 rounded-full hover:bg-gray-200 transition"
                  >
                    <MdOutlineCall size={22} />
                  </button>

                  {/* Video Call */}
                  <button
                    onClick={() => console.log("Video Call", user.followee)}
                    className="p-2 rounded-full hover:bg-gray-200 transition"
                  >
                    <MdVideoCall size={22}/>
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </aside>

      {/* RIGHT SIDE - EMPTY STATE */}
      <section className="hidden md:flex flex-1 items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="flex justify-center mb-4">
            <div className="border-2 border-black rounded-full p-6">
              <MessageCircle size={40} />
            </div>
          </div>

          <h1 className="text-xl font-semibold mb-2">Your Messages</h1>

          <p className="text-gray-500 text-sm mb-6">
            Send private photos and messages to a friend or group.
          </p>

          <button className="bg-blue-500 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition cursor-pointer">
            Send Message
          </button>
        </div>
      </section>
    </main>
  );
};

export default MessagePage;
