const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");
const userModel = require("../models/user.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPostController = async (req, res) => {
  const { caption } = req.body;

  const userId = req.user.id;

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: req.file.originalname,
    folder: "cohort-2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption,
    imgUrl: file.url,
    user: userId,
  });

  res.status(201).json({
    message: "Post created successfull.",
    post,
  });
};

const getPostController = async (req, res) => {
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  }).populate("user")

  if (!posts) {
    return res.status(404).json({
      message: "post not found.",
    });
  }

  if (posts.length === 0) {
    return res.status(404).json({
      message: "There is no post uploaded yet.",
    });
  }

  res.status(200).json({
    message: "posts fetched successfully.",
    posts,
  });
};

const getAllPostController = async (req, res) => {
  try {
    const user = req.user;

    const posts = await Promise.all(
      (await postModel
        .find()
        .populate("user")
        .lean())
        .map(async (post) => {
          const isLiked = await likeModel.findOne({
            user: user.username,
            post: post._id,
          });

          post.isLiked = !!isLiked;

          return post;
        }),
    );

    res.status(200).json({
      message: "posts fetched successfully",
      posts,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getPostDetailsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "post not found.",
      });
    }

    const isValidUser = post.user.toString() === userId;

    if (!isValidUser) {
      return res.status(403).json({
        message: "Forbidden Content",
      });
    }

    res.status(200).json({
      message: "Post fetched successfully.",
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const createLikeController = async (req, res) => {
  try {
    const postId = req.params.postId;
    const username = req.user.username;

    const isPostExists = await postModel.findOne({
      _id: postId,
    });

    if (!isPostExists) {
      return res.status(404).json({
        message: "Post don't exist! or not available anymore.",
      });
    }

    const isAlreadyLiked = await likeModel.findOne({
      post: postId,
      user: username,
    });

    if (isAlreadyLiked) {
      return res.status(200).json({
        message: "You have already liked this post.",
      });
    }

    const postsOwner = await userModel.findOne({
      _id: isPostExists.user,
    });

    if (!postsOwner) {
      return res.status(404).json({
        message:
          "Actual Owner of this post is not available anymore on this server.",
      });
    }

    const likedPost = await likeModel.create({
      post: postId,
      user: username,
    });

    res.status(201).json({
      message: `You liked post which id = ${isPostExists._id} of post's_owner:'${postsOwner.username}' user.`,
      likedPost: likedPost,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const createUnlikeController = async (req, res) => {
  try {
    const postId = req.params.postId;
    const username = req.user.username;

    const isPostExists = await postModel.findOne({
      _id: postId,
    });

    if (!isPostExists) {
      return res.status(404).json({
        message: "Post don't exist! or not available anymore.",
      });
    }

    const isAlreadyLiked = await likeModel.findOne({
      post: postId,
      user: username,
    });

    if (!isAlreadyLiked) {
      return res.status(200).json({
        message: "You have already unliked this post.",
      });
    }

    const postsOwner = await userModel.findOne({
      _id: isPostExists.user,
    });

    if (!postsOwner) {
      return res.status(404).json({
        message:
          "Actual Owner of this post is not available anymore on this server.",
      });
    }

    const unlikedPost = await likeModel.findOneAndDelete({
      _id: isAlreadyLiked._id,
    });

    res.status(201).json({
      message: `You unliked post which id = ${isPostExists._id} of post's_owner:'${postsOwner.username}' user.`,
      unlikedPost: unlikedPost,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  createLikeController,
  getAllPostController,
  createUnlikeController,
};
