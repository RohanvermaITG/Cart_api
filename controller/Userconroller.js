import mongoose from "mongoose";
import userschma from "../model/usermodel.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res, next) => {
  const { Name, Email, Password, Phone } = req.body;

  const UserExintency = await userschma.findOne({ Email });

  try {
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

export const loginUser = async (req, res, next) => {

  // on login we have to add the logic of tokan in cookies
  try {
    const { Email, Password } = req.body;
    const UserExintency = await userschma.findOne({ Email });
    const isvalidpass = await bcrypt.compare(Password, UserExintency.Password);
    if (!UserExintency||!isvalidpass) return res.status(404).json({ msg: "Invalid Details" });

      return res.status(200).json({ msg: "Login successfully " });
  } catch (error) {
    next(error);
  }
};
