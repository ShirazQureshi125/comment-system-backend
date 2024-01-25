import { Router } from "express";

import {  getComment, postComment } from "./comment.controller";

const router = Router();

router.get("/comments", getComment);
router.post("/comments", postComment);

export default router;
