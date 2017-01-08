import { Router } from 'express';
import renderHandler from './render';

const router = Router();

router.get('*', renderHandler);

export default router;
