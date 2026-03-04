// src/components/Suggestions.jsx
import React, { useEffect } from "react";
import { useFollowStatus } from "../../follow/hooks/useFollowStatus";

const Suggestions = ({allUsers}) => {


  const {handleFollowStatus,followingMap,handleFetchFollowing, handleUnfollowStatus} = useFollowStatus()

  const followHandler = async (id)=>{
    try{
      await handleFollowStatus(id)
    }
    catch(err){
      console.log(err.message);
      throw err
    }
  }

  const unfollowHandler = async (id)=>{
    try{
      await handleUnfollowStatus(id)
    }
    catch(err){
      console.log(err.message);
      throw err
    }
  }

  return (
    <aside className="hidden xl:flex flex-col gap-6 w-80">

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col gap-4">

        <h3 className="text-sm font-semibold text-gray-600 border-b pb-1 border-gray-300">
          Suggestions For You
        </h3>

        {allUsers.map((user) => (
          <div key={user._id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                <img className="w-full h-full object-cover object-center" src={user.profileImage} alt="" />
              </div>
              <span> {user.username} </span>
            </div>

            <button 
            onClick={()=>{
              followingMap[user._id] ? 
              unfollowHandler(user._id) : followHandler(user._id)
            }}
            className="text-blue-500 hover:text-blue-600 transition cursor-pointer">
              {followingMap[user._id] ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))}

      </div>

    </aside>
  );
};

export default Suggestions;