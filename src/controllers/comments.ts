
import { Post } from "../models/posts";
import { Comment } from "./../models/comments";
import { RequestHandler } from "express";

export const postComment: RequestHandler = async (req, res) => {
  try {
    const { content, postId, replyId } = req.body;

  const existingPost = await Post.findByPk(postId);
  console.log(existingPost)
  if (!existingPost) {
    return res.status(400).json({ error: "Invalid Post Id! Post does not exist" });
  }
   
    if (replyId) {
      const existingComment = await Comment.findByPk(replyId);

      if (!existingComment || existingComment.postId !== existingPost.postId) {
        return res.status(400).json({
          error: "Invalid Comment Id or Post Id! Comment does not exist or is not associated with the specified Post",
        });
      }
    }

    // Create the comment
    const comment = await Comment.create({ content, postId, replyId });

    // Send the response
    res.status(200).json({ message: "Successfully commented", comment: comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const commentReply: RequestHandler = async (req, res) => {
  try {
    const { content,replyId, postId } = req.body;
    console.log(req.body);
    const comment = await Comment.create({ content, replyId, postId });
    res
      .status(200)
      .json({ message: "sucessfully commented reply", comment: comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Recursive function to get replies for a comment


// Recursive function to get replies for a comment
const getReplies = async (
  commentId: string,
  visited: Set<string> = new Set()
): Promise<any> => {
  if (visited.has(commentId)) {
    console.warn(`Skipping already visited commentId: ${commentId}`);
    return [];
  }

  console.log(`Fetching replies for commentId: ${commentId}`);
  visited.add(commentId);

  const replies = await Comment.findAll({
    where: {
      replyId: commentId,
    },
    include: [
      {
        model: Comment,
        as: 'replies',
        include: [
          
        ],
      },
    ],
  });

  // Recursively get replies for each reply
  const nestedReplies = await Promise.all(
    replies.map(async (reply) => {
      const childReplies = await getReplies(reply.commentId!, visited);
      return {
        ...reply.toJSON(),
        replies: childReplies,
      };
    })
  );

  console.log(`Fetched replies for commentId: ${commentId}`);
  return nestedReplies;
};


export const getComment: RequestHandler = async (req, res) => {
  try {
    const topLevelComments = await Comment.findAll({
      where: {
        replyId: null,
      },
    });

    // Fetch replies for each top-level comment using the recursive function
    const commentsWithReplies = await Promise.all(
      topLevelComments.map(async (comment) => {
        const replies = await getReplies(comment.commentId!);
        return {
          ...comment.toJSON(),
          replies,
        };
      })
    );

    res.json(commentsWithReplies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


 