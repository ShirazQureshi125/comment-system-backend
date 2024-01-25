
import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "../user/user.model";
import { Comment } from "../comment/comment.model";
import { PostAttributes } from "../../common/interfaces/post.interfaces";

@Table({
  tableName: "posts",
})
export class Post extends Model<PostAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  postId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255], 
    },
  })
  title!: string;

  @Column({
    type: DataType.TEXT, 
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 500],
    }
  })
  content!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @BelongsTo(() => User, { foreignKey: 'userId', as: 'user' })
  user!: User;

  // Define association with Comment model
  @HasMany(() => Comment, { foreignKey: 'postId', as: 'replies' })
  replies!: Comment[];
}
