import { Sequelize } from "sequelize-typescript";
import { User } from "../modules/user/user.model";
import { Post } from "../modules/post/post.model";
import { Comment } from "../modules/comment/comment.model";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "testing",
  logging: false,
  models: [User, Post, Comment],
});


export default connection;