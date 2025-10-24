import express from "express";
import cors from "cors"; // CORS middleware
import dbconnecter from "./db.js";
import cartRouter from "./router/Cartrouter.js";
import userRouter from "./router/userrouter.js";
import cookieParser from "cookie-parser";

const server = express();
const PORT = 3001;

// Connect DB
dbconnecter();

// Middlewares
server.use(express.json());
server.use(cookieParser());

// Enable CORS for all routes (or you can restrict origin)
server.use(
  cors({
    origin: "http://localhost:5173", // React frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Mount routers correctly
server.use("/api", cartRouter); // All routes in cartRouter start with /api
server.use("/user", userRouter); // All routes in userRouter start with /user

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
