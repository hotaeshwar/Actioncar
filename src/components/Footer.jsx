import React from 'react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import actionCarLogo from '../assets/images/action car logo.png';
import awardLogo from '../assets/images/award png.png';

const Footer = () => {
  return (
    <footer className="relative w-full">
      {/* Wave curve top border */}
      <div className="w-full h-12 sm:h-14 md:h-16 bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
          <path fill="#0ea5e9" d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,100 L1440,100 L0,100 Z"></path>
        </svg>
      </div>
      
      {/* Footer content with sky blue and white theme */}
      <div className="w-full py-6 sm:py-8 md:py-10 bg-gradient-to-br from-sky-700 via-sky-600 to-sky-800 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            
            {/* Contact Information */}
            <div className="mb-6 sm:mb-0">
              <h3 className="text-lg sm:text-xl font-bold mb-3 md:mb-4 border-b-2 border-white pb-2">Contact Information</h3>
              <p className="mb-1 sm:mb-2 text-sm sm:text-base">Action Car Detailing</p>
              <p className="mb-1 sm:mb-2 text-sm sm:text-base">1380 Sargent avenue,</p>
              <p className="mb-1 sm:mb-2 text-sm sm:text-base">Winnipeg, MB, R3E 0G5</p>
            </div>
            
            {/* Phone & Email */}
            <div className="mb-6 sm:mb-0">
              <h3 className="text-lg sm:text-xl font-bold mb-3 md:mb-4 border-b-2 border-white pb-2">Get In Touch</h3>
              <p className="mb-1 sm:mb-2 text-sm sm:text-base"><span className="font-bold">Phone:</span> (204) 775-0005</p>
              <p className="mb-2 sm:mb-4 text-sm sm:text-base"><span className="font-bold">Email:</span> info@actioncardetailing.ca</p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-3 sm:space-x-4 mt-3 sm:mt-4">
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-sky-600 flex items-center justify-center hover:bg-sky-50 transition-colors shadow-md">
                  <FaFacebook size={16} className="sm:text-lg md:text-xl" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-sky-600 flex items-center justify-center hover:bg-sky-50 transition-colors shadow-md">
                  <FaTwitter size={16} className="sm:text-lg md:text-xl" />
                </a>
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="mb-6 sm:mb-0">
              <h3 className="text-lg sm:text-xl font-bold mb-3 md:mb-4 border-b-2 border-white pb-2">Business Hours</h3>
              <p className="mb-1 sm:mb-2 text-sm sm:text-base">Monday – Friday | 8 AM – 6 PM</p>
              <p className="mb-1 sm:mb-2 text-sm sm:text-base">Saturday | 8AM – 3 PM</p>
              <p className="mb-1 sm:mb-2 text-sm sm:text-base">Sunday | Closed</p>
            </div>
            
            {/* Logo with white background */}
            <div className="flex flex-col items-center justify-center mt-2 sm:mt-0">
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <img src={actionCarLogo} alt="Action Car Detailing" className="w-36 sm:w-40 md:w-48" />
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 border-t-2 border-white border-opacity-30 text-center">
            <p className="text-sm sm:text-base">© {new Date().getFullYear()} Action Car Detailing. All Rights Reserved.</p>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2 opacity-90">Website Design by Building india Digital</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;