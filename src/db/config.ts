import { Sequelize } from "sequelize-typescript";
import { User } from "../models/users";
import { Post } from "../models/posts";
import { Comment } from "../models/comments";
import { Reply } from "../models/replies";
import { Nest } from "../models/nesties";
const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "testing",
  logging: false,
  models: [User, Post, Comment],
});

// User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
// Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });


// Post.hasMany(Comment,{ foreignKey: 'postId', as:'comments'})
// Comment.belongsTo(Post, { foreignKey: 'postId', as:'author'});

// Comment.hasMany(Comment,{foreignKey:'replyId', as:'replies'})
// Comment.belongsTo(Comment, { foreignKey:'replyId', as:'replier'});

export default connection;