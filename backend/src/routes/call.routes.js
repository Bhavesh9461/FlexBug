const express = require("express")
const identifyUser  = require("../middlewares/auth.middleware")
const router = express.Router();
const { createCall, updateCallStatus } = require("../controllers/call.controller");

router.post("/create", identifyUser, createCall);
router.put("/status", identifyUser, updateCallStatus);

module.exports = router;