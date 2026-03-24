import { Router } from 'express';
import { getGlobalLogs, getGuildLogs } from '../controllers/logs.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
router.use(protect);

router.get('/global', getGlobalLogs);
router.get('/:guildId', getGuildLogs);

export default router;
