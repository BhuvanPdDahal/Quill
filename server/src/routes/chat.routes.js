import express from 'express';

import auth from '../middleware/authentication.js';
import { getChat, addChat } from '../controllers/chats.controller.js';

const router = express.Router();

router.get('/:id', auth, getChat);
router.post('/:id', auth, addChat);

export default router;