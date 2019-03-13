import express from 'express';
import { signup, signin, signout } from '../controllers/auth';

const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/signout', signout);

export default router;
