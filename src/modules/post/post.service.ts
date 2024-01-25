import { User } from "../user/user.model";
import { Comment } from "../comment/comment.model";
import { Post } from "./post.model";

class PostService {
  async createPost(title: string, content: string, userId: string) {
    try {
      const post = await Post.create({ title, content, userId });
      return { message: "Post Created Successfully", post };
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }

  async getAllPosts() {
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
      return posts;
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }
}

export default new PostService();
