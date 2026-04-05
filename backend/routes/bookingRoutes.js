import express from 'express';
import {
    createBooking,
    getBookings,
    getBookingById,
    updateBookingStatus,
    deleteBooking,
    getBookingStats
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(createBooking)
    .get(protect, getBookings);

router.get('/stats', protect, getBookingStats);

router.route('/:id')
    .get(getBookingById)
    .delete(protect, deleteBooking);

router.put('/:id/status', protect, updateBookingStatus);

export default router;