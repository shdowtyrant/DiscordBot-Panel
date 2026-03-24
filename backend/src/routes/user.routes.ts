import { Router } from 'express';
import { getMe, getMyServers } from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Seluruh endpoint users memerlukan Auth JWT valid
router.use(protect);

router.get('/me', getMe);
router.get('/servers', getMyServers);

export default router;
