import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    vehicleNumber: {
        type: String,
        required: [true, 'Vehicle number is required'],
        trim: true,
        uppercase: true
    },
    serviceType: {
        type: String,
        required: [true, 'Service type is required']
    },
    date: {
        type: String,
        required: [true, 'Service date is required']
    },
    time: {
        type: String,
        required: [true, 'Service time is required']
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Completed', 'Rejected'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;