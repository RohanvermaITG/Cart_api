import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const createNewUser = new mongoose.Schema({
  UaseId: {
    type: String,
    default: uuidv4,
  },
  Name: {type : String},
  Email: {type : String},
  Phone: {type : String},
  Password: {type : String},
});
const userschma = mongoose.model("webUsers", createNewUser);
export default  userschma;
