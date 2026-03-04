const jwt = require("jsonwebtoken");

const identifyUser = (req, res, next) => {
  const token = req.cookies.token;

  // console.log(req.cookies.token);
  

  if (!token) {
    return res.status(401).json({
      message: "Invalid token or token required... Unautorized access.",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "user not authorized.",
    });
  }

  req.user = decoded

  next()

};

module.exports = identifyUser
