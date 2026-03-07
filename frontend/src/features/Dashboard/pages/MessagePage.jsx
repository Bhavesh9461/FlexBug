import React, { useEffect, useState } from "react";
import { MdVideoCall } from "react-icons/md";
import { MessageCircle } from "lucide-react";
import VideoCall from "../../videoCall/components/VideoCall";
import { socket } from "../../videoCall/services/socket.service";
import { useFollowStatus } from "../../follow/hooks/useFollowStatus";

const MessagePage = () => {

  const { followingUsers } = useFollowStatus();
  const currentUserId = localStorage.getItem("userId");

  const [incomingCall, setIncomingCall] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [callingUser, setCallingUser] = useState(null);

  useEffect(() => {

    if (!currentUserId) return;

    socket.emit("join-user", currentUserId);

    // incoming call
    socket.on("incoming-call", ({ callerId, callerSocketId }) => {

      setIncomingCall({
        callerId,
        callerSocketId
      });

    });

    // call accepted
    socket.on("call-accepted", ({ receiverSocketId }) => {

      setActiveCall({
        receiverSocketId,
        isCaller: true
      });

      setCallingUser(null);

    });

    // call rejected
    socket.on("call-rejected", () => {

      alert("User rejected the call");
      setCallingUser(null);

    });

    return () => {

      socket.off("incoming-call");
      socket.off("call-accepted");
      socket.off("call-rejected");

    };

  }, [currentUserId]);

  // start call
  const startCall = (receiverId) => {

    setCallingUser(receiverId);

    socket.emit("call-user", {
      to: receiverId,
      callerId: currentUserId
    });

  };

  // accept call
  const acceptCall = () => {

    socket.emit("accept-call", {
      to: incomingCall.callerSocketId
    });

    setActiveCall({
      callerSocketId: incomingCall.callerSocketId,
      isCaller: false
    });

    setIncomingCall(null);

  };

  // reject call
  const rejectCall = () => {

    socket.emit("reject-call", {
      to: incomingCall.callerSocketId
    });

    setIncomingCall(null);

  };

  return (
    <>
      {/* MAIN MESSAGE LAYOUT */}
      <main className="h-screen flex bg-white border border-gray-200 max-w-4xl mx-auto">

        {/* LEFT USER LIST */}
        <aside className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 flex flex-col">

          <header className="p-4 border-b font-semibold text-lg">
            Messages
          </header>

          <section className="flex-1 overflow-y-auto">

            {followingUsers.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">
                No users
              </p>
            ) : (

              followingUsers.map((user) => (

                <article
                  key={user._id}
                  className="flex items-center justify-between p-4 hover:bg-gray-100 cursor-pointer group"
                >

                  <div className="flex items-center gap-3">

                    <img
                      src={user.profileImage}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <h2 className="font-medium text-sm">
                      {user.username}
                    </h2>

                  </div>

                  <button
                    onClick={() => startCall(user._id)}
                    className="opacity-0 group-hover:opacity-100 transition"
                  >
                    <MdVideoCall size={22}/>
                  </button>

                </article>

              ))

            )}

          </section>

        </aside>

        {/* EMPTY MESSAGE PANEL */}
        <section className="hidden md:flex flex-1 items-center justify-center">

          <div className="text-center max-w-sm">

            <div className="flex justify-center mb-4">

              <div className="border-2 border-black rounded-full p-6">
                <MessageCircle size={40}/>
              </div>

            </div>

            <h1 className="text-xl font-semibold mb-2">
              Your Messages
            </h1>

            <p className="text-gray-500 text-sm">
              Send private photos and messages to a friend or group.
            </p>

          </div>

        </section>

      </main>

      {/* CALLING SCREEN */}
      {callingUser && (

        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 text-white text-xl">

          Calling...

        </div>

      )}

      {/* INCOMING CALL POPUP */}
      {incomingCall && (

        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">

          <div className="bg-white p-6 rounded-xl text-center shadow-lg w-80">

            <h2 className="text-lg font-semibold mb-2">
              Incoming Video Call
            </h2>

            <p className="text-gray-500 mb-4">
              {incomingCall.callerId} is calling...
            </p>

            <div className="flex justify-center gap-4">

              <button
                onClick={acceptCall}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Accept
              </button>

              <button
                onClick={rejectCall}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Reject
              </button>

            </div>

          </div>

        </div>

      )}

      {/* VIDEO CALL WINDOW */}
      {activeCall && (

        <VideoCall
          activeCall={activeCall}
          onEndCall={() => setActiveCall(null)}
        />

      )}
    </>
  );

};

export default MessagePage;