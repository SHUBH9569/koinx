import { Router } from 'express';
import { getStats } from '../controller/cryptoController.js';

const router = Router();

router.get('/stats', getStats);

export default router;