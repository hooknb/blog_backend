import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    res
      .status(201)
      .json({ message: "User signed up successfully", userId: user.id });
  } catch (error) {
    res.status(500).json({ message: "Error signing up user" });
  }
});

export default router;
