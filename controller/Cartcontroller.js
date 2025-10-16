import cartmodule from "../model/cartmodel.js";
import mongoose from "mongoose";

export const getCartItems = async (req, res) => {
  try {
    const items = await Cart.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const addcartiitems = async (req, res, next) => {
  console.log("addcartitems", req.body);

  try {
    const newCart = await cartmodule.create(req.body);

    await newCart.save();
    res.status(200).json({ message: "Data saved successfully", data: newCart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error saving data", error: error.message });
  }
};
export const removeProductFromCart = async (req, res, next) => {
  try {
    const deletedItem = await cartmodule.findByIdAndDelete(req.body._id);
  

    if (!deletedItem) {
      return res.status(404).json({ msg: "product not found" });
    }

    return res
      .status(200)
      .json({ msg: "product delete successfully", deletedItem: deletedItem });
  } catch (error) {
    next(error);
  }
};
