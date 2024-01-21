import express from "express";
import { PrismaClient } from "@prisma/client";
import authenticateJWT from "../authorization";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * Function to get user profile
 */
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found." });
    }

    res.json({ user: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to get user profile.", error: error });
  }
});

/**
 * Function to update user profile
 */
router.patch("/:id", authenticateJWT, async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found." });
    }

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update user profile.", error: error });
  }
});
