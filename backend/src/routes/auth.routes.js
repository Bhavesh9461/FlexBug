const express = require("express")
const authController = require("../controllers/auth.controller")
const multer = require("multer")
const identifyUser  = require("../middlewares/auth.middleware")
const upload = multer({storage: multer.memoryStorage()})

const authRouter = express.Router()


authRouter.post("/register", authController.registerController )
authRouter.post("/register/verify", authController.verifyOtpController )

authRouter.post("/login", authController.loginController)

authRouter.post("/logout", authController.logoutController)

/**
 * @route GET /api/auth/get-me
 * @desc get the currently logged in user's information
 * @access Private
 */
authRouter.get("/get-me", identifyUser, authController.getMeController)

/**
 * @route PATCH /api/auth/update-user
 * @desc update the currently logged in user's information
 * @access Private
 */
authRouter.patch("/update-user", upload.single("profileImage"), identifyUser, authController.userUpdateController)

/**
 * @route GET /api/auth/all-users
 * @desc fetch all users exists in database
 * @access Private
 */
authRouter.get("/all-users", identifyUser, authController.getAllUsersController)

module.exports = authRouter