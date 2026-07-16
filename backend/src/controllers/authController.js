import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import {
  registerValidator,
  loginValidator,
  
} from "../validators/authValidator.js";

export const register = async (req, res) => {
  try {
    const validatedData = registerValidator(req);

    const existingUser = await User.findOne({
      email: validatedData.email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create(validatedData);

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const validatedData = loginValidator(req);

    const user = await User.findOne({
      email: validatedData.email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(
      validatedData.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const logout = async (
  req,
  res
) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
export const uploadProfileImage =
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "No image uploaded",
        });
      }

      req.user.profileImage =
        `/uploads/profile-images/${req.file.filename}`;

      await req.user.save();

      return res.status(200).json({
        success: true,
        message:
          "Profile image uploaded successfully",
        data:
          req.user.profileImage,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };
  