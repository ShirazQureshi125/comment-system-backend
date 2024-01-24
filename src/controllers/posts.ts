import { User } from "./../models/users";
import { Comment } from "../models/comments";
import { RequestHandler } from "express";

import { Post } from "../models/posts";
import { Reply } from "../models/replies";
import { Nest } from "../models/nesties";

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
          as: "comments",
          attributes: ["content", "postId", "commentId"],
         /*  include: [
            {
              model: Reply,
              as: "replies",
              attributes: ["content", "replyId"],
              include: [
                {
                  model: Nest,
                  as: "nestedReply",
                  attributes: ["content", "replyId"],
                },
              ],
            },
          ], */
        },
      ],
    });
    // posts.forEach((post) => {
    //   console.log(typeof post.dataValues.comments.);
    // });
    // if (!posts || posts.length === 0) {
    //   console.log("No posts found.");
    // } else {
    //   // console.log("Retrieved comments:", posts);

    //   posts.forEach((post) => {
    //     console.log(post.dataValues);
    //   });
    // }
    // Assuming you have retrieved posts from the database
    /* if (!posts || posts.length === 0) {
  console.log("No posts found.");
} else {
  console.log("Retrieved posts:");

  const PostModel = posts[0].constructor as typeof Post;
  const attributes = PostModel.rawAttributes;

  posts.forEach((post) => {
    Object.keys(attributes).forEach((attributeName) => {
      const value = post.get(attributeName);
      const dataType = attributes[attributeName].type;

      console.log(`${attributeName}: ${value} (${dataType})`);
    });

    console.log("------");
  });
} */

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
