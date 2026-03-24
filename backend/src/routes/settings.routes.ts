import { Router } from 'express';
import { getServerSettings, updateServerSettings } from '../controllers/settings.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/:guildId', getServerSettings);
router.put('/:guildId', updateServerSettings);

export default router;
