import { Nest } from '../models/nesties';
import { RequestHandler } from "express";

export const nestedReply: RequestHandler = async (req, res) => {
  try {
    const { content, replyId } = req.body;
    console.log(req.body);
    const reply = await Nest.create({ content, replyId });
    res
      .status(200)
      .json({ message: "sucessfully replied", comment: reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
