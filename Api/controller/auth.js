import { compareString, hassString, jwtSignIn } from "../utils/index.js";
import Users from "../model/UserModel.js";

import { sendVerificationEmail } from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!(firstName || lastName || email || password)) {
    next("Provide Required Fields");
    return;
  }

  try {
    const validUser = await Users.findOne({ email });

    if (validUser) return res.status(201).json({      
      message: "User already Exist",
    });

    const hashedPassword = await hassString(password);

    const user = new Users({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: "Login Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      next("Please Provide User Credentials");
      return;
    }

    const user = await Users.findOne({ email }).populate({
      path: "friends",
      select: "firstNaem LastNaem location profileUrl password",
    });

    if (!user) {
      return  res.status(201).json({      
        message: "Invalid email or password",
      });
    }

    if (!user?.verified) {
      return  res.status(201).json({      
        message: "user email is not verified. check your email account and verify your email",
      });
    }

    const isMatch = await compareString(password, user.password);

    if (!isMatch) {
      next("Invalid email or password");
      return;
    }

    const token = jwtSignIn(user?._id);

    user.password = null

    res.status(201).json({
      success: true,
      message: "Login Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
