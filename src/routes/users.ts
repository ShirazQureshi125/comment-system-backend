import { Router } from "express";

import {
  createUser,
  loginUser,
  getUser,
} from "../controllers/users";

const router = Router();

router.post('/user-register', createUser);
router.post('/login-user', loginUser);
router.get('/get-user', getUser);

export default router;