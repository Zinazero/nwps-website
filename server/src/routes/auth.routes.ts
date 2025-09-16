import { Router } from 'express';
import { register, login, checkAuth, logout } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', checkAuth);
router.post('/logout', logout);

export default router;
