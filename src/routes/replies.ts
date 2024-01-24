import { Router } from "express";

import { commentReply } from "../controllers/replies";

const router = Router();

router.post("/comment-reply", commentReply);


export default router;
