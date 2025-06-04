// backend/routes/requestRoute.js
import express from 'express';
import authMiddleware from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';
import {
  createRequest,
  getAllRequests,
  deactivateRequest,
} from '../controllers/requestController.js';

const requestRouter = express.Router();

// Public GET /api/requests
requestRouter.get('/', getAllRequests);

// Admin POST /api/requests
requestRouter.post('/', authMiddleware, isAdmin, createRequest);

// Admin PUT /api/requests/:id/deactivate
requestRouter.put('/:id/deactivate', authMiddleware, isAdmin, deactivateRequest);

export default requestRouter;
