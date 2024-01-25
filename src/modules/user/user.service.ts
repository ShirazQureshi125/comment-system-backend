import { User } from "./user.model";
import { Post } from "../post/post.model";
import { Comment } from "../comment/comment.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  async createUser(userName: string, email: string, password: string) {
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("User already exists with this email");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
      });

      return { message: "User registered successfully", user: newUser };
    } catch (error:any) {
      console.error("Error creating user:", error.message);
      throw new Error("Internal Server Error");
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error("User not found");
      } else {
        const matchPassword = await bcrypt.compare(password, user.password);

        if (matchPassword) {
          const token = jwt.sign({ userId: user.id }, "HMAC-SHA1");
          return { email: user.email, token, user };
        } else {
          throw new Error("Invalid password");
        }
      }
    } catch (error:any) {
      console.error("Error during password comparison:", error.message);
      throw new Error("Internal Server Error");
    }
  }

  async getAllUsersWithPostsAndComments() {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Post,
            as: "posts",
            attributes: ["title", "content"],
            include: [
              {
                model: Comment,
                as: "comments",
              },
            ],
          },
        ],
      });
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new UserService();
