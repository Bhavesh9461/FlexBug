// const twilio = require("twilio");
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// const sendSmsOtp = async (to, otp) => {
//   await client.messages.create({
//     body: `Your OTP is ${otp}. It will expire in 5 minutes.`,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to,
//   });
// };

// module.exports = { sendSmsOtp };