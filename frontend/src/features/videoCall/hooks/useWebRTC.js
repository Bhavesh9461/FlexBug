import { useRef } from "react";

export const useWebRTC = () => {

  const peerConnection = useRef(null);

  const createPeerConnection = () => {

    peerConnection.current = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:global.stun.twilio.com:3478" }
      ],
    });

    return peerConnection.current;
  };

  const addLocalStream = (stream) => {

    stream.getTracks().forEach(track => {
      peerConnection.current.addTrack(track, stream);
    });

  };

  const closeConnection = () => {

    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

  };

  return {
    peerConnection,
    createPeerConnection,
    addLocalStream,
    closeConnection
  };

};