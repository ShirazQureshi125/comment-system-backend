

import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Post } from "./posts";
interface UserAttributes {
  userId?: string;
  userName: string;
  email: string;
  password: string;
}
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
  })
  userName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  // Define association with Post model
  @HasMany(() => Post, { foreignKey: 'userId', as: 'posts' })
  posts!: Post[];
}
