import express from "express";
import dbconnecter from "./db.js";
import cartRouter from "./router/Cartrouter.js"; // <- note .js extension
import router from "./router/userrouter.js";
const server = express();
const PORT = 3001;

dbconnecter();
server.use(express.json());
server.use("/api", cartRouter);
server.use("/user", router)

server.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
