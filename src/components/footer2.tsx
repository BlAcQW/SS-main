'use client';
import React from 'react';
import { MessageCircle, Store } from 'lucide-react';

const CTASection = () => {
  const whatsappNumber =process.env.NEXT_PUBLIC_MERCHANT_WHATSAPP_NUMBER // Replace with your WhatsApp number (with country code, no + or spaces)
  const whatsappMessage = encodeURIComponent("Hi! I'm looking for a product that I couldn't find on your website.");
  const storefrontLink = process.env.NEXT_PUBLIC_STORE_FRONT_URL; // Replace with your actual storefront link

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  const handleStorefrontClick = () => {
    window.open(storefrontLink, '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Can't Find What You're Looking For?
        </h2>
        <p className="text-xl mb-8 text-white/90">
          Reach out to us directly or start your own storefront
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={handleWhatsAppClick}
            className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all hover:scale-105 shadow-xl flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <MessageCircle size={24} />
            Message Us on WhatsApp
          </button>
          
          <button 
            onClick={handleStorefrontClick}
            className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all hover:scale-105 shadow-xl flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Store size={24} />
            Get Your Own Storefront
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;