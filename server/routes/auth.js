import express from 'express';
import { login } from '../controller/authController.js'

const router = express.Router();

router.post('/login', login);
router.post('/verify', authMiddleWare);

export default router;