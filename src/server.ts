import express from "express";

// Routes import
import signupRouter from "./routes/signup";
import blogRouter from "./routes/blog";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/signup", signupRouter);
app.use("/api/blog", blogRouter);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
