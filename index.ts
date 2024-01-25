import express from "express";
import userRoutes from "./src/modules/user/user.route";
import postRoutes from "./src/modules/post/post.route";
import commentRoutes from "./src/modules/comment/comment.route";
import connection from "./src/db/config";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the root of the application!");
});

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);


app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ message: err.message });
});

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
