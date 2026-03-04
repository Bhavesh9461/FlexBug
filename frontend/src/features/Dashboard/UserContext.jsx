import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const userContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [image, setImage] = useState(null);

  return(
    <userContext.Provider value={{user,loading,setUser,setLoading,isOpen,setIsOpen,username,setUsername,bio,setBio, image, setImage}}>
        {children}
    </userContext.Provider>
  ) 
};

export default UserContext;
