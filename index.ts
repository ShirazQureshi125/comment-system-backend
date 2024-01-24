import express from "express";
import userRoutes from "./src/routes/users";
import postRoutes from "./src/routes/posts";
import commentRoutes from "./src/routes/comments";
import replyRoute from "./src/routes/replies";
import nestedReplyRoute from "./src/routes/nesties";
import connection from "./src/db/config";
// import { json, urlencoded } from "body-parser";
const app = express();

app.use(express.json());
// app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the root of the application!");
});

app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);
app.use("/api", replyRoute);
app.use("/api", nestedReplyRoute);

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
