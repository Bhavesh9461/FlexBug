const express = require("express")
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()

/** 
 * @route POST /api/users/follow/:id
 * @description Follow a user
 * @access Private */
userRouter.post("/follow/:id", identifyUser, userController.followUserController)

/** 
 * @route POST /api/users/unfollow/:id
 * @description Unfollow a user
 * @access Private */
userRouter.post("/unfollow/:id", identifyUser, userController.unfollowUserController)

/** 
 * @route PATCH /api/users/follow/:username/status
 * @description accept or reject a follow request
 * @access Private */
userRouter.patch("/follow/:username/status", identifyUser, userController.updateFollowStatusController)

/** 
 * @route GET /api/users/following
 * @description get all users I am following
 * @access Private */
userRouter.get("/following", identifyUser, userController.getFollowingUsersController)

module.exports = userRouter