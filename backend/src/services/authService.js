import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUserService = async ({
  username,
  email,
  password,
}) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const token = generateToken({
    id: user._id,
  });

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      themePreference: user.themePreference,
    },
    token,
  };
};

export const loginUserService = async ({
  email,
  password,
}) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatched =
    await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    id: user._id,
  });

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      themePreference: user.themePreference,
    },
    token,
  };
};