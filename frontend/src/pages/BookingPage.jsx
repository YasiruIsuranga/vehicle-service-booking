import { useState, useEffect } from 'react';
import { createBooking, getAllServices } from '../api/services';
import toast from 'react-hot-toast';
import { Calendar, Clock, User, Phone, Car, Wrench, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [bookingId, setBookingId] = useState('');

    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        vehicleNumber: '',
        serviceType: '',
        date: '',
        time: '',
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data } = await getAllServices();
            setServices(data.data);
        } catch (error) {
            toast.error('Failed to load services');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await createBooking(formData);
            setBookingId(data.data._id);
            setShowSuccess(true);
            toast.success('Booking created successfully!');

            // Reset form
            setFormData({
                customerName: '',
                phone: '',
                vehicleNumber: '',
                serviceType: '',
                date: '',
                time: '',
            });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Booking failed');
        } finally {
            setLoading(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
                    <div className="mb-6">
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-2">Your booking has been submitted successfully.</p>
                    <p className='text-gray-600 mb-2'>Please save this ID</p>

                    {/* Booking ID Display */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-600 mb-1">Your Booking ID:</p>
                        <p className="font-mono font-bold text-lg text-blue-600 break-all">
                            {bookingId}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            ⚠️ Save this ID to track your booking
                        </p>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">
                        Our team will contact you shortly to confirm your appointment.
                    </p>

                    <div className="space-y-3">
                        <Link
                            to="/track-booking"
                            className="block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition w-full"
                        >
                            Track This Booking
                        </Link>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="block bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition w-full"
                        >
                            Book Another Service
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Book Your Vehicle Service
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Schedule your vehicle maintenance with ease
                    </p>
                </div>

                {/* Booking Form */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Customer Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <User className="w-4 h-4 inline mr-2" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Phone className="w-4 h-4 inline mr-2" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="+1 234 567 8900"
                            />
                        </div>

                        {/* Vehicle Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Car className="w-4 h-4 inline mr-2" />
                                Vehicle Number
                            </label>
                            <input
                                type="text"
                                name="vehicleNumber"
                                value={formData.vehicleNumber}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition uppercase"
                                placeholder="ABC1234"
                            />
                        </div>

                        {/* Service Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Wrench className="w-4 h-4 inline mr-2" />
                                Service Type
                            </label>
                            <select
                                name="serviceType"
                                value={formData.serviceType}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            >
                                <option value="">Select a service</option>
                                {services.map((service) => (
                                    <option key={service._id} value={service.name}>
                                        {service.name} - {service.description}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date and Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-2" />
                                    Preferred Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Clock className="w-4 h-4 inline mr-2" />
                                    Preferred Time
                                </label>
                                <select
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                >
                                    <option value="">Select time</option>
                                    <option value="09:00 AM">09:00 AM</option>
                                    <option value="10:00 AM">10:00 AM</option>
                                    <option value="11:00 AM">11:00 AM</option>
                                    <option value="12:00 PM">12:00 PM</option>
                                    <option value="01:00 PM">01:00 PM</option>
                                    <option value="02:00 PM">02:00 PM</option>
                                    <option value="03:00 PM">03:00 PM</option>
                                    <option value="04:00 PM">04:00 PM</option>
                                    <option value="05:00 PM">05:00 PM</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Booking...' : 'Book Service'}
                        </button>
                    </form>
                </div>

                {/* Info Section */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">📌 Important Notes:</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li>• You will receive a confirmation call within 24 hours</li>
                        <li>• Please arrive 10 minutes before your scheduled time</li>
                        <li>• Bring your vehicle documents for verification</li>
                        <li>• Cancellations must be made at least 12 hours in advance</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;