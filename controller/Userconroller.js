import mongoose from "mongoose";
import userschma from "../model/usermodel.js";
import bcrypt from "bcryptjs";
// jwt tokaen to store in localstoreage or cookies
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const jwtToken = process.env.JWT_S;

// to register new user or sign in
export const registerUser = async (req, res, next) => {
  try {
    const { Name, Email, Password, Phone } = await req.body;

    const UserExintency = await userschma.findOne({ Email });
    if (UserExintency) {
      return res.status(400).json({ msg: "User alrady Exist" });
    }
    const hashpass = await bcrypt.hash(Password, 10);

    const newUser = await (
      await userschma.create({ Name, Email, Password: hashpass, Phone })
    ).save();

    res.status(200).json({ msg: "user create sucessfully", newUser });
  } catch (error) {
    next(error);
  }
};
// delete user from database
export const deleteUserByEmail = async (req, res, next) => {
  try {
    const deleteUser = await userschma.findByIdAndDelete(req.body._id);
    if (!deleteUser) {
      return res.status(404).json({ msg: "User Dons not Exist" });
    }
    res.status(200).json({ msg: "User Delete Success fully", deleteUser });
  } catch (error) {
    next(error);
  }
};
// login user
export const loginUser = async (req, res, next) => {
  // on login we have to add the logic of tokan in cookies
  try {
    const { Email, Password } = req.body; // get email and password for request body
    const UserExintency = await userschma.findOne({ Email }); // check is their any email is exist in the database
    const isvalidpass = await bcrypt.compare(Password, UserExintency.Password); // check the password user enterd and stored in database is same or not
    if (!UserExintency || !isvalidpass)
      // if any one of them is false then the server can cencle the login process
      return res.status(404).json({ msg: "Invalid Details" });
    // set tokan in cookies
    // const token = jwt.sign(
    //   { id: UserExintency._id, Email: UserExintency.Email },
    //   { expiresIn: "1d" },
    //   jwtToken
    // );
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    res.cookie("token", token);
    return res.status(200).json({ msg: "Login successfully " });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    // ✅ Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // set true if using https in production
      sameSite: "strict",
    });

    return res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
