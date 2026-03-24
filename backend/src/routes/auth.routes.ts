import { Router } from 'express';
import { login, callback, logout } from '../controllers/auth.controller';

const router = Router();

router.get('/login', login);
router.get('/callback', callback);
router.post('/logout', logout);

export default router;
