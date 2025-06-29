
import React from 'react';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                <span className="text-white font-bold">NW</span>
              </div>
              <span className="text-xl font-bold">NoWaste</span>
            </div>
            <p className="text-gray-300 text-sm">
              Working together to eliminate food waste and feed the hungry. 
              Every meal saved is a step towards a better world.
            </p>
            <div className="flex items-center space-x-2 text-orange-400">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Made with love for humanity</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="/donate-food" className="text-gray-300 hover:text-orange-400 transition-colors">Donate Food</a></li>
              <li><a href="/volunteer" className="text-gray-300 hover:text-orange-400 transition-colors">Volunteer</a></li>
              <li><a href="/donate-money" className="text-gray-300 hover:text-orange-400 transition-colors">Donate Money</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400">Our Programs</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-300">Food Rescue</span></li>
              <li><span className="text-gray-300">Community Kitchens</span></li>
              <li><span className="text-gray-300">Awareness Campaigns</span></li>
              <li><span className="text-gray-300">Volunteer Training</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">info@nowaste.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5" />
                <span className="text-gray-300">
                  123 Service Lane,<br />
                  Community Block,<br />
                  City - 110001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 NoWaste NGO. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
