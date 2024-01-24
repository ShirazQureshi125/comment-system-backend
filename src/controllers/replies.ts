import { Reply } from "../models/replies";
import { RequestHandler } from "express";

export const commentReply: RequestHandler = async (req, res) => {
  try {
    const { content, commentId } = req.body;
    console.log(req.body);
    const comment = await Reply.create({ content, commentId });
    res
      .status(200)
      .json({ message: "sucessfully commented reply", comment: comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
