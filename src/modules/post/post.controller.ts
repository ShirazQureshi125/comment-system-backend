import { RequestHandler } from "express";
import postService from "./post.service";
import postValidationSchema from "../../common/validations/post.validation";

export const createPost: RequestHandler = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    await postValidationSchema.validate({ title, content, userId    });
    const result = await postService.createPost(title, content, userId);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost: RequestHandler = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();

    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
