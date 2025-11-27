import express from 'express';
import { upload } from '../config/cloudinary.js';
import { protectRoute, AdminOnly } from './../middleware/auth.js';

const router = express.Router();

// @route   POST /api/upload
// @desc    Upload vehicle image
// @access  Private/Admin
router.post('/', protectRoute, AdminOnly, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.json({
      success: true,
      imageUrl: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/upload/multiple
// @desc    Upload multiple vehicle images
// @access  Private/Admin
router.post('/multiple', protectRoute, AdminOnly, upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => ({
      url: file.path,
      publicId: file.filename
    }));

    res.json({
      success: true,
      images: imageUrls
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;