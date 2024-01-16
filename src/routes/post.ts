import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  await prisma.post.create({
    data: {
      title: req.body.title,
      body: req.body.content,
      images: req.body.images,
      authorId: req.body.authorId,
    },
  });

  res.json({ statusCode: 201, message: "Post created successfully" });
});

export default router;
