import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { hassString } from "./index.js";
import verification from "../model/emailVerification.js";

dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;

let transport = nodemailer.createTransport({
  host: "smtp.mail.outlook.com",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

export const sendVerificationEmail = async (user, res) => {
  const { _id, email, lastName } = user;

  const token = _id + uuidv4();

  const link = APP_URL + "users/verify/" + _id + "/" + token;

  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Email verification",
    html: `<div style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color:>
    <h1 style="color: rgb(8, 56, 188)"> Please verify your email address</h1> 
    <hr>
    <h4>Hi ${lastName},</h4>
    <p>
    Please verify your email address so we can know that it's really you.
    <br>
    <p>This link <b>expires in 1 hour </b></p>
    <br>
    <a href=${link} style="color: #fff: padding: 14px; text-decoration: none; background-color: #000>
    Email Address</a>
    </p>
    <div style="margin-top: 20px;">
    <h5>Best Regards</h5>
    <h5>ShareFun Team</h5>
    </div>
    </div>
     `,
  };

  try {
    const hashedToken = await hassString(token);
    // const hashedToken = await hashPassword(token)

    const newVerifiedEmail = await verification.create({
      userId: _id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    if (newVerifiedEmail) {
      transporter
        .sendMail(mailOptions)
        .then(() => {
          res.status(201).send({
            success: "PENDING",
            message:
              "verification email has been sent to your account. Check your email for further instructional.",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ message: "Something went wrong" });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};
