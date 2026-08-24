import { Router } from 'express';
import { handleSummarize } from '../controllers/summarizeController.js';

const router = Router();

router.post('/', handleSummarize);

export default router;
