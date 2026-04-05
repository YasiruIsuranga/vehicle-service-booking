import { useState, useEffect } from 'react';
import { getBookingStats, getAllBookings, updateBookingStatus, deleteBooking } from '../api/services';
import toast from 'react-hot-toast';
import {
    Calendar,
    CheckCircle,
    Clock,
    XCircle,
    TrendingUp,
    Search,
    Filter,
    Trash2,
    Eye,
} from 'lucide-react';

const DashboardPage = () => {
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        completed: 0,
        rejected: 0,
        today: 0,
    });
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: 'All',
        search: '',
        date: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, bookings]);

    const fetchData = async () => {
        try {
            const [statsRes, bookingsRes] = await Promise.all([
                getBookingStats(),
                getAllBookings(),
            ]);
            setStats(statsRes.data.data);
            setBookings(bookingsRes.data.data);
            setFilteredBookings(bookingsRes.data.data);
        } catch (error) {
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...bookings];

        // Filter by status
        if (filters.status !== 'All') {
            filtered = filtered.filter((b) => b.status === filters.status);
        }

        // Filter by search
        if (filters.search) {
            filtered = filtered.filter(
                (b) =>
                    b.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
                    b.vehicleNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
                    b.phone.includes(filters.search)
            );
        }

        // Filter by date
        if (filters.date) {
            filtered = filtered.filter((b) => b.date === filters.date);
        }

        setFilteredBookings(filtered);
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateBookingStatus(id, status);
            toast.success(`Booking ${status.toLowerCase()} successfully`);
            fetchData();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await deleteBooking(id);
                toast.success('Booking deleted successfully');
                fetchData();
            } catch (error) {
                toast.error('Failed to delete booking');
            }
        }
    };

    const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
        <div className={`${bgColor} rounded-xl p-6 shadow-lg hover:shadow-xl transition`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-800">{value}</p>
                </div>
                <div className={`${color} p-4 rounded-full`}>
                    <Icon className="w-8 h-8 text-white" />
                </div>
            </div>
        </div>
    );

    const StatusBadge = ({ status }) => {
        const styles = {
            Pending: 'bg-yellow-100 text-yellow-800',
            Approved: 'bg-blue-100 text-blue-800',
            Completed: 'bg-green-100 text-green-800',
            Rejected: 'bg-red-100 text-red-800',
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
                {status}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Manage your vehicle service bookings</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={Calendar}
                        title="Total Bookings"
                        value={stats.total}
                        color="bg-blue-600"
                        bgColor="bg-blue-50"
                    />
                    <StatCard
                        icon={Clock}
                        title="Pending"
                        value={stats.pending}
                        color="bg-yellow-600"
                        bgColor="bg-yellow-50"
                    />
                    <StatCard
                        icon={CheckCircle}
                        title="Completed"
                        value={stats.completed}
                        color="bg-green-600"
                        bgColor="bg-green-50"
                    />
                    <StatCard
                        icon={TrendingUp}
                        title="Today"
                        value={stats.today}
                        color="bg-purple-600"
                        bgColor="bg-purple-50"
                    />
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search by name, vehicle, phone..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Completed">Completed</option>
                            <option value="Rejected">Rejected</option>
                        </select>

                        {/* Date Filter */}
                        <input
                            type="date"
                            value={filters.date}
                            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Bookings Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">
                            All Bookings ({filteredBookings.length})
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vehicle
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Service
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                            No bookings found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBookings.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {booking.customerName}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{booking.phone}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-mono font-semibold text-gray-900">
                                                    {booking.vehicleNumber}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {booking.serviceType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{booking.date}</div>
                                                <div className="text-sm text-gray-500">{booking.time}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={booking.status} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex space-x-2">
                                                    {booking.status === 'Pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleStatusUpdate(booking._id, 'Approved')}
                                                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-xs"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusUpdate(booking._id, 'Rejected')}
                                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-xs"
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                    {booking.status === 'Approved' && (
                                                        <button
                                                            onClick={() => handleStatusUpdate(booking._id, 'Completed')}
                                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-xs"
                                                        >
                                                            Complete
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(booking._id)}
                                                        className="bg-gray-600 text-white p-1 rounded hover:bg-gray-700 transition"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;