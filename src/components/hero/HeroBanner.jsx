import React from 'react';
import { motion } from 'framer-motion';

const HeroBanner = ({ 
  title = "Welcome to Our Website", 
  subtitle = "Discover amazing features and services", 
  buttonText = "Get Started", 
  imageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
  showButton = true, 
  minHeight = "60vh", 
  overlayOpacity = 50 
}) => {
  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="relative bg-cover bg-center flex items-center justify-center text-center text-white" 
      style={{ backgroundImage: `url(${imageUrl})`, minHeight: minHeight }}
    >
      {/* Overlay with customizable opacity */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: overlayOpacity/100 }} 
        className="absolute inset-0 bg-black" 
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl px-6 py-20 mx-auto"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {title}
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {subtitle}
        </motion.p>
        
        {showButton && (
          <motion.button
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg text-lg md:text-xl transition-colors duration-300 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {buttonText}
          </motion.button>
        )}
      </motion.div>
    </motion.section>
  );
};

export default HeroBanner;