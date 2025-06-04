import Request from '../models/requestsModel.js';

// @desc   Admin: create a new “hot-item” request
// @route  POST /api/admin/requests
// @access Private/Admin
export const createRequest = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    // req.user should be populated by your authMiddleware
    const newReq = new Request({
      title,
      description: description || '',
      createdBy: req.user.id,
    });

    const saved = await newReq.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error('createRequest error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc   Get all active “hot-item” requests (anyone: admin or public)
// @route  GET /api/admin/requests
// @access Public (or Private/Admin if you prefer)
export const getAllRequests = async (req, res) => {
  try {
    // Only fetch requests where isActive: true, newest first
    const list = await Request.find({ isActive: true }).sort({ createdAt: -1 });
    return res.json({ success: true, data: list });
  } catch (err) {
    console.error('getAllRequests error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// (Optional) to let Admin deactivate or delete a request:
export const deactivateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const reqToUpdate = await Request.findById(id);
    if (!reqToUpdate) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    reqToUpdate.isActive = false;
    await reqToUpdate.save();
    return res.json({ success: true, message: 'Request deactivated' });
  } catch (err) {
    console.error('deactivateRequest error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
