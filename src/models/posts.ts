/* import { Table, Model, Column, DataType } from "sequelize-typescript";
import { User } from "./users";
import connection from "../db/config";
interface PostAttributes {
  postId?:string;
  title:string;
  content:string;
  userId:string;
}
@Table({
  //   timestamps: false,
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
  })
  title!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;
}
 */






import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./users";
import { Comment } from "./comments";
interface PostAttributes {
  postId?:string;
  title:string;
  content:string;
  userId:string;
}
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
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
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
  @HasMany(() => Comment, { foreignKey: 'postId', as: 'comments' })
  comments!: Comment[];
}
