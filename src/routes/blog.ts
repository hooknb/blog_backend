import express from "express";
import { PrismaClient } from "@prisma/client";
import authenticateJWT from "../authorization";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET ALL BLOG POSTS
 * @return  { statusCode: statusCode, data: posts }
 */
router.get("/", async (req, res) => {
  try {
    const posts = await prisma.blog.findMany();
    res.json({ data: posts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch blog posts", error: error });
  }
});

/**
 * GET PARTICULAR BLOG POST WITH GIVEN ID
 * @param id  ID of particular authorId
 * @return  { statusCode: statusCode, data: posts }
 */
router.get("/:id", async (req, res) => {
  try {
    const authorId = req.params.id;
    const posts = await prisma.blog.findMany({
      where: {
        authorId: authorId,
      },
    });

    res.json({ data: posts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch blog posts", error: error });
  }
});

/**
 * CREATE A NEW BLOG POST
 * @param title  Title of the blog post
 * @param body  Body of the blog post
 * @param images  Images related to the blog post
 * @param authorId  ID of the author of the blog post
 * @return  { statusCode: statusCode, message: message }
 */
router.post("/", authenticateJWT, async (req, res) => {
  
  try {
    const createdPost = await prisma.blog.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        images: ,
        authorId: req.body.authorId,
      },
    });

    if (!createdPost) {
      res.status(500).json({ message: "Failed to create post" });
    } else {
      res.status(201).json({ message: "Post created successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error: error });
  }
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
router.patch("/:id", authenticateJWT, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await prisma.blog.findUnique({
      where: {
        id: postId,
      },
    });

    if (post) {
      await prisma.blog.update({
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
  } catch (error) {
    res.status(500).json({ message: "Failed to update post", error: error });
  }
});

/**
 * DELETE A BLOG POST
 * @param id  ID of the blog post to be deleted
 * @return  { statusCode: statusCode, message: message }
 */
router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedBlog = await prisma.blog.delete({
      where: {
        id: postId,
      },
    });

    res.json({
      message: "Post deleted successfully.",
      deletedBlog: deletedBlog,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error: error });
  }
});

export default router;
