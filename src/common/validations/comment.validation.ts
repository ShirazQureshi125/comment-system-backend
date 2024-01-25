
import * as Yup from 'yup';
import { Post } from '../../modules/post/post.model';
import { Comment } from './../../modules/comment/comment.model';

const commentValidationSchema = Yup.object().shape({
  content: Yup.string().required().min(1).max(500),
  postId: Yup.string().required().test({
    name: 'post-exists',
    test: async function (postId: string | undefined) {
      if (!postId) {
        // If postId is not provided, it's handled by the 'required' validation
        return true;
      }

      // Check if the post with the given postId exists
      const post = await Post.findByPk(postId);

      return !!post; 
    },
    message: 'The specified post does not exist.',
  }),
  replyId: Yup.string().nullable().test({
    name: 'replyId-related-to-postId',
    test: async function (replyId: string | null | undefined, { parent }: Yup.TestContext) {
      const { postId } = parent as any; // Extract postId from the parent context

      if (!postId || !replyId) {
        // If postId or replyId is not provided, it's handled by other validations
        return true;
      }
      const existingPost = await Post.findByPk(postId);
      
      // Check if the replyId is related to the specified postId
      const relatedPost = await Comment.findByPk(replyId);
      if (!relatedPost || !relatedPost.postId || relatedPost.postId !== existingPost?.postId) {
        return false;
      }else{
        return true;
      }
      // return relatedPost?.postId === postId; // Return true if the replyId is related to the postId, false otherwise
    },
    message: 'Invalid Comment Id or Post Id! Comment does not exist or is not associated with the specified Post.',
  }),
});

export default commentValidationSchema;
