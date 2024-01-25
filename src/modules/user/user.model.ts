

import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Post } from "../post/post.model";
import { UserAttributes } from "../../common/interfaces/user.interfaces";

@Table({
  tableName: "users",
})
export class User extends Model<UserAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  userId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  userName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail: true,
    }
  })
  email!: string;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    validate:{
      is:/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      max:20,
      min:8,
    }
  })
  password!: string;

  // Define association with Post model
  @HasMany(() => Post, { foreignKey: 'userId', as: 'posts' })
  posts!: Post[];
}
