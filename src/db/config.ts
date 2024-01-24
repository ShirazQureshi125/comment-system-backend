import { Sequelize } from "sequelize-typescript";
import { User } from "../models/users";
import { Post } from "../models/posts";
import { Comment } from "../models/comments";

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