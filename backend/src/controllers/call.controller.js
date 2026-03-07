const Call = require("../models/call.model");

exports.createCall = async (req, res) => {
  try {
    const { receiverId } = req.body;

    const call = await Call.create({
      caller: req.user.id,
      receiver: receiverId,
    });

    res.status(201).json(call);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCallStatus = async (req, res) => {
  try {
    const { callId, status } = req.body;

    const call = await Call.findByIdAndUpdate(callId, { status }, { new: true });

    res.json(call);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};