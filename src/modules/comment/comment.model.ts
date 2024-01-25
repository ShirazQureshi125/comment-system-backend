import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { CommentAttributes } from "../../common/interfaces/comment.interfaces";
import { Post } from "../post/post.model";

@Table({
  tableName: "comments",
})
export class Comment extends Model<CommentAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  commentId!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 500],
    },
  })
  content!: string;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    defaultValue: null,
  })
  replyId!: string | null;

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  postId!: string;


  @BelongsTo(() => Post, { foreignKey: "postId", as: "author" })
  author!: Post;
  
  @BelongsTo(() => Comment, { foreignKey: "replyId", as: "replier" })
  replier!: Comment;

  @HasMany(() => Comment, { foreignKey: "replyId", as: "replies" })
  replies!: Comment[];
}
