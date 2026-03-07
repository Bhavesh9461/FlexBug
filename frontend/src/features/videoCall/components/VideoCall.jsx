import React, { useEffect, useRef } from "react";
import { socket } from "../services/socket.service";

const VideoCall = ({ activeCall, onEndCall }) => {

  const localVideo = useRef();
  const remoteVideo = useRef();
  const pc = useRef();

  useEffect(() => {

    const start = async () => {

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      localVideo.current.srcObject = stream;

      pc.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
      });

      stream.getTracks().forEach(track => {
        pc.current.addTrack(track, stream);
      });

      pc.current.ontrack = (e) => {
        remoteVideo.current.srcObject = e.streams[0];
      };

      pc.current.onicecandidate = (e) => {

        if (e.candidate) {

          const to =
            activeCall.receiverSocketId ||
            activeCall.callerSocketId;

          socket.emit("ice-candidate", {
            to,
            candidate: e.candidate
          });

        }

      };

      if (activeCall.isCaller) {

        const offer = await pc.current.createOffer();
        await pc.current.setLocalDescription(offer);

        socket.emit("call-user-offer", {
          to: activeCall.receiverSocketId,
          offer
        });

      }

    };

    start();

    socket.on("incoming-offer", async ({ offer, from }) => {

      await pc.current.setRemoteDescription(offer);

      const answer = await pc.current.createAnswer();
      await pc.current.setLocalDescription(answer);

      socket.emit("answer-call", {
        to: from,
        answer
      });

    });

    socket.on("call-answered", async ({ answer }) => {

      await pc.current.setRemoteDescription(answer);

    });

    socket.on("ice-candidate", async ({ candidate }) => {

      await pc.current.addIceCandidate(candidate);

    });

  }, []);

  return (

    <div className="fixed bottom-4 right-4 bg-black p-2">

      <video ref={remoteVideo} autoPlay className="w-80"/>

      <video ref={localVideo} autoPlay muted className="w-24 absolute bottom-2 right-2"/>

      <button onClick={onEndCall}>End Call</button>

    </div>

  );

};

export default VideoCall;