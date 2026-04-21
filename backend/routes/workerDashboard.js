const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

const router = express.Router();

const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  });
};

// Get worker dashboard stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    if (req.userRole !== 'worker') {
      return res.status(403).json({ message: 'Access denied. Worker role required.' });
    }

    const workerId = req.userId;

    // Get total bookings
    const totalBookings = await Booking.countDocuments({ worker: workerId });

    // Get completed bookings
    const completedBookings = await Booking.countDocuments({ 
      worker: workerId, 
      status: 'completed' 
    });

    // Calculate total earnings
    const completedBookingDocs = await Booking.find({ 
      worker: workerId, 
      status: 'completed' 
    });
    const totalEarnings = completedBookingDocs.reduce((sum, booking) => sum + booking.amount, 0);

    // Get pending bookings count
    const pendingBookings = await Booking.countDocuments({ 
      worker: workerId, 
      status: 'pending' 
    });

    // Get average rating
    const reviews = await Review.find({ worker: workerId });
    const averageRating = reviews.length > 0 
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : '0.0';

    res.json({
      totalJobs: totalBookings,
      completedJobs: completedBookings,
      earnings: totalEarnings,
      pendingRequests: pendingBookings,
      averageRating: parseFloat(averageRating),
      totalReviews: reviews.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get worker's bookings
router.get('/bookings', authenticateToken, async (req, res) => {
  try {
    if (req.userRole !== 'worker') {
      return res.status(403).json({ message: 'Access denied. Worker role required.' });
    }

    const workerId = req.userId;
    const { status } = req.query;

    const query = { worker: workerId };
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update booking status
router.put('/bookings/:id/status', authenticateToken, async (req, res) => {
  try {
    if (req.userRole !== 'worker') {
      return res.status(403).json({ message: 'Access denied. Worker role required.' });
    }

    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.worker.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied. Not your booking' });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: 'Booking status updated', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get worker's reviews
router.get('/reviews', authenticateToken, async (req, res) => {
  try {
    if (req.userRole !== 'worker') {
      return res.status(403).json({ message: 'Access denied. Worker role required.' });
    }

    const workerId = req.userId;

    const reviews = await Review.find({ worker: workerId })
      .populate('customer', 'name email')
      .populate('booking', 'service date')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get worker profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    if (req.userRole !== 'worker') {
      return res.status(403).json({ message: 'Access denied. Worker role required.' });
    }

    const worker = await User.findById(req.userId).select('-password');

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.json(worker);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update worker profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    console.log('Update profile request received');
    console.log('User ID:', req.userId);
    console.log('User Role:', req.userRole);
    console.log('Request body:', req.body);

    if (req.userRole !== 'worker') {
      console.log('Access denied: not a worker');
      return res.status(403).json({ message: 'Access denied. Worker role required.' });
    }

    const { skills, rate, availability, location, phone, bio, experience } = req.body;

    const worker = await User.findById(req.userId);

    if (!worker) {
      console.log('Worker not found');
      return res.status(404).json({ message: 'Worker not found' });
    }

    console.log('Worker found, updating profile');

    if (skills) worker.skills = skills;
    if (rate !== undefined) worker.rate = rate;
    if (availability) worker.availability = availability;
    if (location !== undefined) worker.location = location;
    if (phone !== undefined) worker.phone = phone;
    if (bio !== undefined) worker.bio = bio;
    if (experience !== undefined) worker.experience = experience;

    await worker.save();

    console.log('Profile updated successfully');
    res.json({ message: 'Profile updated successfully', worker });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all workers (public route)
router.get('/all', async (req, res) => {
  try {
    const workers = await User.find({ role: 'worker' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(workers);
  } catch (error) {
    console.error('Error fetching all workers:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single worker by ID (public route) - MUST be last to avoid conflicts
router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching worker with ID:', req.params.id);
    const worker = await User.findById(req.params.id)
      .select('-password');

    if (!worker) {
      console.log('Worker not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Worker not found' });
    }

    // Get reviews for this worker
    const reviews = await Review.find({ worker: req.params.id })
      .populate('customer', 'name')
      .sort({ createdAt: -1 });

    console.log('Worker found:', worker.name);
    res.json({ worker, reviews });
  } catch (error) {
    console.error('Error fetching worker:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
