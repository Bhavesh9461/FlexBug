import React from 'react'
import AppRoutes from './AppRoutes'
import AuthContext from './features/auth/AuthContext'
import UserContext from './features/Dashboard/UserContext'
import PostContext from './features/posts/PostContext'
import FollowStatusContext from './features/follow/FollowStatusContext'

const App = () => {
  return (
    <AuthContext>
      <UserContext>
        <PostContext>
          <FollowStatusContext>
            <AppRoutes/>
          </FollowStatusContext>
        </PostContext>
      </UserContext>
    </AuthContext>
  )
}

export default App