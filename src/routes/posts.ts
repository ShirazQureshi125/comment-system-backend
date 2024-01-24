import { Router } from "express";

import {
  createPost,
  getPost,
  
} from "../controllers/posts";

const router = Router();

router.get('/posts', getPost);
router.post('/posts', createPost);

export default router;