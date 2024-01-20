import express from "express";
import fileUpload from "express-fileupload";
require("dotenv").config();

// Routes import
import signupRouter from "./routes/signup";
import blogRouter from "./routes/blog";
import signinRouter from "./routes/signin";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Routes
app.use("/api/signup", signupRouter);
app.use("/api/blog", blogRouter);
app.use("/api/signin", signinRouter);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
