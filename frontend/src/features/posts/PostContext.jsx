import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const postContext = createContext()

const PostContext = ({children}) => {

    const [posts, setPosts] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [loading, setLoading] = useState(false)

  return (
    <postContext.Provider value={{posts,setPosts,userPosts,setUserPosts,loading,setLoading}}>
        {children}
    </postContext.Provider>
  )
}

export default PostContext