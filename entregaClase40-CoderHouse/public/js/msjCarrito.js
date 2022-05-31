const { createTransport } = require("nodemailer");
const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();

const TEST_MAIL = "jmanuelgarciaa.7@gmail.com";

const accountSid = process.env.ACCESOSID;
const authToken = process.env.ACCESOTOKEN;

const client = twilio(accountSid, authToken);

//===========EMAIL========================
const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "jmanuelgarciaa.7@gmail.com",
    pass: "quscuxxzaqfyszzd",
  },
});

module.exports = { client, transporter };
