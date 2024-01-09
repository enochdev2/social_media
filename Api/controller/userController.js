import mongoose from "mongoose";
import verification from "../model/emailVerification.js";
import Users from "../model/UserModel.js";
import { compareString } from "../utils/index.js";

export const verifyEmail = async (req, res) => {
  const { userId, token } = req.params;

  try {
    const result = await verification.findOne({ userId });
    if (result) {
      const { expiresAt, token: hashedToken } = result;

      if (expiresAt < Date.now()) {
        verification
          .findOneAndDelete({ userId })
          .then(() => {
            Users.findOneAndDelete({ _id: userId });
          })
          .then(() => {
            const message = "verification token has expired";
            res.redirect(`/users/verified?status=error&message=${message}`);
          })
          .catch((err) => {
            res.redirect(`/users/verified?status=error&message=`);
          });
      } else {
        compareString(token, hashedToken)
          .then((isMatch) => {
            if (isMatch) {
              Users.findOneAndUpdate({ _id: userId }, { verified: true })
                .then(() => {
                  verification.findOneAndDelete({ userId }).then(() => {
                    const message = "Email verified successfully";
                    res.redirect(
                      `users/verified?status=success&message=${message}`
                    );
                  });
                })
                .catch((error) => {
                  console.log(error);
                  const message = "verification failed or link is invalid";
                  res.redirect(
                    `/users/verified?status=error&message=${message}`
                  );
                });
            } else {
              const message = "verification failed or link is invalid";
              res.redirect(`/users/verified?status=error&message=${message}`);
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(404).json({ message: error.message });
          });
      }
    } else {
      const message = "Invalid verification link try again later.";
      res.redirect(`/users/verified?status=error&message=${message}`);
    }
  } catch (error) {
    console.log(error);
    res.redirect(`/users/verified?message=`)
  }
};
