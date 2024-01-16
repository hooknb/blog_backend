import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  });

  res.json({ statusCode: 200, message: "User signed in successfully" });
});

export default router;
