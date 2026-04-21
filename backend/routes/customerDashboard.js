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

// Get customer dashboard stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    if (req.userRole !== 'customer') {
      return res.status(403).json({ message: 'Access denied. Customer role required.' });
    }

    const customerId = req.userId;

    // Get total bookings
    const totalBookings = await Booking.countDocuments({ customer: customerId });

    // Get completed bookings
    const completedBookings = await Booking.countDocuments({ 
      customer: customerId, 
      status: 'completed' 
    });

    // Get pending bookings
    const pendingBookings = await Booking.countDocuments({ 
      customer: customerId, 
      status: 'pending' 
    });

    // Get cancelled bookings
    const cancelledBookings = await Booking.countDocuments({ 
      customer: customerId, 
      status: 'cancelled' 
    });

    // Calculate total spent
    const completedBookingDocs = await Booking.find({ 
      customer: customerId, 
      status: 'completed' 
    });
    const totalSpent = completedBookingDocs.reduce((sum, booking) => sum + booking.amount, 0);

    res.json({
      totalBookings,
      completedBookings,
      pendingBookings,
      cancelledBookings,
      totalSpent
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get customer's bookings
router.get('/bookings', authenticateToken, async (req, res) => {
  try {
    if (req.userRole !== 'customer') {
      return res.status(403).json({ message: 'Access denied. Customer role required.' });
    }

    const customerId = req.userId;
    const { status } = req.query;

    const query = { customer: customerId };
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('worker', 'name email skills rate location')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get customer profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    console.log('GET /profile request received');
    console.log('User ID:', req.userId);
    console.log('User Role:', req.userRole);

    if (req.userRole !== 'customer') {
      console.log('Access denied: not a customer');
      return res.status(403).json({ message: 'Access denied. Customer role required.' });
    }

    const customer = await User.findById(req.userId).select('-password');

    if (!customer) {
      console.log('Customer not found');
      return res.status(404).json({ message: 'Customer not found' });
    }

    console.log('Customer found:', customer.name);
    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update customer profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    if (req.userRole !== 'customer') {
      return res.status(403).json({ message: 'Access denied. Customer role required.' });
    }

    const { phone, location, bio } = req.body;

    const customer = await User.findById(req.userId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    if (phone !== undefined) customer.phone = phone;
    if (location !== undefined) customer.location = location;
    if (bio !== undefined) customer.bio = bio;

    await customer.save();

    res.json({ message: 'Profile updated successfully', customer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new booking
router.post('/bookings', authenticateToken, async (req, res) => {
  try {
    if (req.userRole !== 'customer') {
      return res.status(403).json({ message: 'Access denied. Customer role required.' });
    }

    const { workerId, service, date, time, location, amount, notes } = req.body;

    const worker = await User.findById(workerId);
    if (!worker || worker.role !== 'worker') {
      return res.status(404).json({ message: 'Worker not found' });
    }

    const booking = new Booking({
      customer: req.userId,
      worker: workerId,
      service,
      date: new Date(date),
      time,
      location,
      status: 'pending',
      amount,
      notes
    });

    await booking.save();

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel a booking
router.put('/bookings/:id/cancel', authenticateToken, async (req, res) => {
  try {
    if (req.userRole !== 'customer') {
      return res.status(403).json({ message: 'Access denied. Customer role required.' });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.customer.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied. Not your booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a review for a completed booking
router.post('/reviews', authenticateToken, async (req, res) => {
  try {
    console.log('Review submission received');
    console.log('User ID:', req.userId);
    console.log('User Role:', req.userRole);
    console.log('Request body:', req.body);

    if (req.userRole !== 'customer') {
      console.log('Access denied: not a customer');
      return res.status(403).json({ message: 'Access denied. Customer role required.' });
    }

    const { bookingId, rating, comment } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      console.log('Booking not found:', bookingId);
      return res.status(404).json({ message: 'Booking not found' });
    }

    console.log('Booking found:', booking._id, 'Worker:', booking.worker);

    if (booking.customer.toString() !== req.userId) {
      console.log('Access denied: not your booking');
      return res.status(403).json({ message: 'Access denied. Not your booking' });
    }

    if (booking.status !== 'completed') {
      console.log('Booking not completed, status:', booking.status);
      return res.status(400).json({ message: 'Can only review completed bookings' });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      console.log('Review already exists for this booking');
      return res.status(400).json({ message: 'Review already exists for this booking' });
    }

    const review = new Review({
      worker: booking.worker,
      customer: req.userId,
      booking: bookingId,
      rating,
      comment
    });

    await review.save();

    console.log('Review saved successfully for worker:', booking.worker);
    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
