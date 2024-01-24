/* import { Table, Model, Column, DataType } from "sequelize-typescript";

// Define an interface for Comment attributes
interface CommentAttributes {
  commentId?: string;
  content: string;
  replyId?: string | null;
  postId: string;
}

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
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    defaultValue: null,
  })
  replyId!: string | null ;  

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  postId!: string;
} */

import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";

// Define an interface for Comment attributes
interface CommentAttributes {
  commentId?: string;
  content: string;
  replyId?: string | null;
  postId: string;
}

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
    type: DataType.STRING,
    allowNull: false,
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

  @BelongsTo(() => Comment, { foreignKey: 'replyId', as: 'replier' })
  replier!: Comment;

  @HasMany(() => Comment, { foreignKey: 'replyId', as: 'replies' })
  replies!: Comment[];
}
