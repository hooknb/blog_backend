import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient();
const secret = process.env.SECRET_KEY!;

router.post("/", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user.id }, secret, {
    expiresIn: "1h",
  });

  res.json({
    message: "User signed in successfully",
    token: token,
    userId: user.id,
  });
});

export default router;
