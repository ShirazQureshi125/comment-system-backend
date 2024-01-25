import { Comment } from "./comment.model";

class CommentService {
  async postComment(content: string, postId: string, replyId?: string) {
    try {
      const comment = await Comment.create({ content, postId, replyId });

      return { message: "Successfully commented", comment };
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }

  async getCommentsWithReplies() {
    try {
      const topLevelComments = await Comment.findAll({
        where: {
          replyId: null,
        },
      });

      const commentsWithReplies = await Promise.all(
        topLevelComments.map(async (comment) => {
          const replies = await this.getReplies(comment.commentId!);
          return {
            ...comment.toJSON(),
            replies,
          };
        })
      );

      return commentsWithReplies;
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }

  private async getReplies(
    commentId: string,
    visited: Set<string> = new Set()
  ): Promise<any> {
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
          as: "replies",
          include: [],
        },
      ],
    });

    const nestedReplies = await Promise.all(
      replies.map(async (reply) => {
        const childReplies = await this.getReplies(reply.commentId!, visited);
        return {
          ...reply.toJSON(),
          replies: childReplies,
        };
      })
    );

    console.log(`Fetched replies for commentId: ${commentId}`);
    return nestedReplies;
  }
}

export default new CommentService();
