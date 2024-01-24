import { User } from "./../models/users";
import { Comment } from "../models/comments";
import { RequestHandler } from "express";

import { Post } from "../models/posts";


export const createPost: RequestHandler = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const post = await Post.create({ title, content, userId });
    res.status(200).json({ message: "Post Created Successfully", post: post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getPost: RequestHandler = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["userId", "userName"],
        },
        {
          model: Comment,
          as: "replies",
          attributes: ["content", "postId", "commentId"],
       
        },
      ],
    });
  
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
