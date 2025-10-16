import mongoose from "mongoose";

const dbconnecter = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rohanverma_db_user:rohan%40itgeeks.comverma@era.b7sbfge.mongodb.net/"
      // {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // }
    );
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
  }
};

export default dbconnecter; 
