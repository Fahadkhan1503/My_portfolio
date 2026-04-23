import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET — public, frontend fetches this
router.get('/', getSettings);

// PUT — protected, only you can update
router.put('/', verifyToken, updateSettings);

export default router;