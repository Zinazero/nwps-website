import { Router } from 'express';
import { checkAuth, login, logout, register } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', checkAuth);
router.post('/logout', logout);

export default router;
