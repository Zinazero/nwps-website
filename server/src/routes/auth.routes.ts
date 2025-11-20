import { Router } from 'express';
import {
  checkAuth,
  login,
  logout,
  register,
  sendRegistrationInvite,
  validateRegistrationToken,
} from '../controllers/auth.controller';

const router = Router();

router.get('/check-auth', checkAuth);
router.get('/validate-registration-token', validateRegistrationToken);
router.post('/login', login);
router.post('/logout', logout);
router.post('/invite', sendRegistrationInvite);
router.post('/register', register);

export default router;
