import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET ALL BLOG POSTS
 * @return  { statusCode: statusCode, data: posts }
 */
router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json({ statusCode: 200, data: posts });
});

/**
 * GET PARTICULAR BLOG POST WITH GIVEN ID
 * @param id  ID of particular authorId
 * @return  { statusCode: statusCode, data: posts }
 */
router.get("/:id", async (req, res) => {
  const authorId = req.params.id;
  const posts = await prisma.post.findMany({
    where: {
      authorId: authorId,
    },
  });

  res.json({ statusCode: 200, data: posts });
});

/**
 * CREATE A NEW BLOG POST
 * @param title  Title of the blog post
 * @param body  Body of the blog post
 * @param images  Images related to the blog post
 * @param authorId  ID of the author of the blog post
 * @return  { statusCode: statusCode, message: message }
 */
router.post("/", async (req, res) => {
  await prisma.post.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      images: req.body.images,
      authorId: req.body.authorId,
    },
  });

  res.json({ statusCode: 201, message: "Post created successfully" });
});

/**
 * UPDATE AN EXISTING BLOG POST
 * @param id  ID of the blog post to be updated
 * @param title  Updated title of the blog post
 * @param body  Updated body of the blog post
 * @param images  Updated images related to the blog post
 * @param authorId  Updated ID of the author of the blog post
 * @return  { statusCode: statusCode, message: message }
 */
router.patch("/:id", async (req, res) => {
  const postId = req.params.id;
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (post) {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: req.body.title,
        body: req.body.body,
        images: req.body.images,
        authorId: req.body.authorId,
      },
    });

    res.json({ statusCode: 200, message: "Post successfully updated." });
  } else {
    res.json({ statusCode: 404, message: "Post not found." });
  }
});

/**
 * DELETE A BLOG POST
 * @param id  ID of the blog post to be deleted
 * @return  { statusCode: statusCode, message: message }
 */
router.delete("/:id", async (req, res) => {
  const postId = req.params.id;
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  res.json({ statusCode: 200, message: "Post deleted successfully." });
});

export default router;
