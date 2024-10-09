import { Router } from 'express';
import { getDeviation } from '../controller/deviationController.js';

const router = Router();

router.get('/deviation', getDeviation);

export default router;