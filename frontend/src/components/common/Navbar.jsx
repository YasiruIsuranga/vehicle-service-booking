import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Car, LogOut, LayoutDashboard, Calendar, Search, Menu, X, Wrench } from 'lucide-react';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center space-x-2 flex-shrink-0"
                        onClick={closeMobileMenu}
                    >
                        <Car className="w-8 h-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-800 hidden sm:inline">
                            VehicleService
                        </span>
                        <span className="text-xl font-bold text-gray-800 sm:hidden">
                            VS
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/"
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${isActive('/')
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Calendar className="w-4 h-4" />
                                    <span>Book Service</span>
                                </Link>
                                <Link
                                    to="/track-booking"
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${isActive('/track-booking')
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Search className="w-4 h-4" />
                                    <span>Track Booking</span>
                                </Link>
                                <Link
                                    to="/admin/login"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Admin Login
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/admin/dashboard"
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${isActive('/admin/dashboard')
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span>Dashboard</span>
                                </Link>
                                <Link
                                    to="/admin/services"
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${isActive('/admin/services')
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Wrench className="w-4 h-4" />
                                    <span>Services</span>
                                </Link>
                                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                                    <span className="text-sm text-gray-600">
                                        <span className="font-semibold">{user?.username}</span>
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/"
                                    onClick={closeMobileMenu}
                                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition ${isActive('/')
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Calendar className="w-5 h-5" />
                                    <span className="font-medium">Book Service</span>
                                </Link>
                                <Link
                                    to="/track-booking"
                                    onClick={closeMobileMenu}
                                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition ${isActive('/track-booking')
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Search className="w-5 h-5" />
                                    <span className="font-medium">Track Booking</span>
                                </Link>
                                <Link
                                    to="/admin/login"
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-center space-x-2 mx-4 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                                >
                                    <span>Admin Login</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="px-4 py-2 border-b border-gray-200">
                                    <p className="text-sm text-gray-600">Logged in as</p>
                                    <p className="font-semibold text-gray-900">{user?.username}</p>
                                </div>
                                <Link
                                    to="/admin/dashboard"
                                    onClick={closeMobileMenu}
                                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition ${isActive('/admin/dashboard')
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span className="font-medium">Dashboard</span>
                                </Link>
                                <Link
                                    to="/admin/services"
                                    onClick={closeMobileMenu}
                                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition ${isActive('/admin/services')
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Wrench className="w-5 h-5" />
                                    <span className="font-medium">Services</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center space-x-2 mx-4 w-[calc(100%-2rem)] bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition font-medium"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;