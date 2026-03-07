const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const { sendEmailOtp } = require("../utils/emailService");
const otpModel = require("../models/otp.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const registerController = async (req, res) => {
  try {
    const { fullname, username, email, bio, password, profileImage } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        message: "Username, email and password are required.",
      });
    }

    const isUserExists = await userModel
      .findOne({
        $or: [{ email: email }, { username: username }],
      })
      .select("+otp");

    if (isUserExists) {
      return res.status(409).json({
        message:
          "user already exists" +
          (isUserExists.email === email ? "-email exists" : "-username exists"),
      });
    }

    if (isUserExists && !isUserExists.otp) {
      return res.status(409).json({
        message: "User already exists and verified.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    const existingOtp = await otpModel.findOne({ email });
    if (existingOtp) {
      if (existingOtp.expiresAt > new Date()) {
        return res.status(400).json({
          message: "OTP already sent. Please wait until it expires.",
        });
      } else {
        existingOtp.code = otp;
        existingOtp.expiresAt = expiresAt;
        existingOtp.fullname = fullname;
        existingOtp.username = username;
        existingOtp.password = hashedPassword;
        existingOtp.bio = bio;
        existingOtp.profileImage = profileImage;
        await existingOtp.save();
      }
    } else {
      await otpModel.create({
        email,
        username,
        fullname,
        password: hashedPassword,
        bio,
        profileImage,
        code: otp,
        expiresAt,
      });
    }

    await sendEmailOtp(email, otp);

    res.status(200).json({ message: "OTP sent successfully", email });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Validate input
    if ((!email && !username) || !password) {
      return res.status(400).json({
        message: "Email/Username and password are required.",
      });
    }

    const user = await userModel
      .findOne({
        $or: [email ? { email } : null, username ? { username } : null].filter(
          Boolean,
        ),
      })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        message: "user do not exist.",
      });
    }

    const isPassMatch = await bcrypt.compare(password, user.password);

    if (!isPassMatch) {
      return res.status(401).json({
        message: "Invalid Password.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "user loggedIn successful.",
      user: {
        userId: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "Logged out successfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getMeController = async (req, res) => {
  const userId = req.user.id;

  const user = await userModel.findById(userId);

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
};

const userUpdateController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, bio } = req.body;

    // 1️⃣ Check username uniqueness (exclude current user)
    if (username) {
      const isUserExists = await userModel.findOne({
        username,
        _id: { $ne: userId },
      });

      if (isUserExists) {
        return res.status(409).json({
          message: "Username already taken. Try another.",
        });
      }
    }

    // 2️⃣ Prepare update object
    const updateData = {};

    if (username) updateData.username = username;
    if (typeof bio !== "undefined") {
      updateData.bio = bio;
    }

    // 3️⃣ Upload image ONLY if provided
    if (req.file) {
      const uploadedFile = await imagekit.files.upload({
        file: req.file.buffer.toString("base64"),
        fileName: req.file.originalname,
        folder: "cohort-2-insta-clone-users",
      });

      updateData.profileImage = uploadedFile.url;
    }

    // 4️⃣ Update user
    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 5️⃣ Send clean response
    res.status(200).json({
      message: "Profile updated successfully.",
      updateUser: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        bio: updatedUser.bio,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong while updating profile.",
    });
  }
};

const sendOtpController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required." });

    let user = await userModel.findOne({ email });

    // If user doesn't exist, create new user (signup via OTP)
    if (!user) {
      user = await userModel.create({ email, username: email.split("@")[0] });
    }

    // Generate OTP and expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    user.otp = { code: otp, expiresAt };
    await user.save();

    // Send OTP via email/SMS (implement your email/SMS service here)
    console.log(`OTP for ${email}: ${otp}`);

    res.status(200).json({ message: "OTP sent successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const verifyOtpController = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const otpRecord = await otpModel.findOne({ email });

    if (!otpRecord || otpRecord.code !== code) {
      return res.status(400).json({ message: "Invalid OTP.", success: false });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired." });
    }

    // create user after OTP verified
    const user = await userModel.create({
      fullname: otpRecord.fullname,
      username: otpRecord.username,
      email: otpRecord.email,
      password: otpRecord.password, // already hashed
      bio: otpRecord.bio,
      profileImage: otpRecord.profileImage,
    });

    // delete temp OTP
    await otpModel.deleteOne({ email });

    // generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({
      message: "User verified and created successfully",
      success: true,
      user: {
        userId: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsersController = async (req, res) =>{
  try{
    const users = await userModel.find({
      _id: {$ne: req.user.id}
    })

    return res.status(200).json({
      message: "All users fetched successfully.",
      users
    })
  }
  catch(err){
    return res.status(500).json({
      message: err.message
    })
  }
}

module.exports = {
  registerController,
  loginController,
  getMeController,
  userUpdateController,
  logoutController,
  verifyOtpController,
  getAllUsersController
};
