import express from "express";
import fileUpload from "express-fileupload";
require("dotenv").config();

// Routes import
import blogRouter from "./routes/blog";
import authRouter from "./routes/auth";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Routes
app.use("/api/blog", blogRouter);
app.use("/api/auth", authRouter);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
