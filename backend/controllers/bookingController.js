import Booking from '../models/Booking.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res) => {
    try {
        const { customerName, phone, vehicleNumber, serviceType, date, time } = req.body;

        const booking = await Booking.create({
            customerName,
            phone,
            vehicleNumber,
            serviceType,
            date,
            time
        });

        res.status(201).json({
            success: true,
            data: booking,
            message: 'Booking created successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req, res) => {
    try {
        const { status, date, search } = req.query;
        let query = {};

        // Filter by status
        if (status && status !== 'All') {
            query.status = status;
        }

        // Filter by date
        if (date) {
            query.date = date;
        }

        // Search by customer name or vehicle number
        if (search) {
            query.$or = [
                { customerName: { $regex: search, $options: 'i' } },
                { vehicleNumber: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }

        const bookings = await Booking.find(query).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Public
export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private
export const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        booking.status = status;
        const updatedBooking = await booking.save();

        res.json({
            success: true,
            data: updatedBooking,
            message: `Booking ${status.toLowerCase()} successfully`
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        await booking.deleteOne();

        res.json({
            success: true,
            message: 'Booking deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get booking statistics
// @route   GET /api/bookings/stats
// @access  Private
export const getBookingStats = async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const pendingBookings = await Booking.countDocuments({ status: 'Pending' });
        const approvedBookings = await Booking.countDocuments({ status: 'Approved' });
        const completedBookings = await Booking.countDocuments({ status: 'Completed' });
        const rejectedBookings = await Booking.countDocuments({ status: 'Rejected' });

        // Get today's bookings
        const today = new Date().toISOString().split('T')[0];
        const todayBookings = await Booking.countDocuments({
            createdAt: {
                $gte: new Date(today),
                $lt: new Date(new Date(today).getTime() + 24 * 60 * 60 * 1000)
            }
        });

        res.json({
            success: true,
            data: {
                total: totalBookings,
                pending: pendingBookings,
                approved: approvedBookings,
                completed: completedBookings,
                rejected: rejectedBookings,
                today: todayBookings
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};