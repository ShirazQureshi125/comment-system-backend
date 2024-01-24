import { Router } from "express";


const router = Router();
import { nestedReply } from "../controllers/nesties";

router.post("/nested-reply", nestedReply);


export default router;
