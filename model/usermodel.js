import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const createNewUser = new mongoose.Schema({
  UaseId: {
    type: String,
    default: uuidv4,
  },
  Name: String,
  Email: String,
  Phone: Number,
  Password: String,
});
const userschma = mongoose.model("webUsers", createNewUser);
export default  userschma;
