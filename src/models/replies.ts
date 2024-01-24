/* import { Table, Model, Column, DataType } from "sequelize-typescript";

// Define an interface for Reply attributes
interface ReplyAttributes {
  replyId?: string;
  content: string;
  commentId: number;
}

@Table({
  tableName: "replies",
})
export class Reply extends Model<ReplyAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  replyId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  commentId!: number;
}
 */

import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { Comment } from "./comments";
import { Nest } from "./nesties";
interface ReplyAttributes {
  replyId?: string;
  content: string;
  commentId: number;
}

@Table({
  tableName: "replies",
})
export class Reply extends Model<ReplyAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  replyId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  commentId!: number;

  @BelongsTo(() => Comment, { foreignKey: 'commentId', as: 'comment' })
  comment!: Comment;

  // Define association with Nest model
  @HasOne(() => Nest, { foreignKey: 'replyId', as: 'nestedReply' })
  nestedReply!: Nest;
}
