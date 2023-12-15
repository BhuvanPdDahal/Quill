import express from 'express';

import auth from '../middleware/authentication.js';
import { signup, login, searchUsers, sendRequest, unsendRequest, acceptRequest, unfriend } from '../controllers/users.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/search', auth, searchUsers);
router.post('/send-request/:id', auth, sendRequest);
router.post('/unsend-request/:id', auth, unsendRequest);
router.post('/accept-request/:id', auth, acceptRequest);
router.post('/unfriend/:id', auth, unfriend);

export default router;