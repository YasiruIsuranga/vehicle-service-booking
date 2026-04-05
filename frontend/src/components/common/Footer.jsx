import { Car, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Car className="w-6 h-6" />
                            <h3 className="text-lg font-bold">VehicleService</h3>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Your trusted partner for vehicle maintenance and service bookings.
                            Quick, reliable, and professional.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>+1 234 567 8900</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>support@vehicleservice.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4" />
                                <span>123 Service St, Auto City, AC 12345</span>
                            </div>
                        </div>
                    </div>

                    {/* Hours */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Working Hours</h3>
                        <div className="text-sm text-gray-400 space-y-1">
                            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                            <p>Saturday: 9:00 AM - 4:00 PM</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} VehicleService. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;