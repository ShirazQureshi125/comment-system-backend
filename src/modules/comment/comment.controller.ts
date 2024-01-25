import { RequestHandler } from "express";
import commentService from "./comment.service";
import commentValidationSchema from "../../common/validations/comment.validation";

export const postComment: RequestHandler = async (req, res) => {
  try {
    const { content, postId, replyId } = req.body;
    await commentValidationSchema.validate({ content, postId, replyId });
    const result = await commentService.postComment(content, postId, replyId);

    res.status(200).json(result);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const validationErrors = error.errors.map((errorMessage: string) => ({ message: errorMessage }));
      res.status(400).json({ errors: validationErrors });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};



export const getComment: RequestHandler = async (req, res) => {
  try {
    const commentsWithReplies = await commentService.getCommentsWithReplies();

    res.json(commentsWithReplies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
