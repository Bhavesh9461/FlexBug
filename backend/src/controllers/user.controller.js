const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

const followUserController = async (req,res)=>{
    try{
        const followerId = req.user.id
        const followeeId = req.params.id

        if(followerId === followeeId){
            return res.status(400).json({
                message: "you can't follow yourself."
            })
        }

        const isFolloweeExists = await userModel.findById({_id: followeeId})

        if(!isFolloweeExists){
            return res.status(404).json({
                message: `User not exists with this id`
            })
        }

        const isAlreadyFollowing = await followModel.findOne({
            follower: followerId,
            followee: followeeId
        })

        if(isAlreadyFollowing){
            return res.status(200).json({
                message: `You are already following`,
                follow: isAlreadyFollowing
            })
        }

        const followRecord = await followModel.create({
            follower: followerId,
            followee: followeeId
        })

        res.status(201).json({
            message: `Follow request sent`,
            follow: followRecord 
        })
    } catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

const unfollowUserController = async (req,res)=>{
    try{
        const followerId = req.user.id
        const followeeId = req.params.id

        if(followerId === followeeId){
            return res.status(200).json({
                message: "You can't unfollow yourself."
            })
        }

        const isUserFollowing = await followModel.findOne({
            follower: followerId,
            followee: followeeId
        })

        if(!isUserFollowing){
            return res.status(200).json({
                message: `You are not following ${followeeId}`
            })
        }

        await followModel.findByIdAndDelete(isUserFollowing._id)

        res.status(200).json({
            message: `You have unfollowed ${followeeId}`
        })

    } catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
} 

const updateFollowStatusController = async (req,res)=>{
    try{
        const followerId = req.params.id
        const followeeId = req.user.id
        const {status} = req.body

        if(!["accepted", "rejected"].includes(status)){
            return res.status(400).json({
                message: "Status must be accepted or rejected."
            })
        }

        if(followerId === followeeId){
            return res.status(200).json({
                message: "You can't accept or reject your request..bcz you are searching your id."
            })
        }

        const followRequest = await followModel.findOne({
            follower: followerId,
            followee: followeeId
        })

        if(!followRequest){
            return res.status(404).json({
                message: "Follow request not found!"
            })
        }

        if(followRequest.followee !== followeeId){
            return res.status(403).json({
                message: "You are not allowed to update this request or unauthorized."
            })
        }

        if(followRequest.status !== "pending"){
            return res.status(400).json({
                message: "Request already processed."
            })
        }

        followRequest.status = status
        await followRequest.save()

        res.status(200).json({
            message: `Follow request ${status}`,
            follow: followRequest
        })

    } catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

const getFollowingUsersController = async (req,res)=>{
    try{
        const currentUsername = req.user.id

        const following = await followModel.find({
            follower: currentUsername
        }).populate("followee")

        return res.status(200).json({
            success: true,
            count: following.length,
            following
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    followUserController,
    unfollowUserController,
    updateFollowStatusController,
    getFollowingUsersController
}