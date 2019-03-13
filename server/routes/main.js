import express from 'express';
import mainCtrl from '../controllers/main';

const router = express.Router();

router.get('*', mainCtrl.main);

export default router;
