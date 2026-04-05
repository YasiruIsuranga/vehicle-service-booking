import { useState } from 'react';
import { getBookingById } from '../api/services';
import toast from 'react-hot-toast';
import { Search, CheckCircle, Clock, XCircle, Calendar, Phone, Car, Wrench } from 'lucide-react';

const TrackBookingPage = () => {
    const [bookingId, setBookingId] = useState('');
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!bookingId.trim()) {
            toast.error('Please enter a booking ID');
            return;
        }

        setLoading(true);
        setNotFound(false);
        setBooking(null);

        try {
            const { data } = await getBookingById(bookingId.trim());
            setBooking(data.data);
            toast.success('Booking found!');
        } catch (error) {
            setNotFound(true);
            toast.error('Booking not found. Please check your ID.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending':
                return <Clock className="w-12 h-12 text-yellow-500" />;
            case 'Approved':
                return <CheckCircle className="w-12 h-12 text-blue-500" />;
            case 'Completed':
                return <CheckCircle className="w-12 h-12 text-green-500" />;
            case 'Rejected':
                return <XCircle className="w-12 h-12 text-red-500" />;
            default:
                return <Clock className="w-12 h-12 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Approved':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'Completed':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'Rejected':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getStatusMessage = (status) => {
        switch (status) {
            case 'Pending':
                return 'Your booking is awaiting confirmation. We will contact you shortly.';
            case 'Approved':
                return 'Your booking has been confirmed! Please arrive on time.';
            case 'Completed':
                return 'Service completed. Thank you for choosing us!';
            case 'Rejected':
                return 'Unfortunately, we cannot process this booking. We will contact you.';
            default:
                return '';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Track Your Booking
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Enter your booking ID to check the status
                    </p>
                </div>

                {/* Search Form */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Booking ID
                            </label>
                            <div className="relative">
                                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={bookingId}
                                    onChange={(e) => setBookingId(e.target.value)}
                                    placeholder="Enter your booking ID (e.g., 507f1f77bcf86cd799439011)"
                                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg"
                                />
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                💡 You received this ID when you created your booking
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                    <span>Searching...</span>
                                </>
                            ) : (
                                <>
                                    <Search className="w-5 h-5" />
                                    <span>Track Booking</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Not Found Message */}
                {notFound && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Booking Not Found
                        </h3>
                        <p className="text-gray-600 mb-4">
                            We couldn't find a booking with ID: <span className="font-mono font-semibold">{bookingId}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            Please check your ID and try again, or contact our support team.
                        </p>
                    </div>
                )}

                {/* Booking Details */}
                {booking && (
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/* Status Header */}
                        <div className={`p-8 text-center border-b-4 ${getStatusColor(booking.status)}`}>
                            <div className="flex justify-center mb-4">
                                {getStatusIcon(booking.status)}
                            </div>
                            <h2 className="text-3xl font-bold mb-2">
                                Status: {booking.status}
                            </h2>
                            <p className="text-lg">
                                {getStatusMessage(booking.status)}
                            </p>
                        </div>

                        {/* Booking Details */}
                        <div className="p-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                Booking Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Booking ID */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                                    <p className="font-mono font-semibold text-gray-900 break-all">
                                        {booking._id}
                                    </p>
                                </div>

                                {/* Customer Name */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <Calendar className="w-4 h-4 text-gray-600" />
                                        <p className="text-sm text-gray-600">Customer Name</p>
                                    </div>
                                    <p className="font-semibold text-gray-900">
                                        {booking.customerName}
                                    </p>
                                </div>

                                {/* Phone */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <Phone className="w-4 h-4 text-gray-600" />
                                        <p className="text-sm text-gray-600">Phone Number</p>
                                    </div>
                                    <p className="font-semibold text-gray-900">
                                        {booking.phone}
                                    </p>
                                </div>

                                {/* Vehicle Number */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <Car className="w-4 h-4 text-gray-600" />
                                        <p className="text-sm text-gray-600">Vehicle Number</p>
                                    </div>
                                    <p className="font-mono font-bold text-lg text-gray-900">
                                        {booking.vehicleNumber}
                                    </p>
                                </div>

                                {/* Service Type */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <Wrench className="w-4 h-4 text-gray-600" />
                                        <p className="text-sm text-gray-600">Service Type</p>
                                    </div>
                                    <p className="font-semibold text-gray-900">
                                        {booking.serviceType}
                                    </p>
                                </div>

                                {/* Date */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <Calendar className="w-4 h-4 text-gray-600" />
                                        <p className="text-sm text-gray-600">Service Date</p>
                                    </div>
                                    <p className="font-semibold text-gray-900">
                                        {booking.date}
                                    </p>
                                </div>

                                {/* Time */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <Clock className="w-4 h-4 text-gray-600" />
                                        <p className="text-sm text-gray-600">Service Time</p>
                                    </div>
                                    <p className="font-semibold text-gray-900">
                                        {booking.time}
                                    </p>
                                </div>

                                {/* Created At */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">Booked On</p>
                                    <p className="font-semibold text-gray-900">
                                        {new Date(booking.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Timeline/Progress */}
                        <div className="bg-gray-50 p-8 border-t">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                Booking Progress
                            </h3>

                            <div className="flex items-center justify-between">
                                {/* Pending */}
                                <div className="flex flex-col items-center flex-1">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${booking.status === 'Pending' || booking.status === 'Approved' || booking.status === 'Completed'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-300 text-gray-600'
                                        }`}>
                                        1
                                    </div>
                                    <p className="text-sm text-center font-medium">Submitted</p>
                                </div>

                                <div className={`flex-1 h-1 ${booking.status === 'Approved' || booking.status === 'Completed'
                                        ? 'bg-blue-600'
                                        : 'bg-gray-300'
                                    }`}></div>

                                {/* Approved */}
                                <div className="flex flex-col items-center flex-1">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${booking.status === 'Approved' || booking.status === 'Completed'
                                            ? 'bg-blue-600 text-white'
                                            : booking.status === 'Rejected'
                                                ? 'bg-red-600 text-white'
                                                : 'bg-gray-300 text-gray-600'
                                        }`}>
                                        {booking.status === 'Rejected' ? '✕' : '2'}
                                    </div>
                                    <p className="text-sm text-center font-medium">
                                        {booking.status === 'Rejected' ? 'Rejected' : 'Confirmed'}
                                    </p>
                                </div>

                                <div className={`flex-1 h-1 ${booking.status === 'Completed'
                                        ? 'bg-green-600'
                                        : 'bg-gray-300'
                                    }`}></div>

                                {/* Completed */}
                                <div className="flex flex-col items-center flex-1">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${booking.status === 'Completed'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-300 text-gray-600'
                                        }`}>
                                        ✓
                                    </div>
                                    <p className="text-sm text-center font-medium">Completed</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-8 bg-white border-t">
                            <button
                                onClick={() => {
                                    setBooking(null);
                                    setBookingId('');
                                }}
                                className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
                            >
                                Track Another Booking
                            </button>
                        </div>
                    </div>
                )}

                {/* Help Section */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">📞 Need Help?</h3>
                    <p className="text-sm text-gray-700 mb-2">
                        If you have any questions about your booking, please contact us:
                    </p>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Phone: +1 234 567 8900</li>
                        <li>• Email: support@vehicleservice.com</li>
                        <li>• Working Hours: Monday - Friday, 8:00 AM - 6:00 PM</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TrackBookingPage;