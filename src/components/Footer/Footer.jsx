import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1f1a2e] via-[#2b1f45] to-[#1f1a2e] text-white px-10 pt-16 pb-6">
      <div className="flex justify-between gap-10 flex-wrap mb-10">

        <div className="max-w-xs">
          <h2 className="text-3xl font-black text-[#f5a623] mb-3 tracking-wide">🗺️ Safar Saathi</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Navigate the City of Lakes with royal precision and modern ease.
          </p>
        </div>

        <div>
          <h4 className="text-base font-bold text-white mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-2">
            <li><a href="#" className="text-sm text-gray-400 hover:text-[#f5a623] hover:translate-x-1 transition-all duration-300">Routes</a></li>
            <li><a href="#" className="text-sm text-gray-400 hover:text-[#f5a623] hover:translate-x-1 transition-all duration-300">Live Map</a></li>
            <li><a href="#" className="text-sm text-gray-400 hover:text-[#f5a623] hover:translate-x-1 transition-all duration-300">Tourism</a></li>
            <li><a href="#" className="text-sm text-gray-400 hover:text-[#f5a623] hover:translate-x-1 transition-all duration-300">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-base font-bold text-white mb-4">Contact Us</h4>
          <p className="text-sm text-gray-400 mb-2">📧 jahanvishrivastava53@gmail.com</p>
          <p className="text-sm text-gray-400 mb-2">📞 +91 7737159196, +91 9799931639</p>
          <p className="text-sm text-gray-400">📍 Udaipur, Rajasthan, India</p>
        </div>

      </div>
      <div className="flex justify-center gap-6 mb-6">

  <a href="#">
    <FaGithub
      size={32}
      className="hover:text-[#f5a623] hover:scale-125 transition-all duration-300 cursor-pointer"
    />
  </a>

  <a href="#">
    <FaInstagram
      size={32}
      className="hover:text-[#f5a623] hover:scale-125 transition-all duration-300 cursor-pointer"
    />
  </a>

  <a href="#">
    <FaLinkedin
      size={32}
      className="hover:text-[#f5a623] hover:scale-125 transition-all duration-300 cursor-pointer"
    />
  </a>

</div>
  
      
     <div className="border-t border-white/10 pt-6 text-center"> 
        © 2026 Safar Saathi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;