"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const phoneNumber = "923476801611";
  const message = encodeURIComponent("Hi CodeVelvet! I'd like to discuss a project.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-white text-[#050507] text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl animate-fade-in-up flex items-center gap-2 max-w-[220px]">
          <span>Chat with us on WhatsApp</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <IoClose className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7 text-white" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
