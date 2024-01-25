import { RequestHandler } from "express";
import userService from "./user.service";
import userValidationSchema from "../../common/validations/user.validation";

export const createUser: RequestHandler = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    await userValidationSchema.validate({ userName, email, password });
    const result = await userService.createUser(userName, email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    await userValidationSchema.validate({  email, password });
    const result = await userService.loginUser(email, password);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    const users = await userService.getAllUsersWithPostsAndComments();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
