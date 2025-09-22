import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        {/* Left Side - Branding */}
        <div className="mb-4 md:mb-0">
          <span className="font-semibold text-blue-600">DocAI</span> © {new Date().getFullYear()} — All rights reserved.
        </div>

        {/* Right Side - Optional Links */}
        <div className="flex space-x-4">
          <Link to="/landing" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-blue-600 transition">
            Dashboard
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
