import { Router } from "express";

import {  getComment, postComment } from "../controllers/comments";

const router = Router();

router.get("/comments", getComment);
router.post("/comments", postComment);

export default router;
