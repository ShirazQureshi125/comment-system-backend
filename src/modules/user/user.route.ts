import { Router } from "express";

import {
  createUser,
  loginUser,
  getUser,
} from "./user.controller";

const router = Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/users', getUser);

export default router;