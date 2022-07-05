const { createTransport } = require("nodemailer");
const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();

const accountSid = process.env.ACCESOSID;
const authToken = process.env.ACCESOTOKEN;

const client = twilio(accountSid, authToken);

//===========EMAIL========================
const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.TEST_MAIL,
    pass: process.env.PASS_MAIL,
  },
});

module.exports = { client, transporter };
